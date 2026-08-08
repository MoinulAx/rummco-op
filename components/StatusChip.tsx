"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HCR_ASK_URL,
  statusDefinition,
  statusStyle,
} from "@/lib/status-definitions";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * One status code, as a labelled colour chip that opens its own explanation.
 *
 * The chip is a real button rather than a hover tooltip so the explanation is
 * reachable by touch and by keyboard, not just by mouse. Colour carries the
 * family; the label carries the code.
 */
export default function StatusChip({
  code,
  size = "md",
}: {
  code: string;
  size?: "sm" | "md";
}) {
  const definition = statusDefinition(code);
  const style = statusStyle(code);
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLSpanElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const compact = size === "sm";

  return (
    <span ref={wrapper} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        aria-label={`${definition.label} status. Show what this means.`}
        className={[
          "inline-flex items-center gap-1.5 rounded-full border transition-all duration-200",
          compact ? "h-6 px-2 text-[11px]" : "h-7 px-2.5 text-[12px]",
          "hover:brightness-[0.98] active:scale-[0.98]",
        ].join(" ")}
        style={{
          background: style.soft,
          borderColor: `${style.base}33`,
          color: style.text,
        }}
      >
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full"
          style={{ background: style.base }}
        />
        <span className="font-medium whitespace-nowrap">{definition.label}</span>
        {definition.verify && (
          <span
            aria-hidden="true"
            title="Low confidence reading"
            className="numeral text-[10px] opacity-70"
          >
            ?
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            id={popoverId}
            role="note"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.13 } }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute top-full left-0 z-[1000] mt-2 block w-[min(19rem,calc(100vw-3rem))] origin-top-left rounded-xl border border-hairline bg-paper p-3.5 shadow-pop"
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ background: style.base }}
              />
              <span
                className="text-[13px] font-medium"
                style={{ color: style.text }}
              >
                {definition.label}
              </span>
              <span className="eyebrow ml-auto">{style.label}</span>
            </span>

            <span className="mt-2 block text-[13px] leading-[1.5] text-ink-soft">
              {definition.explanation}
            </span>

            {definition.verify && (
              <span
                className="mt-2.5 block rounded-lg px-2.5 py-2 text-[12px] leading-[1.45]"
                style={{ background: "var(--color-caution-soft)", color: "var(--color-caution)" }}
              >
                Verify this one. The code in the registration file may be
                shorthand rather than an official label, so the reading above is
                a best guess.
              </span>
            )}

            <span className="mt-2.5 flex items-center justify-between gap-3 border-t border-hairline pt-2.5">
              <span className="eyebrow">Reviewed {definition.lastReviewed}</span>
              <a
                href={HCR_ASK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-ink underline decoration-hairline underline-offset-2 transition-colors hover:decoration-ink"
              >
                Ask HCR
              </a>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
