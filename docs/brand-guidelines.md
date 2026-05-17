# Brand Guidelines — Qwabi Engineering (Business Site)

*Last updated: 17 May 2026*

**Canonical visual spec:** [`docs/redesign/Consolidated Design Guidelines.md`](./redesign/Consolidated%20Design%20Guidelines.md) (full tokens, motion zones, component specs).

**Canonical messaging spec:** [`.agents/product-marketing-context.md`](../.agents/product-marketing-context.md) (positioning, voice, testimonials, CTAs, SEO).

**Repo writing rules:** [`CLAUDE.md`](../CLAUDE.md) at repo root (no em dashes, no AI clichés, no colon titles).

---

## 1. Brand scope

| Property | Brand | URL | Voice |
| --- | --- | --- | --- |
| **Business site (this doc)** | Qwabi Engineering | https://business.qwabi.co.za | **We** |
| **Personal site** | Ayabonga Qwabi | https://www.qwabi.co.za | **I** |
| **Legal / schema** | Qwabi Technologies | — | Neutral |

The business site converts non-technical founders, SMME (small, medium, and micro enterprise) operators, and agency partners in South Africa. The personal site is craft, writing, and founder depth. Cross-link lightly (“founded by Ayabonga Qwabi”). Do not mix voices on the same page.

---

## 2. Purpose and values

**Purpose:** Help South African businesses automate, scale, and modernise through AI-powered custom software systems, with engineering-led delivery and optional retainers after launch.

**Values:**

1. **Systems over sites:** We build software that runs the business, not brochureware.
2. **Radical transparency:** Direct access to senior engineering, staged milestones, honest scope.
3. **African context:** Local payments, mobile-first reality, SMME operations, national and remote delivery.

---

## 3. Brand personality

**Qwabi Engineering** is an engineering-led software partner: confident, modern, calm, and close to the build.

- **Accessible dark authority:** Premium dark UI (user interface), WCAG (Web Content Accessibility Guidelines) AA contrast, no chaos.
- **Engineering clarity:** Inspired by large-firm clarity (e.g. DVT-style directness) but warmer and smaller.
- **Understated confidence:** Outcomes first, not agency hype or hustle culture.

*Filter:* Would a founder trust this on a pricing call? Does it sound like a systems partner, not a marketing agency?

---

## 4. Voice and tone

**Adjectives:** Simple, relatable, natural, constructive, clear, calm, lightly confident.

**Pronouns:** **We** on business.qwabi.co.za only. **I** only on `/about` (founder page) and personal site.

| Context | Tone | Example |
| --- | --- | --- |
| Marketing copy | Outcomes first, consultative | “We build custom software systems that help your team automate day-to-day operations.” |
| Pricing / quote | Practical, no fluff | “Tell us what process needs to improve. We will suggest a website, automation, or a full system.” |
| Technical sections | Clear, specific | “Payments integrate with Paystack or PayFast where your flow requires it.” |
| Errors / forms | Calm, actionable | “We could not save that step. Check the highlighted fields and try again.” |
| Success | Measured, value-focused | “Your scope estimate is ready. Review the range and book a discovery call.” |

### Words to use

System, automate, scale, modernise, integrate, discovery, architecture, milestones, retainer, custom software, AI-powered (sparingly), South Africa, Eastern Cape, remote.

### Words to avoid (company site)

Unlock, empower (as buzzwords), cutting edge, world-class, digital transformation, synergy, “turn dreams into reality,” hustle preaching, generic SaaS hero copy, **junior dev lottery**, **business-right**, vague **technical partnership** as a headline phrase.

### WhatsApp voice (Ayabonga, direct outreach)

Direct, calm, helpful, not salesy. Short sentences. Frame around systems and problems. Templates live in `.agents/product-marketing-context.md`.

---

## 5. Visual direction: Accessible Dark Authority

Dark-first, authoritative, conversion-focused. **Not** a portfolio playground, neo-brutalism, or generic light-mode SaaS.

### 5.1 Design principles

- **Dark navy surfaces** with tonal elevation (no drop shadows on dark cards).
- **Oversized `Outfit`** in hero and section headers.
- **African Sun Gold** for the **single primary CTA** per viewport (sparingly elsewhere).
- **Deep Emerald** for success, growth metrics, recommended pricing tier (not primary CTA).
- **Purposeful asymmetry** in services and work sections.
- **Motion zones:** kinetic hero typography only in impression zones; **no decorative motion** on pricing, quote, or forms.

### 5.2 Color system

Implementation: `src/index.css` CSS custom properties. Prefer tokens over hard-coded hex in components.

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-surface-base` | `#0A192F` | Page background |
| `--color-surface-raised` | `#112240` | Cards, panels |
| `--color-surface-overlay` | `#1E3A5F` | Hover, active nav |
| `--color-surface-border` | `#2D4A6E` | Borders between surfaces |
| `--color-text-primary` | `#E2E8F0` | Headings, body |
| `--color-text-secondary` | `#94A3B8` | Supporting copy (WCAG AA on base) |
| `--color-text-muted` | `#64748B` | Decorative only, not body |
| `--color-text-inverse` | `#0A192F` | Text on gold sections |
| `--color-accent-gold` | `#FFD700` | Primary CTA |
| `--color-accent-emerald` | `#059669` | Success, recommended tier |

