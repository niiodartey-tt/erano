# File Structure — Erano Consulting

> Last updated: May 2026
> Update this file whenever new components, routes, or directories are added.

---

## Root Directory

```
~/Projects/erano/
├── .claude/
│   ├── index.md                          System map — read to understand the full .claude/ system
│   ├── standards/                        ApexSource permanent standards (17 files — never edit)
│   └── project/                          Erano-specific project files (update each sprint)
│       ├── overview.md                   ← YOU ARE HERE
│       ├── structure.md                  This file
│       ├── env.md                        All environment variables
│       ├── sprint.md                     Current sprint status
│       ├── do-not-touch.md               Off-limits and stable files
│       ├── known-issues.md               Bug log
│       ├── progress.md                   Build diary
│       └── project-setup-checklist.md    Reference only
├── app/                                  Next.js App Router
├── components/                           All React components
├── hooks/                                Custom React hooks
├── lib/                                  Utilities and service clients
├── public/                               Static assets
├── docs/                                 Project documentation
│   └── backlog.md                        Master portal backlog (v1.2)
├── CLAUDE.md                             AI session briefing — read every session
├── .env.local                            All credentials — never commit
├── .env.example                          Variable names only — committed to repo
├── .nvmrc                                Node.js version pin
├── tailwind.config.ts                    Design tokens — locked
├── next.config.mjs                       eslint.ignoreDuringBuilds: true
├── next-sitemap.config.js                Sitemap + robots.txt config
└── tsconfig.json                         TypeScript strict mode
```

---

## App Directory

```
app/
├── layout.tsx                            Root layout — viewport meta, SmoothScroll wrapper, Plus Jakarta Sans
├── globals.css                           Global CSS — design tokens, utility classes, mobile overrides
├── opengraph-image.tsx                   OG image — TODO: branded 1200×630
│
├── (site)/                               Public marketing site route group
│   ├── layout.tsx                        Navbar + PageTransition + Footer + WhatsAppFloat
│   ├── page.tsx                          Home — Hero + TickerStrip in calc(100vh - 72px) wrapper
│   │
│   ├── about/
│   │   ├── page.tsx                      ✅ Sprint 4 complete
│   │   └── layout.tsx                    SEO metadata
│   │
│   ├── services/
│   │   ├── page.tsx                      ✅ Sprint 5 complete
│   │   └── layout.tsx                    SEO metadata
│   │
│   ├── tools/
│   │   ├── page.tsx                      ✅ Sprint 5 complete — 4 Ghana tax calculators
│   │   └── layout.tsx                    SEO metadata
│   │
│   ├── contact/
│   │   ├── page.tsx                      ✅ Sprint 5 complete
│   │   └── layout.tsx                    SEO metadata
│   │
│   ├── industries/
│   │   ├── page.tsx                      ✅ Sprint 6 complete
│   │   └── layout.tsx                    SEO metadata
│   │
│   ├── resources/
│   │   ├── page.tsx                      ✅ Sprint 6 complete
│   │   ├── layout.tsx                    SEO metadata
│   │   └── [slug]/
│   │       └── page.tsx                  ✅ Sprint 6 — 3 seeded articles — "use client"
│   │
│   └── legal/
│       ├── privacy/
│       │   └── page.tsx                  Privacy policy
│       └── terms/
│           └── page.tsx                  Terms of service
│
├── onboarding/
│   └── page.tsx                          🔲 Sprint 8 — Multi-step public form (no login required)
│
├── login/
│   └── page.tsx                          🔲 Sprint 8 — Shared login, redirects by role
│
├── reset-password/
│   └── page.tsx                          🔲 Sprint 8 — Password reset landing page
│
├── portal/                               Authenticated client portal
│   ├── layout.tsx                        🔲 Sprint 9 — Sidebar + header + notification bell
│   ├── set-password/
│   │   └── page.tsx                      🔲 Sprint 8 — Force password change on first login
│   ├── dashboard/
│   │   └── page.tsx                      🔲 Sprint 9 — State-gated dashboard views
│   ├── invoice/
│   │   └── page.tsx                      🔲 Sprint 10 — T&Cs gate + invoice display
│   ├── payments/
│   │   └── page.tsx                      🔲 Sprint 10 — Upload proof + payment history
│   ├── documents/
│   │   └── page.tsx                      🔲 Sprint 11 — Document requests + uploads
│   ├── services/
│   │   └── page.tsx                      🔲 Sprint 11 — Active services view
│   ├── notifications/
│   │   └── page.tsx                      🔲 Sprint 11 — Notification centre
│   └── profile/
│       └── page.tsx                      🔲 Sprint 9 — Edit profile + change password
│
├── admin/                                Authenticated admin portal
│   ├── layout.tsx                        🔲 Sprint 12 — Admin sidebar + header
│   ├── page.tsx                          🔲 Sprint 12 — Dashboard + submissions inbox
│   ├── clients/
│   │   ├── page.tsx                      🔲 Sprint 12 — Client list + filters + search
│   │   └── [id]/
│   │       └── page.tsx                  🔲 Sprint 12 — Individual client profile + actions
│   ├── invoices/
│   │   └── page.tsx                      🔲 Sprint 13 — Invoice manager
│   └── documents/
│       └── page.tsx                      🔲 Sprint 13 — Document request manager
│
└── api/
    ├── contact/
    │   └── route.ts                      ✅ Nodemailer stub — migrate to Resend in Sprint 8
    ├── onboarding/
    │   └── submit/
    │       └── route.ts                  🔲 Sprint 8 — Account creation + magic link
    ├── portal/
    │   ├── agreements/
    │   │   └── accept/route.ts           🔲 Sprint 10 — T&Cs acceptance + timer start
    │   ├── payments/
    │   │   └── upload/route.ts           🔲 Sprint 10 — Payment proof upload
    │   └── documents/
    │       └── upload/route.ts           🔲 Sprint 11 — Document upload
    ├── admin/
    │   ├── invoices/
    │   │   └── generate/route.ts         🔲 Sprint 13 — PDF invoice generation
    │   ├── payments/
    │   │   └── confirm/route.ts          🔲 Sprint 12 — Payment confirmation/rejection
    │   └── clients/
    │       └── reactivate/route.ts       🔲 Sprint 14 — Account reactivation
    └── cron/
        └── check-expired-timers/
            └── route.ts                  🔲 Sprint 10 — Vercel cron — daily expiry check
```

