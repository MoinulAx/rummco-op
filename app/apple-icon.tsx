import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icons must be raster, so this renders the mark to a PNG. */
export default async function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#33291F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 32 32">
        <path
          d="M7.4 10.6h17.2v14.2a1 1 0 0 1-1 1H8.4a1 1 0 0 1-1-1z"
          fill="#F7F2E9"
        />
        <path
          d="M16 5.2l9.6 5.1a0.9 0.9 0 0 1-0.4 1.7H6.8a0.9 0.9 0 0 1-0.4-1.7z"
          fill="#F7F2E9"
        />
        <rect x="9.9" y="13.4" width="3.5" height="3.5" rx="0.9" fill="#33291F" />
        <rect x="18.6" y="13.4" width="3.5" height="3.5" rx="0.9" fill="#33291F" />
        <rect x="9.9" y="19.1" width="3.5" height="3.5" rx="0.9" fill="#33291F" />
        <rect x="18.6" y="19.1" width="3.5" height="6.7" rx="0.9" fill="#C2632E" />
      </svg>
    </div>,
    size,
  );
}
