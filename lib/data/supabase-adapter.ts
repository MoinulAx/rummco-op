import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BUILDING_COLUMNS,
  emptyBoroughCounts,
  isBorough,
  type Borough,
  type Building,
} from "@/lib/buildings";
import { STATUS_CODES } from "@/lib/status-definitions";
import type { BuildingRow, Database } from "./database.types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./source";
import {
  filtersKey,
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
 * Read-only adapter over the public `buildings` table. RLS grants SELECT to
 * anon, so the anon key is all this needs, and nothing here writes.
 *
 * Two Postgres functions are assumed, `search_buildings` and
 * `get_building_counts`. Both are created by the migrations in
 * /supabase/migrations, and /supabase/README.md covers the setup. Until they
 * exist each call falls back to plain queries, so the app is usable either way.
 */

const SELECT_LIST = BUILDING_COLUMNS.join(", ");

/** PostgREST's "function not found in schema cache". */
const MISSING_FUNCTION = "PGRST202";

let client: SupabaseClient<Database> | null = null;

function supabase(): SupabaseClient<Database> {
  if (!client) {
    client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      // Nothing here is authenticated, so there is no session to keep alive.
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/** Narrows the two string columns that carry a union in the app's own type. */
function toBuilding(row: BuildingRow): Building {
  const borough: Borough = isBorough(row.borough) ? row.borough : "MANHATTAN";
  return {
    id: row.id,
    bbl: row.bbl,
    borough,
    zip: row.zip,
    house_number_raw: row.house_number_raw,
    house_number_low: row.house_number_low,
    house_number_high: row.house_number_high,
    street: row.street,
    street_suffix: row.street_suffix,
    secondary_address: row.secondary_address,
    statuses: row.statuses ?? [],
    block: row.block,
    lot: row.lot,
    lat: Number(row.lat),
    lng: Number(row.lng),
    geocode_quality:
      row.geocode_quality === "approximate" ? "approximate" : "exact",
  };
}

/**
 * The three filters, applied identically to every query. Typed loosely on
 * purpose: the same helper runs against row selects and head counts alike.
 */
type Filterable<T> = {
  in(column: "borough", values: string[]): T;
  eq(column: "zip", value: string): T;
  overlaps(column: "statuses", values: string[]): T;
};

function applyFilters<T extends Filterable<T>>(query: T, filters: Filters): T {
  let out = query;
  if (filters.boroughs.length > 0) out = out.in("borough", filters.boroughs);

  const zip = filters.zip.trim();
  if (zip.length > 0) out = out.eq("zip", zip);

  // `statuses && $1` in Postgres: any overlap, not containment.
  if (filters.statuses.length > 0) {
    out = out.overlaps("statuses", filters.statuses);
  }
  return out;
}

/** Guards against a wrapped or inverted box arriving from Leaflet. */
function normaliseBounds(bounds: Bounds): Bounds {
  return {
    south: Math.max(-90, Math.min(bounds.south, bounds.north)),
    north: Math.min(90, Math.max(bounds.south, bounds.north)),
    west: Math.max(-180, Math.min(bounds.west, bounds.east)),
    east: Math.min(180, Math.max(bounds.west, bounds.east)),
  };
}

/** RPC parameter names, matching /supabase/migrations/*.sql. */
function rpcArgs(filters: Filters) {
  const zip = filters.zip.trim();
  return {
    p_boroughs: filters.boroughs.length > 0 ? [...filters.boroughs] : null,
    p_zip: zip.length > 0 ? zip : null,
    p_statuses: filters.statuses.length > 0 ? filters.statuses : null,
  };
}

function isMissingFunction(error: { code?: string } | null): boolean {
  return error?.code === MISSING_FUNCTION;
}

/**
 * postgrest-js requires a signal, so a caller that passes none gets a fresh
 * controller's signal: valid, and never aborted.
 */
function signalFor(options: QueryOptions): AbortSignal {
  return options.signal ?? new AbortController().signal;
}

export function createSupabaseAdapter(): BuildingsAdapter {
  // Latched once an RPC turns out to be absent, so the app stops paying for a
  // failed round trip on every keystroke.
  let searchRpcMissing = false;
  let countsRpcMissing = false;

  // The 2024 registration snapshot is static, so counts for a given filter set
  // cannot change within a session.
  const countsCache = new Map<string, BuildingCounts>();

  /**
   * Fallback for `get_building_counts`: one head count for the total, one per
   * borough, one per status code. That is 25 count-only requests, which is
   * exactly why the RPC is the intended path. Cached per filter set.
   */
  async function countsViaQueries(
    filters: Filters,
    options: QueryOptions,
  ): Promise<BuildingCounts> {
    const db = supabase();

    async function headCount(narrow?: {
      borough?: Borough;
      status?: string;
    }): Promise<number> {
      let query = applyFilters(
        db.from("buildings").select("id", { count: "exact", head: true }),
        filters,
      );
      if (narrow?.borough) query = query.eq("borough", narrow.borough);
      if (narrow?.status) query = query.overlaps("statuses", [narrow.status]);

      const { count, error } = await query.abortSignal(signalFor(options));
      if (error) throw new Error(error.message);
      return count ?? 0;
    }

    const boroughs = Object.keys(emptyBoroughCounts()) as Borough[];

    const [total, boroughCounts, statusCounts] = await Promise.all([
      headCount(),
      Promise.all(
        boroughs.map(
          async (borough) => [borough, await headCount({ borough })] as const,
        ),
      ),
      Promise.all(
        STATUS_CODES.map(
          async (status) => [status, await headCount({ status })] as const,
        ),
      ),
    ]);

    const byBorough = emptyBoroughCounts();
    for (const [borough, count] of boroughCounts) byBorough[borough] = count;

    const byStatus: Record<string, number> = {};
    for (const [code, count] of statusCounts) byStatus[code] = count;

    return { total, byBorough, byStatus };
  }

  return {
    async getBuildingsInBounds(
      bounds,
      filters,
      limit,
      options,
    ): Promise<BoundsResult> {
      const box = normaliseBounds(bounds);

      // limit + 1 answers "is there more here than we drew?" in one round trip,
      // which beats a second exact head count on every pan.
      const query = applyFilters(
        supabase()
          .from("buildings")
          .select(SELECT_LIST)
          .gte("lat", box.south)
          .lte("lat", box.north)
          .gte("lng", box.west)
          .lte("lng", box.east),
        filters,
      );

      const { data, error } = await query
        .limit(limit + 1)
        .abortSignal(signalFor(options))
        .returns<BuildingRow[]>();

      if (error) throw new Error(error.message);

      const rows = (data ?? []).map(toBuilding);
      return { rows: rows.slice(0, limit), capped: rows.length > limit };
    },

    async searchBuildings(
      query,
      filters,
      page: PageRequest,
      options: QueryOptions,
    ): Promise<SearchPage> {
      const db = supabase();
      const term = query.trim();

      if (!searchRpcMissing) {
        const { data, error } = await db
          .rpc("search_buildings", {
            q: term,
            ...rpcArgs(filters),
            p_limit: page.limit,
            p_offset: page.offset,
          })
          .abortSignal(signalFor(options));

        if (!error) {
          const rows = data ?? [];
          return {
            rows: rows.map(toBuilding),
            // Every row carries the same window count, so row 0 is enough.
            total: rows.length > 0 ? Number(rows[0].total_count) : 0,
          };
        }

        if (!isMissingFunction(error)) throw new Error(error.message);
        searchRpcMissing = true;
      }

      // Fallback: no trigram ranking, just a substring match on street.
      // Ordered deterministically so paging cannot repeat or skip a row.
      let builder = applyFilters(
        db.from("buildings").select(SELECT_LIST, { count: "exact" }),
        filters,
      );

      if (term.length > 0) {
        // Escape LIKE wildcards so a typed % cannot widen the match.
        builder = builder.ilike("street", `%${term.replace(/[%_]/g, "\\$&")}%`);
      }

      const { data, count, error } = await builder
        .order("borough", { ascending: true })
        .order("street", { ascending: true })
        .order("house_number_low", { ascending: true, nullsFirst: false })
        .order("id", { ascending: true })
        .range(page.offset, page.offset + page.limit - 1)
        .abortSignal(signalFor(options))
        .returns<BuildingRow[]>();

      if (error) throw new Error(error.message);

      return { rows: (data ?? []).map(toBuilding), total: count ?? 0 };
    },

    async getBuildingCounts(filters, options): Promise<BuildingCounts> {
      const key = filtersKey(filters);
      const cached = countsCache.get(key);
      if (cached) return cached;

      if (!countsRpcMissing) {
        const { data, error } = await supabase()
          .rpc("get_building_counts", rpcArgs(filters))
          .abortSignal(signalFor(options));

        if (!error) {
          const byBorough = emptyBoroughCounts();
          for (const [borough, count] of Object.entries(data?.by_borough ?? {})) {
            if (isBorough(borough)) byBorough[borough] = Number(count);
          }
          const result: BuildingCounts = {
            total: Number(data?.total ?? 0),
            byBorough,
            byStatus: data?.by_status ?? {},
          };
          countsCache.set(key, result);
          return result;
        }

        if (!isMissingFunction(error)) throw new Error(error.message);
        countsRpcMissing = true;
      }

      const result = await countsViaQueries(filters, options);
      countsCache.set(key, result);
      return result;
    },
  };
}
