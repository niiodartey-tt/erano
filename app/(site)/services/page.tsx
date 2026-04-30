"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    id:       "accountancy",
    number:   "01",
    title:    "Accountancy Services",
    tagline:  "Accurate, timely financial records that drive better business decisions.",
    body:     "Our accountancy team handles your books with the precision of an in-house finance function at a fraction of the cost. From day-to-day bookkeeping to annual statutory accounts, we keep your financial records clean, compliant, and decision-ready.",
    features: ["Annual accounts preparation", "Management accounts (monthly / quarterly)", "Bookkeeping and ledger management", "Payroll processing and administration", "Bank reconciliations", "Accounts payable and receivable", "SSNIT filing and compliance"],
    image:    IMAGES.SERVICES_ACCOUNTANCY,
  },
  {
    id:       "business",
    number:   "02",
    title:    "Business Services",
    tagline:  "From start-up to scale-up — strategic support at every stage.",
    body:     "Whether you are starting a new business, acquiring an existing one, or planning for growth, our business services team provides end-to-end support. We navigate Ghana's regulatory landscape so you can focus on building your enterprise.",
    features: ["Business start-up advisory and registration (RGD)", "Buying an existing business — due diligence", "Strategic growth planning and advisory", "Business finance and funding advisory", "Payroll services and HR compliance", "Company secretarial services", "PPA supplier registration"],
    image:    IMAGES.SERVICES_BUSINESS,
  },
  {
    id:       "tax",
    number:   "03",
    title:    "Tax Planning & Advice",
    tagline:  "Strategic tax planning that minimises liability and ensures full compliance.",
    body:     "Ghana's tax landscape is complex and changes frequently. Our tax team ensures your business remains fully compliant with the Ghana Revenue Authority while implementing legitimate planning strategies to reduce your tax burden.",
    features: ["VAT registration and periodic filing", "PAYE computation and compliance", "Corporate income tax returns", "GRA audit representation and support", "Tax planning and restructuring strategy", "Withholding tax management", "Transfer pricing advisory"],
    image:    IMAGES.SERVICES_TAX,
  },
];

const plans = [
  {
    name:     "Free Introductory",
    price:    "GHS 0",
    period:   "",
    featured: false,
    features: ["Basic compliance check", "Initial financial strategy consultation", "Introduction to corporate governance", "Business health snapshot", "Downloadable guide on starting a business"],
    cta:      "Get started free",
  },
  {
    name:     "Starter Essentials",
    price:    "GHS 16,500",
    period:   "/ year",
    featured: true,
    features: ["Customised financial strategy (once per year)", "Basic compliance monitoring (bi-annually)", "Annual statutory filings", "Annual returns filing", "Basic compliance updates (quarterly)", "Single business valuation report"],
    cta:      "Get started",
  },
  {
    name:     "Growth Booster",
    price:    "GHS 24,500",
    period:   "/ year",
    featured: false,
    features: ["All from Starter Essentials", "Industry-specific consultancy (twice per year)", "Monthly compliance monitoring", "Quarterly board meeting preparation", "Value enhancement strategy session", "Quarterly risk management workshops"],
    cta:      "Get started",
  },
  {
    name:     "Business Pro",
    price:    "GHS 32,500",
    period:   "/ year",
    featured: false,
    features: ["All from Growth Booster", "Proactive compliance monitoring (monthly)", "Corporate support and secretarial services", "Audit representation (once per year)", "Basic compliance training for staff", "Ongoing transactional support (up to 3/year)"],
    cta:      "Get started",
  },
  {
    name:     "Elite Advantage",
    price:    "GHS 37,500",
    period:   "/ year",
    featured: false,
    features: ["All from Business Pro", "Continuous corporate support (monthly)", "Custom compliance training (quarterly)", "Enhanced audit representation (up to twice/year)", "Annual re-valuation for growth tracking", "Customised internal control framework"],
    cta:      "Get started",
  },
  {
    name:     "Custom Offer",
    price:    "Get a quote",
    period:   "",
    featured: false,
    features: ["Fully bespoke engagement scope", "Dedicated relationship manager", "Custom SLA and reporting cadence", "Exclusive features for your organisation"],
    cta:      "Request a quote",
  },
];

