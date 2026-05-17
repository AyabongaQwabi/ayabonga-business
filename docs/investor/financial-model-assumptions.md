# Financial model assumptions — retainer studio

Planning model for **Qwabi Engineering** (solo-led, capacity-constrained).  
Not audited financials. Replace `[VERIFY]` with actuals from bookkeeping.

Currency: **ZAR**. En dash for ranges.

---

## 1. Capacity constraints (solo founder)

| Assumption | Value | Notes |
| --- | --- | --- |
| Billable hours / week | 30–35 | Remainder: sales, admin, learning |
| Max concurrent retainers (solo) | 3–4 | Mix-dependent |
| Ecosystem clients at once | ≤1 | High incident + architecture load |
| Growth clients at once | 1–2 | With Essential only, or alone |
| Project build overlap | 1 major + retainers | Or 2 small MVPs |

**Honest opinion:** Claiming five Ecosystem retainers on one senior engineer is not credible in diligence.

---

## 2. Retainer revenue layers

Monthly retainer **from** prices (site):

| Tier | Low anchor (ZAR/mo) |
| --- | --- |
| Essential | 18 000 |
| Growth | 45 000 |
| Ecosystem | 85 000 |

### Scenario A — Bear (solo, conservative)

| Client mix | Count | MRR (ZAR) | ARR (ZAR) |
| --- | --- | --- | --- |
| Essential | 2 | 36 000 | 432 000 |
| Growth | 0 | 0 | 0 |
| Ecosystem | 0 | 0 | 0 |
| **Total** | **2** | **36 000** | **432 000** |

Plus projects: `[VERIFY]` (e.g. one R150k build in year = +150k)

### Scenario B — Base (solo, sustainable)

| Client mix | Count | MRR (ZAR) | ARR (ZAR) |
| --- | --- | --- | --- |
| Essential | 1 | 18 000 | 216 000 |
| Growth | 1 | 45 000 | 540 000 |
| Ecosystem | 0 | 0 | 0 |
| **Total** | **2** | **63 000** | **756 000** |

Plus projects: `[VERIFY]` (e.g. R400k project revenue across year)

**Blended ARR (example):** 756k + 400k = **1.156m** (only if projects actually close)

### Scenario C — Bull (solo at ceiling or first hire)

| Client mix | Count | MRR (ZAR) | ARR (ZAR) |
| --- | --- | --- | --- |
| Essential | 1 | 18 000 | 216 000 |
| Growth | 1 | 45 000 | 540 000 |
| Ecosystem | 1 | 85 000 | 1 020 000 |
| **Total** | **3** | **148 000** | **1 776 000** |

Requires strict scope, async client comms, and minimal firefighting.

### Scenario D — Bull + hire (post-raise)

| Client mix | Count | MRR (ZAR) | ARR (ZAR) |
| --- | --- | --- | --- |
| Essential | 2 | 36 000 | 432 000 |
| Growth | 2 | 90 000 | 1 080 000 |
| Ecosystem | 1 | 85 000 | 1 020 000 |
| **Total** | **5** | **211 000** | **2 532 000** |

**Costs to model:** `[VERIFY]` contractor or employ (CTC), tools, cloud pass-through, tax.

---

## 3. Project revenue (non-recurring)

Reference **planning bands** from `app-cost-pricing-tables.ts`. Model as discrete deals:

| Deal type | Planning band | Example recognition |
| --- | --- | --- |
| Mobile MVP | R100k – R250k | 50% deposit / 50% launch |
| Marketplace MVP | R200k – R450k | Milestone-based |
| Rescue / audit | [VERIFY day rate] | Time & materials |

**Conversion assumption:** `[VERIFY]` % of builds convert to Essential or Growth within 90 days of launch.

---

## 4. Cost structure (template)

| Line | Monthly (ZAR) | Annual (ZAR) |
| --- | --- | --- |
| Founder draw / salary | `[VERIFY]` | |
| Contractor or hire | `[VERIFY]` | |
| Cloud & SaaS (dev tools) | `[VERIFY]` | |
| Marketing (ads, content) | `[VERIFY]` | |
| Legal / accounting | `[VERIFY]` | |
| Insurance | `[VERIFY]` | |

**Gross margin:** High on retainers if solo; drops when paying senior contractor at Growth-tier economics unless billed through.

---

## 5. Sensitivity

| Variable | If it moves… |
| --- | --- |
| Churn on Growth client | −R45k MRR; may need 3–6 months to backfill |
| Project slip 8 weeks | Cash gap; retainer cross-subsidy |
| Ecosystem incident load | Capacity shock; other clients delay |
| ZAR weakness | Imported SaaS costs up; adjust tiers annually |

---

## 6. Use-of-funds tie-in

Example: raise **R2m** for **18 months**

| Category | ZAR | Logic |
| --- | --- | --- |
| Senior hire (12 mo loaded) | `[VERIFY]` | Unlocks Scenario D |
| Founder runway top-up | `[VERIFY]` | Reduced delivery hours |
| GTM / tools | `[VERIFY]` | Quote funnel, CRM |
| Buffer | 15–20% | |

**Milestone:** MRR ≥ `[VERIFY]` before hire starts.

---

## 7. Cross-check

- Retainer prices = `pricing-strategy.ts`  
- Build bands = `app-cost-pricing-tables.ts`  
- ARR = MRR × 12 (no seasonal adjustment unless `[VERIFY]`)  
- Project + retainer double-counting: projects are one-off; do not add full project value to MRR

---

## 8. Export to spreadsheet

Suggested tabs:

1. **Assumptions** (this file)  
2. **MRR build** (clients by tier by month)  
3. **Projects** (deal list)  
4. **P&L** (monthly)  
5. **Runway** (cash)
