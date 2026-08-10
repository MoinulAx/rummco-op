-- Post-import sanity checks. Run this after loading the CSV; it reads only.
--
-- Nothing here is required for the app to work. It is here because the way this
-- import goes wrong is quietly: a borough that failed its check constraint and
-- got skipped, a statuses column that imported as one string per row instead of
-- an array, coordinates that landed outside New York. All of those look fine on
-- the map until you go looking.

set search_path = public, extensions;

\echo '── Row count (expect roughly 50,879) ─────────────────────────────────'
select count(*) as buildings from public.buildings;

\echo ''
\echo '── Per borough (expect all five present) ─────────────────────────────'
select borough, count(*) as n
from public.buildings
group by borough
order by n desc;

\echo ''
\echo '── Geocode quality ──────────────────────────────────────────────────'
select geocode_quality, count(*) as n
from public.buildings
group by geocode_quality;

\echo ''
\echo '── Status codes present, most common first ──────────────────────────'
\echo '   Anything here that is not one of the 19 in lib/status-definitions.ts'
\echo '   will still render, labelled with its raw code and flagged to verify.'
select code, count(*) as n
from public.buildings, unnest(statuses) as code
group by code
order by n desc;

\echo ''
\echo '── Buildings carrying no status at all ──────────────────────────────'
select count(*) as no_statuses
from public.buildings
where statuses = '{}' or statuses is null;

\echo ''
\echo '── Did statuses import as arrays, or as one string per row? ─────────'
\echo '   max_codes = 1 across the whole table usually means a delimited'
\echo '   string was loaded verbatim instead of being split.'
select
  max(cardinality(statuses)) as max_codes,
  round(avg(cardinality(statuses)), 2) as avg_codes
from public.buildings;

\echo ''
\echo '── Coordinates outside a generous New York City box ─────────────────'
\echo '   Expect 0. Anything here will plot in the ocean or another state.'
select count(*) as outside_nyc
from public.buildings
where lat not between 40.40 and 40.95
   or lng not between -74.30 and -73.65;

\echo ''
\echo '── Rows missing the things the UI leans on ──────────────────────────'
select
  count(*) filter (where bbl is null)               as no_bbl,
  count(*) filter (where zip is null)               as no_zip,
  count(*) filter (where house_number_raw is null)  as no_house_number,
  count(*) filter (where street is null or street = '') as no_street,
  count(*) filter (where secondary_address is not null) as has_secondary
from public.buildings;

\echo ''
\echo '── The two functions actually answer ────────────────────────────────'
select (get_building_counts() ->> 'total')::bigint as counts_rpc_total;

select count(*) as search_rpc_rows
from search_buildings('broadway', null, null, null, 5, 0);

\echo ''
\echo '── The anon role can read and cannot write ──────────────────────────'
\echo '   Expect select = t and the other three = f. Asked of the catalogue'
\echo '   rather than by attempting writes, so this stays read-only.'
select
  has_table_privilege('anon', 'public.buildings', 'SELECT') as anon_select,
  has_table_privilege('anon', 'public.buildings', 'INSERT') as anon_insert,
  has_table_privilege('anon', 'public.buildings', 'UPDATE') as anon_update,
  has_table_privilege('anon', 'public.buildings', 'DELETE') as anon_delete;

\echo ''
\echo '── RLS is on, with exactly one read policy ──────────────────────────'
select
  (select relrowsecurity from pg_class where oid = 'public.buildings'::regclass) as rls_enabled,
  (select count(*) from pg_policies
    where schemaname = 'public' and tablename = 'buildings') as policies;

\echo ''
\echo '── anon can actually read through the policy ────────────────────────'
set role anon;
select count(*) as anon_visible_rows from public.buildings;
reset role;