---

## Components Directory

```
components/
├── layout/
│   ├── Navbar.tsx                        ✅ Sprint 2 — white bg, isMobile JS state, gold hover underline
│   ├── Footer.tsx                        ✅ Sprint 2 — ink bg, 4-col grid, social icons 44×44
│   ├── WhatsAppFloat.tsx                 ✅ Sprint 2 — 3s delay, pulse ring
│   ├── PageTransition.tsx                ✅ Sprint 1 — fade + translateY
│   └── SmoothScroll.tsx                  ✅ Sprint 1 — Lenis 1.2s ease-out
│
├── sections/                             Public site page sections
│   ├── Hero.tsx                          ✅ Sprint 3 — full-bleed video, parallax, Framer Motion stagger
│   ├── TickerStrip.tsx                   ✅ Sprint 3 — gold marquee flush at bottom of viewport
│   ├── ServicesStrip.tsx                 ✅ Sprint 3 — 3-col image cards, hover zoom, stagger
│   ├── WhyErano.tsx                      ✅ Sprint 3 — split image/ink, gold left borders
│   ├── StatsSection.tsx                  ✅ Sprint 3 — count-up, gold rule lines
│   ├── Testimonial.tsx                   ✅ Sprint 3 — auto-rotating crossfade, dot nav, 7s interval
│   ├── SectorsGrid.tsx                   ✅ Sprint 3 — 8 sectors, hover gold top border
│   └── HomeCTA.tsx                       ✅ Sprint 3 — ink bg, radial glow, single gold CTA
│
└── portal/                               🔲 Sprint 8+ — Portal-specific components
    ├── ui/
    │   ├── NotificationBell.tsx          🔲 Sprint 11 — Realtime bell + unread badge
    │   ├── ConfirmModal.tsx              🔲 Sprint 12 — Reusable admin confirmation modal
    │   ├── StateBadge.tsx                🔲 Sprint 9 — Account state badge component
    │   └── SignedFileLink.tsx            🔲 Sprint 10 — Generate signed URL on click
    ├── onboarding/
    │   └── OnboardingForm.tsx            🔲 Sprint 8 — Multi-step form (6 steps)
    ├── client/
    │   ├── DashboardPending.tsx          🔲 Sprint 9
    │   ├── DashboardAwaiting.tsx         🔲 Sprint 9
    │   ├── DashboardActive.tsx           🔲 Sprint 9
    │   ├── DashboardExpired.tsx          🔲 Sprint 9
    │   ├── InvoiceView.tsx               🔲 Sprint 10
    │   ├── AgreementGate.tsx             🔲 Sprint 10
    │   ├── PaymentTimer.tsx              🔲 Sprint 10
    │   └── PaymentUploadForm.tsx         🔲 Sprint 10
    └── admin/
        ├── ClientCard.tsx                🔲 Sprint 12
        ├── ClientProfileDetail.tsx       🔲 Sprint 12
        ├── CustomPriceInput.tsx          🔲 Sprint 13
        └── PaymentReviewPanel.tsx        🔲 Sprint 12
```

