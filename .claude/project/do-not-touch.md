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

## Locked — Sprint 9 Client Portal Shell

Completed and approved in Sprint 9. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `context/PortalContext.tsx` | Portal context — accountState, userName, userId, mobile nav state | Breaks all portal pages that read context |
| `app/portal/layout.tsx` | Portal layout — auth guard, must_change_password redirect, PortalProvider wrapper | Breaks portal auth flow and layout for all portal pages |
| `app/portal/dashboard/page.tsx` | Dashboard dispatcher — 6 state-gated views | Breaks client dashboard |
| `app/portal/profile/page.tsx` | Profile page — edit contact + change password | Breaks client profile page |
| `app/portal/profile/layout.tsx` | Profile page metadata | Breaks profile SEO |
| `app/api/portal/profile/me/route.ts` | Profile GET API — service role bypass for client_profiles RLS | Breaks profile + dashboard data load |
| `app/api/portal/profile/update/route.ts` | Profile PATCH API — updates contact details, audit logged | Breaks contact detail editing |
| `app/api/portal/auth/clear-password-flag/route.ts` | Clears must_change_password — used after set-password and change-password | Breaks post-password-change flow |
| `components/portal/layout/PortalSidebar.tsx` | Nav sidebar — desktop sticky + mobile slide-in, state badge, sign out | Breaks portal navigation |
| `components/portal/layout/PortalHeader.tsx` | Portal header — page title, hamburger, notification bell, user avatar | Breaks portal header on all pages |
| `components/portal/layout/PortalMobileNav.tsx` | Mobile bottom nav — 5 items, state-gated visibility | Breaks mobile portal navigation |
| `components/portal/dashboard/StatusTimeline.tsx` | 4-step onboarding timeline — shared by pending/agreement/confirmation views | Breaks timeline in 3 dashboard views |
| `components/portal/dashboard/PendingView.tsx` | Dashboard view for pending state | Breaks pending dashboard |
| `components/portal/dashboard/AgreementView.tsx` | Dashboard view for awaiting_agreement state | Breaks agreement dashboard |
| `components/portal/dashboard/PaymentView.tsx` | Dashboard view for awaiting_payment state — countdown timer | Breaks payment dashboard |
| `components/portal/dashboard/ConfirmationView.tsx` | Dashboard view for awaiting_confirmation state | Breaks confirmation dashboard |
| `components/portal/dashboard/ActiveView.tsx` | Dashboard view for active state — stat cards + activity feed | Breaks active dashboard |
| `components/portal/dashboard/ExpiredView.tsx` | Dashboard view for expired state — WhatsApp + email CTAs | Breaks expired dashboard |
| `components/portal/profile/ContactDetailsForm.tsx` | Contact details edit form — PATCH to profile update API | Breaks contact editing |
| `components/portal/profile/ChangePasswordForm.tsx` | Change password form — signInWithPassword verify + updateUser | Breaks password change |

---

## Locked — Sprint 10 Invoice, Payment Flow + PDF Generation

