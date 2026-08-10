# Rent Stabilized NYC

A personal, read-only map of the buildings in the 2024 DHCR rent stabilization
building registration files, across all five boroughs. Roughly 50,879
registrations.

Front end only. The parser, the seed CSVs and the Supabase schema are a separate
finished piece of work and nothing in this repo touches them.

**This is a registration snapshot, not a legal determination.** A building
appearing here does not confirm that any specific apartment is rent stabilized,
and a building missing from here does not mean it has none, because listing
depends on the owner having filed a registration. The only way to confirm an
individual apartment is HCR, at <https://portal.hcr.ny.gov/app/ask>. That note is
visible on every screen of the app, not just in this file.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>. No keys, no environment, no database: with no
environment variables set the app runs on a bundled 340-row development fixture.

Other scripts:

```bash
npm run build
npm run lint
npm run check:contrast
```

## Data layer

Everything the UI knows about buildings comes through `lib/data/buildings.ts`,
which exposes exactly three functions:

| Function                                             | Used by                                     |
| ---------------------------------------------------- | ------------------------------------------- |
| `getBuildingsInBounds(bounds, filters, limit = 2000)` | the map, on every settled pan or zoom       |
| `searchBuildings(query, filters, { limit, offset })`  | search, and the paged list (empty query = browse) |
| `getBuildingCounts(filters)`                          | the title count, legend, chips and status filter |

No component imports a Supabase client, an adapter, or the fixture. Two
implementations sit behind that seam and are chosen at runtime:

- **Supabase adapter**, used when `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` are both set.
- **Mock adapter**, used otherwise. It serves `lib/data/mock-fixture.ts`, a
  dev-only file of 340 synthetic rows spanning all five boroughs, including
  approximate-geocode rows, secondary addresses and all 19 status codes.

Moving between them is an environment change and nothing else. The two were
verified against the same browser session with no source edits between runs.

The full dataset is never bundled and never hardcoded into a TS module. The
fixture exists so the loading, empty, capped and error states can be exercised
in development, and it is labelled as fake at the top of the file.

### Database

`supabase/` holds everything needed to stand the database up: three migrations,
an import guide and a post-import check script. See
[supabase/README.md](supabase/README.md).

| Migration                                | What it does                                      |
| ---------------------------------------- | ------------------------------------------------- |
| `20260810000100_buildings_table.sql`     | `pg_trgm`, the `buildings` table, six indexes, grants, RLS |
| `20260810000200_search_buildings.sql`    | `search_buildings()`, trigram search and list paging |
| `20260810000300_get_building_counts.sql` | `get_building_counts()`, the totals behind every counter |

The adapter prefers both functions and falls back cleanly if either is absent
(PostgREST reports `PGRST202`, which the adapter latches so it stops retrying).
`search_buildings` falls back to `ilike` on `street`; `get_building_counts`
falls back to 25 count-only queries.

The migrations were applied to a real PostgreSQL 16 loaded with 50,879 rows
before being committed, on a clean database and twice on top of themselves.
Doing that caught three things a review would not have: `SET LOCAL` is silently
ignored outside a transaction, so `gin_trgm_ops` would not resolve; `anon` needs
a table `GRANT` as well as an RLS policy, or every read is "permission denied";
and `anon` needs `USAGE` on the schema holding `pg_trgm`, or search fails with
what looks like a missing extension.

### Environment

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both optional, both public. The anon key belongs in the browser here because the
`buildings` table's RLS policy grants `SELECT` and nothing else. Never put a
service-role key in a `NEXT_PUBLIC_` variable. See `.env.example`.

## Map rendering

The reference this was built from drew one DOM pin per site, which is fine for 21
sites and impossible for 50,000 buildings. This one is canvas throughout:

- `MapContainer` runs with `preferCanvas` and a single shared `L.canvas()`
  renderer. Handing Leaflet a new renderer would tear down the whole surface, so
  it is created once and never replaced.
- Supercluster groups whatever the viewport fetch returned. Its `maxZoom` is one
  below `POINT_ZOOM` (15), so the zoom tiering is that one setting rather than
  two code paths: below it you get bubbles, at or above it every row is its own
  circle.
