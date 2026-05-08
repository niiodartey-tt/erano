# Known Issues — Erano Consulting

> Last updated: May 2026
> Every resolved bug is logged here with cause, fix, and prevention rule.
> Claude reads this before debugging to avoid repeating known mistakes.
> Add an entry every time a bug is found and resolved — do not wait until sprint end.

---

## How to Log an Issue

When a bug is found and resolved, add an entry with:

- **Symptom** — what went wrong visually or functionally
- **Root cause** — the actual reason it happened
- **Fix applied** — exactly what was changed
- **Prevention rule** — what to check in future to avoid this

---

## Active Bugs

> None currently logged.

---

## Resolved Bugs

### BUG-001 — Mobile menu appearing on desktop
**Sprint:** Sprint 2
**File:** `components/layout/Navbar.tsx`
**Symptom:** Hamburger menu was showing on desktop viewports
**Root cause:** Tailwind breakpoint `md:hidden` was applied but window resize was not updating the state correctly
**Fix applied:** Replaced Tailwind breakpoint logic with JS `isMobile` state using `window.innerWidth` check + resize event listener
**Prevention rule:** Navbar uses JS `isMobile` state — never Tailwind breakpoints — to control mobile menu visibility. Do not revert this to Tailwind.

---

### BUG-002 — TickerStrip not flush at bottom of viewport
**Sprint:** Sprint 3
**File:** `app/(site)/page.tsx`
**Symptom:** TickerStrip had a gap below it before the next section
**Root cause:** Hero and TickerStrip were not wrapped in a shared container constrained to viewport height
**Fix applied:** Wrapped Hero + TickerStrip in a flex column container with `height: calc(100vh - 72px)` in `page.tsx`
**Prevention rule:** Hero and TickerStrip must always remain inside the `calc(100vh - 72px)` wrapper in `page.tsx`. Do not separate them or add margin/padding to this wrapper.

---

### BUG-003 — Framer Motion animations triggering on mount instead of scroll
**Sprint:** Sprint 3
**File:** Multiple section components
**Symptom:** Animations played immediately on page load — not when elements scrolled into view
**Root cause:** `viewport={{ once: true }}` was missing from `whileInView` props
**Fix applied:** Added `viewport={{ once: true }}` to all `whileInView` animation variants
**Prevention rule:** Every `whileInView` animation must include `viewport={{ once: true }}`. Counter animations use `useInView` — never animate on mount.

---

### BUG-004 — generateStaticParams causing build failure on resources/[slug]
**Sprint:** Sprint 6
**File:** `app/(site)/resources/[slug]/page.tsx`
**Symptom:** Build failing with static generation error on the slug page
**Root cause:** `generateStaticParams` was defined on a "use client" page — incompatible
**Fix applied:** Removed `generateStaticParams` entirely — page is "use client" and renders dynamically
**Prevention rule:** `generateStaticParams` cannot be used in "use client" files. If a dynamic route needs client hooks, remove `generateStaticParams` and allow dynamic rendering.

---

### BUG-005 — Lenis smoothTouch renamed to syncTouch in v1.3.x
**Sprint:** Sprint 8 (standards review)
**File:** `components/layout/SmoothScroll.tsx`
**Symptom:** Standard 05-breaking-points.md documents `smoothTouch: false` but Lenis renamed this option to `syncTouch` in v1.3.x
**Fix applied:** Used `syncTouch: false` in SmoothScroll.tsx — correct for installed version (1.3.23)
**Prevention rule:** When upgrading Lenis, check changelog for option renames. `.claude/standards/05-breaking-points.md` should be updated to reference `syncTouch` instead of `smoothTouch`.

---

### BUG-006 — @supabase/auth-helpers-nextjs deprecated — use @supabase/ssr
**Sprint:** Sprint 8
**File:** `middleware.ts`
**Symptom:** @supabase/auth-helpers-nextjs@0.15.0 does not export createMiddlewareClient — package is deprecated
**Fix applied:** Used @supabase/ssr (already in package.json) with getAll/setAll cookie handler pattern. Replaced getSession() with getUser() — validates JWT server-side rather than trusting cookie payload
**Prevention rule:** Never install @supabase/auth-helpers-nextjs on new projects. Always use @supabase/ssr. Always use getUser() not getSession() in middleware and server-side auth checks.

---

## Pending Issues (Known But Not Yet Fixed)

### PENDING-001 — Mobile responsiveness incomplete on multiple pages
**Identified:** Sprint 7
**Affected files:**
- `app/(site)/services/page.tsx` — alternating grid needs mobile stack fix
- `app/(site)/contact/page.tsx` — form grid needs mobile stack fix
- `app/(site)/services/page.tsx` — pricing grid needs mobile horizontal scroll or stack
- `app/(site)/tools/page.tsx` — calculator grid needs mobile stack fix
- `app/(site)/about/page.tsx` — team grid needs mobile stack fix
**Status:** Deferred to Sprint 15 — Mobile QA
**Notes:** ServicesStrip and WhyErano single-column fixes were applied in Sprint 7 via CSS classes. Remaining pages still need full 375px and 430px review.

---

### PENDING-003 — @react-email/components npm deprecation warnings
**Identified:** Sprint 8 (T008)
**File:** `emails/*.tsx`, `package.json`
**Symptom:** npm install and builds emit deprecation warnings for `@react-email/components@1.0.12` and all its sub-packages (`@react-email/body`, `@react-email/button`, etc.)
**Status:** Packages are functional — all exports verified, TypeScript passes, builds pass. Deprecation is an npm registry metadata warning, not a runtime error. Templates render correctly via `@react-email/render@2.0.8`.
**Fix when needed:** Upgrade to the latest stable `@react-email/components` in a dedicated sprint task. Check migration guide for any breaking changes in JSX output or component API before upgrading.
**Prevention rule:** Do not remove or downgrade the package mid-sprint. Functionality is confirmed working; warnings are cosmetic until an upgrade is planned.

---

### PENDING-002 — 5 known vulnerabilities in next@14.2.35
**Identified:** Sprint 8 (standards review)
**File:** `package.json`
**Symptom:** npm audit reports 5 pre-existing vulnerabilities in next@14.2.35
**Fix:** npm audit fix --force upgrades Next.js to 16+ — this is a breaking change requiring a dedicated sprint task
**Status:** Deferred — add as first task in Sprint 15 (pre-launch hardening)
**Prevention rule:** Do not run npm audit fix --force mid-sprint. Schedule Next.js major version upgrades as a standalone task with full regression testing.

---

*ApexSource Ventures · Accra, Ghana · May 2026*