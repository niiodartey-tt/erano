import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Erano Consulting privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <section className="section-gap bg-white">
      <div className="container-erano max-w-2xl">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="heading-display mb-4">Privacy Policy</h1>
        <p className="text-ui-sm text-brand-grey mb-10">Last updated: January 2025</p>

        <div className="prose-erano space-y-8 text-ui-base text-brand-grey leading-relaxed">

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">1. Information we collect</h2>
            <p>When you use our website or contact us, we may collect personal information including your name, email address, phone number, and company details. We collect this information only when you voluntarily provide it through our contact form or client portal.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">2. How we use your information</h2>
            <p>We use the information you provide to respond to your enquiries, deliver the professional services you have engaged us for, send relevant updates about our services, and comply with our legal and regulatory obligations as a licensed accounting firm.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">3. Information sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in delivering our services, subject to strict confidentiality obligations. All client financial information is held in strict confidence in accordance with ICAG professional standards.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">4. Data security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our client portal uses industry-standard encryption and secure authentication.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">5. Your rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal information held by us. To exercise these rights, please contact us at enquiries@eranoconsulting.com.</p>
          </div>

          <div>
            <h2 className="font-sans font-medium text-ui-lg text-brand-charcoal mb-3">6. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:enquiries@eranoconsulting.com" className="text-brand-blue hover:text-brand-blue-dark">enquiries@eranoconsulting.com</a> or visit our <Link href="/contact" className="text-brand-blue hover:text-brand-blue-dark">contact page</Link>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
