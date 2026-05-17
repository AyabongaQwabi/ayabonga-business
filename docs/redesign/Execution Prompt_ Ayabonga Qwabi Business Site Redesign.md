# Execution Prompt: Ayabonga Qwabi Business Site Redesign
## Orchestrator Instructions for AI Agents

---

## 1. YOUR ROLE AND AUTHORITY HIERARCHY

You are an autonomous AI agent executing the "Accessible Dark Authority" redesign for `business.qwabi.co.za`. You operate within a strict authority hierarchy:

1. **`CONSOLIDATED-DESIGN-GUIDELINES.md`** — The highest authority. All design decisions are already made here. You do not override or reinterpret them.
2. **`CURSOR-FULL-SITE-PROMPT.md`** — The implementation specification. Exact code, component structures, and CSS are defined here. Follow them precisely.
3. **`ai-site-context.md`** — The site's content, page structure, routes, and copy. Use this as your content source.
4. **`brand-guidelines.md`** — The brand identity. Use this to verify that any content or visual decisions align with the brand voice.
5. **`CLAUDE.md`** (if present in the repo root) — Writing rules. Apply them to all visible text strings.

**When you encounter a conflict between documents, the higher-ranked document wins.** When you encounter a gap not covered by any document, stop and ask before proceeding.

---

## 2. STACK CONTEXT

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS v3 (configured to reference CSS custom properties)
- **Animation:** GSAP (hero kinetic typography only), CSS scroll-driven animations (scroll reveals), CSS transitions (micro-interactions)
- **Routing:** React Router v6
- **Fonts:** Google Fonts — Outfit (700, 800, 900), Space Grotesk (400, 500, 600), Inter (400, 500)
- **Package manager:** npm

---

## 3. REPOSITORY STRUCTURE

After implementation, the `src/` directory should look like this:

```
src/
  components/
    SiteNav.tsx
    SiteFooter.tsx
    home/
      HeroSection.tsx
      ServicesSection.tsx
      PartnershipSection.tsx
      BuildCostsTeaser.tsx
      PricingSection.tsx
      WorkSection.tsx
      CtaSection.tsx
    blog/
      BlogCard.tsx
      BlogPost.tsx
    shared/
      SectionLabel.tsx
      ServiceCard.tsx
      ProjectCard.tsx
  lib/
    animations.ts
  pages/
    HomePage.tsx
    PricingStrategyPage.tsx
    GetAQuotePage.tsx
    AboutPage.tsx
    BlogIndexPage.tsx
    BlogPostPage.tsx
    AppDevelopmentCostPage.tsx
    ServiceLandingPage.tsx
    PrivacyPage.tsx
  App.tsx
  main.tsx
  index.css
```

---

## 4. PHASED EXECUTION PLAN

Execute phases in order. Do not start Phase N+1 until Phase N is complete and verified.

### Phase 1: Design System Foundation
**Deliverables:**
- `src/index.css` updated with all CSS custom properties, global resets, reduced-motion rules, scroll-reveal keyframes, and all micro-interaction classes (`btn-primary`, `btn-outline`, `form-input`, `nav-link`, `service-card`, `section-label`, `container`).
- `tailwind.config.js` updated with font families and color tokens mapped to CSS variables.
- `index.html` updated with Google Fonts link tags and correct meta description.

**Verification:** Run `npm run dev`. The page background should be `#0A192F`. Body text should be `#E2E8F0`. No light mode flash.

### Phase 2: Shared Components
**Deliverables:**
- `src/components/SiteNav.tsx` — sticky nav with transparent-to-blur scroll transition, desktop and mobile layouts.
- `src/components/SiteFooter.tsx` — all footer link groups, correct background, brand wordmark.

**Verification:** Nav starts transparent, transitions to blurred background after scrolling 60px. All footer links render. Mobile hamburger opens and closes the menu.

### Phase 3: Animation Infrastructure
**Deliverables:**
- `gsap` installed (`npm install gsap`).
- `src/lib/animations.ts` — `prefersReducedMotion()`, `animateHeroHeadline()`, `animateHeroSupport()`.

