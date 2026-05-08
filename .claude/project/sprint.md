# Sprint Status

> This is the most frequently updated file in the project.
> Update at the start and end of every sprint.
> Claude reads this to know what is done, what is active, and what not to touch.

---

## Current Sprint

**Sprint:** [TODO: Sprint 1]
**Started:** [TODO: DD/MM/YYYY]
**Target completion:** [TODO: DD/MM/YYYY]
**Branch:** `sprint-1`
**Vercel preview:** [TODO: paste preview URL when available]

### Active Tasks

| Task | Branch | Status |
|---|---|---|
| [TODO: task description] | `task/[name]` | 🔄 In progress |
| [TODO: task description] | `task/[name]` | ⏳ Not started |
| [TODO: task description] | `task/[name]` | ⏳ Not started |

### Sprint 1 Definition of Done

- [ ] All tasks merged into `sprint-1` branch
- [ ] pagespeed.web.dev — all scores green on Vercel preview URL
- [ ] Tested on 375px, 390px, 768px, 1280px
- [ ] All links working — no `href="#"` remaining
- [ ] No console errors in browser DevTools
- [ ] Counter animations completing correctly
- [ ] All images have meaningful alt text
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All forms have associated labels
- [ ] Metadata on every page
- [ ] `npm run lint && npx tsc --noEmit && npm run build && npm audit` passes
- [ ] Naa reviewed on Vercel preview URL
- [ ] Naa confirmed approval

**Approved by Naa:** [ ]
**Merged to main:** [ ]
**Merged date:** [TODO: DD/MM/YYYY]

---

## Sprint History

### ✅ Sprint 0 — Project Setup
**Completed:** [TODO: DD/MM/YYYY]

- [x] Repository created on GitHub
- [x] Next.js project scaffolded
- [x] ApexSource standard stack installed
- [x] Vercel project linked and configured
- [x] Environment variables set in Vercel dashboard
- [x] CLAUDE.md and .claude/ folder added to repository
- [x] .nvmrc and .env.example committed
- [x] Supabase project created and tables defined
- [x] Sanity project created and schemas defined
- [x] Base layout with Lenis provider
- [x] Navbar and Footer components

---

## Upcoming Sprints

### ⏳ Sprint 2 — [TODO: Sprint theme]
**Planned start:** [TODO: DD/MM/YYYY]

Planned tasks:
- [ ] [TODO: task description]
- [ ] [TODO: task description]
- [ ] [TODO: task description]

### ⏳ Sprint 3 — [TODO: Sprint theme]
**Planned start:** [TODO: DD/MM/YYYY]

Planned tasks:
- [ ] [TODO: task description]
- [ ] [TODO: task description]

---

## Do Not Touch During Current Sprint

> These areas are being worked on or are stable.
> Claude must not modify these without explicit instruction from Naa.

- [TODO: List any in-progress or stable files/areas]
- [TODO: e.g. /sanity/schemas/ — schema definitions are finalised]
- [TODO: e.g. /components/layout/Navbar.tsx — completed in Sprint 0]

---

## Sprint Notes

> Use this section for notes, decisions, and context that affect the current sprint.

[TODO: Add any relevant notes for the current sprint]

---

## How to Update This File

### At sprint start
1. Move current sprint to Sprint History with ✅
2. Create new Current Sprint section
3. List all tasks from the backlog for this sprint
4. Create the sprint branch: `git checkout -b sprint-N`
5. Update `CLAUDE.md` Quick Reference with new sprint number

### During sprint
1. Update task status as work progresses
2. Add new tasks discovered mid-sprint
3. Note any decisions or blockers in Sprint Notes

### At sprint end
1. Work through Definition of Done checklist
2. Get Naa's approval on Vercel preview URL
3. Mark approval checkbox
4. Merge sprint branch to main
5. Mark merged checkbox and add merge date
6. Begin next sprint setup