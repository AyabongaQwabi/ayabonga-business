# Business website — AI context

Reference for agents working on **ayabonga-business** (marketing and conversion site). Align copy and UI with [`.agents/product-marketing-context.md`](../.agents/product-marketing-context.md), [`docs/brand-guidelines.md`](./brand-guidelines.md), and [`docs/redesign/Consolidated Design Guidelines.md`](./redesign/Consolidated%20Design%20Guidelines.md).

*Last updated: 17 May 2026*

---

## What this site is

| Field | Value |
| --- | --- |
| **Canonical URL** | https://business.qwabi.co.za |
| **Brand in nav** | Qwabi Engineering |
| **Legal / schema** | Qwabi Technologies (`Ayabonga Qwabi` as founder in Person schema) |
| **Repo** | `ayabonga-business` |
| **Role** | Commercial site: lead generation, SEO (Search Engine Optimization), ZAR pricing transparency, retainers, programmatic landing pages, local SEO hubs, lead capture, admin leads |

**Not** the personal portfolio. Personal site: https://www.qwabi.co.za (`ayabonga` repo). Footer link: **Personal site**.

| Site | Voice | Job |
| --- | --- | --- |
| business.qwabi.co.za | **We** (company) | Convert: estimate, discovery, retainers |
| www.qwabi.co.za | **I** (founder) | Authority, writing, craft |

---

## Positioning (Master Positioning v1.1)

**Company one-liner:** Qwabi Engineering builds AI-powered software systems that help businesses automate, scale, and modernise their operations.

**Primary shelves (ranked):**

1. Custom software development company (South Africa)
2. AI-powered software systems studio
3. Technical partner for businesses and agencies

**Geography:** South Africa first → Eastern Cape (proof, local SEO) → remote/global.

**Homepage hero (company angle):** Software development company · South Africa. Custom software development for South African businesses. Senior engineer-led delivery; Eastern Cape based; remote-friendly.

**Founder angle (not homepage H1):** `/about` via **Meet the engineer** (`FOUNDER_PAGE_LABEL` in `site-config.ts`). Personal site for full founder story.

**Core customer line:** “We need a system, not just a website. Something that actually runs the business.”

**Retired on company copy:** junior dev lottery · business-right · vague “technical partnership” as lead phrase.

**Competitors:** Never name on public pages. Category contrast only (internal list in product-marketing-context).

---

## Design system (implementation)

**Direction:** Accessible Dark Authority (dark navy, gold primary CTA, restrained motion).

| Layer | Location |
| --- | --- |
| CSS tokens | `src/index.css` (`--color-surface-*`, `--type-*`, `--space-*`) |
| Full spec | `docs/redesign/Consolidated Design Guidelines.md` |
| Hero animation | `src/lib/animations.ts` + `.hero-word` spans in `HeroSection.tsx` |
| Nav | `SiteNav.tsx` (fixed, blur on scroll, gold wordmark) |

**Motion zones:**

- **Impression:** hero kinetic typography only
- **Evaluation:** `/get-a-quote`, `/pricing-strategy`, forms (no scroll animations)
- **Transition:** services, work, testimonials (subtle reveal)

**Accessibility:** WCAG AA contrast, `prefers-reduced-motion`, keyboard focus, 44px touch targets.

**Gold rule:** One primary gold CTA per viewport. Final `#contact` section uses full gold background.

---

## Tech stack

- **Framework:** Vite + React 18 + TypeScript
- **Routing:** React Router 7 (`src/main.tsx`)
- **Styling:** Tailwind CSS + design tokens in `src/index.css` (prefer CSS variables over arbitrary hex)
- **Motion:** GSAP (hero only when motion allowed); CSS scroll-reveal in transition zones
- **SEO:** `react-helmet-async` (one `meta description` per route; no duplicate tags in `index.html`)
- **Prerender:** `scripts/prerender-developers.mjs` post-build (static HTML for key routes)
- **Hosting:** Vercel (Analytics, Speed Insights, `api/`)
- **Leads:** Vercel Blob + Resend (`api/send.ts`, `/admin`)
- **Blog:** `src/content/blog/` (routes exist; `robots.txt` disallows `/blog` for crawlers)

---

## Config and data sources

| File | Purpose |
| --- | --- |
| `src/lib/site-config.ts` | `SITE_ORIGIN`, CTAs, `ABOUT_PAGE`, `FOUNDER_PAGE_LABEL`, WhatsApp, page paths |
| `src/lib/author-profile.ts` | Founder schema fields for `/about` |
| `src/data/client-testimonials.ts` | Approved client feedback quotes |
| `src/data/pricing-strategy.ts` | Retainer tiers (align names with product-marketing-context) |
| `src/data/service-landing-pages.ts` | Service landings meta + content |
| `src/data/buyer-intent-pages.ts` | Buyer-intent landings |
| `src/data/partnership-landing-pages.ts` | Partnership landings |
| `src/data/pseo-pages.json` | `/solutions/:slug` |
| `src/data/comparisons.json` | `/vs/:slug` |
| `src/data/local-developers.json` | `/developers/...` matrix |
| `.agents/product-marketing-context.md` | Messaging, SEO, testimonials, WhatsApp templates |
| `docs/brand-guidelines.md` | Voice + visual summary |
| `CLAUDE.md` | Anti-AI writing rules (mandatory for user-facing strings) |

---

## CTAs and conversion

