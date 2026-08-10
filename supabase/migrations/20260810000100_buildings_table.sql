-- Rent Stabilized NYC: the buildings table.
--
-- One row per building registration in the 2024 DHCR files, roughly 50,879 of
-- them. Read-only from the app's point of view: the anon key can SELECT and
-- nothing else.
--
-- Idempotent, so re-running it against a database that already has the table is
-- a no-op rather than an error.

-- pg_trgm backs the street search. Supabase keeps extensions in the
-- `extensions` schema, but a plain Postgres will have it in `public`. Setting
-- the search path for this migration lets `gin_trgm_ops` resolve either way,
-- and `create extension if not exists` leaves an existing install alone.
create schema if not exists extensions;
-- Session-level, not SET LOCAL: a migration run outside a transaction
-- (the Supabase SQL editor does this) silently ignores SET LOCAL, and then
-- `gin_trgm_ops` cannot be resolved because pg_trgm lives in `extensions`.
set search_path = public, extensions;

create extension if not exists pg_trgm with schema extensions;

create table if not exists public.buildings (
  id                 uuid primary key default gen_random_uuid(),

  -- Borough-Block-Lot. Not unique: a single lot can carry several registered
  -- buildings, and the source files repeat a BBL when that happens.
  bbl                text,

  -- Stored uppercase, exactly as the registration files have it. The app maps
  -- to display casing at render time and never rewrites what is stored.
  borough            text not null,
  zip                text,

  -- Kept as text because the source has ranges ("1385-1391") and Queens
  -- hyphenated numbers ("85-15"). low/high are the parsed bounds when the
  -- number could be split, and are null when it could not.
  house_number_raw   text,
  house_number_low   integer,
  house_number_high  integer,

  street             text not null,
  street_suffix      text,

  -- A second address the same registration is filed under, e.g. a corner
  -- building with doors on two streets.
  secondary_address  text,

  -- The registration status codes. Free text on purpose: the app renders an
  -- unrecognised code rather than dropping it, so a new code appearing in a
  -- future file will not break anything.
  statuses           text[] not null default '{}',

  block              text,
  lot                text,

  -- Joined offline by BBL. Nothing in the app geocodes at runtime.
  lat                double precision not null,
  lng                double precision not null,

  -- 'exact' when the join landed on a building, 'approximate' when it fell
  -- back to the block or the street. The UI flags the difference.
  geocode_quality    text not null default 'exact',

  created_at         timestamptz not null default now(),

  constraint buildings_borough_check
    check (borough in ('MANHATTAN', 'BRONX', 'BROOKLYN', 'QUEENS', 'STATEN ISLAND')),
  constraint buildings_geocode_quality_check
    check (geocode_quality in ('exact', 'approximate')),
  constraint buildings_lat_range_check check (lat between -90 and 90),
  constraint buildings_lng_range_check check (lng between -180 and 180)
);

comment on table public.buildings is
  'One row per 2024 DHCR building registration. A registration snapshot, not a legal determination: presence here does not confirm any specific apartment is rent stabilized, and absence does not mean a building has none.';

-- ── Indexes ────────────────────────────────────────────────────────────────
-- The map queries a lat/lng box on every settled pan. A composite btree keeps
-- that a range scan on lat with lng filtered in the index, which is plenty at
-- this table size.
create index if not exists buildings_lat_lng_idx
  on public.buildings using btree (lat, lng);

-- Street search. This is the index `search_buildings` is built around.
create index if not exists buildings_street_trgm_idx
  on public.buildings using gin (street gin_trgm_ops);

-- The three filters, each applied on its own and in combination.
create index if not exists buildings_borough_idx
  on public.buildings using btree (borough);

create index if not exists buildings_zip_idx
  on public.buildings using btree (zip);

-- Supports `statuses && $1`, the overlap operator the status filter uses.
create index if not exists buildings_statuses_gin_idx
  on public.buildings using gin (statuses);

create index if not exists buildings_bbl_idx
  on public.buildings using btree (bbl);

-- ── Grants and row level security ──────────────────────────────────────────
-- Two separate things, and both are needed. A policy decides WHICH ROWS a role
-- may see; the grant decides whether the role may touch the table at all. RLS
-- with no grant is just "permission denied for table buildings".
--
-- Supabase's project bootstrap sets default privileges that would grant these
-- anyway, but stating them here means the migration stands on its own and
-- behaves the same on a plain Postgres.
revoke all on public.buildings from anon, authenticated;
grant select on public.buildings to anon, authenticated;

-- search_buildings resolves `similarity()` and the `%` operator out of the
-- schema pg_trgm was installed into. Without USAGE on it the function fails
-- for anon with "function similarity(text, text) does not exist", which reads
-- like a missing extension rather than a missing grant.
grant usage on schema extensions to anon, authenticated;

-- Public SELECT, nothing else. There is deliberately no insert, update or
-- delete policy, so the anon key baked into the browser bundle cannot write
-- even if the grant above were ever widened by accident.
alter table public.buildings enable row level security;

drop policy if exists "buildings are publicly readable" on public.buildings;
create policy "buildings are publicly readable"
  on public.buildings
  for select
  to anon, authenticated
  using (true);
