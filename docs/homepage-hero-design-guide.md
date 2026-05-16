# Homepage Hero Design Guide

Consolidated from current SaaS, B2B (Business-to-Business), and conversion-focused sources (2025–2026). Use this for **business.qwabi.co.za** homepage only. Other pages can keep `PageHero` with optional imagery.

**Sources synthesized:** DAR Design (SaaS messaging and CTA architecture), Framiq / DesignPixil (hero anatomy), GapCheck / InBuild (clarity over hype), Involve Digital / Landdding / Cosmoforge (above-the-fold patterns), Joshua Jackai / TYPZA / Whale of the Web (B2B consultant landings), plus internal brand rules in `CLAUDE.md`.

---

## 1. Job of the homepage hero

The hero must answer in under five seconds:

1. What you do (category + outcome).
2. Who it is for (South African businesses, founders, ops teams).
3. What to do next (one primary action).

It should **not** try to prove everything before the first click. Proof and detail belong below the fold or in the next section.

---

## 2. Above-the-fold rules (non-negotiable)

| Rule | Target |
|------|--------|
| Primary CTA visible without scroll | Mobile (~400–600px visible height) and desktop |
| Headline length | ~8–12 words; one clear idea |
| Subhead | 1–2 short sentences, max ~160 characters |
| Primary + secondary CTA | In hero, immediately after subhead |
| Third actions | Text link or footer of hero, not a third full-width button row |
| Proof in hero | Compact trust strip (chips or one line), not a large 2×2 grid before CTAs |
| Visual | Optional; never block CTAs. No squashed stock photos |

**Order of elements (top to bottom):**

1. Eyebrow (category + region)
2. Headline (outcome)
3. Subhead (mechanism + who)
4. CTA row (primary + secondary)
5. Optional tertiary text link
6. Compact trust strip (metrics, logos, or check chips)

---

## 3. Messaging (B2B consultant / solo engineer)

### Headline formulas that work

- **Outcome for audience:** "Mobile and custom software for South African businesses"
- **Outcome minus pain:** "Production-ready software without agency overhead"
- **Role + region:** "Senior product engineering partner in South Africa"

Avoid vague lines ("all-in-one solutions", "innovative digital experiences").

### Subhead

- Say **how** you deliver: one senior engineer, architecture to launch, retainers.
- Do not repeat the headline keywords.
- No long biography in the hero.

### CTAs (commitment hierarchy)

| Level | Example | Use |
|-------|---------|-----|
| Primary | Discuss your product (WhatsApp) | Highest intent, low friction for SA buyers |
| Secondary | View development cost ranges | Research-stage visitors |
| Tertiary | Retainer pricing (text link) | Warm traffic, not equal to primary |

One visual weight for primary. Secondary = outline or muted fill. No three equal buttons.

---

## 4. Layout and aesthetics

### Prefer open hero, not a heavy card

- Full-width section with **subtle** navy gradient or soft glow behind text.
- Avoid thick bordered boxes that add padding and push CTAs down.
- Left-aligned single column (`max-w-3xl`) reads well for consultant sites and scans faster than centered walls of text.

### Typography

| Element | Guidance |
|---------|----------|
| Eyebrow | `text-xs`, uppercase, tracking wide, gold (`primary`) |
| H1 | `text-4xl` mobile → `text-5xl` desktop, tight leading, `text-balance` |
| Subhead | `text-lg`, `text-muted-foreground`, `max-w-xl` |
| Trust chips | `text-sm`, icons optional |

### Spacing

- Top padding accounts for fixed nav (~`pt-24` / `pt-28`).
- Tight vertical rhythm: ~`mt-4` headline → subhead → `mt-6` CTAs → `mt-6` trust strip.
- Bottom padding ~`pb-10`–`pb-14` then hand off to `#services`.

### Motion and accessibility

- Respect `prefers-reduced-motion`.
- Focus rings on all interactive elements.
- Contrast WCAG (Web Content Accessibility Guidelines) AA for text on navy backgrounds.

---

## 5. What not to put in the hero

- Four bullet proofs in a 2×2 grid **above** CTAs
- Long paragraph (3+ sentences) before buttons
- Third primary-style button
- Hero image unless aspect ratio and art direction are controlled
- Feature lists, pricing tables, or service cards

---

## 6. Brand alignment (Qwabi Engineering)

- Navy `#0A192F`, gold `#FFD700`, emerald `#059669` for accents and success CTAs.
- Voice: direct, technical, not corporate (see root `CLAUDE.md`).
- South Africa and ZAR (South African Rand) context where relevant.
- No em dashes in user-facing copy.

---

## 7. Implementation checklist

- [ ] Headline + subhead + both CTAs visible on iPhone SE / 13 mini without scroll
- [ ] Lighthouse / manual check: hero LCP (Largest Contentful Paint) text-first, no huge image
- [ ] Primary CTA uses brand green for WhatsApp, gold for site actions
- [ ] Trust strip is one row (wrap on small screens)
- [ ] Section id or anchor not required; nav scrolls to `#services` below

---

## 8. Component mapping

| Piece | Component |
|-------|-----------|
| Homepage hero | `src/components/HomeHero.tsx` |
| Other marketing pages | `PageHero.tsx` (image optional) |
| Legacy split hero | `MarketingHero.tsx` (avoid for homepage) |

When in doubt, shorten copy and move proof down, not up.
