import { ImageResponse } from "next/og";
import { BOROUGHS, BOROUGH_COLORS, BOROUGH_LABELS } from "@/lib/buildings";

export const alt =
  "Rent Stabilized NYC, a map of the 2024 DHCR building registrations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered to a PNG at build time by Next's own renderer. No external image
 * service, no network fetch, no key.
 *
 * The headline number is the published size of the 2024 registration files
 * rather than a live count, because this image is built once and the card
 * should not imply a query result.
 */
const REGISTERED_BUILDINGS = "50,879";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F7F2E9",
        padding: "68px 80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Warm corner wash, echoing the map's paper palette. */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -140,
          width: 620,
          height: 620,
          borderRadius: 620,
          background: "#F4E2D5",
          opacity: 0.75,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 11,
              background: "#33291F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: 4,
                background: "#C2632E",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3.4,
              color: "#9A8F82",
              textTransform: "uppercase",
            }}
          >
            2024 DHCR registrations
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 104,
            lineHeight: 1.02,
            color: "#33291F",
            letterSpacing: -3,
            display: "flex",
          }}
        >
          Rent Stabilized NYC
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 31,
            color: "#6B5F52",
            display: "flex",
          }}
        >
          {REGISTERED_BUILDINGS} registered buildings across all five boroughs
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 22,
            color: "#9A8F82",
            display: "flex",
            maxWidth: 900,
          }}
        >
          A registration snapshot, not a legal determination. Only HCR can
          confirm an individual apartment.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        {BOROUGHS.map((borough) => (
          <div
            key={borough}
            style={{ display: "flex", alignItems: "center", gap: 11 }}
          >
            <div
              style={{
                width: 17,
                height: 17,
                borderRadius: 17,
                background: BOROUGH_COLORS[borough].base,
              }}
            />
            <div style={{ fontSize: 24, color: "#33291F" }}>
              {BOROUGH_LABELS[borough]}
            </div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
