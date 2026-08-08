"use client";

import { motion } from "framer-motion";
import {
  boroughColor,
  boroughLabel,
  primaryAddress,
  type Building,
} from "@/lib/buildings";

type Props = {
  results: Building[];
  total: number;
  loading: boolean;
  onSelect: (building: Building) => void;
  /** Switches to the list view, which can page through everything. */
  onSeeAll: () => void;
};

/**
 * The dropdown under the search field on the map.
 *
 * Deliberately a preview, not a result set: it shows the first page and points
 * at the list view for the rest, because the server is holding the other
 * several thousand matches.
 */
export default function SearchResults({
  results,
  total,
  loading,
  onSelect,
  onSeeAll,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      className="w-full overflow-hidden rounded-xl border border-hairline bg-paper shadow-lift md:w-[320px]"
    >
      {loading && results.length === 0 ? (
        <div className="space-y-2 px-3.5 py-3" role="status" aria-label="Searching">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="shimmer size-2 shrink-0 rounded-full" />
              <span className="flex-1">
                <span className="shimmer block h-3 w-3/5 rounded" />
                <span className="shimmer mt-1.5 block h-2.5 w-2/5 rounded" />
              </span>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="px-3.5 py-3.5">
          <p className="text-[13px] text-ink">No street matches that.</p>
          <p className="mt-1 text-[12px] leading-[1.45] text-ink-faint">
            Search matches the street name, so try &ldquo;fulton&rdquo; rather
            than a full address. A building can also be absent because its owner
            never registered it.
          </p>
        </div>
      ) : (
        <>
          <ul className="thin-scroll max-h-[40vh] overflow-y-auto overscroll-contain md:max-h-[288px]">
            {results.map((building, index) => {
              const color = boroughColor(building.borough);
              return (
                <motion.li
                  key={building.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.22,
                    delay: Math.min(index, 8) * 0.028,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="border-b border-hairline last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => onSelect(building)}
                    className="flex min-h-11 w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-cream active:bg-cream-deep"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: color.base }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">
                        {primaryAddress(building)}
                      </span>
                      <span className="block truncate text-[11px] text-ink-faint">
                        {boroughLabel(building.borough)}
                        {building.zip ? ` ${building.zip}` : ""}
                        {building.geocode_quality === "approximate"
                          ? " · approximate"
                          : ""}
                      </span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {total > results.length && (
            <button
              type="button"
              onClick={onSeeAll}
              className="flex w-full items-center justify-between gap-2 border-t border-hairline bg-cream/50 px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-cream"
            >
              <span className="text-[12px] text-ink-soft">
                See all {total.toLocaleString()} matches
              </span>
              <span aria-hidden="true" className="text-[12px] text-ink-faint">
                &rarr;
              </span>
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
