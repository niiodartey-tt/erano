import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Contact Us — Erano Consulting Ghana",
  description: "Get in touch with Erano Consulting. Free initial consultation for all new clients. We respond within one business day.",
  openGraph: {
    title:       "Contact Erano Consulting — Free Initial Consultation",
    description: "Book a free consultation with Ghana's trusted tax and audit professionals.",
    url:         "https://eranoconsulting.com/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}