# Do Not Touch — Erano Consulting

> Last updated: May 2026
> Claude must not modify any file listed here without explicit instruction from Naa.
> If a task genuinely requires touching a file on this list — stop, flag it, state the reason, and wait for Naa's confirmation before proceeding.

---

## How to Handle a Conflict

If a task requires touching a do-not-touch file:

1. Stop before making any change
2. State clearly: "This task requires modifying `[filename]` which is on the do-not-touch list"
3. Explain exactly what change is needed and why
4. State the risk if it goes wrong
5. Wait for Naa's explicit confirmation
6. Make the minimum change necessary
7. Update this file if the file's status changes

---

## Locked — Design System

These files define the entire visual identity of the site. Changes here break every page.

| File | Why locked | Risk if changed |
|---|---|---|
| `tailwind.config.ts` | Design tokens — colours, spacing, typography all defined here | Breaks entire site visual system |
| `app/globals.css` | Global CSS — design tokens, mobile utility classes, base resets | Breaks layout and mobile responsiveness across all pages |

---

## Locked — Public Site Layout

These files wrap every public page. A bug here breaks the entire site.

| File | Why locked | Risk if changed |
|---|---|---|
| `app/layout.tsx` | Root layout — viewport meta, SmoothScroll wrapper, font loading | Breaks every page on the site |
| `app/(site)/layout.tsx` | Navbar + PageTransition + Footer + WhatsAppFloat wrapper | Breaks navigation and layout on all public pages |
| `next.config.mjs` | Image domains, eslint.ignoreDuringBuilds — do not alter without reason | Build failures, broken images |
| `next-sitemap.config.js` | SEO sitemap and robots.txt config | Breaks search engine indexing |

---

## Locked — Navigation + Shell Components

Completed and approved in Sprint 2. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `components/layout/Navbar.tsx` | Approved Sprint 2 — isMobile JS state, gold hover, CTA | Breaks navigation on all pages |
| `components/layout/Footer.tsx` | Approved Sprint 2 — 4-col grid, social icons, cert badges | Breaks footer on all pages |
| `components/layout/WhatsAppFloat.tsx` | Approved Sprint 2 — pulse ring, 3s delay | Breaks WhatsApp CTA |
| `components/layout/PageTransition.tsx` | Approved Sprint 1 — fade + translateY | Breaks page transitions |
| `components/layout/SmoothScroll.tsx` | Approved Sprint 1 — Lenis 1.2s ease-out | Breaks smooth scroll site-wide |

---

## Locked — Home Page Sections

Completed and approved in Sprint 3. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `components/sections/Hero.tsx` | Approved Sprint 3 — parallax, Framer Motion stagger | Breaks home page hero |
| `components/sections/TickerStrip.tsx` | Approved Sprint 3 — gold marquee, calc(100vh-72px) positioning | Breaks ticker positioning |
| `components/sections/ServicesStrip.tsx` | Approved Sprint 3 — hover zoom, stagger | Breaks services section |
| `components/sections/WhyErano.tsx` | Approved Sprint 3 — split layout | Breaks why section |
| `components/sections/StatsSection.tsx` | Approved Sprint 3 — count-up | Breaks stats section |
| `components/sections/Testimonial.tsx` | Approved Sprint 3 — crossfade, dot nav | Breaks testimonials |
| `components/sections/SectorsGrid.tsx` | Approved Sprint 3 — 8 sectors | Breaks sectors section |
| `components/sections/HomeCTA.tsx` | Approved Sprint 3 — radial glow | Breaks home CTA |
| `app/(site)/page.tsx` | Approved Sprint 3 — Hero + TickerStrip in calc(100vh-72px) wrapper | Breaks home page layout |

---

## Locked — Inner Pages

