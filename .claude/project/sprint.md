# Sprint Status — Erano Consulting

> Last updated: May 2026
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 9 — Client Portal Shell
**Started:** May 2026
**Target completion:** TBD
**Branch:** `sprint-9`
**Vercel preview:** TBD

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| T011 — Client portal layout (sidebar, header, notification bell placeholder) | `sprint-9` | ✅ Complete |
| T012 — Client dashboard state-gated views (all 6 states) | `sprint-9` | ✅ Complete |
| T013 — Client profile page (edit + change password) | `sprint-9` | ✅ Complete |

### Sprint 9 Definition of Done

- [ ] All tasks merged into `sprint-9` branch
- [ ] Portal layout renders correctly — sidebar, header, notification bell
- [ ] All 6 account states render the correct dashboard view
- [ ] Client profile page — edit fields save to DB
- [ ] Change password flow wired to Supabase
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` passes
- [ ] Tested on 375px, 430px, 768px, 1280px
- [ ] No console errors in browser DevTools
- [ ] Naa reviewed on Vercel preview URL
- [ ] Naa confirmed approval

**Approved by Naa:** [ ]
**Merged to main:** [ ]
**Merged date:** —

---

## Sprint History

### ✅ Sprint 8 — Portal Foundation
**Completed:** May 2026
**Branch:** `sprint-8`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T007 — Resend email integration, Nodemailer deleted
- [x] T008 — 12 React Email templates (WelcomeEmail, PasswordResetEmail, InvoiceReadyEmail, PaymentConfirmedEmail, PaymentRejectedEmail, PaymentProofReceivedEmail, DocumentRequestedEmail, DocumentUploadedEmail, AgreementAcceptedEmail, AccountExpiredEmail, AccountReactivatedEmail, ContactFormEmail)
- [x] T001 — Supabase schema: users, client_profiles, packages, invoices, payments, documents, notifications, audit_log + RLS on all tables
- [x] T002 — Supabase Storage buckets (documents, payment-proofs, invoices) — private, RLS-gated, signed URLs only
- [x] T003 — RBAC middleware protecting /portal/* and /admin/* by role and account_state
- [x] T004 — Login page — email/password, role-based redirect, 5-attempt lockout
- [x] T005 — Password reset flow (request + confirm pages)
- [x] T006 — Force password change on first login (/portal/set-password)
- [x] T031 — Magic link first login — no plain text password ever sent
- [x] T032 — validateState utility — rejects wrong-state API calls with 403
- [x] T033 — Rate limiting (Upstash) + honeypot on onboarding submit
- [x] T039 — Database indexes on all foreign keys and high-frequency query columns
- [x] T009 — Multi-step onboarding form (8 steps including summary + confirmation)
- [x] T010 — Account creation API — auth user, users row, client_profiles row, magic link email

---

### ✅ Sprint 1 — Foundation
**Completed:** 2025

- [x] `tailwind.config.ts` — design tokens locked
- [x] `globals.css` — v3 complete + mobile CSS classes
- [x] `next.config.mjs` — image domains, eslint.ignoreDuringBuilds: true
- [x] `lib/images.ts` — all Cloudinary image + video keys
- [x] `hooks/useScrollReveal.ts` — no-op (Framer Motion handles reveals)
- [x] `hooks/useCountUp.ts`
- [x] `hooks/useParallax.ts`
- [x] `components/layout/PageTransition.tsx` — fade + translateY
- [x] `components/layout/SmoothScroll.tsx` — Lenis 1.2s ease-out
- [x] `app/(site)/layout.tsx` — Navbar + PageTransition + Footer + WhatsApp

---

### ✅ Sprint 2 — Navbar + Footer
**Completed:** 2025

- [x] `components/layout/Navbar.tsx` — white bg, isMobile JS state, lock icon on Client login, gold hover underline, "Get started" CTA → /contact
- [x] `components/layout/Footer.tsx` — ink bg, 4-col grid, 44×44 social icons with brand hover colours, cert badges
- [x] `components/layout/WhatsAppFloat.tsx` — 3s delay, pulse ring

---

### ✅ Sprint 3 — Home Page
**Completed:** 2025

- [x] `app/(site)/page.tsx` — Hero + TickerStrip in calc(100vh - 72px) wrapper
- [x] `components/sections/Hero.tsx` — full-bleed video, parallax, Framer Motion stagger, left-aligned
- [x] `components/sections/TickerStrip.tsx` — gold marquee flush at bottom of viewport
- [x] `components/sections/ServicesStrip.tsx` — 3-col image cards, hover zoom, stagger reveal
- [x] `components/sections/WhyErano.tsx` — split image/ink, 4 gold-bordered statements
- [x] `components/sections/StatsSection.tsx` — count-up, ink bg, gold rule lines
- [x] `components/sections/Testimonial.tsx` — auto-rotating crossfade, dot nav, 7s interval
- [x] `components/sections/SectorsGrid.tsx` — 8 sectors, off-white bg, hover gold top border
- [x] `components/sections/HomeCTA.tsx` — ink bg, radial glow, single gold CTA

---

### ✅ Sprint 4 — About Page
**Completed:** 2025

- [x] `app/(site)/about/page.tsx` — dark parallax hero, team cards, values section, credentials
- [x] `app/(site)/about/layout.tsx` — SEO metadata
- [x] Team cards — rectangular photos, name/role/bio/cert badges
- [x] Values section — ink bg, outlined numbers, gold-bordered grid
- [x] Credentials — horizontal rule separated list

---

### ✅ Sprint 5 — Services, Tools, Contact
**Completed:** 2025

- [x] `app/(site)/services/page.tsx` — dark hero, anchor nav, alternating image/content, pricing grid, QuotesPanel
- [x] `app/(site)/services/layout.tsx` — SEO metadata
- [x] `app/(site)/tools/page.tsx` — 4 Ghana tax calculators (VAT, PAYE, Corporate, SSNIT), tab switcher, dropdown arrows
- [x] `app/(site)/tools/layout.tsx` — SEO metadata
- [x] `app/(site)/contact/page.tsx` — dark hero, 2-col form + sidebar, company + industry + service fields
- [x] `app/(site)/contact/layout.tsx` — SEO metadata
- [x] `app/api/contact/route.ts` — Nodemailer Ethereal stub (to be replaced Sprint 8)

---

### ✅ Sprint 6 — Industries, Resources
**Completed:** 2025

- [x] `app/(site)/industries/page.tsx` — 8 sector cards, pain points + approach, hover gold top border
- [x] `app/(site)/industries/layout.tsx` — SEO metadata
- [x] `app/(site)/resources/page.tsx` — featured article + 2-col grid + category filter
- [x] `app/(site)/resources/layout.tsx` — SEO metadata
- [x] `app/(site)/resources/[slug]/page.tsx` — 3 seeded full articles, "use client"

---

### ✅ Sprint 7.5 — Standards Review (pre-Sprint 8)
**Completed:** May 2026

- [x] F1 — Removed dead useScrollReveal + "use client" from app/(site)/page.tsx — home page is now a server component
- [x] F2 — Removed 14 dead .reveal CSS classes from WhyErano, StatsSection, HomeCTA, SectorsGrid
- [x] F3 — Migrated Google Fonts @import to next/font/google, lang="en-GH", skip nav link, id="main-content" on <main>
- [x] F4 — Security headers in next.config.mjs, picsum.photos removed, syncTouch: false on Lenis
- [x] F5 — Contact API hardened: Zod validation, he sanitization, in-memory rate limiting
- [x] F6 — GH₵ symbol throughout, formatCurrency fixed, @studio-freight/lenis dead dependency removed

---

### ✅ Sprint 7 — SEO + Launch
**Completed:** 2025

- [x] Per-page metadata via layout.tsx for all 6 routes
- [x] `next-sitemap.config.js` — sitemap.xml + robots.txt auto-generated on build
- [x] Viewport meta tag added to root layout
- [x] Mobile responsiveness CSS classes — ServicesStrip single column, WhyErano stacked
- [x] Image zoom on hover — services page alternating images (1.12 scale, 1.2s smooth)
- [x] Build clean — 14 pages, zero errors
- [x] Deployed to Vercel — https://erano.vercel.app

---

## Upcoming Sprints

### ⏳ Sprint 10 — Legal, Invoice, Payment Flow
**Planned start:** After Sprint 9 approval

Planned tasks:
- [ ] T014 — T&Cs agreement gate
- [ ] T015 — Invoice display
- [ ] T016 — Payment timer (server-side, Vercel cron)
- [ ] T017 — Payment proof upload
- [ ] T018 — Payment history view
- [ ] T034 — Duplicate transaction reference check
- [ ] T035 — Signed URL expiry policy
- [ ] T036 — MIME type validation
- [ ] T037 — Unpredictable invoice file paths
- [ ] T038 — Session invalidation on password reset
- [ ] T040 — Non-blocking PDF generation

---

### ⏳ Sprint 11 — Document Management + Notifications
**Planned start:** After Sprint 10 approval

Planned tasks:
- [ ] T025 — In-app notification centre
- [ ] T026 — Admin document request
- [ ] T027 — Client document upload
- [ ] T043 — Supabase Realtime for notification bell

---

### ⏳ Sprint 12 — Admin Dashboard
**Planned start:** After Sprint 11 approval

Planned tasks:
- [ ] T020 — Admin dashboard shell + navigation
- [ ] T021 — Submissions inbox
- [ ] T022 — Client list + filters
- [ ] T023 — Individual client profile (admin view)
- [ ] T019 — Admin payment confirmation + rejection
- [ ] T041 — Admin confirmation modals
- [ ] T042 — CSRF protection
- [ ] T044 — Pagination on client list

---

### ⏳ Sprint 13 — Invoice Generation + Package Management
**Planned start:** After Sprint 12 approval

Planned tasks:
- [ ] T024 — Admin invoice generation (PDF)
- [ ] T028 — Package seeding + display
- [ ] T029 — Package upgrade flow

---

### ⏳ Sprint 14 — Account Reactivation + Cron + Hardening
**Planned start:** After Sprint 13 approval

Planned tasks:
- [ ] T030 — Admin account reactivation
- [ ] T045 — Cron job logging + alert

---

### ⏳ Sprint 15 — Mobile QA + Pre-Launch
**Planned start:** After Sprint 14 approval

Planned tasks:
- [ ] Full screenshot review all pages at 375px and 430px
- [ ] Services page alternating grid — mobile stack fix
- [ ] Contact form grid — mobile stack fix
- [ ] Pricing grid — mobile stack or horizontal scroll
- [ ] Tools calculator grid — mobile stack fix
- [ ] About team grid — mobile stack fix
- [ ] OG image — branded 1200×630
- [ ] Real team photos from client (replace Unsplash placeholders)
- [ ] Real company logo SVG
- [ ] Analytics setup (Plausible or GA4)
- [ ] Full pre-handoff checklist per 17-handoff.md

---

## Do Not Touch During Sprint 9

> These are stable completed components. Do not modify without explicit instruction from Naa.

- `tailwind.config.ts` — design tokens locked
- `app/globals.css` — locked
- `app/(site)/layout.tsx` — locked
- `components/layout/Navbar.tsx` — locked
- `components/layout/Footer.tsx` — locked
- `components/layout/WhatsAppFloat.tsx` — locked
- `components/layout/PageTransition.tsx` — locked
- `components/layout/SmoothScroll.tsx` — locked
- All `components/sections/` files — locked
- All `app/(site)/` pages — locked
- `lib/images.ts` — locked (Cloudinary keys)
- `next-sitemap.config.js` — locked
- `next.config.mjs` — locked unless adding new image domain
- All Sprint 8 files — see do-not-touch.md for full list

---

## Sprint Notes

### Sprint 9 Notes
- All Sprint 8 infrastructure (middleware, validateState, email, storage) is locked — do not modify
- Portal routes live under `app/portal/` — new files only, no modifications to auth pages
- Sidebar and header are new shared components — will be locked after Sprint 9 approval
- All portal data fetches must be server-side — no initial render fetches in client components

---

*ApexSource Ventures · Accra, Ghana · May 2026*