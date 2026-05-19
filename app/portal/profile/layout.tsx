import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Profile — Erano Client Portal",
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
