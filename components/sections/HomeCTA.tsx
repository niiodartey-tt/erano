"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCTA() {
  return (
    <section style={{
      background:   "#080c14",
      paddingBlock: "clamp(5rem, 9vw, 7.5rem)",
      position:     "relative",
      overflow:     "hidden",
    }}>

      {/* Decorative gold line top */}
      <div style={{
        position:   "absolute",
        top:        0,
        left:       "clamp(1.5rem, 5.5vw, 5rem)",
        right:      "clamp(1.5rem, 5.5vw, 5rem)",
        height:     "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,151,58,0.5), transparent)",
      }} />

      {/* Subtle radial glow */}
      <div style={{
        position:        "absolute",
        top:             "50%",
        left:            "50%",
        transform:       "translate(-50%, -50%)",
        width:           "600px",
        height:          "600px",
        borderRadius:    "50%",
        background:      "radial-gradient(circle, rgba(196,151,58,0.04) 0%, transparent 70%)",
        pointerEvents:   "none",
      }} />

      <div style={{
        maxWidth:      "1440px",
        margin:        "0 auto",
        paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
        textAlign:     "center",
        position:      "relative",
        zIndex:        1,
      }}>

        {/* Decorative gold rule */}
        <div
          className="reveal"
          style={{
            width:        "48px",
            height:       "1px",
            background:   "#c4973a",
            margin:       "0 auto 2.5rem",
          }}
        />

        {/* Heading */}
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2.25rem, 4.5vw, 3.75rem)",
            fontWeight:    700,
            lineHeight:    1.1,
            letterSpacing: "-0.03em",
            color:         "#ffffff",
            maxWidth:      "720px",
            margin:        "0 auto 1.5rem",
          }}
        >
          Ready to start the conversation?
        </h2>

        {/* Subline */}
        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:    "1.0625rem",
            lineHeight:  1.75,
            color:       "rgba(255,255,255,0.5)",
            maxWidth:    "480px",
            margin:      "0 auto 3rem",
          }}
        >
          Book a free 30-minute consultation. No commitment required —
          just an honest conversation about your business needs.
        </p>

        {/* CTA */}
        <div className="reveal reveal-delay-3">
          <Link
            href="/contact"
            style={{
              display:        "inline-flex",
              alignItems:     "center",
              gap:            "0.625rem",
              background:     "#c4973a",
              color:          "#ffffff",
              fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:       "0.9375rem",
              fontWeight:     600,
              padding:        "1.125rem 2.5rem",
              borderRadius:   "4px",
              textDecoration: "none",
              transition:     "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background  = "#a07828";
              (e.currentTarget as HTMLElement).style.transform   = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background  = "#c4973a";
              (e.currentTarget as HTMLElement).style.transform   = "translateY(0)";
            }}
          >
            Book a free consultation <ArrowRight size={17} />
          </Link>
        </div>

        {/* Trust note */}
        <p
          className="reveal reveal-delay-4"
          style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "0.8125rem",
            color:         "rgba(255,255,255,0.25)",
            marginTop:     "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          We respond within one business day &middot; Free initial consultation &middot; No obligation
        </p>
      </div>

      {/* Decorative gold line bottom */}
      <div style={{
        position:   "absolute",
        bottom:     0,
        left:       "clamp(1.5rem, 5.5vw, 5rem)",
        right:      "clamp(1.5rem, 5.5vw, 5rem)",
        height:     "1px",
        background: "linear-gradient(90deg, transparent, rgba(196,151,58,0.5), transparent)",
      }} />
    </section>
  );
}