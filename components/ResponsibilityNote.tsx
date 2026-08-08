"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HCR_ASK_URL } from "@/lib/status-definitions";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The four things a reader has to know before this map is safe to act on.
 *
 * Kept in one place so the map bar, the list footer and both detail views say
 * exactly the same thing.
 */
export const RESPONSIBILITY_POINTS = [
  "This is a snapshot of 2024 building registrations, not a legal determination.",
  "A building appearing here does not confirm that any specific apartment is rent stabilized.",
  "A building missing from here does not mean it has no stabilized apartments. Listing depends on the owner having registered.",
  "The only way to confirm an individual apartment is to ask HCR directly.",
];

/** The one line that has to survive on a 375px phone. */
const HEADLINE =
  "Registration snapshot, not a legal determination. Only HCR can confirm an apartment.";

export function HcrLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={HCR_ASK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-medium text-ink underline decoration-hairline underline-offset-2 transition-colors duration-200 hover:decoration-ink ${className}`}
    >
      portal.hcr.ny.gov
    </a>
  );
}

/**
 * Full statement. Used where there is room to print all of it: the list view
 * footer and the expanded detail view.
 */
export function ResponsibilityBlock({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">What this map is not</p>
      <ul className="mt-2 space-y-1.5">
        {RESPONSIBILITY_POINTS.map((point) => (
          <li
            key={point}
            className="flex gap-2 text-[12px] leading-[1.5] text-ink-soft"
          >
            <span
              aria-hidden="true"
              className="mt-[0.5em] size-1 shrink-0 rounded-full bg-ink-faint"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[12px] leading-[1.5] text-ink-soft">
        Confirm any apartment at <HcrLink />.
      </p>
    </div>
  );
}

/**
 * The persistent bar on the map.
 *
 * Never dismissible, only expandable. On desktop the full list is visible; on
 * a phone the headline is always on screen and the rest is one tap away, which
 * is the most that fits without eating the map.
 */
export default function ResponsibilityNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-hairline bg-paper/95 shadow-float backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors duration-200 hover:bg-cream/60 md:px-3.5"
      >
        <span
          aria-hidden="true"
          className="mt-px flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
          style={{
            background: "var(--color-caution-soft)",
            color: "var(--color-caution)",
          }}
        >
          i
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[12px] leading-[1.45] text-ink-soft">
            {HEADLINE}
          </span>
          <span className="mt-0.5 block text-[11px] text-ink-faint md:hidden">
            {open ? "Tap to collapse" : "Tap for the full note"}
          </span>
        </span>

        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`mt-0.5 size-3 shrink-0 text-ink-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-hairline px-3 py-3 md:px-3.5">
              <ul className="space-y-1.5">
                {RESPONSIBILITY_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-[12px] leading-[1.5] text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] size-1 shrink-0 rounded-full bg-ink-faint"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[12px] text-ink-soft">
                Ask HCR at <HcrLink />.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