---

## Hooks Directory

```
hooks/
├── useScrollReveal.ts                    ✅ No-op — Framer Motion handles all scroll reveals
├── useCountUp.ts                         ✅ Sprint 3 — used in StatsSection
├── useParallax.ts                        ✅ Sprint 3 — used in Hero
├── useAccountState.ts                    🔲 Sprint 9 — returns current client account state
└── useNotifications.ts                   🔲 Sprint 11 — Supabase Realtime subscription
```

---

## Lib Directory

```
lib/
├── utils.ts                              cn() utility — clsx + tailwind-merge
├── images.ts                             ✅ All Cloudinary image + video keys (public site only)
├── supabase.ts                           ✅ Supabase browser client (anon key)
├── supabase-server.ts                    🔲 Sprint 8 — Supabase server client (service role — server only)
├── cloudinary.ts                         ✅ Cloudinary config (public site only)
├── mailer.ts                             ✅ Nodemailer stub — DELETE in Sprint 8, replace with email.ts
├── email.ts                              🔲 Sprint 8 — Resend client — single email utility for entire project
├── storage.ts                            🔲 Sprint 8 — Supabase Storage signed URL utility + expiry constants
├── validateState.ts                      🔲 Sprint 8 — Server-side account state validation utility
├── csrf.ts                               🔲 Sprint 12 — Origin/Referer verification utility
└── ratelimit.ts                          🔲 Sprint 8 — Upstash rate limiting utility
```

---

## Types Directory

```
types/
├── supabase.ts                           🔲 Sprint 8 — Generated Supabase types (regenerate on schema change)
├── portal.ts                             🔲 Sprint 8 — AccountState, UserRole, ClientProfile interfaces
└── env.d.ts                              🔲 Sprint 8 — Environment variable type declarations
```

---

## Middleware

```
middleware.ts                             🔲 Sprint 8 — Route protection by role
                                          /portal/* → client only
                                          /admin/* → admin only
                                          Redirects to /login if unauthenticated
```

---

## Public Directory

```
public/
├── images/
│   └── logo.png                          Placeholder — awaiting SVG from client
└── fonts/                                Empty — fonts loaded via Google Fonts in layout.tsx
```

---

## Docs Directory

```
docs/
└── backlog.md                            Master portal backlog v1.2 — 14 Epics, 45 Tickets
```

---

## Key File Rules

### Files Claude must never modify without explicit instruction from Naa

See `.claude/project/do-not-touch.md` for the full list.

### Files Claude must update when adding new features

| Action | Files to update |
|---|---|
| New Supabase table added | `types/supabase.ts` — regenerate, `overview.md` tables list |
| New environment variable | `env.md`, `.env.example` |
| New component created | This file (`structure.md`) |
| New route added | This file (`structure.md`) |
| Sprint completed | `sprint.md`, `do-not-touch.md`, `CLAUDE.md` quick reference |
| Bug resolved | `known-issues.md` |
| Any build work | `progress.md` — after every group automatically |

---

## Import Alias

All imports use the `@/` alias pointing to the project root:

```tsx
// Always
import { Navbar } from "@/components/layout/Navbar"
import { cn } from "@/lib/utils"
import type { AccountState } from "@/types/portal"

// Never
import { Navbar } from "../../../components/layout/Navbar"
```

---

## Legend

| Symbol | Meaning |
|---|---|
| ✅ | Complete and approved |
| 🔲 | Not yet built |
| 🔄 | In progress |
| ⚠️ | Needs attention / review |

---

*ApexSource Ventures · Accra, Ghana · May 2026*