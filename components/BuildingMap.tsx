"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import {
  POINT_ZOOM,
  addLayersChunked,
  buildClusterIndex,
  createClusterBubble,
  createPointCircle,
} from "@/lib/cluster";
import { pinLabel, selectedPinIcon } from "@/lib/marker";
import { boroughLabel, primaryAddress, type Building } from "@/lib/buildings";
import type { Bounds } from "@/lib/data/types";

const CARTO_VOYAGER =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
  '&copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Centred so all five boroughs, Staten Island included, fit at z11. */
const NYC_CENTER: L.LatLngExpression = [40.7128, -73.96];
const NYC_ZOOM = 11;

/** Stops a pan into the Atlantic from firing pointless queries. */
const NYC_MAX_BOUNDS = L.latLngBounds([40.44, -74.32], [40.94, -73.68]);

/** Insets so fitBounds keeps points clear of the floating cards. */
const FIT_PADDING_TOP_LEFT: L.PointExpression = [96, 150];
const FIT_PADDING_BOTTOM_RIGHT: L.PointExpression = [96, 150];

/** How far past the visible edge to fetch, so a small pan needs no refetch. */
const FETCH_PAD = 0.25;

/** Trailing debounce on moveend, matched to a comfortable flick-and-settle. */
const MOVE_DEBOUNCE_MS = 250;

export type Viewport = { bounds: Bounds; zoom: number };

type Props = {
  rows: Building[];
  selected: Building | null;
  onSelect: (building: Building) => void;
  onViewportChange: (viewport: Viewport) => void;
  /** Px to shift the centre east so the selected pin clears the detail panel. */
  panOffsetX?: number;
  /** Fit the map to this box when `focusToken` changes. */
  focus?: Bounds | null;
  focusToken?: number;
  /** Incrementing this zooms in, for the "too many here" affordance. */
  zoomNudge?: number;
};

function toBounds(bounds: L.LatLngBounds): Bounds {
  return {
    south: bounds.getSouth(),
    west: bounds.getWest(),
    north: bounds.getNorth(),
    east: bounds.getEast(),
  };
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reports the padded viewport after movement settles.
 *
 * Debounced here rather than in the data layer, because this is where the
 * bursts happen: a single drag emits one moveend, but a pinch or a flywheel
 * scroll emits several in a few hundred milliseconds.
 */
function ViewportReporter({
  onViewportChange,
}: {
  onViewportChange: (viewport: Viewport) => void;
}) {
  const map = useMap();
  const timer = useRef<number | undefined>(undefined);

  const emit = useCallback(() => {
    onViewportChange({
      bounds: toBounds(map.getBounds().pad(FETCH_PAD)),
      zoom: map.getZoom(),
    });
  }, [map, onViewportChange]);

  useEffect(() => {
    // Fire once up front so the first paint has rows.
    emit();

    const settle = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(emit, MOVE_DEBOUNCE_MS);
    };

    map.on("moveend", settle);
    map.on("zoomend", settle);

    return () => {
      map.off("moveend", settle);
      map.off("zoomend", settle);
      window.clearTimeout(timer.current);
    };
  }, [map, emit]);

  return null;
}

/**
 * Everything except the selected pin, drawn into one shared canvas.
 *
 * Supercluster decides what each cell is; below `POINT_ZOOM` most of them are
 * bubbles and above it they are all individual circles. Layers are added a
 * slice per frame so two thousand of them never block a gesture.
 */
