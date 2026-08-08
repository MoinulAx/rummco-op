/**
 * WCAG contrast check for every colour the UI puts text or a marker on.
 *
 * Run with `npm run check:contrast`. It exits non-zero on a failure, so it can
 * go in CI later. The rules it enforces:
 *
 *   - a colour used as label text needs 4.5:1 (AA, normal text) against cream,
 *     against paper, and against its own soft tint, since chips use all three
 *   - a colour used only as a marker fill is a graphical object and needs 3:1
 *     against cream
 *
 * Values are duplicated from lib/buildings.ts and lib/status-definitions.ts on
 * purpose: a check that imports the thing it checks cannot catch a bad edit to
 * the shared constant.
 */

const CREAM = "#f7f2e9";
const PAPER = "#fdfbf7";

const TEXT_MIN = 4.5;
const GRAPHIC_MIN = 3;

const BOROUGHS = {
  Manhattan: { base: "#2f7d5f", soft: "#dcebe1", text: "#2a7156" },
  Bronx: { base: "#c2632e", soft: "#f4e2d5", text: "#9d5025" },
  Brooklyn: { base: "#6b5ba8", soft: "#e4e0f1", text: "#63529d" },
  Queens: { base: "#2e6e9e", soft: "#d8e6f0", text: "#2b6894" },
  "Staten Island": { base: "#b03a5b", soft: "#f6dde3", text: "#a93757" },
};

const STATUS_FAMILIES = {
  "Building type": { base: "#7a5b34", soft: "#efe4d3", text: "#7a5b34" },
  "Tax benefit": { base: "#4a6d34", soft: "#e2ebd8", text: "#4a6d34" },
  "Public program": { base: "#2b6470", soft: "#d9e9ec", text: "#2b6470" },
  "Coop or condo": { base: "#8a4a6b", soft: "#f0dfe8", text: "#8a4a6b" },
};

const INK = {
  ink: "#33291f",
  "ink-soft": "#6b5f52",
  caution: "#8e5e11",
};

const CAUTION_SOFT = "#f6e9cf";

function channels(hex) {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

let failures = 0;

function check(label, fg, bg, min) {
  const value = ratio(fg, bg);
  const ok = value >= min;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "pass" : "FAIL"}  ${label.padEnd(42)} ${value.toFixed(2).padStart(6)}:1  (needs ${min})`,
  );
}

console.log("\nBorough colours");
for (const [name, colour] of Object.entries(BOROUGHS)) {
  check(`${name} text on cream`, colour.text, CREAM, TEXT_MIN);
  check(`${name} text on paper`, colour.text, PAPER, TEXT_MIN);
  check(`${name} text on its soft tint`, colour.text, colour.soft, TEXT_MIN);
  check(`${name} marker on cream`, colour.base, CREAM, GRAPHIC_MIN);
}

console.log("\nStatus chips");
for (const [name, colour] of Object.entries(STATUS_FAMILIES)) {
  check(`${name} text on cream`, colour.text, CREAM, TEXT_MIN);
  check(`${name} text on paper`, colour.text, PAPER, TEXT_MIN);
  check(`${name} text on its soft tint`, colour.text, colour.soft, TEXT_MIN);
  check(`${name} dot on its soft tint`, colour.base, colour.soft, GRAPHIC_MIN);
}

console.log("\nInk and caution");
check("ink on cream", INK.ink, CREAM, TEXT_MIN);
check("ink on paper", INK.ink, PAPER, TEXT_MIN);
check("ink-soft on cream", INK["ink-soft"], CREAM, TEXT_MIN);
check("ink-soft on paper", INK["ink-soft"], PAPER, TEXT_MIN);
check("caution on its soft tint", INK.caution, CAUTION_SOFT, TEXT_MIN);
check("caution on paper", INK.caution, PAPER, TEXT_MIN);

// ink-faint is deliberately below AA and is only ever used for decorative
// hairlines, dividers and non-essential meta that is duplicated elsewhere.
console.log(
  `\nnote  ink-faint is ${ratio("#9a8f82", CREAM).toFixed(2)}:1 on cream and is used only for decoration`,
);

if (failures > 0) {
  console.error(`\n${failures} contrast failure(s)\n`);
  process.exit(1);
}

console.log("\nAll contrast checks passed\n");
