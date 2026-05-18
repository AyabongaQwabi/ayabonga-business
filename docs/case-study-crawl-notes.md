# Case study crawl notes

Crawled **2026-05-17** via WebFetch (and `curl` where noted). Facts below come from page copy unless labeled **Verified brief** (internal project context, not found on the public crawl).

Rules for case study writers:

- Do not invent metrics, timelines, or stack details beyond what appears here.
- Where the public site and the verified brief disagree, confirm with the client before publishing.
- Challenge/outcome bullets are **angles to research**, not claims.

---

## 1. Future Start

| Field | Detail |
| --- | --- |
| **Slug** | `future-start` |
| **URL** | https://futurestart.co.za |
| **Crawl status** | ok |
| **Verified brief** | Johannesburg · EdTech · student accommodation request system + digital book store |

**What they do (crawl)**  
Student success brand: tertiary application support (“Let’s Apply For You”), mentoring/coaching, student accommodation matching, and a published guide book (*Conquering Your Years in Tertiary Education*). Runs **SASEA** (South African Student Excellence Awards) for nominees across high school, college/FET/TVET, and university in multiple excellence categories.

**Who they serve**  
South African students entering or in tertiary education (testimonials name engineering, business, medical, CS, law, education students).

**Brand tone**  
Very informal, emoji-heavy, Gen-Z/marketing slang (“crush it,” “receipts,” “slide into our DMs,” “vibes”). Energetic, peer-adjacent, not corporate.

**Notes for challenge / outcomes (no fabricated metrics)**  
- **Challenge angles:** High-touch services (applications, housing, mentoring) likely need structured intake and follow-up beyond marketing pages and Google Forms links seen on site.  
- **Book:** Public site promotes a physical/guide book; **Verified brief** mentions digital book sales (confirm storefront vs lead capture).  
- **Accommodation:** Marketing describes accommodation service; **Verified brief** references an accommodation *request system* (likely custom, not described on homepage).  
- **Outcomes:** Use client-confirmed flows only (e.g. application handling, book orders, accommodation requests). Testimonials on site are qualitative only.

**Crawl gaps**  
No explicit “digital bookstore” or “accommodation portal” product copy on homepage; forms link to Google Forms and WhatsApp.

---

## 2. AN Consulting

| Field | Detail |
| --- | --- |
| **Slug** | `an-consulting` |
| **URL** | https://www.anconsulting.co.za |
| **Crawl status** | ok |
| **Verified brief** | Johannesburg · Financial services · financial records management |

**What they do (crawl)**  
Accounting and finance firm: audit & assurance, tax, business consulting (IFRS/GRAP statements, asset registers, training), financial advisory, and **outsourced monthly accounting packages** (Standard / Silver / Gold tiers with listed monthly ZAR prices). Lead form includes package selection.

**Who they serve**  
Small businesses and similar clients; site claims work with corporate, finance, retail, and government sectors. Team described as CAs, registered auditors, and finance professionals with public and private sector experience.

**Brand tone**  
Professional, trust-led (“Partner in Financial Excellence”), benefit-focused for SMEs. Straightforward corporate marketing.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Verified brief** points to custom **financial records management** (internal workflows) vs this marketing site’s packaged accounting services.  
- **Outcomes:** Site states 35+ years team experience, 500+ satisfied clients, 1000+ projects (marketing figures on site only; do not reuse as delivery metrics without verification).  
- **Location:** Contact block lists **Grahamstown, 6140** and `axolile@anconsulting.co.za`; brief says Johannesburg. Resolve before geo-specific copy.

**Crawl gaps**  
Custom records app not described on public pages.

---

## 3. Mpumelelo Foundation

| Field | Detail |
| --- | --- |
| **Slug** | `mpumelelo-foundation` |
| **URL** | https://mpumelelo.vercel.app |
| **Crawl status** | ok |
| **Verified brief** | Pretoria · Non-profit · donation collection website |

**What they do (crawl)**  
Non-profit **Mpumeleolo Caring for Boys and Girls Foundation** (“Caring”): programs for children in **rural South Africa** (education support, health & nutrition, basic necessities, community engagement). Donation CTAs across home and `/donate` with program-level “Make a Donation” buttons.

**Who they serve**  
Children in rural communities; copy references parents/guardians, schools, health partners, volunteers. Testimonials attributed to a program participant, a parent, and a volunteer.

**Brand tone**  
Warm, mission-driven, hopeful. Standard NGO narrative (impact stats, programs, stories).

**Notes for challenge / outcomes**  
- **Challenge angles:** Donation collection and trust-building for a foundation on a **Vercel** subdomain; may need custom domain (**Verified brief** / catalog note).  
- **Outcomes:** Site displays impact counters (e.g. children supported, communities, academic improvement %, meals/month). Treat as **self-reported marketing stats** until verified with the foundation.  
- **Outcomes (qualitative):** Site lists improved attendance, nutrition, confidence, leadership; poverty-cycle framing.

