# SEO strategy — business.qwabi.co.za

Last updated: 2026-05-26

**Site:** [https://business.qwabi.co.za](https://business.qwabi.co.za) (Qwabi Engineering). Personal portfolio and long-form writing live on [qwabi.co.za](https://www.qwabi.co.za); commercial hire intent targets this property.

## Data sources

| File | Purpose |
| --- | --- |
| `Research (1–3).csv` | Keyword volume/CPC exports (UTF-16 tab-separated) |
| `keyword-intent-map.json` | Cluster → URL → intent → priority |
| `competitor-landscape.md` | Who ranks for commercial terms and how we differentiate |

## Keyword validation

**Target (commercial, South Africa):**

- `software development company south africa` (~320/mo)
- `web development company in south africa` (~170/mo)
- `mobile app development south africa` (~320/mo)
- `app developers in south africa` (~480/mo)
- `custom software development`, MVP / technical co-founder variants
- `cloud architect south africa`, `AI developer south africa`

**Deprioritize:** salary, jobs, courses, accounting/payroll software, unrelated SA noise.

**Positioning:** Senior custom build + TaaS, not cheapest dev shop.

## URL map (this repo)

| Intent | Example query | Primary URL |
| --- | --- | --- |
| Software company | software development company south africa | `/custom-software-development-south-africa` |
| Web company | web development company south africa | `/web-development-company-south-africa` |
| Mobile | mobile app development south africa | `/mobile-app-development-south-africa` |
| MVP / founder | mvp developer south africa | `/mvp-developer-south-africa` |
| Cost | app development cost south africa | `/app-development-cost-south-africa` |
| Hire (person) | software developers south africa | `/developers/south-africa` |
| TaaS | technical co-founder south africa | `/technical-cofounder` |
| Industry | fintech / logistics / healthtech | `/solutions/{slug}` |
| Comparison | agency vs cofounder | `/vs/{slug}` |
| Insights | how to automate whatsapp bookings | `/insights/{slug}` |
| SEO education (personal blog) | types of seo backlinks | `https://www.qwabi.co.za/blog/types-of-seo-backlinks` |
| SEO education (personal blog) | seo for new website | `https://www.qwabi.co.za/blog/seo-brand-new-website-playbook` |

Full cluster list: `keyword-intent-map.json`.

## Anti-thin checklist (business site)

- [x] Service landings: mobile, custom software, web company, AI rapid dev
- [x] Buyer-intent pages (cost, MVP, WhatsApp bot, choose developer)
- [x] Pricing cluster pages (software, SaaS, website, AI automation)
- [x] Developer hubs (SA + Eastern Cape + city × role)
- [x] Industries, case studies, insights, comparisons, pSEO `/solutions/*`
- [x] Editorial + About + quote tool
- [x] Blog on business site (engineering/product); Grumpy SEO Guy SEO series lives on [qwabi.co.za/blog](https://www.qwabi.co.za/blog)

## Freshness

- Set `dateModified` in blog frontmatter when revising posts.
- Sitemap `lastmod` from blog frontmatter dates and insight `datePublished`.
- Refresh pricing ranges and cost guides at least quarterly.
- Publish or update 2+ insights or blog posts per month on commercial topics.

## Build / deploy

```bash
npm run build   # writes dist/sitemap.xml via scripts/generate-sitemap.mjs
```

Verify: `https://business.qwabi.co.za/sitemap.xml`, Search Console, canonicals on filtered `/blog?` (noindex via page meta).