const accountantQuotes = [
  { quote: "Beware of little expenses. A small leak will sink a great ship.", author: "Benjamin Franklin" },
  { quote: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { quote: "Accounting is the language of business.", author: "Warren Buffett" },
  { quote: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { quote: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott" },
];

function QuotesPanel() {
  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % accountantQuotes.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const q = accountantQuotes[active];

  return (
    <div style={{
      marginTop:      "1px",
      background:     "rgba(196,151,58,0.06)",
      border:         "1px solid rgba(255,255,255,0.06)",
      borderTop:      "2px solid rgba(196,151,58,0.3)",
      padding:        "3rem",
      display:        "flex",
      flexDirection:  "column" as const,
      alignItems:     "center",
      justifyContent: "center",
      textAlign:      "center" as const,
      minHeight:      "200px",
    }}>
      <div style={{
        fontFamily:   "Georgia, serif",
        fontSize:     "5rem",
        lineHeight:   0.8,
        color:        "#c4973a",
        opacity:      0.3,
        marginBottom: "-1rem",
        userSelect:   "none",
      }} aria-hidden="true">&ldquo;</div>

      <div style={{
        opacity:    fading ? 0 : 1,
        transform:  fading ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <p style={{
          fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize:     "1.125rem",
          fontStyle:    "italic",
          lineHeight:   1.7,
          color:        "rgba(255,255,255,0.75)",
          maxWidth:     "680px",
          margin:       "0 auto 1.25rem",
        }}>{q.quote}</p>
        <p style={{
          fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize:      "0.8125rem",
          fontWeight:    600,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color:         "#c4973a",
        }}>— {q.author}</p>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.75rem" }}>
        {accountantQuotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width:        i === active ? "20px" : "6px",
              height:       "6px",
              borderRadius: "3px",
              background:   i === active ? "#c4973a" : "rgba(255,255,255,0.2)",
              border:       "none",
              cursor:       "pointer",
              transition:   "all 0.3s ease",
              padding:      0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position:     "relative",
        paddingBlock: "clamp(6rem, 12vw, 10rem) clamp(4rem, 8vw, 7rem)",
        background:   "#080c14",
        overflow:     "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.SERVICES_HERO_BG}
            alt="Financial professional"
            fill
            style={{ objectFit: "cover", opacity: 0.2 }}
            priority
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.8) 60%, rgba(8,12,20,0.5) 100%)" }} />
        </div>

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
            What we offer
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.5rem", maxWidth: "640px",
          }}>
            Three disciplines.<br />
            <span style={{ color: "#c4973a" }}>One trusted firm.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.125rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: "520px", marginBottom: "2.5rem",
          }}>
            We combine deep local regulatory knowledge with international professional
            standards across accountancy, business advisory, and tax planning.
          </motion.p>

          {/* Anchor nav */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.625rem" }}>
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "0.8125rem", fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "2px", padding: "0.5rem 1rem",
                  textDecoration: "none", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#c4973a";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,151,58,0.4)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                {s.title}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Service sections ── */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          style={{
            background:   i % 2 === 0 ? "#ffffff" : "#f5f6f8",
            paddingBlock: "clamp(5rem, 9vw, 7.5rem)",
            scrollMarginTop: "72px",
          }}
        >
          <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>
            <div style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 "5rem",
              alignItems:          "center",
            }}>

              {/* Content */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{ order: i % 2 === 0 ? 1 : 2 }}
              >
                <motion.span variants={fadeUp} style={{
                  display: "inline-block",
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.2em",
                  textTransform: "uppercase" as const, color: "#c4973a", marginBottom: "1rem",
                }}>{svc.number} — Service</motion.span>

                <motion.h2 variants={fadeUp} style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700,
                  lineHeight: 1.1, letterSpacing: "-0.025em",
                  color: "#0d1b2e", marginBottom: "0.875rem",
                }}>{svc.title}</motion.h2>

                <motion.p variants={fadeUp} style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "1rem", fontStyle: "italic", lineHeight: 1.7,
                  color: "#6b7280", marginBottom: "1.25rem",
                }}>{svc.tagline}</motion.p>

                <motion.p variants={fadeUp} style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: "0.9375rem", lineHeight: 1.8,
                  color: "#4a5568", marginBottom: "2rem",
                }}>{svc.body}</motion.p>

                <motion.ul variants={fadeUp} style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column" as const, gap: "0.625rem" }}>
                  {svc.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
                      <CheckCircle2 size={16} style={{ color: "#c4973a", flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.9375rem", color: "#4a5568" }}>{f}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/contact" style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "#c4973a", color: "#ffffff",
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: "0.9375rem", fontWeight: 600,
                    padding: "0.875rem 2rem", borderRadius: "4px", textDecoration: "none",
                  }}>
                    Get started <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="svc-section-img-wrap"
                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ order: i % 2 === 0 ? 2 : 1, position: "relative", height: "520px", borderRadius: "8px", overflow: "hidden", cursor: "pointer" }}
              >
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="50vw"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Pricing ── */}
      <section style={{ background: "#080c14", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginBottom: "4rem" }}
          >
            <motion.span variants={fadeUp} style={{
              display: "inline-block",
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase" as const, color: "#c4973a", marginBottom: "1rem",
            }}>Pricing</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700,
              lineHeight: 1.1, letterSpacing: "-0.025em", color: "#ffffff",
            }}>
              Transparent pricing.<br />No surprises.
            </motion.h2>
          </motion.div>

