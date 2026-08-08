import type { Borough, Building } from "@/lib/buildings";

/** Plain south/west/north/east box, so nothing outside the map needs Leaflet. */
export type Bounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

/**
 * The one filter shape. Empty arrays and an empty zip mean "no restriction",
 * so the default value below is also the "everything" query.
 */
export type Filters = {
  boroughs: Borough[];
  zip: string;
  statuses: string[];
};

export const NO_FILTERS: Filters = { boroughs: [], zip: "", statuses: [] };

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.boroughs.length > 0 ||
    filters.zip.trim().length > 0 ||
    filters.statuses.length > 0
  );
}

/** Stable key for caches and effect dependencies. */
export function filtersKey(filters: Filters): string {
  return [
    [...filters.boroughs].sort().join("|"),
    filters.zip.trim(),
    [...filters.statuses].sort().join("|"),
  ].join("::");
}

export type BoundsResult = {
  rows: Building[];
  /** True when more rows match inside the bounds than the limit returned. */
  capped: boolean;
};

export type SearchPage = {
  rows: Building[];
  /** Total matches for the query and filters, ignoring limit/offset. */
  total: number;
};

export type BuildingCounts = {
  total: number;
  byBorough: Record<Borough, number>;
  /** Keyed by status code. A code with no matches may be absent. */
  byStatus: Record<string, number>;
};

export type PageRequest = { limit: number; offset: number };

/** Every seam function takes this, so an in-flight request can be dropped. */
export type QueryOptions = { signal?: AbortSignal };

export interface BuildingsAdapter {
  getBuildingsInBounds(
    bounds: Bounds,
    filters: Filters,
    limit: number,
    options: QueryOptions,
  ): Promise<BoundsResult>;

  searchBuildings(
    query: string,
    filters: Filters,
    page: PageRequest,
    options: QueryOptions,
  ): Promise<SearchPage>;

  getBuildingCounts(
    filters: Filters,
    options: QueryOptions,
  ): Promise<BuildingCounts>;
}

/**
 * Both adapters signal a dropped request with an `AbortError`, so callers can
 * tell "you cancelled this" apart from "this failed" and stay silent.
 */
export function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: unknown }).name === "AbortError"
  );
}

export function abortError(): Error {
  const error = new Error("Request aborted");
  error.name = "AbortError";
  return error;
}
