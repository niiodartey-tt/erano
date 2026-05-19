// PLACEHOLDER — all policy text below is placeholder content and must be reviewed by Erano Consulting

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
            {/* PLACEHOLDER */}
            <p>
              Erano Consulting (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a professional accounting and business
              advisory firm registered in Ghana. This Privacy Policy explains how we collect, use,
              store, and protect personal information when you visit our website or engage our services.
              By using our website or client portal you agree to the practices described in this policy.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            {/* PLACEHOLDER */}
            <p className="mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact details</strong> — name, email address, phone number.</li>
              <li><strong>Business information</strong> — company name, registration number, industry, address.</li>
              <li><strong>Financial information</strong> — information you provide as part of our professional services engagement.</li>
              <li><strong>Usage data</strong> — pages visited, browser type, and referring URLs collected automatically when you use our website.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            {/* PLACEHOLDER */}
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliver the professional services you have engaged us for.</li>
              <li>Respond to your enquiries and communicate about your account.</li>
              <li>Send service-related notifications through your client portal.</li>
              <li>Comply with our legal and regulatory obligations as a licensed accounting firm in Ghana.</li>
              <li>Improve our website and service quality.</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Data Sharing">
            {/* PLACEHOLDER */}
            <p className="mb-3">
              We do not sell, rent, or trade your personal information to any third party.
              We may share data only with trusted processors who help us deliver our services:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Supabase</strong> — secure cloud database and authentication provider.</li>
              <li><strong>Resend</strong> — transactional email delivery.</li>
            </ul>
            <p className="mt-3">
              All processors are contractually bound to handle your data securely and only for the
              purposes we specify.
            </p>
          </PolicySection>

          <PolicySection title="5. Data Retention">
            {/* PLACEHOLDER */}
            <p>
              We retain your personal information for as long as necessary to deliver our services and
              meet our legal obligations. Client financial records are retained in accordance with
              applicable Ghanaian accounting and tax regulations. You may request deletion of your data
              at any time, subject to our legal retention requirements.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights">
            {/* PLACEHOLDER */}
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — request that inaccurate or incomplete data be corrected.</li>
              <li><strong>Deletion</strong> — request erasure of your data, subject to legal retention requirements.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at the details below.</p>
          </PolicySection>

          <PolicySection title="7. Contact Us">
            {/* PLACEHOLDER */}
            <p>
              For any privacy-related questions or to exercise your data rights, please contact us:
            </p>
            <address className="not-italic mt-3 space-y-1 text-navy font-medium">
              <p>Email: <a href="mailto:ray.ankrah@eranoconsulting.com" className="text-gold hover:underline underline-offset-2">ray.ankrah@eranoconsulting.com</a></p>
              <p>Address: The Octagon Suite 805, 8th Floor, Accra, Ghana</p>
            </address>
          </PolicySection>

          <PolicySection title="8. Changes to This Policy">
            {/* PLACEHOLDER */}
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy
              periodically. Continued use of our website or services after any changes constitutes
              your acceptance of the revised policy.
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