function CanvasLayer({
  rows,
  renderer,
  onSelect,
}: {
  rows: Building[];
  renderer: L.Canvas;
  onSelect: (building: Building) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());

  useEffect(() => {
    const sync = () => setZoom(map.getZoom());
    map.on("zoomend", sync);
    return () => {
      map.off("zoomend", sync);
    };
  }, [map]);

  const index = useMemo(() => buildClusterIndex(rows), [rows]);

  useEffect(() => {
    const group = L.layerGroup().addTo(map);

    // One shared tooltip beats two thousand bound ones.
    const tooltip = L.tooltip({
      direction: "top",
      offset: [0, -8],
      opacity: 1,
      className: "rs-tooltip",
      pane: "tooltipPane",
    });
    let tooltipOpen = false;

    const container = map.getContainer();
    const setCursor = (value: string) => {
      container.style.cursor = value;
    };

    const closeTooltip = () => {
      if (tooltipOpen) {
        map.closeTooltip(tooltip);
        tooltipOpen = false;
      }
      setCursor("");
    };

    const box = map.getBounds().pad(FETCH_PAD + 0.05);
    const cells = index.cells(
      [box.getWest(), box.getSouth(), box.getEast(), box.getNorth()],
      zoom,
    );

    let maxCount = 1;
    for (const cell of cells) {
      if (cell.kind === "cluster" && cell.count > maxCount) maxCount = cell.count;
    }

    const layers: L.Layer[] = cells.map((cell) => {
      if (cell.kind === "cluster") {
        const bubble = createClusterBubble(cell, maxCount, renderer);
        bubble.on("mouseover", () => {
          setCursor("pointer");
          tooltip
            .setLatLng([cell.lat, cell.lng])
            .setContent(
              `<span class="block text-[13px] font-medium">${cell.count.toLocaleString()} buildings</span>` +
                `<span class="block font-mono text-[11px] opacity-70">${
                  cell.pure ? boroughLabel(cell.dominant) : "Mixed boroughs"
                }. Click to zoom in.</span>`,
            );
          map.openTooltip(tooltip);
          tooltipOpen = true;
        });
        bubble.on("mouseout", closeTooltip);
        bubble.on("click", () => {
          closeTooltip();
          map.flyTo([cell.lat, cell.lng], index.expansionZoom(cell.id), {
            duration: prefersReducedMotion() ? 0 : 0.7,
          });
        });
        return bubble;
      }

      const building = cell.building;
      const circle = createPointCircle(building, renderer, zoom);
      circle.on("mouseover", () => {
        setCursor("pointer");
        tooltip
          .setLatLng([building.lat, building.lng])
          .setContent(
            `<span class="block text-[13px] font-medium">${primaryAddress(building)}</span>` +
              `<span class="block font-mono text-[11px] opacity-70">${boroughLabel(
                building.borough,
              )}${building.zip ? ` ${building.zip}` : ""}</span>`,
          );
        map.openTooltip(tooltip);
        tooltipOpen = true;
      });
      circle.on("mouseout", closeTooltip);
      circle.on("click", () => {
        closeTooltip();
        onSelect(building);
      });
      return circle;
    });

    const cancel = addLayersChunked(group, layers);

    return () => {
      cancel();
      closeTooltip();
      group.clearLayers();
      map.removeLayer(group);
    };
  }, [map, index, zoom, renderer, onSelect]);

  return null;
}

/** Eases to the selected building, keeping it clear of the detail panel. */
function FlyToSelected({
  building,
  panOffsetX = 0,
}: {
  building: Building | null;
  panOffsetX?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!building) return;

    // Shifting the centre east by half the panel width lands the pin in the
    // middle of the map area still visible beside the panel.
    const zoom = Math.max(map.getZoom(), POINT_ZOOM + 1);
    const target = map
      .project([building.lat, building.lng], zoom)
      .add([panOffsetX / 2, 0]);
    const center = map.unproject(target, zoom);

    if (prefersReducedMotion()) {
      map.setView(center, zoom, { animate: false });
      return;
    }

    map.flyTo(center, zoom, { duration: 0.85, easeLinearity: 0.3 });
  }, [map, building, panOffsetX]);

  return null;
}

