# Consolidated Design Guidelines
## Ayabonga Qwabi Business Site — `business.qwabi.co.za`
### Synthesized from 2025–2026 B2B, Dark Mode, and Motion Design Research

---

## PREAMBLE: Why This Document Exists

This document is the single source of truth for all visual, layout, motion, and interaction decisions on the Ayabonga Qwabi business site. It supersedes any prior design notes, Figma files, or informal decisions. Every agent, developer, or designer working on this site reads this document first.

The business site is **not** the personal portfolio. The personal site (`www.qwabi.co.za`) can be experimental, art-forward, and identity-expressive. The business site (`business.qwabi.co.za`) has one job: convert non-technical founders and SMME operators in South Africa into leads — retainer clients, project scopes, and WhatsApp conversations. Every design decision in this document is evaluated against that job.

---

## 1. Design Direction: "Accessible Dark Authority"

### 1.1 The Selection and Why

After evaluating seven design directions against the brand personality ("Technical Partner — confident, modern, understated yet bold") and the site's commercial purpose (B2B lead generation), the selected direction is **Accessible Dark Authority**.

This direction is a synthesis of three converging trends documented in 2025–2026 research:

**Dark-First Design as Premium Signal.** Research from Muzli (2026) confirms that dark-first design is now the premium standard for technical products. Linear, Arc Browser, Warp, and Raycast all launched dark-first. Their light modes exist but feel secondary. The dark interface is the designed version. For a senior engineering brand targeting technical buyers, a dark-first site signals that the person behind it understands the tools and aesthetics of the craft [1].

**Accessible Dark Mode as Competitive Advantage.** WebAIM's 2026 Million report found that 95.9% of the top one million home pages had detected WCAG failures, and 83.9% had low-contrast text. This means that a dark site that is *also* properly accessible is rare and stands out. Smashing Magazine's 2025 research on inclusive dark mode design confirms that accessible dark themes reduce bounce rates by as much as 70% in tested implementations [2].

**Restrained Kinetic Typography for B2B Conversion.** The 2026 Practical Guide on kinetic typography (Threestudio) makes a critical distinction: kinetic typography earns its cost when "the animation is the product" — in hero sections where the typographic moment is the reason the page exists. It actively undermines B2B SaaS pages where users came to evaluate a feature, and transaction flows where motion adds latency perception and user anxiety [3]. This distinction is the governing rule for all motion on this site.

### 1.2 What This Direction Looks Like

The site is dark, authoritative, and visually striking — but it is never chaotic or distracting. The visual language is:

- **Dark navy surfaces** with tonal elevation creating depth (not drop shadows)
- **Oversized `Outfit` typography** in the hero and section headers, commanding attention
- **African Sun Gold** used sparingly as the single highest-contrast element on any given page — reserved for the primary CTA
- **Purposeful asymmetry** in service and project layouts, breaking the predictable B2B grid
- **Kinetic typography** only in hero and manifesto sections; stripped away in pricing, forms, and evaluation content
- **Micro-interactions** on every interactive element, proving the interface is alive and responsive

### 1.3 What This Direction Is Not

To be explicit about the boundaries:

- It is **not** neo-brutalism. No raw borders, clashing colors, or intentional chaos.
- It is **not** a portfolio site. No full-screen image takeovers, cursor-following effects, or cinematic page transitions.
- It is **not** generic SaaS. No light mode, no hero illustration, no "transform your business" copy.
- It is **not** over-animated. Motion is a tool, not a feature.

---

## 2. Color System

### 2.1 The Problem with Pure Black

The most common dark mode mistake is using pure black (`#000000`) as the background. Smashing Magazine's research on inclusive dark mode design explains why: pure black creates excessive contrast with light text, causing halation — a blurring effect around text edges — for users with astigmatism. It also makes the interface feel flat and undifferentiated [2].

The brand's Deep Navy (`#0A192F`) is the correct base. It is dark enough to signal the dark mode aesthetic, but warm enough to be comfortable for extended reading sessions.

### 2.2 Surface Hierarchy

Dark mode depth is created through luminance, not shadows. Each elevation level is a slightly lighter version of the base color. This is the Material You tonal elevation model applied to the brand's navy palette [1].

