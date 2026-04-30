"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    number:  "01",
    title:   "Accountancy Services",
    desc:    "Annual accounts, management accounts, bookkeeping, payroll and SSNIT compliance.",
    href:    "/services#accountancy",
  },
  {
    number:  "02",
    title:   "Business Services",
    desc:    "Start-up advisory, strategic growth planning, business finance and company secretarial.",
    href:    "/services#business",
  },
  {
    number:  "03",
    title:   "Tax Planning & Advice",
    desc:    "Corporation tax, personal tax, VAT, PAYE and full GRA audit representation.",
    href:    "/services#tax",
  },
];

export default function ServicesStrip() {
  return (
    <section style={{
      background:   "#ffffff",
      paddingBlock: "clamp(5rem, 9vw, 7.5rem)",
    }}>
      <div style={{
        maxWidth:      "1440px",
        margin:        "0 auto",
        paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
      }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <span style={{
            display:       "inline-block",
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "0.6875rem",
            fontWeight:    600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color:         "#c4973a",
            marginBottom:  "1.25rem",
          }}>
            What we offer
          </span>
          <h2 style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2rem, 3.5vw, 3rem)",
            fontWeight:    700,
            lineHeight:    1.1,
            letterSpacing: "-0.025em",
            color:         "#0d1b2e",
            maxWidth:      "480px",
          }}>
            Three disciplines.<br />One trusted firm.
          </h2>
        </div>

        {/* Services list */}
        <div>
          {services.map((svc, i) => (
            <div
              key={svc.number}
              className={`reveal reveal-delay-${i + 1}`}
            >
              <Link
                href={svc.href}
                style={{
                  display:        "grid",
                  gridTemplateColumns: "80px 1fr auto",
                  alignItems:     "center",
                  gap:            "2rem",
                  paddingBlock:   "2.25rem",
                  borderTop:      "1px solid #e2e5ea",
                  textDecoration: "none",
                  cursor:         "pointer",
                  transition:     "all 0.2s ease",
                  position:       "relative",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.paddingLeft = "1rem";
                  const num = el.querySelector(".svc-num") as HTMLElement;
                  const title = el.querySelector(".svc-title") as HTMLElement;
                  const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                  if (num) num.style.color = "#c4973a";
                  if (title) title.style.color = "#c4973a";
                  if (arrow) arrow.style.opacity = "1";
                  if (arrow) arrow.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.paddingLeft = "0";
                  const num = el.querySelector(".svc-num") as HTMLElement;
                  const title = el.querySelector(".svc-title") as HTMLElement;
                  const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                  if (num) num.style.color = "#e2e5ea";
                  if (title) title.style.color = "#0d1b2e";
                  if (arrow) arrow.style.opacity = "0";
                  if (arrow) arrow.style.transform = "translateX(0)";
                }}
              >
                {/* Number */}
                <span
                  className="svc-num"
                  style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "clamp(2rem, 3.5vw, 3.25rem)",
                    fontWeight:    800,
                    letterSpacing: "-0.04em",
                    color:         "#e2e5ea",
                    lineHeight:    1,
                    transition:    "color 0.2s ease",
                    flexShrink:    0,
                  }}
                >
                  {svc.number}
                </span>

                {/* Content */}
                <div>
                  <div
                    className="svc-title"
                    style={{
                      fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:      "clamp(1.25rem, 2.5vw, 1.625rem)",
                      fontWeight:    700,
                      letterSpacing: "-0.015em",
                      color:         "#0d1b2e",
                      marginBottom:  "0.5rem",
                      transition:    "color 0.2s ease",
                    }}
                  >
                    {svc.title}
                  </div>
                  <div style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:   "0.9375rem",
                    lineHeight: 1.6,
                    color:      "#4a5568",
                    maxWidth:   "560px",
                  }}>
                    {svc.desc}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="svc-arrow"
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    width:          "48px",
                    height:         "48px",
                    borderRadius:   "50%",
                    border:         "1.5px solid #c4973a",
                    color:          "#c4973a",
                    flexShrink:     0,
                    opacity:        0,
                    transition:     "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </Link>

              {/* Last item gets bottom border */}
              {i === services.length - 1 && (
                <div style={{ borderBottom: "1px solid #e2e5ea" }} />
              )}
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="reveal" style={{ marginTop: "3rem" }}>
          <Link
            href="/services"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.5rem",
              fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:       "0.9375rem",
              fontWeight:     600,
              color:          "#c4973a",
              textDecoration: "none",
              transition:     "gap 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "0.875rem"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
          >
            View all services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}