# Project Overview — Erano Consulting

> Last updated: May 2026
> Maintained by: ApexSource Ventures

---

## Project Identity

| Field | Value |
|---|---|
| **Project name** | Erano Consulting Website + Client Portal |
| **Client** | Erano Consulting (Accra, Ghana) |
| **Domain** | erano.vercel.app (pending: custom domain via GoDaddy) |
| **Purpose** | Public marketing site + authenticated client onboarding and service portal |
| **Primary audience** | Ghanaian businesses seeking tax, audit, accounting, and advisory services |
| **Secondary audience** | Internal admin team managing client accounts |
| **Live URL** | https://erano.vercel.app |
| **GitHub** | https://github.com/niiodartey-tt/erano.git |
| **Local path** | ~/Projects/erano |

---

## Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 14 | App Router |
| Language | TypeScript | Latest | Strict mode |
| Styling | Tailwind CSS | v3 | No inline styles |
| Animations | Framer Motion | Latest | whileInView, AnimatePresence |
| Smooth scroll | Lenis | Latest | 1.2s ease-out, wraps entire app |
| Database | Supabase (PostgreSQL) | Latest | RLS enforced on every table |
| Auth | Supabase Auth | Latest | Magic link first login |
| File storage | Supabase Storage | Latest | Private buckets, signed URLs only |
| Email | Resend | Latest | All transactional + public contact form |
| Hosting | Vercel | Latest | Auto-deploy on push to main |
| Font | Plus Jakarta Sans | — | Google Fonts, loaded in layout.tsx |
| Icons | Lucide React | Latest | No emojis — SVGs only |
| Image CDN | Cloudinary | — | Public site only — hero images and media |

---

## No CMS — Hardcoded Content

**Sanity is NOT used on this project and must never be added.**

All content is hardcoded in component files. There are no Sanity schemas, no GROQ queries, no `sanityFetch()` calls, and no Sanity Studio. If a task seems to require a CMS, flag it to Naa — do not install Sanity.

---

## Design System (Locked — Do Not Change)

### Colours

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#080c14` | Hero backgrounds, dark sections |
| `--navy` | `#0d1b2e` | Headings, footer bg, portal sidebar |
| `--gold` | `#c4973a` | Single accent — max 4× per page |
| `--white` | `#ffffff` | Dominant background — 80% of site |
| `--off` | `#f5f6f8` | Alternate section backgrounds |
| `--line` | `#e2e5ea` | Dividers, borders |
| `--body` | `#4a5568` | Body copy |

### Typography

| Role | Weight | Size | Notes |
|---|---|---|---|
| Display headings | 700–800 | clamp(3rem, 6.5vw, 5.25rem) | — |
| Section headings | 700 | clamp(2rem, 3.5vw, 3rem) | — |
| Body | 400 | 1rem | line-height 1.8 |
| Eyebrow labels | 600 | 0.6875rem | tracked 0.2em, uppercase, gold |

### Layout

| Token | Value |
|---|---|
| Max container | 1440px |
| Side padding | clamp(1.5rem, 5.5vw, 5rem) |
| Section padding | clamp(5rem, 9vw, 7.5rem) |

### Motion

| Effect | Spec |
|---|---|
| Scroll reveals | Framer Motion whileInView — fade up 40px, 0.7s |
| Page transitions | fade 0.4s |
| Image hover zoom | 1.12 scale, 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Hero parallax | 0.35x scroll speed — disabled on mobile |
| Smooth scroll | Lenis 1.2s ease-out |

### Design Rules

- No card borders on dark sections — content sits directly on ink/navy backgrounds
- Left-aligned headings on all pages
- Gold used maximum 4× per page
- No emojis anywhere — Lucide React SVGs or inline SVGs only

---

## Supabase Tables

| Table | RLS | Notes |
|---|---|---|
| `users` | ✅ Required | role: `client` / `admin`, account_state |
| `client_profiles` | ✅ Required | All onboarding form data + custom_price_ghs |
| `packages` | ✅ Required | price_ghs nullable for Custom package |
| `invoices` | ✅ Required | final_price_ghs locked at generation |
| `agreements` | ✅ Required | T&Cs acceptance log with version |
| `agreement_versions` | ✅ Required | Versioned legal content |
| `payment_timers` | ✅ Required | Server-side only — 5 business days |
| `payment_proofs` | ✅ Required | Private storage, signed URLs |
| `document_requests` | ✅ Required | Admin to client requests |
| `document_uploads` | ✅ Required | Client uploads against requests |
| `notifications` | ✅ Required | In-app bell — Supabase Realtime |
| `audit_log` | ✅ Required | Every admin action logged |
| `cron_log` | ✅ Required | Expired timer cron run history |

