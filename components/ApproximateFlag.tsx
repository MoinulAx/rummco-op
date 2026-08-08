"use client";

/**
 * Shown whenever `geocode_quality` is 'approximate'.
 *
 * Coordinates were joined offline by BBL. When that join landed on a block or
 * street rather than a door, the pin is somewhere in the right area and not on
 * the right building, and saying so is the difference between a useful map and
 * a misleading one. An 'exact' row shows nothing at all.
 */
export default function ApproximateFlag({
  variant = "block",
}: {
  variant?: "block" | "inline";
}) {
  if (variant === "inline") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px]"
        style={{
          background: "var(--color-caution-soft)",
          color: "var(--color-caution)",
        }}
      >
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full border border-current"
        />
        Approximate
      </span>
    );
  }

  return (
    <div
      className="flex gap-2.5 rounded-xl px-3 py-2.5"
      style={{ background: "var(--color-caution-soft)" }}
      role="note"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 size-3 shrink-0 rounded-full border-[1.5px]"
        style={{ borderColor: "var(--color-caution)" }}
      />
      <p
        className="text-[12px] leading-[1.5]"
        style={{ color: "var(--color-caution)" }}
      >
        <span className="font-medium">Approximate location.</span> The
        coordinates for this registration resolved to the block or street rather
        than to a specific door, so the marker is near the building and not
        necessarily on it. The address text is what the registration says.
      </p>
    </div>
  );
}
