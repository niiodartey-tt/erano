import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Free Ghana Tax Calculators — VAT, PAYE, Corporate Tax & SSNIT",
  description: "Free online tax calculators for Ghana businesses. Estimate VAT, PAYE, corporate income tax and SSNIT contributions using current GRA rates.",
  openGraph: {
    title:       "Free Ghana Tax Calculators — Erano Consulting",
    description: "VAT, PAYE, corporate tax and SSNIT calculators using current GRA rates.",
    url:         "https://eranoconsulting.com/tools",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}