| Token | Hex | HSL | Usage |
|---|---|---|---|
| `--color-surface-base` | `#0A192F` | `222 62% 11%` | Main page background. The darkest level. |
| `--color-surface-raised` | `#112240` | `219 58% 16%` | Cards, panels, pricing tiers, service blocks. |
| `--color-surface-overlay` | `#1E3A5F` | `213 51% 24%` | Hover states, active nav items, modal backgrounds. |
| `--color-surface-border` | `#2D4A6E` | `210 42% 30%` | Subtle borders between surface levels. |

**Rule:** Never use `box-shadow` on dark surfaces. Use `border: 1px solid var(--color-surface-border)` and a background one level higher to indicate elevation.

### 2.3 Text Hierarchy

Off-white for primary text is non-negotiable. Pure white (`#FFFFFF`) on `#0A192F` creates a contrast ratio of approximately 14:1 — far above the WCAG AA requirement of 4.5:1 — and causes eye strain during extended reading [2].

| Token | Hex | Contrast vs Base | Usage |
|---|---|---|---|
| `--color-text-primary` | `#E2E8F0` | 11.2:1 | Headings, body copy, primary labels. |
| `--color-text-secondary` | `#94A3B8` | 5.1:1 | Metadata, captions, secondary labels. Meets WCAG AA. |
| `--color-text-muted` | `#64748B` | 3.2:1 | Decorative text only. Never use for readable content. |
| `--color-text-inverse` | `#0A192F` | — | Text on gold/emerald backgrounds (CTAs). |

### 2.4 Accent Colors

The brand has two accent colors. Their usage is strictly defined to maintain visual hierarchy.

**African Sun Gold (`#FFD700`)** is the primary accent. It is the highest-contrast element on any page. Its job is to draw the eye to the single most important action. Rules:
- Use it for the primary CTA button only.
- Use it for the single most important link or label in a section.
- Do not use it for decorative purposes.
- Do not use it for more than one element per viewport height.

**Deep Emerald (`#059669`)** is the secondary accent. Its job is to signal success, growth, and positive outcomes. Rules:
- Use it for success states in forms.
- Use it for growth metrics and positive data points.
- Use it for the "active" state of the retainer tier the user has selected.
- Do not use it as a CTA color.

### 2.5 CSS Custom Properties (Full Implementation)

Add the following to the `:root` block in `src/index.css`. Do not use Tailwind color classes directly for these values — always reference the CSS custom property so that any future theming or overrides work correctly.

```css
:root {
  /* Surfaces */
  --color-surface-base:    #0A192F;
  --color-surface-raised:  #112240;
  --color-surface-overlay: #1E3A5F;
  --color-surface-border:  #2D4A6E;

  /* Text */
  --color-text-primary:   #E2E8F0;
  --color-text-secondary: #94A3B8;
  --color-text-muted:     #64748B;
  --color-text-inverse:   #0A192F;

  /* Accents */
  --color-accent-gold:    #FFD700;
  --color-accent-gold-hover: #FFE033;
  --color-accent-emerald: #059669;
  --color-accent-emerald-hover: #10B981;

  /* Semantic */
  --color-success:  #059669;
  --color-warning:  #F59E0B;
  --color-error:    #EF4444;
  --color-info:     #3B82F6;
}
```

---

## 3. Typography System

### 3.1 Font Stack

The site uses three fonts in a strict hierarchy. Each font has a defined role and must not be used outside it.

| Font | Role | Weights Used | Where |
|---|---|---|---|
| `Outfit` | Display / Authority | 700, 800, 900 | Hero headlines, section titles, the brand name in nav |
| `Space Grotesk` | Technical / Data | 400, 500, 600 | Pricing numbers, code references, spec labels, body copy in technical sections |
| `Inter` | Legibility / Reading | 400, 500 | Long-form body text, blog posts, form labels |

Load all three from Google Fonts. Add to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### 3.2 Type Scale

Use `clamp()` for all type sizes to ensure fluid scaling from mobile to desktop without breakpoint-specific overrides.

