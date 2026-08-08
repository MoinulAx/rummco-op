import L from "leaflet";
import { boroughColor, primaryAddress, type Building } from "./buildings";

/**
 * The single DOM marker on the map.
 *
 * Every other building is a canvas circle. Only the selected building is
 * promoted to a real pin, which is what keeps two thousand points affordable
 * while the one point that matters still gets a teardrop, a shadow and a pulse.
 */

// Teardrop drawn in a 26x34 box: circular head centred at (13,13), tip at (13,34).
const TEARDROP =
  "M13 1.3c-6.4 0-11.7 5.2-11.7 11.7 0 2.8 1.2 5.4 2.8 7.8 " +
  "2.1 3 5 6.2 7.8 11 0.4 0.8 1.5 0.8 1.9 0 " +
  "2.8-4.8 5.7-8 7.8-11 1.6-2.4 2.8-5 2.8-7.8C24.7 6.5 19.4 1.3 13 1.3z";

export function selectedPinIcon(building: Building) {
  const color = boroughColor(building.borough).base;
  const approximate = building.geocode_quality === "approximate";

  // A dashed halo says "somewhere around here" before anyone reads the panel.
  const halo = approximate
    ? `<span class="rs-pin__approx" style="--pin:${color}"></span>`
    : "";

  const html = `
    <div class="rs-pin" data-selected="true">
      ${halo}
      <span class="rs-pin__pulse" style="--pin:${color}"></span>
      <svg class="rs-pin__shape" viewBox="0 0 26 34" aria-hidden="true">
        <path d="${TEARDROP}" fill="${color}" />
        <circle cx="13" cy="13" r="4.4" fill="#fdfbf7" />
      </svg>
    </div>`;

  return L.divIcon({
    html,
    className: "rs-marker",
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
  });
}

/** Label read by assistive tech when the selected pin takes focus. */
export function pinLabel(building: Building) {
  const where = primaryAddress(building);
  return building.geocode_quality === "approximate"
    ? `${where}, selected. Location is approximate.`
    : `${where}, selected.`;
}
