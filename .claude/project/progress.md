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

**Sprint 8 — lib/supabase-server.ts**
- Created `lib/supabase-server.ts` — named export `createServerClient()` only, no default
- Initialises Supabase with service role key; `autoRefreshToken: false`, `persistSession: false`
- Guards: throws on missing env vars rather than silently returning a broken client
- Header comment marks file as server-side only — never import in client components
- Resolves the `storage.ts` module error from the previous task
- TypeScript check: clean pass (0 errors)

**Sprint 8 — T002 — lib/storage.ts**
- Created `lib/storage.ts` — server-side only, no "use client"
- Exports: `SIGNED_URL_EXPIRY` constants (15 min / 30 min / 1 hr), `generateSignedUrl`, `getPaymentProofUrl`, `getDocumentUploadUrl`, `getInvoiceUrl`, `uploadFile`
- All signed URLs generated on demand — never stored
- `uploadFile` uses `upsert: false` — no silent overwrites
- Imports `createServerClient` from `@/lib/supabase-server` (not yet created)
- TypeScript: 1 expected error — `Cannot find module '@/lib/supabase-server'` — resolves when supabase-server.ts is created next

**Sprint 8 — T001/T039 — Supabase schema + RLS + indexes**
- Created `supabase/schema.sql` — 401 lines — ready to apply via Supabase Dashboard → SQL Editor
- File contains in order: extensions (pgcrypto), 4 custom ENUM types, 13 tables, 8 indexes (T039), RLS enabled on all 13 tables, 29 RLS policies, 6 package seed rows
- Tables: users, packages, client_profiles, agreement_versions, invoices, agreements, payment_timers, payment_proofs, document_requests, document_uploads, notifications, audit_log, cron_log
- RLS policies: clients read/write own data only; admins access all; service role bypass applies automatically; `system_insert_notifications` policy allows server-side inserts from API routes
- Not executed locally — must be applied in Supabase Dashboard SQL editor

**Standards fix — GH₵ symbol, formatCurrency, dead dependency removal**
- `lib/utils.ts` — `formatCurrency` now outputs `GH₵ 5,000.00` instead of `GHS 5,000`; uses `toLocaleString("en-GH")` with `minimumFractionDigits: 2`; signature unchanged
- `app/(site)/services/page.tsx` — replaced all 5 pricing strings from `"GHS 0/16,500/24,500/32,500/37,500"` to `"GH₵ 0/16,500/24,500/32,500/37,500"`
- Removed `@studio-freight/lenis@^1.0.42` from `package.json` — deprecated package, nothing in the codebase imported from it, `lenis@1.3.23` is the active package
- npm audit: same 5 pre-existing vulnerabilities in `next@14.2.35` — no change, none introduced by this work
- TypeScript check: clean pass
- Build: clean — 14 pages, 0 errors

**Standards fix — contact API route hardening**
- `app/api/contact/route.ts` — added Zod schema validation (`contactSchema`) for all 7 fields; added `he` HTML entity encoding on all user-supplied values before HTML interpolation; added Map-based rate limiter (5 req / IP / 60 min) with per-request expiry cleanup; added company and industry fields to outbound email template (were in form but silently dropped); Nodemailer/sendEmail logic left unchanged; rate limiter cleanup uses `forEach` not `for...of Map.entries()` due to TypeScript tsconfig target constraints
- Installed `he@1.2.0` (HTML entity encoder) and `@types/he` — clean, no new vulnerabilities introduced
- Pre-existing `npm audit` finding: 5 vulnerabilities (1 moderate, 4 high) in `next@14.2.35`, `postcss`, `glob`, `eslint-config-next` — pre-existed before this session; fix requires `npm audit fix --force` which upgrades Next.js to 16+ (breaking change) — deferred to a dedicated upgrade sprint
- TypeScript error during build: `MapIterator` type incompatible with `for...of` under tsconfig — resolved by switching to `Map.forEach()`
- TypeScript check: clean pass
- Build: clean — 14 pages, 0 errors

