import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Our Services — Erano Consulting",
  description: "Professional accountancy, business advisory and tax planning services for SMEs and corporate clients across Ghana. Plans from GHS 0 to GHS 37,500/year.",
  openGraph: {
    title:       "Erano Consulting Services — Tax, Audit & Business Advisory Ghana",
    description: "Accountancy, business advisory and tax planning. Plans from GHS 0/year.",
    url:         "https://eranoconsulting.com/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}