```css
:root {
  /* Display — Outfit only */
  --type-display-hero:   clamp(3.5rem, 9vw, 9rem);   /* Hero headline */
  --type-display-lg:     clamp(2.75rem, 6vw, 6rem);  /* Section manifesto lines */
  --type-display-md:     clamp(2rem, 4vw, 4rem);     /* Section headings */

  /* Heading — Outfit or Space Grotesk */
  --type-heading-lg:     clamp(1.5rem, 2.5vw, 2.25rem);
  --type-heading-md:     clamp(1.25rem, 2vw, 1.75rem);
  --type-heading-sm:     clamp(1rem, 1.5vw, 1.375rem);

  /* Body — Space Grotesk or Inter */
  --type-body-lg:        clamp(1.0625rem, 1.5vw, 1.25rem);
  --type-body-md:        clamp(0.9375rem, 1.25vw, 1.0625rem);
  --type-body-sm:        0.875rem;

  /* Label — Space Grotesk, uppercase */
  --type-label:          0.75rem;
  --type-label-tracking: 0.12em;

  /* Line heights */
  --leading-display:  0.9;
  --leading-heading:  1.1;
  --leading-body:     1.65;
  --leading-relaxed:  1.8;
}
```

### 3.3 Typography Rules

**Display text (`Outfit`, 700–900):**
- Letter spacing: `-0.03em` to `-0.05em` (tight, authoritative).
- Line height: `var(--leading-display)` (0.9). Allow lines to overlap slightly for dramatic effect in hero sections.
- Color: `var(--color-text-primary)` by default. Use `var(--color-accent-gold)` for a single word or phrase in a hero headline to create emphasis.

**Body text (`Space Grotesk` or `Inter`):**
- Letter spacing: `0` (normal). Never track body text.
- Line height: `var(--leading-body)` (1.65) minimum. Use `var(--leading-relaxed)` (1.8) for blog posts.
- Color: `var(--color-text-primary)` for primary content, `var(--color-text-secondary)` for supporting content.

**Label text (`Space Grotesk`, uppercase):**
- Font size: `var(--type-label)` (0.75rem).
- Letter spacing: `var(--type-label-tracking)` (0.12em).
- Color: `var(--color-accent-gold)` for section labels. `var(--color-text-secondary)` for metadata.

---

## 4. Layout System

### 4.1 Grid Foundation

The site uses a 12-column grid with a maximum content width of `1280px` and horizontal padding of `clamp(1.5rem, 5vw, 4rem)`.

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}
```

### 4.2 Purposeful Asymmetry

The B2B asymmetry principle means that not every section uses the same column split. The goal is to create visual rhythm by alternating the weight of content across sections [4].

| Section | Desktop Layout | Purpose |
|---|---|---|
| Hero | Full-width, text left-aligned, large right negative space | Command attention, let the headline breathe |
| Services | Bento Grid (see below) | Create hierarchy between primary and secondary services |
| Partnership | 60/40 split, text left, visual right | Text-first, visual as supporting evidence |
| Build Costs | Centered, narrow (max 720px) | Focus, no distraction during information gathering |
| Pricing | 3-column equal grid | Comparison clarity |
| Work | Alternating left/right, 55/45 | Create rhythm, prevent monotony |
| Contact/CTA | Full-width, centered | Maximum impact for the final conversion moment |

### 4.3 The Bento Grid (Services Section)

The `#services` section uses a Bento Grid — a CSS Grid layout with variable cell sizes that creates visual hierarchy through scale [4]. The primary service (Custom Software Development) gets a large cell; secondary services get smaller cells.

