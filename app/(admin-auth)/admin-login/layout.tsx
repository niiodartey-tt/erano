import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Erano Consulting",
  robots: {
    index:  false,
    follow: false,
  },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
