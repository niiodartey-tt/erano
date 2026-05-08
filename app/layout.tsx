import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

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
    <html lang="en-GH" className={plusJakartaSans.variable}>
      <body style={{ margin: 0, padding: 0, background: "#ffffff" }} className={plusJakartaSans.variable}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-navy focus:font-semibold focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}