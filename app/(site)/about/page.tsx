"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/lib/images";

const team = [
  {
    initials: "NA",
    name:     "Nana Afua Sarpong",
    role:     "Founder & Lead Consultant",
    bio:      "Nana Afua founded Erano Consulting with a vision to provide world-class financial advisory services tailored to Ghana's business landscape. With extensive experience across tax, audit, and business advisory, she leads the firm's strategic direction and client relationships.",
    certs:    ["ICAG Licensed", "CITG Certified", "CPA"],
    image:    IMAGES.TEAM_NANA,
  },
  {
    initials: "KA",
    name:     "Kwame Asante",
    role:     "Senior Tax Consultant",
    bio:      "Kwame specialises in corporate tax structuring, VAT compliance, and GRA audit representation. He brings over eight years of experience advising SMEs and corporate clients across Ghana's mining and manufacturing sectors.",
    certs:    ["CTP", "ICAG"],
    image:    IMAGES.TEAM_KWAME,
  },
  {
    initials: "AB",
    name:     "Abena Boateng",
    role:     "Audit & Assurance Officer",
    bio:      "Abena leads our audit engagements, conducting financial statement audits and internal reviews to ICAG and international standards. Her background includes Big 4 experience and a specialisation in financial services.",
    certs:    ["CA", "ICAG"],
    image:    IMAGES.TEAM_ABENA,
  },
];

const values = [
  { title: "Integrity",          body: "We do not compromise on accuracy, honesty, or ethics — ever. Our clients trust us with their most sensitive financial information." },
  { title: "Excellence",         body: "Every deliverable meets the highest professional standard. Good enough is never good enough." },
  { title: "Client focus",       body: "We measure our success by our clients' outcomes. Every engagement is tailored, every recommendation is actionable." },
  { title: "Continuous learning",body: "Ghana's regulatory landscape changes constantly. We invest in keeping our team at the cutting edge." },
];

const registrations = [
  { code: "ICAG", title: "Licensed Accounting Firm",    body: "Licensed under ICAG Act 2020 (Act 1058). All accountancy practice conducted in compliance with ICAG professional standards." },
  { code: "CITG", title: "Certified Tax Practitioners", body: "Our tax consultants hold Certified Tax Practitioner (CTP) certification from the Chartered Institute of Taxation, Ghana." },
  { code: "RGD",  title: "Registered Company",         body: "Incorporated with the Registrar General's Department as a limited liability company. Certificate of incorporation held and in good standing." },
  { code: "GRA",  title: "GRA Registered",             body: "Registered with the Ghana Revenue Authority with a valid TIN and VAT certificate. All tax obligations fully met." },
  { code: "SSNIT",title: "SSNIT Compliant",            body: "Registered with the Social Security and National Insurance Trust. All employee contributions filed and paid on time." },
  { code: "PPA",  title: "PPA Registered Supplier",    body: "Registered with the Public Procurement Authority, enabling us to participate in and advise on government tender processes." },
];

