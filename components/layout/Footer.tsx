import Link from "next/link";

const services = [
  { label: "Tax Advisory",         href: "/services#tax"         },
  { label: "Audit & Assurance",    href: "/services#audit"       },
  { label: "Accounting",           href: "/services#accounting"  },
  { label: "Business Consultancy", href: "/services#consultancy" },
];

const company = [
  { label: "About us",  href: "/about"     },
  { label: "Resources", href: "/resources" },
  { label: "Careers",   href: "/careers"   },
  { label: "Contact",   href: "/contact"   },
];

const legal = [
  { label: "Privacy Policy",   href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms"   },
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="container-erano py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display text-[17px] font-medium text-white tracking-tight">
                Erano Consulting
              </span>
            </Link>
            <p className="text-ui-sm text-white/50 leading-relaxed mb-5">
              Professional tax advisory, audit, accounting, and business consultancy services across Ghana.
            </p>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {["ICAG Licensed", "CITG Certified", "GRA Registered"].map((cert) => (
                <span
                  key={cert}
                  className="text-[9px] font-semibold tracking-[0.1em] uppercase text-white/40 border border-white/15 rounded-full px-2.5 py-1"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 className="font-sans text-ui-sm font-medium text-white/60 uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-ui-base text-white/55 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company col */}
          <div>
            <h4 className="font-sans text-ui-sm font-medium text-white/60 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-ui-base text-white/55 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="font-sans text-ui-sm font-medium text-white/60 uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-ui-sm text-white/55">
              <li className="flex gap-2">
                <span className="text-white/30 flex-shrink-0">&#128205;</span>
                <span>GI-449-1284, Accra<br />Greater Accra, Ghana</span>
              </li>
              <li className="flex gap-2">
                <span className="text-white/30 flex-shrink-0">&#128222;</span>
                <span>+233 55 923 3199</span>
              </li>
              <li className="flex gap-2">
                <span className="text-white/30 flex-shrink-0">&#128140;</span>
                <span>enquiries@eranoconsulting.com</span>
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-2 mt-5">
              {[
                { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                { label: "X",        href: "https://x.com",        icon: "𝕏"  },
                { label: "Facebook", href: "https://facebook.com", icon: "f"  },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/8 hover:bg-brand-blue flex items-center justify-center text-white/50 hover:text-white text-ui-sm font-medium transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ui-sm text-white/35">
            &copy; {new Date().getFullYear()} Erano Consulting. All rights reserved.
          </p>
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-ui-sm text-white/35 hover:text-white/70 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}