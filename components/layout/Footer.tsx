import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const services = [
  { label: "Accountancy Services",  href: "/services#accountancy" },
  { label: "Business Services",     href: "/services#business"    },
  { label: "Tax Planning & Advice", href: "/services#tax"         },
];

const company = [
  { label: "About us",   href: "/about"      },
  { label: "Industries", href: "/industries" },
  { label: "Resources",  href: "/resources"  },
  { label: "Careers",    href: "/careers"    },
  { label: "Contact",    href: "/contact"    },
];

const legal = [
  { label: "Privacy Policy",   href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms"   },
];

const certs = [
  { code: "ICAG", note: "Licensed"     },
  { code: "CITG", note: "Certified"    },
  { code: "GRA",  note: "Registered"   },
  { code: "RGD",  note: "Incorporated" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden">

      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />

      <div className="container-erano py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display text-[17px] font-medium text-white tracking-tight">
                Erano Consulting
              </span>
            </Link>
            <p className="text-ui-sm text-white/50 leading-relaxed mb-2">
              Professional accountancy, business advisory, and tax planning services across Ghana.
            </p>
            <p className="font-display text-[13px] italic text-brand-gold mb-5">
              &ldquo;Built for Ghana&apos;s businesses&rdquo;
            </p>
            <div className="flex flex-wrap gap-2">
              {certs.map((cert) => (
                <div key={cert.code} className="border border-brand-gold/30 rounded-lg px-3 py-1.5 text-center hover:border-brand-gold/60 transition-colors">
                  <p className="font-sans font-semibold text-[10px] text-brand-gold tracking-wider">{cert.code}</p>
                  <p className="text-[9px] text-white/35 mt-0.5">{cert.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="font-sans text-ui-sm font-semibold text-white/50 uppercase tracking-[0.12em] mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-ui-base text-white/55 hover:text-brand-gold transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-sans text-ui-sm font-semibold text-white/50 uppercase tracking-[0.12em] mb-5">Company</h4>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-ui-base text-white/55 hover:text-brand-gold transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-sans text-ui-sm font-semibold text-white/50 uppercase tracking-[0.12em] mb-5">Contact</h4>
            <ul className="space-y-4 text-ui-sm text-white/55">
              <li className="flex gap-3 items-start">
                <MapPin size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span>GI-449-1284, Accra<br />Greater Accra, Ghana</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-brand-gold flex-shrink-0" />
                <span>+233 55 923 3199</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-brand-gold flex-shrink-0" />
                <span className="break-all">enquiries@eranoconsulting.com</span>
              </li>
            </ul>
            {/* Social links - SVG icons */}
            <div className="flex gap-2 mt-5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white/50 hover:text-white transition-all">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ui-sm text-white/30">
            &copy; {new Date().getFullYear()} Erano Consulting Ghana. All rights reserved.
          </p>
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-ui-sm text-white/30 hover:text-brand-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}