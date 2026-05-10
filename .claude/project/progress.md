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

**Sprint 8 — T004 — Login page**
- Created `app/login/layout.tsx` — standalone layout, no Navbar/Footer; SEO metadata only
- Created `app/login/page.tsx` — "use client"; react-hook-form + zodResolver; createBrowserClient from @supabase/ssr
- Design: off-white full-screen background, white card with shadow-lift, text-based ERANO logo linking to home, gold underline hover animation
- Validation: email + password via Zod; field-level errors with aria-invalid, aria-describedby, role="alert"
- Auth flow: signInWithPassword → getUser → users table role/must_change_password check → redirect by role
- Redirects: admin → /admin; client with must_change_password → /portal/set-password; client → /portal/dashboard
- Lockout: 5 failed attempts triggers 15-minute in-state lockout; same error message for wrong email and wrong password (no account enumeration)
- Accessibility: all inputs have associated labels, aria-invalid, aria-describedby; errors use role="alert"; button disabled + aria states during loading/lockout; focus-visible rings on all interactive elements; min-h-[44px] touch targets
- TypeScript check: clean pass (0 errors)
- Build: clean — 15 pages, 0 errors

**Sprint 8 — T005 — Password reset flow (T038 session invalidation included)**
- Created `app/reset-password/layout.tsx` — standalone, no Navbar/Footer, SEO metadata
- Created `app/reset-password/page.tsx` — email entry form; always shows success message after submit (no account enumeration); `resetPasswordForEmail` redirects to `/reset-password/confirm`; "use client" with react-hook-form + zodResolver
- Created `app/reset-password/confirm/page.tsx` — new password form with confirm field; Zod `.refine` for password match; on mount exchanges PKCE code via `exchangeCodeForSession` (with fallback to `getSession` for implicit flow); token error state shown if verification fails; on success calls `updateUser` then `signOut({ scope: "global" })` (T038 — invalidates all other sessions) then redirects to `/login?reset=success`
- Two separate `createBrowserClient` instances per page (useEffect + onSubmit) — safe because both read/write the same cookie store; avoids module-level init (which runs during SSR)
- Accessibility: `role="status"` on success state, `role="alert"` on token error, `aria-invalid` + `aria-describedby` on all inputs, `role="alert"` + `aria-live` on server errors, `sr-only` loading text during token check
- TypeScript check: clean pass (0 errors)
- Build: clean — 17 pages, 0 errors

**Sprint 8 — T006 — Force password change on first login**
- Created `app/portal/set-password/layout.tsx` — standalone layout, SEO metadata, no Navbar/Footer
- Created `app/portal/set-password/page.tsx` — "use client"; react-hook-form + zodResolver + zod `.refine` for password match; `useWatch` drives live password requirement checklist (CheckCircle2 / Circle from Lucide); on mount verifies auth via `getUser()` and redirects to /login if no session; on submit calls `updateUser` then POSTs to `/api/portal/auth/clear-password-flag` then redirects to `/portal/dashboard`; no back link or escape route
- Created `app/api/portal/auth/clear-password-flag/route.ts` — POST handler; uses aliased `createSSRClient` from `@supabase/ssr` (anon key + read-only cookies) to verify session; uses `createServerClient` from `@/lib/supabase-server` (service role) for DB writes; updates `users.must_change_password = false`; inserts audit_log row (`password_changed_on_first_login`); returns 401 if unauthenticated, 500 on DB error
- Import alias pattern: `import { createServerClient as createSSRClient } from "@supabase/ssr"` avoids naming conflict with the service role client
- Accessibility: `useWatch` live checklist uses `aria-label` list, `aria-describedby="password-reqs"` on input; all errors `role="alert"`; `sr-only` text during session check; `min-h-[44px]` touch targets
- TypeScript check: clean pass (0 errors)
- Build: clean — 19 pages, 0 errors

**Sprint 8 — T031 — lib/magicLink.ts (magic link generation)**
- Created `lib/magicLink.ts` — server-side only; exports `generateMagicLink(email)` as named export
- Uses `supabase.auth.admin.generateLink` (service role required — admin API) with `type: "magiclink"` and `redirectTo: ${NEXT_PUBLIC_SITE_URL}/portal/set-password`
- Throws on missing env var, Supabase error, or missing `action_link` in response
- No default export, no "use client"
- TypeScript check: clean pass (0 errors)

