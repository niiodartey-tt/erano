export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm tracking-wide">Last updated: May 2026</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8 space-y-12 text-body leading-relaxed">

          <PolicySection title="1. Introduction">
            <p>
              Erano Consulting Limited is a professional tax advisory, audit, accounting and business
              consultancy firm registered in Ghana. This Privacy Policy explains how we collect, use
              and protect your personal information when you use our website or client portal.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p className="mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact details</strong> — name, email address, phone number, and company name.</li>
              <li><strong>Business information</strong> — details provided during onboarding including registration number, industry, and address.</li>
              <li><strong>Financial information</strong> — information shared with us for the purpose of professional service delivery.</li>
              <li><strong>Usage data</strong> — pages visited, browser type, and referring URLs collected automatically when you use our website and portal.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver professional advisory, audit, tax and accounting services.</li>
              <li>Communicate with you about your engagement with us.</li>
              <li>Meet our legal and regulatory obligations as an ICAG-licensed firm.</li>
              <li>Improve our services and client portal experience.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Data Sharing">
            <p className="mb-3">
              We do not sell your data. We may share information with trusted technology service
              providers under strict confidentiality obligations:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> — secure cloud database and authentication provider.</li>
              <li><strong>Resend</strong> — transactional email delivery.</li>
            </ul>
            <p className="mt-3">
              We comply with Ghana&apos;s Data Protection Act 2012 (Act 843). No data is shared
              beyond what is necessary for service delivery.
            </p>
          </PolicySection>

          <PolicySection title="5. Data Retention">
            <p>
              Client data is retained for 7 years in accordance with Ghana Revenue Authority
              requirements and professional accounting standards. You may request deletion of your
              data at any time, subject to our legal retention obligations.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights">
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — request that inaccurate or incomplete data be corrected.</li>
              <li><strong>Deletion</strong> — request erasure of your data, subject to legal retention requirements.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:ray.ankrah@eranoconsulting.com" className="text-gold hover:underline underline-offset-2">
                ray.ankrah@eranoconsulting.com
              </a>.
            </p>
          </PolicySection>

          <PolicySection title="7. Contact Us">
            <address className="not-italic space-y-1 text-navy font-medium">
              <p>Email: <a href="mailto:ray.ankrah@eranoconsulting.com" className="text-gold hover:underline underline-offset-2">ray.ankrah@eranoconsulting.com</a></p>
              <p>Address: The Octagon, Suite 805, 8th Floor, Accra, Ghana</p>
              <p>Phone: <a href="tel:+233275819606" className="text-gold hover:underline underline-offset-2">+233 27 581 9606</a></p>
            </address>
          </PolicySection>

          <PolicySection title="8. Changes to This Policy">
            <p>
              We may update this policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. Continued use of our website or
              services after any changes constitutes acceptance of the revised policy.
            </p>
          </PolicySection>

        </div>
      </section>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="w-10 h-0.5 bg-gold mb-4" />
      <h2 className="text-lg md:text-xl font-semibold text-navy mb-4">{title}</h2>
      <div className="text-body text-[0.9375rem] leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
