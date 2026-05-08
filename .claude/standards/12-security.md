# 12 — Security Standard

## Core Principle

Security failures on client sites are not just technical problems —
they are professional and legal liabilities. IHR handles HR data.
Erano handles financial data. Hopefront handles donor data.
Every site is treated as if it holds sensitive information.

---

## Rule 1 — Environment Variables

### Never expose server-only keys client-side

```tsx
// WRONG — catastrophic — service role bypasses all RLS
"use client"
const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)

// CORRECT — anon key in client components
"use client"
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Service role key only in server components and API routes
// app/api/contact/route.ts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // safe — server only
)
```

### Prefix rules

```
NEXT_PUBLIC_  → available in browser (client + server)
No prefix     → server only (API routes, server components)
```

### Never do with environment variables

- Never log env var values — not even in development
- Never commit `.env.local` — it is in `.gitignore`
- Always keep `.env.example` up to date with variable names
- Never hardcode credentials anywhere in the codebase
- Add new env vars to `.env.example` immediately when created
- Update Vercel environment variables before deploying

---

## Rule 2 — Input Validation and Sanitisation

Always validate and sanitise all form input before writing to the database.
Use Zod for schema validation on all API routes.

```tsx
// app/api/contact/route.ts
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(2000).trim(),
  // Never trust the client — validate everything
})

export async function POST(request: Request) {
  const body = await request.json()

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0].message },
      { status: 400 }
    )
  }

  // Use result.data — not body — after validation
  const { name, email, message } = result.data
  ...
}
```

---

## Rule 3 — Never Expose Raw Errors to Client

```tsx
// WRONG — exposes internal stack trace and database info
catch (err) {
  return NextResponse.json({ error: err.message }, { status: 500 })
}

// CORRECT — log internally, return friendly message
catch (err) {
  console.error("Contact form error:", err) // internal log only
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 }
  )
}
```

---

## Rule 4 — Rate Limiting on Public API Routes

All public API routes must have rate limiting to prevent abuse.

```tsx
// Simple in-memory rate limiting (use Upstash Redis for production)
// app/api/contact/route.ts

const rateLimit = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimit.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 }) // 1 minute window
    return true
  }

  if (limit.count >= 5) return false // max 5 requests per minute

  limit.count++
  return true
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    )
  }
  ...
}
```

For production use Upstash Redis with the `@upstash/ratelimit` package.

---

## Rule 5 — Authentication — Always Verify Server-Side

Never trust client-side authentication state for protected operations.

```tsx
// WRONG — client can manipulate this
"use client"
if (isLoggedIn) {
  // show protected content
}

// CORRECT — verify server-side on every request
// app/dashboard/page.tsx (server component)
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(...)

  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    redirect("/login") // not authenticated — redirect
  }

  // Now safe to show protected content
  return <Dashboard user={user} />
}
```

---

## Rule 6 — Content Security Policy

Add CSP headers in `next.config.js` for every project:

```js
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## Rule 7 — Sensitive Data Handling

```tsx
// Never log sensitive data — not even in development
console.log("User:", user) // WRONG if user contains email/name
console.log("Form data:", formData) // WRONG — may contain passwords

// Log only what is necessary for debugging
console.log("Form submission received for user:", user.id) // ID only — safe
console.error("Submission failed:", error.code) // error code only — safe

// Never include sensitive data in error messages returned to client
// Never store passwords — use Supabase Auth which handles this
// Never store card numbers — use a payment processor (Paystack, Stripe)
```

---

## Rule 8 — Dependency Security

```bash
# Run before every sprint merge
npm audit

# Required results before merge
# found 0 vulnerabilities ✅

# If vulnerabilities found
npm audit fix

# If npm audit fix breaks something
# Document the vulnerability in known-issues.md
# Assess actual risk before accepting
```

Zero critical vulnerabilities allowed before merging to main.
Zero high vulnerabilities allowed before merging to main.
Medium and low — document and monitor.

---

## Rule 9 — CORS

Never use wildcard CORS in production.

```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    "https://hopefrontfoundation.org",
    "https://www.hopefrontfoundation.org",
    // development only
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  ].filter(Boolean)

  if (!allowedOrigins.includes(origin ?? "")) {
    return new Response("Forbidden", { status: 403 })
  }
  ...
}
```

---

## Rule 10 — Supabase Row Level Security

Always enable RLS on every Supabase table.
Never disable RLS to solve a data access problem — write a proper policy.

```sql
-- Enable RLS on every table
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Public read access (for public content)
CREATE POLICY "Public can read programs"
ON programs FOR SELECT
TO anon
USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated users can insert contact submissions"
ON contact_submissions FOR INSERT
TO anon  -- allow anon for public contact forms
WITH CHECK (true);
```

Document which tables have RLS and what policies apply
in `.claude/project/overview.md`.

---

## Security Checklist — Every Project

- [ ] `.env.local` in `.gitignore`
- [ ] `.env.example` committed with all variable names
- [ ] `SUPABASE_SERVICE_ROLE_KEY` never in client components
- [ ] All API routes validate input with Zod
- [ ] Raw errors never returned to client
- [ ] Rate limiting on all public API routes
- [ ] Authentication verified server-side for protected routes
- [ ] Security headers configured in `next.config.js`
- [ ] RLS enabled on all Supabase tables
- [ ] `npm audit` — zero critical/high vulnerabilities
- [ ] No hardcoded credentials anywhere in codebase
- [ ] No sensitive data in console logs