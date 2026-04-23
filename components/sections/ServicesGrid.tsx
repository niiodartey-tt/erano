import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id:    "tax",
    icon:  "📋",
    title: "Tax Advisory",
    short: "Strategic tax planning and full GRA compliance management.",
    features: [
      "VAT registration & filing",
      "PAYE compliance",
      "Corporate tax returns",
      "GRA audit support",
      "Tax planning strategy",
    ],
    href: "/services#tax",
  },
  {
    id:    "audit",
    icon:  "🔍",
    title: "Audit & Assurance",
    short: "Independent audits conducted to ICAG and international standards.",
    features: [
      "Financial statement audit",
      "Internal audit",
      "Compliance audit",
      "Due diligence",
      "Management letter",
    ],
    href: "/services#audit",
  },
  {
    id:    "accounting",
    icon:  "📊",
    title: "Accounting",
    short: "Full outsourced accounting so you focus on growing your business.",
    features: [
      "Bookkeeping",
      "Payroll processing",
      "Financial statements",
      "Management accounts",
      "SSNIT filing",
    ],
    href: "/services#accounting",
  },
  {
    id:    "consultancy",
    icon:  "🤝",
    title: "Business Consultancy",
    short: "Strategic advisory from registration to growth planning.",
    features: [
      "Business registration (RGD)",
      "SSNIT registration",
      "PPA registration",
      "Business plan advisory",
      "Strategic planning",
    ],
    href: "/services#consultancy",
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
            Four disciplines,<br />
            <em className="text-brand-blue">one trusted firm</em>
          </h2>
          <p className="text-ui-base text-brand-grey leading-relaxed">
            We combine deep local regulatory knowledge with international
            professional standards to deliver outcomes that matter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={`reveal reveal-delay-${i + 1}`}
            >
              <Link
                href={svc.href}
                className="group flex flex-col h-full bg-off-white border border-brand-cloud rounded-xl p-6 hover:border-brand-blue-light hover:bg-white hover:-translate-y-1 hover:shadow-card transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-10 h-10 bg-brand-cloud rounded-lg flex items-center justify-center text-xl mb-4 group-hover:bg-brand-blue-xl transition-colors">
                  {svc.icon}
                </div>

                {/* Title */}
                <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-2">
                  {svc.title}
                </h3>

                {/* Short desc */}
                <p className="text-ui-sm text-brand-grey leading-relaxed mb-4 flex-1">
                  {svc.short}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ui-sm text-brand-grey">
                      <span className="w-1 h-1 rounded-full bg-brand-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-ui-sm font-medium text-brand-blue group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal">
          <p className="text-ui-base text-brand-grey mb-4">
            Not sure which service you need?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm"
          >
            Book a free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
