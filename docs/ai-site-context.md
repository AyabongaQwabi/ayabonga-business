# Business website — AI context

Reference for agents working on **ayabonga-business** (marketing and conversion site). Last aligned to repo routing in `src/main.tsx` and data under `src/data/`.

---

## What this site is

| Field | Value |
| --- | --- |
| **Canonical URL** | https://business.qwabi.co.za |
| **Brand in nav** | Qwabi Engineering |
| **Legal / schema name** | Ayabonga Qwabi (`Qwabi Technologies` in structured data) |
| **Repo** | `ayabonga-business` |
| **Role** | Commercial site: lead generation, SEO (Search Engine Optimization), pricing transparency, and partnership positioning for software work in South Africa |

This is **not** the personal portfolio site. The personal site lives at https://www.qwabi.co.za (`ayabonga` repo). The business site links to it from the footer as **Personal site**. Keep positioning distinct:

- **Personal site:** craft, writing, broader identity, art-forward home experience.
- **Business site:** buyer intent, ZAR pricing bands, retainers, programmatic landing pages, local SEO hubs, lead capture, admin leads tooling.

---

## What it is about (positioning)

**One-line:** Senior product engineer and cloud architect in South Africa who builds mobile apps, web platforms, custom business systems, ecommerce, and AI automation, with long-term technical partnership (retainers) instead of agency overhead.

**Primary audience**

- Non-technical founders and SMME (small, medium, and micro enterprise) operators in South Africa
- Teams comparing agencies, junior freelancers, no-code, or fractional CTO (Chief Technology Officer) options
- Buyers searching for local developers (Eastern Cape and national)

**Core promise**

- Direct access to the senior engineer who ships production code
- Production-minded architecture (payments, POPIA-aware patterns, mobile-first)
- Ongoing ownership via monthly retainers after launch

**Proof projects** (external live URLs, cited on home and landings)

- Laundry Marketplace — https://laundry.qwabi.co.za/
- ClinicPlus — https://clinicplusbookings.co.za/
- UTap — https://utaptech.co.za/
- Queens Connect — https://queensconnect.qwabi.co.za/
- Kingly — https://kingly.qwabi.co.za/
- eSpazza — https://xhosahiphop.co.za/ (also `/projects/espazza` case study on this site)

**Primary CTAs**

| CTA | Path / action |
| --- | --- |
| Start a technical partnership | `/pricing-strategy` |
| Project scope estimator | `/get-a-quote` |
| WhatsApp | `https://wa.me/27603116777` (pre-filled message in `site-config`) |

---

## Tech stack (implementation)

- **Framework:** Vite + React 18 + TypeScript
- **Routing:** React Router 7 (`src/main.tsx`)
- **Styling:** Tailwind CSS + design tokens in `src/index.css`
- **SEO:** `react-helmet-async`, JSON-LD in key pages, `scripts/generate-sitemap.mjs` post-build
- **Hosting:** Vercel (Analytics, Speed Insights, serverless `api/`)
- **Lead storage:** Vercel Blob + Resend email (`api/send.ts`, `/admin` portal)
- **Blog content:** Markdown in `src/content/blog/` (routes exist; see indexing note below)

**Config sources agents should read first**

| File | Purpose |
| --- | --- |
| `src/lib/site-config.ts` | Origin URL, CTAs, WhatsApp, key path constants |
| `src/lib/author-profile.ts` | Job title, bio, schema person fields |
| `docs/brand-guidelines.md` | Voice, colors, typography |
| `CLAUDE.md` (repo root) | Anti-AI writing rules for all user-facing copy |

---

## Site hierarchy (information architecture)

High-level tree. Indentation = parent → child. Dynamic counts come from current data files.

```
business.qwabi.co.za
├── Home (/)
│   ├── #services          (in-page)
│   ├── #partnership
│   ├── #build-costs
│   ├── #pricing
│   ├── #build
│   ├── #work
│   └── #contact
│
├── Conversion & trust
│   ├── /pricing-strategy          Retainer tiers and partnership philosophy
│   ├── /get-a-quote               Interactive scope / ZAR ballpark estimator
│   ├── /app-development-cost-south-africa   2026 cost guide (anchor hub)
│   ├── /about
│   └── /privacy
│
├── Core service hubs (hand-authored pages)
│   ├── /services
│   └── /technical-cofounder       TaaS (Technical co-founder as a Service) positioning
│
├── Service landings (data: service-landing-pages.ts) — 2 pages
│   ├── /mobile-app-development-south-africa
│   └── /custom-software-development-south-africa
│
├── Buyer-intent landings (data: buyer-intent-pages.ts) — 2 pages
│   ├── /mvp-developer-south-africa
│   └── /best-app-developers-south-africa
│
├── Partnership / lead landings (data: partnership-landing-pages.ts) — 5 pages
│   ├── /ai-agents-whatsapp-south-africa
│   ├── /marketplace-development-south-africa
│   ├── /logistics-platform-development-south-africa
│   ├── /technical-partnership-phase-1
│   └── /senior-product-engineer-south-africa
│
├── Industry solutions (data: pseo-pages.json) — /solutions/:slug — 12 pages
│   ├── /solutions/fintech-founders-south-africa
│   ├── /solutions/logistics-apps-cape-town
│   ├── /solutions/healthcare-startups-johannesburg
│   ├── /solutions/edutech-platforms-south-africa
│   ├── /solutions/marketplace-founders-south-africa
│   ├── /solutions/digital-transformation-experts-south-africa
│   ├── /solutions/ai-integration-specialist-south-africa
│   ├── /solutions/technical-cofounder-as-a-service-south-africa
│   ├── /solutions/proptech-solutions-south-africa
│   ├── /solutions/ecommerce-scale-south-africa
│   ├── /solutions/saas-product-engineering-south-africa
│   └── /solutions/solar-energy-platforms-south-africa
│
├── Comparisons (data: comparisons.json) — /vs/:slug — 5 pages
│   ├── /vs/technical-cofounder-vs-agency
│   ├── /vs/ayabonga-vs-junior-dev-lottery
│   ├── /vs/senior-engineering-vs-no-code
│   ├── /vs/taas-vs-fractional-cto
│   └── /vs/ayabonga-vs-dev-shops
│
├── Local SEO (data: local-developers.json)
│   ├── /developers/south-africa              Region hub
│   ├── /developers/eastern-cape              Region hub
│   └── /developers/eastern-cape/:city/:role  8 cities × 5 roles = 40 pages
│         Cities: queenstown, east-london, gqeberha, mthatha, makhanda,
│                   butterworth, qonce, port-alfred
│         Roles: software-developer, software-engineer, web-developer,
│                 web-designer, cloud-architect
│
├── Case study
│   └── /projects/espazza
│
├── Blog (implemented, de-prioritized for crawlers)
│   ├── /blog
│   └── /blog/:slug
│
├── Trust pages (components exist; verify route wiring)
│   ├── /editorial      Referenced from /about; in sitemap — confirm route in main.tsx
│   └── /corrections    In sitemap — confirm route in main.tsx
│
└── Admin (noindex intent — password protected)
    ├── /admin
    ├── /admin/leads
    ├── /admin/leads/:id
    └── /admin/templates
```

