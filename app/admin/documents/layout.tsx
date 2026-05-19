import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Documents — Erano Admin",
};

export default function DocumentsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
