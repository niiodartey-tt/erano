"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const services = [
  {
    number:   "01",
    title:    "Accountancy Services",
    desc:     "Annual accounts, management accounts, bookkeeping, payroll and SSNIT compliance — handled with precision.",
    features: ["Annual accounts", "Bookkeeping", "Payroll & SSNIT"],
    href:     "/services#accountancy",
    image:    IMAGES.SERVICES_ACCOUNTANCY,
    imageAlt: "Accountancy services",
  },
  {
    number:   "02",
    title:    "Business Services",
    desc:     "Start-up advisory, RGD registration, strategic growth planning and company secretarial services.",
    features: ["RGD Registration", "Growth planning", "Company secretarial"],
    href:     "/services#business",
    image:    IMAGES.SERVICES_BUSINESS,
    imageAlt: "Business advisory services",
  },
  {
    number:   "03",
    title:    "Tax Planning & Advice",
    desc:     "Corporation tax, personal tax, VAT, PAYE and full GRA audit representation for your business.",
    features: ["VAT & PAYE", "GRA audit support", "Tax planning"],
    href:     "/services#tax",
    image:    IMAGES.SERVICES_TAX,
    imageAlt: "Tax planning services",
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y:       0,
    transition: {
      duration: 0.7,
      delay:    i * 0.15,
      ease:     [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

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
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            display:        "flex",
            alignItems:     "flex-end",
            justifyContent: "space-between",
            gap:            "2rem",
            marginBottom:   "3.5rem",
            flexWrap:       "wrap" as const,
          }}
        >
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
            }}>What we offer</span>
            <h2 style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#0d1b2e",
              margin:        0,
            }}>
              Three disciplines.<br />One trusted firm.
            </h2>
          </div>
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
              whiteSpace:     "nowrap" as const,
              transition:     "gap 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = "0.875rem"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = "0.5rem"; }}
          >
            View all services <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Three column grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "1.5rem",
        }}>
          {services.map((svc, i) => (
            <motion.div
              key={svc.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <Link
                href={svc.href}
                style={{
                  display:        "flex",
                  flexDirection:  "column" as const,
                  minHeight:      "580px",
                  height:         "auto",
                  borderRadius:   "8px",
                  overflow:       "hidden",
                  textDecoration: "none",
                  position:       "relative",
                  background:     "#080c14",
                  cursor:         "pointer",
                }}
                onMouseEnter={e => {
                  const img  = e.currentTarget.querySelector(".svc-img")  as HTMLElement;
                  const over = e.currentTarget.querySelector(".svc-over") as HTMLElement;
                  const cont = e.currentTarget.querySelector(".svc-cont") as HTMLElement;
                  const arr  = e.currentTarget.querySelector(".svc-arr")  as HTMLElement;
                  if (img)  img.style.transform  = "scale(1.06)";
                  if (over) over.style.opacity   = "1";
                  if (cont) cont.style.transform = "translateY(-8px)";
                  if (arr)  arr.style.opacity    = "1";
                  if (arr)  arr.style.transform  = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  const img  = e.currentTarget.querySelector(".svc-img")  as HTMLElement;
                  const over = e.currentTarget.querySelector(".svc-over") as HTMLElement;
                  const cont = e.currentTarget.querySelector(".svc-cont") as HTMLElement;
                  const arr  = e.currentTarget.querySelector(".svc-arr")  as HTMLElement;
                  if (img)  img.style.transform  = "scale(1)";
                  if (over) over.style.opacity   = "0";
                  if (cont) cont.style.transform = "translateY(0)";
                  if (arr)  arr.style.opacity    = "0";
                  if (arr)  arr.style.transform  = "translateX(0)";
                }}
              >
                {/* Image — top 60% */}
                <div style={{
                  position: "relative",
                  height:   "280px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  <Image
                    src={svc.image}
                    alt={svc.imageAlt}
                    fill
                    className="svc-img"
                    style={{
                      objectFit:  "cover",
                      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Default dark overlay */}
                  <div style={{
                    position:   "absolute",
                    inset:      0,
                    background: "linear-gradient(to bottom, rgba(8,12,20,0.2) 0%, rgba(8,12,20,0.5) 100%)",
                  }} />
                  {/* Gold hover overlay */}
                  <div
                    className="svc-over"
                    style={{
                      position:   "absolute",
                      inset:      0,
                      background: "rgba(196,151,58,0.15)",
                      opacity:    0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  {/* Number */}
                  <div style={{
                    position:      "absolute",
                    top:           "1.25rem",
                    left:          "1.25rem",
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "3.5rem",
                    fontWeight:    800,
                    letterSpacing: "-0.04em",
                    color:         "rgba(255,255,255,0.5)",
                    lineHeight:    1,
                  }}>{svc.number}</div>
                </div>

                {/* Content — bottom 40% */}
                <div
                  className="svc-cont"
                  style={{
                    flex:          1,
                    padding:       "1.75rem",
                    display:       "flex",
                    flexDirection: "column" as const,
                    background:    "#080c14",
                    transition:    "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  {/* Gold top rule */}
                  <div style={{
                    width:        "32px",
                    height:       "2px",
                    background:   "#c4973a",
                    marginBottom: "1rem",
                    flexShrink:   0,
                  }} />

                  <div style={{
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "1.125rem",
                    fontWeight:   700,
                    color:        "#ffffff",
                    marginBottom: "0.625rem",
                    letterSpacing:"-0.01em",
                  }}>{svc.title}</div>

                  <p style={{
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "0.875rem",
                    lineHeight:   1.7,
                    color:        "rgba(255,255,255,0.55)",
                    marginBottom: "1.25rem",
                    flex:         1,
                  }}>{svc.desc}</p>

                  {/* Feature tags */}
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.375rem", marginBottom: "1.25rem" }}>
                    {svc.features.map(f => (
                      <span key={f} style={{
                        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontSize:      "0.6875rem",
                        fontWeight:    600,
                        letterSpacing: "0.06em",
                        color:         "rgba(255,255,255,0.45)",
                        border:        "1px solid rgba(255,255,255,0.1)",
                        borderRadius:  "2px",
                        padding:       "0.25rem 0.5rem",
                      }}>{f}</span>
                    ))}
                  </div>

                  {/* Arrow link */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <span style={{
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:   "0.875rem",
                      fontWeight: 600,
                      color:      "#c4973a",
                    }}>Learn more</span>
                    <ArrowRight
                      size={15}
                      className="svc-arr"
                      style={{
                        color:      "#c4973a",
                        opacity:    0,
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}