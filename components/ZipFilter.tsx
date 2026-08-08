"use client";

import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * ZIP filter. Applied server-side as an exact match, so it stays local until
 * it is a full five digits and there is something real to ask for.
 */
export default function ZipFilter({ value, onChange }: Props) {
  // The field holds a draft so partial digits can be typed without querying.
  // When the applied filter changes from elsewhere (a "clear all", say), the
  // draft is adjusted during render rather than in an effect, so there is no
  // frame where the input shows the old value.
  const [draft, setDraft] = useState(value);
  const [applied, setApplied] = useState(value);

  if (value !== applied) {
    setApplied(value);
    setDraft(value);
  }

  function commit(next: string) {
    const digits = next.replace(/\D/g, "").slice(0, 5);
    setDraft(digits);
    // An exact-match filter on a partial ZIP would only ever return nothing.
    if (digits.length === 5 || digits.length === 0) onChange(digits);
  }

  const partial = draft.length > 0 && draft.length < 5;

  return (
    <label
      className={[
        "flex h-12 shrink-0 items-center gap-2.5 rounded-2xl border bg-paper px-4 shadow-float transition-shadow duration-200 focus-within:shadow-lift md:h-10",
        partial ? "border-caution/40" : "border-hairline",
      ].join(" ")}
    >
      <span className="eyebrow shrink-0">Zip</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="postal-code"
        value={draft}
        onChange={(event) => commit(event.target.value)}
        placeholder="10025"
        aria-label="Filter by ZIP code"
        aria-describedby={partial ? "zip-hint" : undefined}
        /* 16px on mobile is required, or iOS Safari zooms the page on focus. */
        className="numeral w-[5.5ch] min-w-0 bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none md:text-sm"
      />
      {draft.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setDraft("");
            onChange("");
          }}
          aria-label="Clear ZIP filter"
          className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:bg-cream-deep hover:text-ink"
        >
          <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
            <path
              d="M3.5 3.5l9 9m0-9l-9 9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      )}
      {partial && (
        <span id="zip-hint" className="sr-only">
          Enter all five digits to apply the ZIP filter.
        </span>
      )}
    </label>
  );
}
