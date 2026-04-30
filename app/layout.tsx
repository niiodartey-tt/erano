import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default:  "Erano Consulting — Tax, Audit & Business Advisory Ghana",
    template: "%s | Erano Consulting",
  },
  description:
    "Professional tax advisory, audit, accounting, and business consultancy services for SMEs and corporate clients across Ghana.",
  keywords: [
    "tax advisory Ghana",
    "audit Ghana",
    "accounting firm Accra",
    "business consultancy Ghana",
    "ICAG licensed",
    "GRA compliance",
    "VAT Ghana",
    "PAYE Ghana",
  ],
  authors:  [{ name: "Erano Consulting" }],
  creator:  "Erano Consulting",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://eranoconsulting.com"
  ),
  openGraph: {
    type:        "website",
    locale:      "en_GH",
    url:         "https://eranoconsulting.com",
    siteName:    "Erano Consulting",
    title:       "Erano Consulting — Tax, Audit & Business Advisory Ghana",
    description: "Professional tax advisory, audit, accounting, and business consultancy services for SMEs and corporate clients across Ghana.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Erano Consulting",
    description: "Tax, Audit & Business Advisory — Ghana",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#ffffff" }}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}