| Priority | Label / path | Notes |
| --- | --- | --- |
| 1 | Get estimate → `/get-a-quote` | `QUOTE_TOOL_LABEL`: “Project scope estimator” in nav |
| 2 | Book a discovery call | URL pending; prefer Cal.com when live |
| 3 | WhatsApp → `WHATSAPP_URL` | Secondary, not primary hero |
| Retainer path | `PARTNERSHIP_CTA_LABEL` → `/pricing-strategy` | “Start a technical partnership” |

**Retainer public names:** Build & Support · Product Growth · AI Systems.

**Discovery call:** Not live yet. Until then: disabled button, coming soon, or WhatsApp fallback copy per product-marketing-context.

---

## Site hierarchy

```
business.qwabi.co.za
├── Home (/)
│   ├── #services
│   ├── #partnership
│   ├── #build-costs
│   ├── #work
│   ├── #testimonials
│   ├── #pricing
│   └── #contact
├── Conversion & trust
│   ├── /projects          (full shipped-work catalog)
│   ├── /pricing-strategy
│   ├── /get-a-quote
│   ├── /app-development-cost-south-africa
│   ├── /mvp-scope-checklist
│   ├── /about          (founder / Meet the engineer)
│   └── /privacy
├── Core hubs
│   ├── /services
│   └── /technical-cofounder
├── Service landings (service-landing-pages.ts)
│   ├── /mobile-app-development-south-africa
│   └── /custom-software-development-south-africa
├── Buyer intent (buyer-intent-pages.ts)
├── Partnership landings (partnership-landing-pages.ts)
├── /solutions/:slug (pseo-pages.json)
├── /vs/:slug (comparisons.json)
├── /developers/... (local-developers.json)
├── /projects/espazza
├── /blog/:slug (de-prioritized in robots)
└── /admin/* (noindex intent)
```

When adding URLs: update data or `main.tsx`, then rebuild (sitemap + prerender).

---

## Navigation (current)

**`SiteNav`:** Services, Partnership, App costs, Retainers, Work, **Meet the engineer** (`/about`), Get a quote, Start a technical partnership.

**`SiteFooter`:** Services group, Resources (cost guide, retainers, quote), Company (Meet the engineer, Privacy, Personal site, social).

---

## Homepage section map (implemented order)

| Order | Section `id` | Component | Design notes |
| --- | --- | --- | --- |
| 1 | (hero) | `HeroSection` | Kinetic words; company H1; link to `/about` |
| 2 | `services` | `ServicesSection` | Bento-style grid target |
| 3 | `partnership` | `PartnershipSection` | Retainer story |
| 4 | `build-costs` | `BuildCostsTeaser` | Links to cost guide |
| 5 | `work` | `WorkSection` | Alternating project layout |
| 6 | `testimonials` | `TestimonialsSection` | `client-testimonials.ts` |
| 7 | `pricing` | `PricingSection` | No motion (evaluation zone) |
| 8 | `contact` | `CtaSection` | Gold full-width CTA |

---

## Client feedback (testimonials)

Source: `src/data/client-testimonials.ts` (must match approved list in `.agents/product-marketing-context.md`).

Label on site: **Client feedback** or “What clients say”, not unverified “testimonials”.

Priority clients for homepage rotation: Future Start, Warner Music Africa, Ilithiyana, eStudio Glam, Lungi The Strategist (see product-marketing-context for full nine).

**Hero proof URLs** (also use in work/case studies where relevant): futurestart.co.za, warnermusicafrica.com, anconsulting.co.za, mpumelelo.vercel.app, estudioglam.co.za, ilithiyana.co.za, lungithestrategist.com, mlab.co.za, clinicpluswtb.co.za, plus portfolio (laundry.qwabi.co.za, utaptech.co.za, etc.).

---

## SEO

**Primary cluster:** software development company south africa

**Secondary:** app development south africa · custom software eastern cape · AI automation south africa · SaaS development south africa

**Meta tags:** One description per route via Helmet only. Do not re-add global description in `index.html`.

**Eastern Cape:** Regional hubs and city/role pages; natural city names; no thin duplicate spam.

**Blog:** Disallow in robots; not primary SEO focus for this property.

**Personal site:** Does not compete for company shelf keywords.

---

## Voice and content rules (summary)

From `CLAUDE.md` + product-marketing-context:

- **We** on business pages; **I** only on `/about`
- Direct, calm, outcomes first; AI-powered sparingly
- No em dashes, no colon blog titles, no unlock/empower/transform fluff
- ZAR ranges use en dash: `R100k – R250k`
- SA payments (Paystack, PayFast, Ozow) only when accurate to scope
- POPIA (Protection of Personal Information Act) awareness where relevant, not legal advice

---

## Related repositories

| Repo | URL |
| --- | --- |
| `ayabonga-business` | https://business.qwabi.co.za |
| `ayabonga` | https://www.qwabi.co.za |

Do not assume identical routes or copy between repos.

---

## Quick checklist for AI tasks

1. Editing **ayabonga-business** unless user says otherwise.
2. Read product-marketing-context before marketing copy changes.
3. UI changes: Consolidated Design Guidelines + `src/index.css` tokens.
4. New URLs: data file + route + sitemap/prerender build.
5. One `meta description` per page (Helmet only).
6. Respect motion zones (no animation on quote/pricing).
7. Do not commit secrets (`.env.local`, admin passwords).
8. Bundle AI tool config changes (`.agents/`, `.cursor/`, etc.) when applicable per repo hygiene rules.