Completed and approved in Sprints 4–7. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `app/(site)/about/page.tsx` | Approved Sprint 4 | Breaks about page |
| `app/(site)/about/layout.tsx` | Approved Sprint 4 — SEO metadata | Breaks about SEO |
| `app/(site)/services/page.tsx` | Approved Sprint 5 — pricing grid, QuotesPanel | Breaks services page |
| `app/(site)/services/layout.tsx` | Approved Sprint 5 — SEO metadata | Breaks services SEO |
| `app/(site)/tools/page.tsx` | Approved Sprint 5 — 4 calculators | Breaks tools page |
| `app/(site)/tools/layout.tsx` | Approved Sprint 5 — SEO metadata | Breaks tools SEO |
| `app/(site)/contact/page.tsx` | Approved Sprint 5 — form fields | Breaks contact page |
| `app/(site)/contact/layout.tsx` | Approved Sprint 5 — SEO metadata | Breaks contact SEO |
| `app/(site)/industries/page.tsx` | Approved Sprint 6 | Breaks industries page |
| `app/(site)/industries/layout.tsx` | Approved Sprint 6 — SEO metadata | Breaks industries SEO |
| `app/(site)/resources/page.tsx` | Approved Sprint 6 | Breaks resources page |
| `app/(site)/resources/layout.tsx` | Approved Sprint 6 — SEO metadata | Breaks resources SEO |
| `app/(site)/resources/[slug]/page.tsx` | Approved Sprint 6 — 3 seeded articles | Breaks article pages |
| `app/(site)/legal/privacy/page.tsx` | Legal content — never edit without Naa + client approval | Legal liability |
| `app/(site)/legal/terms/page.tsx` | Legal content — never edit without Naa + client approval | Legal liability |

---

## Locked — Library and Config Files

| File | Why locked | Risk if changed |
|---|---|---|
| `lib/images.ts` | All Cloudinary image and video keys — public site media | Breaks all images and video on public site |
| `lib/supabase.ts` | Supabase browser client — anon key only | Breaks all Supabase queries |
| `lib/cloudinary.ts` | Cloudinary config | Breaks image uploads and delivery |
| `hooks/useCountUp.ts` | Approved Sprint 3 — used in StatsSection | Breaks count-up animation |
| `hooks/useParallax.ts` | Approved Sprint 3 — used in Hero | Breaks hero parallax |
| `hooks/useScrollReveal.ts` | No-op by design — Framer Motion handles reveals | Do not add logic here |
| `.env.local` | Credentials — never modify without explicit instruction | Security risk |
| `.env.example` | Template — only add new variables, never remove existing | Breaks team onboarding |
| `tsconfig.json` | TypeScript config — strict mode | Build failures |
| `.nvmrc` | Node.js version pin | Environment inconsistencies |

---

## Locked — Sprint 8 Auth + Infrastructure

