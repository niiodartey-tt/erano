# Environment Variables

> This file documents all environment variables for this project.
> Never include actual values here — variable names only.
> Actual values live in .env.local (local) and Vercel dashboard (production).

---

## Rules

- `.env.local` is never committed to Git — it is in `.gitignore`
- `.env.example` is always committed — it contains variable names with empty values
- Add new variables to this file AND `.env.example` immediately when created
- Update Vercel dashboard before deploying any new variable
- `NEXT_PUBLIC_` prefix = available in browser (client + server)
- No prefix = server only (API routes, server components)
- Never log variable values — not even in development

---

## Variable Reference

### Supabase
[TODO: Remove this section if not using Supabase]

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Public anon key — safe for browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Bypasses RLS — never client-side |

### Sanity CMS
[TODO: Remove this section if not using Sanity]

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + Server | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Client + Server | Dataset name (usually "production") |
| `SANITY_API_TOKEN` | Server only | Read/write token for server-side mutations |

### Site

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Full production URL e.g. https://hopefrontfoundation.org |

### Email
[TODO: Remove or replace with your email service]

| Variable | Scope | Description |
|---|---|---|
| `RESEND_API_KEY` | Server only | Resend API key for transactional email |

### Analytics
[TODO: Remove or replace with your analytics service]

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client + Server | Google Analytics measurement ID |

### Payments
[TODO: Remove if not taking payments]

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Client + Server | Paystack public key |
| `PAYSTACK_SECRET_KEY` | Server only | Paystack secret key — never client-side |

### Project-Specific
[TODO: Add any additional variables specific to this project]

| Variable | Scope | Description |
|---|---|---|
| [TODO: VARIABLE_NAME] | [TODO: Scope] | [TODO: Description] |

---

## .env.example Template

Copy this into your `.env.example` file at project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=

# Email (Resend)
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Payments (Paystack)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
```

---

## Vercel Environment Configuration

Variables must be set in the Vercel dashboard for each environment:

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | ✅ | ✅ |
| `SANITY_API_TOKEN` | ✅ | ✅ | ✅ |
| `NEXT_PUBLIC_SITE_URL` | [TODO] | [TODO] | ✅ |

> [TODO: Update this table to match your actual variables]
> Pull Vercel env vars to local with: `vercel env pull .env.local`

---

## Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` bypasses all Row Level Security
  It must never appear in any client component or be logged anywhere
- `SANITY_API_TOKEN` allows writes to your CMS
  Server only — never expose to browser
- `PAYSTACK_SECRET_KEY` allows payment operations
  Server only — never expose to browser
- If any server-only key is accidentally committed or exposed:
  1. Rotate the key immediately in the service dashboard
  2. Update the value in Vercel
  3. Update `.env.local`
  4. Document the incident in known-issues.md