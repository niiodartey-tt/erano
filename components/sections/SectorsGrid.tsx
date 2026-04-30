"use client";

import Link from "next/link";

const sectors = [
  {
    name: "SMEs",
    desc: "Bookkeeping, payroll, tax compliance and growth advisory for small and medium enterprises.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    name: "Law Firms",
    desc: "Trust account management, partnership tax, and regulatory compliance for legal practices.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    name: "Embassies",
    desc: "Diplomatic mission accounting, payroll management, and Ghana tax compliance for international missions.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    name: "Mining Companies",
    desc: "Mining tax regime compliance, royalty management, and sector-specific audit support.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    name: "Oil & Gas",
    desc: "Transfer pricing, upstream tax compliance, and financial reporting for energy sector clients.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Corporate Bodies",
    desc: "Board-level financial reporting, statutory audit, and corporate governance advisory.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    name: "AGI Members",
    desc: "Specialist advisory for Association of Ghana Industries members — manufacturing, export, and compliance.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    name: "NGOs & Non-profits",
    desc: "Donor fund accounting, statutory compliance, and grant management for non-profit organisations.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
];

export default function SectorsGrid() {
  return (
    <section style={{
      background:   "#f5f6f8",
      paddingBlock: "clamp(5rem, 9vw, 7.5rem)",
    }}>
      <div style={{
        maxWidth:      "1440px",
        margin:        "0 auto",
        paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
      }}>

        {/* Header */}
        <div className="reveal" style={{
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          gap:            "2rem",
          marginBottom:   "3.5rem",
          flexWrap:       "wrap" as const,
        }}>
          <div>
            <span style={{
              display:       "inline-block",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginBottom:  "1rem",
            }}>
              Industries served
            </span>
            <h2 style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#0d1b2e",
            }}>
              Expertise across<br />every sector.
            </h2>
          </div>
          <Link
            href="/industries"
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
              whiteSpace:     "nowrap" as const,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "0.875rem"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
          >
            View all industries
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap:                 "1px",
          background:          "#e2e5ea",
          border:              "1px solid #e2e5ea",
        }}>
          {sectors.map((sector, i) => (
            <Link
              key={sector.name}
              href="/industries"
              className={`reveal reveal-delay-${(i % 4) + 1}`}
              style={{
                display:        "block",
                background:     "#f5f6f8",
                padding:        "2rem",
                textDecoration: "none",
                transition:     "background 0.2s ease",
                position:       "relative",
                overflow:       "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#ffffff";
                const icon = el.querySelector(".sector-icon") as HTMLElement;
                const name = el.querySelector(".sector-name") as HTMLElement;
                const bar  = el.querySelector(".sector-bar")  as HTMLElement;
                if (icon) icon.style.color = "#c4973a";
                if (name) name.style.color = "#c4973a";
                if (bar)  bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "#f5f6f8";
                const icon = el.querySelector(".sector-icon") as HTMLElement;
                const name = el.querySelector(".sector-name") as HTMLElement;
                const bar  = el.querySelector(".sector-bar")  as HTMLElement;
                if (icon) icon.style.color = "#0d1b2e";
                if (name) name.style.color = "#0d1b2e";
                if (bar)  bar.style.transform = "scaleX(0)";
              }}
            >
              {/* Gold top bar */}
              <div
                className="sector-bar"
                style={{
                  position:        "absolute",
                  top:             0,
                  left:            0,
                  right:           0,
                  height:          "2px",
                  background:      "#c4973a",
                  transform:       "scaleX(0)",
                  transformOrigin: "left",
                  transition:      "transform 0.3s ease",
                }}
              />

              {/* Icon */}
              <div
                className="sector-icon"
                style={{
                  color:        "#0d1b2e",
                  marginBottom: "1.25rem",
                  transition:   "color 0.2s ease",
                }}
              >
                {sector.icon}
              </div>

              {/* Name */}
              <div
                className="sector-name"
                style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "1rem",
                  fontWeight:   700,
                  color:        "#0d1b2e",
                  marginBottom: "0.625rem",
                  transition:   "color 0.2s ease",
                }}
              >
                {sector.name}
              </div>

              {/* Desc */}
              <div style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:   "0.875rem",
                lineHeight: 1.65,
                color:      "#4a5568",
              }}>
                {sector.desc}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}