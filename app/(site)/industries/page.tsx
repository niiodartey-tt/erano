"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const industries = [
  {
    name:   "SMEs",
    pain:   ["Complex compliance requirements with limited in-house capacity", "Cash flow management and financial planning gaps", "Payroll and SSNIT administration burden"],
    solution: "End-to-end accountancy, payroll, and compliance support scaled to your size and budget.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    name:   "Law Firms",
    pain:   ["Trust account management and compliance", "Partnership tax structuring", "Client disbursement accounting"],
    solution: "Specialist legal sector accounting with deep understanding of trust account regulations and partnership structures.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    name:   "Embassies & Diplomatic Missions",
    pain:   ["Ghana tax compliance for locally-engaged staff", "Payroll management across multiple currencies", "Diplomatic mission SSNIT obligations"],
    solution: "Specialist advisory for diplomatic missions — navigating Ghana tax law while respecting diplomatic protocols.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
  {
    name:   "Mining Companies",
    pain:   ["35% mining tax regime compliance", "Royalty and resource rent tax management", "Transfer pricing for multinational structures"],
    solution: "Deep expertise in Ghana's mining tax regime — royalties, windfall taxes, and transfer pricing compliance.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    name:   "Oil & Gas",
    pain:   ["Upstream tax compliance and petroleum agreements", "Local content financial reporting", "Joint venture accounting"],
    solution: "Sector-specific tax advisory covering petroleum agreements, local content requirements, and JV structures.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    name:   "Corporate Bodies",
    pain:   ["Board-level financial reporting and governance", "Statutory audit and regulatory compliance", "Group consolidation and intercompany transactions"],
    solution: "Full corporate accountancy and audit services — from statutory accounts to board reporting and governance advisory.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    name:   "AGI & GIPC Members",
    pain:   ["Manufacturing and export incentive compliance", "Investment treaty tax planning", "Free zones enterprise requirements"],
    solution: "Specialist advisory for AGI and GIPC members — maximising investment incentives while maintaining full compliance.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    name:   "NGOs & Non-profits",
    pain:   ["Donor fund accounting and restricted grant management", "Statutory compliance for non-profit entities", "Annual returns and regulatory filings"],
    solution: "Specialist non-profit accounting — donor reporting, restricted fund management, and full statutory compliance.",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background:   "#080c14",
        paddingBlock: "clamp(6rem, 12vw, 10rem) clamp(4rem, 8vw, 7rem)",
        position:     "relative",
        overflow:     "hidden",
      }}>
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(196,151,58,0.06) 0%, transparent 70%)",
        }} />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}
        >
          <motion.span variants={fadeUp} style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase" as const, color: "#c4973a", marginBottom: "1.5rem",
          }}>
            <span style={{ width: "32px", height: "1px", background: "#c4973a", flexShrink: 0 }} />
            Industries served
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.25rem", maxWidth: "640px",
          }}>
            Expertise across<br />
            <span style={{ color: "#c4973a" }}>every sector.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.125rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: "520px",
          }}>
            From SMEs to embassies, mining companies to law firms — we understand
            the specific regulatory challenges of your sector and build our
            advisory around them.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Industries grid ── */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap:                 "1.5rem",
          }}>
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                whileHover={{ y: -4 }}
                style={{
                  background:   "#ffffff",
                  border:       "1px solid #e8eaed",
                  borderRadius: "8px",
                  padding:      "2rem",
                  position:     "relative",
                  overflow:     "hidden",
                  transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,151,58,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow   = "0 8px 32px rgba(13,27,46,0.10)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8eaed";
                  (e.currentTarget as HTMLElement).style.boxShadow   = "none";
                }}
              >
                {/* Gold top bar */}
                <div style={{
                  position:   "absolute",
                  top:        0,
                  left:       0,
                  right:      0,
                  height:     "2px",
                  background: "#c4973a",
                  opacity:    0.6,
                }} />

                {/* Icon */}
                <div style={{ color: "#0d1b2e", marginBottom: "1.25rem" }}>
                  {ind.icon}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "1.125rem",
                  fontWeight:   700,
                  color:        "#0d1b2e",
                  marginBottom: "1rem",
                }}>{ind.name}</div>

                {/* Pain points */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "0.6875rem",
                    fontWeight:    600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color:         "#9ca3af",
                    marginBottom:  "0.625rem",
                  }}>Common challenges</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "0.375rem" }}>
                    {ind.pain.map((p) => (
                      <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#c4973a", flexShrink: 0, marginTop: "7px" }} />
                        <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", lineHeight: 1.6, color: "#4a5568" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div style={{
                  paddingTop:   "1.25rem",
                  borderTop:    "1px solid #e8eaed",
                }}>
                  <div style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "0.6875rem",
                    fontWeight:    600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color:         "#c4973a",
                    marginBottom:  "0.5rem",
                  }}>Our approach</div>
                  <p style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:   "0.875rem",
                    lineHeight: 1.7,
                    color:      "#4a5568",
                    margin:     0,
                  }}>{ind.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#080c14", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            maxWidth:      "1440px",
            margin:        "0 auto",
            paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
            textAlign:     "center",
          }}
        >
          <div style={{
            width:      "48px",
            height:     "1px",
            background: "#c4973a",
            margin:     "0 auto 2.5rem",
          }} />

          <motion.h2 variants={fadeUp} style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2rem, 4vw, 3.25rem)",
            fontWeight:    700,
            letterSpacing: "-0.025em",
            color:         "#ffffff",
            maxWidth:      "560px",
            margin:        "0 auto 1.25rem",
          }}>
            Don&apos;t see your sector?
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:    "1.0625rem",
            lineHeight:  1.75,
            color:       "rgba(255,255,255,0.55)",
            maxWidth:    "440px",
            margin:      "0 auto 2.5rem",
          }}>
            We work with businesses across all sectors. Book a free consultation
            and we&apos;ll assess how we can help your specific situation.
          </motion.p>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.5rem",
              background:     "#c4973a",
              color:          "#ffffff",
              fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:       "0.9375rem",
              fontWeight:     600,
              padding:        "1rem 2.25rem",
              borderRadius:   "4px",
              textDecoration: "none",
            }}>
              Book a free consultation <ArrowRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}