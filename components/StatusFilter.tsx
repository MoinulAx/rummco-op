"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { statusesByFamily } from "@/lib/status-definitions";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  /** Empty means no status restriction. */
  value: string[];
  onChange: (value: string[]) => void;
  counts?: Record<string, number> | null;
};

/**
 * Multi-select over the 19 registration status codes.
 *
 * Applied server-side as an array overlap, so ticking two codes means "either
 * of these" rather than "both of these". Grouped by family because a flat list
 * of 19 terse codes is a wall.
 */
export default function StatusFilter({ value, onChange, counts }: Props) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const groups = statusesByFamily();

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

  function toggle(code: string) {
    onChange(
      value.includes(code)
        ? value.filter((c) => c !== code)
        : [...value, code],
    );
  }

  const active = value.length > 0;

  return (
    <div ref={wrapper} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="true"
        className={[
          "flex h-11 items-center gap-2 rounded-xl border px-3.5 text-sm shadow-float transition-colors duration-200 md:h-9 md:text-[13px]",
          active
            ? "border-transparent bg-ink text-cream"
            : "border-hairline bg-paper text-ink-soft hover:text-ink",
        ].join(" ")}
      >
        <span className="whitespace-nowrap">Status</span>
        {active && (
          <span className="numeral rounded-full bg-cream/20 px-1.5 py-0.5 text-[10px]">
            {value.length}
          </span>
        )}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.14 } }}
            transition={{ duration: 0.22, ease: EASE }}
            role="group"
            aria-label="Filter by registration status"
            className="absolute top-full right-0 z-[950] mt-2 w-[min(21rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-hairline bg-paper shadow-pop"
          >
            <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
              <p className="eyebrow">Registration status</p>
              <button
                type="button"
                onClick={() => onChange([])}
                disabled={!active}
                className="text-[12px] text-ink-soft transition-colors duration-200 hover:text-ink disabled:cursor-default disabled:text-ink-faint/60"
              >
                Clear
              </button>
            </div>

            <div className="thin-scroll max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain px-2 py-2">
              {groups.map((group) => (
                <div key={group.family} className="mb-1.5 last:mb-0">
                  <p className="eyebrow px-2 pt-2 pb-1.5">{group.style.label}</p>
                  {group.definitions.map((definition) => {
                    const checked = value.includes(definition.code);
                    const count = counts?.[definition.code];

                    return (
                      <label
                        key={definition.code}
                        className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-cream has-focus-visible:bg-cream"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(definition.code)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="flex size-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors duration-150"
                          style={{
                            borderColor: checked
                              ? group.style.base
                              : "var(--color-hairline)",
                            background: checked
                              ? group.style.base
                              : "var(--color-paper)",
                          }}
                        >
                          {checked && (
                            <svg viewBox="0 0 12 12" className="size-2.5">
                              <path
                                d="M2.5 6.2l2.4 2.4L9.5 4"
                                stroke="#fdfbf7"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                              />
                            </svg>
                          )}
                        </span>

                        <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
                          {definition.label}
                        </span>

                        {definition.verify && (
                          <span
                            className="numeral shrink-0 rounded px-1 text-[10px]"
                            style={{
                              background: "var(--color-caution-soft)",
                              color: "var(--color-caution)",
                            }}
                            title="Low confidence reading"
                          >
                            verify
                          </span>
                        )}

                        {count != null && (
                          <span className="numeral shrink-0 text-[11px] text-ink-faint">
                            {count.toLocaleString()}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="border-t border-hairline px-4 py-2.5 text-[11px] leading-[1.45] text-ink-faint">
              Codes come from the registration file. The wording is our own and
              is provisional.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
