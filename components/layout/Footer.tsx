"use client"

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const services = [
  { label: "Accountancy Services",  href: "/services#accountancy" },
  { label: "Business Services",     href: "/services#business"    },
  { label: "Tax Planning & Advice", href: "/services#tax"         },
];

const company = [
  { label: "About us",   href: "/about"      },
  { label: "Industries", href: "/industries" },
  { label: "Resources",  href: "/resources"  },
  { label: "Careers",    href: "/careers"    },
  { label: "Contact",    href: "/contact"    },
];

const legal = [
  { label: "Privacy Policy",   href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms"   },
];

const certs = [
  { code: "ICAG", note: "Licensed"     },
  { code: "CITG", note: "Certified"    },
  { code: "GRA",  note: "Registered"   },
  { code: "RGD",  note: "Incorporated" },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: <LinkedInIcon />, hover: "#0A66C2" },
  { label: "X",        href: "https://x.com",        icon: <XIcon />,        hover: "#000000" },
  { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon />, hover: "#1877F2" },
  { label: "WhatsApp", href: "https://wa.me/233559331276", icon: <WhatsAppIcon />, hover: "#25D366" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#080c14", color: "#ffffff" }}>

      {/* Gold top line */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #c4973a 30%, #c4973a 70%, transparent 100%)" }} />

      <div style={{
        maxWidth:      "1440px",
        margin:        "0 auto",
        paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
        paddingBlock:  "5rem 3.5rem",
      }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap:                 "3rem",
          marginBottom:        "4rem",
        }}>

          {/* Brand column */}
          <div style={{ gridColumn: "span 2" }}>

            {/* Wordmark */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "1.25rem",
                fontWeight:    800,
                letterSpacing: "-0.025em",
                color:         "#ffffff",
                lineHeight:    1,
              }}>
                ERANO
              </div>
              <div style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "0.5rem",
                fontWeight:    600,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color:         "rgba(255,255,255,0.35)",
                marginTop:     "3px",
              }}>
                CONSULTING
              </div>
            </div>

            <p style={{
              fontSize:   "0.875rem",
              lineHeight: 1.75,
              color:      "rgba(255,255,255,0.5)",
              maxWidth:   "280px",
              marginBottom: "1.5rem",
            }}>
              Professional accountancy, business advisory, and tax planning services across Ghana.
            </p>

            {/* Tagline */}
            <p style={{
              fontFamily:  '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:    "0.875rem",
              fontStyle:   "italic",
              color:       "#c4973a",
              marginBottom: "1.75rem",
            }}>
              &ldquo;Built for Ghana&apos;s businesses&rdquo;
            </p>

            {/* Cert badges */}
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem", marginBottom: "2rem" }}>
              {certs.map((cert) => (
                <div
                  key={cert.code}
                  style={{
                    border:       "1px solid rgba(196,151,58,0.35)",
                    borderRadius: "4px",
                    padding:      "0.375rem 0.75rem",
                  }}
                >
                  <div style={{
                    fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:      "0.625rem",
                    fontWeight:    700,
                    letterSpacing: "0.12em",
                    color:         "#c4973a",
                    lineHeight:    1,
                  }}>
                    {cert.code}
                  </div>
                  <div style={{
                    fontSize:      "0.5625rem",
                    color:         "rgba(255,255,255,0.3)",
                    marginTop:     "2px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                  }}>
                    {cert.note}
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div>
              <div style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "0.625rem",
                fontWeight:    600,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color:         "rgba(255,255,255,0.3)",
                marginBottom:  "0.75rem",
              }}>
                Follow us
              </div>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width:           "44px",
                      height:          "44px",
                      borderRadius:    "6px",
                      border:          "1px solid rgba(255,255,255,0.12)",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      color:           "rgba(255,255,255,0.6)",
                      textDecoration:  "none",
                      transition:      "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background   = s.hover;
                      el.style.color        = "#ffffff";
                      el.style.borderColor  = s.hover;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background   = "transparent";
                      el.style.color        = "rgba(255,255,255,0.6)";
                      el.style.borderColor  = "rgba(255,255,255,0.12)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.625rem",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color:         "rgba(255,255,255,0.35)",
              marginBottom:  "1.25rem",
            }}>
              Services
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {services.map((s) => (
                <li key={s.href} style={{ marginBottom: "0.75rem" }}>
                  <Link
                    href={s.href}
                    style={{
                      fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:       "0.9rem",
                      color:          "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition:     "color 0.2s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4973a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.625rem",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color:         "rgba(255,255,255,0.35)",
              marginBottom:  "1.25rem",
            }}>
              Company
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {company.map((c) => (
                <li key={c.href} style={{ marginBottom: "0.75rem" }}>
                  <Link
                    href={c.href}
                    style={{
                      fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:       "0.9rem",
                      color:          "rgba(255,255,255,0.55)",
                      textDecoration: "none",
                      transition:     "color 0.2s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4973a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "0.625rem",
              fontWeight:    600,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color:         "rgba(255,255,255,0.35)",
              marginBottom:  "1.25rem",
            }}>
              Get in touch
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
              <li style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{
                  width:          "36px",
                  height:         "36px",
                  borderRadius:   "6px",
                  background:     "rgba(196,151,58,0.12)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  color:          "#c4973a",
                }}>
                  <MapPin size={16} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>Office</div>
                  <div style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    GI-449-1284, Accra<br />Greater Accra, Ghana
                  </div>
                </div>
              </li>
              <li style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{
                  width:          "36px",
                  height:         "36px",
                  borderRadius:   "6px",
                  background:     "rgba(196,151,58,0.12)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  color:          "#c4973a",
                }}>
                  <Phone size={16} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>Phone</div>
                  <a href="tel:+233559233199" style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>+233 55 923 3199</a>
                  <a href="tel:+233559331276" style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>+233 55 933 1276</a>
                </div>
              </li>
              <li style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <div style={{
                  width:          "36px",
                  height:         "36px",
                  borderRadius:   "6px",
                  background:     "rgba(196,151,58,0.12)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                  color:          "#c4973a",
                }}>
                  <Mail size={16} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>Email</div>
                  <a
                    href="mailto:enquiries@eranoconsulting.com"
                    style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", wordBreak: "break-all" as const }}
                  >
                    enquiries@eranoconsulting.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop:    "2rem",
          borderTop:     "1px solid rgba(255,255,255,0.08)",
          display:       "flex",
          flexWrap:      "wrap" as const,
          alignItems:    "center",
          justifyContent:"space-between",
          gap:           "1rem",
        }}>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)" }}>
            &copy; {new Date().getFullYear()} Erano Consulting Ghana. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize:       "0.8125rem",
                  color:          "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition:     "color 0.2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c4973a"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}