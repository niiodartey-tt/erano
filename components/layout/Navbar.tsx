"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home",       href: "/"           },
  { label: "About",      href: "/about"      },
  { label: "Services",   href: "/services"   },
  { label: "Industries", href: "/industries" },
  { label: "Tools",      href: "/tools"      },
  { label: "Resources",  href: "/resources"  },
  { label: "Contact",    href: "/contact"    },
];

const darkHeroPages = ["/", "/about", "/services", "/industries", "/tools", "/resources", "/contact"];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isDarkPage = darkHeroPages.includes(pathname);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solidNav = scrolled || open;
  const lightText = isDarkPage && !solidNav;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          solidNav
            ? "h-[56px] bg-white/95 backdrop-blur-md border-b border-[#e5e8f0] shadow-sm"
            : isDarkPage
              ? "h-[72px] bg-transparent border-b border-white/10"
              : "h-[72px] bg-white border-b border-[#e5e8f0]"
        )}
      >
        <div className="container-erano h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Erano Consulting">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0 shadow-blue">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                "font-display text-[17px] font-medium tracking-tight transition-colors duration-300",
                lightText ? "text-white" : "text-brand-charcoal"
              )}>
                Erano
              </span>
              <span className={cn(
                "font-sans text-[9px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
                lightText ? "text-white/50" : "text-brand-grey"
              )}>
                Consulting
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-ui-base transition-all duration-150 relative",
                    active
                      ? lightText ? "text-white font-medium" : "text-brand-navy font-medium"
                      : lightText ? "text-white/70 hover:text-white" : "text-brand-grey hover:text-brand-charcoal"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <span className={cn(
              "eyebrow border rounded-full px-3 py-1 transition-colors duration-300",
              lightText ? "text-white/50 border-white/20" : "text-brand-grey border-brand-cloud"
            )}>
              ICAG Licensed
            </span>
            <Link
              href="/login"
              className={cn(
                "text-ui-base transition-colors duration-300",
                lightText ? "text-white/70 hover:text-white" : "text-brand-charcoal hover:text-brand-blue"
              )}
            >
              Client login
            </Link>
            <Link
              href="/contact"
              className="bg-brand-gold text-white text-ui-base font-semibold px-4 py-2 rounded-lg hover:bg-amber-600 transition-all shadow-gold btn-shimmer"
            >
              Get started
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              lightText ? "text-white/70 hover:bg-white/10" : "text-brand-grey hover:bg-brand-cloud"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute top-[56px] left-0 right-0 bg-white border-b border-[#e5e8f0] shadow-navy px-4 py-4 flex flex-col gap-1"
            style={{ animation: "fadeUp 0.25s ease forwards" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-ui-base transition-colors flex items-center justify-between",
                  pathname === link.href
                    ? "text-brand-navy font-medium bg-brand-blue-xl"
                    : "text-brand-grey hover:text-brand-charcoal hover:bg-brand-cloud"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                )}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-brand-cloud flex flex-col gap-2">
              <Link
                href="/login"
                className="px-4 py-3 rounded-lg text-ui-base text-brand-charcoal hover:bg-brand-cloud transition-colors"
              >
                Client login
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-lg text-ui-base bg-brand-gold text-white font-semibold text-center hover:bg-amber-600 transition-all btn-shimmer"
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
