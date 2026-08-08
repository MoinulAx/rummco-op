import L from "leaflet";
import Supercluster from "supercluster";
import {
  BOROUGHS,
  boroughColor,
  type Borough,
  type Building,
} from "./buildings";

/**
 * Clustering and canvas drawing for the map.
 *
 * Supercluster does the grouping in memory over whatever the viewport fetch
 * returned. Below `POINT_ZOOM` it hands back cluster bubbles; at or above it,
 * every row comes back as an individual point. That single `maxZoom` setting is
 * the zoom tiering, so there is no second code path to keep in sync.
 */

/** Zoom at which clusters dissolve into one circle per building. */
export const POINT_ZOOM = 15;

/** Below this many points in range, drawing them individually is fine. */
const MIN_POINTS = 4;

/** Flat borough tallies. Supercluster shallow-clones props, so no nesting. */
type BoroughTally = Record<Borough, number>;

type PointProps = BoroughTally & { index: number };

/**
 * Supercluster adds its own `cluster`, `cluster_id` and `point_count` on top of
 * whatever `map`/`reduce` accumulate, so the second generic is only the extra
 * properties: here, the borough tallies.
 */
type ClusterProps = BoroughTally;

function zeroTally(): BoroughTally {
  return {
    MANHATTAN: 0,
    BRONX: 0,
    BROOKLYN: 0,
    QUEENS: 0,
    "STATEN ISLAND": 0,
  };
}

export type ClusterFeature = {
  kind: "cluster";
  id: number;
  lat: number;
  lng: number;
  count: number;
  /** Borough contributing the most points, which sets the bubble tint. */
  dominant: Borough;
  /** True when a single borough accounts for the whole bubble. */
  pure: boolean;
};

export type PointFeature = {
  kind: "point";
  building: Building;
};

export type ClusterCell = ClusterFeature | PointFeature;

export type ClusterIndex = {
  cells(bbox: [number, number, number, number], zoom: number): ClusterCell[];
  /** Zoom at which a given cluster breaks apart, for click-to-expand. */
  expansionZoom(clusterId: number): number;
};

/**
 * Builds an index over one page of rows. Cheap enough to rebuild whenever the
 * viewport fetch resolves, which is exactly when the input changes.
 */
export function buildClusterIndex(rows: Building[]): ClusterIndex {
  const index = new Supercluster<PointProps, ClusterProps>({
    radius: 68,
    // One past POINT_ZOOM, so POINT_ZOOM itself already shows loose points.
    maxZoom: POINT_ZOOM - 1,
    minPoints: MIN_POINTS,
    extent: 512,
    // Flat numeric keys only: supercluster shallow-clones the mapped object
    // for the first point of a cluster, so a nested tally would be shared
    // between clusters and corrupt every count after the first.
    map: (props) => {
      const tally = zeroTally();
      for (const borough of BOROUGHS) tally[borough] = props[borough];
      return tally;
    },
    reduce: (accumulated, props) => {
      for (const borough of BOROUGHS) {
        accumulated[borough] += props[borough];
      }
    },
  });

  index.load(
    rows.map((building, i) => {
      const tally = zeroTally();
      tally[building.borough] = 1;
      return {
        type: "Feature" as const,
        properties: { ...tally, index: i },
        geometry: {
          type: "Point" as const,
          coordinates: [building.lng, building.lat] as [number, number],
        },
      };
    }),
  );

  return {
    cells(bbox, zoom) {
      const raw = index.getClusters(bbox, Math.round(zoom));
      return raw.map((feature): ClusterCell => {
        const [lng, lat] = feature.geometry.coordinates;
        const props = feature.properties;

        if ("cluster" in props && props.cluster) {
          let dominant: Borough = "MANHATTAN";
          let best = -1;
          let nonZero = 0;
          for (const borough of BOROUGHS) {
            const n = props[borough];
            if (n > 0) nonZero += 1;
            if (n > best) {
              best = n;
              dominant = borough;
            }
          }
          return {
            kind: "cluster",
            id: props.cluster_id,
            lat,
            lng,
            count: props.point_count,
            dominant,
            pure: nonZero === 1,
          };
        }

        return { kind: "point", building: rows[(props as PointProps).index] };
      });
    },

    expansionZoom(clusterId) {
      return Math.min(index.getClusterExpansionZoom(clusterId), 18);
    },
  };
}

/* ── Canvas drawing ─────────────────────────────────────────────────────── */

/**
 * A circle marker that also paints its own count into the shared canvas.
 *
 * Leaflet has no canvas text primitive, so this hooks the one place the
 * renderer hands a layer the 2D context. It stays a real CircleMarker, which
 * means hit testing, hover and click keep working for free, and no cluster
 * needs a DOM node.
 */
