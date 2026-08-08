/**
 * The `buildings` row shape and everything derived from it that is pure
 * presentation: borough casing, colours, address formatting.
 *
 * No data is fetched here and no dataset is embedded here. Every read goes
 * through `lib/data/buildings.ts`.
 */

/**
 * Borough values are stored uppercase in Postgres and are never rewritten on
 * the way in or out. Display casing is applied at render time only.
 */
export const BOROUGHS = [
  "MANHATTAN",
  "BRONX",
  "BROOKLYN",
  "QUEENS",
  "STATEN ISLAND",
] as const;

export type Borough = (typeof BOROUGHS)[number];

export type GeocodeQuality = "exact" | "approximate";

/** One row of the `buildings` table. Nullable columns are nullable here too. */
export type Building = {
  id: string;
  bbl: string | null;
  borough: Borough;
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
  geocode_quality: GeocodeQuality;
  created_at?: string | null;
};

/** Columns every adapter returns. Kept in one place so the two agree. */
export const BUILDING_COLUMNS = [
  "id",
  "bbl",
  "borough",
  "zip",
  "house_number_raw",
  "house_number_low",
  "house_number_high",
  "street",
  "street_suffix",
  "secondary_address",
  "statuses",
  "block",
  "lot",
  "lat",
  "lng",
  "geocode_quality",
] as const;

export const BOROUGH_LABELS: Record<Borough, string> = {
  MANHATTAN: "Manhattan",
  BRONX: "Bronx",
  BROOKLYN: "Brooklyn",
  QUEENS: "Queens",
  "STATEN ISLAND": "Staten Island",
};

/**
 * `base` is the marker/dot fill. It is a graphical object, so it only needs
 * 3:1 against cream, which all five clear.
 *
 * `text` is a darkened variant used wherever the colour carries a label. Every
 * `text` value clears 4.5:1 against cream, paper and its own `soft` tint.
 * `npm run check:contrast` re-verifies all of it.
 */
export type BoroughColor = {
  base: string;
  soft: string;
  text: string;
  ring: string;
};

export const BOROUGH_COLORS: Record<Borough, BoroughColor> = {
  MANHATTAN: {
    base: "#2f7d5f",
    soft: "#dcebe1",
    text: "#2a7156",
    ring: "#2f7d5f33",
  },
  BRONX: { base: "#c2632e", soft: "#f4e2d5", text: "#9d5025", ring: "#c2632e33" },
  BROOKLYN: {
    base: "#6b5ba8",
    soft: "#e4e0f1",
    text: "#63529d",
    ring: "#6b5ba833",
  },
  QUEENS: { base: "#2e6e9e", soft: "#d8e6f0", text: "#2b6894", ring: "#2e6e9e33" },
  "STATEN ISLAND": {
    base: "#b03a5b",
    soft: "#f6dde3",
    text: "#a93757",
    ring: "#b03a5b33",
  },
};

const BOROUGH_SET = new Set<string>(BOROUGHS);

export function isBorough(value: string): value is Borough {
  return BOROUGH_SET.has(value);
}

/** Falls back to Manhattan colouring rather than throwing on unexpected data. */
export function boroughColor(borough: string): BoroughColor {
  return isBorough(borough)
    ? BOROUGH_COLORS[borough]
    : BOROUGH_COLORS.MANHATTAN;
}

export function boroughLabel(borough: string): string {
  return isBorough(borough) ? BOROUGH_LABELS[borough] : borough;
}

/** Compass prefixes that stay uppercase: "W 135 Street", not "W 135 Street". */
const ALWAYS_UPPER = new Set(["N", "S", "E", "W", "NE", "NW", "SE", "SW"]);

/**
 * Display casing for addresses.
 *
 * The registration files are entirely uppercase. Rendering "346-350 FULTON
 * AVENUE" in a display serif reads as shouting, so headings are title-cased the
 * same way borough values are. This is presentation only: nothing is written
 * back, and the full detail view still prints the row exactly as registered.
 */
export function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/(\s+|-)/)
    .map((part) => {
      if (part.length === 0 || /^[\s-]+$/.test(part)) return part;
      const upper = part.toUpperCase();
      if (ALWAYS_UPPER.has(upper)) return upper;
      // Anything with a digit ("85", "116th", "3") is left as it came.
      if (/\d/.test(part)) return part;
      return part[0].toUpperCase() + part.slice(1);
    })
    .join("");
}

/** The address exactly as the registration file has it, all caps and all. */
export function rawPrimaryAddress(building: Building): string {
  return [building.house_number_raw, building.street, building.street_suffix]
    .filter((part) => part && part.trim().length > 0)
    .join(" ")
    .trim();
}

/**
 * "1385" + "FULTON" + "AVENUE" reads as "1385 Fulton Avenue". DHCR stores the
 * house number as raw text because ranges ("1385-1391") and Queens hyphenated
 * numbers ("85-15") both occur, so it is never re-derived from low/high.
 */
export function primaryAddress(building: Building): string {
  return titleCase(rawPrimaryAddress(building));
}

/** Street plus suffix, for the cases where the number is shown separately. */
export function streetLine(building: Building): string {
  return titleCase(
    [building.street, building.street_suffix]
      .filter((part) => part && part.trim().length > 0)
      .join(" ")
      .trim(),
  );
}

export function cityLine(building: Building): string {
  return [boroughLabel(building.borough), building.zip]
    .filter(Boolean)
    .join(", ");
}

/**
 * True when the registration covers a run of house numbers rather than one
 * number, which is why a single pin can stand for several street doors.
 */
export function isNumberRange(building: Building): boolean {
  return (
    building.house_number_low != null &&
    building.house_number_high != null &&
    building.house_number_high > building.house_number_low
  );
}

/**
 * Rough envelopes, used only to frame the map when the filters narrow to a
 * single borough. Nothing is queried against these; the viewport fetch always
 * uses the real map bounds.
 */
export const BOROUGH_BOUNDS: Record<
  Borough,
  { south: number; west: number; north: number; east: number }
> = {
  MANHATTAN: { south: 40.6985, west: -74.021, north: 40.8797, east: -73.9067 },
  BRONX: { south: 40.7855, west: -73.9339, north: 40.9176, east: -73.7654 },
  BROOKLYN: { south: 40.5707, west: -74.0419, north: 40.7395, east: -73.8334 },
  QUEENS: { south: 40.5417, west: -73.9626, north: 40.8007, east: -73.7004 },
  "STATEN ISLAND": {
    south: 40.4961,
    west: -74.2557,
    north: 40.6517,
    east: -74.0522,
  },
};

export function emptyBoroughCounts(): Record<Borough, number> {
  return {
    MANHATTAN: 0,
    BRONX: 0,
    BROOKLYN: 0,
    QUEENS: 0,
    "STATEN ISLAND": 0,
  };
}
