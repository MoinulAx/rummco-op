# Supabase setup

Everything needed to point the app at the real 50,879 rows. Three migrations, a
CSV import, and two environment variables.

Until the two variables are set the app runs on its bundled 340-row development
fixture, so nothing here has to be done in one sitting and nothing breaks
half-way through.

## 1. Create the project

New project at <https://supabase.com/dashboard>. Any region; New York data with a
US East region keeps latency low. Note the database password, it is shown once.

## 2. Run the migrations

Three files, in filename order:

| File                                     | What it does                                      |
| ---------------------------------------- | ------------------------------------------------- |
| `20260810000100_buildings_table.sql`     | `pg_trgm`, the `buildings` table, six indexes, grants, RLS |
| `20260810000200_search_buildings.sql`    | `search_buildings()`, the trigram search and list paging |
| `20260810000300_get_building_counts.sql` | `get_building_counts()`, the totals behind every counter |

**Dashboard route.** SQL Editor, paste each file in order, run each one. They are
idempotent, so re-running one is safe.

**CLI route.** With the [Supabase CLI](https://supabase.com/docs/guides/cli)
installed:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migrations were applied against a real PostgreSQL 16 loaded with 50,879 rows
before being committed, twice on a clean database and twice more on top of
themselves, so ordering and re-runs are known to be clean.

## 3. Import the CSV

The seed CSVs come from the parser task; nothing in this repo generates them.
The table's column order is:

```
bbl, borough, zip, house_number_raw, house_number_low, house_number_high,
street, street_suffix, secondary_address, statuses, block, lot,
lat, lng, geocode_quality
```

`id` and `created_at` have defaults, so leave them out of the import.

Two things trip this up, and both are worth knowing before you start:

- **`borough` must be uppercase** and one of `MANHATTAN`, `BRONX`, `BROOKLYN`,
  `QUEENS`, `STATEN ISLAND`. A check constraint rejects anything else, which is
  deliberate: a silently mis-cased borough would just vanish from the map.
- **`statuses` is `text[]`, not text.** In a CSV that means a Postgres array
  literal, `{"MULTIPLE DWELLING A","J-51"}`, quoted because the codes contain
  spaces and commas. If the CSV has them delimited some other way, use route B.

### Route A: the CSV already matches

From `psql`, connected with the connection string in Project Settings, Database:

```bash
\copy public.buildings (bbl, borough, zip, house_number_raw, house_number_low, house_number_high, street, street_suffix, secondary_address, statuses, block, lot, lat, lng, geocode_quality) FROM 'buildings.csv' WITH (FORMAT csv, HEADER true, NULL '')
```

`NULL ''` matters: without it every empty cell arrives as an empty string, and
`zip = ''` is not the same as `zip is null` to any of the filters.

The dashboard's Table Editor CSV import works for a file of this size too, and is
the easier route if psql is a hassle. It is slower and it will not tell you much
when a row is rejected.

### Route B: statuses is a delimited string

Load into a staging table as text, then split. This is also the route to take if
the CSV column order does not match, since the staging table can be shaped to fit
the file rather than the other way round.

```sql
create table staging_buildings (
  bbl text, borough text, zip text,
  house_number_raw text, house_number_low text, house_number_high text,
  street text, street_suffix text, secondary_address text,
  statuses text,            -- e.g. "MULTIPLE DWELLING A|J-51"
  block text, lot text, lat text, lng text, geocode_quality text
);
```

```bash
\copy staging_buildings FROM 'buildings.csv' WITH (FORMAT csv, HEADER true, NULL '')
```

```sql
insert into public.buildings (
  bbl, borough, zip, house_number_raw, house_number_low, house_number_high,
  street, street_suffix, secondary_address, statuses, block, lot,
  lat, lng, geocode_quality
)
select
  nullif(btrim(bbl), ''),
  upper(btrim(borough)),
  nullif(btrim(zip), ''),
  nullif(btrim(house_number_raw), ''),
  nullif(btrim(house_number_low), '')::int,
  nullif(btrim(house_number_high), '')::int,
  upper(btrim(street)),
  nullif(upper(btrim(street_suffix)), ''),
  nullif(btrim(secondary_address), ''),
  -- Change the delimiter to match the file. array_remove drops the empty
  -- string a trailing delimiter would otherwise leave behind.
  coalesce(
    array_remove(string_to_array(upper(btrim(statuses)), '|'), ''),
    '{}'
  ),
  nullif(btrim(block), ''),
  nullif(btrim(lot), ''),
  btrim(lat)::double precision,
  btrim(lng)::double precision,
  coalesce(nullif(lower(btrim(geocode_quality)), ''), 'exact')
from staging_buildings
-- A row with no coordinates cannot be drawn, and lat/lng are NOT NULL.
where btrim(coalesce(lat, '')) <> '' and btrim(coalesce(lng, '')) <> '';

drop table staging_buildings;
```

Then let the planner see the new statistics:

```sql
analyze public.buildings;
```

## 4. Check the import

```bash
psql "YOUR_CONNECTION_STRING" -f supabase/verify.sql
```

It prints row counts per borough, the status codes actually present, whether
`statuses` imported as arrays or as one string per row, coordinates outside New
York, and confirms the anon role can read but not write. All read-only.

The check that catches the most common mistake is `max_codes`: if that is 1
across the whole table, a delimited string was loaded verbatim instead of being
split, and the status filter will look broken in a way that is hard to trace back.

## 5. Point the app at it

Project Settings, API. Copy the **Project URL** and the **anon public** key into
`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Restart `npm run dev`. That is the whole switch: no component changes, no code
changes. The header count going from 340 to 50,879 is how you know it took.

For Netlify, the same two under Site configuration, Environment variables, then
redeploy.

The anon key is meant to be public and is inlined into the browser bundle. It is
safe here because `buildings` grants `select` and nothing else, and carries no
insert, update or delete policy. **Never put the service-role key in a
`NEXT_PUBLIC_` variable**; it bypasses RLS entirely.

## What the app asks of the database

Measured on PostgreSQL 16 with all 50,879 rows loaded:

| Query                                    | Time    |
| ---------------------------------------- | ------- |
| Viewport box, 2,000 row cap              | ~3ms    |
| Viewport box plus borough and status      | ~6ms    |
| `search_buildings`, browse mode           | ~37ms   |
| `search_buildings`, a street term         | ~60ms   |
| `get_building_counts`, no filters         | ~92ms   |

`get_building_counts` is the slowest because it scans the table to build the
per-status tallies. It runs once per filter change, not per pan, and the adapter
caches its result for the life of the page, since a 2024 snapshot cannot change
underneath you.

If `search_buildings` or `get_building_counts` is missing, the adapter notices
(PostgREST returns `PGRST202`), latches that fact so it stops retrying, and falls
back to plain queries. The app keeps working. The counts fallback costs 25
count-only requests per filter change, which is exactly why the function exists.

## What you will and will not see once it is connected

Connected, every counter is a true total across all 50,879 rows: the header, the
legend, the borough chips, the status filter. The list view pages through the
whole set. Search runs across the whole set.

The one place the map shows less than everything is the cluster bubbles at
city-wide zoom. The map fetches the viewport capped at 2,000 rows, so at zoom 11
the bubbles are grouped from a 2,000-row sample and their numbers do not add up
to 50,879. The map says so when the cap is hit, and zooming in resolves it.

Making those low-zoom bubbles show true counts needs server-side grid
aggregation: a third function that buckets by rounded lat/lng per zoom and
returns one row per cell instead of one per building. That is a real improvement
and not much SQL, but it adds a fourth function to a data layer that is
deliberately three, so it is a decision rather than something to slip in.
