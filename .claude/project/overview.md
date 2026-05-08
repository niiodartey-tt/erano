# Project Overview

## Basic Information

| Field | Value |
|---|---|
| Project name | [TODO: e.g. Hopefront Foundation Website] |
| Client | [TODO: Client or organisation name] |
| Domain | [TODO: hopefrontfoundation.org] |
| Project type | [TODO: Nonprofit website / SaaS platform / Consulting site / E-commerce] |
| Purpose | [TODO: One sentence — what does this site do and for whom?] |
| Primary audience | [TODO: e.g. International donors, HR managers, SME owners in Ghana] |
| Secondary audience | [TODO: e.g. Local community members, volunteers] |
| Started | [TODO: DD/MM/YYYY] |
| Target launch | [TODO: DD/MM/YYYY] |
| Delivered | [TODO: DD/MM/YYYY — fill in on handoff] |

---

## Tech Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | [TODO: Next.js] | [TODO: 16] | [TODO: App Router] |
| Language | TypeScript | Latest stable | Strict mode always |
| Styling | Tailwind CSS | Latest stable | Utility-first |
| Animation | Framer Motion | [TODO: verify at npmjs.com] | Component animations |
| Animation | Lenis | [TODO: verify at npmjs.com] | Smooth scroll |
| Animation | tailwindcss-animate | [TODO: verify at npmjs.com] | Simple UI states |
| CMS | [TODO: Sanity v3 / None] | [TODO: version] | [TODO: Hosted Studio] |
| Database | [TODO: Supabase / None] | [TODO: version] | [TODO: PostgreSQL + RLS] |
| Auth | [TODO: Supabase Auth / NextAuth / None] | — | [TODO: notes] |
| Forms | react-hook-form + zod | Latest stable | Validation via Zod |
| Icons | lucide-react | Latest stable | Only icon library |
| Deployment | Vercel | — | Auto-deploy on push to main |
| Package manager | npm | — | Linux (Ubuntu/Debian) |
| Node.js | [TODO: 20.x LTS] | — | Managed via nvm — see .nvmrc |

---

## Supabase Configuration

**Project URL:** [TODO: from Supabase dashboard]
**Project ID:** [TODO: from Supabase dashboard]

### Tables

| Table | RLS Enabled | Public Read | Notes |
|---|---|---|---|
| [TODO: contact_submissions] | [TODO: Yes] | [TODO: No] | [TODO: anon insert only] |
| [TODO: newsletter_subscribers] | [TODO: Yes] | [TODO: No] | [TODO: anon insert only] |

> Add all tables here. Document RLS status clearly.
> Claude must know which tables have RLS enabled to avoid silent query failures.

---

## Sanity CMS Configuration

**Project ID:** [TODO: from Sanity dashboard]
**Dataset:** [TODO: production]
**Studio URL:** [TODO: https://project-name.sanity.studio]

### Content Types (Schemas)

| Schema | Type | Description |
|---|---|---|
| [TODO: program] | document | [TODO: Foundation programs] |
| [TODO: teamMember] | document | [TODO: Staff and leadership] |
| [TODO: blogPost] | document | [TODO: News and stories] |
| [TODO: testimonial] | document | [TODO: Client/donor testimonials] |

> Add all Sanity schemas here. Helps Claude write correct GROQ queries.

---

## Third Party Integrations

| Service | Purpose | Notes |
|---|---|---|
| [TODO: Vercel Analytics] | [TODO: Page view tracking] | [TODO: Free tier] |
| [TODO: Resend] | [TODO: Transactional email] | [TODO: Contact form notifications] |
| [TODO: Paystack] | [TODO: Donations] | [TODO: Ghana payment gateway] |

> List all third-party services connected to this project.

---

## Audience and Context

**Is this a dual-audience site?** [TODO: Yes / No]

If yes, describe the audiences:
- **Local audience:** [TODO: e.g. Ghanaian SME owners and HR professionals]
- **International audience:** [TODO: e.g. International donors and embassies]

**Currency display:** [TODO: GHS only / GHS and USD / USD only]
**Language tag:** [TODO: en-GH / en]
**Phone format:** [TODO: +233 international / 0XX local / both]

---

## Project-Specific Rules

Rules specific to this client that extend or override the ApexSource standard:

- [TODO: e.g. All copy must be approved by client before sprint merge]
- [TODO: e.g. Adinkra symbols — Adinkrahene = Leadership, Nea Onnim = Learning]
- [TODO: e.g. Client uses Paystack not Stripe for all payments]
- [TODO: e.g. Blog posts are managed entirely in Sanity — never hardcoded]
- [TODO: e.g. Gallery images uploaded to Sanity — not stored in /public]

---

## Key Contacts

| Role | Name | Contact |
|---|---|---|
| Client primary | [TODO: Name] | [TODO: email or phone] |
| Client CMS manager | [TODO: Name] | [TODO: email] |
| ApexSource lead | Naa | naa@apexsourceventures.com |