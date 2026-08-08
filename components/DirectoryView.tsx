"use client";

import { motion } from "framer-motion";
import BuildingListView from "./BuildingListView";
import FilterBar from "./FilterBar";
import { ResponsibilityBlock } from "./ResponsibilityNote";
import TitleBlock from "./TitleBlock";
import type { View } from "./ViewToggle";
import { usePagedBuildings } from "@/lib/hooks";
import type { Building } from "@/lib/buildings";
import { hasActiveFilters, NO_FILTERS, type BuildingCounts, type Filters } from "@/lib/data/types";

/** One request per screenful and then some, so scrolling stays ahead of the eye. */
const PAGE_SIZE = 60;

type Props = {
  view: View;
  onViewChange: (view: View) => void;
  query: string;
  onQueryChange: (query: string) => void;
  debouncedQuery: string;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  counts: BuildingCounts | null;
  selectedId: string | null;
  onOpen: (building: Building) => void;
};

/**
 * The list screen: same filters as the map, same seam, but paged through
 * `searchBuildings` instead of bounded by a viewport. An empty query is browse
 * mode.
 */
export default function DirectoryView({
  view,
  onViewChange,
  query,
  onQueryChange,
  debouncedQuery,
  filters,
  onFiltersChange,
  counts,
  selectedId,
  onOpen,
}: Props) {
  const page = usePagedBuildings(debouncedQuery, filters, PAGE_SIZE);
  const filtered = hasActiveFilters(filters) || debouncedQuery.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      className="flex h-full flex-col overflow-hidden bg-cream"
    >
      <div className="safe-t safe-x mx-auto flex w-full max-w-[1200px] flex-1 flex-col overflow-hidden md:px-10">
        <header className="flex shrink-0 flex-col gap-3 border-b border-hairline pb-5 md:gap-5 md:pb-6 lg:flex-row lg:items-end lg:justify-between">
          <TitleBlock
            title={debouncedQuery.trim() ? "Search results" : "All buildings"}
            count={page.loading ? null : page.total}
          />
          <div className="lg:w-auto">
            <FilterBar
              view={view}
              onViewChange={onViewChange}
              query={query}
              onQueryChange={onQueryChange}
              searching={page.loading}
              filters={filters}
              onFiltersChange={onFiltersChange}
              counts={counts}
              align="end"
            />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col pt-4 md:pt-5">
          <BuildingListView
            rows={page.rows}
            total={page.total}
            loading={page.loading}
            loadingMore={page.loadingMore}
            error={page.error}
            hasMore={page.hasMore}
            loadMore={page.loadMore}
            query={debouncedQuery}
            filtered={filtered}
            selectedId={selectedId}
            onSelect={onOpen}
            onClearFilters={() => {
              onFiltersChange(NO_FILTERS);
              onQueryChange("");
            }}
          />
        </div>

        <footer className="safe-b shrink-0 border-t border-hairline pt-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
            <ResponsibilityBlock className="max-w-[70ch]" />
            <p className="numeral shrink-0 text-[11px] text-ink-faint">
              {page.rows.length.toLocaleString()} of{" "}
              {page.total.toLocaleString()} loaded
            </p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}
