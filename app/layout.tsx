import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Netlify exposes the deploy URL as URL; falls back to localhost in dev.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "http://localhost:3000";

const description =
  "A personal, read-only map of the buildings in the 2024 DHCR rent stabilization registration files, across all five boroughs of New York City. A registration snapshot, not a legal determination.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rent Stabilized NYC",
    template: "%s · Rent Stabilized NYC",
  },
  description,
  applicationName: "Rent Stabilized NYC",
  // A personal read-only project built on a public registration snapshot. It
  // should not be indexed as though it were an authoritative source.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    siteName: "Rent Stabilized NYC",
    title: "Rent Stabilized NYC",
    description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent Stabilized NYC",
    description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

/**
 * `viewportFit: "cover"` is what makes env(safe-area-inset-*) resolve to real
 * values on notched phones. Without it every inset is 0. Zooming is left
 * enabled deliberately, since blocking it is an accessibility failure.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f2e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden overscroll-none">{children}</body>
    </html>
  );
}