```css
.services-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

/* Primary service — large cell */
.service-card--primary {
  grid-column: span 7;
  grid-row: span 2;
}

/* Secondary services */
.service-card--secondary {
  grid-column: span 5;
}

/* Tertiary services */
.service-card--tertiary {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .services-bento {
    grid-template-columns: 1fr;
  }
  .service-card--primary,
  .service-card--secondary,
  .service-card--tertiary {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

### 4.4 Spacing Scale

Use a consistent spacing scale based on a 4px base unit. Define these as CSS custom properties.

```css
:root {
  --space-1:  0.25rem;  /*  4px */
  --space-2:  0.5rem;   /*  8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

Section vertical padding: `var(--space-24)` minimum on desktop, `var(--space-16)` on mobile.

---

## 5. Motion & Animation System

### 5.1 The Governing Rule

Animation on this site is governed by a single rule derived from 2026 kinetic typography research [3]:

> **Motion earns its cost when the animation is the product. Motion undermines when the user is in evaluation mode.**

This translates to two zones:

| Zone | Pages / Sections | Motion Level | Rationale |
|---|---|---|---|
| **Impression Zone** | Hero, Manifesto, About hero | High — kinetic typography, staggered entrances | The typographic moment is the reason the section exists. Motion earns attention. |
| **Evaluation Zone** | Pricing, Build Costs, Forms, `/get-a-quote` | None — static, instant | Users are evaluating data. Motion adds latency perception and anxiety. |
| **Transition Zone** | Services, Work, Partnership | Low — subtle scroll reveals, no kinetic type | Content enters the viewport cleanly. Motion signals structure, not spectacle. |

### 5.2 Accessibility: Non-Negotiable

All animations must respect `prefers-reduced-motion`. This is not optional. A significant portion of users — people with vestibular disorders, epilepsy, motion sensitivity from medication, or personal preference — has motion reduced at the OS level [3].

**CSS implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**JavaScript/GSAP implementation:**
```typescript
// src/lib/animations.ts
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wrap every GSAP call:
export const safeAnimate = (fn: () => void): void => {
  if (!prefersReducedMotion()) fn();
};
```

### 5.3 Hero Kinetic Typography

The hero headline uses a GSAP staggered word entrance. This is the highest-intensity animation on the site and is only used once — in the hero section.

**Pattern: Staggered Word Entrance**
```typescript
import { gsap } from 'gsap';
import { prefersReducedMotion } from './animations';

export const animateHeroHeadline = (containerEl: HTMLElement): void => {
  if (prefersReducedMotion()) return;

  const words = containerEl.querySelectorAll('.hero-word');

  gsap.fromTo(
    words,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    }
  );
};
```

**HTML structure required:**
```tsx
// Wrap each word in a span with class "hero-word"
// This is done in the component, not via SplitText
<h1 ref={heroRef} className="hero-headline">
  {heroWords.map((word, i) => (
    <span key={i} className="hero-word inline-block">{word}&nbsp;</span>
  ))}
</h1>
```

### 5.4 Scroll Reveal (Transition Zone)

For service cards, project panels, and partnership sections, use a simple CSS scroll-driven animation. This costs zero JavaScript and degrades gracefully on older browsers [3].

```css
@supports (animation-timeline: scroll()) {
  .scroll-reveal {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 40%;
  }

  @keyframes reveal-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Fallback for browsers without scroll-driven animation support */
@supports not (animation-timeline: scroll()) {
  .scroll-reveal {
    opacity: 1;
    transform: none;
  }
}
```

Apply the `scroll-reveal` class to: service cards, project cards, partnership pillars, and testimonial blocks.

### 5.5 Micro-interactions

Every interactive element must acknowledge its state change. These are defined as CSS transitions, not GSAP, for performance and simplicity.

```css
/* Primary CTA Button */
.btn-primary {
  background: var(--color-accent-gold);
  color: var(--color-text-inverse);
  transition: background 150ms ease-out, transform 150ms ease-out;
}
.btn-primary:hover {
  background: var(--color-accent-gold-hover);
  transform: scale(1.02);
}
.btn-primary:active {
  transform: scale(0.98);
}

/* Navigation links */
.nav-link {
  position: relative;
  color: var(--color-text-secondary);
  transition: color 200ms ease-out;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--color-accent-gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease-out;
}
.nav-link:hover {
  color: var(--color-text-primary);
}
.nav-link:hover::after,
.nav-link[aria-current="page"]::after {
  transform: scaleX(1);
}

/* Form inputs */
.form-input {
  border: 1px solid var(--color-surface-border);
  background: var(--color-surface-raised);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--color-accent-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);
}
```

### 5.6 The Sticky Navigation Transition

The navigation bar starts transparent and transitions to a blurred, semi-opaque background on scroll. This is a micro-interaction at the layout level.

```typescript
// In SiteNav.tsx
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

