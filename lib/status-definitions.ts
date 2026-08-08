/**
 * Plain-language notes on the 19 status codes that appear in the 2024 DHCR
 * building registration files.
 *
 * These are written by hand for this app. Nothing here is scraped from HCR and
 * nothing here is official. The codes in the registration files are terse and
 * several of them look like internal shorthand rather than published labels, so
 * every entry below is provisional and four of them are explicitly flagged as
 * low confidence. HCR is the authority for what any of it means, and for
 * whether a particular apartment is stabilized.
 */

export const HCR_ASK_URL = "https://portal.hcr.ny.gov/app/ask";

/**
 * Grouping the codes into four families is what makes 19 colours legible. A
 * per-code hue would be indistinguishable at chip size, so a code carries its
 * family's colour and earns its identity from the label.
 */
export type StatusFamily = "dwelling" | "tax" | "finance" | "conversion";

export type StatusFamilyStyle = {
  label: string;
  base: string;
  soft: string;
  text: string;
};

/**
 * Every `text` value clears WCAG AA (4.5:1) against cream, paper and its own
 * `soft` tint. Verified by `npm run check:contrast`.
 */
export const STATUS_FAMILIES: Record<StatusFamily, StatusFamilyStyle> = {
  dwelling: {
    label: "Building type",
    base: "#7a5b34",
    soft: "#efe4d3",
    text: "#7a5b34",
  },
  tax: {
    label: "Tax benefit",
    base: "#4a6d34",
    soft: "#e2ebd8",
    text: "#4a6d34",
  },
  finance: {
    label: "Public program",
    base: "#2b6470",
    soft: "#d9e9ec",
    text: "#2b6470",
  },
  conversion: {
    label: "Coop or condo",
    base: "#8a4a6b",
    soft: "#f0dfe8",
    text: "#8a4a6b",
  },
};

export type StatusDefinition = {
  /** Exactly as stored in the `statuses` text[] column. */
  code: string;
  /** Display casing for chips and filter rows. */
  label: string;
  /** One or two sentences, plain language, deliberately hedged. */
  explanation: string;
  family: StatusFamily;
  /**
   * True for codes that read like shorthand rather than an official label.
   * These render an extra visible "verify with HCR" note.
   */
  verify: boolean;
  /** When the wording above was last looked over by a person. */
  lastReviewed: string;
};

const REVIEWED = "2026-08-08";

