-- TODO: create this function in Supabase. The front end calls it first and
-- falls back to a plain `ilike` query on `street` when it is absent
-- (PostgREST error PGRST202), so the app works either way, just without
-- trigram ranking.
--
-- Prerequisites, both assumed to exist from the schema task:
--   create extension if not exists pg_trgm;
--   create index buildings_street_trgm_idx
--     on public.buildings using gin (street gin_trgm_ops);
--
-- Contract the adapter depends on (lib/data/supabase-adapter.ts):
--   * argument names exactly as below, all filter args nullable
--   * returns the display columns, plus `score` and `total_count`
--   * `total_count` is the count ignoring p_limit/p_offset, repeated on every
--     row; the adapter reads it off row 0
--   * q = '' means browse: no text match, ordered by borough then street

create or replace function public.search_buildings(
  q text default '',
  p_boroughs text[] default null,
  p_zip text default null,
  p_statuses text[] default null,
  p_limit int default 50,
  p_offset int default 0
)
returns table (
  id uuid,
  bbl text,
  borough text,
  zip text,
  house_number_raw text,
  house_number_low int,
  house_number_high int,
  street text,
  street_suffix text,
  secondary_address text,
  statuses text[],
  block text,
  lot text,
  lat double precision,
  lng double precision,
  geocode_quality text,
  created_at timestamptz,
  score real,
  total_count bigint
)
language sql
stable
security invoker
set search_path = public
as $$
  with needle as (
    select nullif(btrim(q), '') as term
  ),
  matched as (
    select
      b.*,
      case
        when n.term is null then 0::real
        else similarity(b.street, n.term)
      end as score
    from public.buildings b
    cross join needle n
    where
      (p_boroughs is null or b.borough = any (p_boroughs))
      and (p_zip is null or b.zip = p_zip)
      and (p_statuses is null or b.statuses && p_statuses)
      and (
        n.term is null
        -- `%` is the pg_trgm similarity operator and is the index-using path.
        -- The ilike keeps short terms (below similarity_threshold) usable.
        or b.street % n.term
        or b.street ilike '%' || n.term || '%'
      )
  ),
  counted as (
    select count(*) as total from matched
  )
  select
    m.id,
    m.bbl,
    m.borough,
    m.zip,
    m.house_number_raw,
    m.house_number_low,
    m.house_number_high,
    m.street,
    m.street_suffix,
    m.secondary_address,
    m.statuses,
    m.block,
    m.lot,
    m.lat,
    m.lng,
    m.geocode_quality,
    m.created_at,
    m.score,
    c.total as total_count
  from matched m
  cross join counted c
  order by
    m.score desc,
    m.borough asc,
    m.street asc,
    m.house_number_low asc nulls last,
    m.id asc
  limit greatest(p_limit, 0)
  offset greatest(p_offset, 0);
$$;

-- Read-only access for the anon key, matching the table's RLS policy.
grant execute on function public.search_buildings(
  text, text[], text, text[], int, int
) to anon, authenticated;
