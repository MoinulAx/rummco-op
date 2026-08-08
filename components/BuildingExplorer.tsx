"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import BuildingDetailSkeleton from "./BuildingDetailSkeleton";
import DetailPanel from "./DetailPanel";
import DirectoryView from "./DirectoryView";
import FilterBar from "./FilterBar";
import Legend from "./Legend";
import MapSearchPreview from "./MapSearchPreview";
import ResponsibilityNote from "./ResponsibilityNote";
import TitleBlock from "./TitleBlock";
import type { View } from "./ViewToggle";
import type { Viewport } from "./BuildingMap";
import { useBuildingCounts, useDebounced, useMediaQuery, useViewportBuildings } from "@/lib/hooks";
import { DEFAULT_ROW_LIMIT } from "@/lib/data/buildings";
import { BOROUGH_BOUNDS, type Building } from "@/lib/buildings";
import { NO_FILTERS, type Bounds, type Filters } from "@/lib/data/types";

// Leaflet touches `window` at import time, so this must never render on the
// server. `ssr: false` is only allowed from a Client Component, which this is.
const BuildingMap = dynamic(() => import("./BuildingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-cream">
      <span className="eyebrow animate-pulse">Loading map</span>
    </div>
  ),
});

// The full record is only needed once a row is opened, so it ships as its own
// chunk behind a skeleton.
const BuildingDetailView = dynamic(() => import("./BuildingDetailView"), {
  ssr: false,
  loading: () => <BuildingDetailSkeleton />,
});

/** Panel width on md+; also drives how far the map shifts when it opens. */
const PANEL_WIDTH = 368;

/** Typing settles before the server is asked anything. */
const QUERY_DEBOUNCE_MS = 260;