Completed and approved in Sprint 8. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `middleware.ts` | RBAC — protects all portal and admin routes | Breaks auth gating site-wide |
| `lib/email.ts` | Resend integration — used by all email sends | Breaks all transactional email |
| `lib/storage.ts` | Supabase Storage helpers — signed URL generation | Breaks all file access |
| `lib/supabase-server.ts` | Server-side Supabase client factory | Breaks all server-side DB access |
| `lib/magicLink.ts` | Magic link generation — first login flow | Breaks account activation |
| `lib/ratelimit.ts` | Upstash rate limiting — onboarding + auth | Removes rate limiting protection |
| `lib/validateState.ts` | Account state validation — rejects wrong-state API calls | Breaks state gating on all portal APIs |
| `app/auth/callback/page.tsx` | Auth callback — handles magic link + PKCE token exchange | Breaks all magic link logins |
| `app/login/page.tsx` | Login page — email/password, role redirect, lockout | Breaks client and admin login |
| `app/reset-password/page.tsx` | Password reset request page | Breaks password reset flow |
| `app/reset-password/confirm/page.tsx` | Password reset confirmation page | Breaks password reset flow |
| `app/portal/set-password/page.tsx` | Force password change on first login | Breaks first-login flow |
| `app/api/contact/route.ts` | Contact form API — Resend email send | Breaks contact form |
| `app/api/onboarding/submit/route.ts` | Account creation API — auth user, users row, client_profiles, magic link | Breaks all new client onboarding |
| `app/api/portal/auth/clear-password-flag/route.ts` | Clears must_change_password after set-password | Breaks post-first-login redirect |
| `supabase/schema.sql` | Full schema — all tables, RLS policies, indexes | Breaks entire database layer |
| `emails/WelcomeEmail.tsx` | Welcome + magic link email template | Breaks account activation email |
| `emails/PasswordResetEmail.tsx` | Password reset email template | Breaks password reset email |
| `emails/InvoiceReadyEmail.tsx` | Invoice notification template | Breaks invoice emails |
| `emails/PaymentConfirmedEmail.tsx` | Payment confirmed template | Breaks payment emails |
| `emails/PaymentRejectedEmail.tsx` | Payment rejected template | Breaks payment emails |
| `emails/PaymentProofReceivedEmail.tsx` | Payment proof received template | Breaks payment emails |
| `emails/DocumentRequestedEmail.tsx` | Document request template | Breaks document emails |
| `emails/DocumentUploadedEmail.tsx` | Document uploaded template | Breaks document emails |
| `emails/AgreementAcceptedEmail.tsx` | T&Cs agreement template | Breaks agreement emails |
| `emails/AccountExpiredEmail.tsx` | Account expired template | Breaks account state emails |
| `emails/AccountReactivatedEmail.tsx` | Account reactivated template | Breaks account state emails |
| `emails/ContactFormEmail.tsx` | Contact form notification template | Breaks contact form emails |
| `emails/utils.ts` | Shared email utilities | Breaks all email templates |
| `components/onboarding/OnboardingForm.tsx` | Multi-step form controller | Breaks onboarding flow |
| `components/onboarding/OnboardingHeader.tsx` | Onboarding progress header | Breaks onboarding UI |
| `components/onboarding/OnboardingSidebar.tsx` | Onboarding sidebar | Breaks onboarding UI |
| `components/onboarding/form-helpers.tsx` | Shared form input components | Breaks onboarding form inputs |
| `components/onboarding/onboarding-types.ts` | Shared TypeScript types for onboarding | Breaks type safety across onboarding |
| `components/onboarding/steps/Step1Business.tsx` | Onboarding step 1 | Breaks onboarding |
| `components/onboarding/steps/Step2Contact.tsx` | Onboarding step 2 | Breaks onboarding |
| `components/onboarding/steps/Step3Services.tsx` | Onboarding step 3 | Breaks onboarding |
| `components/onboarding/steps/Step4Financial.tsx` | Onboarding step 4 | Breaks onboarding |
| `components/onboarding/steps/Step5Compliance.tsx` | Onboarding step 5 | Breaks onboarding |
| `components/onboarding/steps/Step6Package.tsx` | Onboarding step 6 | Breaks onboarding |
| `components/onboarding/steps/Step7Summary.tsx` | Onboarding step 7 — summary | Breaks onboarding |
| `components/onboarding/steps/Step8Confirmation.tsx` | Onboarding step 8 — confirmation | Breaks onboarding |

---

## Supabase Tables — Do Not Alter Without Migration

Once data exists in these tables, column changes require a migration file. Never alter column types or names directly in the Supabase dashboard on a live table with data.

| Table | Status |
|---|---|
| `users` | ✅ Created — Sprint 8 |
| `client_profiles` | ✅ Created — Sprint 8 |
| `packages` | ✅ Created — Sprint 8 |
| `invoices` | ✅ Created — Sprint 8 |
| `payments` | ✅ Created — Sprint 8 |
| `documents` | ✅ Created — Sprint 8 |
| `notifications` | ✅ Created — Sprint 8 |
| `audit_log` | ✅ Created — Sprint 8 |

---

*ApexSource Ventures · Accra, Ghana · May 2026*