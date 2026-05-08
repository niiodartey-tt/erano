# Sprint Status — Erano Consulting

> Last updated: May 2026
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** Sprint 8 — Portal Foundation
**Started:** May 2026
**Target completion:** TBD
**Branch:** `sprint-8`
**Vercel preview:** TBD

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| T007 — Migrate to Resend, delete Nodemailer | `task/resend-migration` | ⏳ Not started |
| T008 — Email templates (12 templates) | `task/email-templates` | ⏳ Not started |
| T001 — Supabase schema + RLS | `task/supabase-schema` | ⏳ Not started |
| T002 — Supabase Storage buckets + RLS | `task/storage-setup` | ⏳ Not started |
| T003 — RBAC middleware | `task/rbac-middleware` | ⏳ Not started |
| T004 — Login page | `task/login-page` | ⏳ Not started |
| T005 — Password reset flow | `task/password-reset` | ⏳ Not started |
| T006 — First login force password change | `task/set-password` | ⏳ Not started |
| T031 — Magic link first login | `task/magic-link` | ⏳ Not started |
| T032 — Account state validation utility | `task/validate-state` | ⏳ Not started |
| T033 — Rate limiting + honeypot | `task/rate-limit` | ⏳ Not started |
| T039 — Database indexes | `task/db-indexes` | ⏳ Not started |
| T009 — Multi-step onboarding form UI | `task/onboarding-form` | ⏳ Not started |
| T010 — Account creation on form submission | `task/account-creation` | ⏳ Not started |

### Sprint 8 Definition of Done

- [ ] All tasks merged into `sprint-8` branch
- [ ] Nodemailer fully removed — no references remain
- [ ] Resend sending email from contact form end to end
- [ ] All 12 email templates render correctly on mobile + desktop
- [ ] Supabase schema applied — all tables with RLS
- [ ] RLS tested: client A cannot access client B data via direct API call
- [ ] Storage buckets created as private — direct URL returns 403
- [ ] Middleware protecting `/portal/*` and `/admin/*` routes
- [ ] Login page redirects correctly by role
- [ ] Password reset flow working end to end
- [ ] Magic link sent on account creation — no plain text password
- [ ] `validateState` utility rejects wrong-state API calls with 403
- [ ] Rate limiting blocks 6th submission from same IP within 1 hour
- [ ] Honeypot silently rejects bot submissions
- [ ] All DB indexes applied and verified
- [ ] Onboarding form — all 6 steps, validation, summary, confirmation screen
- [ ] Onboarding form fully responsive at 375px and 430px
- [ ] Account created in Supabase on form submission
- [ ] Welcome magic link email sent within 60 seconds of submission
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

### ⏳ Sprint 9 — Client Portal Shell
**Planned start:** After Sprint 8 approval

Planned tasks:
- [ ] T011 — Client portal layout (sidebar, header, notification bell placeholder)
- [ ] T012 — Client dashboard state-gated views (all 6 states)
- [ ] T013 — Client profile page (edit + change password)

---

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

## Do Not Touch During Sprint 8

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

---

## Sprint Notes

### Sprint 8 Notes
- `app/api/contact/route.ts` will be modified in this sprint to replace Nodemailer with Resend — this is the only (site) file touched in Sprint 8
- `lib/mailer.ts` will be deleted in this sprint
- `middleware.ts` is a new root-level file — does not exist yet
- All portal and admin routes are new — no risk of touching existing public site
- Supabase schema must be applied and RLS tested before onboarding form is built
- Magic link replaces plain text password — `must_change_password` flag on `users` table
- Rate limiting requires Upstash Redis — add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to `.env.local` and Vercel before building T033

---

*ApexSource Ventures · Accra, Ghana · May 2026*