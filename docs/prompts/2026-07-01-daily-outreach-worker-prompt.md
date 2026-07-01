# Daily outreach worker

## Goal

Run automated outbound lead intelligence on `business.qwabi.co.za`: discover South African development buyers via Google search, scrape contact emails, enrich existing leads, and send 12–25 branded outreach emails per day through Resend. Admin manual sends use the same branded HTML path (`logo-wide.png` header).

## Context

**Exists**

- Lead storage in Vercel Blob (`api/lib/leads/blobStore.ts`)
- Admin UI for leads and templates (`src/pages/admin/`)
- Resend integration for quote and nurture emails
- Branded email layout (`api/lib/emailLayout.ts`, `api/lib/leads/outreachEmail.ts`)
- Seed outbound leads (`src/data/lead-intelligence-seed.json`) mostly without emails

**Missing (this work)**

- Daily cron worker with volume caps
- Google search discovery (SerpAPI or Google CSE)
- Website email scraping for enrichment
- Template set aimed at SA SMEs and funded founders
- Unified `sendOutreachToLead()` for cron and admin

## Scope

**In scope**

- `api/cron/outreach-daily.ts` + `vercel.json` cron (`0 6 * * *` UTC)
- `api/lib/leads/outreachWorker.ts` orchestration
- Discovery, enrichment, send libs under `api/lib/leads/`
- Default templates in `api/lib/leads/defaultTemplates.ts` and `src/data/default-email-templates.json`
- Local dev route in `scripts/vite-plugin-local-api.mjs`

**Out of scope**

- LinkedIn/X warm-path automation
- Apollo/Clay enrichment
- Admin dashboard for daily send metrics (report returned as JSON from cron only)

## Plan link

None (implemented directly).

## Implementation instructions

1. Set env on Vercel and `.env.local`:
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BLOB_READ_WRITE_TOKEN`, `SITE_URL`
   - `CRON_SECRET` (Vercel sends `Authorization: Bearer …` on cron)
   - `OUTREACH_ENABLED=true` (optional; auto-enabled when Resend + Blob are set)
   - Discovery (at least one): `BRAVE_SEARCH_API_KEY` (free tier, recommended) **or** `SERPAPI_API_KEY` **or** `GOOGLE_CSE_API_KEY` + `GOOGLE_CSE_ID`
   - Note: Claude Pro / ChatGPT Plus are web subscriptions, not API access. The cron worker cannot use them; use Brave or paste API keys from console.anthropic.com / platform.openai.com only if you add pay-per-use API billing later.
   - Optional: `OUTREACH_DAILY_MIN` (default 12), `OUTREACH_DAILY_MAX` (default 25)

2. Deploy so `vercel.json` cron and `api/cron/outreach-daily.ts` are live.

3. Seed templates once (worker calls `ensureDefaultTemplates()` if blob store is empty).

4. Test locally:
   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:5173/api/cron/outreach-daily
   ```

5. Verify Resend dashboard for branded HTML (logo from `{SITE_URL}/logo-wide.png`).

## Acceptance

- Cron runs daily without manual action when `OUTREACH_ENABLED` and secrets are set.
- Each run discovers new outbound leads when a search provider is configured.
- Sends stop at 25/day; run logs warn if fewer than 12 sends (usually missing emails or discovery keys).
- Admin “send email” uses branded HTML via `sendOutreachToLead()`.
- Plain-text footers and templates follow `CLAUDE.md` (no em dashes in copy).
