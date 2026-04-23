"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",      href: "/"          },
  { label: "About",     href: "/about"     },
  { label: "Services",  href: "/services"  },
  { label: "Tools",     href: "/tools"     },
  { label: "Resources", href: "/resources" },
  { label: "Contact",   href: "/contact"   },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "h-[52px] bg-white/92 backdrop-blur-md border-b border-brand-cloud shadow-sm"
            : "h-[64px] bg-white border-b border-brand-cloud"
        )}
      >
        <div className="container-erano h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Erano Consulting — Home"
          >
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[17px] font-medium text-brand-charcoal tracking-tight">
                Erano
              </span>
              <span className="font-sans text-[9px] font-500 tracking-[0.12em] uppercase text-brand-grey">
                Consulting
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-ui-base transition-colors duration-150",
                  pathname === link.href
                    ? "text-brand-blue-dark font-medium bg-brand-blue-xl"
                    : "text-brand-grey hover:text-brand-charcoal hover:bg-brand-cloud"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right — trust badge + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="eyebrow text-brand-grey border border-brand-cloud rounded-full px-3 py-1">
              ICAG Licensed
            </span>
            <Link
              href="/login"
              className="text-ui-base text-brand-charcoal hover:text-brand-blue transition-colors"
            >
              Client login
            </Link>
            <Link
              href="/contact"
              className="bg-brand-blue text-white text-ui-base font-medium px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors shadow-sm"
            >
              Get started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-grey hover:text-brand-charcoal hover:bg-brand-cloud transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <nav className="absolute top-[64px] left-0 right-0 bg-white border-b border-brand-cloud shadow-card-hover px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-ui-base transition-colors",
                  pathname === link.href
                    ? "text-brand-blue-dark font-medium bg-brand-blue-xl"
                    : "text-brand-grey hover:text-brand-charcoal hover:bg-brand-cloud"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t border-brand-cloud flex flex-col gap-2">
              <Link
                href="/login"
                className="px-4 py-3 rounded-lg text-ui-base text-brand-charcoal hover:bg-brand-cloud transition-colors"
              >
                Client login
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-lg text-ui-base bg-brand-blue text-white font-medium text-center hover:bg-brand-blue-dark transition-colors"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