---

## Navigation vs sitemap

**Homepage primary nav** (`MarketingNav`): hash sections Services, Partnership, Work; routes App costs, Retainers; CTAs Quote tool and Partnership.

**Footer** (`SiteFooter`): About, App development cost, Retainer pricing, Services, Mobile apps, Custom software, Technical co-founder, Quote tool, Privacy, GitHub, LinkedIn, link to personal site.

**Sitemap / robots** (`scripts/generate-sitemap.mjs`):

- Includes static routes, all programmatic URLs above, and local developer matrix.
- **`Disallow: /blog`** and **`Disallow: /admin`** in `robots.txt`.
- Blog routes remain in the app for direct links but are not the SEO focus of this property.

---

## Page types (how templates map)

| Type | Route pattern | Source | Component |
| --- | --- | --- | --- |
| Home | `/` | `HomePage.tsx` | Marketing layout + sections |
| Static marketing | fixed paths | `src/pages/*.tsx` | Per-page Helmet + layout |
| Service landing | fixed paths | `service-landing-pages.ts` | `ServiceLandingPage.tsx` |
| Buyer intent | fixed paths | `buyer-intent-pages.ts` | `BuyerIntentPage.tsx` |
| Partnership landing | fixed paths | `partnership-landing-pages.ts` | `PartnershipLandingPage.tsx` |
| Industry pSEO | `/solutions/:slug` | `pseo-pages.json` | `DynamicServicePage.tsx` |
| Comparison pSEO | `/vs/:slug` | `comparisons.json` | `DynamicComparisonPage.tsx` |
| Local pSEO | `/developers/...` | `local-developers.json` | `DevelopersRegionHub`, `LocalDeveloperPage` |
| Blog | `/blog/:slug` | `src/content/blog/*.md` | `Blog.tsx`, `BlogPost.tsx` |
| Admin | `/admin/*` | Vercel Blob API | `src/pages/admin/*` |

When adding URLs, update **both** the data file (or `main.tsx` for static routes) and rely on build-time sitemap generation to pick up new paths.

---

## Homepage section map

For in-page nav and copy edits:

| Section `id` | Purpose |
| --- | --- |
| `services` | Six service pillars (mobile, web, business systems, ecommerce, AI, bespoke) |
| `partnership` | Retainer / partnership pillars |
| `build-costs` | Teaser to cost guide |
| `pricing` | Retainer pricing cards |
| `build` | Build types (marketplace, mobile, web, ops, health, fintech) |
| `work` | Project cards |
| `contact` | Final CTA block |

---

## Voice and content rules (summary)

Full rules: repo `CLAUDE.md` and `docs/brand-guidelines.md`.

- Direct, technical, personal, never corporate
- No em dashes in user-facing copy
- No colon-style blog titles (`Topic: Subtitle`)
- Avoid AI clichés and performative sass
- CTAs must be specific (partnership, scope call, WhatsApp), not vague “transform” language
- ZAR pricing ranges use en dash for ranges (e.g. `R100k – R250k`)

---

## Related repositories

| Repo | URL | Use |
| --- | --- | --- |
| `ayabonga-business` | business.qwabi.co.za | This document |
| `ayabonga` | www.qwabi.co.za | Personal brand, blog-forward, shared patterns may diverge |

Codebases share similar page names and data shapes; do not assume routes or copy are identical without checking each repo.

---

## Quick checklist for AI tasks

1. Confirm you are editing **ayabonga-business**, not the personal site, unless the user says otherwise.
2. Use `VITE_SITE_URL` / `SITE_ORIGIN` for canonical and OG URLs.
3. New marketing URLs: add data + route + rebuild sitemap.
4. Respect `CLAUDE.md` writing constraints on all visible strings.
5. Do not expose admin credentials or commit `.env.local`.
6. Payment and compliance copy should reference South African gateways (Paystack, PayFast, Ozow) only when accurate to scope.
