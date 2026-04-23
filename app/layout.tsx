import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Erano Consulting — Tax, Audit & Business Advisory Ghana",
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
  authors: [{ name: "Erano Consulting" }],
  creator: "Erano Consulting",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://eranoconsulting.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://eranoconsulting.com",
    siteName: "Erano Consulting",
    title: "Erano Consulting — Tax, Audit & Business Advisory Ghana",
    description:
      "Professional tax advisory, audit, accounting, and business consultancy services for SMEs and corporate clients across Ghana.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erano Consulting",
    description: "Tax, Audit & Business Advisory — Ghana",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
