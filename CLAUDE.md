# CLAUDE.md — Erano Consulting
> **Read this file fully before touching any code.**
> State the project, current sprint, and active task before writing anything.
> If any rule here conflicts with a request — this file wins.

---

## Session Opening

Before every session state:
1. This is the **Erano Consulting** project
2. Current sprint: **Sprint 8 — Portal Foundation**
3. Any constraints relevant to today's work

---

## Critical Rules — Always Apply Without Reading Reference Files

These apply to every task, every session, every file. No exceptions.

- Mobile-first always — Tailwind breakpoints on every component
- Tailwind CSS only — no inline styles except dynamic runtime values
- Named exports only — except Next.js `page.tsx` and `layout.tsx`
- `"use client"` on any component using hooks, events, or Framer Motion
- Never fetch data in client components for initial page render
- Every image uses `next/image` with meaningful `alt` text
- Every Supabase query destructures `{ data, error }`
- `SUPABASE_SERVICE_ROLE_KEY` never in client components — ever
- Always handle loading, error, and empty states on every fetch
- `viewport={{ once: true }}` on all `whileInView` animations
- Counters use `useInView` — never animate on mount
- `AnimatePresence` wraps every component with an `exit` prop
- One component per file — maximum 150 lines
- Every `.map()` has a unique `key` — never use array index
- Run `npm run lint && npx tsc --noEmit && npm run build && npm audit` before every sprint merge
- After every group update `.claude/project/progress.md` automatically
- After each group passes TypeScript check, commit and push to the current sprint branch automatically — do not wait to be asked

---

## Erano-Specific Rules — Always Apply

These are in addition to the critical rules above. They are absolute for this project.

- **No Sanity — ever.** Content is hardcoded. Do not suggest or install Sanity.
- **No emojis anywhere.** Lucide React or inline SVGs only.
- **Gold maximum 4× per page.** Never as a background fill.
- **`SUPABASE_SERVICE_ROLE_KEY` in `/app/api/` routes only** — never anywhere else.
- **All Supabase Storage access via signed URLs only** — no public bucket URLs ever.
- **Payment timer logic server-side only** — never in client state or localStorage.
- **Account state validated server-side on every API route** — UI gating is not enough.
- **All admin actions logged in `audit_log`** — no exceptions.
- **No plain text passwords in any email** — magic link only for first login.
- **File uploads validated by MIME type server-side** — never by extension.
- **Invoice file paths include a random UUID** — never predictable.
- **`eslint.ignoreDuringBuilds: true`** is set in `next.config.mjs` — do not remove.
- **Navbar uses JS `isMobile` state** — not Tailwind breakpoints — for mobile menu.
- **Hero + TickerStrip in `calc(100vh - 72px)` wrapper** in `app/(site)/page.tsx` — do not break this.
- **Cloudinary for public site only.** Portal files use Supabase Storage exclusively.
- **`lib/mailer.ts` is scheduled for deletion in Sprint 8.** Do not reference it in new code.

---

## Project Quick Reference

**Project:** Erano Consulting Website + Client Portal
**Client:** Erano Consulting, Accra Ghana
**Domain:** erano.vercel.app (custom domain pending client deposit)
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Lenis · Supabase · Resend · Vercel
**Current sprint:** Sprint 8 — Portal Foundation
**Active task:** See `.claude/project/sprint.md`

→ Full project details: `.claude/project/overview.md`
→ File structure: `.claude/project/structure.md`
→ Environment variables: `.claude/project/env.md`
→ Sprint status: `.claude/project/sprint.md`
→ Build progress log: `.claude/project/progress.md`
→ Do not touch: `.claude/project/do-not-touch.md`
→ Known issues: `.claude/project/known-issues.md`

---

## Design System Quick Reference

| Token | Value | Usage |
|---|---|---|
| `--ink` | `#080c14` | Dark section backgrounds |
| `--navy` | `#0d1b2e` | Headings, sidebar, footer |
| `--gold` | `#c4973a` | Accent — max 4× per page |
| `--white` | `#ffffff` | Dominant background |
| `--off` | `#f5f6f8` | Alternate section bg |
| `--line` | `#e2e5ea` | Dividers, borders |
| `--body` | `#4a5568` | Body copy |
| Font | Plus Jakarta Sans | All text — loaded via Google Fonts |
| Icons | Lucide React | No emojis — SVGs only |

---

## Route Structure Quick Reference

```
Public site:    app/(site)/                  ← Sprints 1–7 complete — do not touch
Onboarding:     app/onboarding/              ← Sprint 8
Auth:           app/login/ · app/reset-password/ · app/portal/set-password/   ← Sprint 8
Client portal:  app/portal/                  ← Sprints 9–11
Admin portal:   app/admin/                   ← Sprints 12–13
API routes:     app/api/                     ← Built per sprint
Middleware:     middleware.ts (root)          ← Sprint 8
```

---

## Reference Map — Read When the Task Requires It

| Task involves | Read this file |
|---|---|
| Any component or UI work | `.claude/standards/01-presentation.md` |
| Layout, spacing, breakpoints | `.claude/standards/02-responsive.md` |
| Tailwind, styling decisions | `.claude/standards/03-styling.md` |
| Any animation | `.claude/standards/04-animation.md` |
| Known error patterns, bugs | `.claude/standards/05-breaking-points.md` |
| Creating or refactoring components | `.claude/standards/06-components.md` |
| Supabase, API routes, data fetching | `.claude/standards/07-data-fetching.md` |
| Any interactive element or form | `.claude/standards/08-accessibility.md` |
| Images, fonts, scripts, speed | `.claude/standards/09-performance.md` |
| Git, commits, sprint merges | `.claude/standards/10-git.md` |
| TypeScript types, interfaces | `.claude/standards/11-typescript.md` |
| API routes, auth, env vars, RLS | `.claude/standards/12-security.md` |
| Installing any package | `.claude/standards/13-dependencies.md` |
| Debugging any bug | `.claude/standards/14-debugging.md` |
| Any terminal command | `.claude/standards/15-terminal.md` |
| Dates, currency, phone, Ghana content | `.claude/standards/16-ghana.md` |
| Client delivery, handoff | `.claude/standards/17-handoff.md` |

---

## Sprint 8 — What Is Being Built

**Branch:** `sprint-8`

**Security + Infrastructure (build first — everything depends on these)**
- T039 — Database indexes
- T001 — Supabase schema + RLS (all tables)
- T002 — Supabase Storage buckets + RLS
- T003 — RBAC middleware (`middleware.ts`)
- T032 — Account state validation utility (`lib/validateState.ts`)
- T007 — Migrate to Resend, delete Nodemailer (`lib/email.ts`)

**Auth flows**
- T004 — Login page (`app/login/`)
- T005 — Password reset flow (`app/reset-password/`)
- T006 — Force password change on first login (`app/portal/set-password/`)
- T031 — Magic link first login (replaces plain text password)
- T033 — Rate limiting + honeypot (`lib/ratelimit.ts`)

**Email**
- T008 — All 12 email templates (React Email)

**Onboarding**
- T009 — Multi-step onboarding form UI (`app/onboarding/`)
- T010 — Account creation API (`app/api/onboarding/submit/`)

**Do not start Sprint 9 until Sprint 8 is merged and approved by Naa.**

---

## Approval Process

Every sprint must be reviewed and approved by **Naa** on the Vercel preview URL before merging to `main`. Claude does not merge to `main` without Naa's explicit approval.

---

*ApexSource Ventures · Accra, Ghana · May 2026*