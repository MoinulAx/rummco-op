-- get_building_counts: the totals behind the header count, the legend, the
-- borough chips and the status filter.
--
-- Called by lib/data/supabase-adapter.ts. If this function is absent the
-- adapter falls back to 25 count-only queries (1 total + 5 boroughs + 19
-- statuses). That works, and is exactly why this function is wanted.
--
-- Contract the adapter depends on:
--   * argument names exactly as below, all nullable
--   * returns one json object with keys `total`, `by_borough`, `by_status`
--   * `by_borough` keys are the stored uppercase borough values
--   * `by_status` counts each code once per building, from unnest(statuses), so
--     its values sum to more than `total` whenever buildings carry several
--     codes. That is expected and the UI does not add them up.

-- Session-level, not SET LOCAL: a migration run outside a transaction
-- (the Supabase SQL editor does this) silently ignores SET LOCAL, and then
-- `gin_trgm_ops` cannot be resolved because pg_trgm lives in `extensions`.
set search_path = public, extensions;

create or replace function public.get_building_counts(
  p_boroughs text[] default null,
  p_zip      text   default null,
  p_statuses text[] default null
)
returns json
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with filtered as (
    select b.borough, b.statuses
    from public.buildings b
    where
      (p_boroughs is null or b.borough = any (p_boroughs))
      and (p_zip is null or b.zip = p_zip)
      and (p_statuses is null or b.statuses && p_statuses)
  ),
  by_borough as (
    select borough, count(*) as n
    from filtered
    group by borough
  ),
  by_status as (
    select code, count(*) as n
    from filtered, unnest(filtered.statuses) as code
    group by code
  )
  select json_build_object(
    'total', (select count(*) from filtered),
    -- coalesce so an empty result is still `{}` rather than json null, which
    -- the adapter would have to special-case.
    'by_borough', coalesce(
      (select json_object_agg(borough, n) from by_borough),
      '{}'::json
    ),
    'by_status', coalesce(
      (select json_object_agg(code, n) from by_status),
      '{}'::json
    )
  );
$$;

comment on function public.get_building_counts(text[], text, text[]) is
  'Totals for a filter set: overall, per borough, and per status code. by_status counts a building once per code it carries, so it oversums total by design.';

grant execute on function public.get_building_counts(text[], text, text[])
  to anon, authenticated;
