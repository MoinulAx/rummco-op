"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Building } from "./buildings";
import {
  getBuildingCounts,
  getBuildingsInBounds,
  searchBuildings,
} from "./data/buildings";
import {
  filtersKey,
  isAbortError,
  type Bounds,
  type BuildingCounts,
  type Filters,
} from "./data/types";

/**
 * Every read in the app goes through one of these. They all follow the same
 * three rules: debounce the trigger, cancel whatever is still in flight, and
 * never let a late response overwrite a newer one.
 *
 * "Loading" is derived rather than stored. Each hook keeps the key its data was
 * fetched for, and anything whose key is not the current one is stale by
 * definition. That removes a whole class of stuck spinners, and it means no
 * effect ever has to set state synchronously just to say "starting".
 */

/** Trailing debounce. Used for typing. */
export function useDebounced<T>(value: T, delay: number): T {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return settled;
}

/**
 * Reads a media query without a first-paint mismatch: the server and the first
 * client render both see `serverFallback`, then React re-reads the real value.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => serverFallback, [serverFallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Serialises a box to four decimals: enough to notice a real pan. */
function boundsKey(bounds: Bounds | null): string {
  if (!bounds) return "none";
  return [bounds.south, bounds.west, bounds.north, bounds.east]
    .map((n) => n.toFixed(4))
    .join(",");
}

export type ViewportState = {
  rows: Building[];
  capped: boolean;
  loading: boolean;
  error: string | null;
};

/**
 * Rows for the current viewport.
 *
 * The bounds arrive already debounced by the map's moveend handler; this adds
 * the cancellation. The last successful page stays on screen while the next one
 * loads, so a pan never blinks the map empty.
 */
export function useViewportBuildings(
  bounds: Bounds | null,
  filters: Filters,
  limit: number,
): ViewportState {
  const key = `${boundsKey(bounds)}::${filtersKey(filters)}::${limit}`;

  const [loaded, setLoaded] = useState<{
    key: string;
    rows: Building[];
    capped: boolean;
  } | null>(null);
  const [failed, setFailed] = useState<{ key: string; message: string } | null>(
    null,
  );

  useEffect(() => {
    if (!bounds) return;

    const controller = new AbortController();

    getBuildingsInBounds(bounds, filters, limit, { signal: controller.signal })
      .then((result) => {
        if (controller.signal.aborted) return;
        setLoaded({ key, rows: result.rows, capped: result.capped });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return;
        setFailed({
          key,
          message:
            error instanceof Error ? error.message : "Could not load buildings",
        });
      });

    // Aborting here is what cancels the in-flight request when the viewport
    // moves again before this one lands.
    return () => controller.abort();
  }, [key, bounds, filters, limit]);

  return {
    rows: loaded?.rows ?? [],
    capped: loaded?.capped ?? false,
    loading: bounds !== null && loaded?.key !== key && failed?.key !== key,
    error: failed?.key === key ? failed.message : null,
  };
}

export type CountsState = {
  counts: BuildingCounts | null;
  loading: boolean;
};

/** Totals for the current filters. Feeds the title count, legend and chips. */
export function useBuildingCounts(filters: Filters): CountsState {
  const key = filtersKey(filters);
  const [loaded, setLoaded] = useState<{
    key: string;
    counts: BuildingCounts;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getBuildingCounts(filters, { signal: controller.signal })
      .then((counts) => {
        if (controller.signal.aborted) return;
        setLoaded({ key, counts });
      })
      .catch((error: unknown) => {
        // A failed count is not worth an error state: the map still works, the
        // number just stays on its last value.
        if (controller.signal.aborted || isAbortError(error)) return;
      });

    return () => controller.abort();
  }, [key, filters]);

  return { counts: loaded?.counts ?? null, loading: loaded?.key !== key };
}

export type SearchState = {
  rows: Building[];
  total: number;
  loading: boolean;
  /** True while a further page is being appended rather than replaced. */
  loadingMore: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
};

/**
 * Server-paged results for a query and filter set.
 *
 * Also the engine behind the list view, where an empty query means browse. The
 * first page replaces; later pages append, which is what lets the virtualised
 * list keep its scroll position while more rows arrive underneath it.
 */
export function usePagedBuildings(
  query: string,
  filters: Filters,
  pageSize: number,
): SearchState {
  const term = query.trim();
  const key = `${term}::${filtersKey(filters)}::${pageSize}`;

  const [page, setPage] = useState<{
    key: string;
    rows: Building[];
    total: number;
  } | null>(null);
  const [failed, setFailed] = useState<{ key: string; message: string } | null>(
    null,
  );
  const [appending, setAppending] = useState(false);

  // Not state: nothing renders differently because a page is in flight, it just
  // must not be requested twice.
  const busy = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    searchBuildings(
      term,
      filters,
      { limit: pageSize, offset: 0 },
      { signal: controller.signal },
    )
      .then((result) => {
        if (controller.signal.aborted) return;
        setPage({ key, rows: result.rows, total: result.total });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return;
        setFailed({
          key,
          message:
            error instanceof Error ? error.message : "Could not load buildings",
        });
      });

    return () => controller.abort();
  }, [key, term, filters, pageSize]);

  // Anything fetched for a different key is another query's answer.
  const current = page?.key === key ? page : null;
  const rows = current?.rows ?? [];
  const total = current?.total ?? 0;
  const loadedCount = rows.length;

  const loadMore = useCallback(() => {
    if (busy.current || loadedCount === 0) return;

    busy.current = true;
    setAppending(true);

    searchBuildings(term, filters, { limit: pageSize, offset: loadedCount })
      .then((next) => {
        setPage((previous) => {
          // Offset paging can only append. A page that would overlap or skip
          // means the list moved on underneath it, so it is dropped.
          if (!previous || previous.key !== key) return previous;
          if (previous.rows.length !== loadedCount) return previous;
          return {
            key,
            rows: [...previous.rows, ...next.rows],
            total: next.total,
          };
        });
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return;
        setFailed({
          key,
          message:
            error instanceof Error ? error.message : "Could not load more rows",
        });
      })
      .finally(() => {
        busy.current = false;
        setAppending(false);
      });
  }, [key, term, filters, pageSize, loadedCount]);

  return {
    rows,
    total,
    loading: current === null && failed?.key !== key,
    loadingMore: appending,
    error: failed?.key === key ? failed.message : null,
    loadMore,
    hasMore: loadedCount < total,
  };
}
