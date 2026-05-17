# Marketing ideas — Qwabi Engineering (business.qwabi.co.za)

Strategic ideas for **ayabonga-business**, aligned to `docs/ai-site-context.md` and what is already shipped. This is not a generic list. It assumes heavy programmatic SEO (Search Engine Optimization), comparison pages, local developer matrix, and the `/get-a-quote` nurture sequence.

**Stage:** Early growth, solo senior engineer, lead quality over volume.  
**Primary goal:** Qualified partnership conversations (quote export, WhatsApp, retainer path).  
**Budget default:** Mostly time; paid only where intent is provable.

---

## What you already have (do not rebuild)

| Asset | Status |
| --- | --- |
| Programmatic SEO hubs | Solutions, `/vs/*`, local `/developers/*` matrix |
| Conversion tools | `/get-a-quote`, `/pricing-strategy`, cost guide |
| Email nurture | `founder-nurture-sequence.md` (days 0–14) |
| Proof | Live project URLs on home and landings |
| Blog | Live but de-prioritized in `robots.txt` for this property |

**Implication:** The next wins are distribution, qualification, and proof, not more URL templates.

---

## Top 5 ideas (ranked for your situation)

### 1. Engineering as marketing — second free tool (#15)

**One line:** Add one narrow calculator or checklist that captures a different intent than the quote tool.

**Why it fits:** You already own the “scope + ZAR ballpark” wedge. A companion tool ranks for adjacent queries and gives a second lead magnet without feeling like a duplicate quote form.

**How to start**

1. Pick one gap: e.g. “retainer vs project” decision, “MVP feature cut list”, or “rebuild vs patch” after a bad junior build.
2. Ship a single-page tool on a new path (e.g. `/mvp-scope-checklist` or `/retainer-fit`) with email capture optional, WhatsApp as primary CTA.
3. Link from high-traffic pSEO pages and one comparison page (`/vs/ayabonga-vs-junior-dev-lottery`).

**Expected outcome:** Extra organic entry points and clearer segmentation before WhatsApp.

**Resources:** 2–4 dev days, copy pass per `CLAUDE.md`, sitemap update.

---

### 2. Comparison and cost page distribution (#11 + #44)

**One line:** Treat existing `/vs/*` and `/app-development-cost-south-africa` as sales assets, not SEO-only pages.

**Why it fits:** Comparison pages are built; crawlers are not buyers. Founders discover you when these URLs show up in sales threads, LinkedIn comments, and accelerator Slack/WhatsApp groups.

**How to start**

1. Create three “paste blocks” (short paragraph + link) for: vs agency, vs junior lottery, cost guide. Store in `docs/marketing/` or admin templates.
2. Weekly habit: one LinkedIn post that answers a real objection and links one `/vs/` page (see distribution copy in `founder-nurture-sequence.md`).
3. When replying to “how much does an app cost in SA?” threads, link the cost guide before the quote tool.

**Expected outcome:** Higher click-through from social and communities; better-informed leads on WhatsApp.

**Resources:** ~2 hours/week, no ad spend.

---

### 3. Meta / Google retargeting on high-intent pages (#33)

**One line:** Retarget visitors who viewed `/get-a-quote` or `/pricing-strategy` but did not convert.

**Why it fits:** Organic and direct traffic already land on buyer-intent URLs. Retargeting is cheaper than cold B2B (business-to-business) ads because the audience is warm.

**How to start**

1. Install conversion pixels only on quote submit and WhatsApp click (if not already via analytics).
2. Build audiences: visited quote tool (no submit), visited pricing (no WhatsApp).
3. Small daily cap; creative = one proof project + “scope before you hire” + link back to quote tool.

**Expected outcome:** More quote exports and fewer empty WhatsApp messages.

**Resources:** R500–R2k/month test budget, basic ad setup, 1–2 static creatives.

---

### 4. Founder-led LinkedIn system (#35)

**One line:** Fixed weekly format tied to live builds and SA constraints (Paystack, POPIA, load-shedding delivery reality).

**Why it fits:** Solo brand; buyers hire the person. Personal site (`www.qwabi.co.za`) can stay craft-forward; business site gets the commercial CTA in bio and featured link.

**How to start**

1. Pin `business.qwabi.co.za/get-a-quote` and retainer page in profile.
2. Rotate four themes: scope mistake, architecture choice, shipped proof (Laundry, UTap, etc.), retainer vs project.
3. Repurpose one post into WhatsApp group blurb (already drafted in nurture doc).

**Expected outcome:** Inbound DMs with context; stronger E-E-A-T (experience, expertise, authoritativeness, trust) for AI and Google.

**Resources:** 2–3 posts/week, batch 30 minutes.

---

### 5. Micro-webinar or live scope clinic (#65)

**One line:** 45-minute “Scope your MVP before you sign a dev contract” using the quote tool live.

**Why it fits:** Positions TaaS (technical co-founder as a service) and filters low-intent founders (nurture email day 2 already does this in writing).

**How to start**

1. One date, Google Meet or Zoom, register via simple form or quote tool UTM.
2. Walk through 2–3 real (anonymized) scope exports; end with Q&A and partnership CTA.
3. Record → cut into 3 short clips for LinkedIn (not full blog reliance on this domain).

**Expected outcome:** 5–15 qualified attendees per session; replay as lead magnet on personal site if needed.

**Resources:** Half day prep, free tooling, optional R200 boost post on LinkedIn.

---

## Secondary ideas (when the top 5 are running)

| Idea | # | When to use |
| --- | --- | --- |
| Reddit / community answers (authentic) | 38 | Only where you add real technical value; link cost guide sparingly |
| Newsletter swap with SA startup newsletters | 58 | After one strong case study post on business site |
| Conference / meetup talk (Eastern Cape or remote) | 70 | When you have one repeatable talk from the webinar |
| Powered-by footer on client launches | 87 | On Laundry, UTap, etc. with client permission |
| Customer language mining from quote briefs | 139 | Monthly: pull phrases from High-intent exports into hero and `/vs` copy |

---

## Ideas to deprioritize (for now)

| Idea | Why wait |
| --- | --- |
| More pSEO templates | Diminishing returns; index bloat risk |
| Product Hunt launch | B2B services rarely convert; audience mismatch |
| Cold paid LinkedIn broad targeting | Expensive vs retargeting + founder content |
| Podcast tour at scale | High time cost; do 1–2 targeted pods after webinar proof |
| Blog push on this domain | Robots disallow; use personal site for long-form if needed |

---

## 90-day focus (suggested)

**Month 1:** Comparison/cost distribution habit + LinkedIn cadence.  
**Month 2:** Ship one secondary free tool + first scope clinic.  
**Month 3:** Turn on retargeting with measured CPA (cost per acquisition) per quote export.

**North-star metrics**

- Quote exports with High intent (see `founder-nurture-sequence.md`)
- WhatsApp conversations that reference scope or budget band
- Retainer conversations started from `/pricing-strategy`

---

## Related docs

- `docs/marketing/founder-nurture-sequence.md` — email and social paste copy
- `docs/ai-site-context.md` — site IA and page inventory
- `docs/brand-guidelines.md` — voice and visual system
- Repo `CLAUDE.md` — anti-AI writing rules for all public copy

---

## Task prompts (if briefing an agent)

1. Which single free tool would add the most qualified leads without overlapping `/get-a-quote`?
2. Draft three LinkedIn posts that each link a different `/vs/` page.
3. Define retargeting audiences and ad copy for quote-tool abandoners (ZAR, SA founders).