export default function BuildingExplorer() {
  const [view, setView] = useState<View>("map");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const [viewport, setViewport] = useState<Viewport | null>(null);
  const [selected, setSelected] = useState<Building | null>(null);
  const [detail, setDetail] = useState<Building | null>(null);
  const [zoomNudge, setZoomNudge] = useState(0);
  const [focus, setFocus] = useState<Bounds | null>(null);
  const [focusToken, setFocusToken] = useState(0);

  const wideViewport = useMediaQuery("(min-width: 768px)");
  const debouncedQuery = useDebounced(query, QUERY_DEBOUNCE_MS);

  const { counts } = useBuildingCounts(filters);
  const viewportRows = useViewportBuildings(
    view === "map" ? (viewport?.bounds ?? null) : null,
    filters,
    DEFAULT_ROW_LIMIT,
  );

  const onViewportChange = useCallback((next: Viewport) => {
    setViewport(next);
  }, []);

  /**
   * Filters flow through here rather than straight into state, because
   * narrowing to exactly one borough should also frame it. Any other change
   * leaves the view alone: yanking the map on every filter tap is disorienting.
   */
  const changeFilters = useCallback(
    (next: Filters) => {
      const wasSingle =
        filters.boroughs.length === 1 ? filters.boroughs[0] : null;
      const isSingle = next.boroughs.length === 1 ? next.boroughs[0] : null;

      if (isSingle && isSingle !== wasSingle) {
        setFocus(BOROUGH_BOUNDS[isSingle]);
        setFocusToken((token) => token + 1);
      }
      setFilters(next);
    },
    [filters],
  );

  const selectBuilding = useCallback((building: Building) => {
    setSelected(building);
  }, []);

  /** A list row opens the full record rather than jumping to the map. */
  const openDetail = useCallback((building: Building) => {
    setDetail(building);
  }, []);

  const closeDetail = useCallback(() => setDetail(null), []);

  const viewOnMap = useCallback((building: Building) => {
    setSelected(building);
    setDetail(null);
    setView("map");
  }, []);

  useEffect(() => {
    if (!detail) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDetail(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detail]);

  const detailOverlay = (
    <AnimatePresence>
      {detail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.16 } }}
          transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={closeDetail}
          className="safe-t safe-b safe-x fixed inset-0 z-[900] flex overflow-y-auto overscroll-contain bg-ink/25 backdrop-blur-[3px] sm:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Building details"
            key={detail.id}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.16 } }}
            transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
            onClick={(event) => event.stopPropagation()}
            className="m-auto w-full max-w-[620px]"
          >
            <BuildingDetailView
              building={detail}
              onClose={closeDetail}
              onViewOnMap={viewOnMap}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (view === "list") {
    return (
      <MotionConfig reducedMotion="user">
        <DirectoryView
          view={view}
          onViewChange={setView}
          query={query}
          onQueryChange={setQuery}
          debouncedQuery={debouncedQuery}
          filters={filters}
          onFiltersChange={changeFilters}
          counts={counts}
          selectedId={detail?.id ?? selected?.id ?? null}
          onOpen={openDetail}
        />
        {detailOverlay}
      </MotionConfig>
    );
  }

  const showResults = debouncedQuery.trim().length > 0 && !selected;
  const drawn = viewportRows.rows.length;

  return (
    <MotionConfig reducedMotion="user">
      {/* --map-bottom-gutter lifts Leaflet's own bottom controls clear of the
          responsibility bar, which is full width on phones. */}
      <div className="map-shell relative h-full w-full overflow-hidden">
        <BuildingMap
          rows={viewportRows.rows}
          selected={selected}
          onSelect={selectBuilding}
          onViewportChange={onViewportChange}
          panOffsetX={selected && wideViewport ? PANEL_WIDTH + 24 : 0}
          focus={focus}
          focusToken={focusToken}
          zoomNudge={zoomNudge}
        />

        {/* Canvas points cannot hold focus or be read out, so the count and the
            selection are announced here, and the list view is the keyboard
            path through the same data. */}
        <p aria-live="polite" className="sr-only">
          {viewportRows.loading
            ? "Loading buildings for this area."
            : `${drawn.toLocaleString()} buildings drawn in this area${
                viewportRows.capped ? ", more exist than are shown" : ""
              }.`}
        </p>

        {/* Floating chrome. The wrapper ignores pointer events so the map stays
            draggable. */}
        <div className="safe-t safe-x pointer-events-none absolute inset-0 z-[600] flex flex-col gap-3 pb-3 md:gap-4 md:pb-6">
          {/* Landscape phones only have ~375px of height, so the title and the
              controls share a row instead of stacking. */}
          <div className="flex min-h-0 flex-1 flex-col gap-2.5 landscape:flex-row landscape:items-start landscape:justify-between md:flex-row md:items-start md:justify-between md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
              className="pointer-events-auto self-start rounded-full border border-hairline bg-paper/95 px-4 py-2.5 shadow-float backdrop-blur-sm md:rounded-2xl md:px-5 md:py-4"
            >
              <TitleBlock
                title="Rent Stabilized NYC"
                count={counts?.total ?? null}
              />
            </motion.div>

            {/* min-w-0 + flex-1 lets the chip rail shrink to the space left
                beside the title instead of overflowing past the right edge. */}
            <div className="thin-scroll pointer-events-auto flex max-h-full min-h-0 w-full flex-col items-end gap-2 overflow-y-auto landscape:min-w-0 landscape:flex-1 md:min-w-0 md:flex-none md:gap-2.5">
              <FilterBar
                view={view}
                onViewChange={setView}
                query={query}
                onQueryChange={setQuery}
                filters={filters}
                onFiltersChange={changeFilters}
                counts={counts}
                align="end"
              />

              <AnimatePresence>
                {showResults && (
                  <MapSearchPreview
                    key="results"
                    query={debouncedQuery}
                    filters={filters}
                    onSelect={selectBuilding}
                    onSeeAll={() => setView("list")}
                  />
                )}
              </AnimatePresence>

              {/* On phones DetailPanel positions itself `fixed` as a bottom
                  sheet; from md up it sits here in the right-hand column. */}
              <AnimatePresence mode="wait">
                {selected && (
                  <DetailPanel
                    key={selected.id}
                    building={selected}
                    onClose={() => setSelected(null)}
                    onExpand={openDetail}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-2 md:flex-row md:items-end md:gap-3">
            <div className="pointer-events-auto order-2 flex flex-col items-start gap-2 md:order-1">
              <AnimatePresence>
                {viewportRows.capped && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                    className="flex max-w-[280px] items-center gap-2.5 rounded-xl border border-hairline bg-paper/95 px-3 py-2 shadow-float backdrop-blur-sm"
                  >
                    <span className="text-[12px] leading-[1.4] text-ink-soft">
                      More buildings here than fit one screen. Groups show all of
                      them.
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomNudge((token) => token + 1)}
                      className="shrink-0 rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-medium text-cream transition-colors duration-200 hover:bg-[#463a2c]"
                    >
                      Zoom in
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {viewportRows.error && (
                <div className="max-w-[280px] rounded-xl border border-hairline bg-paper/95 px-3 py-2 shadow-float backdrop-blur-sm">
                  <p className="text-[12px] leading-[1.4] text-ink-soft">
                    Could not load this area. Pan or zoom to try again.
                  </p>
                </div>
              )}

              <Legend counts={counts?.byBorough ?? null} inView={drawn} />
            </div>

            <div className="pointer-events-none order-1 flex md:order-2 md:min-w-0 md:flex-1">
              <ResponsibilityNote />
            </div>

            {/* Reserves the bottom-right corner for Leaflet's zoom control. */}
            <div aria-hidden="true" className="hidden shrink-0 md:order-3 md:block md:w-14" />
          </div>
        </div>

        {detailOverlay}
      </div>
    </MotionConfig>
  );
}