```css
.site-nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: background 300ms ease, backdrop-filter 300ms ease;
}
.site-nav--transparent {
  background: transparent;
  backdrop-filter: none;
}
.site-nav--scrolled {
  background: rgba(10, 25, 47, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-surface-border);
}
```

---

## 6. Component Specifications

### 6.1 Navigation (`SiteNav`)

- **Position:** Fixed, full-width, `z-index: 100`.
- **Left:** Brand wordmark "Qwabi Engineering" in `Outfit` 700, `var(--color-accent-gold)`, `font-size: 1.125rem`.
- **Center/Right:** Navigation links using `Space Grotesk` 500, `font-size: 0.8125rem`, uppercase, `letter-spacing: 0.08em`.
- **CTAs:** Two buttons — "Get a Quote" (solid gold) and "WhatsApp" (outline gold). Both `font-size: 0.8125rem`.
- **Mobile:** Hamburger icon opens a full-screen overlay with large navigation links.

### 6.2 Hero Section

- **Height:** `min-height: 100svh`.
- **Background:** `var(--color-surface-base)` with a subtle radial gradient: `radial-gradient(ellipse at 20% 50%, rgba(5, 150, 105, 0.06) 0%, transparent 60%)`.
- **Headline:** `Outfit` 900, `var(--type-display-hero)`, `var(--leading-display)`, `var(--color-text-primary)`. One key word or phrase in `var(--color-accent-gold)`.
- **Subheadline:** `Space Grotesk` 400, `var(--type-body-lg)`, `var(--color-text-secondary)`, `max-width: 560px`.
- **CTA:** Primary gold button + secondary WhatsApp link.
- **Animation:** GSAP staggered word entrance on the headline only. Subheadline and CTA fade in after headline completes.

### 6.3 Service Cards (Bento Grid)

- **Background:** `var(--color-surface-raised)`.
- **Border:** `1px solid var(--color-surface-border)`.
- **Border radius:** `0.75rem`.
- **Padding:** `var(--space-8)` desktop, `var(--space-6)` mobile.
- **Label:** `Space Grotesk` 500, uppercase, `var(--type-label)`, `var(--color-accent-gold)`.
- **Title:** `Outfit` 700, `var(--type-heading-lg)`, `var(--color-text-primary)`.
- **Description:** `Space Grotesk` 400, `var(--type-body-md)`, `var(--color-text-secondary)`.
- **Hover:** Background transitions to `var(--color-surface-overlay)`, border color to `var(--color-accent-gold)` at 40% opacity. `transition: all 200ms ease-out`.

### 6.4 Pricing Cards

- **Background:** `var(--color-surface-raised)`.
- **Border:** `1px solid var(--color-surface-border)`. Active/recommended tier: `1px solid var(--color-accent-emerald)`.
- **No animation.** These are evaluation elements. They render immediately, fully visible.
- **Price:** `Outfit` 800, `var(--type-display-md)`, `var(--color-text-primary)`. Currency symbol in `Space Grotesk` 400 at 60% size.
- **Features list:** `Space Grotesk` 400, `var(--type-body-sm)`, `var(--color-text-secondary)`. Checkmarks in `var(--color-accent-emerald)`.
- **CTA:** Full-width button. Primary tier: gold. Other tiers: outline gold.

### 6.5 Project Cards (`#work`)

- **Layout:** Alternating left/right, 55/45 split on desktop, stacked on mobile.
- **Image area:** Rounded corners (`0.5rem`), `overflow: hidden`. Image uses `object-fit: cover`.
- **Text area:** Slightly overlaps the image container by `var(--space-6)` to break the rigid grid.
- **Project label:** `Space Grotesk` 500, uppercase, `var(--type-label)`, `var(--color-accent-gold)`.
- **Project title:** `Outfit` 700, `var(--type-heading-lg)`, `var(--color-text-primary)`.
- **Description:** `Space Grotesk` 400, `var(--type-body-md)`, `var(--color-text-secondary)`.
- **Link:** "View project →" in `var(--color-accent-gold)`, underline on hover.

### 6.6 Final CTA Section