type CountCircleOptions = L.CircleMarkerOptions & {
  countLabel?: string;
  labelColor?: string;
  labelSize?: number;
};

type CanvasRendererInternals = {
  _ctx?: CanvasRenderingContext2D;
};

/** Leaflet's own draw hook, which the public typings do not describe. */
type DrawableCircle = L.CircleMarker & {
  _point?: L.Point;
  _renderer?: CanvasRendererInternals;
  _updatePath(): void;
};

const CountCircleMarker = L.CircleMarker.extend({
  _updatePath(this: DrawableCircle) {
    // Draw the circle exactly as Leaflet would.
    (L.CircleMarker.prototype as unknown as DrawableCircle)._updatePath.call(
      this,
    );

    const options = this.options as CountCircleOptions;
    const label = options.countLabel;
    if (!label) return;

    const ctx = this._renderer?._ctx;
    const point = this._point;
    // Defensive: a future Leaflet could rename either. A missing count is a
    // cosmetic loss, never a crash.
    if (!ctx || !point) return;

    ctx.save();
    ctx.font = `600 ${options.labelSize ?? 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillStyle = options.labelColor ?? "#fdfbf7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, point.x, point.y);
    ctx.restore();
  },
}) as unknown as new (
  latlng: L.LatLngExpression,
  options: CountCircleOptions,
) => L.CircleMarker;

/** Compact counts, because "1.2k" fits a bubble and "1243" does not. */
export function abbreviateCount(count: number): string {
  if (count < 1000) return String(count);
  if (count < 10000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${Math.round(count / 1000)}k`;
}

/**
 * Density-aware radius. Sizing off the largest bubble currently on screen
 * keeps the spread readable whether the viewport holds forty buildings or two
 * thousand, instead of pinning everything to the top of a fixed scale.
 */
export function clusterRadius(count: number, maxCount: number): number {
  const MIN = 14;
  const MAX = 27;
  if (maxCount <= 1) return MIN;
  // Square root keeps area roughly proportional to the count; log flattens the
  // long tail so one huge bubble does not shrink everything else.
  const ratio = Math.log(count + 1) / Math.log(maxCount + 1);
  return Math.round(MIN + (MAX - MIN) * Math.sqrt(ratio));
}

export function createClusterBubble(
  cluster: ClusterFeature,
  maxCount: number,
  renderer: L.Renderer,
): L.CircleMarker {
  const color = boroughColor(cluster.dominant);
  const radius = clusterRadius(cluster.count, maxCount);

  return new CountCircleMarker([cluster.lat, cluster.lng], {
    renderer,
    radius,
    // A mixed-borough bubble is drawn softer, so a solid fill always means
    // "everything in here is one borough".
    fillColor: color.base,
    fillOpacity: cluster.pure ? 0.9 : 0.74,
    color: "#fdfbf7",
    weight: 2,
    opacity: 0.95,
    countLabel: abbreviateCount(cluster.count),
    labelColor: "#fdfbf7",
    labelSize: radius >= 22 ? 12 : 11,
    interactive: true,
    bubblingMouseEvents: false,
  });
}

export function createPointCircle(
  building: Building,
  renderer: L.Renderer,
  zoom: number,
): L.CircleMarker {
  const color = boroughColor(building.borough);
  const approximate = building.geocode_quality === "approximate";

  return L.circleMarker([building.lat, building.lng], {
    renderer,
    // Points grow a little as the map zooms in, so a dense block does not read
    // as one smear at z13 and as loose confetti at z17.
    radius: zoom >= 17 ? 7 : zoom >= POINT_ZOOM ? 6 : 5,
    fillColor: color.base,
    // An approximate point is drawn hollow: same colour, no confident centre.
    fillOpacity: approximate ? 0.22 : 0.88,
    color: color.base,
    weight: approximate ? 1.5 : 1.25,
    opacity: approximate ? 0.9 : 0.55,
    interactive: true,
    bubblingMouseEvents: false,
  });
}

/**
 * Adds layers a slice at a time instead of in one blocking loop, so dropping
 * two thousand circles onto the map never stalls a pan or a tap. Returns a
 * cancel function for when the viewport moves on mid-flight.
 */
export function addLayersChunked(
  group: L.LayerGroup,
  layers: L.Layer[],
  chunkSize = 220,
): () => void {
  let cursor = 0;
  let frame = 0;
  let cancelled = false;

  function step() {
    if (cancelled) return;
    const end = Math.min(cursor + chunkSize, layers.length);
    for (; cursor < end; cursor++) group.addLayer(layers[cursor]);
    if (cursor < layers.length) frame = requestAnimationFrame(step);
  }

  step();

  return () => {
    cancelled = true;
    if (frame) cancelAnimationFrame(frame);
  };
}
