# Sprint Status — Erano Consulting

> Last updated: May 2026
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

No active sprint. Sprint 15 merged to main — awaiting next sprint brief from Naa.

---

## Sprint History

### ✅ Sprint 15 — Mobile QA + Pre-Launch
**Completed:** May 2026
**Branch:** `sprint-15`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] Navbar hamburger — CSS-only (hidden md:flex / flex md:hidden), removed isMobile useState SSR mismatch
- [x] ServicesStrip — repeat(3,1fr) → repeat(auto-fit, minmax(min(100%,320px),1fr))
- [x] WhyErano — activated dead .why-grid / .why-image media query by adding missing classNames
- [x] StatsSection — removed borderRight from stat items (artifact on mobile stacked layout)
- [x] Portal sidebar — conditional z-50 when open, pb-20 md:pb-4 nav padding
- [x] Portal mobile nav — PortalMobileNav.tsx deleted, sidebar hamburger replaces it
- [x] PaymentHistory — overflow-x-auto restored on table wrapper
- [x] ScrollToTop — new component (components/ui/ScrollToTop.tsx), bottom-32 right-6, site layout only
- [x] Pure CSS grid fix — services, contact, tools, resources pages (isMobile useState removed, auto-fit minmax)
- [x] Footer email — overflowWrap: break-word fix
- [x] SERVICES_BUSINESS image — updated to business team photo
- [x] Font cache-bust comment in globals.css
- [x] Coming soon page — card layout (rgba(255,255,255,0.04)), two-line contact format
- [x] Vercel Analytics — @vercel/analytics installed, <Analytics /> in root layout

---

### ✅ Sprint 14 — Account Reactivation + Cron + Hardening
**Completed:** May 2026
**Branch:** `sprint-14`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T030 — Admin account reactivation (reactivate route, ClientProfileHeader button, page modal, agreement-version check)
- [x] T045 — Cron job logging + 25h alert (error_details jsonb, cron-status endpoint)
- [x] T030b — Service expiry reminders (service dates on invoice, ServiceExpiryReminderEmail, check-expiring-services cron, ActiveView banner, ClientsTable badge)
- [x] Fix — Invoice package name always null (Supabase many-to-one join cast via `unknown`)
- [x] Fix — Realtime subscription verified (console.log in NotificationBell INSERT callback)
- [x] Fix — Admin document status badge colours (pending=amber, uploaded=blue, reviewed=green)
- [x] Fix — Admin download error handling (silent return → visible downloadError alert)
- [x] Fix — Admin download button label (date-only → title + date)
- [x] Fix — Client download status-specific error messages (401/404/500/other)

### Sprint 14 Notes
- `supabase/schema.sql` contains the Sprint 14 `ALTER TABLE` migration comment — must be run manually in Supabase Dashboard SQL Editor
- `ADMIN_EMAIL` env var required for cron 25h alert emails
- `NEXT_PUBLIC_WHATSAPP_NUMBER` env var used in service expiry banner and email CTA (fallback: 233559331276)

---

### ✅ Sprint 13 — Invoice Generation + Package Management
**Completed:** May 2026
**Branch:** `sprint-13`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T024 — Admin invoice generation (PDF) — generateInvoicePdf, upload to storage, invoice row insert, state → awaiting_agreement, InvoiceReadyEmail
- [x] T028 — Package seeding + display — /api/admin/packages, PackageUpgradeModal package list, Step6Package display
- [x] T029 — Package upgrade flow — /api/admin/invoices/upgrade, PackageUpgradeModal, ClientProfileHeader "Initiate upgrade" button
- [x] Fix — payment confirm uses correct `confirmed` enum value (was `approved`)
- [x] Fix — payment timer hidden when account is active
- [x] Fix — profile/me package name cast (array → object) so ActiveView shows package correctly
- [x] Fix — portal services page added (`/portal/services`, `/api/portal/services`)
- [x] Fix — admin page centering: all admin pages now use `mx-auto max-w-6xl`; clients/[id] corrected from `max-w-4xl` to `max-w-6xl`
- [x] Fix — portal page centering: invoice loading state and services error state missing `mx-auto max-w-3xl`
- [x] Fix — PaymentHistory table: transaction ref truncated (`max-w-[8rem]`), Receipt column sticky right
- [x] Fix — magic link always uses production callback URL (`erano.vercel.app/auth/callback`), preview URL mismatch resolved
- [x] Fix — MagicLinkRootRedirect recreated as named export, wired to homepage as root hash fallback

---

