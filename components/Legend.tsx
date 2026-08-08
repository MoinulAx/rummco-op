"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BOROUGHS,
  BOROUGH_COLORS,
  BOROUGH_LABELS,
  type Borough,
} from "@/lib/buildings";

type Props = {
  counts: Record<Borough, number> | null;
  /** Rows currently drawn on the map, as opposed to the filtered total. */
  inView: number;
};

/**
 * Bottom-left key. Reads the borough colours, and explains the two marks that
 * are not boroughs: a cluster bubble and a hollow approximate point.
 */
export default function Legend({ counts, inView }: Props) {
  // Collapsed by default on phones so it stops covering the map. The md:
  // overrides force it open on desktop regardless of this state, which also
  // keeps first paint identical on server and client.
  const [open, setOpen] = useState(false);

  const present = BOROUGHS.filter((borough) => (counts?.[borough] ?? 0) > 0);
  const shown = present.length > 0 ? present : BOROUGHS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
      className="flex flex-col items-start gap-2"
    >
      {/* Tappable summary, phones only. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-full border border-hairline bg-paper/95 px-4 shadow-float backdrop-blur-sm md:hidden"
      >
        <span aria-hidden="true" className="flex items-center -space-x-1">
          {shown.map((borough) => (
            <span
              key={borough}
              className="size-2.5 rounded-full ring-[1.5px] ring-paper"
              style={{ background: BOROUGH_COLORS[borough].base }}
            />
          ))}
        </span>
        <span className="text-sm text-ink">Key</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-3 text-ink-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 7.5L6 4l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      <div
        className={[
          "w-[196px] overflow-hidden rounded-2xl border border-hairline bg-paper/95 shadow-float backdrop-blur-sm",
          "transition-all duration-300 ease-out",
          open
            ? "max-h-[60vh] p-4 opacity-100"
            : "max-h-0 border-transparent p-0 opacity-0",
          // Desktop: always open, never collapsed.
          "md:max-h-none md:overflow-visible md:border-hairline md:p-4 md:opacity-100",
        ].join(" ")}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className="eyebrow">Borough</p>
          <p className="numeral text-[10px] text-ink-faint">
            {inView.toLocaleString()} here
          </p>
        </div>

        <ul className="mt-2.5 space-y-2">
          {shown.map((borough) => (
            <li key={borough} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: BOROUGH_COLORS[borough].base }}
              />
              <span
                className="flex-1 text-[13px]"
                style={{ color: BOROUGH_COLORS[borough].text }}
              >
                {BOROUGH_LABELS[borough]}
              </span>
              {counts ? (
                <span className="numeral text-[11px] text-ink-faint">
                  {counts[borough].toLocaleString()}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="shimmer h-2.5 w-6 rounded"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="mt-3 space-y-2 border-t border-hairline pt-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-paper"
              style={{ background: "var(--color-ink-faint)" }}
            >
              12
            </span>
            <span className="flex-1 text-[12px] text-ink-soft">
              Group, click to open
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full border-[1.5px]"
              style={{
                borderColor: "var(--color-ink-faint)",
                background: "transparent",
              }}
            />
            <span className="flex-1 text-[12px] text-ink-soft">
              Approximate spot
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