/** Frames a borough when the filters narrow to exactly one. */
function FitToFocus({
  focus,
  focusToken,
}: {
  focus?: Bounds | null;
  focusToken?: number;
}) {
  const map = useMap();
  const first = useRef(true);

  useEffect(() => {
    // Skip the mount pass so the default NYC view is not immediately overridden.
    if (first.current) {
      first.current = false;
      return;
    }
    if (!focus) return;

    map.fitBounds(
      L.latLngBounds([focus.south, focus.west], [focus.north, focus.east]),
      {
        paddingTopLeft: FIT_PADDING_TOP_LEFT,
        paddingBottomRight: FIT_PADDING_BOTTOM_RIGHT,
        animate: !prefersReducedMotion(),
        maxZoom: 14,
      },
    );
    // focusToken is a deliberate trigger, not a value the effect reads.
  }, [map, focusToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

/** Backs the "zoom in to see individual buildings" button. */
function ZoomNudge({ token }: { token?: number }) {
  const map = useMap();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    map.zoomIn(2, { animate: !prefersReducedMotion() });
  }, [map, token]);

  return null;
}

/**
 * Keeps Leaflet's internal size in sync. The ResizeObserver covers layout
 * changes; the orientation/resize listeners cover mobile browsers that rotate
 * or collapse their URL bar without the container box changing in time, which
 * is what leaves the map rendering half-blank.
 */
function ResizeWatcher() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const refresh = () => map.invalidateSize({ animate: false });

    const observer = new ResizeObserver(refresh);
    observer.observe(container);

    // Orientation changes settle a frame or two after the event fires.
    const onOrientation = () => {
      refresh();
      window.setTimeout(refresh, 250);
    };

    window.addEventListener("orientationchange", onOrientation);
    window.addEventListener("resize", refresh);
    window.visualViewport?.addEventListener("resize", refresh);

    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", onOrientation);
      window.removeEventListener("resize", refresh);
      window.visualViewport?.removeEventListener("resize", refresh);
    };
  }, [map]);

  return null;
}

export default function BuildingMap({
  rows,
  selected,
  onSelect,
  onViewportChange,
  panOffsetX,
  focus,
  focusToken,
  zoomNudge,
}: Props) {
  // One canvas for every point and bubble on the map. Created once: handing
  // Leaflet a new renderer would tear down and rebuild the whole surface.
  const renderer = useMemo(() => L.canvas({ padding: 0.5 }), []);

  const icon = useMemo(
    () => (selected ? selectedPinIcon(selected) : null),
    [selected],
  );

  return (
    <MapContainer
      center={NYC_CENTER}
      zoom={NYC_ZOOM}
      minZoom={10}
      maxZoom={18}
      maxBounds={NYC_MAX_BOUNDS}
      maxBoundsViscosity={0.6}
      zoomControl={false}
      // Canvas is the whole point: 2,000 DOM pins is not a thing that can be
      // made fast, and 2,000 canvas circles is barely work.
      preferCanvas
      renderer={renderer}
      scrollWheelZoom
      // Explicit so touch behaviour can't regress: one-finger drag, pinch zoom,
      // double-tap zoom. `tapHold` is off because Leaflet's simulator
      // double-fires clicks on modern mobile browsers.
      dragging
      touchZoom
      doubleClickZoom
      tapHold={false}
      className="h-full w-full"
    >
      <TileLayer
        url={CARTO_VOYAGER}
        attribution={CARTO_ATTRIBUTION}
        subdomains="abcd"
        detectRetina
      />
      <ZoomControl position="bottomright" zoomInTitle="Zoom in" zoomOutTitle="Zoom out" />

      <ViewportReporter onViewportChange={onViewportChange} />
      <CanvasLayer rows={rows} renderer={renderer} onSelect={onSelect} />
      <FlyToSelected building={selected} panOffsetX={panOffsetX} />
      <FitToFocus focus={focus} focusToken={focusToken} />
      <ZoomNudge token={zoomNudge} />
      <ResizeWatcher />

      {/* The only DOM marker on the map. */}
      {selected && icon && (
        <Marker
          key={selected.id}
          position={[selected.lat, selected.lng]}
          icon={icon}
          zIndexOffset={1000}
          keyboard
          alt={pinLabel(selected)}
        />
      )}
    </MapContainer>
  );
}