export default function AboutPage() {
  useScrollReveal();
  const parallaxY = useParallax(0.3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 z-0" style={{ transform: parallaxY }}>
          <Image
            src={IMAGES.ABOUT_HERO}
            alt="Professional businesswoman in office"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0f1e]/95 via-[#1a2540]/85 to-[#1a2540]/30" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0a0f1e]/50 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 z-[3] bg-gradient-to-b from-[#0a0f1e]/50 to-transparent pointer-events-none" />

        <div className="container-erano relative z-10 py-24">
          <div className="max-w-2xl">
            <p className="eyebrow-gold mb-5 reveal">Who we are</p>
            <h1 className="heading-display-white mb-6 reveal reveal-delay-1">
              A trusted partner for<br />
              <em>Ghanaian businesses</em>
            </h1>
            <p className="text-ui-lg text-white/65 leading-relaxed mb-8 reveal reveal-delay-2">
              Erano Consulting was founded to provide world-class financial and advisory
              services tailored to Ghana&apos;s unique business landscape — combining deep
              local knowledge with international professional standards.
            </p>
            {/* Founder quote card */}
            <div className="card-glass rounded-2xl p-6 max-w-lg reveal reveal-delay-3">
              <p className="font-display text-[1.1rem] italic text-white/90 leading-relaxed mb-4">
                &ldquo;We built Erano because Ghanaian businesses deserve the same quality
                of financial advisory that multinational corporations take for granted.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-sans font-semibold text-white text-ui-sm">NA</span>
                </div>
                <div>
                  <p className="font-sans font-medium text-ui-sm text-white">Nana Afua Sarpong</p>
                  <p className="text-[10px] text-white/50">Founder & Lead Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 z-10 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Team */}
      <section className="section-gap bg-white">
        <div className="container-erano">
          <div className="max-w-xl mb-14 reveal">
            <p className="eyebrow mb-3">Our team</p>
            <h2 className="heading-section mb-4">
              The people behind<br />
              <em className="text-brand-blue italic">every engagement</em>
            </h2>
            <p className="text-ui-base text-brand-grey leading-relaxed">
              Clients hire people, not firms. Our team is named, credentialled,
              and personally accountable for every engagement we take on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className={`reveal reveal-delay-${i + 1}`}>
                <div className="group bg-white border border-[#e5e8f0] rounded-2xl overflow-hidden hover:border-brand-blue-light hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role} — placeholder, to be replaced with real photo`}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-transparent" />
                    {/* Name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-sans font-medium text-ui-base text-white">{member.name}</p>
                      <p className="text-ui-sm text-brand-gold">{member.role}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-ui-sm text-brand-grey leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.certs.map((cert) => (
                        <span key={cert} className="text-[10px] font-semibold tracking-[0.08em] uppercase text-brand-navy bg-brand-blue-xl px-2.5 py-1 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — dark section with image BG */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.ABOUT_VALUES_BG}
            alt="Modern office background"
            fill
            className="object-cover object-center opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/90" />
        </div>
        <div className="container-erano relative z-10 py-24">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow-gold mb-3">Our values</p>
            <h2 className="heading-section-white">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className={`reveal reveal-delay-${i + 1} border border-white/10 rounded-xl p-6 hover:border-brand-gold/40 hover:bg-white/3 transition-all`}>
                <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={16} className="text-brand-gold" />
                </div>
                <h3 className="font-sans font-medium text-ui-base text-white mb-2">{v.title}</h3>
                <p className="text-ui-sm text-white/50 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-gap bg-white">
        <div className="container-erano">
          <div className="max-w-xl mb-12 reveal">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="heading-section mb-4">
              Certified, registered,<br />
              <em className="text-brand-blue italic">and accountable</em>
            </h2>
            <p className="text-ui-base text-brand-grey leading-relaxed">
              Every registration and certification we hold is publicly verifiable.
              We publish them here because transparency is the foundation of trust.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {registrations.map((reg, i) => (
              <div key={reg.code} className={`reveal reveal-delay-${(i % 3) + 1} border border-[#e5e8f0] rounded-xl p-6 hover:border-brand-blue-light hover:shadow-card transition-all`}>
                <div className="inline-flex items-center justify-center bg-brand-navy text-brand-gold font-bold text-ui-sm rounded-lg px-3 py-1.5 mb-4 tracking-wider">
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
      <section className="section-gap bg-[#f8f9fb]">
        <div className="container-erano text-center reveal">
          <p className="eyebrow mb-4">Work with us</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Ready to work with a firm<br />
            <em className="text-brand-blue italic">you can trust?</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8">
            Schedule a free consultation with our team today. No commitment required.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-gold text-white font-semibold px-8 py-4 rounded-lg hover:bg-amber-600 transition-all btn-shimmer"
          >
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}