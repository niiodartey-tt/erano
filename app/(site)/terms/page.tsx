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
            <p>
              By accessing our website or client portal, you agree to these Terms of Service.
              If you do not agree, please do not use our services.
            </p>
          </TermsSection>

          <TermsSection title="2. Services Provided">
            <p>
              Erano Consulting provides professional tax advisory, audit, accounting and business
              consultancy services. Financial tools on our website are for estimation purposes only
              and do not constitute professional advice. Formal advisory is provided only under a
              signed engagement letter.
            </p>
          </TermsSection>

          <TermsSection title="3. Client Obligations">
            <p className="mb-3">As a client you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete information required to deliver agreed services.</li>
              <li>Maintain confidentiality of your client portal credentials.</li>
              <li>Notify us immediately of any unauthorised access to your account.</li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Payment Terms">
            <p>
              Services are invoiced annually. Payment is due within 5 business days of invoice
              receipt unless otherwise agreed in writing. Late payment may result in suspension of
              portal access and service delivery.
            </p>
          </TermsSection>

          <TermsSection title="5. Confidentiality">
            <p>
              Both parties agree to maintain strict confidentiality of all information shared during
              the engagement. We comply with ICAG professional standards on client confidentiality
              and will not disclose your information except as required by law or with your written
              consent.
            </p>
          </TermsSection>

          <TermsSection title="6. Intellectual Property">
            <p>
              All content on this website — including text, graphics, logos and reports produced
              for clients — is the intellectual property of Erano Consulting or the respective
              client. No content may be reproduced without prior written consent.
            </p>
          </TermsSection>

          <TermsSection title="7. Limitation of Liability">
            <p>
              Financial calculators on this website are for estimation purposes only. Erano
              Consulting is not liable for financial decisions made on the basis of calculator
              outputs. Professional advice is provided only under a formal engagement agreement.
            </p>
          </TermsSection>

          <TermsSection title="8. Termination">
            <p>
              Either party may terminate the engagement with 30 days written notice. Outstanding
              fees remain payable on termination. We reserve the right to terminate immediately
              in cases of material breach.
            </p>
          </TermsSection>

          <TermsSection title="9. Governing Law">
            <p>
              These terms are governed by the laws of the Republic of Ghana. Any disputes shall
              be subject to the exclusive jurisdiction of the courts of Ghana.
            </p>
          </TermsSection>

          <TermsSection title="10. Contact Us">
            <address className="not-italic space-y-1 text-navy font-medium">
              <p>Email: <a href="mailto:ray.ankrah@eranoconsulting.com" className="text-gold hover:underline underline-offset-2">ray.ankrah@eranoconsulting.com</a></p>
              <p>Address: The Octagon, Suite 805, 8th Floor, Accra, Ghana</p>
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
