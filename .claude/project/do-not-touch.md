# Do Not Touch

> This file lists files and areas that are stable, sensitive, or off-limits.
> Claude must not modify anything listed here without explicit instruction from Naa.
> Update this file as the project evolves — add entries when something is finalised.

---

## Core Rule

If a file or folder is listed here:
- Do not modify it during unrelated tasks
- Do not refactor it to "clean it up"
- Do not rename it or move it
- Do not change its exports or API
- Flag it in the plan if a task genuinely requires touching it
- Wait for Naa's explicit confirmation before proceeding

---

## Always Off-Limits (Every Project)

These are off-limits on every ApexSource project without exception:

| File | Reason |
|---|---|
| `.env.local` | Never read, log, or expose env var values |
| `package-lock.json` | Never manually edit — managed by npm |
| `.gitignore` | Only modify if adding a new pattern |
| `next.config.js` | Only modify if you understand current settings |
| `tsconfig.json` | Only modify with explicit instruction |
| `tailwind.config.js` | Only add tokens — never remove existing ones |

---

## Project-Specific — Do Not Touch

> Fill in at project kickoff. Add entries throughout the project as
> components and configurations are finalised.

### Configuration Files

| File | Status | Reason |
|---|---|---|
| [TODO: /lib/supabase-client.ts] | [TODO: Stable] | [TODO: Client configured correctly — do not reconfigure] |
| [TODO: /sanity/lib/client.ts] | [TODO: Stable] | [TODO: Sanity client and fetch function configured] |
| [TODO: next.config.js] | [TODO: Stable] | [TODO: remotePatterns and security headers configured] |

### Completed Components — Do Not Refactor

> Add components here once they are reviewed, approved, and merged to main.
> These are finished — do not touch unless a specific bug requires it.

| Component | Sprint completed | Notes |
|---|---|---|
| [TODO: /components/layout/Navbar.tsx] | [TODO: Sprint 1] | [TODO: Mobile menu included — do not restructure] |
| [TODO: /components/layout/Footer.tsx] | [TODO: Sprint 1] | [TODO: All links verified — do not change structure] |
| [TODO: /components/providers/LenisProvider.tsx] | [TODO: Sprint 0] | [TODO: Scroll config finalised] |

### Sanity Schemas — Do Not Modify Without Confirmation

> Once a Sanity schema is published and content has been entered,
> changing field names or types will break existing content.

| Schema | Status | Risk if changed |
|---|---|---|
| [TODO: /sanity/schemas/program.ts] | [TODO: Live — content entered] | [TODO: Breaks existing program entries] |
| [TODO: /sanity/schemas/teamMember.ts] | [TODO: Live — content entered] | [TODO: Breaks team member entries] |

### Supabase Tables — Do Not Alter Without Migration

> Changing column names or types on live tables with data
> will break queries and may cause data loss.

| Table | Status | Risk if changed |
|---|---|---|
| [TODO: contact_submissions] | [TODO: Live — data present] | [TODO: Breaks contact form API route] |
| [TODO: newsletter_subscribers] | [TODO: Live — data present] | [TODO: Breaks newsletter signup] |

---

## In-Progress — Do Not Interfere

> These are being actively worked on in the current sprint.
> Only the assigned task branch should touch these files.

| File / Area | Active task | Sprint |
|---|---|---|
| [TODO: /components/sections/HeroSection.tsx] | [TODO: task/hero-section] | [TODO: Sprint 1] |
| [TODO: /app/(site)/programs/] | [TODO: task/programs-page] | [TODO: Sprint 1] |

> Clear this section at the end of each sprint once tasks are merged.

---

## How to Handle a Conflict

If a task genuinely requires touching a do-not-touch file:

1. Flag it clearly in the plan phase
2. State exactly what change is needed and why
3. State what the risk is if it goes wrong
4. Wait for Naa's explicit confirmation
5. Make the minimum change necessary
6. Test thoroughly before merging
7. Update this file if the status of the file changes