"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote:   "Erano Consulting transformed our approach to tax compliance. Their team identified planning opportunities that significantly reduced our corporate tax burden and gave us full confidence going into our GRA audit.",
    author:  "Kwabena Mensah",
    title:   "Managing Director",
    company: "Mensah & Associates Ltd",
    sector:  "Law Firm",
  },
  {
    quote:   "As a growing SME, we needed an accounting partner who understood our budget and our ambition. Erano delivered both — professional, responsive, and genuinely invested in our growth.",
    author:  "Abena Owusu",
    title:   "Founder & CEO",
    company: "Owusu Trading Co.",
    sector:  "SME",
  },
  {
    quote:   "The Erano team handled our company registration, GRA enrolment, and SSNIT setup seamlessly. What could have taken months was completed in weeks. We launched with full regulatory confidence.",
    author:  "David Asante-Poku",
    title:   "Country Director",
    company: "Confidential — Embassy Client",
    sector:  "Diplomatic Mission",
  },
];

export default function Testimonial() {
  const [active, setActive]       = useState(0);
  const [fading, setFading]       = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % testimonials.length);
        setFading(false);
      }, 350);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 350);
  };

  const t = testimonials[active];

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
        <div style={{ marginBottom: "4rem" }}>
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
            Client testimonials
          </span>
          <h2 style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2rem, 3.5vw, 3rem)",
            fontWeight:    700,
            lineHeight:    1.1,
            letterSpacing: "-0.025em",
            color:         "#0d1b2e",
          }}>
            Trusted by businesses across Ghana.
          </h2>
        </div>

        {/* Quote area */}
        <div style={{
          opacity:    fading ? 0 : 1,
          transform:  fading ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          marginBottom: "3.5rem",
        }}>

          {/* Large decorative quote mark */}
          <div style={{
            fontFamily:   "Georgia, serif",
            fontSize:     "8rem",
            lineHeight:   0.8,
            color:        "#c4973a",
            opacity:      0.25,
            marginBottom: "-1rem",
            userSelect:   "none",
          }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Quote */}
          <blockquote style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(1.25rem, 2.5vw, 1.75rem)",
            fontWeight:    400,
            lineHeight:    1.65,
            color:         "#0d1b2e",
            fontStyle:     "italic",
            maxWidth:      "880px",
            marginBottom:  "2.5rem",
          }}>
            {t.quote}
          </blockquote>

          {/* Attribution */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{
              width:          "48px",
              height:         "48px",
              borderRadius:   "50%",
              background:     "#0d1b2e",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}>
              <span style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:   "0.875rem",
                fontWeight: 700,
                color:      "#ffffff",
              }}>
                {t.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div>
              <div style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:   "0.9375rem",
                fontWeight: 600,
                color:      "#0d1b2e",
              }}>
                {t.author}
              </div>
              <div style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:   "0.875rem",
                color:      "#4a5568",
              }}>
                {t.title}, {t.company}
              </div>
            </div>
            <span style={{
              marginLeft:    "auto",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              border:        "1px solid rgba(196,151,58,0.3)",
              borderRadius:  "2px",
              padding:       "0.375rem 0.875rem",
            }}>
              {t.sector}
            </span>
          </div>
        </div>

        {/* Dot navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
              style={{
                width:        i === active ? "28px" : "8px",
                height:       "8px",
                borderRadius: "4px",
                background:   i === active ? "#c4973a" : "#e2e5ea",
                border:       "none",
                cursor:       "pointer",
                transition:   "all 0.3s ease",
                padding:      0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}