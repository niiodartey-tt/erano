"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const team = [
  {
    name:     "Nana Afua Sarpong",
    role:     "Founder & Lead Consultant",
    bio:      "Nana Afua founded Erano Consulting with a vision to provide world-class financial advisory services tailored to Ghana's business landscape. With extensive experience across tax, audit, and business advisory, she leads the firm's strategic direction.",
    certs:    ["ICAG Licensed", "CITG Certified", "CPA"],
    image:    IMAGES.TEAM_NANA,
    initials: "NA",
  },
  {
    name:     "Kwame Asante",
    role:     "Senior Tax Consultant",
    bio:      "Kwame specialises in corporate tax structuring, VAT compliance, and GRA audit representation. He brings over eight years of experience advising SMEs and corporate clients across Ghana's mining and manufacturing sectors.",
    certs:    ["CTP", "ICAG"],
    image:    IMAGES.TEAM_KWAME,
    initials: "KA",
  },
  {
    name:     "Abena Boateng",
    role:     "Audit & Assurance Officer",
    bio:      "Abena leads our audit engagements, conducting financial statement audits and internal reviews to ICAG and international standards. Her background includes Big 4 experience and a specialisation in financial services.",
    certs:    ["CA", "ICAG"],
    image:    IMAGES.TEAM_ABENA,
    initials: "AB",
  },
];

const values = [
  { number: "01", title: "Integrity",           body: "We do not compromise on accuracy, honesty, or ethics — ever. Our clients trust us with their most sensitive financial information." },
  { number: "02", title: "Excellence",          body: "Every deliverable meets the highest professional standard. Good enough is never good enough at Erano." },
  { number: "03", title: "Client focus",        body: "We measure our success by our clients' outcomes. Every engagement is tailored, every recommendation is actionable." },
  { number: "04", title: "Continuous learning", body: "Ghana's regulatory landscape changes constantly. We invest in keeping our team at the cutting edge." },
];

const credentials = [
  { code: "ICAG", title: "Licensed Accounting Firm",    body: "Licensed under ICAG Act 2020 (Act 1058). All accountancy practice conducted to ICAG professional standards." },
  { code: "CITG", title: "Certified Tax Practitioners", body: "Our tax consultants hold Certified Tax Practitioner (CTP) certification from the Chartered Institute of Taxation, Ghana." },
  { code: "RGD",  title: "Registered Company",         body: "Incorporated with the Registrar General's Department as a limited liability company in good standing." },
  { code: "GRA",  title: "GRA Registered",             body: "Registered with the Ghana Revenue Authority with a valid TIN and VAT certificate. All tax obligations fully met." },
  { code: "SSNIT",title: "SSNIT Compliant",            body: "Registered with the Social Security and National Insurance Trust. All employee contributions filed and paid on time." },
  { code: "PPA",  title: "PPA Registered Supplier",    body: "Registered with the Public Procurement Authority, enabling participation in government tender processes." },
];

