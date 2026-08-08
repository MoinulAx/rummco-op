-- TODO: create this function in Supabase. The front end calls it first and
-- falls back to 25 count-only queries (1 total + 5 boroughs + 19 statuses)
-- when it is absent (PostgREST error PGRST202). The fallback works but is
-- expensive, so this function is the intended path.
--
-- Contract the adapter depends on (lib/data/supabase-adapter.ts):
--   * argument names exactly as below, all nullable
--   * returns a single json object with keys `total`, `by_borough`, `by_status`
--   * `by_borough` keys are the stored uppercase borough values
--   * `by_status` counts each code once per building, from unnest(statuses),
--     so its values sum to more than `total` whenever buildings carry several
--     codes; that is expected

create or replace function public.get_building_counts(
  p_boroughs text[] default null,
  p_zip text default null,
  p_statuses text[] default null
)
returns json
language sql
stable
security invoker
set search_path = public
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

-- Read-only access for the anon key, matching the table's RLS policy.
grant execute on function public.get_building_counts(
  text[], text, text[]
) to anon, authenticated;
