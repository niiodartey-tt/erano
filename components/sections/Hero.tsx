"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowRight } from "lucide-react";

function StatCard({
  end,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const { count, ref } = useCountUp({ end, duration: 1400, decimals });
  return (
    <div className="text-center">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="font-display text-[2.25rem] font-medium text-brand-charcoal leading-none"
      >
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
      </p>
      <p className="text-ui-sm text-brand-grey mt-1.5">{label}</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-hero-gradient overflow-hidden">

      {/* Subtle geometric background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-blue/5 translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-cloud/60 -translate-x-1/4 translate-y-1/4" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#5C6167" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="container-erano relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="eyebrow mb-5 reveal">
              Tax · Audit · Advisory · Ghana
            </p>

            <h1 className="heading-display mb-6 reveal reveal-delay-1">
              Expert financial<br />
              guidance for your<br />
              <em>growing business</em>
            </h1>

            <p className="text-ui-lg text-brand-grey leading-relaxed mb-8 max-w-[480px] reveal reveal-delay-2">
              Erano Consulting provides professional tax advisory, audit,
              accounting, and business consultancy services tailored to
              Ghana&apos;s regulatory landscape.
            </p>

            <div className="flex flex-wrap gap-3 mb-12 reveal reveal-delay-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-blue hover:shadow-lg hover:-translate-y-0.5"
              >
                Our services
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-brand-blue-light text-brand-charcoal font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue-dark transition-all bg-white/70"
              >
                Book a consultation
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 reveal reveal-delay-4">
              {[
                "ICAG Licensed",
                "GRA Registered",
                "CITG Certified",
                "RGD Incorporated",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-ui-sm text-brand-grey"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — stats card */}
          <div className="reveal reveal-delay-2">
            <div className="bg-white/80 backdrop-blur-sm border border-brand-cloud rounded-2xl p-8 shadow-card">

              <p className="eyebrow text-brand-grey mb-6">
                Trusted by businesses across Ghana
              </p>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <StatCard end={24}  suffix="+"  label="Active clients"         />
                <StatCard end={6}   suffix="+"  label="Years operating"        />
                <StatCard end={4.2} suffix="M+" prefix="GHS " label="Tax managed annually" decimals={1} />
                <StatCard end={98}  suffix="%"  label="Client retention"       />
              </div>

              <div className="rule mb-6" />

              {/* Sectors served */}
              <p className="text-ui-sm text-brand-grey mb-3">Sectors served</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "SMEs",
                  "Mining",
                  "Oil & Gas",
                  "Law Firms",
                  "Embassies",
                  "Real Estate",
                  "Corporate",
                ].map((sector) => (
                  <span
                    key={sector}
                    className="text-ui-sm bg-brand-cloud text-brand-charcoal px-3 py-1 rounded-full"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