**Crawl gaps**  
Pretoria not stated on crawled pages. Donation payment flow details not visible in text-only fetch.

---

## 4. Estudio Glam

| Field | Detail |
| --- | --- |
| **Slug** | `estudio-glam` |
| **URL** | https://www.estudioglam.co.za |
| **Crawl status** | ok (home + `/about`) |
| **Verified brief** | East London · Beauty / EdTech · edutech for hairstylist training |

**What they do (crawl)**  
**Estudio Glam Foundation** (non-profit): hair and beauty **skills training**, empowerment seminars, mentorship, and business incubation for historically disadvantaged communities. Also promotes **Africa Eastern Cape Hair & Beauty Week** and industry events. Programs include hands-on styling, business planning, financial literacy, marketing.

**Who they serve**  
Unemployed youth (18–35), single mothers, aspiring beauty entrepreneurs; Eastern Cape / township focus per about page.

**Brand tone**  
Inspirational, community-impact, professional nonprofit. Founder story and awards-forward.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Verified brief** / catalog mention **online learning**; public site emphasizes in-person seminars (2–3 days), 6–12 week training, mentorship, and incubation. Confirm LMS vs marketing site scope.  
- **Outcomes:** About page claims 500+ students trained, 150+ businesses launched, 25+ communities, 95% success rate (foundation marketing; verify before case study). Founded 2018, East London.

**Crawl gaps**  
No crawled page describing a logged-in student learning product; mostly program marketing and applications.

---

## 5. Ilithiyana

| Field | Detail |
| --- | --- |
| **Slug** | `ilithiyana` |
| **URL** | https://ilithiyana.co.za |
| **Crawl status** | ok (home + `/vehicle-care`) |
| **Verified brief** | Mthatha · Services · bookings and CRM |

**What they do (crawl)**  
**Ilithiyana Group** / Ilithiyana Consulting: multi-division **100% black-owned** firm (founder Masande Dudula). Public divisions: **Academics** (online tutoring grades 8–12), **Vehicle Care** (fleet mobile car wash with sign-up form), **Infrastructure** (civil engineering, water, project management), **Community Foundations**. ISO 9001 and awards claimed on site.

**Who they serve**  
Students, fleet owners, infrastructure/government clients, communities (broad positioning).

**Brand tone**  
Corporate, growth-and-integrity, national development framing. Formal B2B/B2G.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Verified brief** cites **bookings + CRM**; marketing site shows consultation booking CTAs and fleet **sign-up form**, not a described CRM product.  
- **Outcomes:** Impact counters on homepage show placeholders (`0+`) in crawl snapshot. Do not quote until live site fixed or client provides numbers.  
- **Location:** Brief says Mthatha; site does not confirm city on crawled pages.

**Crawl gaps**  
CRM/bookings product not named on public pages; Mthatha not confirmed.

---

## 6. Lungi The Strategist

| Field | Detail |
| --- | --- |
| **Slug** | `lungi-the-strategist` |
| **URL (task)** | https://lungithestrategist.com |
| **URL (catalog / live)** | https://lungithestrategist.co.za/ |
| **Crawl status** | **unreachable** (`.com`: HTTP 503 via WebFetch; `curl` exit 6 / no response). **ok** on `.co.za` |
| **Verified brief** | Durban · ecommerce |

**What they do (crawl — `.co.za` only)**  
Personal brand for **Lungile Ntuli**, strategy consultant (MBA, 15+ years). Mission: strategic planning advisory and “business toolkits.” Primary CTA: **WhatsApp** contact. No product catalog or cart on crawled page.

**Who they serve**  
Organizations, startups, and businesses needing strategy, risk, and growth clarity (per copy).

**Brand tone**  
Minimal, personal, professional. Sparse single-page site.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Verified brief** and project catalog describe **ecommerce**; public `.co.za` crawl shows **consulting landing page only**. Confirm whether ecommerce lives on `.com`, another URL, or is unpublished.  
- **Outcomes:** Do not claim shop revenue or SKU counts; not evidenced on crawl.

**Crawl gaps**  
`.com` down/unreachable; ecommerce not visible on `.co.za`.

---

## 7. Western Cape Labs (mLab) · Case Pro

| Field | Detail |
| --- | --- |
| **Slug** | `western-cape-labs-case-pro` |
| **URL** | https://mlab.co.za/ |
| **Crawl status** | ok |
| **Verified brief** | Cape Town · Case Pro case management collaboration |

**What they do (crawl)**  
**mLab** (Mobile Applications Laboratory NPC): registered **non-profit**, Level 1 B-BBEE skills and enterprise development provider. Focus areas: tech ecosystem events/training, **CodeTribe** digital skills, **startup support**, and **Innovation Lab** for social-impact digital solutions. News/blog for programmes (e.g. YTIC, hiring). Contact: **The Innovation Hub, Enterprise Building, Pretoria, 0020**.

