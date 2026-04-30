"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const articles = [
  {
    slug:      "understanding-ghana-vat-2025",
    category:  "Tax",
    title:     "Understanding Ghana's VAT System in 2025",
    excerpt:   "A comprehensive guide to VAT registration, filing obligations, and the flat rate scheme for SMEs operating in Ghana under the current GRA framework.",
    author:    "Nana Afua Sarpong",
    date:      "April 2025",
    readTime:  "8 min read",
    image:     IMAGES.RESOURCES_ARTICLE_1,
    featured:  true,
  },
  {
    slug:      "gra-audit-preparation-guide",
    category:  "Audit",
    title:     "How to Prepare Your Business for a GRA Audit",
    excerpt:   "GRA audits are increasingly common as the authority expands its compliance capacity. This guide walks you through exactly what to expect and how to prepare.",
    author:    "Kwame Asante",
    date:      "March 2025",
    readTime:  "6 min read",
    image:     IMAGES.RESOURCES_ARTICLE_2,
    featured:  false,
  },
  {
    slug:      "registering-business-ghana-2025",
    category:  "Business",
    title:     "The Complete Guide to Registering a Business in Ghana",
    excerpt:   "From RGD registration to GRA enrolment, SSNIT registration, and PPA supplier listing — everything you need to launch a fully compliant business in Ghana.",
    author:    "Abena Boateng",
    date:      "February 2025",
    readTime:  "10 min read",
    image:     IMAGES.RESOURCES_ARTICLE_3,
    featured:  false,
  },
];

const categories = ["All", "Tax", "Audit", "Business"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured  = articles.find(a => a.featured);
  const secondary = filtered.filter(a => !a.featured);

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
          background: "radial-gradient(ellipse at 40% 60%, rgba(196,151,58,0.06) 0%, transparent 70%)",
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
            Insights & resources
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.25rem", maxWidth: "640px",
          }}>
            Ghana tax &amp; business<br />
            <span style={{ color: "#c4973a" }}>insights.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.125rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: "480px",
          }}>
            Practical guides, regulatory updates, and advisory insights
            from the Erano Consulting team.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Articles ── */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>

          {/* Category filter */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3.5rem", flexWrap: "wrap" as const }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "0.875rem",
                  fontWeight:   600,
                  padding:      "0.5rem 1.25rem",
                  borderRadius: "4px",
                  border:       "none",
                  cursor:       "pointer",
                  transition:   "all 0.2s ease",
                  background:   activeCategory === cat ? "#c4973a" : "#f5f6f8",
                  color:        activeCategory === cat ? "#ffffff" : "#6b7280",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          {featured && activeCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ marginBottom: "3rem" }}
            >
              <Link
                href={`/resources/${featured.slug}`}
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  border:              "1px solid #e8eaed",
                  borderRadius:        "8px",
                  overflow:            "hidden",
                  textDecoration:      "none",
                  transition:          "border-color 0.2s ease, box-shadow 0.2s ease",
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
                {/* Image */}
                <div style={{ position: "relative", minHeight: "360px", overflow: "hidden" }}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: "3rem", display: "flex", flexDirection: "column" as const, justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <span style={{
                      fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:      "0.6875rem",
                      fontWeight:    700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color:         "#c4973a",
                      border:        "1px solid rgba(196,151,58,0.3)",
                      borderRadius:  "2px",
                      padding:       "0.25rem 0.625rem",
                    }}>{featured.category}</span>
                    <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", color: "#9ca3af" }}>{featured.readTime}</span>
                  </div>

                  <h2 style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight:    700,
                    letterSpacing: "-0.02em",
                    color:         "#0d1b2e",
                    lineHeight:    1.2,
                    marginBottom:  "1rem",
                  }}>{featured.title}</h2>

                  <p style={{
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "0.9375rem",
                    lineHeight:   1.75,
                    color:        "#4a5568",
                    marginBottom: "2rem",
                  }}>{featured.excerpt}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", color: "#6b7280" }}>
                      {featured.author} · {featured.date}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "#c4973a" }}>
                      Read article <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Article grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {secondary.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <Link
                  href={`/resources/${article.slug}`}
                  style={{
                    display:        "block",
                    border:         "1px solid #e8eaed",
                    borderRadius:   "8px",
                    overflow:       "hidden",
                    textDecoration: "none",
                    transition:     "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(196,151,58,0.4)";
                    el.style.boxShadow   = "0 8px 32px rgba(13,27,46,0.10)";
                    el.style.transform   = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#e8eaed";
                    el.style.boxShadow   = "none";
                    el.style.transform   = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "1.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                      <span style={{
                        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontSize:      "0.6875rem",
                        fontWeight:    700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase" as const,
                        color:         "#c4973a",
                        border:        "1px solid rgba(196,151,58,0.3)",
                        borderRadius:  "2px",
                        padding:       "0.25rem 0.625rem",
                      }}>{article.category}</span>
                      <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.75rem", color: "#9ca3af" }}>{article.readTime}</span>
                    </div>

                    <h3 style={{
                      fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:      "1.125rem",
                      fontWeight:    700,
                      letterSpacing: "-0.015em",
                      color:         "#0d1b2e",
                      lineHeight:    1.3,
                      marginBottom:  "0.75rem",
                    }}>{article.title}</h3>

                    <p style={{
                      fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:     "0.875rem",
                      lineHeight:   1.7,
                      color:        "#4a5568",
                      marginBottom: "1.25rem",
                    }}>{article.excerpt}</p>

                    <div style={{
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "space-between",
                      paddingTop:     "1rem",
                      borderTop:      "1px solid #e8eaed",
                    }}>
                      <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.75rem", color: "#9ca3af" }}>
                        {article.author} · {article.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", fontWeight: 600, color: "#c4973a" }}>
                        Read <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}