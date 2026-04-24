export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-6">
      <div className="text-center max-w-lg">

        <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center mx-auto mb-6 shadow-blue">
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-white stroke-2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="eyebrow mb-4">Erano Consulting</p>

        <h1 className="heading-display mb-5">
          Something great<br />
          <em>is coming soon</em>
        </h1>

        <p className="text-ui-base text-brand-grey leading-relaxed mb-8 max-w-md mx-auto">
          We are putting the finishing touches on our new website.
          In the meantime, reach out to us directly — we respond within one business day.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href="mailto:enquiries@eranoconsulting.com"
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-brand-blue-dark transition-all shadow-sm w-full sm:w-auto justify-center"
          >
            ✉ enquiries@eranoconsulting.com
          </a>
          <a
            href="https://wa.me/233559331276"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-blue-light text-brand-charcoal font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue-dark transition-all bg-white w-full sm:w-auto justify-center"
          >
            💬 WhatsApp us
          </a>
        </div>

        <p className="text-ui-sm text-brand-grey/50 mt-8">
          &copy; {new Date().getFullYear()} Erano Consulting Ghana · Accra, Greater Accra
        </p>
      </div>
    </div>
  );
}