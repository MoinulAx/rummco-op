import { emptyBoroughCounts, type Building } from "@/lib/buildings";
import { MOCK_BUILDINGS } from "./mock-fixture";
import {
  abortError,
  type Bounds,
  type BoundsResult,
  type BuildingCounts,
  type BuildingsAdapter,
  type Filters,
  type PageRequest,
  type QueryOptions,
  type SearchPage,
} from "./types";

/**
 * In-memory adapter over the dev fixture. It exists so the whole app runs with
 * no environment variables, and so the loading, empty, capped and error states
 * are exercised in development rather than only in production.
 *
 * It deliberately mirrors the Supabase adapter's semantics rather than taking
 * shortcuts: same cap detection, same abort behaviour, same paging contract.
 */

/** Enough delay that skeletons and shimmers actually render during development. */
const LATENCY_MS = 140;

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError());
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      reject(abortError());
    }
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function matchesFilters(building: Building, filters: Filters): boolean {
  if (
    filters.boroughs.length > 0 &&
    !filters.boroughs.includes(building.borough)
  ) {
    return false;
  }

  const zip = filters.zip.trim();
  if (zip.length > 0 && building.zip !== zip) return false;

  // Mirrors Postgres `statuses && filter`: overlap, not containment.
  if (
    filters.statuses.length > 0 &&
    !building.statuses.some((code) => filters.statuses.includes(code))
  ) {
    return false;
  }

  return true;
}

function inBounds(building: Building, bounds: Bounds): boolean {
  return (
    building.lat >= bounds.south &&
    building.lat <= bounds.north &&
    building.lng >= bounds.west &&
    building.lng <= bounds.east
  );
}

/**
 * Stand-in for the trigram index: normalises both sides and scores a match by
 * how early and how completely the query lands in the address. Good enough to
 * make the search UI behave like the real one; the real ranking comes from
 * Postgres `similarity()`.
 */
function normalise(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function searchScore(building: Building, needle: string): number {
  const street = normalise(
    [building.street, building.street_suffix].filter(Boolean).join(" "),
  );
  const full = normalise(
    [
      building.house_number_raw,
      building.street,
      building.street_suffix,
      building.secondary_address,
      building.zip,
    ]
      .filter(Boolean)
      .join(" "),
  );

  if (street.startsWith(needle)) return 1;
  const streetAt = street.indexOf(needle);
  if (streetAt > -1) return 0.85 - Math.min(streetAt, 20) / 200;
  const fullAt = full.indexOf(needle);
  if (fullAt > -1) return 0.6 - Math.min(fullAt, 40) / 400;
  return 0;
}

/** Stable ordering for browse mode: borough, then street, then house number. */
function compareForBrowse(a: Building, b: Building): number {
  return (
    a.borough.localeCompare(b.borough) ||
    a.street.localeCompare(b.street) ||
    (a.house_number_low ?? 0) - (b.house_number_low ?? 0) ||
    (a.house_number_raw ?? "").localeCompare(b.house_number_raw ?? "")
  );
}

export function createMockAdapter(): BuildingsAdapter {
  const all = MOCK_BUILDINGS;

  return {
    async getBuildingsInBounds(bounds, filters, limit, options): Promise<BoundsResult> {
      await sleep(LATENCY_MS, options.signal);

      const matched: Building[] = [];
      for (const building of all) {
        if (!inBounds(building, bounds)) continue;
        if (!matchesFilters(building, filters)) continue;
        matched.push(building);
        // Same limit+1 trick the Supabase adapter uses: one extra row is all
        // it takes to know the viewport is over the cap.
        if (matched.length > limit) break;
      }

      return {
        rows: matched.slice(0, limit),
        capped: matched.length > limit,
      };
    },

    async searchBuildings(
      query,
      filters,
      page: PageRequest,
      options: QueryOptions,
    ): Promise<SearchPage> {
      await sleep(LATENCY_MS, options.signal);

      const needle = normalise(query);
      const filtered = all.filter((building) => matchesFilters(building, filters));

      let ordered: Building[];
      if (needle.length === 0) {
        // Empty query is browse mode, same as the RPC.
        ordered = [...filtered].sort(compareForBrowse);
      } else {
        ordered = filtered
          .map((building) => ({ building, score: searchScore(building, needle) }))
          .filter((hit) => hit.score > 0)
          .sort(
            (a, b) =>
              b.score - a.score || compareForBrowse(a.building, b.building),
          )
          .map((hit) => hit.building);
      }

      return {
        rows: ordered.slice(page.offset, page.offset + page.limit),
        total: ordered.length,
      };
    },

    async getBuildingCounts(filters, options): Promise<BuildingCounts> {
      await sleep(LATENCY_MS, options.signal);

      const byBorough = emptyBoroughCounts();
      const byStatus: Record<string, number> = {};
      let total = 0;

      for (const building of all) {
        if (!matchesFilters(building, filters)) continue;
        total += 1;
        byBorough[building.borough] += 1;
        for (const code of building.statuses) {
          byStatus[code] = (byStatus[code] ?? 0) + 1;
        }
      }

      return { total, byBorough, byStatus };
    },
  };
}