**Standards fix — security headers, Lenis touch, picsum removal (2 files)**
- `next.config.mjs` — added `headers()` function applying 5 security headers to all routes (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-DNS-Prefetch-Control: on`); removed `picsum.photos` from `remotePatterns`
- `components/layout/SmoothScroll.tsx` — added `syncTouch: false` to Lenis constructor options; note: standard documents `smoothTouch` but Lenis 1.3.x renamed this to `syncTouch` — same behavior, updated name; `syncTouch` defaults to `false` in 1.3.x but now explicit
- TypeScript check: clean pass
- Build: clean — 14 pages, 0 errors

**Standards fix — font, lang, skip navigation (3 files)**
- `app/layout.tsx` — added `Plus_Jakarta_Sans` via `next/font/google` with variable `--font-plus-jakarta-sans`; changed `<html lang="en">` to `<html lang="en-GH">`; added `className={plusJakartaSans.variable}` to both `<html>` and `<body>`; added skip navigation link as first child of `<body>` targeting `#main-content`
- `app/globals.css` — removed Google Fonts `@import` line; updated both `font-family` declarations in `@layer base` (body and headings) to use `var(--font-plus-jakarta-sans)` with `"Plus Jakarta Sans"` as fallback
- `app/(site)/layout.tsx` — added `id="main-content"` to `<main>` element (skip nav target)
- TypeScript check: clean pass
- Build: clean — 14 pages static, sitemap generated; Google Fonts fetch warning at build time is expected (self-hosting happens at Vercel deploy time with network access)

**Standards fix — dead reveal CSS class removal (4 files)**
- `components/sections/WhyErano.tsx` — removed 3 reveal classes: `reveal` (span), `reveal reveal-delay-1` (h2), `reveal reveal-delay-${i+2}` (map div)
- `components/sections/StatsSection.tsx` — removed 4 reveal classes: `reveal` (label div), `reveal reveal-delay-1` (stats row div), `reveal` (gold rule div), `reveal reveal-delay-2` (supporting p)
- `components/sections/HomeCTA.tsx` — removed 5 reveal classes: `reveal` (gold rule div), `reveal reveal-delay-1` (h2), `reveal reveal-delay-2` (subline p), `reveal reveal-delay-3` (CTA div), `reveal reveal-delay-4` (trust note p)
- `components/sections/SectorsGrid.tsx` — removed 2 reveal classes: `reveal` (header div), `reveal reveal-delay-${(i%4)+1}` (map Link)
- Root cause: `.reveal` and `.reveal-delay-*` CSS classes were never defined in globals.css — all 14 usages were dead code producing no animation
- TypeScript check: clean pass (no output)

**Standards fix — app/(site)/page.tsx server component conversion**
- Modified `app/(site)/page.tsx` — removed `"use client"` directive, removed `useScrollReveal` import and call
- `useScrollReveal` confirmed no-op stub — its sole presence forced the home page to be a client component unnecessarily
- All child components that require client-side features already declare `"use client"` themselves — this is valid Next.js 14 App Router pattern
- `calc(100vh - 72px)` wrapper and all component structure left exactly unchanged
- TypeScript check: clean pass (no output)

**Sprint 8 — T003 — middleware.ts (RBAC route protection)**
- Created `middleware.ts` at project root — 5 routing rules for portal/admin/login
- Migrated from deprecated `@supabase/auth-helpers-nextjs` (does not export `createMiddlewareClient` in v0.15.0) to `@supabase/ssr` (already installed at ^0.10.2)
- Uses `createServerClient` from `@supabase/ssr` with `getAll`/`setAll` cookie handlers — required pattern for middleware to propagate token refreshes to the response
- Switched from `getSession()` to `getUser()` — server-validates the JWT rather than trusting the cookie payload
- Rules: unauthenticated → /login; admin on /portal → /admin; client on /admin → /portal/dashboard; authenticated on /login → redirect by role; all other → pass through
- All redirects return `supabaseResponse` (not bare `NextResponse.redirect`) so refreshed session cookies are preserved
- Matcher: `/portal/:path*`, `/admin/:path*`, `/login`
- TypeScript check: clean pass (0 errors)

**Sprint 8 — T032 — lib/validateState.ts (account state validation)**
- Created `lib/validateState.ts` — server-side only utility, called at the start of every portal API route handler
- Exports: `AccountState` union type (6 states), `StateValidationError` class, `requireState` async function, `isStateAllowed` pure helper
- `requireState` queries `users.account_state` via `createServerClient()` (service role); throws typed `StateValidationError` if state not in allowedStates; throws plain `Error` on DB error or missing user
- `isStateAllowed` is a pure synchronous helper — no DB call — for conditional UI/logic checks
- Named exports only, no default export, no `"use client"`
- TypeScript check: clean pass (0 errors)

**Sprint 8 — T007 — Migrate Nodemailer → Resend**
- Installed `resend@6.12.3` (--save-exact); no new vulnerabilities introduced — same 5 pre-existing in next@14
- Created `lib/email.ts` — single email utility for the entire project; server-side only; exports `SendEmailOptions` interface and `sendEmail` async function
- `sendEmail` uses `RESEND_FROM_EMAIL` env var with `onboarding@resend.dev` sandbox fallback — update to verified domain address once client domain is confirmed in Resend dashboard
- Updated `app/api/contact/route.ts` — swapped import from `@/lib/mailer` to `@/lib/email`; admin `to` address now reads from `process.env.ADMIN_EMAIL ?? "admin@eranoconsulting.com"`; rate limiting, Zod validation, and `he` sanitization left unchanged
- Deleted `lib/mailer.ts` — Nodemailer Ethereal stub; scheduled for deletion since Sprint 8 start
- Uninstalled `nodemailer` and `@types/nodemailer` — confirmed absent from `package.json`
- TypeScript check: clean pass (0 errors)
- Build: clean — 14 pages, 0 errors

**Sprint 8 — T033 — lib/ratelimit.ts (Upstash Redis rate limiting)**
- Installed `@upstash/ratelimit` and `@upstash/redis` (--save-exact); no new vulnerabilities introduced
- Created `lib/ratelimit.ts` — server-side only; exports `apiRatelimit` (20 req/10s), `onboardingRatelimit` (5 req/60m), `contactRatelimit` (5 req/60m), and `getClientIp` helper
- Module-level env var guards throw on missing `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- `getClientIp` reads `x-forwarded-for` (first IP only, trimmed) then `x-real-ip` then falls back to `"unknown"`
- Updated `app/api/contact/route.ts` — replaced in-memory Map rate limiter with `contactRatelimit.limit(ip)`; Map declaration and entire IP check block removed; Zod validation and `he` sanitization unchanged
- TypeScript check: clean pass (0 errors)
- Build: clean — 14 pages, 0 errors

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