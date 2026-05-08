# Build Progress — Erano Consulting

> Last updated: May 2026
> Claude updates this file automatically after every group in every sprint.
> This is a build diary — not a planning document.
> For sprint planning see sprint.md. For project details see overview.md.

---

## How Claude Updates This File

After every group Claude adds an entry with:
- Group number and name
- Files created or modified
- Key decisions made and why
- Errors caught and how they were resolved
- Build/TypeScript status

Claude does this automatically — without being asked.

---

## Sprint 1 — Foundation
**Status:** ✅ Complete

**Group 1 — Config and tokens**
- Created `tailwind.config.ts` — design tokens: ink, navy, gold, white, off, line, body
- Created `app/globals.css` — global resets, CSS variables, mobile utility classes
- Created `next.config.mjs` — image domains, eslint.ignoreDuringBuilds: true
- Created `lib/images.ts` — all Cloudinary image and video keys

**Group 2 — Hooks**
- Created `hooks/useScrollReveal.ts` — no-op, Framer Motion handles reveals
- Created `hooks/useCountUp.ts` — used in StatsSection
- Created `hooks/useParallax.ts` — used in Hero

**Group 3 — Shell**
- Created `components/layout/PageTransition.tsx` — fade + translateY
- Created `components/layout/SmoothScroll.tsx` — Lenis 1.2s ease-out
- Created `app/(site)/layout.tsx` — Navbar + PageTransition + Footer + WhatsAppFloat

---

## Sprint 2 — Navbar + Footer
**Status:** ✅ Complete

**Group 1 — Navbar**
- Created `components/layout/Navbar.tsx`
- Decision: Used JS `isMobile` state instead of Tailwind breakpoints — avoids hamburger flash on desktop
- Decision: Lock icon on Client login link
- Decision: "Get started" CTA links to /contact

**Group 2 — Footer + WhatsApp**
- Created `components/layout/Footer.tsx` — 44×44 social icons, brand hover colours, cert badges
- Created `components/layout/WhatsAppFloat.tsx` — 3s delay, pulse ring

---

## Sprint 3 — Home Page
**Status:** ✅ Complete

**Group 1 — Hero + Ticker**
- Created `components/sections/Hero.tsx` — full-bleed video, parallax, Framer Motion stagger
- Created `components/sections/TickerStrip.tsx` — gold marquee
- Updated `app/(site)/page.tsx` — wrapped Hero + TickerStrip in calc(100vh - 72px) flex container
- Bug caught: TickerStrip gap — fixed with calc wrapper (see BUG-002)

**Group 2 — Services + Why**
- Created `components/sections/ServicesStrip.tsx` — 3-col image cards, hover zoom
- Created `components/sections/WhyErano.tsx` — split image/ink, gold left borders

**Group 3 — Stats + Social proof**
- Created `components/sections/StatsSection.tsx` — count-up, gold rule lines
- Created `components/sections/Testimonial.tsx` — auto-rotating crossfade, 7s interval
- Bug caught: animations on mount — fixed with viewport={{ once: true }} (see BUG-003)

**Group 4 — Sectors + CTA**
- Created `components/sections/SectorsGrid.tsx` — 8 sectors, hover gold top border
- Created `components/sections/HomeCTA.tsx` — ink bg, radial glow

---

## Sprint 4 — About Page
**Status:** ✅ Complete

**Group 1 — About page**
- Created `app/(site)/about/page.tsx` — dark parallax hero, team cards, values, credentials
- Created `app/(site)/about/layout.tsx` — SEO metadata
- Decision: Rectangular team photos, not circular — consistent with design system

---

## Sprint 5 — Services, Tools, Contact
**Status:** ✅ Complete

**Group 1 — Services page**
- Created `app/(site)/services/page.tsx` — alternating image/content, pricing grid (3-col, buttons pinned to bottom), QuotesPanel
- Created `app/(site)/services/layout.tsx`

**Group 2 — Tools page**
- Created `app/(site)/tools/page.tsx` — 4 Ghana tax calculators: VAT, PAYE, Corporate Tax, SSNIT
- Created `app/(site)/tools/layout.tsx`

**Group 3 — Contact page + API**
- Created `app/(site)/contact/page.tsx` — 2-col form + sidebar, company + industry + service fields
- Created `app/(site)/contact/layout.tsx`
- Created `app/api/contact/route.ts` — Nodemailer Ethereal stub (temporary — replace Sprint 8)

---

## Sprint 6 — Industries, Resources
**Status:** ✅ Complete

**Group 1 — Industries**
- Created `app/(site)/industries/page.tsx` — 8 sector cards, pain points + approach
- Created `app/(site)/industries/layout.tsx`

**Group 2 — Resources**
- Created `app/(site)/resources/page.tsx` — featured article + 2-col grid + category filter
- Created `app/(site)/resources/layout.tsx`
- Created `app/(site)/resources/[slug]/page.tsx` — 3 seeded articles, "use client"
- Bug caught: generateStaticParams on "use client" page causing build failure — removed (see BUG-004)

---

## Sprint 7 — SEO + Launch
**Status:** ✅ Complete

**Group 1 — SEO**
- Added per-page metadata layout.tsx files for all 6 routes
- Created `next-sitemap.config.js` — sitemap.xml + robots.txt
- Added viewport meta tag to root layout

**Group 2 — Mobile fixes + build**
- Added mobile CSS classes to ServicesStrip — single column on mobile
- Added mobile CSS classes to WhyErano — stacked on mobile
- Added image zoom on hover to services page alternating images
- Build verified clean — 14 pages, zero errors
- Deployed to Vercel — https://erano.vercel.app

---

## Sprint 8 — Portal Foundation
**Status:** 🔄 In progress

*Claude will populate this section during Sprint 8 — after every group automatically.*

---

## Sprint 9 — Client Portal Shell
*Claude will populate this section during Sprint 9.*

---

## Sprint 10 — Legal, Invoice, Payment Flow
*Claude will populate this section during Sprint 10.*

---

## Sprint 11 — Document Management + Notifications
*Claude will populate this section during Sprint 11.*

---

## Sprint 12 — Admin Dashboard
*Claude will populate this section during Sprint 12.*

---

## Sprint 13 — Invoice Generation + Package Management
*Claude will populate this section during Sprint 13.*

---

## Sprint 14 — Account Reactivation + Cron + Hardening
*Claude will populate this section during Sprint 14.*

---

## Sprint 15 — Mobile QA + Pre-Launch
*Claude will populate this section during Sprint 15.*

---

*ApexSource Ventures · Accra, Ghana · May 2026*