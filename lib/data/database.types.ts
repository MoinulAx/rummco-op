/**
 * Hand-written schema types for the pieces of the database this app reads.
 *
 * Passing these to `createClient<Database>` is what lets the adapter chain
 * PostgREST builders without casts, and what makes a typo in a column name a
 * compile error rather than a runtime 400.
 *
 * Mirrors the `buildings` table and the two functions in /supabase/rpc.
 */

export type BuildingRow = {
  id: string;
  bbl: string | null;
  borough: string;
  zip: string | null;
  house_number_raw: string | null;
  house_number_low: number | null;
  house_number_high: number | null;
  street: string;
  street_suffix: string | null;
  secondary_address: string | null;
  statuses: string[];
  block: string | null;
  lot: string | null;
  lat: number;
  lng: number;
  geocode_quality: string;
  created_at: string | null;
};

/** Filter arguments shared by both functions. */
type FilterArgs = {
  p_boroughs: string[] | null;
  p_zip: string | null;
  p_statuses: string[] | null;
};

export type SearchRow = BuildingRow & {
  /** Trigram similarity of the query against the street. */
  score: number;
  /** Total matches ignoring limit/offset, repeated on every row. */
  total_count: number;
};

export type CountsJson = {
  total: number;
  by_borough: Record<string, number>;
  by_status: Record<string, number>;
};

export type Database = {
  public: {
    Tables: {
      buildings: {
        Row: BuildingRow;
        Insert: BuildingRow;
        Update: Partial<BuildingRow>;
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      search_buildings: {
        Args: FilterArgs & { q: string; p_limit: number; p_offset: number };
        Returns: SearchRow[];
      };
      get_building_counts: {
        Args: FilterArgs;
        Returns: CountsJson;
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
