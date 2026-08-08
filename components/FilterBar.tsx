"use client";

import BoroughChips from "./BoroughChips";
import SearchField from "./SearchField";
import StatusFilter from "./StatusFilter";
import ViewToggle, { type View } from "./ViewToggle";
import ZipFilter from "./ZipFilter";
import type { Borough } from "@/lib/buildings";
import type { BuildingCounts, Filters } from "@/lib/data/types";

type Props = {
  view: View;
  onViewChange: (view: View) => void;
  query: string;
  onQueryChange: (query: string) => void;
  searching?: boolean;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  counts: BuildingCounts | null;
  /** Right-aligns the rows, which is what the map's right-hand column wants. */
  align?: "start" | "end";
};

/**
 * Every control that changes what is queried, in one place, used identically
 * by the map and the list. All of it flows into the same `Filters` object and
 * out through the single data seam.
 */
export default function FilterBar({
  view,
  onViewChange,
  query,
  onQueryChange,
  searching,
  filters,
  onFiltersChange,
  counts,
  align = "start",
}: Props) {
  const alignment = align === "end" ? "md:justify-end" : "";

  return (
    <div className={`flex w-full flex-col gap-2 md:gap-2.5 ${align === "end" ? "md:items-end" : ""}`}>
      {/* Wraps on phones so the search input gets its own full-width row below
          the view toggle; stays inline from md up. */}
      <div className={`flex w-full flex-nowrap items-center gap-2 md:w-auto md:gap-2.5 ${alignment}`}>
        <ViewToggle value={view} onChange={onViewChange} />
        <div className="min-w-0 flex-1 md:w-[300px] md:flex-none">
          <SearchField
            value={query}
            onChange={onQueryChange}
            busy={searching}
          />
        </div>
      </div>

      <div className={`flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap md:gap-2.5 ${alignment}`}>
        <ZipFilter
          value={filters.zip}
          onChange={(zip) => onFiltersChange({ ...filters, zip })}
        />
        <StatusFilter
          value={filters.statuses}
          onChange={(statuses) => onFiltersChange({ ...filters, statuses })}
          counts={counts?.byStatus ?? null}
        />
      </div>

      <BoroughChips
        value={filters.boroughs}
        onChange={(boroughs: Borough[]) =>
          onFiltersChange({ ...filters, boroughs })
        }
        counts={counts?.byBorough ?? null}
      />
    </div>
  );
}
