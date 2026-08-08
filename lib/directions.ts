/** Only coordinates are needed, so any located row works. */
type Destination = { lat: number; lng: number };

/** iPadOS 13+ reports "MacIntel", so the Mac check covers it too. */
function prefersAppleMaps() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod|Macintosh/.test(ua) ||
    /Mac/.test(navigator.platform ?? "")
  );
}

/**
 * Coordinates only, never an address lookup. This hands off to whichever maps
 * app the reader already has; nothing in this app geocodes.
 */
export function directionsUrl(place: Destination) {
  const coords = `${place.lat},${place.lng}`;
  return prefersAppleMaps()
    ? `https://maps.apple.com/?daddr=${coords}`
    : `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
}

export function openDirections(place: Destination) {
  window.open(directionsUrl(place), "_blank", "noopener,noreferrer");
}