/** Order is the order the filter list and the legend use. */
export const STATUS_DEFINITIONS: StatusDefinition[] = [
  {
    code: "MULTIPLE DWELLING A",
    label: "Multiple Dwelling A",
    explanation:
      "Appears to mark a Class A multiple dwelling, meaning a building meant for permanent residence with three or more independent households. This is the most common code in the registration files and on its own it says more about the building type than about any one apartment.",
    family: "dwelling",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "MULTIPLE DWELLING B",
    label: "Multiple Dwelling B",
    explanation:
      "Appears to mark a Class B multiple dwelling, the category used for buildings occupied more transiently, such as rooming houses and some single room occupancy buildings. Coverage rules for these differ from ordinary apartment buildings.",
    family: "dwelling",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "GARDEN COMPLEX",
    label: "Garden Complex",
    explanation:
      "Appears to mark a garden apartment complex, where several low rise buildings on shared grounds are registered together. One registration line can therefore stand for more than one street address.",
    family: "dwelling",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "ROOMING HOUSE",
    label: "Rooming House",
    explanation:
      "Appears to mark a building registered as a rooming house, where rooms rather than self contained apartments are rented. Rent regulation for rooming units follows its own rules.",
    family: "dwelling",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "HOTEL",
    label: "Hotel",
    explanation:
      "Appears to mark a building registered under the hotel provisions. Stabilized hotel and single room occupancy units exist, but the conditions attached to them are not the same as for a standard apartment.",
    family: "dwelling",
    verify: false,
    lastReviewed: REVIEWED,
  },

  {
    code: "421-A (1-15)",
    label: "421-a (1-15)",
    explanation:
      "Appears to indicate a 421-a tax exemption under the older program tiers. Buildings receiving this benefit are generally required to register units as stabilized while the benefit runs, so coverage can end when the benefit does.",
    family: "tax",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "421-A (16)",
    label: "421-a (16)",
    explanation:
      "Appears to indicate the 421-a program tier introduced in 2017, sometimes called Affordable New York. Registration under a tax benefit is tied to the term of that benefit rather than to the building permanently.",
    family: "tax",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "421-G",
    label: "421-g",
    explanation:
      "Appears to indicate the 421-g benefit used for converting Lower Manhattan commercial buildings into housing. Courts have looked at these buildings closely, so the status of an individual unit is worth confirming directly.",
    family: "tax",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "J-51",
    label: "J-51",
    explanation:
      "Appears to indicate the J-51 benefit for building renovation. Receiving J-51 has generally carried a registration requirement for the life of the benefit, and sometimes beyond it depending on the building's history.",
    family: "tax",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "420C",
    label: "420c",
    explanation:
      "Read as a reference to the 420-c tax exemption used for affordable housing developed with public financing. The code as written in the files is shorthand, so treat this reading as unconfirmed.",
    family: "tax",
    verify: true,
    lastReviewed: REVIEWED,
  },

  {
    code: "SEC 608",
    label: "Sec 608",
    explanation:
      "Read as a reference to a Section 608 financing program, historically a federal mortgage insurance program for rental housing. The abbreviation is ambiguous in the source files and this reading is unconfirmed.",
    family: "finance",
    verify: true,
    lastReviewed: REVIEWED,
  },
  {
    code: "SECTION 610 OF PHFL",
    label: "Section 610 of PHFL",
    explanation:
      "Appears to reference Section 610 of the Private Housing Finance Law, which covers buildings leaving the Mitchell-Lama program. Buildings on this path often carry regulation that depends on when they were built and when they exited.",
    family: "finance",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "ART V",
    label: "Art V",
    explanation:
      "Read as a reference to Article V of the Private Housing Finance Law, covering redevelopment company housing. The code is written as bare shorthand in the files, so this reading is unconfirmed.",
    family: "finance",
    verify: true,
    lastReviewed: REVIEWED,
  },
  {
    code: "ARTICLE 11",
    label: "Article 11",
    explanation:
      "Appears to reference Article XI of the Private Housing Finance Law, the tax exemption route used for housing development fund companies. Buildings under it are usually tied to an affordability agreement with the city.",
    family: "finance",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "ARTICLES 14 & 15",
    label: "Articles 14 & 15",
    explanation:
      "Appears to reference Articles XIV and XV of the Private Housing Finance Law, which cover limited profit and limited dividend housing companies. These are the statutes behind much of the Mitchell-Lama stock.",
    family: "finance",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "HPD",
    label: "HPD",
    explanation:
      "Read as a marker that the building is connected to a New York City Department of Housing Preservation and Development program. The files do not say which program, so this tells you where to ask rather than what applies.",
    family: "finance",
    verify: true,
    lastReviewed: REVIEWED,
  },

  {
    code: "NON-EVICT COOP/CONDO",
    label: "Non-evict Coop or Condo",
    explanation:
      "Appears to mark a building converted to cooperative or condominium ownership under a non-eviction plan. Renters who did not buy generally stayed on, and stabilized tenancies could continue after the conversion.",
    family: "conversion",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "EVICT COOP/CONDO",
    label: "Evict Coop or Condo",
    explanation:
      "Appears to mark a building converted under an eviction plan, where non-purchasing renters could be required to leave after a protected period. Remaining regulated tenancies in these buildings are limited.",
    family: "conversion",
    verify: false,
    lastReviewed: REVIEWED,
  },
  {
    code: "COOP/CONDO PLAN FILE",
    label: "Coop or Condo Plan Filed",
    explanation:
      "Appears to mark that a conversion plan was filed for the building. A filed plan is not the same as a completed conversion, so this may describe an intention rather than a finished change.",
    family: "conversion",
    verify: false,
    lastReviewed: REVIEWED,
  },
];

export const STATUS_CODES: string[] = STATUS_DEFINITIONS.map((s) => s.code);

const BY_CODE = new Map(STATUS_DEFINITIONS.map((s) => [s.code, s]));

/**
 * Unknown codes still render. The registration files are a moving target and a
 * chip with the raw code is more useful than a dropped one.
 */
export function statusDefinition(code: string): StatusDefinition {
  return (
    BY_CODE.get(code) ?? {
      code,
      label: code,
      explanation:
        "This code is not one of the 19 recognised here. It came straight from the registration file and has not been interpreted. Ask HCR what it means.",
      family: "dwelling",
      verify: true,
      lastReviewed: REVIEWED,
    }
  );
}

export function statusStyle(code: string): StatusFamilyStyle {
  return STATUS_FAMILIES[statusDefinition(code).family];
}

/** Codes grouped by family, in declaration order, for the filter popover. */
export function statusesByFamily(): {
  family: StatusFamily;
  style: StatusFamilyStyle;
  definitions: StatusDefinition[];
}[] {
  return (Object.keys(STATUS_FAMILIES) as StatusFamily[]).map((family) => ({
    family,
    style: STATUS_FAMILIES[family],
    definitions: STATUS_DEFINITIONS.filter((s) => s.family === family),
  }));
}
