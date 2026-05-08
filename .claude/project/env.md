# Environment Variables — Erano Consulting

> Last updated: May 2026
> Update this file every time a new variable is added to the project.
> Never commit actual values — variable names only.
> Actual values live in `.env.local` (local) and Vercel dashboard (production).

---

## Rules

- `NEXT_PUBLIC_` prefix = accessible in browser — never put secrets here
- No `NEXT_PUBLIC_` prefix = server-side only — never import into client components
- `SUPABASE_SERVICE_ROLE_KEY` is the most dangerous variable in this project — server only, always
- When adding a new variable: add to `.env.local`, Vercel dashboard, and this file simultaneously
- `.env.example` must always reflect the current variable list — values as empty strings or descriptive placeholders

---

## Current Variables

### Supabase

| Variable | Scope | Description | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL | ✅ Active |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anon key — safe for browser | ✅ Active |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service role — bypasses RLS — never in client | 🔲 Add in Sprint 8 |

> **Critical:** `SUPABASE_SERVICE_ROLE_KEY` must only ever be imported in `/app/api/` route files or server actions. If it appears in any `components/`, `hooks/`, or `lib/` file that is not explicitly server-only, that is a critical security violation.

---

### Cloudinary

| Variable | Scope | Description | Status |
|---|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Server only | Cloudinary cloud name — public site images only | ✅ Active (`dyvh4ufcc`) |
| `CLOUDINARY_API_KEY` | Server only | Cloudinary API key | ✅ Active |
| `CLOUDINARY_API_SECRET` | Server only | Cloudinary API secret — never expose | ✅ Active |

> Cloudinary is used for public site media only. All portal file storage uses Supabase Storage.

---

### Resend (Email)

| Variable | Scope | Description | Status |
|---|---|---|---|
| `RESEND_API_KEY` | Server only | Resend API key — all transactional email | 🔲 Add in Sprint 8 |

> Replaces Nodemailer + Ethereal entirely. Used for public contact form and all portal email triggers.
> Domain verification required before production email delivery works — pending client deposit for custom domain.

---

### Site

| Variable | Scope | Description | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Canonical site URL — used for CSRF checks, sitemap, OG tags | ✅ Active (`https://erano.vercel.app`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Client | WhatsApp float button number | ✅ Active (`233559331276`) |

> Update `NEXT_PUBLIC_SITE_URL` when custom domain is activated.

---

### Rate Limiting

| Variable | Scope | Description | Status |
|---|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Server only | Upstash Redis URL — rate limiting on onboarding form | 🔲 Add in Sprint 8 |
| `UPSTASH_REDIS_REST_TOKEN` | Server only | Upstash Redis token | 🔲 Add in Sprint 8 |

> Used by `lib/ratelimit.ts` to enforce max 5 onboarding submissions per IP per hour.

---

### Vercel Cron

| Variable | Scope | Description | Status |
|---|---|---|---|
| `CRON_SECRET` | Server only | Secret header value — validates cron requests are from Vercel | 🔲 Add in Sprint 10 |

> The expired timer cron job at `/api/cron/check-expired-timers` checks for this header before running.
> Set in Vercel dashboard and passed as `Authorization: Bearer ${CRON_SECRET}`.

---

## Pending Variables (Blocked on Client Deposit)

| Variable | Scope | Description | Blocked on |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Update to custom domain | Domain purchase |
| `RESEND_FROM_EMAIL` | Server only | Verified sender address e.g. `hello@eranoconsulting.com` | Domain + Resend verification |

---

## .env.example (Current — Keep in Sync)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudinary (public site only)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Resend (all email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=

# Rate limiting (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cron security
CRON_SECRET=
```

---

## How to Add a New Variable

1. Add value to `.env.local`
2. Add to Vercel dashboard under Project → Settings → Environment Variables
3. Add to `.env.example` with empty value
4. Add a row to the table in this file with status `✅ Active`
5. If server-only, confirm it is never imported into client components

---

## Vercel Environment Variable Scopes

| Vercel scope | When it applies |
|---|---|
| Production | `main` branch deploys only |
| Preview | All branch deploys except main |
| Development | `vercel dev` local |

> Set all variables in Production + Preview + Development unless there is a specific reason to scope them.

---

*ApexSource Ventures · Accra, Ghana · May 2026*