<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Left — 6 pricing cards in 2 rows of 3 */}
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{
                  background:  plan.featured ? "rgba(196,151,58,0.08)" : "#080c14",
                  padding:     "2rem",
                  position:    "relative",
                  borderTop:   plan.featured ? "2px solid #c4973a" : "2px solid transparent",
                  display:     "flex",
                  flexDirection: "column" as const,
                }}
              >
                {plan.featured && (
                  <div style={{
                    position:      "absolute",
                    top:           "1.25rem",
                    right:         "1.25rem",
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "0.625rem",
                    fontWeight:    700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color:         "#080c14",
                    background:    "#c4973a",
                    padding:       "0.25rem 0.625rem",
                    borderRadius:  "2px",
                  }}>Most popular</div>
                )}

                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "0.875rem", fontWeight: 600,
                  color:        "rgba(255,255,255,0.6)", marginBottom: "0.75rem",
                }}>{plan.name}</div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <span style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      plan.price === "Get a quote" ? "1.5rem" : "2rem",
                    fontWeight:    800,
                    letterSpacing: "-0.03em",
                    color:         plan.featured ? "#c4973a" : "#ffffff",
                  }}>{plan.price}</span>
                  {plan.period && (
                    <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.25rem" }}>{plan.period}</span>
                  )}
                </div>

                {/* Features — flex:1 pushes button to bottom */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column" as const, gap: "0.5rem", flex: 1 }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <CheckCircle2 size={14} style={{ color: "#c4973a", flexShrink: 0, marginTop: "3px" }} />
                      <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Button always at bottom */}
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} style={{ marginTop: "auto" }}>
                  <Link href="/contact" style={{
                    display: "block", textAlign: "center" as const,
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: "0.875rem", fontWeight: 600,
                    padding: "0.75rem",
                    borderRadius: "4px",
                    textDecoration: "none",
                    background: plan.featured ? "#c4973a" : "transparent",
                    color: plan.featured ? "#ffffff" : "rgba(255,255,255,0.6)",
                    border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.15)",
                  }}>{plan.cta}</Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Quotes panel below pricing */}
          <QuotesPanel />        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: "#f5f6f8", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)", textAlign: "center" }}
        >
          <motion.h2 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: "-0.025em",
            color: "#0d1b2e", maxWidth: "560px", margin: "0 auto 1.25rem",
          }}>
            Not sure which plan fits?<br />Let&apos;s talk it through.
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.0625rem", lineHeight: 1.75, color: "#4a5568",
            maxWidth: "400px", margin: "0 auto 2.5rem",
          }}>
            Book a free 30-minute consultation and we&apos;ll recommend the right plan for your business.
          </motion.p>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#c4973a", color: "#ffffff",
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: "0.9375rem", fontWeight: 600,
              padding: "1rem 2.25rem", borderRadius: "4px", textDecoration: "none",
            }}>
              Book a free consultation <ArrowRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}