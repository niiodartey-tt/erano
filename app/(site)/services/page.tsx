"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, CheckCircle2, Check } from "lucide-react";

const services = [
  {
    id: "accountancy",
    icon: "📊",
    title: "Accountancy Services",
    tagline: "Accurate, timely financial records that drive better business decisions.",
    description: "Our accountancy team handles your books with the precision of an in-house finance function at a fraction of the cost. From day-to-day bookkeeping to annual statutory accounts, we keep your financial records clean, compliant, and decision-ready.",
    features: ["Annual accounts preparation", "Management accounts (monthly / quarterly)", "Bookkeeping and ledger management", "Payroll processing and administration", "Bank reconciliations", "Accounts payable and receivable management", "SSNIT filing and compliance"],
    pricing: "Included from Starter Essentials plan — GHS 16,500/year",
    accent: "bg-blue-50 border-blue-100",
    number: "01",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Accountant working with financial documents",
  },
  {
    id: "business",
    icon: "🤝",
    title: "Business Services",
    tagline: "From start-up to scale-up — strategic support at every stage.",
    description: "Whether you are starting a new business, acquiring an existing one, or planning for growth, our business services team provides end-to-end support. We navigate Ghana's regulatory landscape so you can focus on building your enterprise.",
    features: ["Business start-up advisory and registration (RGD)", "Buying an existing business — due diligence", "Strategic growth planning and advisory", "Business finance and funding advisory", "Payroll services and HR compliance", "Company secretarial services", "PPA supplier registration for government tenders"],
    pricing: "Included from Starter Essentials plan — GHS 16,500/year",
    accent: "bg-emerald-50 border-emerald-100",
    number: "02",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Business professionals in a strategy meeting",
  },
  {
    id: "tax",
    icon: "📋",
    title: "Tax Planning & Advice",
    tagline: "Strategic tax planning that minimises liability and ensures full compliance.",
    description: "Ghana's tax landscape is complex and changes frequently. Our tax team ensures your business remains fully compliant with the Ghana Revenue Authority while implementing legitimate planning strategies to reduce your tax burden.",
    features: ["Corporation tax planning, preparation and filing", "Personal tax planning and self-assessment", "VAT registration, returns and compliance", "PAYE computation and employer compliance", "GRA audit representation and support", "Withholding tax management", "Transfer pricing advisory"],
    pricing: "Included from Starter Essentials plan — GHS 16,500/year",
    accent: "bg-violet-50 border-violet-100",
    number: "03",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Tax documents and financial planning",
  },
];

const plans = [
  {
    name: "Free Introductory",
    price: "GHS 0",
    period: "",
    highlight: false,
    description: "Get started with no commitment. Understand your compliance position.",
    features: ["Basic compliance check", "Initial financial strategy consultation", "Introduction to corporate governance", "Business health snapshot", "Downloadable guide on starting a business", "Overview of statutory filings"],
    cta: "Get started free",
    ctaHref: "/contact",
  },
  {
    name: "Starter Essentials",
    price: "GHS 16,500",
    period: "/ year",
    highlight: true,
    description: "The complete compliance and advisory package for growing SMEs.",
    features: ["Customised financial strategy (once per year)", "Basic compliance monitoring (bi-annually)", "Annual statutory filings", "Annual returns filing", "Basic compliance updates (quarterly)", "Single business valuation report (once per year)", "Basic process review (once per year)"],
    cta: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Growth Booster",
    price: "GHS 24,500",
    period: "/ year",
    highlight: false,
    description: "Everything in Starter Essentials, plus deeper industry-specific support.",
    features: ["All from Starter Essentials", "Industry-specific consultancy (twice per year)", "Monthly compliance monitoring", "Quarterly board meeting preparation", "Value enhancement strategy session", "Quarterly risk management workshops", "Maintenance of corporate records"],
    cta: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Business Pro",
    price: "GHS 32,500",
    period: "/ year",
    highlight: false,
    description: "For established businesses that need proactive compliance and audit support.",
    features: ["All from Growth Booster", "Proactive compliance monitoring (monthly)", "Corporate support and secretarial services", "Audit representation (once per year)", "Basic compliance training for staff (bi-annually)", "Ongoing transactional support (up to 3/year)", "Process optimisation recommendations (bi-annually)"],
    cta: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Elite Advantage",
    price: "GHS 37,500",
    period: "/ year",
    highlight: false,
    description: "Our most comprehensive package for complex organisations.",
    features: ["All from Business Pro", "Continuous corporate support (monthly)", "Custom compliance training for staff (quarterly)", "Enhanced audit representation (up to twice/year)", "Annual re-valuation for business growth tracking", "Continuous monitoring and reporting", "Customised internal control framework"],
    cta: "Get started",
    ctaHref: "/contact",
  },
  {
    name: "Custom Offer",
    price: "Get a quote",
    period: "",
    highlight: false,
    description: "Tailored exclusively for embassies, mining companies, and large corporates.",
    features: ["Fully bespoke engagement scope", "Dedicated relationship manager", "Custom SLA and reporting cadence", "Exclusive features built around your organisation"],
    cta: "Request a quote",
    ctaHref: "/contact",
  },
];