**Who they serve**  
Students, youth, early-stage startups, innovators, programme partners across Africa (general mLab positioning).

**Brand tone**  
Institutional, ecosystem-builder, impact and skills development. Not a single-product SaaS marketing site.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Case Pro** case management (**Verified brief**) does **not** appear on mlab.co.za homepage or news titles in crawl. Treat Case Pro as **delivery context from brief**, not from public marketing copy.  
- **Outcomes:** Frame around operational case workflows for lab/programme teams only with client input.  
- **Location:** Brief says Cape Town / Western Cape Labs; mLab contact address is **Pretoria**. Clarify entity relationship (mLab vs Western Cape Labs).

**Crawl gaps**  
No public “Case Pro” pages found in crawl.

---

## 8. Warner Music Africa

| Field | Detail |
| --- | --- |
| **Slug** | `warner-music-africa` |
| **URL** | https://www.warnermusicafrica.com/ |
| **Crawl status** | ok |
| **Verified brief** | Nigeria · Music · Culture Shifters participant management |

**What they do (crawl)**  
**Warner Music Africa** corporate/artist site: roster showcase (e.g. Flavour, Joeboy, Zahara, Inkabi Zezwe, Yumbs, and others), links to Artists, Releases, Contact, **Yearbook 2023** (image gallery). Social: Instagram, YouTube, Facebook, X. WMG privacy/terms and PAIA manual linked.

**Who they serve**  
Artists, fans, and industry visitors (label marketing surface). Africa-wide music brand positioning.

**Brand tone**  
Premium label aesthetic, visual-first, minimal text on homepage. Corporate/legal footer.

**Notes for challenge / outcomes**  
- **Challenge angles:** **Culture Shifters participant management** is **Verified brief** / catalog only; **not mentioned** on crawled public pages. Case study must rely on delivery interviews, not site copy.  
- **Outcomes:** Do not infer competition mechanics, regions, or user counts from the marketing site.  
- **Geography:** Brief mentions Nigeria; site brand is **Warner Music Africa** (pan-African). Confirm programme geography with client.

**Crawl gaps**  
No Culture Shifters, admin, or participant portal references on public crawl.

---

## 9. ClinicPlus

| Field | Detail |
| --- | --- |
| **Slug** | `clinicplus` |
| **URL (task)** | https://www.clinicpluswtb.co.za/ |
| **URL (catalog)** | https://clinicplusbookings.co.za/ |
| **Crawl status** | ok (`clinicpluswtb.co.za`); **unreachable** (`clinicplusbookings.co.za` fetch timed out) |
| **Verified brief** | Witbank · Healthcare · occupational health management |

**What they do (crawl — WTB site)**  
**Clinic Plus** occupational health management and consulting: **booking system** for single/group bookings. Services include health & safety inductions (mine-adapted), fitness-to-work screening (DMRE guidelines), on-site wellness/HIV counseling, **mobile clinic** within ~100 km of Witbank, Dover Vienna operator testing. **Main focus: mining and construction.** Two Mpumalanga branches; founded 2007. Directors named on site.

**Who they serve**  
Mining and construction employers and workers; on-site and branch-based occupational health clients (testimonials reference outreach teams and operators).

**Brand tone**  
Professional, clinical, compliance-oriented (“healthy employees, healthy businesses”). Trust and service excellence emphasis.

**Notes for challenge / outcomes**  
- **Challenge angles:** Coordinating **bookings**, multi-site ops (Witbank, Hendrina), mobile units, and industry-specific compliance workflows.  
- **Outcomes:** Qualitative testimonials on site praise professionalism and outreach events; no quantified delivery metrics on crawl.  
- **URLs:** Task URL and catalog booking URL differ; confirm which is canonical for case study links.

**Crawl gaps**  
Booking app UX/stack not visible in text fetch; `clinicplusbookings.co.za` not crawled successfully.

---

## Crawl summary

| # | Client | Slug | Status |
| --- | --- | --- | --- |
| 1 | Future Start | `future-start` | ok |
| 2 | AN Consulting | `an-consulting` | ok |
| 3 | Mpumelelo Foundation | `mpumelelo-foundation` | ok |
| 4 | Estudio Glam | `estudio-glam` | ok |
| 5 | Ilithiyana | `ilithiyana` | ok |
| 6 | Lungi The Strategist | `lungi-the-strategist` | `.com` unreachable; `.co.za` ok |
| 7 | Western Cape Labs / mLab | `western-cape-labs-case-pro` | ok (Case Pro not on site) |
| 8 | Warner Music Africa | `warner-music-africa` | ok (Culture Shifters not on site) |
| 9 | ClinicPlus | `clinicplus` | WTB ok; bookings URL timeout |
