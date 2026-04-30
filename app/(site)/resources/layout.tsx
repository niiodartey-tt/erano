import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Resources — Ghana Tax & Business Insights",
  description: "Practical guides, GRA regulatory updates and business advisory insights from the Erano Consulting team in Ghana.",
  openGraph: {
    title:       "Ghana Tax & Business Insights — Erano Consulting",
    description: "Practical guides and regulatory updates from Ghana's trusted accounting firm.",
    url:         "https://eranoconsulting.com/resources",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}