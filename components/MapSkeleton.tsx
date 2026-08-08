"use client";

/**
 * Stands in for the map while its chunk downloads.
 *
 * Leaflet plus supercluster is the heaviest thing this app loads and it is
 * deliberately client-only, so there is a real gap before the first tile.
 *
 * This fills the map surface only. The title card, filters, legend and
 * responsibility bar are siblings of the map rather than children, so they are
 * already on screen by the time this renders; drawing placeholder versions of
 * them here just puts ghosts underneath the real thing.
 */

/** Fixed positions, so the placeholder never reshuffles between renders. */
const BUBBLES = [
  { top: "14%", left: "46%", size: 52 },
  { top: "22%", left: "60%", size: 40 },
  { top: "30%", left: "38%", size: 46 },
  { top: "41%", left: "54%", size: 36 },
  { top: "37%", left: "68%", size: 42 },
  { top: "53%", left: "32%", size: 38 },
  { top: "58%", left: "50%", size: 50 },
  { top: "65%", left: "64%", size: 34 },
  { top: "71%", left: "42%", size: 42 },
  { top: "47%", left: "76%", size: 32 },
];

export default function MapSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading the map"
      className="relative h-full w-full overflow-hidden bg-cream"
    >
      {/* Faint grid, standing in for streets. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-hairline) 1px, transparent 1px), linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {BUBBLES.map((bubble, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="shimmer absolute rounded-full opacity-70"
          style={{
            top: bubble.top,
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: `${i * 90}ms`,
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex items-center gap-3 rounded-full border border-hairline bg-paper/95 px-5 py-3 shadow-float backdrop-blur-sm">
          <span aria-hidden="true" className="query-bar h-1 w-16 rounded-full" />
          <span className="ui-label text-[13px] text-ink-soft">
            Loading the map
          </span>
        </span>
      </div>
    </div>
  );
}