**Rules:** No pure `#000000` page background. No `box-shadow` elevation on dark surfaces; use border + raised background. One gold focal action per viewport height.

### 5.3 Typography

| Font | Role | Weights |
| --- | --- | --- |
| `Outfit` | Display, nav wordmark, section titles | 700, 800, 900 |
| `Space Grotesk` | Technical body, labels, pricing | 400, 500, 600 |
| `Inter` | Long-form reading (blog) | 400, 500 |

Use `clamp()` type tokens from `src/index.css` (`--type-display-hero`, `--type-body-lg`, etc.). Section labels: uppercase, gold, `--type-label` + tracking.

### 5.4 Layout

- **Container:** max-width `1280px`, padding `clamp(1.5rem, 5vw, 4rem)`.
- **Services:** Bento grid on homepage (`#services`).
- **Work:** Alternating 55/45 panels.
- **Final CTA (`#contact`):** Full-width gold background (only section with gold fill).
- **Section padding:** `--space-24` desktop, `--space-16` mobile minimum.

### 5.5 Motion and accessibility

| Zone | Sections | Motion |
| --- | --- | --- |
| Impression | Hero, manifesto-style headers | GSAP hero word stagger (if reduced motion off) |
| Evaluation | Pricing, `/get-a-quote`, forms | **None** |
| Transition | Services, work, testimonials | Subtle scroll reveal only |

- Respect `prefers-reduced-motion` (global CSS + `prefersReducedMotion()` in `src/lib/animations.ts`).
- All interactive elements: hover, focus, active states. Visible focus rings (gold). Min touch target 44px on mobile.
- Verify WCAG AA contrast before shipping pages.

### 5.6 Key components (summary)

| Component | Notes |
| --- | --- |
| `SiteNav` | Fixed; “Qwabi Engineering” in gold Outfit; scroll blur at 60px |
| Hero | Company shelf headline; one gold phrase in headline; subhead Space Grotesk |
| Service cards | Raised surface, gold label, hover to overlay |
| Pricing cards | No animation; emerald border on recommended tier |
| Buttons | `.btn-primary` gold; `.btn-outline` gold border |
| Forms | Gold focus ring; error `#EF4444`; success emerald |

Full specs: see Consolidated Design Guidelines §6–7.

---

## 6. Logo and imagery

- **Nav wordmark:** “Qwabi Engineering” in `Outfit` 700, gold (implemented in `SiteNav`).
- **Personal name:** “Ayabonga Qwabi” on `/about` and personal site only.
- **Imagery:** Product screenshots, real project UI, dark-friendly. Avoid stock “team high-five” corporate photos.
- **No** cursor gimmicks, full-screen cinematic transitions, or art-forward experiments on the business site.

---

## 7. Messaging and proof

**Company one-liner:** Qwabi Engineering builds AI-powered software systems that help businesses automate, scale, and modernise their operations.

**Homepage angle:** Software development company · South Africa. Custom software for SA businesses. Eastern Cape based; national and remote delivery.

**Client feedback:** Use approved quotes from `.agents/product-marketing-context.md`. Label **Client feedback** on site. Do not invent testimonials.

**Retainer tier names (public):** Build & Support Retainer · Product Growth Retainer · AI Systems Retainer.

---

## 8. CTA hierarchy (business site)

1. **Get estimate** → `/get-a-quote` (`QUOTE_TOOL_LABEL`: “Project scope estimator” in nav)
2. **Book a discovery call** → URL pending (Cal.com / Calendly preferred when live)
3. **WhatsApp** → secondary (`WHATSAPP_URL` in `site-config.ts`)
4. **Start a technical partnership** → `/pricing-strategy` (retainer path)

---

## 9. Brand decision filter

Before publishing copy or UI:

1. Does this help a founder understand **what we build** and **what to do next**?
2. Is the design **accessible dark authority** (contrast, motion zones, one gold CTA)?
3. Is the voice **we**, calm, and free of banned phrases?
4. Does it match **Master Positioning** (company shelf, not freelancer-first homepage)?
5. Does it follow **`CLAUDE.md`** (no em dashes, no colon blog titles, no AI clichés)?

---

## 10. Document map for agents

| Need | Read first |
| --- | --- |
| Copy, positioning, SEO, testimonials | `.agents/product-marketing-context.md` |
| Colors, type, motion, page layout | `docs/redesign/Consolidated Design Guidelines.md` |
| Quick brand + voice + visual summary | This file |
| Routes, CTAs, IA, implementation | `docs/ai-site-context.md` |
| Anti-AI writing hard rules | `CLAUDE.md` |
