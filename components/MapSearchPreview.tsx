"use client";

import SearchResults from "./SearchResults";
import { usePagedBuildings } from "@/lib/hooks";
import type { Building } from "@/lib/buildings";
import type { Filters } from "@/lib/data/types";

/** First page only; the list view is where the rest of the matches live. */
const PREVIEW_SIZE = 8;

/**
 * Wraps the search query in its own component so the request only exists while
 * there is something typed. Mounting is the gate, which keeps the hook
 * unconditional.
 */
export default function MapSearchPreview({
  query,
  filters,
  onSelect,
  onSeeAll,
}: {
  query: string;
  filters: Filters;
  onSelect: (building: Building) => void;
  onSeeAll: () => void;
}) {
  const { rows, total, loading } = usePagedBuildings(
    query,
    filters,
    PREVIEW_SIZE,
  );

  return (
    <SearchResults
      results={rows}
      total={total}
      loading={loading}
      onSelect={onSelect}
      onSeeAll={onSeeAll}
    />
  );
}