export default function AboutPage() {
  const parallaxY = useParallax(0.3);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        position:   "relative",
        height:     "85vh",
        minHeight:  "560px",
        display:    "flex",
        alignItems: "center",
        background: "#080c14",
        overflow:   "hidden",
      }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, transform: parallaxY }}>
          <Image
            src={IMAGES.ABOUT_HERO}
            alt="Professional businesswoman in office"
            fill
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.35 }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Overlay */}
        <div style={{
          position:   "absolute",
          inset:      0,
          zIndex:     1,
          background: "linear-gradient(105deg, rgba(8,12,20,0.97) 0%, rgba(8,12,20,0.88) 50%, rgba(8,12,20,0.4) 100%)",
        }} />

        {/* Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            position:      "relative",
            zIndex:        2,
            width:         "100%",
            maxWidth:      "1440px",
            margin:        "0 auto",
            paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
          }}
        >
          <motion.span variants={fadeUp} style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.75rem",
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "0.6875rem",
            fontWeight:    600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color:         "#c4973a",
            marginBottom:  "1.5rem",
          }}>
            <span style={{ width: "32px", height: "1px", background: "#c4973a", flexShrink: 0 }} />
            Who we are
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2.75rem, 5.5vw, 4.5rem)",
            fontWeight:    800,
            lineHeight:    1.05,
            letterSpacing: "-0.03em",
            color:         "#ffffff",
            marginBottom:  "1.5rem",
            maxWidth:      "680px",
          }}>
            A trusted partner for<br />
            <span style={{ color: "#c4973a" }}>Ghanaian businesses.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:    "1.125rem",
            lineHeight:  1.8,
            color:       "rgba(255,255,255,0.6)",
            maxWidth:    "520px",
            marginBottom:"2rem",
          }}>
            Erano Consulting was founded to provide world-class financial and advisory
            services tailored to Ghana&apos;s unique business landscape — combining deep
            local knowledge with international professional standards.
          </motion.p>

          {/* Founder quote */}
          <motion.div variants={fadeUp} style={{
            background:   "rgba(255,255,255,0.05)",
            border:       "1px solid rgba(255,255,255,0.1)",
            borderLeft:   "2px solid #c4973a",
            borderRadius: "4px",
            padding:      "1.25rem 1.5rem",
            maxWidth:     "520px",
          }}>
            <p style={{
              fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:     "0.9375rem",
              fontStyle:    "italic",
              lineHeight:   1.75,
              color:        "rgba(255,255,255,0.75)",
              marginBottom: "0.75rem",
            }}>
              &ldquo;We built Erano because Ghanaian businesses deserve the same quality
              of financial advisory that multinational corporations take for granted.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width:          "32px",
                height:         "32px",
                borderRadius:   "50%",
                background:     "#c4973a",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}>
                <span style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.6875rem", fontWeight: 700, color: "#ffffff" }}>NA</span>
              </div>
              <div>
                <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>Nana Afua Sarpong</div>
                <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>Founder & Lead Consultant</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginBottom: "4rem" }}
          >
            <motion.span variants={fadeUp} style={{
              display:       "inline-block",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginBottom:  "1rem",
            }}>Our team</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#0d1b2e",
            }}>
              The people behind<br />every engagement.
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  background:   "#ffffff",
                  border:       "1px solid #e8eaed",
                  borderRadius: "8px",
                  overflow:     "hidden",
                  transition:   "border-color 0.2s ease",
                }}
              >
                {/* Photo */}
                <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                  <Image
                    src={member.image}
                    alt={`${member.name} — ${member.role} — placeholder photo`}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{
                    position:   "absolute",
                    inset:      0,
                    background: "linear-gradient(to top, rgba(8,12,20,0.75) 0%, transparent 60%)",
                  }} />
                  <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", right: "1.25rem" }}>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "1.0625rem", fontWeight: 700, color: "#ffffff" }}>{member.name}</div>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", color: "#c4973a", marginTop: "2px" }}>{member.role}</div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem" }}>
                  <p style={{
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "0.875rem",
                    lineHeight:   1.75,
                    color:        "#4a5568",
                    marginBottom: "1.25rem",
                  }}>{member.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.375rem" }}>
                    {member.certs.map((cert) => (
                      <span key={cert} style={{
                        fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontSize:      "0.6875rem",
                        fontWeight:    600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        color:         "#0d1b2e",
                        background:    "#f5f6f8",
                        border:        "1px solid #e8eaed",
                        borderRadius:  "2px",
                        padding:       "0.25rem 0.625rem",
                      }}>{cert}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: "#080c14", paddingBlock: "clamp(5rem, 9vw, 7.5rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={IMAGES.ABOUT_VALUES_BG}
            alt="Modern office"
            fill
            style={{ objectFit: "cover", opacity: 0.1 }}
            sizes="100vw"
          />
        </div>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)", position: "relative", zIndex: 1 }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginBottom: "4rem" }}
          >
            <motion.span variants={fadeUp} style={{
              display:       "inline-block",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginBottom:  "1rem",
            }}>Our values</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#ffffff",
            }}>What we stand for.</motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding:      "2rem",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                }}
              >
                <div style={{
                  fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:      "3rem",
                  fontWeight:    800,
                  letterSpacing: "-0.04em",
                  color:         "rgba(196,151,58,0.2)",
                  lineHeight:    1,
                  marginBottom:  "1rem",
                }}>{v.number}</div>
                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "1rem",
                  fontWeight:   600,
                  color:        "#ffffff",
                  marginBottom: "0.625rem",
                }}>{v.title}</div>
                <div style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:   "0.875rem",
                  lineHeight: 1.75,
                  color:      "rgba(255,255,255,0.5)",
                }}>{v.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingInline: "clamp(1.5rem, 5.5vw, 5rem)" }}>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginBottom: "4rem" }}
          >
            <motion.span variants={fadeUp} style={{
              display:       "inline-block",
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.6875rem",
              fontWeight:    600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color:         "#c4973a",
              marginBottom:  "1rem",
            }}>Credentials</motion.span>
            <motion.h2 variants={fadeUp} style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "clamp(2rem, 3.5vw, 3rem)",
              fontWeight:    700,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#0d1b2e",
            }}>
              Certified, registered,<br />and accountable.
            </motion.h2>
          </motion.div>

          <div>
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.code}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display:      "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap:          "2rem",
                  paddingBlock: "1.75rem",
                  borderTop:    "1px solid #e8eaed",
                  alignItems:   "start",
                }}
              >
                <div style={{
                  fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:      "0.75rem",
                  fontWeight:    700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color:         "#c4973a",
                  paddingTop:    "0.125rem",
                }}>{cred.code}</div>
                <div>
                  <div style={{
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "1rem",
                    fontWeight:   600,
                    color:        "#0d1b2e",
                    marginBottom: "0.375rem",
                  }}>{cred.title}</div>
                  <div style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:   "0.9375rem",
                    lineHeight: 1.7,
                    color:      "#4a5568",
                  }}>{cred.body}</div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid #e8eaed" }} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#f5f6f8", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
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
          <motion.span variants={fadeUp} style={{
            display:       "inline-block",
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "0.6875rem",
            fontWeight:    600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color:         "#c4973a",
            marginBottom:  "1rem",
          }}>Work with us</motion.span>

          <motion.h2 variants={fadeUp} style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      "clamp(2rem, 3.5vw, 3rem)",
            fontWeight:    700,
            lineHeight:    1.1,
            letterSpacing: "-0.025em",
            color:         "#0d1b2e",
            maxWidth:      "560px",
            margin:        "0 auto 1.25rem",
          }}>
            Ready to work with a firm you can trust?
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:    "1.0625rem",
            lineHeight:  1.75,
            color:       "#4a5568",
            maxWidth:    "440px",
            margin:      "0 auto 2.5rem",
          }}>
            Schedule a free consultation with our team today. No commitment required.
          </motion.p>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
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
              Get in touch <ArrowRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}