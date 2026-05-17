# Investor materials (Qwabi Engineering)

Internal fundraising and accelerator pack for **ayabonga-business**. Not published on the marketing site.

## Files

| File | Purpose |
| --- | --- |
| [source-of-truth.md](./source-of-truth.md) | Canonical facts, pricing, assumptions. Update here first. |
| [one-pager.md](./one-pager.md) | Single-page investor memo (copy into PDF or Notion). |
| [pitch-deck-outline.md](./pitch-deck-outline.md) | Slide-by-slide deck script aligned to source of truth. |
| [financial-model-assumptions.md](./financial-model-assumptions.md) | Bear / base / bull retainer and project revenue logic. |

## Before you send anything externally

1. Resolve every `[VERIFY]` line in `source-of-truth.md`.
2. Pick the **fundraising entity** (solo practice, Namoota, Laundry, Trip, or newco).
3. Re-run number cross-checks in the one-pager and deck outline.
4. Remove or redact client names if NDAs apply.

## Sync with the live site

Pricing and positioning must match:

- `src/data/pricing-strategy.ts` (retainer tiers)
- `src/data/app-cost-pricing-tables.ts` (project bands)
- `docs/ai-site-context.md` (positioning)

When site pricing changes, update `source-of-truth.md` in the same PR.
