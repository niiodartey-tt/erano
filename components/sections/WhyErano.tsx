"use client";

import Image from "next/image";
import { IMAGES } from "@/lib/images";

const statements = [
  {
    title: "Deep local expertise",
    body:  "We understand Ghana's regulatory landscape — GRA, ICAG, SSNIT, PPA — inside out. Every change in tax law, every new compliance requirement, we are ahead of it.",
  },
  {
    title: "International standards",
    body:  "Our work is conducted to ICAG and international professional standards, giving banks, investors, and embassies full confidence in every report we produce.",
  },
  {
    title: "Client-first, always",
    body:  "Every engagement is tailored to your sector, size, and growth stage. You get a dedicated consultant who knows your business — not a rotating team of strangers.",
  },
  {
    title: "Transparent, fair pricing",
    body:  "Free initial consultations, flexible retainers, and a sliding scale for NGOs and early-stage businesses. No surprise fees. No hidden costs. Ever.",
  },
];

export default function WhyErano() {
  return (
    <section style={{ background: "#ffffff", overflow: "hidden" }}>
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight:           "680px",
      }}>

        {/* Left — full-bleed image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src={IMAGES.HOME_WHYUS_IMAGE}
            alt="Professional business meeting"
            fill
            className="object-cover"
            sizes="50vw"
            style={{ objectPosition: "center" }}
          />
        </div>

        {/* Right — ink background with content */}
        <div style={{
          background:    "#080c14",
          padding:       "clamp(3rem, 6vw, 5.5rem) clamp(2rem, 5vw, 4.5rem)",
          display:       "flex",
          flexDirection: "column",
          justifyContent:"center",
        }}>

          <span
            className="reveal"
            style={{
              display:       "inline-block",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginBottom:  "1.5rem",
            }}
          >
            Why Erano
          </span>

          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(1.875rem, 3vw, 2.625rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#ffffff",
              marginBottom:  "3rem",
            }}
          >
            The standard you expect<br />from a trusted partner.
          </h2>

          {/* Statements */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.75rem" }}>
            {statements.map((s, i) => (
              <div
                key={s.title}
                className={`reveal reveal-delay-${i + 2}`}
                style={{
                  paddingLeft: "1.25rem",
                  borderLeft:  "2px solid #c4973a",
                }}
              >
                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "0.9375rem",
                  fontWeight:   600,
                  color:        "#ffffff",
                  marginBottom: "0.375rem",
                }}>
                  {s.title}
                </div>
                <div style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:   "0.875rem",
                  lineHeight: 1.75,
                  color:      "rgba(255,255,255,0.55)",
                }}>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fallback — stack vertically */}
      <style>{`
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-image { min-height: 320px; position: relative; }
        }
      `}</style>
    </section>
  );
}