- Cluster bubbles are canvas circles that paint their own count. Leaflet has no
  canvas text primitive, so `lib/cluster.ts` subclasses `L.CircleMarker` and
  draws the label in `_updatePath`, where the renderer hands a layer its 2D
  context. Staying a real `CircleMarker` means hit testing, hover and click keep
  working, and a missing count degrades to a blank bubble rather than a crash.
- Bubbles are tinted by their dominant borough and drawn softer when they mix
  boroughs, so a solid fill always means "everything in here is one borough".
  Radius is density-aware: it scales against the largest bubble currently on
  screen, so forty buildings and two thousand both read.
- Layers are added a slice per animation frame, so dropping two thousand circles
  onto the map never stalls a pan or a tap.
- **The selected building is the only DOM marker on the map.** It gets the
  reference's teardrop pin, its shadow and its selected-state pulse, plus a
  dashed halo when the location is approximate.

Viewport fetches are padded 25% past the visible edge, debounced 250ms after
movement settles, capped at 2,000 rows, and cancelled with an `AbortController`
when the map moves again. When a viewport holds more than the cap, the app does
not fetch the rest: it keeps showing clusters and offers a "zoom in" affordance.

## Status system

`lib/status-definitions.ts` carries all 19 codes, each with a display label, a
short plain-language explanation, a family colour and a `lastReviewed` date.

Nothing is scraped from HCR and nothing is authoritative. Every explanation is
written to be visibly provisional ("appears to indicate", "read as"). Four codes
are flagged `verify: true` and render an extra warning wherever they appear,
because they look like internal shorthand rather than published labels:
**ART V**, **HPD**, **SEC 608**, **420C**.

Nineteen distinct hues would be nineteen indistinguishable hues at chip size, so
colour carries one of four families (building type, tax benefit, public program,
coop or condo) and the label carries the code.

## Views

**Map** is the default. **List** is a virtualised, server-paged directory built
on `searchBuildings` with an empty query meaning browse. It uses `react-window`,
appends a page as you approach the end, and never renders the full set. The
reference's three-column directory rendered every row it had; that does not
scale past a few dozen.

Both views share one `FilterBar`: borough chips (multi-select, five boroughs), a
ZIP filter, and a multi-select over the 19 status codes. Everything flows into
one `Filters` object, through the single seam, into every query and into the
counts.

## Design

Kept from the reference: Tailwind v4 `@theme` tokens, the floating-card language,
the warm CARTO Voyager tile muting, safe-area handling, reduced-motion handling,
the detail-panel-to-bottom-sheet pattern, and the Framer Motion usage.

Extended here:

- Staten Island's colour, plus a soft and a text variant, distinct from the
  other four.
- A four-family status colour palette.
- A five-step type scale (`display-xl` / `display-lg` / `display-md` / body /
  `eyebrow`), with a mono face reserved for numbers so a count never reflows as
  its digits change.
- Four steps of shadow rather than three, so a popover can sit above a panel
  without either flattening.
- Real empty, loading, error and too-many states in both views.

### Accessibility

`npm run check:contrast` verifies every borough colour and every status chip.
The rules it enforces: a colour used as label text needs 4.5:1 against cream,
against paper, and against its own soft tint; a colour used only as a marker fill
is a graphical object and needs 3:1 against cream. It exits non-zero on failure
and it caught one real problem during the build (the caution accent, since
darkened to `#8e5e11`).

The values are duplicated into the script on purpose. A check that imports the
constant it is checking cannot catch a bad edit to that constant.

Also: focus-visible rings on everything, a `prefers-reduced-motion` path for the
pulse, the fly-to and the cluster expansion, 44px touch targets, and a 16px
search input because anything smaller makes iOS Safari zoom the page on focus.

Canvas points cannot hold focus or be read out. The map announces its state
through a polite live region, and the list view is the keyboard and screen reader
path through the same data, with the same filters.

### Address casing

The registration files are entirely uppercase. Headings are title-cased for
readability, the same way borough values are mapped to display casing. This is
presentation only: nothing is written back, and the full detail view prints an
**As registered** line with the row exactly as filed, which is the string to
quote when asking HCR about a building.

## Deploy

`netlify.toml` is in the repo, so no build settings need typing into the
dashboard.

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Netlify reads `netlify.toml` and installs `@netlify/plugin-nextjs`.
4. Deploy.

Set the two Supabase variables under **Site configuration → Environment
variables** when the real database should be used. With neither set the deploy
still works, on the fixture.

