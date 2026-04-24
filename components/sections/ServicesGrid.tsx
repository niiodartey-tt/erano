import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id:    "accountancy",
    icon:  "📊",
    title: "Accountancy Services",
    short: "Annual accounts, management accounts, bookkeeping, payroll and SSNIT compliance.",
    features: [
      "Annual accounts preparation",
      "Management accounts",
      "Bookkeeping and ledger management",
      "Payroll processing",
      "SSNIT filing",
    ],
    href: "/services#accountancy",
  },
  {
    id:    "business",
    icon:  "🤝",
    title: "Business Services",
    short: "Start-up advisory, strategic growth planning, business finance and company secretarial.",
    features: [
      "Business registration (RGD)",
      "Strategic growth planning",
      "Business finance advisory",
      "Payroll services",
      "Company secretarial",
    ],
    href: "/services#business",
  },
  {
    id:    "tax",
    icon:  "📋",
    title: "Tax Planning & Advice",
    short: "Corporation tax, personal tax, VAT, PAYE and GRA audit representation.",
    features: [
      "Corporation tax planning & filing",
      "Personal tax and self-assessment",
      "VAT registration & returns",
      "PAYE employer compliance",
      "GRA audit representation",
    ],
    href: "/services#tax",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-gap bg-white">
      <div className="container-erano">

        {/* Header */}
        <div className="max-w-xl mb-12 reveal">
          <p className="eyebrow mb-3">What we offer</p>
          <h2 className="heading-section mb-4">
            Three disciplines,<br />
            <em className="text-brand-blue">one trusted firm</em>
          </h2>
          <p className="text-ui-base text-brand-grey leading-relaxed">
            We combine deep local regulatory knowledge with international
            professional standards to deliver outcomes that matter.
          </p>
        </div>

        {/* Grid — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <div key={svc.id} className={`reveal reveal-delay-${i + 1}`}>
              <Link
                href={svc.href}
                className="group flex flex-col h-full bg-off-white border border-brand-cloud rounded-xl p-6 hover:border-brand-blue-light hover:bg-white hover:-translate-y-1 hover:shadow-card transition-all duration-200"
              >
                <div className="w-10 h-10 bg-brand-cloud rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-brand-blue-xl transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-2">
                  {svc.title}
                </h3>
                <p className="text-ui-sm text-brand-grey leading-relaxed mb-4 flex-1">
                  {svc.short}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ui-sm text-brand-grey">
                      <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-ui-sm font-medium text-brand-blue group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Pricing teaser */}
        <div className="mt-10 p-6 bg-brand-cloud/40 border border-brand-cloud rounded-2xl reveal">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-sans font-medium text-ui-base text-brand-charcoal mb-1">
                Plans from GHS 0 — GHS 37,500 / year
              </p>
              <p className="text-ui-sm text-brand-grey">
                Free introductory session · Starter Essentials · Growth Booster · Business Pro · Elite Advantage · Custom
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-5 py-2.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm whitespace-nowrap flex-shrink-0"
            >
              View all plans <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
