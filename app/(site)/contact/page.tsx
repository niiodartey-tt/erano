"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const services = [
  { value: "",              label: "Select a service..."     },
  { value: "tax",           label: "Tax Advisory"            },
  { value: "audit",         label: "Audit & Assurance"       },
  { value: "accounting",    label: "Accounting"              },
  { value: "consultancy",   label: "Business Consultancy"    },
  { value: "other",         label: "Other / Not sure yet"    },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  useScrollReveal();

  const [form, setForm]     = useState<FormState>({ fullName: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error,  setError]  = useState("");

  const waNumber  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233559331276";
  const waMessage = encodeURIComponent("Hello, I'd like to enquire about Erano Consulting's services.");
  const waHref    = `https://wa.me/${waNumber}?text=${waMessage}`;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient pt-16 pb-14">
        <div className="container-erano">
          <div className="max-w-2xl reveal">
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="heading-display mb-5">
              Let&apos;s talk about<br />
              <em>your business</em>
            </h1>
            <p className="text-ui-lg text-brand-grey leading-relaxed">
              We respond within one business day. The first consultation
              is always free — no commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-gap bg-white">
        <div className="container-erano">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form — takes 2 cols */}
            <div className="lg:col-span-2 reveal">
              <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-6">
                Send us a message
              </h2>

              {status === "success" ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-2">
                    Message received
                  </h3>
                  <p className="text-ui-base text-brand-grey">
                    Thank you for reaching out. A member of our team will
                    be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Kofi Asante"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="kofi@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">Phone number</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="form-label">Service of interest</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="form-input"
                      >
                        {services.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="form-input min-h-[140px] resize-y"
                      placeholder="Tell us about your business and what you need help with..."
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-ui-sm text-red-500">{error}</p>
                  )}

                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-ui-sm text-red-600">
                      Something went wrong. Please try again or contact us directly via WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-7 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Send message <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-5 reveal reveal-delay-2">
              <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal">
                Contact details
              </h2>

              <div className="bg-off-white border border-brand-cloud rounded-2xl p-6 space-y-5">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-brand-blue-xl rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-brand-blue-dark" />
                  </div>
                  <div>
                    <p className="text-ui-sm font-medium text-brand-charcoal mb-0.5">Office address</p>
                    <p className="text-ui-sm text-brand-grey">
                      GI-449-1284, Accra<br />Greater Accra, Ghana
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-brand-blue-xl rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-brand-blue-dark" />
                  </div>
                  <div>
                    <p className="text-ui-sm font-medium text-brand-charcoal mb-0.5">Phone</p>
                    <a
                      href="tel:+233559231996"
                      className="text-ui-sm text-brand-grey hover:text-brand-blue transition-colors"
                    >
                      +233 55 923 1996
                    </a>
                    <br />
                    <a
                      href="tel:+233559331276"
                      className="text-ui-sm text-brand-grey hover:text-brand-blue transition-colors"
                    >
                      +233 55 933 1276
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-brand-blue-xl rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-brand-blue-dark" />
                  </div>
                  <div>
                    <p className="text-ui-sm font-medium text-brand-charcoal mb-0.5">Email</p>
                    <a
                      href="mailto:enquiries@eranoconsulting.com"
                      className="text-ui-sm text-brand-grey hover:text-brand-blue transition-colors break-all"
                    >
                      enquiries@eranoconsulting.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-[#25D366]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-ui-sm font-medium text-brand-charcoal mb-0.5">WhatsApp</p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ui-sm text-brand-grey hover:text-[#25D366] transition-colors"
                    >
                      Chat with us now
                    </a>
                  </div>
                </div>
              </div>

              {/* Response time note */}
              <div className="bg-brand-blue-xl border border-brand-blue-light rounded-xl p-4">
                <p className="text-ui-sm font-medium text-brand-blue-dark mb-1">
                  ⚡ Fast response
                </p>
                <p className="text-ui-sm text-brand-grey">
                  We respond to all enquiries within one business day.
                  For urgent matters, WhatsApp is the fastest way to reach us.
                </p>
              </div>

              {/* Map placeholder */}
              <div className="bg-brand-cloud rounded-xl h-40 flex items-center justify-center border border-brand-cloud">
                <div className="text-center">
                  <MapPin size={24} className="text-brand-blue mx-auto mb-2" />
                  <p className="text-ui-sm text-brand-grey">Accra, Greater Accra</p>
                  <a
                    href="https://maps.google.com/?q=Accra,Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ui-sm text-brand-blue hover:text-brand-blue-dark transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}