**Sprint 8 — T008 — React Email templates (all 12)**
- Installed `@react-email/components@1.0.12` and `@react-email/render@2.0.8`; packages are functional despite npm registry deprecation warnings on sub-packages (see known-issues.md PENDING entry)
- Created `emails/utils.ts` — shared `baseUrl` constant and `styles` object; email-safe Arial font; 600px container; navy (#0d1b2e) header with gold (#c4973a) border-bottom; grey (#f5f6f8) footer
- Created 12 email templates (named exports, no defaults, no "use client"): `WelcomeEmail`, `InvoiceReadyEmail`, `AgreementAcceptedEmail`, `PaymentProofReceivedEmail`, `PaymentConfirmedEmail`, `PaymentRejectedEmail`, `AccountExpiredEmail`, `AccountReactivatedEmail`, `DocumentRequestedEmail`, `DocumentUploadedEmail`, `PasswordResetEmail`, `ContactFormEmail`
- Each template exports both a `subject` (string or function) and the React component
- `ContactFormEmail` skips empty optional fields (phone, company, industry, service) using conditional JSX — React Email renders truthily/falsily correctly
- Updated `app/api/contact/route.ts` — replaced raw HTML string for admin notification with `await render(ContactFormEmail({...}))`; added `replyTo: email` so replies go directly to the enquirer; imported `ContactFormEmail` and `render`; auto-reply and all other logic unchanged; `he` still used for `sFullName` in auto-reply template
- TypeScript check: clean pass (0 errors)
- Build: clean — 19 pages, 0 errors

**Sprint 8 — T009 — Multi-step onboarding form UI**
- Created `app/onboarding/layout.tsx` — standalone, no Navbar/Footer, SEO metadata
- Created `app/onboarding/page.tsx` — server component, renders OnboardingForm
- Created `components/onboarding/onboarding-types.ts` — full Zod schema, OnboardingFormData type, STEPS array, stepFields map, Package interface
- Created `components/onboarding/form-helpers.tsx` — shared Field, StepHeading, inputCls, selectCls helpers (DRY across all steps)
- Created `components/onboarding/OnboardingHeader.tsx` — sticky header with ERANO wordmark + "Log in" link
- Created `components/onboarding/OnboardingSidebar.tsx` — navy sidebar, step progress dots (bg-gold when active/done, Check icon when done), sticky at top-16, hidden on mobile
- Created `components/onboarding/OnboardingForm.tsx` — orchestrator; useForm + FormProvider; packages fetched on mount via createBrowserClient; step navigation via trigger() on per-step field groups; gold progress bar (3px, dynamic width via inline style); AnimatePresence for step transitions; Back/Continue nav buttons for steps 0-5; footer with privacy/terms links
- Created `components/onboarding/steps/Step1Business.tsx` — legal name, trading name, reg number, biz type select, country, industry select
- Created `components/onboarding/steps/Step2Contact.tsx` — full name, role, email, phone, address textarea
- Created `components/onboarding/steps/Step3Services.tsx` — 8 checkboxes in 2-col grid; Controller-managed array; gold border+bg/5 on checked items; Check icon in box
- Created `components/onboarding/steps/Step4Financial.tsx` — turnover radio cards (4 options), employees number input, lastAudit optional, hasAccountant yes/no cards
- Created `components/onboarding/steps/Step5Compliance.tsx` — 3 yes/no radio groups (GRA, VAT, outstanding obligations)
- Created `components/onboarding/steps/Step6Package.tsx` — package cards fetched from Supabase; skeleton loading state; "Most popular" badge on Growth Booster; custom package shows "Tailored pricing" text; gold border on selected
- Created `components/onboarding/steps/Step7Summary.tsx` — grouped review cards (Business, Contact, Services, Financial, Compliance, Package); Back + Submit buttons; inline error alert; Loader2 spinner on submit
- Created `components/onboarding/steps/Step8Confirmation.tsx` — CheckCircle2 icon (text-gold), heading, thank-you message, navy "What happens next" box with 4 steps
- All step components use useFormContext() — eliminates Control prop phantom-type incompatibility between @hookform/resolvers v5 and react-hook-form v7.73 
- TypeScript fix: z.coerce.number() replaced with z.number({ error: "Required" }) + valueAsNumber: true — coerce changes input type to unknown, breaking zodResolver return type
- Supabase fix: nullsLast → nullsFirst: false (nullsLast not in Supabase SDK types)
- Gold rule respected: 4 contexts only — progress bar, step dots, Continue/Submit button, selected card border+tint
- TypeScript check: clean pass (0 errors)
- Build: clean — 20 pages, /onboarding 9.34 kB first load JS

**Sprint 8 — T010 — Account creation API**
- Created `app/api/onboarding/submit/route.ts` — POST handler; honeypot (logs + returns 200), Upstash rate limiting (5 req / IP / 60 min), Zod validation against `submitSchema` (20 fields, packageId as uuid), duplicate email check via `users` table
- Auth user creation via `supabase.auth.admin.createUser` (email_confirm: true); cascading cleanup on failure — if `users` insert fails: delete auth user; if `client_profiles` insert fails: delete users row then auth user
- Inserts into `users` (id, email, role: "client", account_state: "pending", must_change_password: true) and `client_profiles` (all 20 profile fields mapped from validated body)
- Magic link generation non-fatal — wrapped in try/catch; welcome email non-fatal — wrapped in try/catch; audit_log always written on success
- TypeScript fix: Supabase `PostgrestFilterBuilder` is not a standard Promise — no `.catch()` method; replaced with plain `await` for fire-and-forget cleanup ops
- Lint fix: removed `_request: Request` unused param from `app/api/portal/auth/clear-password-flag/route.ts` (Sprint 8 file — changed to `POST()` with no params)
- Pre-merge checklist result: tsc ✅ clean; build ✅ clean 21 pages; lint ⚠️ 2 errors in locked files (SectorsGrid.tsx, WhyErano.tsx — pre-existing Sprint 1–3 issues, eslint.ignoreDuringBuilds prevents build block); audit ⚠️ 5 pre-existing vulnerabilities in next@14 transitive deps (no new issues introduced)
- TypeScript check: clean pass (0 errors)
- Build: clean — 21 pages, /api/onboarding/submit ƒ Dynamic

**Sprint 8 — Step7Summary edit buttons**
- Modified `components/onboarding/steps/Step7Summary.tsx` — added `onEdit: (step: number) => void` to `Step7Props` interface; updated `Group` internal component to accept `step: number` and `onEdit` props; card header changed from static `<p>` to flex row (`justify-between items-center`) with title on left and Edit button on right; Edit button: `text-xs text-navy hover:underline`, `Pencil` icon (w-3 h-3, `aria-hidden`) inline before "Edit" text; each of the 6 Groups passes `step={0..5}` and `onEdit={onEdit}`
- Modified `components/onboarding/OnboardingForm.tsx` — added `onEdit={setCurrentStep}` prop to Step7Summary render; uses existing `setCurrentStep` state setter directly — no new function needed
- Gold rule unaffected — Pencil icon is navy, Edit button is navy; no new gold usages introduced
- TypeScript check: clean pass (0 errors)
- Build: clean — 21 pages, 0 errors

---

## Sprint 9 — Client Portal Shell

### T011 — Client Portal Layout (Group 1 — context + layout shell)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `context/PortalContext.tsx` — React context providing accountState, userName, userId, isMobileNavOpen, toggleMobileNav. Also exports `isStateAtLeast` helper used by sidebar and mobile nav for visibility rules.
- `app/portal/layout.tsx` — Server component. Uses `@supabase/ssr createServerClient` (anon key + cookies) for JWT validation via `getUser()`, then service role client to fetch users + client_profiles rows (bypasses RLS). Redirects: no session → /login, non-client role → /admin, must_change_password → /portal/set-password (guarded against infinite redirect via `x-invoke-path` header check). Renders PortalProvider wrapping sidebar + header + main + mobile nav.
- `components/portal/layout/PortalSidebar.tsx` — Navy sidebar, 260px desktop, slides in on mobile via isMobileNavOpen context state + backdrop overlay. Erano logo + account state badge (colour-coded by state) at top. 7 nav items with state-gated visibility using isStateAtLeast. Active state: gold left border + text + bg-white/10 tint. Sign out via createBrowserClient → signOut → router.push('/login').
- `components/portal/layout/PortalHeader.tsx` — 64px white header. Hamburger (mobile only) calls toggleMobileNav from context. Page title derived from usePathname() mapped to label. Notification bell placeholder (0 unread). User avatar circle with initials + name + chevron.
- `components/portal/layout/PortalMobileNav.tsx` — Fixed bottom nav, md:hidden. 5 items max (Dashboard, Invoice, Payments, Notifications, Profile) filtered by state visibility. Active: gold icon. Reads accountState from context.

**Key decisions:**
- Two Supabase clients in the layout: SSR client (anon key + cookies) for `getUser()` JWT validation — matches the middleware pattern. Service role client for profile fetch — avoids RLS blocking reads from the browser context.
- `x-invoke-path` header check to prevent infinite redirect loop at `/portal/set-password`. Vercel sets this header; local dev fallback is to skip the redirect (safe since the page has its own auth check).
- `isStateAtLeast` exported from PortalContext rather than duplicated — shared by sidebar and mobile nav.
- Mobile sidebar: slide-in panel (translate-x transition) + backdrop overlay, rather than a separate drawer component. Keeps sidebar as single file.
- `pb-16 md:pb-0` on main content area — reserves space for the fixed mobile bottom nav (64px).

**No errors or regressions.**

### T012 — Client Dashboard (Group 2 — views + dispatcher)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `components/portal/dashboard/StatusTimeline.tsx` — Shared 4-step vertical timeline. Props: `activeStep: 1|2|3|4`. Complete steps: bg-gold circle + Check icon. Active step: bg-navy circle + animate-ping white pulse. Locked steps: bg-off + Lock icon. Connector lines: bg-gold/30 (complete), bg-line (pending).
- `components/portal/dashboard/PendingView.tsx` — Fetches `client_profiles` with `packages(name)` FK join via browser client. Shows company + package name in a card. Skeleton + error states. StatusTimeline activeStep={2}.
- `components/portal/dashboard/AgreementView.tsx` — Static. Gold-bordered banner with FileText icon + copy + Link → /portal/invoice. StatusTimeline activeStep={3}.
- `components/portal/dashboard/PaymentView.tsx` — Fetches `payment_timers` (is_active = true). Live countdown via setInterval/1s. Red banner when < 24h remaining. Navy bank details card (hardcoded Erano bank info). Handles "no active timer" gracefully.
- `components/portal/dashboard/ConfirmationView.tsx` — Fetches latest `payment_proofs` row (ordered by uploaded_at desc). Blue info banner. Payment summary card using formatCurrency from lib/utils. StatusTimeline activeStep={4}.
- `components/portal/dashboard/ActiveView.tsx` — Promise.all: client_profiles+packages, document_requests pending count, notifications unread count, notifications last 5 (NOT audit_log — admin-only RLS). timeAgo() helper. 2×4 stat cards grid (link to relevant portal page each). Recent activity list.
- `components/portal/dashboard/ExpiredView.tsx` — bg-ink dark card. Lock icon text-gold. WhatsApp CTA: border-gold text-gold (no bg-gold fill). Email support link.
- `app/portal/dashboard/page.tsx` — "use client" dispatcher. Reads accountState from usePortal(). Renders one of 6 views via conditional rendering. Personalised greeting for active state.

**Key decisions:**
- Supabase FK join `packages(name)` returns `{ name: any }[]` not `{ name: string } | null` per Supabase's TypeScript inference — cast through `unknown` to fix type mismatch without weakening the interface.
- Used `notifications` table for ActiveView activity feed instead of `audit_log`. The `audit_log` has a `no_client_access` RLS policy — clients get 0 rows. Notifications are client-readable and serve the same UX purpose.
- Gold count respected: ExpiredView uses exactly 4 (Lock icon text-gold, border-gold, text-gold, hover:bg-gold/10 tint). Other views use gold sparingly (AgreementView: 3; PaymentView: 1).
- All files under 150 lines.

**TypeScript:** clean (0 errors — 2 cast-through-unknown fixes for Supabase FK join inference)
**Build:** clean — /portal/dashboard ƒ Dynamic, 6.03 kB first load JS

### T013 — Client Profile Page (Group 3 — profile page + API route)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `app/portal/profile/layout.tsx` — Metadata only: title "My profile — Erano Consulting". Delegates to portal layout.
- `app/portal/profile/page.tsx` — "use client". Parallel Promise.all fetch: auth.getUser() for email + client_profiles for contact fields. Loading skeleton + error state. Passes data to ContactDetailsForm and ChangePasswordForm sub-components separated by a divider.
- `components/portal/profile/ContactDetailsForm.tsx` — react-hook-form + zod. 4 editable fields (Full name, Role, Phone, Address). 2 read-only fields (Business name, Email) in grey bg-off blocks with "(cannot be changed)" label. Submits via PATCH /api/portal/profile/update. Inline success (aria-live polite) and error (aria-live assertive) banners. 150-line compliant.
- `components/portal/profile/ChangePasswordForm.tsx` — react-hook-form + zod. 3 password fields with live requirements checklist (pattern from set-password page). Verifies current password via signInWithPassword before updating. Calls clear-password-flag after success. resets() form on success. 150-line compliant.
- `app/api/portal/profile/update/route.ts` — PATCH. SSR client for auth verification. requireState enforces all states except 'expired'. Zod validates 4 fields. Service role client updates client_profiles. Logs to audit_log. Returns 400/401/403/500 on failure, 200 on success.

**Key decisions:**
- Page extracted into ContactDetailsForm + ChangePasswordForm sub-components — combined page would exceed 150 lines.
- Email passed as prop to ChangePasswordForm (from auth.getUser() in page) — needed for signInWithPassword current-password verification.
- Read-only fields outside the form element — not registered with react-hook-form, not submitted — avoids accidental schema inclusion.
- requireState allowed list: all 5 non-expired states — expired users cannot update their profile.
- Gold count on profile page: 2 button text-gold instances + focus-visible:ring-gold (focus state only). Within 4× limit.
- All aria-live regions use polite for success, assertive for errors — screen readers announce immediately on error, queue on success.

**TypeScript:** clean (0 errors)
**Build:** clean — /portal/profile ƒ Dynamic, 4.58 kB; /api/portal/profile/update ƒ Dynamic

---

## Sprint 10 — Legal, Invoice, Payment Flow

### T036 + T037 — MIME validation + unpredictable storage paths (Group 1 — server utilities)
**Status:** ✅ tsc clean

**Package installed:**
- `file-type@22.0.1` — ESM-only, Node ≥18, detects MIME from file magic bytes. Installed with `--save-exact`. No new vulnerabilities introduced (pre-existing 5 in Next.js 14 transitive deps unchanged). Compatible: `tsconfig.json` uses `"module": "esnext"` + `"moduleResolution": "bundler"`.

**Files created:**
- `lib/validateMime.ts` — `ALLOWED_MIME_TYPES` constant (paymentProofs: jpeg/png/pdf; documentUploads: jpeg/png/pdf/xlsx/docx). `UploadContext` type. `InvalidMimeTypeError` class (stores `detectedType`). `validateMimeType(buffer, context)` — calls `fileTypeFromBuffer`, throws `InvalidMimeTypeError` if type is missing or not in the allowed list for that context. Returns the detected MIME string on success.
- `lib/generateStoragePath.ts` — `generateInvoicePath(clientId, invoiceNumber)` → `invoices/{clientId}/{uuid}-{invoiceNumber}.pdf`. `generatePaymentProofPath(clientId, filename)` → `payment-proofs/{clientId}/{uuid}.{ext}`. `generateDocumentUploadPath(clientId, requestId, filename)` → `document-uploads/{clientId}/{requestId}/{uuid}.{ext}`. All use `crypto.randomUUID()` — unpredictable, non-sequential.

**Key decisions:**
- MIME detection from magic bytes (not file extension) — enforces the "File uploads validated by MIME type server-side — never by extension" rule. A renamed `.exe` → `.pdf` is caught because the magic bytes don't match.
- `ALLOWED_MIME_TYPES as const` — allows the `UploadContext` type to be derived directly, and the `readonly string[]` cast in `validateMimeType` ensures TypeScript doesn't widen the tuple to `string[]`.
- `generateStoragePath` uses `crypto` (built-in Node.js) — no additional dependency needed. UUID prepended on each path means even if an attacker knows the `clientId` and filename, they cannot predict or enumerate paths.
- Both files marked `// SERVER SIDE ONLY` — neither exports anything that would make sense client-side; the comment prevents accidental import.

**TypeScript:** clean (0 errors)

### T015 + T014 + T034 — Invoice display, agreement gate, duplicate ref check (Group 2 — invoice flow)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `lib/businessDays.ts` — `calculatePaymentDeadline(start: Date): Date`. Iterates forward one calendar day at a time, counting only Mon–Fri (skips 0=Sunday and 6=Saturday) until 5 business days have been added. Pure function, no dependencies.
- `lib/checkDuplicateRef.ts` — `checkDuplicateTransactionRef(reference: string): Promise<boolean>`. Service role client. Queries `payment_proofs.transaction_reference` with `.ilike()` for case-insensitive match. Returns true if any existing record matches (duplicate), false if unique. Throws on DB error. Marked SERVER SIDE ONLY.
- `app/api/portal/invoice/me/route.ts` — GET. SSR client for auth. Service role fetches `invoices` (most recent by generated_at, limit 1) for the authenticated user. Joins `packages(name)` via FK. Returns 404 if no invoice found. Returns `{ id, invoice_number, final_price_ghs (Number), status, generated_at, package_name }`.
- `app/api/portal/agreements/accept/route.ts` — POST. Auth check + `requireState(["awaiting_agreement"])`. Gets or seeds `agreement_versions` (seeds version_number=1 with SEED_CONTENT placeholder on first accept). Returns 409 if client already accepted this version. Captures IP from `x-forwarded-for`. Inserts to `agreements`. Creates `payment_timers` row (5 business days via `calculatePaymentDeadline`). Updates `users.account_state → awaiting_payment`. Inserts `notifications` row and `audit_log` row. Sends `AgreementAcceptedEmail` via `lib/email.ts` (non-fatal — email failure does not roll back the state change). Returns `{ success: true, expires_at }`.
- `components/portal/invoice/AgreementGate.tsx` — "use client". Scrollable T&Cs panel (h-96, overflow-y-scroll) with 13 placeholder paragraphs (PLACEHOLDER note in code — client to supply final text). Scroll tracking via `onScroll` + `scrollHeight - scrollTop - clientHeight < 10` threshold. `scrolledToBottom` state gates the accept button via both `disabled` and `aria-disabled`. On accept: POST to agreements/accept, handles 409 as "already accepted" (just refresh), shows inline error on failure. On success: sets `accepted` state + calls `router.refresh()` (re-runs portal layout server component, picks up new accountState from DB). Gold: 1 use (FileText icon). Under 150 lines.
- `app/portal/invoice/layout.tsx` — Metadata: title "My invoice — Erano Consulting".
- `app/portal/invoice/page.tsx` — "use client". Reads `accountState` from `usePortal()`. Parallel fetch: `invoice/me` + `profile/me`. Three early-return states: loading, error, noInvoice (404 from invoice API). Renders AgreementGate above the invoice ONLY when `accountState === "awaiting_agreement"`. Bank details section (`bg-navy` card with hardcoded GCB Bank details) rendered ONLY when `isStateAtLeast(accountState, "awaiting_payment")` — these two sections are mutually exclusive. Print button uses `window.print()` (hidden via `print:hidden`). Uses `<article>` + `<header>` + `<dl>` semantic HTML. Gold: 1 use (Reference value `text-gold` in bank details). Under 150 lines.

**Key decisions:**
- Bank details absent from DOM when state is `awaiting_agreement` — not just hidden with CSS. `isStateAtLeast("awaiting_agreement", "awaiting_payment")` = false, so the block never renders.
- `router.refresh()` after agreement acceptance re-fetches the portal layout's server-side Supabase query for `account_state`, so PortalContext updates without a full page reload.
- 409 on agreement double-submit treated as silent refresh rather than error — if the state already advanced, the page should just update.
- Email send is inside a try/catch after all DB writes complete — a failed email does not roll back the agreement acceptance or state transition.
- `calculatePaymentDeadline` called with `new Date()` at the moment of agreement acceptance — expires_at is always fresh, not based on any client-provided timestamp.
- Bank details hardcoded (GCB Bank placeholder) — no bank_details table in schema; admin will update before launch. Marked with constant names at the top of `page.tsx` for easy replacement.

**TypeScript:** clean (0 errors)
**Build:** clean — /portal/invoice ƒ Dynamic (5.5 kB), /api/portal/agreements/accept ƒ Dynamic, /api/portal/invoice/me ƒ Dynamic. 29 pages total.

### T016 + T017 + T018 — Payment timer, proof upload, payment history (Group 3 — payments flow)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `components/portal/payments/PaymentTimer.tsx` — Display-only countdown. Props: `expiresAt: string`. `useReducedMotion()` from framer-motion: if true, skips `setInterval` and shows a static snapshot. Updates every 60s (not 1s — display is minutes-precision). Three states: ok (>24h, white border), urgent (<24h, amber), expired (red). `role="status"` + `aria-live="polite"` for screen reader announcements.
- `app/api/cron/check-expired-timers/route.ts` — GET handler protected by `Authorization: Bearer CRON_SECRET` header check. Fetches all `payment_timers` where `is_active=true AND expires_at < now()`. Per expired timer: marks timer inactive, sets `account_state → expired`, inserts notification, inserts audit_log (`action: account_expired_by_cron`), sends `AccountExpiredEmail` (non-fatal). Inserts into `cron_log` (job_name, records_processed, errors_encountered, duration_ms). Returns `{ processed, errors }`.
- `vercel.json` — Cron schedule: `/api/cron/check-expired-timers` at `0 6 * * *` (daily 6am UTC).
- `app/api/portal/payments/timer/route.ts` — GET. Auth check. Service role fetches most recent active `payment_timers` row for the user. Returns `{ expires_at: string | null }`.
- `app/api/portal/payments/upload/route.ts` — POST. Auth + `requireState(["awaiting_payment"])`. Parses `request.formData()`. Validates 7 fields via Zod. File validation: instanceof File check, 5MB limit, `validateMimeType("paymentProofs")` for magic-byte MIME check. Duplicate ref check via `checkDuplicateTransactionRef` (409 if duplicate). Generates UUID path via `generatePaymentProofPath`. Uploads via `uploadFile` to `payment-proofs` bucket. Fetches latest invoice_id. Inserts `payment_proofs` row (`file_url = file_path` placeholder — real signed URL generated on access). Updates `account_state → awaiting_confirmation`. Audit logs. Sends `PaymentProofReceivedEmail` to `ADMIN_EMAIL` (non-fatal). Creates admin notification. Returns 201.
- `components/portal/payments/PaymentUploadForm.tsx` — "use client". react-hook-form + zodResolver. 7 fields (amount + currency grid, payment_date, payment_method, bank_name, transaction_reference, notes, file). `valueAsNumber: true` on amount_paid input — avoids zod coerce input-type mismatch with resolver. File input: `z.any().refine()` chain — presence check, 5MB limit, type whitelist. Builds FormData and POSTs to `/api/portal/payments/upload`. Handles 409 duplicate ref with specific message. Shows success state with `CheckCircle` + `router.refresh()`. Under 150 lines.
- `app/api/portal/payments/history/route.ts` — GET. Auth + service role. Returns all `payment_proofs` for user ordered by `uploaded_at DESC`.
- `app/api/portal/payments/proof-url/route.ts` — GET. Auth + ownership check (verifies `file_path` belongs to `client_id = user.id`). Generates 15-minute signed URL via `getPaymentProofUrl`. Returns `{ url }`.
- `components/portal/payments/PaymentHistory.tsx` — "use client". Fetches `/api/portal/payments/history` on mount. Table: date / amount (formatCurrency for GHS, raw USD) / method / transaction ref (monospace) / status badge (amber/green/red) / Download button. Download opens signed URL in new tab via `/api/portal/payments/proof-url?path=...`. Empty state, error state. Under 150 lines.
- `app/portal/payments/layout.tsx` — Metadata: title "Payments — Erano Consulting".
- `app/portal/payments/page.tsx` — "use client". Fetches timer on mount, renders `PaymentTimer` if active. Bank details card (`bg-navy`) shown only when `accountState === "awaiting_payment"` — hardcoded placeholder (clearly marked). `PaymentUploadForm` shown only when `accountState === "awaiting_payment"`. `PaymentHistory` always shown. Under 150 lines.

**Key decisions:**
- `useReducedMotion` from framer-motion (already a project dependency) — if true, skips countdown interval. Timer shows the moment-of-mount value as a static snapshot, which is still accurate enough for a "days remaining" display.
- `valueAsNumber: true` on the number input — cleanest way to use `z.number()` (not `z.coerce.number()`) with react-hook-form + zodResolver. `z.coerce.number()` sets the input type to `unknown`, causing a resolver type mismatch. `valueAsNumber: true` makes react-hook-form register the value as a JS number directly.
- Payment timer fetched client-side via API route (not Supabase browser client) — consistent with the "all portal data via API routes" pattern established for client_profiles reads.
- `file_url = file_path` in payment_proofs — spec explicitly allows this as a placeholder. Signed URLs are generated on-demand per access, not stored. The `proof-url` route enforces ownership before generating.
- Cron secret validated before any DB access — prevents unauthenticated execution of the expiry job.
- Admin notification: looks up first `role = 'admin'` user in users table. Non-fatal — if no admin exists yet, the notification is skipped silently.
- `CRON_SECRET` added to `.env.example` — new env var, existing variables untouched.

**TypeScript:** clean (0 errors — 2 fixes: zod enum `required_error` → `message`, `z.coerce.number()` → `z.number()` + `valueAsNumber: true`)
**Build:** clean — /portal/payments ƒ Dynamic (5.63 kB), /api/cron/check-expired-timers ƒ Dynamic, + 5 portal API routes. 35 pages total.

### T040 — PDF generation utility (Group 4 — server utility)
**Status:** ✅ tsc clean · build clean

**Package installed (previous session):**
- `pdf-lib@1.17.1` — `--save-exact`. Pure JS, no native deps. 5 packages added. No new vulnerabilities (pre-existing 5 in transitive deps unchanged).

**Files created:**
- `lib/generateInvoicePdf.ts` — SERVER SIDE ONLY. Exports `InvoiceData` interface and `generateInvoicePdf(data: InvoiceData): Promise<Uint8Array>`. A4 portrait layout (595.28 × 841.89 pt, 50pt margins). Uses `StandardFonts.Helvetica` + `StandardFonts.HelveticaBold` exclusively (WinAnsi encoding — no Unicode above U+00FF). Layout sections (y-coordinate decremented from top): navy header rect (80pt) with company name + INVOICE label in gold + subtitle in light grey → invoice number + date row → 2-column info block (Billed To / From, side by side) → gold separator line → service table (navy header, 1 data row) → grey total row → conditional bank details block (5 rows) → fixed footer at y=40. `clip(text, maxWidth, font, size)` helper uses `font.widthOfTextAtSize()` for pixel-accurate truncation with "..." suffix. `fmtCurrency(n)` returns "GHC X,XXX.XX" — CRITICAL: "GH₵" (U+20B5) deliberately excluded: Helvetica WinAnsi encoding does not include this character; pdf-lib throws at render time if used. `fmtDate(d)` uses `toLocaleDateString("en-GH", ...)` for Ghanaian date format. Colors defined as `rgb()` constants: NAVY, GOLD, WHITE, GREY, LIGHT.

**Key decisions:**
- "GHC" not "GH₵" — U+20B5 (Ghana Cedi sign) is not in Helvetica's WinAnsi encoding. pdf-lib throws an "Input string contains characters outside WinAnsi encoding" error at runtime if this character is included in any `drawText` call. Using "GHC" is the safe alternative.
- `rgb()` only takes 3 params in pdf-lib (no alpha channel). The header subtitle uses `rgb(0.75, 0.78, 0.84)` as a light-grey approximation rather than white-with-opacity, which is not supported.
- `bankDetails` is optional in `InvoiceData` — the payment section is omitted from the PDF if not provided (e.g., if account is already `active`).
- Standard A4 dimensions and MARGIN=50 chosen for readability with the chosen font sizes (8–16pt range).

**TypeScript:** clean (0 errors)
**Build:** clean — 35 pages, all routes identical to Group 3 output. pdf-lib correctly tree-shaken from client bundles (imported only in server utility).

---

## Sprint 11 — Document Management + Notifications
**Status:** 🔄 In progress

### T025 + T043 — Notification centre + Supabase Realtime (Group 1 — notifications)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `app/api/portal/notifications/route.ts` — GET returns all notifications for authenticated user ordered by `created_at DESC`. PATCH marks a single notification as read (`read = true`) by id, with `eq("user_id", user.id)` ownership check. Both handlers use `getAuthUser()` helper (SSR client + anon key for cookie-based auth) then service role for DB queries. Zod validates PATCH body `{ id: uuid }`.
- `app/api/portal/notifications/mark-all-read/route.ts` — POST marks all `read = false` notifications as read for authenticated user. Auth via SSR client, service role for update.
- `components/portal/notifications/NotificationBell.tsx` — "use client". Bell icon button with unread count badge (gold bg, white text, hidden when 0). Click toggles dropdown panel (w-80, max-h-[400px], right-aligned). Outside-click closes via `useEffect` + `document.addEventListener("mousedown", ...)`. Dropdown: "Notifications" header + "Mark all as read" button (disabled when unread=0). List of notifications — unread: white bg, 3px gold left border, bold text; read: off-white bg, normal weight. `timeAgo()` helper for relative timestamps (just now / Xm / Xh / Xd). Clicking an item PATCHes read state then navigates to `notification.link` if set. Supabase Realtime subscription (T043): `createBrowserClient` from `@supabase/ssr`, channel `portal-notifications-${userId}`, subscribes to INSERT on `notifications` table filtered by `user_id=eq.${userId}` — on new row: prepends to items list. Unsubscribes on unmount via cleanup function. Accessible: `aria-label`, `aria-expanded`, `aria-haspopup="dialog"`, `role="dialog"` on panel. Under 150 lines.
- `app/portal/notifications/layout.tsx` — Metadata: title "Notifications — Erano Consulting".
- `app/portal/notifications/page.tsx` — "use client". Full notifications page. Fetches `/api/portal/notifications` on mount. Loading state: 3-row skeleton. Error state: red alert text. Empty state: Bell icon (Lucide) + "No notifications yet" message. Notification list: rounded-xl border, divide-y rows, same gold left border / unread styling as bell dropdown. "Mark all as read" button shown only when unread > 0. Clicking a row marks as read + navigates to link. Under 150 lines.

**Files modified:**
- `components/portal/layout/PortalHeader.tsx` — Replaced placeholder `<button>` + `Bell` import with `<NotificationBell />` component. Bell and ChevronDown imports updated (Bell removed).

**Key decisions:**
- Schema uses `read` (not `is_read`) with no `read_at` column — discovered from schema.sql before writing; PATCH and mark-all-read use `{ read: true }`.
- Realtime channel named `portal-notifications-${userId}` — unique per user per tab, prevents cross-user event delivery and multiple-subscription conflicts on same channel name.
- `on<Notification>(...)` generic on the Realtime `.on()` call — types `payload.new` correctly as `Notification` without an unsafe double-cast.
- `timeAgo` function duplicated between NotificationBell and NotificationsPage — avoids adding a file for a 7-line utility; acceptable duplication at this scale.
- PortalHeader is a locked Sprint 9 file but explicitly modified per Naa's instruction — minimum change (swap one button for one component, update imports).
- Unread badge hidden via conditional render (not CSS visibility) when count is 0 — removes the element from DOM entirely for screen readers.

**TypeScript:** clean (0 errors)
**Build:** clean — /portal/notifications ƒ Dynamic (2.3 kB), /api/portal/notifications ƒ Dynamic, /api/portal/notifications/mark-all-read ƒ Dynamic. 38 pages total.

### T027 — Client document upload system (Group 2 — documents)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `app/api/portal/documents/requests/route.ts` — GET. Auth via SSR client, service role for DB. Fetches `document_requests` with nested `document_uploads(id, file_path, uploaded_at)` via Supabase PostgREST embedding. Filtered to `client_id = user.id`, ordered `created_at DESC`. Returns `{ requests: [] }`.
- `app/api/portal/documents/upload/route.ts` — POST. Auth + `requireState(["active"])` — document uploads only for active accounts. Validates `requestId` as UUID via Zod. IDOR check: queries `document_requests WHERE id = requestId AND client_id = user.id` — returns 404 if not found. File validation: 10MB max, `validateMimeType(arrayBuffer, "documentUploads")` for magic-byte MIME check (PDF/JPEG/PNG/XLSX/DOCX). Generates path via `generateDocumentUploadPath(user.id, requestId, filename)`. Uploads to "document-uploads" bucket. Inserts `document_uploads` row (`file_url = file_path`). Updates `document_requests.status → uploaded`. Audit logs `document_uploaded`. Admin notification + `DocumentUploadedEmail` (non-fatal). Returns 201.
- `app/api/portal/documents/download/route.ts` — GET with `?path=` query param. Auth. IDOR check: queries `document_uploads WHERE file_path = path AND client_id = user.id`. Generates 30-minute signed URL via `getDocumentUploadUrl(path)`. Returns `{ signedUrl }`.
- `components/portal/documents/DocumentRequestCard.tsx` — "use client". Props: `request`, `uploads[]`, `onUploaded()`. Shows category badge (grey pill), status badge (amber/blue/green), title, description, date. If status is pending: file input (`accept=".pdf,.jpg,.jpeg,.png,.xlsx,.docx"`) + "Upload document" button (disabled when no file or loading). If status is uploaded/reviewed: uploaded file row with filename + upload date + Download button (fetches signed URL, opens in new tab). Inline error display for both upload and download failures. Calls `onUploaded()` on successful upload for parent to refresh. Under 150 lines.
- `app/portal/documents/layout.tsx` — Metadata: title "My Documents — Erano Consulting".
- `app/portal/documents/page.tsx` — "use client". Fetches `/api/portal/documents/requests` on mount via `useCallback` (stable ref passed to `useEffect` and as `onUploaded` to each card). Loading state: 3-row skeleton. Error state: red alert. Empty state: `FolderOpen` icon + "No document requests yet" message. Renders `DocumentRequestCard` per request, passes `req.document_uploads` from nested select. Under 150 lines.

**Key decisions:**
- `document_uploads` fetched as nested relation in a single query (not a separate round-trip) — Supabase PostgREST embedding via `document_uploads(id, file_path, uploaded_at)` in the select string.
- IDOR prevention on both upload and download: upload checks `document_requests.client_id`, download checks `document_uploads.client_id` — neither can be exploited by guessing a UUID.
- `requireState(["active"])` server-side — portal layout already gates `/portal/documents` to active users, but API route re-validates independently per security standard.
- `useCallback` on `fetchRequests` in the documents page — gives a stable function reference so it can be safely passed as `onUploaded` prop and used in the `useEffect` dependency array without causing re-fetch loops.
- File display name: `latestUpload.file_path.split("/").pop()` — shows the UUID filename (e.g., `a1b2c3.pdf`). Original filename not stored in DB; this is the best available display without schema changes.

**TypeScript:** clean (0 errors)
**Build:** clean — /portal/documents ƒ Dynamic (3.04 kB), + 3 API routes. 42 pages total.

---

## Sprint 12 — Admin Dashboard

### T020 — Admin shell, navigation, and dashboard (Group 1 — layout + context + metrics)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `context/AdminContext.tsx` — "use client". `AdminContextValue` interface: `adminId`, `adminName`. `AdminProvider` passes both via React Context. `useAdmin()` hook throws if called outside provider. Mirrors PortalContext pattern with no state — admin context is simpler (no mobile nav toggle needed since admin is desktop-first).
- `app/api/admin/metrics/route.ts` — GET. SSR client (`createSSRClient` from `@supabase/ssr`) for `auth.getUser()`. Service role client (`createServerClient` from `@/lib/supabase-server`) for all DB ops. Role check: queries `users.role` for the authenticated user, returns 403 if not admin. 4 count queries run in `Promise.all` using `{ count: "exact", head: true }`: total clients (role=client), pending_submissions (state=pending), awaiting_confirmation, active_clients. Plus a 5th query for recent submissions: selects from `users` with nested `client_profiles(contact_name, legal_name, industry, packages(name))` via PostgREST embedding, filtered to `role=client`, ordered by `created_at DESC`, limit 10. Returns `{ metrics: {...}, submissions: [...] }`.
- `components/admin/layout/AdminSidebar.tsx` — "use client". Desktop-only (`hidden md:flex`), fixed 260px, navy bg — mirrors PortalSidebar. 4 nav items: Inbox (/admin, exact match), All Clients (/admin/clients), Invoice Manager (/admin/invoices), Document Manager (/admin/documents). Active item: gold left border + gold text + white/10 bg. Pending count badge on Inbox link: gold bg, navy text, visible only when `pendingCount > 0`. Sign out button (LogOut icon) at bottom. No mobile drawer — admin is desktop-first per project spec.
- `components/admin/layout/AdminHeader.tsx` — "use client". Reads `adminName` from `useAdmin()`, derives page title from `usePathname()` via `PAGE_TITLES` map (same pattern as PortalHeader). Shows `<h1>` page title + admin avatar button (initials in navy circle, full name, ChevronDown). No notification bell — admin sees client activity in Inbox. No hamburger — admin has no mobile nav.
- `app/admin/layout.tsx` — Server component. SSR client verifies authenticated user; redirects to `/login` if no session. Service role client fetches `users.role` + `users.email` for the user; redirects to `/login` if no row, `/portal/dashboard` if role is not admin. `adminName` derived from `user.user_metadata.full_name ?? users.email ?? "Admin"`. Fetches `pendingCount` (pending client accounts) and passes to `AdminSidebar` as a prop for the inbox badge. Wraps `AdminProvider` → sidebar + header + `<main id="main-content">`. Middleware already covers `/admin/:path*` — no changes to `middleware.ts` needed.
- `app/admin/page.tsx` — "use client". Fetches `/api/admin/metrics` on mount (loading: 4 skeleton cards + 1 skeleton block; error: red alert; success: metrics + table). 4 metric cards in `grid-cols-2 lg:grid-cols-4`: Total Clients (Users icon), Pending Submissions (Clock icon, gold accent if >0), Awaiting Confirmation (CreditCard icon, gold accent if >0), Active Clients (CheckCircle icon). Recent submissions table (last 10 clients): columns Client / Business / Industry / Package / State badge / Date / View link. Responsive table: Business + Date hidden below md, Industry + Package hidden below lg. State badges follow same colour map as portal sidebar (gray/blue/amber/purple/green/red per account_state). Under 150 lines.

**Key decisions:**
- `hidden md:flex` on `AdminSidebar` — admin portal is desktop-first; no mobile drawer needed or built per project spec ("Mobile: hidden"). The header and content remain accessible on mobile (header renders on all sizes, main content is scrollable), but sidebar nav requires a desktop viewport.
- `pendingCount` fetched server-side in layout.tsx and passed as prop to sidebar — avoids a separate client-side fetch in the sidebar; count refreshes on every navigation (server render). Sidebar is static after render; no Realtime needed at this stage.
- Middleware already covers `/admin/:path*` (confirmed at line 88 of `middleware.ts`). Layout.tsx adds a second layer of defence using the service role client (bypasses RLS for reliable role read). Double-check is intentional per security standard.
- PostgREST nested embed `client_profiles(contact_name, ..., packages(name))` — `client_profiles` FK on `user_id` → `users.id` (one-to-one), `packages` FK on `package_id` → `packages.id` (one-to-one). Both auto-resolved by Supabase PostgREST. Returns objects (not arrays) for each nested resource.
- Gold count on admin dashboard page: (1) pending card value text-gold, (2) awaiting_confirmation card value text-gold. Maximum 2 at once (can't have both >0 simultaneously in practice); design tokens within the 4× per page rule.

**TypeScript:** clean (0 errors)
**Build:** clean — /admin ƒ Dynamic (3.05 kB), /api/admin/metrics ƒ Dynamic. 44 pages total.

---

### T021 + T022 + T044 — Submissions inbox tabs, client list, pagination (Group 2 — inbox + clients)
**Status:** ✅ tsc clean · build clean

**Files modified:**
- `app/api/admin/metrics/route.ts` — Extended Promise.all from 5 to 8 queries. Added `byState(state)` helper to DRY the count queries. Now returns `state_counts` object alongside existing `metrics`: all 6 account states keyed (`pending`, `awaiting_agreement`, `awaiting_payment`, `awaiting_confirmation`, `active`, `expired`). Backward-compatible — existing `metrics` shape unchanged.
- `app/admin/page.tsx` — Replaced inline submissions table with `<SubmissionsPanel>`. Added `stateCounts` to state. Reads `json.state_counts` from metrics response. Page is now 98 lines (under 150).

**Files created:**
- `components/admin/inbox/SubmissionsPanel.tsx` — "use client". Props: `submissions[]`, `stateCounts`. `activeTab` state (default "all"). Tab bar with 7 tabs (All + 6 states); each tab has count badge from `stateCounts` (All = sum of all state counts). Active tab: gold bottom border + gold text. Clicking tab filters `submissions` array locally (last 10 are already fetched). "View all pending" link → `/admin/clients?state=pending`. Filtered table mirrors the original inbox table. Under 150 lines.
- `app/api/admin/clients/route.ts` — GET. SSR client for auth, service role for DB. Admin role check returns 403 if not admin. Query params: `page` (int ≥0, default 0), `state` (validated against VALID_STATES Set), `search` (trimmed string). Two-step search: if search is provided, first queries `client_profiles` via `.or("legal_name.ilike.%X%,contact_name.ilike.%X%")` to get matching user_ids; returns early with empty result if 0 matches. Main query: `users` with nested `client_profiles(contact_name, legal_name, packages(name))`, filtered by role=client + optional state + optional user_ids, ordered by `created_at DESC`, paginated with `.range(page*20, (page+1)*20-1)`, `{ count: "exact" }` for total. Returns `{ clients, total, page, pageSize: 20 }`.
- `components/admin/clients/ClientsTable.tsx` — "use client". Exports `Client` interface (reused by `page.tsx` via named import). Loading state: 5-row skeleton with `animate-pulse`. Empty state: "No clients match your search." Table: 5 columns (Client name / Business name / Package hidden lg / State badge / Date joined hidden md / View link). State badge uses same colour map as portal. Under 150 lines.
- `components/admin/clients/PaginationBar.tsx` — "use client". Props: `page, total, pageSize, onPrev, onNext`. Computes `from`, `to`, `hasPrev`, `hasNext`. Shows "Showing X–Y of Z clients" text on left, Prev/Next chevron buttons on right. Disabled buttons: `cursor-not-allowed`, reduced opacity. Under 50 lines.
- `app/admin/clients/layout.tsx` — Metadata: title "Clients — Erano Admin".
- `app/admin/clients/page.tsx` — "use client". Reads `?state=` from `useSearchParams()` to pre-select dropdown on "View all pending" navigation. State: search, debouncedSearch, stateFilter, page, loading, error, clients, total. Debounce: `useEffect` on `search` with 400ms `setTimeout`; sets page=0 and debouncedSearch atomically — prevents double-fetch when search changes. State filter change: `handleStateChange` sets stateFilter + page=0 in same handler — prevents double-fetch. `fetchClients` wrapped in `useCallback` with empty deps (args passed directly). Main `useEffect` depends on `[debouncedSearch, stateFilter, page, fetchClients]`. Search input (Search icon, `aria-label`), state dropdown (select), `<ClientsTable>`, `<PaginationBar>`. Under 150 lines.

**Key decisions:**
- Tab filtering in SubmissionsPanel is client-side (filters the 10 fetched rows) — this is correct since the tab purpose is to highlight different states in the "recent activity" view. For exhaustive per-state listings, "View all pending" and the full /admin/clients page are the correct paths.
- Two-step search in the clients API: PostgREST cannot directly filter on `client_profiles.legal_name` from a `users` query without `!inner` join notation, which isn't reliably supported across Supabase client versions. Two-step (get user_ids from client_profiles, then filter users by id) is explicit, reliable, and fast enough for admin pagination use.
- `Client` interface exported from `ClientsTable.tsx` (not a separate types file) — keeps the type collocated with the component that owns its rendering without adding a new abstraction file.
- Page reset is atomic with filter changes (same `setState` call or same `setTimeout` callback) — prevents the double-fetch race where a filter change triggers a fetch with the old page, then the page=0 reset triggers a second fetch.
- `useSearchParams()` in the clients page allows the "View all pending" link to pre-populate the state dropdown, connecting the inbox link to the full client list seamlessly.

**TypeScript:** clean (0 errors)
**Build:** clean — /admin ƒ Dynamic (3.48 kB), /admin/clients ƒ Dynamic (3.52 kB), /api/admin/clients ƒ Dynamic. 46 pages total.

### T023 + T019 + T026 + T041 — Individual client profile, payment confirm/reject, document request, confirm modal (Group 3 — client profile actions)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `app/api/admin/clients/[id]/route.ts` — GET. Auth + admin role check. Fetches client user row, client_profiles (with `packages:package_id(name, description, price_ghs)` embed), then `Promise.all` for 6 parallel queries: latest invoice (with file_path for signed URL), latest agreement (with `agreement_versions(version_number)` embed), active payment timer, all payment proofs, all document requests (with nested `document_uploads`), last 10 audit entries (`.or("actor_id.eq.${clientId},target_id.eq.${clientId}")`). Invoice signed URL generated inline (1-hour). Destructures `packages` from rawProfile: `const { packages: _pkg, ...profileFields } = profile ?? {}`. Type assertions through `unknown` for Supabase FK embed inference. Returns 9-key JSON response.
- `app/api/admin/clients/[id]/update-state/route.ts` — PATCH. Auth + admin check. Validates state against VALID_STATES Set (6 values). Client existence check. Updates `users.account_state`. Audit logs `account_state_updated` with `new_state` in metadata.
- `app/api/admin/payments/confirm/route.ts` — POST. Auth + admin check. Body: `{ client_id, proof_id }`. Updates `payment_proofs.status → approved`. Updates `users.account_state → active`. Fetches latest invoice ID, updates `invoices.status → paid`. Audit logs `payment_confirmed`. Non-fatal: fetches contact_name + package name for email, inserts client notification, renders + sends `PaymentConfirmedEmail` to client's email.
- `app/api/admin/payments/reject/route.ts` — POST. Auth + admin check. Body: `{ client_id, proof_id, reason }`. Validates reason is non-empty. Updates proof to `rejected`, state to `awaiting_payment`. Audit logs `payment_rejected` with reason in metadata. Non-fatal: sends `PaymentRejectedEmail` with reason, inserts client notification.
- `app/api/admin/documents/request/route.ts` — POST. Auth + admin check. Body: `{ client_id, title, description, category }`. Validates all fields + category against VALID_CATEGORIES Set (5 values). Inserts `document_requests` with `requested_by = adminId`. Audit logs `document_requested`. Non-fatal: inserts client notification, renders + sends `DocumentRequestedEmail`.
- `app/api/admin/signed-url/route.ts` — GET `?bucket=...&path=...`. Auth + admin check. Validates bucket against ALLOWED_BUCKETS (payment-proofs/15m, document-uploads/30m, invoices/1h). Calls `generateSignedUrl` from `lib/storage.ts`. Returns `{ url }`. Used for admin downloads of any client file.
- `app/admin/clients/[id]/layout.tsx` — Metadata: title "Client Profile — Erano Admin".
- `app/admin/clients/[id]/page.tsx` — "use client". `useParams` for `id`. State: data, loading, error, modal (`{ type: "confirm"|"reject", proofId }|null`), modalLoading, comingSoon. `fetchData` in `useCallback` for refetch. Handlers: `handleModalConfirm` (POST confirm/reject, refetch on success), `handleDownload` (fetch signed URL, `window.open`), `handleComingSoon` (2s auto-dismiss setTimeout). Renders: back link, ClientProfileHeader, ClientInfoSections, ClientPaymentSection, ClientDocumentsSection, ConfirmModal (when modal state is set). Under 150 lines.
- `components/admin/ui/ConfirmModal.tsx` — "use client". Props: title, body, confirmLabel, loading, onConfirm, onClose, withReason?, destructive?. Focus trap via `querySelectorAll("button:not([disabled]), textarea")` + Escape + Tab key handlers. Optional `<textarea>` for reject reason (ref forwarded to `onConfirm`). Destructive variant: red confirm button. `role="dialog"` + `aria-modal="true"` + `aria-labelledby`. Under 100 lines.
- `components/admin/clients/DocumentRequestForm.tsx` — "use client". Title, category (select from 5 values), description (textarea). Validates all fields before POST. Inline error display. Calls `onSuccess()` on 201 response. Under 100 lines.
- `components/admin/clients/ClientProfileHeader.tsx` — "use client". Contact name, legal name, email, joined date. State badge with colour map. Context-sensitive action buttons: if `awaiting_confirmation`, shows Confirm Payment + Reject Payment (disabled if no pending proof); all states show Reactivate button (shows "Coming soon" text on click via `comingSoon` prop). Under 100 lines.
- `components/admin/clients/ClientInfoSections.tsx` — "use client". Three sections: Business Information (12 fields, 2-col→3-col grid), Compliance & Financials (5 fields), Package & Agreements (package name/price, invoice number/amount/status/view link, agreement version/accepted date). `Row` helper component for label+value pairs. Formats GHS amounts via `fmt()`. Under 150 lines.
- `components/admin/clients/ClientPaymentSection.tsx` — "use client". Payment timer banner (days remaining or expired, colour-coded). Proofs table: reference (monospace), amount, uploaded date (hidden md), status badge, actions (download + confirm/reject for pending proofs). Under 150 lines.
- `components/admin/clients/ClientDocumentsSection.tsx` — "use client". Doc requests list: category badge, status badge, title, description, date, nested uploaded files with download buttons. "Request Document" toggle button shows/hides DocumentRequestForm inline. Calls `onRequestCreated` (fetchData) on form success. Under 150 lines.

**Key decisions:**
- Confirm/Reject buttons exist in both `ClientProfileHeader` (for quick access from the top) and `ClientPaymentSection` (per-proof row actions) — header picks the pending proof automatically via `pendingProofId` prop; table shows buttons only for `status === "pending"` rows.
- `handleDownload` in page calls `/api/admin/signed-url` which verifies admin role server-side — client components never access storage directly.
- `comingSoon` state + 2s setTimeout auto-dismiss in page — no toast library needed, minimal code.
- Invoice status updated by ID (not by `client_id` in a filtered update) — Supabase SDK doesn't support `.order(...).limit(1)` on update queries; fetch the ID first then update by primary key.
- All notifications and email sends wrapped in non-fatal try/catch after DB writes succeed — same pattern as portal routes.
- `as unknown as T` cast for `prof?.packages` in confirm route — Supabase infers FK embed as an array type even for one-to-one relations when using the untyped client.

**TypeScript:** clean (0 errors — 1 fix: `as unknown as { name: string } | null` for Supabase FK embed)
**Build:** clean — /admin/clients/[id] ƒ Dynamic (6.82 kB), + 5 admin API routes. 50 pages total.

### T042 — CSRF origin protection on all state-mutating API routes (Group 4 — security hardening)
**Status:** ✅ tsc clean · build clean

**Files created:**
- `lib/csrf.ts` — `verifyCsrfOrigin(request: Request): void`. Reads `origin` header; compares against `NEXT_PUBLIC_SITE_URL` prefix. Throws `"CSRF_ORIGIN_MISMATCH"` if origin is present and does not match. Passes through if origin header is absent (same-origin server-to-server calls have no origin header). SERVER SIDE ONLY.

**Files modified (9 total):**
- `app/api/admin/payments/confirm/route.ts` — import + try/catch after admin role check
- `app/api/admin/payments/reject/route.ts` — import + try/catch after admin role check
- `app/api/admin/documents/request/route.ts` — import + try/catch after admin role check
- `app/api/admin/clients/[id]/update-state/route.ts` — import + try/catch after admin role check
- `app/api/portal/agreements/accept/route.ts` — import + try/catch after auth check, before requireState
- `app/api/portal/payments/upload/route.ts` — import + try/catch after auth check, before requireState
- `app/api/portal/documents/upload/route.ts` — import + try/catch after auth check, before requireState
- `app/api/portal/profile/update/route.ts` — import + try/catch after auth check, before requireState

**Placement decision:** CSRF check inserted after auth/role verification (so unauthorized requests still get 401/403, not 403-CSRF) but before any body parsing or business logic. All 8 routes return `{ error: "Forbidden" }` with status 403 on origin mismatch — consistent with the existing auth-failure shape.

**TypeScript:** clean (0 errors)
**Build:** clean — 50 pages, no bundle size change (lib/csrf.ts is 7 lines, server-only).

---

## Sprint 13 — Invoice Generation + Package Management

### T024 + T028 + T029 — Invoice generation, package list, package upgrade (Group 1 — all tasks)
**Status:** ✅ tsc clean · build clean

**Files created (7):**
- `app/api/admin/packages/route.ts` — GET: returns all active packages ordered by price_ghs ASC nulls last. Admin role check.
- `app/api/admin/invoices/route.ts` — GET: returns all invoices with FK-embedded package name and client email, ordered by generated_at DESC. Admin role check.
- `app/api/admin/invoices/generate/route.ts` — POST `{ client_id, custom_price_ghs? }`. Verifies admin, CSRF, client state = pending. Resolves final price (Custom → required custom_price_ghs; else package.price_ghs). Generates ERN-YYYY-NNNN invoice number (sequential, year-scoped). Calls `generateInvoicePdf`, `uploadFile` to `invoices` bucket, inserts invoice row with package_id, updates state → awaiting_agreement, audit logs `invoice_generated`. Non-fatal: `InvoiceReadyEmail` + notification. Also saves custom_price_ghs to client_profiles when Custom package.
- `app/api/admin/invoices/upgrade/route.ts` — POST `{ client_id, package_id, custom_price_ghs? }`. Verifies admin, CSRF, client state = active. Checks no open invoice (status = "generated"). Fetches new package + profile. Same PDF + upload + insert flow as generate. Updates `client_profiles.package_id`, state → awaiting_agreement, audit logs `package_upgrade_initiated`. Non-fatal: email + notification.
- `app/admin/invoices/layout.tsx` — Metadata: "Invoice Manager — Erano Admin".
- `app/admin/invoices/page.tsx` — Invoice table: invoice number, client email (hidden md), package name (hidden lg), amount, date (hidden sm), status badge (generated/paid), link to client profile. Loading skeleton + error + empty states.
- `components/admin/clients/PackageUpgradeModal.tsx` — Modal with package dropdown (fetched from `/api/admin/packages` on mount), package description preview, custom price input when Custom selected, submit calls `/api/admin/invoices/upgrade`. Focus trap (Escape + Tab). Under 150 lines.

**Files modified (2):**
- `components/admin/clients/ClientProfileHeader.tsx` — Added `onGenerateInvoice`, `generatingInvoice`, `onInitiateUpgrade` props. "Generate Invoice" button shows when `accountState === "pending"`. "Initiate Package Upgrade" button shows when `accountState === "active"`.
- `app/admin/clients/[id]/page.tsx` — Added `generating`, `customPrice`, `upgradeModal` state. Added `handleGenerateInvoice()`. Custom price input card shows when state = pending AND package = Custom. `PackageUpgradeModal` rendered when `upgradeModal` is true.

**Key decisions:**
- Invoice number format ERN-YYYY-NNNN is year-scoped: query `invoice_number LIKE 'ERN-{year}-%'` ordered DESC, parse last segment, +1. Avoids a dedicated sequence table.
- Bank details sourced from optional env vars (`INVOICE_BANK_NAME`, `INVOICE_BANK_ACCOUNT_NAME`, `INVOICE_BANK_ACCOUNT_NUMBER`, `INVOICE_BANK_BRANCH`). If not set, PDF omits the bank details block (the field is optional in `InvoiceData`).
- `package_id` stored on both the `invoices` row (historical record) and updated on `client_profiles` (current assignment). Upgrade route updates both.
- Upgrade guard: blocks if a `status = "generated"` invoice already exists — prevents double-invoicing while a previous invoice is still open.

**TypeScript:** clean (0 errors)
**Build:** clean — `/admin/invoices` ƒ Dynamic added, all new API routes registered.

### Bug fixes + services page (Group 2 — fixes + new feature)
**Status:** ✅ tsc clean · build clean

**Files modified (6):**
- `components/admin/clients/ClientPaymentSection.tsx` — FIX 1 (admin): `PROOF_COLORS` key corrected from `"approved"` → `"confirmed"` to match payment_status enum. Timer banner now hidden when any proof has `status === "confirmed"`; replaced by a green "Payment completed" banner instead.
- `app/portal/payments/page.tsx` — FIX 1 (client): `PaymentTimer` now only renders when `accountState !== "active"`. Previously the timer would show even after payment was confirmed and account activated.
- `app/api/portal/profile/me/route.ts` — FIX 3: Supabase FK embedding for `packages(name)` returns a single object at runtime (many-to-one relation), not an array. Corrected cast from `{ name: string }[] | null` → `unknown` → `{ name: string } | null`. The previous `[0]?.name` access on an object always returned `undefined`, causing the package name to show as "—" on the active dashboard.
- `components/portal/dashboard/ActiveView.tsx` — FIX 3: `StatCard` now accepts optional `href`. Package stat card no longer links to `/portal/services` (route was 404). Renders a static `<div>` when `href` is omitted; all other stat cards keep their links. FIX 2 verified already present — `PaymentConfirmedEmail` was already wired in `confirm/route.ts`.
- `app/portal/dashboard/page.tsx` — FIX 4: Added `mx-auto` to page container div — centers the `max-w-4xl` wrapper within the portal main area.
- `components/portal/dashboard/PaymentView.tsx` — FIX 4: Added `mx-auto` to inner `max-w-lg` div.

**Files created (3):**
- `app/api/portal/services/route.ts` — GET. Auth via SSR client + anon key. Service role client fetches `client_profiles` (with `packages:package_id(name, description, price_ghs)` FK embed) + `users.account_state` in `Promise.all`. Returns `{ services_needed, package, account_state }`.
- `app/portal/services/layout.tsx` — Metadata: title "My Services — Erano Consulting".
- `app/portal/services/page.tsx` — "use client". Fetches `/api/portal/services` + `/api/portal/documents/requests` in parallel. 4 sections: (1) Active package card — navy bg, gold eyebrow, package name/description/price, green "Active" badge; (2) Services included grid — CheckCircle icons (text-gold) + service name, 1→2 col at sm breakpoint; (3) Account manager — email (mailto), phone (tel), WhatsApp CTA (border-gold text-gold, never bg-gold fill); (4) Quick actions — pending document request count with link to /portal/documents, or "fully set up" message. Gold: 3 instances (eyebrow, CheckCircle, WhatsApp button). Loading skeleton + error state. Under 150 lines.

**Key decisions:**
- `unknown` cast required for Supabase FK embed type: the TS client infers `{ name: any }[]` (array) even for many-to-one relations; the actual runtime value is a single object. Cast through `unknown` avoids TS error while preserving runtime correctness.
- `PaymentConfirmedEmail` was already wired — FIX 2 required no code change.
- WhatsApp button uses `border-gold text-gold` (not `bg-gold`) to comply with "never as a background fill" rule.
- Services page is mobile-first: `grid-cols-1` → `sm:grid-cols-2` for the services list.

**TypeScript:** clean (0 errors)
**Build:** clean — `/portal/services` ƒ Dynamic added, `/api/portal/services` ƒ Dynamic added.

---

## Sprint 14 — Account Reactivation + Cron + Hardening
*Claude will populate this section during Sprint 14.*

---

## Sprint 15 — Mobile QA + Pre-Launch
*Claude will populate this section during Sprint 15.*

---

*ApexSource Ventures · Accra, Ghana · May 2026*