**Verification:** With OS reduced motion OFF, `animateHeroHeadline()` runs when called. With OS reduced motion ON, the function returns immediately and text is visible in its final state.

### Phase 4: Homepage
**Deliverables:**
- All 7 homepage section components built and imported into `src/pages/HomePage.tsx`.
- Hero kinetic typography working.
- Services Bento Grid rendering correctly on desktop and collapsing to single column on mobile.
- Pricing section rendering with no scroll animations.
- Gold CTA section at the bottom.

**Verification:** Scroll through the full homepage. Verify: (1) hero headline animates in on load; (2) service cards have the Bento Grid layout; (3) pricing cards render immediately without animation; (4) the final CTA section has a gold background.

### Phase 5: Conversion Pages
**Deliverables:**
- `src/pages/GetAQuotePage.tsx` — scope estimator form with `form-input` micro-interactions, keyboard navigability, validation states, and price result display.
- `src/pages/PricingStrategyPage.tsx` — detailed pricing breakdown, comparison table, no animations.

**Verification:** Tab through the entire `/get-a-quote` form without using a mouse. Every field should be reachable. Focus indicators should be visible. Submit with an empty field — the error state should appear.

### Phase 6: Supporting Pages
**Deliverables:**
- `src/pages/AboutPage.tsx`
- `src/pages/AppDevelopmentCostPage.tsx`
- `src/pages/BlogIndexPage.tsx` and `src/pages/BlogPostPage.tsx`
- `src/pages/PrivacyPage.tsx`
- `src/pages/ServiceLandingPage.tsx` (programmatic, driven by route params)

**Verification:** All routes in `App.tsx` resolve without 404. Blog post pages use `Inter` body font and `max-width: 680px` content width.

### Phase 7: Review and Polish
**Deliverables:**
- Contrast audit: all text/background combinations verified against WCAG AA (4.5:1).
- Reduced motion audit: all GSAP calls wrapped in `prefersReducedMotion()`, CSS reduced-motion rule applied globally.
- Copy audit: all visible strings reviewed against `CLAUDE.md` rules (no em dashes, direct tone, specific CTAs).
- Performance check: no unnecessary re-renders, GSAP imported only in components that use it.

---

## 5. WHAT NOT TO DO

These are the most common mistakes. Do not make them.

- **Do not add a light mode.** There is no `dark:` variant in Tailwind. The base is the dark mode.
- **Do not use `box-shadow` for elevation.** Use `bg-surface-raised` and `border-surface-border`.
- **Do not add scroll animations to pricing, forms, or evaluation content.** The `scroll-reveal` class must not appear on any element in `PricingSection`, `GetAQuotePage`, or `PricingStrategyPage`.
- **Do not use `#000000` or `#FFFFFF` as colors.** Use the CSS custom property tokens.
- **Do not use `outline: none` without a replacement.** Focus indicators must always be visible.
- **Do not use em dashes (`—`).** Use a comma, period, or rewrite the sentence.
- **Do not add GSAP to evaluation or transaction pages.** GSAP is only used in `HeroSection.tsx` and `animations.ts`.

---

## 6. QUICK REFERENCE: DESIGN TOKENS

| Token | Value | Use |
|---|---|---|
| `--color-surface-base` | `#0A192F` | Page background |
| `--color-surface-raised` | `#112240` | Cards, panels |
| `--color-surface-overlay` | `#1E3A5F` | Hover states, modals |
| `--color-surface-border` | `#2D4A6E` | Borders |
| `--color-text-primary` | `#E2E8F0` | Main text |
| `--color-text-secondary` | `#94A3B8` | Supporting text |
| `--color-text-muted` | `#64748B` | Decorative only |
| `--color-text-inverse` | `#0A192F` | Text on gold |
| `--color-accent-gold` | `#FFD700` | Primary CTA only |
| `--color-accent-emerald` | `#059669` | Success, recommended |
