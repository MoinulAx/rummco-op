/**
 * Which adapter is live. Kept out of `buildings.ts` so that module stays at
 * exactly the three data functions.
 *
 * Both variables must be present for the Supabase adapter to be chosen.
 * Anything else falls back to the mock adapter, which is why the app runs with
 * no environment at all.
 *
 * NEXT_PUBLIC_* is inlined at build time, so these must be read as full
 * property accesses rather than destructured off `process.env`.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export type DataSource = "supabase" | "mock";

export function dataSource(): DataSource {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0
    ? "supabase"
    : "mock";
}