---

## Supabase Storage Buckets

| Bucket | Access | Signed URL Expiry |
|---|---|---|
| `payment-proofs` | Private | 15 minutes |
| `document-uploads` | Private | 30 minutes |
| `invoices` | Private | 1 hour |

---

## Account States

| State | Description |
|---|---|
| `pending` | Form submitted — awaiting consultation |
| `awaiting_agreement` | Invoice generated — client must accept T&Cs |
| `awaiting_payment` | T&Cs accepted — timer running — bank details visible |
| `awaiting_confirmation` | Payment proof uploaded — admin reviewing |
| `active` | Payment confirmed — fully onboarded |
| `expired` | 5 business day payment window elapsed — locked |

---

## User Roles

| Role | Access |
|---|---|
| `client` | Own portal only — state-gated routes |
| `admin` | Full admin dashboard — all clients and actions |

---

## Third-Party Integrations

| Service | Purpose | Credentials |
|---|---|---|
| Supabase | DB, Auth, Storage | `.env.local` |
| Cloudinary | Public site images and video | `.env.local` — `CLOUDINARY_CLOUD_NAME=dyvh4ufcc` |
| Resend | All transactional email | `.env.local` — pending domain verification |
| Vercel | Hosting and cron jobs | Vercel dashboard |
| Google Fonts | Plus Jakarta Sans | Loaded in `app/layout.tsx` |

---

## Services (Real — Client Approved)

1. **Accountancy Services** — annual accounts, management accounts, bookkeeping, payroll, SSNIT
2. **Business Services** — start-up, RGD registration, strategic growth, company secretarial
3. **Tax Planning & Advice** — corporation tax, personal tax, VAT, PAYE, GRA audit

## Pricing Plans (Real — Client Approved)

| Plan | Price |
|---|---|
| Free Introductory | GHS 0 |
| Starter Essentials | GHS 16,500/yr |
| Growth Booster | GHS 24,500/yr (most popular) |
| Business Pro | GHS 32,500/yr |
| Elite Advantage | GHS 37,500/yr |
| Custom | Admin-set after negotiation |

---

## Project-Specific Rules

These rules are absolute for this project. They override general preferences.

| # | Rule |
|---|---|
| R1 | No Sanity — ever. Content is hardcoded. Do not suggest or install Sanity. |
| R2 | No emojis anywhere on the site or portal. Lucide React or inline SVGs only. |
| R3 | Gold used maximum 4× per page. Never as a background fill. |
| R4 | `SUPABASE_SERVICE_ROLE_KEY` in server-side API routes only — never imported into any client component. |
| R5 | All Supabase Storage access via signed URLs only — no public bucket URLs ever. |
| R6 | Payment timer logic lives server-side only — never in client state or localStorage. |
| R7 | Account state transitions validated server-side on every API route — UI gating alone is not sufficient. |
| R8 | All admin actions must be logged in `audit_log` — no exceptions. |
| R9 | No plain text passwords in any email template. Magic link only for first login. |
| R10 | File uploads validated by MIME type server-side — never by extension or client Content-Type header. |
| R11 | Invoice file paths include a random UUID — never predictable sequential paths. |
| R12 | `eslint.ignoreDuringBuilds: true` is set in next.config.mjs — do not remove. |
| R13 | Navbar uses JS `isMobile` state — not Tailwind breakpoints — to control mobile menu. |
| R14 | Hero + TickerStrip wrapped in `calc(100vh - 72px)` flex container in home page.tsx. |
| R15 | Cloudinary is for public site only. Portal files use Supabase Storage exclusively. |

---

## Blocked Items (Pending Client Deposit)

| Item | Blocked on |
|---|---|
| Custom domain (GoDaddy) | Client deposit |
| Resend domain verification | Custom domain |
| Real team photos | Client to supply |
| Company logo SVG | Client to supply |
| Final copy review | Client to supply |

---

*ApexSource Ventures · Accra, Ghana · May 2026*