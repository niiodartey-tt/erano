"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const trustBadges = [
  "ICAG Licensed",
  "GRA Registered",
  "CITG Certified",
  "RGD Incorporated",
];

export default function Hero() {
  const parallaxY = useParallax(0.35);

  return (
    <section style={{
      position:   "relative",
      width:      "100%",
      height:     "100%",
      display:    "flex",
      alignItems: "center",
      background: "#080c14",
      overflow:   "hidden",
    }}>

      {/* Background video with parallax */}
      <div style={{
        position:  "absolute",
        inset:     0,
        zIndex:    0,
        transform: parallaxY,
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width:     "100%",
            height:    "100%",
            objectFit: "cover",
            opacity:   0.3,
          }}
          poster={IMAGES.HOME_HERO_POSTER}
        >
          <source src={IMAGES.HOME_HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div style={{
        position:   "absolute",
        inset:      0,
        zIndex:     1,
        background: "linear-gradient(105deg, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.92) 45%, rgba(8,12,20,0.55) 75%, rgba(8,12,20,0.2) 100%)",
      }} />

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        style={{
          position:      "relative",
          zIndex:        3,
          width:         "100%",
          maxWidth:      "1440px",
          margin:        "0 auto",
          paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
          paddingBlock:  "2rem",
        }}
      >
        <div style={{ maxWidth: "760px" }}>

          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1.75rem" }}>
            <span style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.75rem",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
            }}>
              <span style={{
                display:    "inline-block",
                width:      "32px",
                height:     "1px",
                background: "#c4973a",
                flexShrink: 0,
              }} />
              Tax · Audit · Advisory · Ghana
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(3rem, 6.5vw, 5.25rem)",
              fontWeight:    800,
              lineHeight:    1.0,
              letterSpacing: "-0.03em",
              color:         "#ffffff",
              marginBottom:  "1.75rem",
            }}
          >
            Financial clarity<br />
            for Ghana&apos;s most<br />
            <span style={{ color: "#c4973a" }}>ambitious businesses.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:     "1.125rem",
              lineHeight:   1.8,
              color:        "rgba(255,255,255,0.6)",
              maxWidth:     "540px",
              marginBottom: "2.75rem",
            }}
          >
            Erano Consulting provides professional accountancy, business
            advisory, and tax planning services — built for the complexity
            of Ghana&apos;s regulatory landscape.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display:      "flex",
              flexWrap:     "wrap" as const,
              gap:          "1rem",
              marginBottom: "3rem",
            }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                style={{
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
                }}
              >
                Book a free consultation <ArrowRight size={17} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/services"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "0.5rem",
                  background:     "transparent",
                  color:          "#ffffff",
                  fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:       "0.9375rem",
                  fontWeight:     600,
                  padding:        "1rem 2.25rem",
                  borderRadius:   "4px",
                  border:         "1.5px solid rgba(255,255,255,0.22)",
                  textDecoration: "none",
                }}
              >
                Our services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.625rem" }}
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "0.5rem",
                  fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:      "0.75rem",
                  fontWeight:    500,
                  color:         "rgba(255,255,255,0.5)",
                  border:        "1px solid rgba(255,255,255,0.1)",
                  borderRadius:  "2px",
                  padding:       "0.375rem 0.875rem",
                }}
              >
                <span style={{
                  width:        "4px",
                  height:       "4px",
                  borderRadius: "50%",
                  background:   "#c4973a",
                  flexShrink:   0,
                }} />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}