Completed and approved in Sprint 10. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `lib/businessDays.ts` | Business day calculator — used by agreement accept to set payment deadline | Wrong payment deadline set for all new agreements |
| `lib/checkDuplicateRef.ts` | Duplicate transaction reference guard — called by payment upload API | Allows duplicate payment submissions |
| `lib/validateMime.ts` | MIME type validation from magic bytes — used on all file uploads | File type bypass — extension spoofing allowed |
| `lib/generateStoragePath.ts` | UUID-prefixed storage path generator — invoices, payment proofs, document uploads | Predictable file paths — enumeration attack possible |
| `lib/generateInvoicePdf.ts` | PDF generation — A4 layout, Plus Jakarta Sans, GH₵ symbol | Breaks invoice PDF generation |
| `app/portal/invoice/page.tsx` | Invoice display page — AgreementGate + bank details + state gating | Breaks invoice page |
| `app/portal/invoice/layout.tsx` | Invoice page metadata | Breaks invoice SEO |
| `app/portal/payments/page.tsx` | Payments page — timer + upload form + history, state gated | Breaks payments page |
| `app/portal/payments/layout.tsx` | Payments page metadata | Breaks payments SEO |
| `app/api/portal/invoice/me/route.ts` | Invoice GET API — returns most recent invoice for authenticated client | Breaks invoice data load |
| `app/api/portal/agreements/accept/route.ts` | Agreement accept API — creates agreements row, payment timer, transitions state to awaiting_payment | Breaks T&Cs acceptance flow |
| `app/api/portal/payments/upload/route.ts` | Payment proof upload API — MIME validation, duplicate check, state transition to awaiting_confirmation | Breaks payment submission |
| `app/api/portal/payments/timer/route.ts` | Payment timer GET API — returns active timer expires_at for client | Breaks payment countdown |
| `app/api/portal/payments/history/route.ts` | Payment history GET API — returns all payment proofs for client | Breaks payment history view |
| `app/api/portal/payments/proof-url/route.ts` | Signed URL API — generates 15-min signed URL with ownership check | Breaks payment proof download |
| `app/api/cron/check-expired-timers/route.ts` | Vercel cron — marks expired timers, sets account_state → expired, sends email | Payment expiry not enforced |
| `components/portal/invoice/AgreementGate.tsx` | T&Cs scroll gate — scroll-to-bottom enforcement, accept button, state refresh | Breaks agreement acceptance UI |
| `components/portal/payments/PaymentTimer.tsx` | Countdown timer component — urgent/expired colour states, reduced motion support | Breaks payment deadline display |
| `components/portal/payments/PaymentUploadForm.tsx` | Payment proof upload form — react-hook-form + zod, 7 fields, FormData POST | Breaks payment submission UI |
| `components/portal/payments/PaymentHistory.tsx` | Payment history table — status badges, signed URL download | Breaks payment history UI |
| `vercel.json` | Vercel cron schedule — daily 6am UTC check-expired-timers | Cron job stops running; expired accounts not detected |
| `public/fonts/PlusJakartaSans-Regular.ttf` | TTF font for PDF generation — contains U+20B5 GH₵ glyph | PDF generation throws WinAnsi encoding error |
| `public/fonts/PlusJakartaSans-Bold.ttf` | TTF bold font for PDF generation — contains U+20B5 GH₵ glyph | PDF generation throws WinAnsi encoding error |

---

## Locked — Sprint 11 Document Management + Notifications

Completed and approved in Sprint 11. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `app/portal/notifications/page.tsx` | Notifications list page — full history, mark all read | Breaks notifications page |
| `app/portal/notifications/layout.tsx` | Notifications page metadata | Breaks notifications SEO |
| `app/portal/documents/page.tsx` | Documents page — lists all document requests with upload cards | Breaks documents page |
| `app/portal/documents/layout.tsx` | Documents page metadata | Breaks documents SEO |
| `app/api/portal/notifications/route.ts` | Notifications GET + PATCH — list and mark individual read | Breaks notification fetch and read |
| `app/api/portal/notifications/mark-all-read/route.ts` | Mark all notifications read POST API | Breaks mark-all-read action |
| `app/api/portal/documents/requests/route.ts` | Document requests GET — returns requests with nested uploads | Breaks documents data load |
| `app/api/portal/documents/upload/route.ts` | Document upload POST — IDOR check, MIME validation, 10MB limit, audit log | Breaks document upload flow |
| `app/api/portal/documents/download/route.ts` | Document download GET — IDOR check, 30-min signed URL | Breaks document download |
| `components/portal/notifications/NotificationBell.tsx` | Bell icon with badge + dropdown + Supabase Realtime subscription | Breaks real-time notification bell |
| `components/portal/documents/DocumentRequestCard.tsx` | Card per document request — upload form (pending) or download link (uploaded/reviewed) | Breaks document request UI |
| `components/portal/layout/PortalHeader.tsx` | Portal header — modified Sprint 11 to add NotificationBell | Breaks portal header on all pages |

