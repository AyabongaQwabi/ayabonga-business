# GSC content strategy implementation

**Date:** 2026-06-04  
**Strategy source:** [gsc-content-strategy.md](./gsc-content-strategy.md)  
**Data:** `src/config/Queries.csv`, `src/config/Pages.csv`, `src/config/Discovered - currently not indexed.csv`  
**Site:** business.qwabi.co.za (`ayabonga-business` repo)

## Goal

Turn GSC impression data into indexable, click-worthy pages on business.qwabi.co.za: new service and location URLs, stronger meta on high-impression 0-CTR pages, and sitemap/prerender coverage for discovered URLs.

## Context

- Service landing pages use `src/data/service-landing-pages.ts` and `ServiceLandingPage.tsx`.
- Local developer pages use `src/data/local-developers.json`, `src/lib/local-developers.ts`, and region routes under `/developers/:region/...`.
- Sitemap and prerender share `scripts/collect-indexable-routes.mjs`.
- **GSC reference data (not imported by the app):** `src/config/Queries.csv`, `src/config/Pages.csv`, `src/config/Discovered - currently not indexed.csv`. Keep for strategy audits; do not delete.

## Scope

- **business.qwabi.co.za:** Tier 1 and Tier 3 service pages, Gauteng/KZN developer hubs, meta and internal linking, discovered-not-indexed URL coverage
- **qwabi.co.za (`ayabonga`):** New blog posts from strategy Tier 1–3, 0-CTR meta freshness, sitemap slug alignment

## Implementation (completed)

### Prior session

1. Add 10 service landing pages in `service-landing-pages.ts` with hero mappings in `hero-images.ts`.
2. Extend `local-developers.json` and routing for Gauteng and KZN.
3. Update `collect-indexable-routes.mjs` for all regional local pages.
4. Improve meta on custom software, mobile app, web development company, app cost, and WhatsApp chatbot pages.
5. Add internal links on `/services` and custom software related links.

### This session

6. Footer and home services hub links to case studies, insights, industries, and key GSC service URLs.
7. Eastern Cape popular searches and sitemap entries for Port Alfred web designer and Gqeberha web developer.
8. Local developer pages: per-role service guide links for internal linking.
9. `/services` founder guides expanded (digital transformation, AI agent, AI integration, bespoke AI, software dev companies).
10. pSEO AI integration title/meta and optional `metaDescription` support in `DynamicServicePage.tsx`.
11. WhatsApp buyer-intent keywords include `whatsapp automation south africa`.
12. Cross-links from pSEO AI integration and proptech pages to matching service/industry URLs.

### qwabi.co.za (`ayabonga`) — this session

13. New posts (or confirmed present): `xhosa-boy-names`, `xhosa-girl-names`, `ayabonga-name-meaning`, `mastra-supabase-2026`, `claude-ai-for-building-apps-2026`, `whatsapp-automation-south-africa` (links to business WhatsApp page).
14. Meta freshness on high-impression 0-CTR posts: `build-ai-agents-libraries-2026`, `sa-payment-gateways-tco-2026`, `what-is-web-development`, `sa-bootcamp-grads-hiring-skills-2026`.
15. `scripts/collect-indexable-routes.mjs` uses frontmatter `slug` when set (matches runtime routes).
16. `App.tsx` `Navigate` import for client-side shorthand redirects (Vercel also redirects `/ai-system-integration`, `/proptech-solutions`, `/bespoke-crm-systems`).

## Acceptance

- [x] `npx tsc --noEmit` passes (verified 2026-06-04)
- [x] `SKIP_PRERENDER=1 npm run build` succeeds; sitemap includes new URLs (269+)
- [x] `/corrections` route wired in `App.tsx` (was in sitemap only)
- [x] Vercel 301s for strategy shorthand paths (`/ai-system-integration`, `/proptech-solutions`, `/bespoke-crm-systems`)
- [x] qwabi.co.za: `scripts/collect-indexable-routes.mjs` shared by sitemap + prerender; `robots.txt` on build
- [x] Cross-site footer: business → personal, personal → Qwabi Engineering
- [x] qwabi.co.za: GSC blog posts created/renamed; 0-CTR meta updated; `npx tsc --noEmit` + `npm run build` (see session notes)
- [x] business: strategy service + partnership routes verified (`/senior-product-engineer-south-africa`, Tier 1 service landings); `Navigate` import fix; `SKIP_PRERENDER=1 npm run build`
- [ ] Full `npm run build` prerender on both sites (no `SKIP_PRERENDER`) before deploy
- [ ] After deploy: request indexing in GSC for new URLs and monitor 0-CTR pages
- [ ] Optional: Vercel 301s on qwabi.co.za for renamed blog slugs if old URLs were already indexed

## Plan link

None (strategy doc only).