- **Background:** `var(--color-accent-gold)`. This is the only section with a gold background — it signals the end of the page and the primary action.
- **Text:** `Outfit` 900, `var(--type-display-md)`, `var(--color-text-inverse)` (dark navy).
- **Subtext:** `Space Grotesk` 400, `var(--type-body-lg)`, `rgba(10, 25, 47, 0.7)`.
- **Buttons:** Primary — dark navy background, gold text. Secondary — outline dark navy.

---

## 7. Page-by-Page Design Rules

### 7.1 Homepage (`/`)

The homepage is the highest-intensity page on the site. It uses the full range of design tools — kinetic typography in the hero, Bento Grid for services, asymmetric project layout, and the gold CTA section.

Section order is fixed:
1. Hero (kinetic typography, full viewport)
2. Services Bento Grid
3. Partnership pillars
4. Build Costs teaser (links to `/app-development-cost-south-africa`)
5. Pricing cards (no animation)
6. Selected Work (alternating layout)
7. Final CTA (gold background)

### 7.2 Pricing Strategy (`/pricing-strategy`)

This is an evaluation page. Design rules:
- No scroll animations on any content.
- Use `--color-surface-raised` for the retainer tier comparison table.
- Use `--color-accent-emerald` to highlight the recommended tier.
- Use `Space Grotesk` for all pricing numbers and feature lists.
- The page's primary CTA is "Start a technical partnership" — gold button, placed after the comparison table.

### 7.3 Get a Quote (`/get-a-quote`)

This is a transaction page. Design rules:
- No decorative animations.
- Full keyboard navigability required. Tab order must be logical.
- Form inputs use the focus glow micro-interaction (gold border + gold shadow).
- Validation errors use `--color-error` (`#EF4444`) with a clear error message below the field.
- Success state uses `--color-success` (`#059669`) with a confirmation message.
- The estimator result (ZAR price range) is displayed in `Outfit` 800, large, gold text.

### 7.4 Service Landing Pages

These pages are programmatically generated from `service-landing-pages.ts`. Design rules:
- Use the same component library as the homepage.
- Each page has a hero with a page-specific headline (kinetic typography applies).
- Below the hero: a brief description, a list of relevant services, and a CTA.
- No Bento Grid on these pages — use a simple 2-column feature list.

### 7.5 Blog Posts (`/blog/:slug`)

Blog posts are the product layer. Design rules:
- No scroll animations on body text.
- Max content width: `680px`, centered.
- Body text: `Inter` 400, `var(--type-body-lg)`, `var(--leading-relaxed)`, `var(--color-text-primary)`.
- Headings: `Outfit` 700, `var(--type-heading-md)`.
- A reading progress bar (2px, gold) at the top of the viewport.
- Code blocks: `Space Grotesk` monospace, `var(--color-surface-raised)` background, gold text.

---

## 8. Accessibility Checklist

Before any page ships, verify:

- All text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).
- All interactive elements are keyboard-accessible (Tab, Enter, Space, Escape).
- All images have descriptive `alt` attributes.
- All form inputs have associated `<label>` elements.
- All animations respect `prefers-reduced-motion`.
- The site is navigable with a screen reader (test with NVDA or VoiceOver).
- Focus indicators are visible on all interactive elements (never `outline: none` without a replacement).

---

## References

[1] Muzli. "Dark Mode Design Systems: A Complete Guide to Patterns, Tokens, and Hierarchy." April 12, 2026. https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/

[2] Smashing Magazine. "Inclusive Dark Mode: Designing Accessible Dark Themes For All Users." April 15, 2025. https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/

[3] Threestudio. "Kinetic Typography in Web Design: The 2026 Practical Guide." April 18, 2026. https://www.3str.net/blog/kinetic-typography-in-web-design

[4] Clear Digital. "B2B Website Design Trends Worth Building Around." July 25, 2025. https://www.cleardigital.com/insights/b2b-website-design-trends-2025

[5] Lovable. "Dark Mode Websites: 10 Stunning Examples and What Makes Them Work." February 16, 2026. https://lovable.dev/guides/dark-mode-website-examples-guide

[6] Sessions.edu. "2025's Top Web Design Trends." March 4, 2025. https://www.sessions.edu/notes-on-design/top-web-design-trends/
