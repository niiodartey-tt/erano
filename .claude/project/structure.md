# File & Folder Structure

> Replace this template with your actual project structure at kickoff.
> Claude reads this file to know exactly where every file lives.
> Correct file placement is enforced by this document.

---

## Root Structure

```
/
├── app/                        [TODO: describe your app structure]
├── components/                 React components
├── hooks/                      Custom React hooks
├── lib/                        Utilities and client setup
├── types/                      TypeScript type definitions
├── public/                     Static assets
├── sanity/                     [TODO: Remove if not using Sanity]
├── .claude/                    ApexSource AI standard (this folder)
├── .env.local                  Local env vars — never committed
├── .env.example                Env var names — always committed
├── .nvmrc                      Node.js version specification
├── .gitignore                  Git ignore rules
├── next.config.js              Next.js configuration
├── tailwind.config.js          Tailwind configuration
├── tsconfig.json               TypeScript configuration
├── package.json                Dependencies and scripts
└── CLAUDE.md                   AI session briefing
```

---

## App Directory (Next.js App Router)

```
app/
├── (site)/                     [TODO: Public-facing routes group]
│   ├── page.tsx                Homepage
│   ├── about/
│   │   └── page.tsx            About page
│   ├── services/
│   │   └── page.tsx            Services page
│   └── contact/
│       └── page.tsx            Contact page
├── api/                        API route handlers
│   ├── contact/
│   │   └── route.ts            Contact form submission
│   └── [TODO: add routes]
├── layout.tsx                  Root layout — Lenis, fonts, metadata
├── not-found.tsx               404 page
├── error.tsx                   Global error boundary
└── globals.css                 Tailwind base + global styles
```

> [TODO: Replace with your actual page structure]
> [TODO: Add loading.tsx and error.tsx per route as needed]

---

## Components Directory

```
components/
├── ui/                         Primitive components
│   ├── Button.tsx              Primary button component
│   ├── Input.tsx               Form input
│   ├── Badge.tsx               Status badge
│   ├── Card.tsx                Generic card container
│   └── [TODO: add as built]
├── sections/                   Page section components
│   ├── HeroSection.tsx         Homepage hero
│   ├── ServicesGrid.tsx        Services grid
│   ├── [TODO: add as built]
│   └── AnimatedCounter.tsx     Scroll-triggered number counter
├── layout/                     Structural components
│   ├── Navbar.tsx              Site navigation
│   └── Footer.tsx              Site footer
└── providers/                  Context providers
    └── LenisProvider.tsx       Smooth scroll provider
```

> [TODO: Update this as components are built each sprint]

---

## Hooks Directory

```
hooks/
├── use-section-animation.ts    Reusable whileInView animation hook
└── [TODO: add as built]
```

---

## Lib Directory

```
lib/
├── utils.ts                    cn() utility (clsx + tailwind-merge)
├── supabase-client.ts          Supabase browser client (anon key)
└── [TODO: add as needed]
```

---

## Sanity Directory (remove if not using Sanity)

```
sanity/
├── schemas/                    Content type definitions
│   ├── index.ts                Schema registry
│   ├── program.ts              [TODO: your schema]
│   └── [TODO: add as defined]
└── lib/
    ├── client.ts               Sanity client + sanityFetch()
    ├── queries.ts              ALL GROQ queries — never write inline
    └── image.ts                urlFor() image URL builder
```

---

## Types Directory

```
types/
├── supabase.ts                 Generated Supabase types
├── sanity.ts                   Sanity content type interfaces
└── env.d.ts                    Environment variable type declarations
```

---

## Public Directory

```
public/
├── images/                     Static images (logos, og images)
│   ├── logo.png                Site logo
│   ├── og-default.jpg          Default Open Graph image (1200x630)
│   └── [TODO: add as needed]
└── fonts/                      [TODO: only if self-hosting fonts]
```

> Note: Most images should be in Sanity (CMS-managed) not /public.
> /public is for logos, OG images, favicons, and site-level assets only.

---

## Key File Rules

### Files Claude must never modify without explicit instruction
[TODO: List files that are stable and off-limits — see do-not-touch.md]

### Files Claude must always update when adding new features
- `types/sanity.ts` — when adding a new Sanity schema
- `types/supabase.ts` — regenerate when adding a new Supabase table
- `sanity/schemas/index.ts` — when adding a new Sanity schema
- `sanity/lib/queries.ts` — when adding new GROQ queries
- `.env.example` — when adding new environment variables
- `CLAUDE.md` sprint status — when completing tasks

---

## Import Alias

All imports use the `@/` alias pointing to the project root:

```tsx
// Always use alias imports — never relative paths from deep folders
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { programsQuery } from "@/sanity/lib/queries"
import type { Program } from "@/types/sanity"

// Never use deep relative imports
import { Button } from "../../../components/ui/Button"  // wrong
```