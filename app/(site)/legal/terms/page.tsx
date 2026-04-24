import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "Erano Consulting terms of service — the terms governing use of our website and services.",
};

export default function TermsPage() {
  return (
    <section className="section-gap bg-white">
      <div className="container-erano max-w-2xl">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="heading-display mb-4">Terms of Service</h1>
        <p className="text-ui-sm text-brand-grey mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-ui-base text-brand-grey leading-relaxed">

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">1. Acceptance of terms</h2>
            <p>By accessing and using the Erano Consulting website and client portal, you accept and agree to be bound by these terms of service. If you do not agree to these terms, please do not use our services.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">2. Services</h2>
            <p>Erano Consulting provides professional tax advisory, audit, accounting, and business consultancy services. The financial tools available on our website are for estimation purposes only and do not constitute professional advice. Formal advisory is provided only under a signed engagement letter.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">3. Client portal</h2>
            <p>Access to our client portal is restricted to registered clients. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorised use of your account.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">4. Intellectual property</h2>
            <p>All content on this website — including text, graphics, logos, and reports produced for clients — is the intellectual property of Erano Consulting or the respective client. No content may be reproduced without prior written consent.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">5. Limitation of liability</h2>
            <p>The financial calculators on this website are provided for estimation purposes only. Erano Consulting shall not be liable for any financial decisions made on the basis of calculator outputs. Professional advice is provided only under a formal engagement agreement.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">6. Governing law</h2>
            <p>These terms are governed by the laws of the Republic of Ghana. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ghana.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">7. Contact</h2>
            <p>For any questions about these terms, contact us at <a href="mailto:enquiries@eranoconsulting.com" className="text-brand-blue hover:text-brand-blue-dark">enquiries@eranoconsulting.com</a> or visit our <Link href="/contact" className="text-brand-blue hover:text-brand-blue-dark">contact page</Link>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
