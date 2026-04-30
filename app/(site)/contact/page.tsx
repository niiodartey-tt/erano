"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

type FormState = {
  fullName: string;
  email:    string;
  phone:    string;
  service:  string;
  message:  string;
};

type Status = "idle" | "loading" | "success" | "error";

const services = [
  { value: "",             label: "Select a service..."       },
  { value: "accountancy",  label: "Accountancy Services"      },
  { value: "business",     label: "Business Services"         },
  { value: "tax",          label: "Tax Planning & Advice"     },
  { value: "other",        label: "Other / Not sure yet"      },
];

export default function ContactPage() {
  const [form, setForm]     = useState<FormState>({ fullName: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError]   = useState("");

  const waNumber  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233559331276";
  const waMessage = encodeURIComponent("Hello, I would like to enquire about Erano Consulting services.");
  const waHref    = `https://wa.me/${waNumber}?text=${waMessage}`;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ fullName: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    height:       "52px",
    border:       "1.5px solid #e8eaed",
    borderRadius: "4px",
    padding:      "0 1rem",
    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
    fontSize:     "0.9375rem",
    color:        "#0d1b2e",
    background:   "#ffffff",
    outline:      "none",
    transition:   "border-color 0.15s ease",
  };

  const labelStyle: React.CSSProperties = {
    display:      "block",
    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
    fontSize:     "0.8125rem",
    fontWeight:   600,
    color:        "#0d1b2e",
    marginBottom: "0.5rem",
  };

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
          background: "radial-gradient(ellipse at 30% 50%, rgba(196,151,58,0.06) 0%, transparent 70%)",
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
            Get in touch
          </motion.span>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff",
            marginBottom: "1.25rem", maxWidth: "600px",
          }}>
            Let&apos;s talk about<br />
            <span style={{ color: "#c4973a" }}>your business.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: "1.125rem", lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: "480px",
          }}>
            We respond within one business day. The first consultation
            is always free — no commitment required.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Form + sidebar ── */}
      <section style={{ background: "#ffffff", paddingBlock: "clamp(5rem, 9vw, 7.5rem)" }}>
        <div style={{
          maxWidth:      "1440px",
          margin:        "0 auto",
          paddingInline: "clamp(1.5rem, 5.5vw, 5rem)",
          display:       "grid",
          gridTemplateColumns: "1fr 380px",
          gap:           "5rem",
          alignItems:    "start",
        }}>

          {/* ── Form ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeUp} style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "1.75rem",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              color:         "#0d1b2e",
              marginBottom:  "2.5rem",
            }}>
              Send us a message
            </motion.h2>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background:   "#f0fdf4",
                  border:       "1px solid #bbf7d0",
                  borderRadius: "8px",
                  padding:      "3rem",
                  textAlign:    "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <div style={{
                  fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:     "1.125rem",
                  fontWeight:   700,
                  color:        "#0d1b2e",
                  marginBottom: "0.5rem",
                }}>Message received</div>
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize:   "0.9375rem",
                  color:      "#4a5568",
                  margin:     0,
                }}>
                  Thank you for reaching out. A member of our team will
                  be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Full name <span style={{ color: "#ef4444" }}>*</span></label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Kofi Asante"
                      required
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
                      onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email address <span style={{ color: "#ef4444" }}>*</span></label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="kofi@company.com"
                      required
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
                      onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Phone number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+233 XX XXX XXXX"
                      style={inputStyle}
                      onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
                      onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Service of interest</label>
                    <div style={{ position: "relative" }}>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer", paddingRight: "2.5rem" }}
                        onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
                        onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
                      >
                        {services.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Message <span style={{ color: "#ef4444" }}>*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business and what you need help with..."
                    required
                    style={{
                      width:        "100%",
                      border:       "1.5px solid #e8eaed",
                      borderRadius: "4px",
                      padding:      "0.875rem 1rem",
                      fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize:     "0.9375rem",
                      color:        "#0d1b2e",
                      background:   "#ffffff",
                      outline:      "none",
                      resize:       "vertical",
                      minHeight:    "160px",
                      transition:   "border-color 0.15s ease",
                    }}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "#c4973a"; }}
                    onBlur={e  => { (e.target as HTMLElement).style.borderColor = "#e8eaed"; }}
                  />
                </div>

                {error && (
                  <p style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", color: "#ef4444", margin: 0 }}>
                    {error}
                  </p>
                )}

                {status === "error" && (
                  <div style={{
                    background: "#fef2f2", border: "1px solid #fecaca",
                    borderRadius: "4px", padding: "0.875rem 1rem",
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: "0.875rem", color: "#dc2626",
                  }}>
                    Something went wrong. Please try again or contact us via WhatsApp.
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display:      "inline-flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    gap:          "0.5rem",
                    background:   "#c4973a",
                    color:        "#ffffff",
                    fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize:     "0.9375rem",
                    fontWeight:   600,
                    padding:      "1rem 2rem",
                    borderRadius: "4px",
                    border:       "none",
                    cursor:       status === "loading" ? "not-allowed" : "pointer",
                    opacity:      status === "loading" ? 0.7 : 1,
                    alignSelf:    "flex-start",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" opacity="0.75"/>
                      </svg>
                      Sending...
                    </>
                  ) : "Send message"}
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeUp} style={{
              fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize:      "1.75rem",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              color:         "#0d1b2e",
              marginBottom:  "2.5rem",
            }}>
              Contact details
            </motion.h2>

            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column" as const, gap: "1.75rem", marginBottom: "2rem" }}>
              {[
                { icon: <MapPin size={18} />, label: "Office", content: <span>GI-449-1284, Accra<br />Greater Accra, Ghana</span> },
                { icon: <Phone size={18} />, label: "Phone",  content: <span>+233 55 923 3199<br />+233 55 933 1276</span>       },
                { icon: <Mail  size={18} />, label: "Email",  content: <span style={{ wordBreak: "break-all" }}>enquiries@eranoconsulting.com</span> },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{
                    width:          "40px",
                    height:         "40px",
                    borderRadius:   "6px",
                    background:     "rgba(196,151,58,0.1)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    color:          "#c4973a",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", fontWeight: 600, color: "#0d1b2e", marginBottom: "0.25rem" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.9375rem", lineHeight: 1.7, color: "#6b7280" }}>
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div variants={fadeUp}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "0.875rem",
                  background:     "#f0fdf4",
                  border:         "1px solid #bbf7d0",
                  borderRadius:   "8px",
                  padding:        "1.25rem",
                  textDecoration: "none",
                  transition:     "all 0.2s ease",
                  marginBottom:   "1.5rem",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#dcfce7"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f0fdf4"; }}
              >
                <div style={{
                  width:          "40px",
                  height:         "40px",
                  borderRadius:   "50%",
                  background:     "#25D366",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  flexShrink:     0,
                }}>
                  <MessageCircle size={20} style={{ color: "#ffffff" }} />
                </div>
                <div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.9375rem", fontWeight: 600, color: "#0d1b2e", marginBottom: "2px" }}>
                    Chat on WhatsApp
                  </div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", color: "#4a5568" }}>
                    Fastest response — usually within hours
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Response note */}
            <motion.div variants={fadeUp} style={{
              background:   "#f5f6f8",
              borderLeft:   "2px solid #c4973a",
              borderRadius: "0 4px 4px 0",
              padding:      "1rem 1.25rem",
            }}>
              <div style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.875rem", fontWeight: 600, color: "#0d1b2e", marginBottom: "0.375rem" }}>
                Fast response guaranteed
              </div>
              <p style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', fontSize: "0.8125rem", lineHeight: 1.6, color: "#6b7280", margin: 0 }}>
                We respond to all enquiries within one business day.
                For urgent matters, WhatsApp is the fastest route.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}