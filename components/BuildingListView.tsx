"use client";

import { useCallback, useMemo } from "react";
import { List, type RowComponentProps } from "react-window";
import { statusDefinition, statusStyle } from "@/lib/status-definitions";
import {
  boroughColor,
  boroughLabel,
  primaryAddress,
  type Building,
} from "@/lib/buildings";

/**
 * The directory.
 *
 * The reference's three-column layout rendered every row it had, which is fine
 * for 21 sites and impossible for 50,000 buildings. This one is windowed and
 * server-paged: only the rows on screen exist in the DOM, and only the pages
 * that have been scrolled to exist in memory at all.
 */

const ROW_HEIGHT = 96;

/** How close to the bottom before the next page is requested. */
const PREFETCH_ROWS = 14;

/** Above this the filters are doing nothing useful, so say so. */
const TOO_MANY = 5000;

type RowProps = {
  rows: Building[];
  selectedId: string | null;
  onSelect: (building: Building) => void;
  hasMore: boolean;
};

function Row({
  index,
  style,
  ariaAttributes,
  rows,
  selectedId,
  onSelect,
  hasMore,
}: RowComponentProps<RowProps>) {
  const building = rows[index];

  // The one row past the end is the "next page is coming" placeholder.
  if (!building) {
    return (
      <div style={style} {...ariaAttributes} className="px-1 py-2">
        <div className="flex h-full items-center gap-4 rounded-2xl border border-hairline-soft bg-paper px-5">
          <span className="shimmer size-2.5 shrink-0 rounded-full" />
          <span className="min-w-0 flex-1">
            <span className="shimmer block h-3.5 w-2/5 rounded" />
            <span className="shimmer mt-2 block h-2.5 w-1/4 rounded" />
          </span>
          <span className="sr-only">
            {hasMore ? "Loading more buildings" : "End of results"}
          </span>
        </div>
      </div>
    );
  }

  const color = boroughColor(building.borough);
  const active = building.id === selectedId;
  const approximate = building.geocode_quality === "approximate";

  return (
    <div style={style} {...ariaAttributes} className="px-1 py-2">
      <button
        type="button"
        onClick={() => onSelect(building)}
        aria-label={`View details for ${primaryAddress(building)}, ${boroughLabel(building.borough)}`}
        className={[
          "flex h-full w-full items-center gap-4 rounded-2xl border px-5 text-left transition-colors duration-200",
          active
            ? "border-transparent bg-cream-deep/70"
            : "border-hairline-soft bg-paper hover:bg-cream/70 active:bg-cream-deep/70",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className="h-10 w-1.5 shrink-0 rounded-full"
          style={{ background: color.base }}
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {primaryAddress(building)}
          </span>
          <span className="mt-1 flex items-center gap-2 text-[12px] text-ink-faint">
            <span style={{ color: color.text }}>
              {boroughLabel(building.borough)}
            </span>
            {building.zip && <span className="numeral">{building.zip}</span>}
            {building.bbl && (
              <span className="numeral hidden sm:inline">
                BBL {building.bbl}
              </span>
            )}
            {approximate && (
              <span style={{ color: "var(--color-caution)" }}>approximate</span>
            )}
          </span>
        </span>

        {/* Status dots rather than full chips: the row has to stay one line
            tall at 375px, and the chips live in the detail view. */}
        <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
          {building.statuses.slice(0, 3).map((code) => {
            const style = statusStyle(code);
            return (
              <span
                key={code}
                title={statusDefinition(code).label}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap"
                style={{ background: style.soft, color: style.text }}
              >
                {statusDefinition(code).label}
              </span>
            );
          })}
          {building.statuses.length > 3 && (
            <span className="numeral text-[10px] text-ink-faint">
              +{building.statuses.length - 3}
            </span>
          )}
        </span>
      </button>
    </div>
  );
}

type Props = {
  rows: Building[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  query: string;
  filtered: boolean;
  selectedId: string | null;
  onSelect: (building: Building) => void;
  onClearFilters: () => void;
};

export default function BuildingListView({
  rows,
  total,
  loading,
  loadingMore,
  error,
  hasMore,
  loadMore,
  query,
  filtered,
  selectedId,
  onSelect,
  onClearFilters,
}: Props) {
  const rowProps = useMemo(
    () => ({ rows, selectedId, onSelect, hasMore }),
    [rows, selectedId, onSelect, hasMore],
  );

  const rowKey = useCallback(
    (index: number, data: RowProps) => data.rows[index]?.id ?? `pending-${index}`,
    [],
  );

  const onRowsRendered = useCallback(
    (visible: { startIndex: number; stopIndex: number }) => {
      if (hasMore && !loadingMore && visible.stopIndex >= rows.length - PREFETCH_ROWS) {
        loadMore();
      }
    },
    [hasMore, loadingMore, rows.length, loadMore],
  );

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="max-w-[34ch] text-center">
          <p className="display-lg text-ink">That query did not come back.</p>
          <p className="mt-2 text-[13px] leading-[1.5] text-ink-soft">{error}</p>
          <p className="mt-2 text-[12px] text-ink-faint">
            Adjusting a filter will try again.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-2 py-1" role="status" aria-label="Loading buildings">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="flex h-[80px] items-center gap-4 rounded-2xl border border-hairline-soft bg-paper px-5"
            style={{ opacity: 1 - i * 0.085 }}
          >
            <span className="shimmer h-10 w-1.5 shrink-0 rounded-full" />
            <span className="min-w-0 flex-1">
              <span className="shimmer block h-3.5 w-2/5 rounded" />
              <span className="shimmer mt-2 block h-2.5 w-1/4 rounded" />
            </span>
            <span className="shimmer hidden h-5 w-28 rounded-full sm:block" />
          </div>
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="max-w-[38ch] text-center">
          <p className="display-lg text-ink">
            {query.trim()
              ? "No registered street matches that."
              : "Nothing matches these filters."}
          </p>
          <p className="mt-2.5 text-[13px] leading-[1.55] text-ink-soft">
            {query.trim()
              ? "Search runs on the street name, so try a shorter piece of it. Remember that a building is only here if its owner filed a registration."
              : "Try widening the borough, ZIP or status filters."}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="btn-secondary mx-auto mt-6"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {total > TOO_MANY && (
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-hairline-soft bg-cream/60 px-5 py-3">
          <p className="text-[12px] text-ink-soft">
            {total.toLocaleString()} matches. Scrolling loads them a page at a
            time, but a borough, ZIP or status filter will get you there faster.
          </p>
          {filtered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="ml-auto text-[12px] text-ink-faint underline decoration-hairline underline-offset-2 transition-colors hover:text-ink"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      <div className="min-h-0 flex-1">
        <List
          rowComponent={Row}
          rowCount={rows.length + (hasMore ? 1 : 0)}
          rowHeight={ROW_HEIGHT}
          rowProps={rowProps}
          rowKey={rowKey}
          onRowsRendered={onRowsRendered}
          overscanCount={6}
          className="thin-scroll overscroll-contain"
          style={{ height: "100%" }}
          aria-label="Rent stabilized buildings"
        />
      </div>
    </div>
  );
}
