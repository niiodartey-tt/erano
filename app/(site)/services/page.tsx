"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "tax",
    icon: "📋",
    title: "Tax Advisory",
    tagline: "Strategic tax planning and full GRA compliance management.",
    description:
      "Ghana's tax landscape is complex and constantly evolving. Our tax advisory team ensures your business remains fully compliant while minimising your tax burden through legitimate planning strategies. From VAT registration to corporate tax structuring, we handle it all.",
    features: [
      "VAT registration and periodic filing",
      "PAYE computation and compliance",
      "Corporate income tax returns",
      "GRA audit representation and support",
      "Tax planning and restructuring strategy",
      "Withholding tax management",
      "Transfer pricing advisory",
    ],
    pricing: "From GHS 800/month retainer · Free initial consultation",
    accent: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    id: "audit",
    icon: "🔍",
    title: "Audit & Assurance",
    tagline: "Independent audits conducted to ICAG and international standards.",
    description:
      "An independent audit gives your stakeholders — banks, investors, regulators, and partners — confidence in your financial reporting. Our ICAG-licensed auditors conduct thorough, professional engagements that go beyond compliance to deliver actionable insights.",
    features: [
      "Statutory financial statement audit",
      "Internal audit and controls review",
      "Regulatory compliance audit",
      "Due diligence for transactions",
      "Management letter with recommendations",
      "Agreed-upon procedures",
      "Forensic accounting investigation",
    ],
    pricing: "Quoted per engagement · Free scoping consultation",
    accent: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    id: "accounting",
    icon: "📊",
    title: "Accounting",
    tagline: "Full outsourced accounting so you can focus on growing your business.",
    description:
      "Accurate, timely financial records are the foundation of every sound business decision. Our accounting team handles your books with the precision of an in-house finance function, at a fraction of the cost. We work with QuickBooks, Sage, and Caseware.",
    features: [
      "Full bookkeeping and ledger management",
      "Monthly and quarterly management accounts",
      "Payroll processing and SSNIT administration",
      "Annual financial statements preparation",
      "Accounts payable and receivable management",
      "Bank reconciliations",
      "Chart of accounts setup and optimisation",
    ],
    pricing: "From GHS 600/month retainer · Sliding scale available",
    accent: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    id: "consultancy",
    icon: "🤝",
    title: "Business Consultancy",
    tagline: "Strategic advisory from registration through to growth planning.",
    description:
      "Starting or scaling a business in Ghana requires navigating a web of regulatory requirements across multiple agencies. Our consultancy team guides you through every step — from initial registration to strategic planning — so you build on a solid foundation.",
    features: [
      "Business registration with the Registrar General (RGD)",
      "GRA tax identification and VAT certificate",
      "SSNIT employer registration",
      "PPA supplier registration for government tenders",
      "Business plan development and review",
      "Strategic planning and growth advisory",
      "Professional indemnity insurance guidance",
    ],
    pricing: "From GHS 500 per engagement · Packages available",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
];

const pricingOptions = [
  {
    icon: "🎁",
    title: "Free initial consultation",
    body: "A 30-minute session to discuss your needs and assess how we can help. No commitment required.",
  },
  {
    icon: "📅",
    title: "Monthly retainer",
    body: "Affordable ongoing support for businesses that need continuous accounting or tax management.",
  },
  {
    icon: "📐",
    title: "Sliding scale",
    body: "Fees adjusted based on your business size and capacity — especially for NGOs and early-stage startups.",
  },
  {
    icon: "📦",
    title: "Per-engagement",
    body: "For one-off audits, registrations, or advisory projects. Quoted clearly upfront with no surprises.",
  },
];

export default function ServicesPage() {
  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <section className="bg-hero-gradient pt-16 pb-14">
        <div className="container-erano">
          <div className="max-w-2xl reveal">
            <p className="eyebrow mb-4">What we offer</p>
            <h1 className="heading-display mb-5">
              Four disciplines,<br />
              <em>one trusted firm</em>
            </h1>
            <p className="text-ui-lg text-brand-grey leading-relaxed">
              We combine deep local regulatory knowledge with international
              professional standards across tax, audit, accounting, and
              business consultancy.
            </p>
          </div>

          {/* Anchor nav */}
          <div className="flex flex-wrap gap-2 mt-8 reveal reveal-delay-1">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-1.5 text-ui-sm font-medium text-brand-charcoal bg-white border border-brand-cloud px-4 py-2 rounded-full hover:border-brand-blue hover:text-brand-blue-dark transition-all"
              >
                <span>{s.icon}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`section-gap scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-off-white"}`}
        >
          <div className="container-erano">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

              {/* Left — content */}
              <div className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <div className="reveal">
                  <div className={`w-12 h-12 ${svc.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5`}>
                    {svc.icon}
                  </div>
                  <p className="eyebrow mb-3">{`0${i + 1} — Service`}</p>
                  <h2 className="heading-section mb-4">{svc.title}</h2>
                  <p className="text-ui-base text-brand-grey leading-relaxed mb-6">
                    {svc.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm"
                  >
                    Get started <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right — features card */}
              <div className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                <div className={`reveal reveal-delay-2 border ${svc.accent} rounded-2xl p-7`}>
                  <p className="font-sans font-medium text-ui-base text-brand-charcoal mb-5">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3 mb-6">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-brand-blue flex-shrink-0 mt-0.5"
                        />
                        <span className="text-ui-base text-brand-grey">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-brand-cloud">
                    <p className="text-ui-sm text-brand-grey">{svc.pricing}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* Pricing philosophy */}
      <section className="section-gap bg-brand-charcoal text-white">
        <div className="container-erano">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow text-brand-blue-light mb-3">Pricing</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-white leading-tight mb-4">
              Transparent pricing,<br />
              <em className="text-brand-blue-light">no surprises</em>
            </h2>
            <p className="text-ui-base text-white/60 leading-relaxed">
              We believe every business deserves access to quality professional
              services. Our pricing is structured to be fair and accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricingOptions.map((opt, i) => (
              <div
                key={opt.title}
                className={`reveal reveal-delay-${i + 1} border border-white/10 rounded-xl p-6 hover:border-brand-blue/50 hover:bg-white/5 transition-all`}
              >
                <div className="text-2xl mb-4">{opt.icon}</div>
                <h3 className="font-sans font-medium text-ui-base text-white mb-2">
                  {opt.title}
                </h3>
                <p className="text-ui-sm text-white/50 leading-relaxed">
                  {opt.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-gap bg-hero-gradient">
        <div className="container-erano text-center reveal">
          <p className="eyebrow mb-4">Start today</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Not sure where to begin?<br />
            <em className="text-brand-blue">Let&apos;s talk it through</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8">
            Book a free 30-minute consultation and we&apos;ll recommend the
            right services for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-7 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-blue"
          >
            Book a free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}