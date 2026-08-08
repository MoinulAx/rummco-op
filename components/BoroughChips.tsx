"use client";

import { motion } from "framer-motion";
import {
  BOROUGHS,
  BOROUGH_COLORS,
  BOROUGH_LABELS,
  type Borough,
} from "@/lib/buildings";

type Props = {
  /** Empty means every borough, which is also the default. */
  value: Borough[];
  onChange: (value: Borough[]) => void;
  counts?: Record<Borough, number> | null;
};

/**
 * Five borough toggles plus an "All" reset.
 *
 * Multi-select rather than the reference's single choice, because comparing two
 * boroughs is a thing people want and 50,000 buildings makes it worth having.
 * An empty selection is the same query as every box ticked, so "All" is a real
 * state and not a sixth filter.
 */
export default function BoroughChips({ value, onChange, counts }: Props) {
  const allActive = value.length === 0;

  function toggle(borough: Borough) {
    onChange(
      value.includes(borough)
        ? value.filter((b) => b !== borough)
        : [...value, borough],
    );
  }

  return (
    // Mobile: one non-wrapping rail that scrolls with momentum, so the chips can
    // never wrap into the map or get clipped by the title card.
    <div className="touch-rail rail-fade w-full max-w-full overflow-x-auto md:w-auto md:max-w-none md:overflow-visible">
      <div
        role="group"
        aria-label="Filter by borough"
        className="flex w-max items-center gap-2 md:w-auto md:flex-wrap md:justify-end"
      >
        <button
          type="button"
          onClick={() => onChange([])}
          aria-pressed={allActive}
          className={[
            "ui-label relative flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm shadow-float transition-colors duration-200 md:h-10 md:px-4 md:text-[13px]",
            allActive
              ? "border-transparent bg-ink text-cream"
              : "border-hairline bg-paper text-ink-soft hover:text-ink",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full transition-colors duration-200"
            style={{
              background: allActive
                ? "rgb(247 242 233 / 0.8)"
                : "var(--color-ink-faint)",
            }}
          />
          All
        </button>

        {BOROUGHS.map((borough) => {
          const active = value.includes(borough);
          const color = BOROUGH_COLORS[borough];
          const count = counts?.[borough];

          return (
            <button
              key={borough}
              type="button"
              onClick={() => toggle(borough)}
              aria-pressed={active}
              className={[
                // 44px tap target on touch, back to 36px on desktop.
                "ui-label relative flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm shadow-float md:h-10 md:px-4 md:text-[13px]",
                "transition-colors duration-200",
                active
                  ? "border-transparent text-cream"
                  : "border-hairline bg-paper hover:brightness-[0.99]",
              ].join(" ")}
              style={active ? undefined : { color: color.text }}
            >
              {active && (
                <motion.span
                  layoutId={`borough-fill-${borough}`}
                  aria-hidden="true"
                  // -inset-px so the fill covers the border box and no hairline
                  // shows through over the map.
                  className="absolute -inset-px rounded-full"
                  initial={false}
                  animate={{ backgroundColor: color.base }}
                  transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
                />
              )}
              <span
                aria-hidden="true"
                className="relative z-10 size-2 shrink-0 rounded-full transition-colors duration-200"
                style={{
                  background: active ? "rgb(247 242 233 / 0.85)" : color.base,
                }}
              />
              <span className="relative z-10 whitespace-nowrap">
                {BOROUGH_LABELS[borough]}
              </span>
              {count != null && (
                <span
                  className={`numeral relative z-10 text-[10px] ${active ? "text-cream/75" : "text-ink-faint"}`}
                >
                  {count.toLocaleString()}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
