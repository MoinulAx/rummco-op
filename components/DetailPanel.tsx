"use client";

import { useEffect } from "react";
import { motion, type PanInfo } from "framer-motion";
import ApproximateFlag from "./ApproximateFlag";
import StatusChip from "./StatusChip";
import { HcrLink } from "./ResponsibilityNote";
import { openDirections } from "@/lib/directions";
import { HCR_ASK_URL } from "@/lib/status-definitions";
import { useMediaQuery } from "@/lib/hooks";
import {
  boroughColor,
  boroughLabel,
  isNumberRange,
  primaryAddress,
  titleCase,
  type Building,
} from "@/lib/buildings";

/** Tuple-typed so spreading the motion presets keeps a valid `ease`. */
const EASE_IN = [0.4, 0, 1, 1] as const;

type Props = {
  building: Building;
  onClose: () => void;
  /** Opens the full in-depth view for this building. */
  onExpand: (building: Building) => void;
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="eyebrow">{label}</p>
      <p className="numeral mt-1 truncate text-[13px] text-ink">{value}</p>
    </div>
  );
}

/**
 * One component, two shapes: a floating right-hand panel from md up, and a
 * drag-to-dismiss bottom sheet below it.
 */
export default function DetailPanel({ building, onClose, onExpand }: Props) {
  const color = boroughColor(building.borough);
  const isPhone = !useMediaQuery("(min-width: 768px)", true);
  const approximate = building.geocode_quality === "approximate";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  /** Flick down or drag past a third of the sheet to dismiss. */
  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  }

  const sheetMotion = {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%", transition: { duration: 0.2, ease: EASE_IN } },
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 34,
      mass: 0.8,
    },
    drag: "y" as const,
    dragConstraints: { top: 0, bottom: 0 },
    dragElastic: { top: 0, bottom: 0.6 },
    onDragEnd,
  };

  const panelMotion = {
    initial: { opacity: 0, x: 44 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 32, transition: { duration: 0.18, ease: EASE_IN } },
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 30,
      mass: 0.9,
    },
  };

  return (
    <motion.aside
      aria-label={`${primaryAddress(building)} details`}
      {...(isPhone ? sheetMotion : panelMotion)}
      className={[
        "border border-hairline bg-paper shadow-lift",
        // Phone: bottom sheet pinned to the viewport, rounded top only.
        "fixed inset-x-0 bottom-0 z-[800] flex max-h-[85svh] flex-col rounded-t-2xl border-x-0 border-b-0 landscape:max-h-[80svh]",
        // Desktop: back to the floating right-hand panel.
        "md:static md:z-auto md:max-h-none md:w-[368px] md:rounded-2xl md:border",
        "overflow-hidden",
      ].join(" ")}
    >
      {/* Grab handle, phones only. */}
      <div className="flex shrink-0 justify-center pt-2.5 pb-1 md:hidden">
        <span aria-hidden="true" className="sheet-handle" />
      </div>

      {/* Borough hairline, so the panel carries its colour without a photo. */}
      <span
        aria-hidden="true"
        className="hidden h-1 w-full shrink-0 md:block"
        style={{ background: color.base }}
      />

      <div className="thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="safe-b-0 px-5 pt-3 pb-5 md:px-6 md:pt-5 md:pb-6">
          <div className="flex items-start justify-between gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-2.5 py-1"
              style={{ background: color.soft }}
            >
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

            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="-mt-2 -mr-2 flex size-11 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:bg-cream-deep hover:text-ink md:-mt-1 md:size-8"
            >
              <svg viewBox="0 0 16 16" className="size-4 md:size-3.5" aria-hidden="true">
                <path
                  d="M3.5 3.5l9 9m0-9l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>

          <h2 className="display-lg mt-2 text-ink md:mt-3">
            {primaryAddress(building)}
          </h2>

          {isNumberRange(building) && (
            <p className="mt-1 text-[12px] text-ink-faint">
              Registered as a range of house numbers, so this one pin covers
              several street doors.
            </p>
          )}

          {building.secondary_address && (
            <p className="mt-2 text-[13px] text-ink-soft">
              Also registered as{" "}
              <span className="text-ink">{titleCase(building.secondary_address)}</span>
            </p>
          )}

          {approximate && (
            <div className="mt-3.5">
              <ApproximateFlag />
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-4 md:mt-5">
            <Fact label="Zip" value={building.zip ?? "Not given"} />
            <Fact label="Block" value={building.block ?? "Not given"} />
            <Fact label="Lot" value={building.lot ?? "Not given"} />
          </div>

          <div className="mt-3.5 border-t border-hairline pt-3.5">
            <Fact label="BBL" value={building.bbl ?? "Not given"} />
          </div>

          <div className="mt-4 border-t border-hairline pt-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="eyebrow">Registration status</p>
              <p className="numeral text-[10px] text-ink-faint">
                {building.statuses.length}
              </p>
            </div>

            {building.statuses.length === 0 ? (
              <p className="mt-2 text-[13px] text-ink-faint">
                No status codes on this registration.
              </p>
            ) : (
              <>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {building.statuses.map((code) => (
                    <StatusChip key={code} code={code} />
                  ))}
                </div>
                <p className="mt-2.5 text-[11px] leading-[1.45] text-ink-faint">
                  Tap a chip for what it appears to mean. All wording here is
                  provisional.
                </p>
              </>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 md:mt-6">
            <a
              href={HCR_ASK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-[13px] font-medium text-cream transition-colors duration-200 hover:bg-[#463a2c] active:bg-[#5a4a38]"
            >
              Confirm an apartment with HCR
              <span aria-hidden="true" className="text-cream/70">
                &#8599;
              </span>
            </a>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => onExpand(building)}
                className="min-h-11 flex-1 rounded-xl border border-hairline bg-paper px-4 py-3 text-[13px] text-ink-soft transition-colors duration-200 hover:bg-cream hover:text-ink active:bg-cream-deep"
              >
                Full details
              </button>
              <button
                type="button"
                onClick={() => openDirections(building)}
                className="min-h-11 rounded-xl border border-hairline bg-paper px-4 py-3 text-[13px] text-ink-soft transition-colors duration-200 hover:bg-cream hover:text-ink active:bg-cream-deep"
              >
                Directions
              </button>
            </div>
          </div>

          <p className="mt-4 border-t border-hairline pt-3.5 text-[11px] leading-[1.5] text-ink-faint">
            Being listed here does not confirm that any specific apartment is
            stabilized, and being absent does not mean a building has none. Ask{" "}
            <HcrLink />.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
