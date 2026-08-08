"use client";

import { motion } from "framer-motion";

export type View = "map" | "list";

const OPTIONS: { id: View; label: string }[] = [
  { id: "map", label: "Map" },
  { id: "list", label: "List" },
];

export default function ViewToggle({
  value,
  onChange,
}: {
  value: View;
  onChange: (value: View) => void;
}) {
  return (
    <div
      role="group"
      aria-label="View"
      className="flex h-12 shrink-0 items-center gap-0.5 rounded-2xl border border-hairline bg-cream-deep/70 p-1.5 shadow-float"
    >
      {OPTIONS.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={[
              "ui-label relative rounded-xl px-4 py-1.5 text-sm whitespace-nowrap transition-colors duration-200",
              active ? "text-ink" : "text-ink-soft hover:text-ink",
            ].join(" ")}
          >
            {active && (
              <motion.span
                layoutId="view-active-fill"
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-paper shadow-[0_1px_3px_rgb(51_41_31_/_0.14)]"
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 34,
                  mass: 0.7,
                }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