### ✅ Sprint 12 — Admin Dashboard
**Completed:** May 2026
**Branch:** `sprint-12`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T020 — Admin dashboard shell + navigation (AdminContext, AdminSidebar, AdminHeader, admin layout, admin metrics API + dashboard page)
- [x] T021 — Submissions inbox with state filter tabs + counts (SubmissionsPanel, extended metrics API)
- [x] T022 — Client list with search, state filter, pagination (clients API, ClientsTable, clients page)
- [x] T044 — Pagination on client list (PaginationBar)
- [x] T023 — Individual client profile admin view (clients/[id] GET API, profile page, ClientProfileHeader, ClientInfoSections)
- [x] T019 — Admin payment confirmation + rejection (payments/confirm + reject API routes, ClientPaymentSection)
- [x] T026 — Admin document request (documents/request API, DocumentRequestForm, ClientDocumentsSection)
- [x] T041 — Admin confirmation modals (ConfirmModal with focus trap + reason textarea)
- [x] T042 — CSRF origin protection on all state-mutating admin + portal routes (lib/csrf.ts, 8 routes patched)

---

### ✅ Sprint 11 — Document Management + Notifications
**Completed:** May 2026
**Branch:** `sprint-11`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T025 — In-app notification centre (app/portal/notifications/, /api/portal/notifications/route.ts, /api/portal/notifications/mark-all-read/route.ts, NotificationBell.tsx)
- [x] T027 — Client document upload (app/portal/documents/, /api/portal/documents/requests, /api/portal/documents/upload, /api/portal/documents/download, DocumentRequestCard.tsx)
- [x] T043 — Supabase Realtime for notification bell (NotificationBell.tsx — postgres_changes INSERT subscription)
- [ ] T026 — Admin document request — deferred to Sprint 12
- [ ] T038 — Session invalidation on password reset — deferred to Sprint 12

---

### ✅ Sprint 10 — Legal, Invoice, Payment Flow
**Completed:** May 2026
**Branch:** `sprint-10`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T014 — T&Cs agreement gate (AgreementGate.tsx, /api/portal/agreements/accept, lib/businessDays.ts)
- [x] T015 — Invoice display (app/portal/invoice/, /api/portal/invoice/me)
- [x] T016 — Payment timer — server-side countdown + Vercel cron (PaymentTimer.tsx, /api/cron/check-expired-timers, vercel.json)
- [x] T017 — Payment proof upload (PaymentUploadForm.tsx, /api/portal/payments/upload, /api/portal/payments/timer)
- [x] T018 — Payment history view (PaymentHistory.tsx, /api/portal/payments/history, /api/portal/payments/proof-url)
- [x] T034 — Duplicate transaction reference check (lib/checkDuplicateRef.ts)
- [x] T035 — Signed URL expiry policy (lib/storage.ts — 15-minute signed URLs for payment proofs)
- [x] T036 — MIME type validation (lib/validateMime.ts — magic-byte detection via file-type)
- [x] T037 — Unpredictable invoice file paths (lib/generateStoragePath.ts — UUID-prefixed paths)
- [x] T040 — Non-blocking PDF generation (lib/generateInvoicePdf.ts — pdf-lib, Plus Jakarta Sans TTF, GH₵ support)
- [ ] T038 — Session invalidation on password reset — deferred to Sprint 11

---

### ✅ Sprint 9 — Client Portal Shell
**Completed:** May 2026
**Branch:** `sprint-9`
**Approved by Naa:** [x]
**Merged to main:** [x]
**Merged date:** May 2026

- [x] T011 — Client portal layout (PortalContext, portal layout.tsx, PortalSidebar, PortalHeader, PortalMobileNav)
- [x] T012 — Client dashboard — 6 state-gated views (pending, awaiting_agreement, awaiting_payment, awaiting_confirmation, active, expired) + shared StatusTimeline
- [x] T013 — Client profile page — edit contact details + change password
- [x] Fix — client_profiles RLS bypass via /api/portal/profile/me (service role) — BUG-009

---

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

## Do Not Touch During Sprint 15

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
- All Sprint 8–14 files — see do-not-touch.md for full list

---

## Sprint Notes

### Sprint 13 Notes
- All Sprint 8–12 infrastructure is locked — do not modify
- Magic link redirect URL is hardcoded to `https://erano.vercel.app/auth/callback` in `lib/magicLink.ts` — do not change to NEXT_PUBLIC_SITE_URL
- Admin pages use `mx-auto max-w-6xl`; portal pages use `mx-auto max-w-3xl` or `max-w-2xl` — do not mix

### Sprint 10 Notes
- All Sprint 8 and Sprint 9 infrastructure is locked — do not modify
- New portal routes live under `app/portal/` — no modifications to dashboard, profile, or layout files
- Payment timer logic must be server-side only — never in client state or localStorage
- All Supabase Storage access via signed URLs only — no public bucket URLs
- File uploads validated by MIME type server-side — never by file extension
- Invoice file paths must include a random UUID — never predictable

---

*ApexSource Ventures · Accra, Ghana · May 2026*
