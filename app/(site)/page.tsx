"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/sections/Hero";
import TickerStrip from "@/components/sections/TickerStrip";
import ServicesStrip from "@/components/sections/ServicesStrip";
import WhyErano from "@/components/sections/WhyErano";
import StatsSection from "@/components/sections/StatsSection";
import Testimonial from "@/components/sections/Testimonial";
import SectorsGrid from "@/components/sections/SectorsGrid";
import HomeCTA from "@/components/sections/HomeCTA";

export default function HomePage() {
  useScrollReveal();
  return (
    <>
      {/* Hero + Ticker = exactly one viewport height minus navbar */}
      <div style={{
        display:       "flex",
        flexDirection: "column",
        height:        "calc(100vh - 72px)",
        minHeight:     "560px",
      }}>
        <div style={{ flex: 1, overflow: "hidden", position: "relative", minHeight: 0 }}>
          <Hero />
        </div>
        <div style={{ flexShrink: 0 }}>
          <TickerStrip />
        </div>
      </div>

      <ServicesStrip />
      <WhyErano />
      <StatsSection />
      <Testimonial />
      <SectorsGrid />
      <HomeCTA />
    </>
  );
}