export default function ServicesPage() {
  useScrollReveal();

  return (
    <>
      {/* Header */}
      <section className="bg-hero-gradient pt-16 pb-14">
        <div className="container-erano">
          <div className="max-w-2xl reveal">
            <p className="eyebrow mb-4">What we offer</p>
            <h1 className="heading-display mb-5">
              Three disciplines,<br />
              <em>one trusted firm</em>
            </h1>
            <p className="text-ui-lg text-brand-grey leading-relaxed">
              We combine deep local regulatory knowledge with international
              professional standards across accountancy, business advisory,
              and tax planning.
            </p>
          </div>
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
        <section key={svc.id} id={svc.id} className={`section-gap scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-off-white"}`}>
          <div className="container-erano">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              {/* Content */}
              <div className={i % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <div className="reveal">
                  <p className="eyebrow mb-3">{svc.number} — Service</p>
                  <h2 className="heading-section mb-3">{svc.title}</h2>
                  <p className="font-display text-[1.1rem] italic text-brand-blue-dark mb-4 leading-relaxed">
                    &ldquo;{svc.tagline}&rdquo;
                  </p>
                  <p className="text-ui-base text-brand-grey leading-relaxed mb-6">{svc.description}</p>
                  <ul className="space-y-2.5 mb-7">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
                        <span className="text-ui-base text-brand-grey">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm">
                      Get started <ArrowRight size={15} />
                    </Link>
                    <p className="text-ui-sm text-brand-grey">{svc.pricing}</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                <div className="reveal reveal-delay-2 relative h-80 rounded-2xl overflow-hidden shadow-card-hover">
                  <Image
                    src={svc.image}
                    alt={svc.imageAlt}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section className="section-gap bg-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format&fit=crop"
            alt="Business district"
            fill
            className="object-cover opacity-8"
          />
        </div>
        <div className="container-erano relative z-10">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow text-brand-blue-light mb-3">Pricing</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-white leading-tight mb-4">
              Choose your plan,<br />
              <em className="text-brand-blue-light">start anytime</em>
            </h2>
            <p className="text-ui-base text-white/60 leading-relaxed">
              From a free introductory session to a fully bespoke engagement —
              we have a plan for every stage of your business journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`reveal reveal-delay-${(i % 3) + 1} flex flex-col rounded-2xl p-6 transition-all ${
                  plan.highlight
                    ? "bg-brand-blue border-2 border-brand-blue-light shadow-blue"
                    : "border border-white/10 hover:border-brand-blue/50 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-sans font-medium text-ui-base text-white">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="text-[9px] font-semibold tracking-[0.08em] uppercase bg-white text-brand-blue-dark px-2.5 py-1 rounded-full">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="font-display text-[2rem] font-medium text-white leading-none">{plan.price}</span>
                  {plan.period && <span className="text-ui-sm text-white/50 ml-1">{plan.period}</span>}
                </div>
                <p className="text-ui-sm text-white/55 leading-relaxed mb-5">{plan.description}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-brand-blue-light"}`} />
                      <span className="text-ui-sm text-white/65 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-ui-sm font-medium transition-all ${
                    plan.highlight
                      ? "bg-white text-brand-blue-dark hover:bg-brand-cloud"
                      : "border border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                  }`}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center reveal">
            <p className="text-ui-sm text-white/40">
              All prices are annual. Monthly retainer arrangements available on request. Free initial consultation included.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-hero-gradient">
        <div className="container-erano text-center reveal">
          <p className="eyebrow mb-4">Start today</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Not sure which plan fits?<br />
            <em className="text-brand-blue">Let&apos;s talk it through</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8">
            Book a free 30-minute consultation and we&apos;ll recommend the right plan for your business.
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
