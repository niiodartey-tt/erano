"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyUs from "@/components/sections/WhyUs";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <CTABanner />
    </>
  );
}