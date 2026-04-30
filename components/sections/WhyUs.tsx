import Image from "next/image";

const pillars = [
  { number: "01", title: "Deep local expertise", body: "We understand Ghana's regulatory landscape — GRA, ICAG, SSNIT, PPA — inside out. Our team has navigated every regulatory change so you don't have to." },
  { number: "02", title: "International standards", body: "Our work is conducted to ICAG and international professional standards, giving stakeholders — banks, investors, embassies — full confidence in our outputs." },
  { number: "03", title: "Client-first approach", body: "We don't believe in one-size-fits-all. Every engagement is tailored to your sector, size, and growth stage — with a dedicated consultant who knows your business." },
  { number: "04", title: "Transparent pricing", body: "Free initial consultations, flexible retainer options, and a sliding scale for NGOs and early-stage businesses. No surprise fees, ever." },
  { number: "05", title: "Fast, reliable turnaround", body: "We understand that tax deadlines and audit schedules don't move. Our team delivers accurate, timely work — every time." },
  { number: "06", title: "Proven track record", body: "24 active clients across mining, embassies, law firms, and SMEs. A 98% client retention rate built on trust, accuracy, and consistent results." },
];

export default function WhyUs() {
  return (
    <section className="section-gap bg-brand-charcoal text-white relative overflow-hidden">

      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop"
          alt="Modern office"
          fill
          className="object-cover object-center opacity-15"
        />
      </div>

      <div className="container-erano relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="reveal">
            <p className="eyebrow text-brand-blue-light mb-4">Why Erano</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-white leading-[1.1] mb-6">
              The standard you expect<br />
              <em className="text-brand-blue-light">from a trusted partner</em>
            </h2>
            <p className="text-ui-base text-white/60 leading-relaxed max-w-md mb-8">
              In a market where professional services vary widely, Erano
              is built on a foundation of certification, integrity, and
              measurable client outcomes.
            </p>

            {/* Certification strip */}
            <div className="flex flex-wrap gap-3">
              {[
                { code: "ICAG", name: "Licensed firm" },
                { code: "CITG", name: "Tax practitioner" },
                { code: "RGD",  name: "Incorporated" },
                { code: "GRA",  name: "Registered" },
              ].map((cert) => (
                <div key={cert.code} className="border border-white/15 rounded-lg px-4 py-2.5 text-center">
                  <p className="font-sans font-semibold text-ui-sm text-brand-blue-light">{cert.code}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.number}
                className={`reveal reveal-delay-${(i % 4) + 1} border border-white/10 rounded-xl p-5 hover:border-brand-blue/40 hover:bg-white/3 transition-all`}
              >
                <p className="font-display text-[2rem] font-medium text-white/10 leading-none mb-3">{p.number}</p>
                <h3 className="font-sans font-medium text-ui-base text-white mb-2">{p.title}</h3>
                <p className="text-ui-sm text-white/50 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