---

## Locked — Sprint 12 Admin Dashboard

Completed and approved in Sprint 12. Do not modify.

| File | Why locked | Risk if changed |
|---|---|---|
| `app/admin/layout.tsx` | Admin layout server component — auth guard, role check, AdminProvider, pendingCount | Breaks admin auth and layout for all admin pages |
| `app/admin/page.tsx` | Admin dashboard — 4 metric cards, SubmissionsPanel | Breaks admin dashboard |
| `app/admin/clients/layout.tsx` | Clients list page metadata | Breaks clients page SEO |
| `app/admin/clients/page.tsx` | Clients list — search, state filter, pagination | Breaks admin client list |
| `app/admin/clients/[id]/layout.tsx` | Client profile page metadata | Breaks client profile SEO |
| `app/admin/clients/[id]/page.tsx` | Client profile page — all sections, confirm/reject modal, download handler | Breaks admin client profile view |
| `app/api/admin/metrics/route.ts` | Admin metrics API — counts + recent submissions | Breaks admin dashboard data load |
| `app/api/admin/clients/route.ts` | Admin clients list API — search, state filter, pagination | Breaks admin client list |
| `app/api/admin/clients/[id]/route.ts` | Admin client profile GET — all 9 data sections, invoice signed URL | Breaks admin client profile data load |
| `app/api/admin/clients/[id]/update-state/route.ts` | Admin account state PATCH — audit logged | Breaks manual state transitions |
| `app/api/admin/payments/confirm/route.ts` | Payment confirm POST — state→active, invoice→paid, email, notification, audit | Breaks payment confirmation flow |
| `app/api/admin/payments/reject/route.ts` | Payment reject POST — state→awaiting_payment, rejection email, notification, audit | Breaks payment rejection flow |
| `app/api/admin/documents/request/route.ts` | Document request POST — creates request, email, notification, audit | Breaks admin document request flow |
| `app/api/admin/signed-url/route.ts` | Admin signed URL GET — generates signed URLs for any bucket after admin role check | Breaks all admin file downloads |
| `lib/csrf.ts` | CSRF origin check — used by all state-mutating admin + portal routes | Removes CSRF protection from 8 mutation endpoints |
| `context/AdminContext.tsx` | Admin React context — adminId, adminName, AdminProvider, useAdmin hook | Breaks AdminHeader and all components reading admin context |
| `components/admin/layout/AdminSidebar.tsx` | Admin sidebar — nav items, pending count badge, sign out | Breaks admin navigation |
| `components/admin/layout/AdminHeader.tsx` | Admin header — page title, admin avatar | Breaks admin header on all pages |
| `components/admin/inbox/SubmissionsPanel.tsx` | Submissions inbox — 7-tab filter, state count badges, recent submissions table | Breaks admin inbox on dashboard |
| `components/admin/clients/ClientsTable.tsx` | Clients table — loading skeleton, state badges, View links | Breaks client list rendering |
| `components/admin/clients/PaginationBar.tsx` | Pagination bar — Prev/Next controls, showing X–Y of Z | Breaks client list pagination |
| `components/admin/clients/ClientProfileHeader.tsx` | Client profile header — name, state badge, confirm/reject buttons, reactivate badge | Breaks client profile header |
| `components/admin/clients/ClientInfoSections.tsx` | Business info, compliance, package/invoice/agreement sections | Breaks client profile info display |
| `components/admin/clients/ClientPaymentSection.tsx` | Payment timer banner + proofs table with confirm/reject/download | Breaks payment section on client profile |
| `components/admin/clients/ClientDocumentsSection.tsx` | Document requests list + DocumentRequestForm toggle | Breaks documents section on client profile |
| `components/admin/clients/DocumentRequestForm.tsx` | Inline doc request form — title, category, description, POST to request API | Breaks admin document request UI |
| `components/admin/ui/ConfirmModal.tsx` | Accessible confirm modal — focus trap, Escape key, optional reason textarea | Breaks all admin confirmation dialogs |

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