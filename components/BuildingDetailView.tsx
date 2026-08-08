"use client";

import { motion } from "framer-motion";
import ApproximateFlag from "./ApproximateFlag";
import StatusChip from "./StatusChip";
import { ResponsibilityBlock } from "./ResponsibilityNote";
import { openDirections } from "@/lib/directions";
import { HCR_ASK_URL, statusDefinition } from "@/lib/status-definitions";
import {
  boroughColor,
  boroughLabel,
  isNumberRange,
  primaryAddress,
  rawPrimaryAddress,
  titleCase,
  streetLine,
  type Building,
} from "@/lib/buildings";

type Props = {
  building: Building;
  onClose: () => void;
  onViewOnMap: (building: Building) => void;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Staggered reveal for each block as the view comes in. */
function Section({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay: 0.06 + index * 0.055, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow">{label}</p>
      <p className="numeral mt-1.5 text-sm break-words text-ink">{value}</p>
    </div>
  );
}

/**
 * The full record for one building, opened from a list row or from the panel.
 *
 * This is where every status code gets its explanation printed rather than
 * hidden behind a tap, and where the whole responsibility note is spelled out.
 */
export default function BuildingDetailView({
  building,
  onClose,
  onViewOnMap,
}: Props) {
  const color = boroughColor(building.borough);
  const approximate = building.geocode_quality === "approximate";

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-paper shadow-lift">
      {/* No photos in this dataset, so the header is a tinted plate carrying the
          borough colour and the address itself. */}
      <div
        className="relative px-6 pt-7 pb-6 md:px-8 md:pt-9 md:pb-7"
        style={{
          background: `linear-gradient(152deg, ${color.soft} 0%, ${color.soft} 42%, #fdfbf7 128%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-16 -right-10 size-48 rounded-full opacity-[0.13]"
          style={{ background: color.base }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close building details"
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full border border-hairline bg-paper/90 text-ink-soft shadow-float backdrop-blur-sm transition-colors duration-200 hover:bg-paper hover:text-ink active:bg-cream-deep md:size-9"
        >
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
            <path
              d="M3.5 3.5l9 9m0-9l-9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/70 px-2.5 py-1">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full"
              style={{ background: color.base }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.14em] uppercase"
              style={{ color: color.text }}
            >
              {boroughLabel(building.borough)}
            </span>
          </span>

          <h2 className="display-xl mt-4 max-w-[24ch] text-ink">
            {primaryAddress(building)}
          </h2>

          {building.secondary_address && (
            <p className="mt-2 text-[13px] text-ink-soft">
              Also registered as{" "}
              <span className="text-ink">{titleCase(building.secondary_address)}</span>
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pt-6 pb-7 md:px-8 md:pt-7 md:pb-8">
        {approximate && (
          <Section index={0} className="mb-5">
            <ApproximateFlag />
          </Section>
        )}

        <Section index={1}>
          <div className="grid grid-cols-2 gap-6 border-t border-hairline pt-6 sm:grid-cols-4">
            <Fact label="Zip" value={building.zip ?? "Not given"} />
            <Fact label="Block" value={building.block ?? "Not given"} />
            <Fact label="Lot" value={building.lot ?? "Not given"} />
            <Fact label="BBL" value={building.bbl ?? "Not given"} />
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Street</p>
              <p className="mt-1 text-[13px] text-ink">{streetLine(building)}</p>
              {isNumberRange(building) && (
                <p className="mt-1 text-[12px] leading-[1.45] text-ink-faint">
                  House numbers {building.house_number_low} to{" "}
                  {building.house_number_high} are covered by this one
                  registration line.
                </p>
              )}
            </div>
            <div>
              <p className="eyebrow">Coordinates</p>
              <p className="numeral mt-1 text-[13px] text-ink">
                {building.lat.toFixed(5)}, {building.lng.toFixed(5)}
              </p>
              <p className="mt-1 text-[12px] text-ink-faint">
                {approximate
                  ? "Approximate, matched to the block or street."
                  : "Matched to the building."}
              </p>
            </div>
          </div>

          {/* Headings are title-cased for readability. This is the row exactly
              as the registration file has it, which is the string to quote when
              asking HCR about the building. */}
          <div className="mt-6">
            <p className="eyebrow">As registered</p>
            <p className="numeral mt-1 text-[13px] break-words text-ink-soft">
              {rawPrimaryAddress(building)}
              {building.secondary_address
                ? ` / ${building.secondary_address}`
                : ""}
            </p>
          </div>
        </Section>

        <Section index={2} className="mt-7 border-t border-hairline pt-6">
          <p className="eyebrow">
            Registration status ({building.statuses.length})
          </p>

          {building.statuses.length === 0 ? (
            <p className="mt-2.5 text-[13px] text-ink-faint">
              This registration carries no status codes.
            </p>
          ) : (
            <ul className="mt-4 space-y-3.5">
              {building.statuses.map((code, i) => {
                const definition = statusDefinition(code);
                return (
                  <motion.li
                    key={code}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.22 + i * 0.05,
                      ease: EASE,
                    }}
                    className="rounded-2xl border border-hairline-soft bg-cream/40 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusChip code={code} size="sm" />
                      {definition.verify && (
                        <span
                          className="numeral rounded px-1.5 py-0.5 text-[10px]"
                          style={{
                            background: "var(--color-caution-soft)",
                            color: "var(--color-caution)",
                          }}
                        >
                          verify with HCR
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
                      {definition.explanation}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </Section>

        <Section index={3} className="mt-7 flex flex-wrap gap-3">
          <a
            href={HCR_ASK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-w-[16rem] flex-1"
          >
            Confirm an apartment with HCR
            <span aria-hidden="true" className="text-cream/70">
              &#8599;
            </span>
          </a>
          <button
            type="button"
            onClick={() => onViewOnMap(building)}
            className="btn-secondary flex-1 md:flex-none"
          >
            View on map
          </button>
          <button
            type="button"
            onClick={() => openDirections(building)}
            className="btn-secondary flex-1 md:flex-none"
          >
            Directions
          </button>
        </Section>

        <Section index={4}>
          <ResponsibilityBlock className="mt-7 border-t border-hairline pt-6" />
        </Section>
      </div>
    </div>
  );
}
