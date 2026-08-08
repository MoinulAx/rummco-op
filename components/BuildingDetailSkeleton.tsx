"use client";

/** Shown while the lazily-loaded detail view chunk is still arriving. */
export default function BuildingDetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading building details"
      className="w-full overflow-hidden rounded-2xl border border-hairline bg-paper shadow-lift"
    >
      <div className="shimmer px-5 pt-6 pb-5 md:px-7 md:pt-7">
        <div className="h-6 w-28 rounded-full bg-paper/60" />
        <div className="mt-4 h-9 w-3/5 rounded-md bg-paper/60" />
        <div className="mt-3 h-4 w-2/5 rounded bg-paper/50" />
      </div>

      <div className="px-5 pt-5 pb-6 md:px-7 md:pt-6 md:pb-7">
        <div className="grid grid-cols-2 gap-5 border-t border-hairline pt-5 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="shimmer h-2.5 w-12 rounded" />
              <div className="shimmer mt-2.5 h-4 w-4/5 rounded" />
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-hairline pt-5">
          <div className="shimmer h-2.5 w-32 rounded" />
          <div className="mt-3 space-y-3">
            <div className="shimmer h-[86px] w-full rounded-xl" />
            <div className="shimmer h-[86px] w-full rounded-xl" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <div className="shimmer h-12 flex-1 rounded-xl" />
          <div className="shimmer h-12 w-32 rounded-xl" />
          <div className="shimmer h-12 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
