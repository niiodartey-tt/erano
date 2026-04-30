import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "About Us — Erano Consulting Ghana",
  description: "Meet the team behind Erano Consulting. ICAG licensed accountants and tax professionals serving businesses across Ghana since 2018.",
  openGraph: {
    title:       "About Erano Consulting — Tax & Audit Professionals Ghana",
    description: "ICAG licensed. CITG certified. GRA registered. Meet the Erano team.",
    url:         "https://eranoconsulting.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}