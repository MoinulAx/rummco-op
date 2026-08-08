"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  title: string;
  /** null while the count query is still running. */
  count: number | null;
  /** Word beside the number. Pluralised on the caller's behalf. */
  noun?: string;
  eyebrow?: string;
};

/**
 * Title plus the live count for the current filters.
 *
 * The number rolls rather than snaps, and its well is fixed-width, so a change
 * from 1,204 to 950 never shoves the label sideways.
 */
export default function TitleBlock({
  title,
  count,
  noun = "building",
  eyebrow = "NYC rent stabilized",
}: Props) {
  const label = count === 1 ? noun : `${noun}s`;

  return (
    <div className="flex items-center gap-2.5 md:items-end md:gap-4">
      <div className="min-w-0">
        {/* The eyebrow is the first thing to go on a phone: least informative
            line, and it forced the title to wrap. */}
        <p className="eyebrow hidden md:block">{eyebrow}</p>
        <h1 className="display-md whitespace-nowrap text-ink md:mt-0.5 md:text-[26px] md:leading-[1.1]">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-baseline gap-1.5 border-l border-hairline pl-2.5 md:pb-0.5 md:pl-4">
        <span className="relative block h-4 min-w-[4.5ch] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {count === null ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shimmer block h-3 w-[4ch] rounded"
              />
            ) : (
              <motion.span
                key={count}
                initial={{ opacity: 0, y: -9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 9 }}
                transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                className="numeral block text-sm leading-4 font-medium text-ink md:text-base"
              >
                {count.toLocaleString()}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="eyebrow">{label}</span>
      </div>
    </div>
  );
}
