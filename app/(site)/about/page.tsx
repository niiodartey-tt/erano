"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const team = [
  {
    initials: "NA",
    name: "Nana Afua Sarpong",
    role: "Founder & Lead Consultant",
    bio: "Nana Afua founded Erano Consulting with a vision to provide world-class financial advisory services tailored to Ghana's business landscape. With extensive experience across tax, audit, and business advisory, she leads the firm's strategic direction and client relationships.",
    certifications: ["ICAG Licensed", "CITG Certified", "CPA"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&q=80&auto=format&fit=crop",
  },
  {
    initials: "KA",
    name: "Kwame Asante",
    role: "Senior Tax Consultant",
    bio: "Kwame specialises in corporate tax structuring, VAT compliance, and GRA audit representation. He brings over eight years of experience advising SMEs and corporate clients across Ghana's mining and manufacturing sectors.",
    certifications: ["CTP", "ICAG"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80&auto=format&fit=crop",
  },
  {
    initials: "AB",
    name: "Abena Boateng",
    role: "Audit & Assurance Officer",
    bio: "Abena leads our audit engagements, conducting financial statement audits and internal reviews to ICAG and international standards. Her background includes Big 4 experience and a specialisation in the financial services sector.",
    certifications: ["CA", "ICAG"],
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&q=80&auto=format&fit=crop",
  },
];

const registrations = [
  { code: "ICAG", title: "Licensed Accounting Firm", body: "Licensed under the Institute of Chartered Accountants, Ghana Act 2020 (Act 1058). All our accountancy practice is conducted in compliance with ICAG professional standards." },
  { code: "CITG", title: "Certified Tax Practitioners", body: "Our tax consultants hold Certified Tax Practitioner (CTP) certification from the Chartered Institute of Taxation, Ghana — the gold standard for tax practice in Ghana." },
  { code: "RGD",  title: "Registered Company", body: "Incorporated with the Registrar General's Department as a limited liability company. Certificate of incorporation held and in good standing." },
  { code: "GRA",  title: "GRA Registered", body: "Registered with the Ghana Revenue Authority with a valid Tax Identification Number (TIN) and VAT certificate." },
  { code: "SSNIT",title: "SSNIT Compliant", body: "Registered with the Social Security and National Insurance Trust. All employee contributions are filed and paid on time, every month." },
  { code: "PPA",  title: "PPA Registered Supplier", body: "Registered with the Public Procurement Authority, enabling us to participate in and advise on government tender processes." },
];

const values = [
  { title: "Integrity",           body: "We do not compromise on accuracy, honesty, or ethics — ever. Our clients trust us with their most sensitive financial information." },
  { title: "Excellence",          body: "Every deliverable — from a tax return to an audit report — meets the highest professional standard. Good enough is never good enough." },
  { title: "Client focus",        body: "We measure our success by our clients' outcomes. Every engagement is tailored, every recommendation is actionable." },
  { title: "Continuous learning", body: "Ghana's regulatory landscape changes constantly. We invest in keeping our team at the cutting edge of tax law, accounting standards, and business practice." },
];

export default function AboutPage() {
  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-16 pb-14">
        <div className="container-erano">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div className="reveal">
              <p className="eyebrow mb-4">Who we are</p>
              <h1 className="heading-display mb-5">
                A trusted partner for<br />
                <em>Ghanaian businesses</em>
              </h1>
              <p className="text-ui-lg text-brand-grey leading-relaxed mb-8">
                Erano Consulting was founded to provide world-class financial
                and advisory services tailored to Ghana&apos;s unique business
                landscape — combining deep local knowledge with international
                professional standards.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm"
              >
                Work with us <ArrowRight size={15} />
              </Link>
            </div>

            {/* Hero image + founder quote */}
            <div className="reveal reveal-delay-2 space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-card-hover">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
                  alt="Erano Consulting team in a professional meeting"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />
              </div>

              {/* Founder quote card */}
              <div className="bg-white border border-brand-cloud rounded-2xl p-6 shadow-card">
                <p className="font-display text-[1.05rem] font-medium text-brand-charcoal leading-relaxed italic mb-4">
                  &ldquo;We built Erano because Ghanaian businesses deserve the
                  same quality of financial advisory that multinational
                  corporations take for granted.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&q=80&auto=format&fit=crop"
                      alt="Nana Afua Sarpong"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-ui-base text-brand-charcoal">Nana Afua Sarpong</p>
                    <p className="text-ui-sm text-brand-grey">Founder & Lead Consultant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-gap bg-white">
        <div className="container-erano">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow mb-3">Our team</p>
            <h2 className="heading-section mb-4">
              The people behind<br />
              <em className="text-brand-blue">every engagement</em>
            </h2>
            <p className="text-ui-base text-brand-grey leading-relaxed">
              Clients hire people, not firms. Our team is named, credentialled,
              and personally accountable for every engagement we take on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`reveal reveal-delay-${i + 1} bg-off-white border border-brand-cloud rounded-2xl overflow-hidden hover:border-brand-blue-light hover:shadow-card transition-all`}
              >
                {/* Photo */}
                <div className="relative h-52 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-1">{member.name}</h3>
                  <p className="text-ui-sm text-brand-blue mb-3">{member.role}</p>
                  <p className="text-ui-sm text-brand-grey leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert) => (
                      <span key={cert} className="text-[10px] font-semibold tracking-[0.08em] uppercase text-brand-blue-dark bg-brand-blue-xl px-2.5 py-1 rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gap bg-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
            alt="Office background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container-erano relative z-10">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow text-brand-blue-light mb-3">Our values</p>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-white leading-tight">
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className={`reveal reveal-delay-${i + 1} border border-white/10 rounded-xl p-6 hover:border-brand-blue/40 transition-all`}>
                <h3 className="font-sans font-medium text-ui-base text-white mb-3">{v.title}</h3>
                <p className="text-ui-sm text-white/50 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-gap bg-white">
        <div className="container-erano">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="heading-section mb-4">
              Certified, registered,<br />
              <em className="text-brand-blue">and accountable</em>
            </h2>
            <p className="text-ui-base text-brand-grey leading-relaxed">
              Every registration and certification we hold is publicly
              verifiable. We publish them here because transparency
              is the foundation of trust.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {registrations.map((reg, i) => (
              <div key={reg.code} className={`reveal reveal-delay-${(i % 3) + 1} border border-brand-cloud rounded-xl p-6 hover:border-brand-blue-light hover:shadow-card transition-all`}>
                <div className="inline-flex items-center justify-center bg-brand-blue-xl text-brand-blue-dark font-semibold text-ui-sm rounded-lg px-3 py-1.5 mb-4">
                  {reg.code}
                </div>
                <h3 className="font-sans font-medium text-ui-base text-brand-charcoal mb-2">{reg.title}</h3>
                <p className="text-ui-sm text-brand-grey leading-relaxed">{reg.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-gap bg-hero-gradient">
        <div className="container-erano text-center reveal">
          <p className="eyebrow mb-4">Work with us</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Ready to work with a firm<br />
            <em className="text-brand-blue">you can trust?</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8">
            Schedule a free consultation with our team today. No commitment required.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-7 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-blue"
          >
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
