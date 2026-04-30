"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTABanner() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233559331276";
  const message = encodeURIComponent("Hello, I'd like to book a free consultation with Erano Consulting.");
  const waHref = `https://wa.me/${number}?text=${message}`;

  return (
    <section className="section-gap bg-hero-gradient">
      <div className="container-erano">
        <div className="bg-white border border-brand-cloud rounded-2xl p-10 md:p-14 text-center shadow-card reveal">
          <p className="eyebrow mb-4">Ready to get started?</p>
          <h2 className="heading-section mb-4 max-w-lg mx-auto">
            Let&apos;s talk about your<br />
            <em className="text-brand-blue">financial future</em>
          </h2>
          <p className="text-ui-base text-brand-grey max-w-md mx-auto mb-8 leading-relaxed">
            Book a free 30-minute consultation with our team. No commitment
            required — just an honest conversation about your needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-7 py-3.5 rounded-lg hover:bg-brand-blue-dark transition-all shadow-blue hover:-translate-y-0.5"
            >
              Book a consultation <ArrowRight size={16} />
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-cloud text-brand-charcoal font-medium px-7 py-3.5 rounded-lg hover:border-brand-blue-light hover:text-brand-blue-dark transition-all bg-white"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              WhatsApp us now
            </a>
          </div>
          <p className="mt-6 text-ui-sm text-brand-grey/70">
            We respond within one business day · Free initial consultation · No obligation
          </p>
        </div>
      </div>
    </section>
  );
}