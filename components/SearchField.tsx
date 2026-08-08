"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  /** Shows the hairline loader while a server query is in flight. */
  busy?: boolean;
  placeholder?: string;
};

/**
 * Search input. The query goes to the server debounced; this component never
 * filters anything itself, because the full set is 50,000 rows and none of it
 * lives in the browser.
 */
export default function SearchField({
  value,
  onChange,
  busy = false,
  placeholder = "Search a street",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K focuses search; Escape clears it while focused.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <label className="group flex h-12 w-full items-center gap-2.5 rounded-2xl border border-hairline bg-paper px-4 shadow-float transition-shadow duration-200 focus-within:shadow-lift">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-4 shrink-0 text-ink-faint transition-colors duration-200 group-focus-within:text-ink-soft"
        >
          <circle
            cx="7"
            cy="7"
            r="4.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10.6 10.6L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onChange("");
              event.currentTarget.blur();
            }
          }}
          placeholder={placeholder}
          aria-label="Search buildings by street"
          /* 16px on mobile is required, or iOS Safari zooms the page on focus. */
          className="ui-label min-w-0 flex-1 bg-transparent text-base text-ink placeholder:font-normal placeholder:text-ink-faint focus:outline-none md:text-sm [&::-webkit-search-cancel-button]:appearance-none"
        />

        <kbd className="hidden shrink-0 font-mono text-[10px] tracking-wider text-ink-faint sm:block">
          &#8984;K
        </kbd>
      </label>

      {/* Sits on the field's bottom edge, so a slow query reads as progress
          rather than as nothing happening. */}
      {busy && (
        <span
          aria-hidden="true"
          className="query-bar absolute inset-x-3 bottom-0 h-px rounded-full"
        />
      )}
    </div>
  );
}
