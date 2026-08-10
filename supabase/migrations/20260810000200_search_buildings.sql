-- search_buildings: the street search, and the engine behind the list view.
--
-- Called by lib/data/supabase-adapter.ts. If this function is absent the
-- adapter falls back to a plain `ilike` on `street`, so the app works either
-- way, just without ranking.
--
-- Contract the adapter depends on:
--   * argument names exactly as below, every filter argument nullable
--   * returns the display columns, plus `score` and `total_count`
--   * `total_count` is the count ignoring p_limit/p_offset, repeated on every
--     row; the adapter reads it off row 0
--   * q = '' means browse: no text match, ordered by borough then street
--
-- Shape note, learned the hard way against 50,879 rows. The obvious version of
-- this,
--
--   with matched as (select b.*, <score> from buildings b where <predicates>),
--        counted as (select count(*) from matched)
--   select ... from matched cross join counted order by ... limit ...
--
-- runs in about 110ms when `q` is a literal and about 168 SECONDS when `q` is a
-- parameter, which is how the app always calls it. With a literal the planner
-- folds the empty string to null, collapses the predicate and evaluates the
-- count once; with a parameter it produces a generic plan that re-runs the
-- aggregate against the materialised CTE per row.
--
-- So: no `cross join` against an aggregate. `count(*) over ()` gets the total in
-- the same single pass, and the pass carries only the id and the sort keys
-- rather than every column, which keeps the sort payload small. The full rows
-- are fetched at the end by primary key, for one page only.

-- Session-level, not SET LOCAL: a migration run outside a transaction
-- (the Supabase SQL editor does this) silently ignores SET LOCAL, and then
-- `gin_trgm_ops` cannot be resolved because pg_trgm lives in `extensions`.
set search_path = public, extensions;

create or replace function public.search_buildings(
  q          text    default '',
  p_boroughs text[]  default null,
  p_zip      text    default null,
  p_statuses text[]  default null,
  p_limit    int     default 50,
  p_offset   int     default 0
)
returns table (
  id                 uuid,
  bbl                text,
  borough            text,
  zip                text,
  house_number_raw   text,
  house_number_low   int,
  house_number_high  int,
  street             text,
  street_suffix      text,
  secondary_address  text,
  statuses           text[],
  block              text,
  lot                text,
  lat                double precision,
  lng                double precision,
  geocode_quality    text,
  created_at         timestamptz,
  score              real,
  total_count        bigint
)
language sql
stable
security invoker
-- `extensions` is on the path because that is where Supabase installs pg_trgm,
-- and `similarity()` and the `%` operator both come from it.
set search_path = public, extensions
as $$
  with needle as (
    select nullif(btrim(q), '') as term
  ),
  -- Narrow: the id, the sort keys, and the score. Nothing else is carried
  -- through the sort.
  matched as (
    select
      b.id,
      b.borough,
      b.street,
      b.house_number_low,
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
        -- `%` is the pg_trgm similarity operator and the index-using path.
        or b.street % n.term
        -- Terms shorter than the similarity threshold score too low for `%` to
        -- match at all, so a substring pass keeps "nos" usable.
        or b.street ilike '%' || n.term || '%'
      )
  ),
  -- One pass gets the window total; no second scan, no aggregate to join to.
  ranked as (
    select m.*, count(*) over () as total_count
    from matched m
  ),
  page as (
    select r.*
    from ranked r
    order by
      r.score desc,
      r.borough asc,
      r.street asc,
      r.house_number_low asc nulls last,
      -- id last so paging can never repeat or skip a row when everything above
      -- ties, which it does constantly in browse mode.
      r.id asc
    limit greatest(p_limit, 0)
    offset greatest(p_offset, 0)
  )
  select
    b.id,
    b.bbl,
    b.borough,
    b.zip,
    b.house_number_raw,
    b.house_number_low,
    b.house_number_high,
    b.street,
    b.street_suffix,
    b.secondary_address,
    b.statuses,
    b.block,
    b.lot,
    b.lat,
    b.lng,
    b.geocode_quality,
    b.created_at,
    p.score,
    p.total_count
  from page p
  join public.buildings b on b.id = p.id
  -- A join does not preserve the inner ordering, so it is restated here.
  order by
    p.score desc,
    p.borough asc,
    p.street asc,
    p.house_number_low asc nulls last,
    p.id asc;
$$;

comment on function public.search_buildings(text, text[], text, text[], int, int) is
  'Trigram street search over public.buildings. Empty q means browse. Every row carries the same total_count, the match count ignoring limit and offset.';

-- Read-only access for the anon key, matching the table's RLS policy. The
-- function is security invoker, so RLS still applies to the caller.
grant execute on function public.search_buildings(text, text[], text, text[], int, int)
  to anon, authenticated;
