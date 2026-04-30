"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About us",   href: "/about"      },
  { label: "Services",   href: "/services"   },
  { label: "Industries", href: "/industries" },
  { label: "Tools",      href: "/tools"      },
  { label: "Resources",  href: "/resources"  },
  { label: "Contact",    href: "/contact"    },
];

export default function Navbar() {
  const pathname                = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header style={{
        position:     "fixed",
        top:          0,
        left:         0,
        right:        0,
        zIndex:       40,
        height:       "72px",
        background:   "#ffffff",
        borderBottom: "1px solid #e8eaed",
        boxShadow:    scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
        transition:   "box-shadow 0.3s ease",
      }}>
        <div style={{
          maxWidth:       "1440px",
          margin:         "0 auto",
          paddingInline:  "clamp(1.5rem, 5.5vw, 5rem)",
          height:         "100%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "2rem",
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width:          "36px",
              height:         "36px",
              background:     "#080c14",
              borderRadius:   "6px",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <rect x="4" y="4"  width="16" height="2.5" rx="1" fill="#c4973a"/>
                <rect x="4" y="11" width="11" height="2.5" rx="1" fill="#ffffff"/>
                <rect x="4" y="18" width="16" height="2.5" rx="1" fill="#ffffff"/>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, lineHeight: 1 }}>
              <span style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "1.0625rem",
                fontWeight:    800,
                letterSpacing: "-0.02em",
                color:         "#080c14",
              }}>ERANO</span>
              <span style={{
                fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:      "0.45rem",
                fontWeight:    600,
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                color:         "#9ca3af",
                marginTop:     "2px",
              }}>CONSULTING</span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          {!isMobile && (
            <nav style={{
              display:        "flex",
              alignItems:     "center",
              flex:           1,
              justifyContent: "center",
              gap:            "0",
            }}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
<Link
                    key={link.href}
                    href={link.href}
                    style={{
                      position:       "relative",
                      display:        "inline-flex",
                      alignItems:     "center",
                      padding:        "0 1rem",
                      height:         "72px",
                      fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:       "0.9375rem",
                      fontWeight:     active ? 700 : 600,
                      color:          active ? "#080c14" : "#6b7280",
                      textDecoration: "none",
                      whiteSpace:     "nowrap" as const,
                      transition:     "color 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#080c14";
                      const bar = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                      if (bar) bar.style.transform = "scaleX(1)";
                    }}
                    onMouseLeave={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.color = "#6b7280";
                      const bar = e.currentTarget.querySelector(".nav-underline") as HTMLElement;
                      if (bar && !active) bar.style.transform = "scaleX(0)";
                    }}
                  >
                    {link.label}
                    <span
                      className="nav-underline"
                      style={{
                        position:        "absolute",
                        bottom:          0,
                        left:            "1rem",
                        right:           "1rem",
                        height:          "2px",
                        background:      "#c4973a",
                        transform:       active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition:      "transform 0.25s ease",
                      }}
                    />
                  </Link>                );
              })}
            </nav>
          )}

          {/* ── Desktop right ── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>

              {/* Client login with lock icon */}
              <Link
                href="/login"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "0.4rem",
                  fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:       "0.9375rem",
                  fontWeight:     600,
                  color:          "#6b7280",
                  textDecoration: "none",
                  whiteSpace:     "nowrap" as const,
                  transition:     "color 0.15s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#080c14"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Client login
              </Link>

              {/* Divider */}
              <div style={{ width: "1px", height: "20px", background: "#e8eaed" }} />

              {/* Contact CTA */}
              <Link
                href="/contact"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  background:     "#c4973a",
                  color:          "#ffffff",
                  fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:       "0.9375rem",
                  fontWeight:     600,
                  padding:        "0.625rem 1.5rem",
                  borderRadius:   "4px",
                  textDecoration: "none",
                  whiteSpace:     "nowrap" as const,
                  transition:     "background 0.2s ease, transform 0.15s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#a07828";
                  (e.currentTarget as HTMLElement).style.transform  = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#c4973a";
                  (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
                }}
              >
                Contact us
              </Link>
            </div>
          )}

          {/* ── Mobile button ── */}
          {isMobile && (
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          "40px",
                height:         "40px",
                border:         "1px solid #e8eaed",
                borderRadius:   "6px",
                background:     "transparent",
                color:          "#374151",
                cursor:         "pointer",
                flexShrink:     0,
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {open && isMobile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 39 }}>
          <div
            onClick={() => setOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }}
          />
          <div style={{
            position:    "absolute",
            top:         "72px",
            left:        0,
            right:       0,
            background:  "#ffffff",
            borderBottom:"1px solid #e8eaed",
            boxShadow:   "0 8px 32px rgba(0,0,0,0.12)",
            padding:     "1rem 1.5rem 1.5rem",
            animation:   "fadeUp 0.2s ease forwards",
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "space-between",
                  padding:        "0.875rem 1rem",
                  borderRadius:   "6px",
                  fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:       "1rem",
                  fontWeight:     pathname === link.href ? 700 : 500,
                  color:          pathname === link.href ? "#080c14" : "#6b7280",
                  textDecoration: "none",
                  background:     pathname === link.href ? "#f9fafb" : "transparent",
                  marginBottom:   "2px",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c4973a" }} />
                )}
              </Link>
            ))}
            <div style={{
              marginTop:     "0.75rem",
              paddingTop:    "0.75rem",
              borderTop:     "1px solid #e8eaed",
              display:       "flex",
              flexDirection: "column" as const,
              gap:           "0.5rem",
            }}>
              <Link href="/login" style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "0.4rem",
                padding:        "0.875rem 1rem",
                borderRadius:   "6px",
                fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:       "1rem",
                fontWeight:     600,
                color:          "#6b7280",
                textDecoration: "none",
                border:         "1px solid #e8eaed",
              }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Client login
              </Link>
              <Link href="/contact" style={{
                display:        "block",
                padding:        "0.875rem 1rem",
                borderRadius:   "6px",
                fontFamily:     '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize:       "1rem",
                fontWeight:     600,
                color:          "#ffffff",
                textDecoration: "none",
                textAlign:      "center" as const,
                background:     "#c4973a",
              }}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}