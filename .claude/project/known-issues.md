# Known Issues

> This file is a living log of bugs discovered, diagnosed, and fixed.
> Every bug that took more than 30 minutes to resolve gets documented here.
> This turns every bug into a permanent improvement to the project standard.
> Claude reads this to avoid repeating the same mistakes.

---

## How to Add an Entry

When a bug is resolved, add an entry using this format:

```markdown
---
BUG:     One sentence describing what the bug was
CAUSE:   What caused it — be specific
FIX:     What resolved it — be specific
PREVENT: Rule or check added to stop it recurring
DATE:    DD/MM/YYYY
SPRINT:  Sprint N
---
```

---

## Active Issues

> Bugs currently being investigated or worked around.
> Move to Resolved once fixed.

| Issue | Discovered | Status | Notes |
|---|---|---|---|
| [TODO: None currently] | — | — | — |

---

## Resolved Issues

> Document every resolved bug here. Newest first.

[TODO: Add entries as bugs are discovered and resolved]

---

## Example Entry (delete when first real entry is added)

---
BUG:     AnimatedCounter stuck at zero on impact section
CAUSE:   Component was a server component — useRef and useInView
         only work in client components. The ref was never attached
         to the DOM because the component never hydrated.
FIX:     Added "use client" as line 1 of AnimatedCounter.tsx.
         Confirmed ref attaches correctly in browser DevTools.
PREVENT: All components using useRef, useInView, or any Framer
         Motion hooks must have "use client" as line 1.
         Added to breaking-points standard.
DATE:    12 January 2026
SPRINT:  Sprint 2
---

---

## Recurring Patterns

> Patterns that have caused multiple bugs — extra vigilance required.

[TODO: Add patterns as they emerge — e.g. "Supabase RLS silently blocks
queries three times in Sprint 1 — always check RLS first when query
returns empty"]

---

## Dependency Issues

> Package-related problems — version conflicts, deprecated APIs, vulnerabilities.

| Package | Version | Issue | Resolution | Date |
|---|---|---|---|---|
| [TODO: package] | [TODO: version] | [TODO: issue] | [TODO: resolution] | [TODO: date] |

---

## Environment Issues

> Problems caused by environment configuration — missing vars, wrong values.

| Variable | Environment | Issue | Resolution | Date |
|---|---|---|---|---|
| [TODO: VAR_NAME] | [TODO: Production] | [TODO: issue] | [TODO: resolution] | [TODO: date] |

---

## Notes for Future Phases

> Things that were not bugs but could become problems in future sprints.
> Technical debt and deferred decisions.

[TODO: Add notes as the project progresses]

- [TODO: e.g. The contact form uses in-memory rate limiting — upgrade
  to Upstash Redis if traffic increases significantly]
- [TODO: e.g. Sanity image URLs are not optimised for mobile —
  add width/height parameters in Sprint 3]