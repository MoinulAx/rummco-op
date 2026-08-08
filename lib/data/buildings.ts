import type { Building } from "@/lib/buildings";
import { createMockAdapter } from "./mock-adapter";
import { createSupabaseAdapter } from "./supabase-adapter";
import { dataSource } from "./source";
import type {
  Bounds,
  BoundsResult,
  BuildingCounts,
  BuildingsAdapter,
  Filters,
  PageRequest,
  QueryOptions,
  SearchPage,
} from "./types";

/**
 * The only door to building data.
 *
 * Three functions, two interchangeable implementations behind them. No
 * component imports an adapter, a Supabase client, or the fixture, so moving
 * between mock and Supabase is an environment change and nothing else.
 */

/** Never fetch more than this for one viewport, whatever the caller asks for. */
export const DEFAULT_ROW_LIMIT = 2000;

let adapter: BuildingsAdapter | null = null;

function currentAdapter(): BuildingsAdapter {
  if (!adapter) {
    adapter =
      dataSource() === "supabase"
        ? createSupabaseAdapter()
        : createMockAdapter();
  }
  return adapter;
}

/**
 * Rows whose lat/lng fall inside the box, subject to the filters.
 *
 * `capped` is true when the bounds hold more matches than `limit`. The caller
 * is expected to keep showing clusters and tell the reader to zoom in rather
 * than widen the request.
 */
export function getBuildingsInBounds(
  bounds: Bounds,
  filters: Filters,
  limit: number = DEFAULT_ROW_LIMIT,
  options: QueryOptions = {},
): Promise<BoundsResult> {
  return currentAdapter().getBuildingsInBounds(
    bounds,
    filters,
    Math.min(limit, DEFAULT_ROW_LIMIT),
    options,
  );
}

/**
 * Server-side search over the street, plus the paging behind the list view.
 *
 * An empty query is browse mode: same filters, same paging, ordered by borough
 * and street instead of by match score.
 */
export function searchBuildings(
  query: string,
  filters: Filters,
  page: PageRequest,
  options: QueryOptions = {},
): Promise<SearchPage> {
  return currentAdapter().searchBuildings(query, filters, page, options);
}

/** Totals for the current filters: overall, per borough, per status code. */
export function getBuildingCounts(
  filters: Filters,
  options: QueryOptions = {},
): Promise<BuildingCounts> {
  return currentAdapter().getBuildingCounts(filters, options);
}

export type {
  Bounds,
  BoundsResult,
  Building,
  BuildingCounts,
  Filters,
  PageRequest,
  QueryOptions,
  SearchPage,
};
