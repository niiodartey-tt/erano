// PLACEHOLDER — all terms text below is placeholder content and must be reviewed by Erano Consulting

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm tracking-wide">Last updated: May 2026</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 space-y-12 text-body leading-relaxed">

          <TermsSection title="1. Acceptance of Terms">
            {/* PLACEHOLDER */}
            <p>
              By accessing or using the Erano Consulting website, client portal, or any of our
              professional services, you agree to be bound by these Terms of Service. If you do not
              accept these terms in full, you must not use our website or services.
            </p>
          </TermsSection>

          <TermsSection title="2. Services Provided">
            {/* PLACEHOLDER */}
            <p>
              Erano Consulting provides professional tax advisory, audit, accounting, bookkeeping,
              and business consultancy services. Any financial tools or calculators on our website
              are for estimation purposes only and do not constitute professional advice. Formal
              advisory is provided exclusively under a signed engagement letter.
            </p>
          </TermsSection>

          <TermsSection title="3. Client Obligations">
            {/* PLACEHOLDER */}
            <p className="mb-3">As a client you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate, complete, and timely information required to deliver agreed services.</li>
              <li>Maintain the confidentiality of your client portal credentials.</li>
              <li>Notify us immediately of any unauthorised access to your account.</li>
              <li>Use our services only for lawful purposes and in compliance with applicable Ghanaian law.</li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Payment Terms">
            {/* PLACEHOLDER */}
            <p>
              Service fees are set out in your engagement letter or invoice. Payment is due within the
              period stated on the invoice. We reserve the right to suspend access to the client portal
              for overdue accounts. All fees are stated in the currency specified in your engagement
              agreement and are non-refundable unless otherwise agreed in writing.
            </p>
          </TermsSection>

          <TermsSection title="5. Confidentiality">
            {/* PLACEHOLDER */}
            <p>
              We treat all client information as strictly confidential in accordance with ICAG
              professional standards and applicable Ghanaian law. We will not disclose your
              confidential information to any third party except as required by law, with your
              written consent, or to sub-processors necessary for service delivery under appropriate
              confidentiality obligations.
            </p>
          </TermsSection>

          <TermsSection title="6. Intellectual Property">
            {/* PLACEHOLDER */}
            <p>
              All content on this website — including text, graphics, logos, reports, and software —
              is the intellectual property of Erano Consulting or its licensors. Reports and documents
              produced specifically for a client are the property of that client upon full payment of
              fees. No other content may be reproduced, distributed, or adapted without our prior
              written consent.
            </p>
          </TermsSection>

          <TermsSection title="7. Limitation of Liability">
            {/* PLACEHOLDER */}
            <p>
              To the fullest extent permitted by Ghanaian law, Erano Consulting shall not be liable
              for any indirect, incidental, or consequential loss arising from your use of our website
              or services. Our total liability for any direct loss arising from a service engagement
              shall not exceed the fees paid for that engagement in the preceding three months.
            </p>
          </TermsSection>

          <TermsSection title="8. Termination">
            {/* PLACEHOLDER */}
            <p>
              Either party may terminate a service engagement by giving written notice as specified in
              the engagement letter. We reserve the right to immediately suspend or terminate your
              portal access if you breach these terms, fail to make payment, or engage in conduct
              that is unlawful or harmful. Termination does not affect any accrued rights or
              obligations of either party.
            </p>
          </TermsSection>

          <TermsSection title="9. Governing Law">
            {/* PLACEHOLDER */}
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              Republic of Ghana. Any dispute arising from or in connection with these terms shall be
              subject to the exclusive jurisdiction of the courts of Ghana. We will endeavour to
              resolve disputes amicably before resorting to formal proceedings.
            </p>
          </TermsSection>

          <TermsSection title="10. Contact Us">
            {/* PLACEHOLDER */}
            <p>For any questions about these Terms of Service, please contact us:</p>
            <address className="not-italic mt-3 space-y-1 text-navy font-medium">
              <p>Email: <a href="mailto:ray.ankrah@eranoconsulting.com" className="text-gold hover:underline underline-offset-2">ray.ankrah@eranoconsulting.com</a></p>
              <p>Address: The Octagon Suite 805, 8th Floor, Accra, Ghana</p>
            </address>
          </TermsSection>

        </div>
      </section>
    </>
  );
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="w-10 h-0.5 bg-gold mb-4" />
      <h2 className="text-lg md:text-xl font-semibold text-navy mb-4">{title}</h2>
      <div className="text-body text-[0.9375rem] leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
