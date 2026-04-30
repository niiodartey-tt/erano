import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Industries — Erano Consulting Ghana",
  description: "Specialist accountancy and tax advisory across SMEs, law firms, embassies, mining, oil & gas, corporate bodies, NGOs and more across Ghana.",
  openGraph: {
    title:       "Industries Served — Erano Consulting Ghana",
    description: "Specialist advisory for SMEs, law firms, embassies, mining, oil & gas and NGOs.",
    url:         "https://eranoconsulting.com/industries",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}