Tiles come from CARTO's keyless Voyager endpoint. There is no Google, no Mapbox,
no keyed geocoder, and no runtime geocoding anywhere: `lat`/`lng` already live in
the database, joined offline by BBL.

## Structure

```
app/
  layout.tsx           fonts (Fraunces + Inter), Leaflet CSS, metadata
  page.tsx             server component, renders the explorer
  globals.css          theme tokens, type scale, Leaflet overrides, pin styles
  icon.svg, apple-icon.tsx, opengraph-image.tsx
components/
  BuildingExplorer.tsx    owns all state, switches between map and list
  BuildingMap.tsx         Leaflet, shared canvas renderer, clustering, the one pin
  DetailPanel.tsx         right-side panel on desktop, bottom sheet on mobile
  BuildingDetailView.tsx  full record (lazy), every status explained in full
  BuildingDetailSkeleton.tsx
  DirectoryView.tsx       the list screen
  BuildingListView.tsx    virtualised rows, empty / loading / too-many states
  FilterBar.tsx           view toggle, search, ZIP, status, borough chips
  BoroughChips.tsx  ZipFilter.tsx  StatusFilter.tsx  StatusChip.tsx
  SearchField.tsx  SearchResults.tsx  MapSearchPreview.tsx
  Legend.tsx  TitleBlock.tsx  ViewToggle.tsx
  ResponsibilityNote.tsx  the persistent disclaimer, in one place
  ApproximateFlag.tsx
lib/
  buildings.ts         the Building type, borough casing and colours, formatting
  status-definitions.ts the 19 codes, provisional wording, families, colours
  cluster.ts           supercluster wiring, canvas bubbles, chunked layer adds
  marker.ts            the single divIcon pin
  hooks.ts             the fetching hooks, all cancel-and-derive
  directions.ts        Apple Maps vs Google Maps URL by platform
  data/
    buildings.ts       THE SEAM: exactly three functions
    types.ts           Bounds, Filters, results
    source.ts          which adapter is live
    supabase-adapter.ts
    mock-adapter.ts
    mock-fixture.ts    DEV ONLY, 340 synthetic rows
    database.types.ts  hand-written schema types for the client generic
scripts/
  check-contrast.mjs   WCAG check, exits non-zero on failure
supabase/
  README.md                  setup, CSV import, env vars, measured timings
  verify.sql                 post-import sanity checks, read-only
  migrations/                three files, run in filename order
```

## What was removed from the reference

The hardcoded `SITES` array and the `Site` / `Office` / `Place` types; the admin
office marker and every office concept; per-site photos (`SitePhoto`,
`public/photos`, the `photo` field); `lib/geo.ts` nearest-neighbour and the
"nearby sites" UI; all Nominatim references and any runtime geocoding; the
"Open site record" stub; and every four-borough assumption.

## Verified

- Loads a clustered map of all five boroughs with no keys and tiles muted warm.
- Panning refetches viewport rows, debounced, capped and cancelled; zooming
  resolves clusters into canvas points; selecting shows the single pin plus the
  panel or sheet with status chips, BBL, block, lot, and the approximate flag.
- Borough, ZIP and status filters and server-side search all work through the
  one seam, and counts follow the filters.
- List view is virtualised and server-paged.
- The disclaimer is visible on every screen, including with the detail panel
  open, and the HCR link is the only confirm path.
- Runs on the mock adapter with no environment, and on the Supabase adapter with
  the variables set, with no component changes between them. The Supabase
  adapter was exercised against a PostgREST-shaped server in both modes: with
  the RPCs present, and with them returning `PGRST202` so the fallbacks run.

- The migrations run clean on PostgreSQL 16, are idempotent across repeated
  applications, and were exercised with 50,879 rows loaded. `anon` can read and
  cannot insert, update or delete. Both functions return the exact shapes the
  adapter parses, `total_count` matches an independent count, and three
  consecutive pages of browse mode return 150 rows with 150 distinct ids, so
  paging neither repeats nor skips.
- Measured with the full row count: viewport box ~3ms, viewport plus filters
  ~6ms, browse ~37ms, street search ~60ms, counts ~92ms.

Not verified: none of this has run against a hosted Supabase project, only
against a local PostgreSQL 16 with the same roles, grants and RLS. The CSV
import has been tested against a small sample shaped like the awkward case,
not against the real files.
