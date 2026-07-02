var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// api/_lib/format.ts
function formatMoneyZar(amountZar, currencyCode) {
  const rates = {
    ZAR: { symbol: "R", rateToZar: 1 },
    USD: { symbol: "$", rateToZar: 0.055 },
    EUR: { symbol: "\u20AC", rateToZar: 0.05 }
  };
  const opt = rates[currencyCode] ?? rates.ZAR;
  const value = amountZar * (currencyCode === "ZAR" ? 1 : opt.rateToZar);
  return `${opt.symbol}${Math.round(value).toLocaleString("en-US")}`;
}
function founderStageLabel(stage) {
  const labels = {
    idea: "Idea / pre-build",
    mvp: "Building MVP",
    live: "Live product",
    rebuild: "Rebuild or rescue"
  };
  return labels[stage] ?? stage;
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var init_format = __esm({
  "api/_lib/format.ts"() {
    "use strict";
  }
});

// api/_lib/emailLayout.ts
function ctaButton(label, href, variant) {
  const isPrimary = variant === "primary";
  const bg = isPrimary ? EMAIL_BRAND.cyan : "transparent";
  const color = isPrimary ? "#ffffff" : EMAIL_BRAND.cyan;
  const border = isPrimary ? "none" : `2px solid ${EMAIL_BRAND.cyan}`;
  return `<a href="${href}" style="display:inline-block;background:${bg};color:${color};text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600;font-size:14px;border:${border};margin:4px 8px 4px 0;">${escapeHtml(label)}</a>`;
}
function wrapBrandedEmail(options) {
  const firstName = escapeHtml(options.firstName || "there");
  const logoUrl = options.logoUrl || `${SITE_URL}/logo-wide.png`;
  const ctas = [
    options.primaryCta ? ctaButton(options.primaryCta.label, options.primaryCta.href, "primary") : "",
    options.secondaryCta ? ctaButton(options.secondaryCta.label, options.secondaryCta.href, "secondary") : ""
  ].filter(Boolean).join("");
  const ctaBlock = ctas ? `<p style="margin:28px 0 12px;">${ctas}</p>` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>Ayabonga Qwabi</title>
</head>
<body style="margin:0;padding:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:${EMAIL_BRAND.paper};color:${EMAIL_BRAND.text};-webkit-font-smoothing:antialiased;">
  ${options.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(options.preheader)}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${EMAIL_BRAND.paper};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="background:${EMAIL_BRAND.navy};border-radius:16px 16px 0 0;padding:28px 28px 24px;border-bottom:3px solid ${EMAIL_BRAND.gold};">
              <img src="${logoUrl}" alt="Qwabi Engineering" width="200" style="display:block;max-width:200px;height:auto;margin:0 0 14px;border:0;" />
              <p style="margin:0 0 6px;font-family:Outfit,system-ui,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_BRAND.gold};">Qwabi Engineering</p>
              <p style="margin:0;font-family:Outfit,system-ui,sans-serif;font-size:18px;font-weight:600;color:#f8fafc;line-height:1.3;">Custom software and AI systems for South African teams</p>
            </td>
          </tr>
          <tr>
            <td style="background:${EMAIL_BRAND.card};padding:28px;border-left:1px solid ${EMAIL_BRAND.border};border-right:1px solid ${EMAIL_BRAND.border};">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${EMAIL_BRAND.text};">Hi ${firstName},</p>
              ${options.bodyHtml}
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td style="background:${EMAIL_BRAND.navyMuted};border-radius:0 0 16px 16px;padding:20px 28px;border:1px solid ${EMAIL_BRAND.border};border-top:none;">
              <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#cbd5e1;">
                <a href="${SITE_URL}" style="color:${EMAIL_BRAND.gold};text-decoration:none;font-weight:600;">qwabi.co.za</a>
                \xB7 Senior product engineering \xB7 Queenstown, South Africa
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;">
                <a href="${SITE_URL}/get-a-quote" style="color:#7dd3fc;text-decoration:none;">Quote tool</a>
                &nbsp;\xB7&nbsp;
                <a href="${SITE_URL}/technical-cofounder" style="color:#7dd3fc;text-decoration:none;">How I work</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
var SITE_URL, EMAIL_BRAND;
var init_emailLayout = __esm({
  "api/_lib/emailLayout.ts"() {
    "use strict";
    init_format();
    SITE_URL = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
    EMAIL_BRAND = {
      navy: "#0A192F",
      navyMuted: "#1E293B",
      gold: "#FFD700",
      cyan: "#0891b2",
      paper: "#f8fafc",
      card: "#ffffff",
      border: "#e2e8f0",
      text: "#0f172a",
      muted: "#64748b"
    };
  }
});

// api/_lib/leads/outreachEmail.ts
var outreachEmail_exports = {};
__export(outreachEmail_exports, {
  brandedLogoUrl: () => brandedLogoUrl,
  buildBrandedOutreachEmail: () => buildBrandedOutreachEmail,
  outreachPlainFooter: () => outreachPlainFooter,
  outreachTextToBodyHtml: () => outreachTextToBodyHtml
});
function brandedLogoUrl(variant = "wide") {
  return `${SITE_URL7}/${variant === "wide" ? "logo-wide.png" : "logo.png"}`;
}
function outreachTextToBodyHtml(text, firstName) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const blocks = [];
  for (const line of lines) {
    if (/^Hi\s+/i.test(line)) continue;
    if (line.startsWith("http://") || line.startsWith("https://")) {
      blocks.push(
        `<p style="margin:0 0 14px;font-size:14px;line-height:1.6;"><a href="${escapeHtml(line)}" style="color:${EMAIL_BRAND.cyan};text-decoration:none;">${escapeHtml(line)}</a></p>`
      );
      continue;
    }
    blocks.push(
      `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.text};">${escapeHtml(line)}</p>`
    );
  }
  return blocks.join("\n");
}
function buildBrandedOutreachEmail(options) {
  return wrapBrandedEmail({
    firstName: options.firstName,
    preheader: options.preheader,
    bodyHtml: outreachTextToBodyHtml(options.bodyText, options.firstName),
    primaryCta: options.primaryCta ?? {
      label: "Get a scoped estimate",
      href: `${SITE_URL7}/get-a-quote`
    },
    secondaryCta: options.secondaryCta ?? {
      label: "See shipped work",
      href: `${SITE_URL7}/case-studies`
    },
    logoUrl: brandedLogoUrl("wide")
  });
}
function outreachPlainFooter() {
  return `

Ayabonga Qwabi \xB7 Qwabi Engineering
${SITE_URL7}
`;
}
var SITE_URL7;
var init_outreachEmail = __esm({
  "api/_lib/leads/outreachEmail.ts"() {
    "use strict";
    init_format();
    init_emailLayout();
    SITE_URL7 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
  }
});

// api/_lib/handleQuoteSend.ts
import { Resend as Resend2 } from "resend";

// api/_lib/quoteEmail.ts
init_format();
init_emailLayout();
var SITE_URL2 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
function quoteAssumptionsNote(quote) {
  return `Estimates use R${quote.hourlyRateZar}/hr, ${quote.yearsExperience}+ years experience, ${quote.hoursPerDay} billable hours/day, ${quote.bufferPercent}% buffer. Ballpark only, not a fixed proposal.`;
}
function buildQuoteEmailText(body) {
  const { name, quote, projectDetails, founderStage } = body;
  const lines = [
    `Hi ${name.split(" ")[0]},`,
    "",
    `Here is the project scope summary you saved from the quote tool on ${new URL(SITE_URL2).host}.`,
    "",
    `Stage: ${founderStageLabel(founderStage)}`,
    `Product type: ${quote.projectTypes.join(", ") || "Not specified"}`,
    "",
    "Features selected:",
    ...quote.features.map(
      (f) => `- ${f.name}: ${formatMoneyZar(f.adjustedPriceZar, quote.currency)} (~${f.adjustedDays.toFixed(1)} days)`
    ),
    "",
    `Estimated build (our timeline): ${formatMoneyZar(quote.totals.basePriceZar, quote.currency)} over ~${Math.round(quote.totals.estimatedDays)} days`,
    `Adjusted (your target timeline): ${formatMoneyZar(quote.totals.adjustedPriceZar, quote.currency)} over ~${quote.totals.effectiveDesiredDays} days`,
    quote.desiredDays ? `Your target timeline input: ${quote.desiredDays} days` : "No target timeline entered",
    "",
    quoteAssumptionsNote(quote),
    "",
    "Your notes:",
    projectDetails,
    "",
    `Revise scope: ${SITE_URL2}/get-a-quote`,
    `Technical co-founder model: ${SITE_URL2}/technical-cofounder`,
    "",
    "Ayabonga Qwabi"
  ];
  return lines.join("\n");
}
function buildQuoteEmailHtml(body) {
  const { name, quote, projectDetails, founderStage } = body;
  const firstName = name.split(" ")[0] || name;
  const featureRows = quote.features.map(
    (f) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:14px;">${escapeHtml(f.name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};text-align:right;font-size:14px;">${formatMoneyZar(f.adjustedPriceZar, quote.currency)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};text-align:right;font-size:14px;color:${EMAIL_BRAND.muted};">${f.adjustedDays.toFixed(1)}d</td>
      </tr>`
  ).join("");
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.text};">
      Here is your saved scope summary from the
      <a href="${SITE_URL2}/get-a-quote" style="color:${EMAIL_BRAND.cyan};font-weight:600;text-decoration:none;">project quote tool</a>.
      Use it when you compare devs, agencies, or a technical partner.
    </p>

    <div style="background:${EMAIL_BRAND.paper};border:1px solid ${EMAIL_BRAND.border};border-radius:12px;padding:16px 18px;margin:0 0 16px;">
      <p style="margin:0 0 8px;font-size:12px;color:${EMAIL_BRAND.muted};text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Context</p>
      <p style="margin:0 0 4px;font-size:14px;line-height:1.5;"><strong>Stage:</strong> ${escapeHtml(founderStageLabel(founderStage))}</p>
      <p style="margin:0;font-size:14px;line-height:1.5;"><strong>Product type:</strong> ${escapeHtml(quote.projectTypes.join(", ") || "Not specified")}</p>
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:${EMAIL_BRAND.card};border:1px solid ${EMAIL_BRAND.border};border-radius:12px;overflow:hidden;margin:0 0 16px;">
      <thead>
        <tr style="background:${EMAIL_BRAND.paper};">
          <th style="padding:10px 12px;text-align:left;font-size:12px;color:${EMAIL_BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">Feature</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;color:${EMAIL_BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">Est.</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;color:${EMAIL_BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">Days</th>
        </tr>
      </thead>
      <tbody>${featureRows || `<tr><td colspan="3" style="padding:12px;font-size:14px;">No features selected</td></tr>`}</tbody>
    </table>

    <div style="background:#ecfeff;border:1px solid #a5f3fc;border-radius:12px;padding:16px 18px;margin:0 0 16px;">
      <p style="margin:0 0 8px;font-size:14px;line-height:1.5;"><strong>Our timeline:</strong> ${formatMoneyZar(quote.totals.basePriceZar, quote.currency)} \xB7 ~${Math.round(quote.totals.estimatedDays)} days</p>
      <p style="margin:0;font-size:14px;line-height:1.5;"><strong>Your target timeline:</strong> ${formatMoneyZar(quote.totals.adjustedPriceZar, quote.currency)} \xB7 ~${quote.totals.effectiveDesiredDays} days</p>
    </div>

    <p style="margin:0 0 16px;font-size:13px;color:${EMAIL_BRAND.muted};line-height:1.55;">${escapeHtml(quoteAssumptionsNote(quote))}</p>

    <div style="background:${EMAIL_BRAND.paper};border:1px solid ${EMAIL_BRAND.border};border-radius:12px;padding:16px 18px;margin:0 0 16px;">
      <p style="margin:0 0 8px;font-size:12px;color:${EMAIL_BRAND.muted};font-weight:600;">Your notes</p>
      <p style="margin:0;font-size:14px;line-height:1.55;white-space:pre-wrap;color:${EMAIL_BRAND.text};">${escapeHtml(projectDetails)}</p>
    </div>

    <p style="margin:0;font-size:15px;line-height:1.65;color:${EMAIL_BRAND.text};">
      Over the next two weeks I will send a few short notes on scoping, rebuild traps, and when a senior technical partner beats a cheap build. You can unsubscribe anytime.
    </p>`;
  return wrapBrandedEmail({
    firstName,
    preheader: `Your scope summary \xB7 ${formatMoneyZar(quote.totals.adjustedPriceZar, quote.currency)} ballpark`,
    bodyHtml,
    primaryCta: { label: "Update my quote", href: `${SITE_URL2}/get-a-quote` },
    secondaryCta: {
      label: "How I work as technical co-founder",
      href: `${SITE_URL2}/technical-cofounder`
    }
  });
}

// api/_lib/internalLeadEmail.ts
init_format();
var SITE_URL3 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
var WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "27603116777";
function leadScore(body) {
  const reasons = [];
  let score = 0;
  if (body.quote.features.length >= 3) {
    score += 2;
    reasons.push("3+ features scoped");
  } else if (body.quote.features.length >= 1) {
    score += 1;
    reasons.push("Has feature selection");
  }
  if (body.projectDetails.trim().length >= 80) {
    score += 2;
    reasons.push("Detailed project notes");
  } else if (body.projectDetails.trim().length >= 40) {
    score += 1;
    reasons.push("Some project context");
  }
  if (body.founderStage === "rebuild" || body.founderStage === "live") {
    score += 2;
    reasons.push(`Stage: ${founderStageLabel(body.founderStage)}`);
  } else if (body.founderStage === "mvp") {
    score += 1;
    reasons.push("Building MVP");
  }
  if (body.quote.totals.adjustedPriceZar >= 15e4) {
    score += 1;
    reasons.push("Estimate band R150k+");
  }
  let label = "Low";
  if (score >= 5) label = "High";
  else if (score >= 3) label = "Medium";
  return { label, reasons };
}
function buildInternalLeadEmail(body) {
  const { label, reasons } = leadScore(body);
  const waText = encodeURIComponent(
    `Hi ${body.name.split(" ")[0]}, I saw your quote on ${new URL(SITE_URL3).host} (${founderStageLabel(body.founderStage)}). Happy to review scope.`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
  const text = [
    `New quote lead \xB7 ${label} intent`,
    "",
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Stage: ${founderStageLabel(body.founderStage)}`,
    `Score signals: ${reasons.join("; ") || "none"}`,
    "",
    `Product: ${body.quote.projectTypes.join(", ") || "n/a"}`,
    `Features: ${body.quote.features.length}`,
    `Adjusted est.: ${formatMoneyZar(body.quote.totals.adjustedPriceZar, body.quote.currency)} / ~${body.quote.totals.effectiveDesiredDays} days`,
    "",
    "Notes:",
    body.projectDetails,
    "",
    "--- Full quote ---",
    buildQuoteEmailText(body),
    "",
    `WhatsApp: ${waLink}`,
    `Quote tool: ${SITE_URL3}/get-a-quote`
  ].join("\n");
  return {
    subject: `[${label}] Quote lead: ${body.name} \xB7 ${founderStageLabel(body.founderStage)}`,
    text
  };
}

// api/_lib/founderNurtureEmails.ts
init_emailLayout();
var SITE_URL4 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
var MVP_SCOPE_CHECKLIST_URL = `${SITE_URL4}/mvp-scope-checklist`;
function wrapHtml(body, firstName, primaryCta, secondaryCta) {
  return wrapBrandedEmail({
    firstName,
    bodyHtml: body,
    primaryCta,
    secondaryCta
  });
}
function getFounderNurtureSequence(firstName) {
  const name = firstName || "there";
  return [
    {
      delayDays: 2,
      subject: "The rebuild tax most founders only see at month six",
      text: [
        `Hi ${name},`,
        "",
        "Cheap MVPs often work for the first five users. The cost shows up when real traffic, payments, or admin load hits.",
        "",
        "Three signs you are heading for a rebuild:",
        "1. No staging environment and deploys go straight to production.",
        "2. Auth and payments were bolted on late, not designed in.",
        "3. Nobody can explain your data model in one whiteboard sketch.",
        "",
        "If two of those are true, you are not failing. You just scoped for demo day, not launch day.",
        "",
        `Scope v1 before you hire: ${MVP_SCOPE_CHECKLIST_URL}`,
        "",
        `I wrote more on this: ${SITE_URL4}/blog/hidden-cost-junior-mvp`,
        "",
        "Ayabonga"
      ].join("\n"),
      html: wrapHtml(
        `<p style="font-size:15px;line-height:1.65;">Cheap MVPs often work for the first five users. The cost shows up when real traffic, payments, or admin load hits.</p>
        <p style="font-size:15px;line-height:1.65;"><strong>Three signs you are heading for a rebuild:</strong></p>
        <ol style="font-size:15px;line-height:1.7;padding-left:20px;">
          <li>No staging environment and deploys go straight to production.</li>
          <li>Auth and payments were bolted on late, not designed in.</li>
          <li>Nobody can explain your data model in one whiteboard sketch.</li>
        </ol>
        <p style="font-size:15px;line-height:1.65;">If two of those are true, you scoped for demo day, not launch day.</p>
        <p style="font-size:15px;line-height:1.65;">Scope v1 before you hire? Use the <a href="${MVP_SCOPE_CHECKLIST_URL}" style="color:#0891b2;text-decoration:underline;">MVP scope checklist</a> to mark essentials vs phase two.</p>`,
        name,
        { label: "Read: Junior-built MVPs and the rebuild tax", href: `${SITE_URL4}/blog/hidden-cost-junior-mvp` },
        { label: "MVP scope checklist", href: MVP_SCOPE_CHECKLIST_URL }
      )
    },
    {
      delayDays: 5,
      subject: "Scope v1 in one page (before you hire anyone)",
      text: [
        `Hi ${name},`,
        "",
        "Before you compare quotes, lock these five lines:",
        "",
        "- User: who gets value in week one?",
        "- Job: what must they complete without help?",
        "- Out of scope: what are you explicitly not building?",
        "- Integrations: payments, SMS, maps, ERP, anything external.",
        '- Done: what does "shipped" mean (staging URL, test user, one real transaction)?',
        "",
        "Send that one-pager to every dev or agency. Quotes get comparable. Bad fits opt out early.",
        "",
        `Update your saved estimate: ${SITE_URL4}/get-a-quote`,
        "",
        "Ayabonga"
      ].join("\n"),
      html: wrapHtml(
        `<p style="font-size:15px;line-height:1.65;">Before you compare quotes, lock these five lines on one page:</p>
        <ul style="font-size:15px;line-height:1.7;padding-left:20px;">
          <li><strong>User:</strong> who gets value in week one?</li>
          <li><strong>Job:</strong> what must they complete without help?</li>
          <li><strong>Out of scope:</strong> what are you not building?</li>
          <li><strong>Integrations:</strong> Paystack, SMS, maps, ERP, etc.</li>
          <li><strong>Done:</strong> staging URL, test user, one real transaction.</li>
        </ul>
        <p style="font-size:15px;line-height:1.65;">Send that to every dev or agency. Quotes get comparable. Bad fits opt out early.</p>`,
        name,
        { label: "Update my quote", href: `${SITE_URL4}/get-a-quote` }
      )
    },
    {
      delayDays: 9,
      subject: "When a senior technical partner beats a cheap build",
      text: [
        `Hi ${name},`,
        "",
        "Hire senior help when:",
        "- Money or user data is on the line (fintech, health, marketplaces).",
        "- You have a fixed launch date and no room for a rewrite.",
        "- You need one person to own architecture, delivery, and honest tradeoffs.",
        "",
        "A junior or template stack is fine for learning. It is expensive for revenue.",
        "",
        `How I work as technical co-founder (no equity): ${SITE_URL4}/technical-cofounder`,
        "",
        "Ayabonga"
      ].join("\n"),
      html: wrapHtml(
        `<p style="font-size:15px;line-height:1.65;"><strong>Hire senior help when:</strong></p>
        <ul style="font-size:15px;line-height:1.7;padding-left:20px;">
          <li>Money or user data is on the line (fintech, health, marketplaces).</li>
          <li>You have a fixed launch date and no room for a rewrite.</li>
          <li>You need one person to own architecture, delivery, and tradeoffs.</li>
        </ul>
        <p style="font-size:15px;line-height:1.65;">A junior stack is fine for learning. It is expensive for revenue.</p>`,
        name,
        { label: "Technical co-founder as a service", href: `${SITE_URL4}/technical-cofounder` }
      )
    },
    {
      delayDays: 14,
      subject: "Next step for your build",
      text: [
        `Hi ${name},`,
        "",
        "If your quote export is still close to what you want to ship, the useful next step is a 20-minute scope call.",
        "",
        "Come with:",
        "- Your one-page scope (users, job, out of scope, integrations, done).",
        "- Your target launch window.",
        "- What you have already (designs, repo, partial build).",
        "",
        "Reply to this email with those three items, or update your quote and notes here:",
        SITE_URL4 + "/get-a-quote",
        "",
        "For quick questions, WhatsApp works, but scope context first saves us both time.",
        "",
        "Ayabonga"
      ].join("\n"),
      html: wrapHtml(
        `<p style="font-size:15px;line-height:1.65;">If your saved quote still matches what you want to ship, the useful next step is a 20-minute scope call.</p>
        <p style="font-size:15px;line-height:1.65;"><strong>Bring:</strong></p>
        <ul style="font-size:15px;line-height:1.7;padding-left:20px;">
          <li>One-page scope (users, job, out of scope, integrations, done).</li>
          <li>Target launch window.</li>
          <li>What you already have (designs, repo, partial build).</li>
        </ul>
        <p style="font-size:15px;line-height:1.65;">Reply with those three items, or add them in the quote tool.</p>
        <p style="font-size:14px;color:#64748b;margin-top:16px;">WhatsApp is fine for quick questions. Scope context first saves time for both of us.</p>`,
        name,
        { label: "Update my quote", href: `${SITE_URL4}/get-a-quote` }
      )
    }
  ];
}
function scheduleAtDaysFromNow(days) {
  const d = /* @__PURE__ */ new Date();
  d.setUTCDate(d.getUTCDate() + days);
  d.setUTCHours(9, 0, 0, 0);
  return d.toISOString();
}

// api/_lib/leads/captureLead.ts
import { Resend } from "resend";

// api/_lib/leads/blobStore.ts
import { get, list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";

// api/_lib/leads/blobAccess.ts
function getBlobAccess() {
  const raw = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (raw === "public" || raw === "private") return raw;
  return "private";
}

// api/_lib/leads/blobStore.ts
var INDEX_PATH = "meta/leads-index.json";
function isDevLogEnv() {
  return process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";
}
function leadBlobPath(kind, id) {
  return `leads/${kind}/${id}.json`;
}
function templatePath(slug) {
  return `templates/${slug}.json`;
}
function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}
function blobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}
async function readJson(pathname) {
  if (!hasBlobToken()) return null;
  try {
    const result = await get(pathname, {
      access: getBlobAccess(),
      token: blobToken()
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  } catch (err) {
    if (isDevLogEnv()) {
      console.log("[blobStore] readJson failed", { pathname, err });
    }
    return null;
  }
}
async function writeJson(pathname, data) {
  if (!hasBlobToken()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }
  await put(pathname, JSON.stringify(data, null, 2), {
    access: getBlobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: blobToken()
  });
}
async function getLeadsIndex() {
  const existing = await readJson(INDEX_PATH);
  if (existing?.entries) return existing;
  return { updatedAt: (/* @__PURE__ */ new Date()).toISOString(), entries: [] };
}
async function saveLeadsIndex(index) {
  index.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await writeJson(INDEX_PATH, index);
}
function toIndexEntry(lead) {
  return {
    id: lead.id,
    kind: lead.kind,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    score: lead.score,
    tier: lead.tier,
    sourcePage: lead.sourcePage,
    formType: lead.formType,
    updatedAt: lead.updatedAt
  };
}
async function upsertIndexEntry(lead) {
  const index = await getLeadsIndex();
  const entry = toIndexEntry(lead);
  const i = index.entries.findIndex((e) => e.id === lead.id);
  if (i >= 0) index.entries[i] = entry;
  else index.entries.unshift(entry);
  await saveLeadsIndex(index);
}
async function getLead(id) {
  const inbound = await readJson(leadBlobPath("inbound", id));
  if (inbound) return inbound;
  return readJson(leadBlobPath("outbound", id));
}
async function saveLead(lead) {
  lead.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await writeJson(leadBlobPath(lead.kind, lead.id), lead);
  await upsertIndexEntry(lead);
  if (isDevLogEnv()) {
    console.log("[blobStore] saveLead", { id: lead.id, kind: lead.kind, status: lead.status });
  }
  return lead;
}
async function createLead(partial) {
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const lead = {
    id: partial.id ?? randomUUID(),
    createdAt: now2,
    updatedAt: now2,
    ...partial,
    status: partial.status ?? "new"
  };
  return saveLead(lead);
}
async function listLeads(filters) {
  const index = await getLeadsIndex();
  let entries = [...index.entries];
  if (filters?.kind) entries = entries.filter((e) => e.kind === filters.kind);
  if (filters?.status) entries = entries.filter((e) => e.status === filters.status);
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    entries = entries.filter(
      (e) => e.name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q) || e.company?.toLowerCase().includes(q)
    );
  }
  entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return entries;
}
async function getTemplate(slug) {
  return readJson(templatePath(slug));
}
async function saveTemplate(template) {
  template.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await writeJson(templatePath(template.slug), template);
  return template;
}
async function listTemplates() {
  if (!hasBlobToken()) return [];
  const { blobs } = await list({
    prefix: "templates/",
    limit: 100,
    token: blobToken()
  });
  const templates = [];
  for (const blob of blobs) {
    if (!blob.pathname.endsWith(".json")) continue;
    const template = await readJson(blob.pathname);
    if (template) templates.push(template);
  }
  templates.sort((a, b) => a.name.localeCompare(b.name));
  return templates;
}
async function checkRateLimit(dayKey, fingerprint, maxPerDay) {
  const path = `meta/rate-limit/${dayKey}.json`;
  const data = await readJson(path) ?? {};
  const count = data[fingerprint] ?? 0;
  if (count >= maxPerDay) return false;
  data[fingerprint] = count + 1;
  await writeJson(path, data);
  return true;
}

// api/_lib/leads/notifyEmail.ts
var SITE_URL5 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
var BUDGET_LABELS = {
  under_50k: "Under R50k",
  "50k_150k": "R50k\u2013R150k",
  "150k_plus": "R150k+",
  funded_startup: "Funded startup",
  not_sure: "Not sure"
};
function buildCaptureNotifyEmail(lead) {
  const budget = lead.budgetBand ? BUDGET_LABELS[lead.budgetBand] ?? lead.budgetBand : "n/a";
  const lines = [
    `New inbound lead \xB7 ${lead.formType ?? "form"}`,
    "",
    `Name: ${lead.name ?? "n/a"}`,
    `Email: ${lead.email ?? "n/a"}`,
    `Company: ${lead.company ?? "n/a"}`,
    `Budget: ${budget}`,
    `Source: ${lead.sourcePage ?? "n/a"}`,
    "",
    "Message:",
    lead.message ?? "",
    "",
    `Admin: ${SITE_URL5}/admin/leads/${lead.id}`
  ];
  return {
    subject: `[Inbound] ${lead.name ?? "Lead"} \xB7 ${lead.formType ?? "capture"}`,
    text: lines.join("\n")
  };
}

// api/_lib/leads/captureLead.ts
var NOTIFY_TO = process.env.NOTIFY_EMAIL || "ayabonga@qwabi.co.za";
var FROM = process.env.RESEND_FROM_EMAIL || "Ayabonga Qwabi <onboarding@qwabi.co.za>";
var BUDGET_BANDS = /* @__PURE__ */ new Set([
  "under_50k",
  "50k_150k",
  "150k_plus",
  "funded_startup",
  "not_sure"
]);
function isDevLogEnv2() {
  return process.env.NODE_ENV === "development" || process.env.VERCEL === "1" || process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "production";
}
function parseCaptureBody(raw) {
  if (!raw) return null;
  const name = String(raw.name ?? "").trim();
  const email = String(raw.email ?? "").trim().toLowerCase();
  const message = String(raw.message ?? "").trim();
  const sourcePage = String(raw.sourcePage ?? "").trim();
  const formType = String(raw.formType ?? "").trim();
  const budgetBand = raw.budgetBand;
  const consent = raw.consent === true;
  if (!name || !email || !message || message.length < 20) return null;
  if (!sourcePage || !formType) return null;
  if (!BUDGET_BANDS.has(budgetBand)) return null;
  if (!consent) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return {
    name,
    email,
    company: String(raw.company ?? "").trim() || void 0,
    budgetBand,
    message,
    sourcePage,
    formType,
    consent
  };
}
async function persistQuoteLead(body) {
  if (!hasBlobToken()) {
    if (isDevLogEnv2()) {
      console.log("[leads] Blob not configured, skipping quote persist");
    }
    return null;
  }
  return createLead({
    kind: "inbound",
    status: "new",
    name: body.name,
    email: body.email,
    founderStage: body.founderStage,
    message: body.projectDetails,
    sourcePage: "/get-a-quote",
    formType: "quote_export",
    budgetBand: quoteBudgetBand(body),
    consentAt: (/* @__PURE__ */ new Date()).toISOString(),
    quoteSnapshot: body
  });
}
function quoteBudgetBand(body) {
  const zar = body.quote.totals.adjustedPriceZar;
  if (zar >= 15e4) return "150k_plus";
  if (zar >= 5e4) return "50k_150k";
  return "under_50k";
}
async function handleLeadCapture(body, meta) {
  if (!hasBlobToken()) {
    return {
      status: 503,
      body: {
        error: isDevLogEnv2() ? "BLOB_READ_WRITE_TOKEN is missing. Add it to .env.local or Vercel env." : "Lead storage is not configured"
      }
    };
  }
  if (!body) {
    return {
      status: 400,
      body: {
        error: "Name, email, message (20+ chars), budget, consent, and source are required."
      }
    };
  }
  const dayKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const fingerprint = `${meta?.ip ?? "unknown"}:${body.email}`;
  const allowed = await checkRateLimit(dayKey, fingerprint, 8);
  if (!allowed) {
    return { status: 429, body: { error: "Too many submissions. Try again tomorrow." } };
  }
  if (isDevLogEnv2()) {
    console.log("[leads/capture] New inbound lead", {
      email: body.email,
      formType: body.formType,
      sourcePage: body.sourcePage
    });
  }
  const lead = await createLead({
    kind: "inbound",
    status: "new",
    name: body.name,
    email: body.email,
    company: body.company,
    message: body.message,
    sourcePage: body.sourcePage,
    formType: body.formType,
    budgetBand: body.budgetBand,
    consentAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const notify = buildCaptureNotifyEmail(lead);
      const fromAddress = FROM.match(/<([^>]+)>/)?.[1] || "onboarding@qwabi.co.za";
      await resend.emails.send({
        from: `Leads <${fromAddress}>`,
        to: [NOTIFY_TO],
        subject: notify.subject,
        text: notify.text,
        replyTo: body.email
      });
    } catch (err) {
      if (isDevLogEnv2()) {
        console.log("[leads/capture] Notify email failed", err);
      }
    }
  }
  return { status: 200, body: { ok: true, id: lead.id } };
}

// api/_lib/handleQuoteSend.ts
var FROM2 = process.env.RESEND_FROM_EMAIL || "Ayabonga Qwabi <onboarding@qwabi.co.za>";
var NOTIFY_TO2 = process.env.NOTIFY_EMAIL || "ayabonga@qwabi.co.za";
var SITE_HOST = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
var AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "5561a7a0-2f98-444a-93be-11440026e6f5";
var LEADS_SEGMENT_ID = process.env.RESEND_LEADS_SEGMENT_ID || "4ceb51ef-31b9-4051-baf3-a8e94fbc0c98";
var NURTURE_ENABLED = process.env.RESEND_NURTURE_ENABLED !== "false";
var FOUNDER_STAGES = /* @__PURE__ */ new Set(["idea", "mvp", "live", "rebuild"]);
function parseQuoteSendBody(raw) {
  if (!raw) return null;
  const { name, email, founderStage, projectDetails, quote } = raw;
  if (!email || !name || !quote || typeof quote !== "object") {
    return null;
  }
  const quoteObj = quote;
  if (!quoteObj?.totals) {
    return null;
  }
  const stage = FOUNDER_STAGES.has(founderStage) ? founderStage : "mvp";
  const details = typeof projectDetails === "string" && projectDetails.trim() ? projectDetails.trim() : "";
  if (details.length < 30) {
    return null;
  }
  return {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    founderStage: stage,
    projectDetails: details,
    quote: quoteObj
  };
}
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend2(key);
}
async function upsertLeadContact(resend, body) {
  try {
    console.log("[handleQuoteSend] upsertLeadContact: Creating/updating contact in Resend", {
      email: body.email,
      audienceId: AUDIENCE_ID,
      segmentIds: [LEADS_SEGMENT_ID]
    });
    await resend.contacts.create({
      email: body.email,
      firstName: body.name.split(" ")[0],
      lastName: body.name.split(" ").slice(1).join(" ") || void 0,
      audienceId: AUDIENCE_ID,
      segmentIds: [LEADS_SEGMENT_ID]
    });
    console.log("[handleQuoteSend] upsertLeadContact successful for:", body.email);
  } catch (err) {
    console.error("[handleQuoteSend] Contact upsert skipped or failed", {
      email: body.email,
      err
    });
  }
}
async function scheduleNurtureEmails(resend, body) {
  if (!NURTURE_ENABLED) {
    console.log("[handleQuoteSend] Nurture emails sequence is disabled via RESEND_NURTURE_ENABLED environment flag.");
    return;
  }
  const firstName = body.name.split(" ")[0] || body.name;
  const sequence = getFounderNurtureSequence(firstName);
  console.log("[handleQuoteSend] Scheduling nurture email sequence. Count:", sequence.length);
  for (const item of sequence) {
    const scheduledAt = scheduleAtDaysFromNow(item.delayDays);
    console.log("[handleQuoteSend] Sending scheduled nurture email:", {
      to: body.email,
      subject: item.subject,
      delayDays: item.delayDays,
      scheduledAt
    });
    const { error } = await resend.emails.send({
      from: FROM2,
      to: [body.email],
      subject: item.subject,
      html: item.html,
      text: item.text,
      scheduledAt
    });
    if (error) {
      console.error("[handleQuoteSend] Nurture schedule failed:", {
        delayDays: item.delayDays,
        subject: item.subject,
        error
      });
    } else {
      console.log("[handleQuoteSend] Nurture schedule successful for delayDays:", item.delayDays);
    }
  }
}
async function handleQuoteSend(body) {
  console.log("[handleQuoteSend] Initiating quote export / send processing...", {
    hasBody: !!body,
    email: body?.email,
    name: body?.name,
    stage: body?.founderStage
  });
  const resendKey = process.env.RESEND_API_KEY?.trim();
  console.log("[handleQuoteSend] RESEND_API_KEY checks:", {
    hasKey: !!resendKey,
    keyLength: resendKey ? resendKey.length : 0
  });
  if (!resendKey) {
    console.error("[handleQuoteSend] RESEND_API_KEY is missing or empty.");
    return {
      status: 503,
      body: {
        error: "Email service is not configured"
      }
    };
  }
  if (!body) {
    console.warn("[handleQuoteSend] Validation failed: body is null or undefined");
    return {
      status: 400,
      body: {
        error: "Name, email, project context (30+ characters), and a valid quote are required."
      }
    };
  }
  if (!body.quote.features?.length) {
    console.warn("[handleQuoteSend] Validation failed: features array is empty or undefined", { features: body.quote.features });
    return {
      status: 400,
      body: {
        error: "Select at least one feature before exporting your quote."
      }
    };
  }
  const resend = getResend();
  if (!resend) {
    console.error("[handleQuoteSend] Failed to initialize Resend client with provided API key.");
    return {
      status: 503,
      body: { error: "Email service is not configured" }
    };
  }
  try {
    console.log("[handleQuoteSend] 1. Upserting contact into Resend audience...", {
      email: body.email,
      audienceId: AUDIENCE_ID,
      segmentIds: [LEADS_SEGMENT_ID]
    });
    await upsertLeadContact(resend, body);
    const emailSubject = `Your project scope summary (${new URL(SITE_HOST).host})`;
    console.log("[handleQuoteSend] 2. Sending project scope summary email to client...", {
      from: FROM2,
      to: body.email,
      subject: emailSubject
    });
    const { error: quoteError } = await resend.emails.send({
      from: FROM2,
      to: [body.email],
      subject: emailSubject,
      html: buildQuoteEmailHtml(body),
      text: buildQuoteEmailText(body)
    });
    if (quoteError) {
      console.error("[handleQuoteSend] Project scope summary email sending failed:", quoteError);
      return {
        status: 400,
        body: { error: quoteError.message || "Failed to send quote" }
      };
    }
    console.log("[handleQuoteSend] Project scope summary email sent successfully to client.");
    console.log("[handleQuoteSend] 3. Scheduling nurture emails. Nurture enabled:", NURTURE_ENABLED);
    await scheduleNurtureEmails(resend, body);
    console.log("[handleQuoteSend] Nurture sequence scheduling complete.");
    console.log("[handleQuoteSend] 4. Sending internal notification email...", {
      from: `Quote tool <onboarding@qwabi.co.za>`,
      to: NOTIFY_TO2
    });
    const internal = buildInternalLeadEmail(body);
    const fromAddress = FROM2.match(/<([^>]+)>/)?.[1] || "onboarding@qwabi.co.za";
    const { error: internalError } = await resend.emails.send({
      from: `Quote tool <${fromAddress}>`,
      to: [NOTIFY_TO2],
      subject: internal.subject,
      text: internal.text,
      replyTo: body.email
    });
    if (internalError) {
      console.warn("[handleQuoteSend] Internal notification email sending failed, but client email succeeded. Error:", internalError);
    } else {
      console.log("[handleQuoteSend] Internal notification email sent successfully.");
    }
    console.log("[handleQuoteSend] 5. Persisting quote lead to Blob storage...");
    try {
      const persisted = await persistQuoteLead(body);
      console.log("[handleQuoteSend] Blob storage persistence successful.", { leadId: persisted?.id });
    } catch (persistErr) {
      console.error("[handleQuoteSend] Blob persist failed:", persistErr);
    }
    console.log("[handleQuoteSend] Process completed successfully.");
    return { status: 200, body: { ok: true } };
  } catch (err) {
    console.error("[handleQuoteSend] Unexpected exception during quote send process:", err);
    return { status: 500, body: { error: "Failed to send email" } };
  }
}

// api/_lib/leads/auth.ts
import { createHmac, timingSafeEqual } from "node:crypto";
var TOKEN_TTL_MS = 24 * 60 * 60 * 1e3;
function getSecret() {
  const secret = process.env.ADMIN_TOKEN_SECRET?.trim();
  return secret || null;
}
function base64UrlEncode(data) {
  return Buffer.from(data, "utf8").toString("base64url");
}
function base64UrlDecode(data) {
  return Buffer.from(data, "base64url").toString("utf8");
}
function createAdminToken() {
  const secret = getSecret();
  if (!secret) return null;
  const iat = Date.now();
  const exp = iat + TOKEN_TTL_MS;
  const payload = { sub: "admin", iat, exp };
  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  const token = `${body}.${sig}`;
  return { token, expiresAt: new Date(exp).toISOString() };
}
function verifyAdminToken(authHeader) {
  const secret = getSecret();
  if (!secret || !authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7).trim();
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(body));
  } catch {
    return null;
  }
  if (payload.sub !== "admin" || Date.now() > payload.exp) return null;
  return payload;
}
function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
function bearerFromHeaders(headers) {
  const raw = headers.authorization ?? headers.Authorization;
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

// api/_lib/leads/sendOutreach.ts
import { Resend as Resend3 } from "resend";

// api/_lib/leads/mergeTemplate.ts
var SITE_URL6 = process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za";
var YOUR_NAME = "Ayabonga Qwabi";
function buildTemplateContext(lead) {
  const firstName = lead.name?.split(" ")[0] || lead.company?.split(" ")[0] || "there";
  return {
    firstName,
    company: lead.company || "your company",
    whyNow: lead.whyNow || "",
    yourName: YOUR_NAME,
    siteUrl: SITE_URL6,
    name: lead.name || "",
    role: lead.role || "",
    warmPath: lead.warmPath || "",
    message: lead.message || ""
  };
}
function mergePlaceholders(template, ctx) {
  return template.replace(/\{\{firstName\}\}/g, ctx.firstName).replace(/\{\{company\}\}/g, ctx.company).replace(/\{\{whyNow\}\}/g, ctx.whyNow).replace(/\{\{yourName\}\}/g, ctx.yourName).replace(/\{\{siteUrl\}\}/g, ctx.siteUrl).replace(/\{\{name\}\}/g, ctx.name).replace(/\{\{role\}\}/g, ctx.role).replace(/\{\{warmPath\}\}/g, ctx.warmPath).replace(/\{\{message\}\}/g, ctx.message);
}
function applyTemplate(template, lead) {
  const ctx = buildTemplateContext(lead);
  return {
    subject: mergePlaceholders(template.subject, ctx),
    text: mergePlaceholders(template.text, ctx),
    html: template.html ? mergePlaceholders(template.html, ctx) : void 0
  };
}

// api/_lib/leads/sendOutreach.ts
init_outreachEmail();

// api/_lib/leads/defaultTemplates.ts
var rawTemplates = [
  {
    slug: "sa-sme-custom-build",
    name: "SA SME custom software build",
    category: "direct",
    placeholders: ["firstName", "company", "whyNow", "yourName", "siteUrl"],
    subject: "Custom software for {{company}} (senior-led, SA-based)",
    text: "Hi {{firstName}},\n\nI noticed {{company}} is pushing a product or operations upgrade. I am {{yourName}}, senior product engineer based in Queenstown. I build custom software, mobile apps, and AI workflows for South African SMEs without agency overhead.\n\n{{whyNow}}\n\nRecent shipped work includes a full enrolment platform in 7 days (Ilithiyana Academics) and production systems for mining health, campus wallets, and bursary tooling. If you want a scoped estimate, the quote tool on the site takes about 3 minutes.\n\n{{yourName}}\n{{siteUrl}}"
  },
  {
    slug: "warm-intro-ask",
    name: "Warm intro ask (investor bridge)",
    category: "intro_ask",
    placeholders: ["firstName", "company", "whyNow", "yourName", "siteUrl"],
    subject: "Intro request for {{company}} engineering partnership",
    text: "Hi {{firstName}},\n\nI saw your firm backed {{company}}. I am {{yourName}}, senior product engineer in SA (cloud, AI, and production fintech). I build agent systems and funded startup platforms.\n\n{{whyNow}}\n\nIf you are open to it, a short intro to the founders would help. Happy to send a two-sentence forwardable note.\n\n{{yourName}}\n{{siteUrl}}"
  },
  {
    slug: "direct-founder-post-funding",
    name: "Direct founder (post-funding)",
    category: "direct",
    placeholders: ["firstName", "company", "whyNow", "yourName", "siteUrl"],
    subject: "{{company}} scale-up engineering (post-seed)",
    text: "Hi {{firstName}},\n\n{{whyNow}}\n\nI am {{yourName}}, senior product engineer (payments, marketplaces, AI agents, SA production systems). I take founders from MVP to production without agency overhead.\n\nIf you are staffing engineering for the next phase, I can share a one-page view of how I structure Phase 1 sprints (typically R50k+ scope). Open to 15 minutes if useful.\n\n{{yourName}}\n{{siteUrl}}"
  },
  {
    slug: "whatsapp-ai-partnership",
    name: "WhatsApp + AI systems",
    category: "direct",
    placeholders: ["firstName", "company", "whyNow", "yourName", "siteUrl"],
    subject: "WhatsApp + LLM production work in SA",
    text: "Hi {{firstName}},\n\n{{whyNow}}\n\nI build production AI agents and WhatsApp-adjacent flows for SA businesses (Next.js, Supabase, guardrails for real user data and POPIA-sensitive patterns).\n\nIf you want a short call on agent memory, human handoff, and deployment, I am happy to compare notes.\n\n{{yourName}}\n{{siteUrl}}"
  },
  {
    slug: "phase-1-sprint-offer",
    name: "Phase 1 engineering sprint",
    category: "direct",
    placeholders: ["firstName", "company", "yourName", "siteUrl"],
    subject: "Phase 1 engineering sprint (4-8 weeks)",
    text: "Hi {{firstName}},\n\nI run fixed-scope Phase 1 sprints for funded teams: architecture plus build for one critical workflow (payments edge, agent MVP, marketplace admin, or integration hardening).\n\nTypical entry is R50k+ depending on scope. You keep the codebase and docs. No open-ended retainer required to start.\n\nWorth 20 minutes to see if {{company}} has a lane that fits this quarter?\n\n{{yourName}}\n{{siteUrl}}/technical-partnership-phase-1"
  },
  {
    slug: "follow-up-7d",
    name: "Follow-up (7 days)",
    category: "follow_up",
    placeholders: ["firstName", "company", "yourName", "siteUrl"],
    subject: "Re: {{company}}, still useful?",
    text: "Hi {{firstName}},\n\nQuick follow-up on my note last week. If timing is wrong, no problem.\n\nIf engineering capacity is still a bottleneck, I can send a short scope outline for a Phase 1 sprint rather than a generic deck.\n\n{{yourName}}\n{{siteUrl}}"
  }
];
var now = (/* @__PURE__ */ new Date()).toISOString();
var defaultEmailTemplates = rawTemplates.map((t) => ({
  ...t,
  category: t.category,
  placeholders: [...t.placeholders],
  updatedAt: now
}));

// api/_lib/leads/sendOutreach.ts
var FROM3 = process.env.RESEND_FROM_EMAIL || "Qwabi Engineering <onboarding@qwabi.co.za>";
function pickTemplateSlugForLead(lead) {
  const verticals = lead.verticals ?? [];
  const why = (lead.whyNow ?? "").toLowerCase();
  const lastSent = lead.outreachDraft?.lastSentAt;
  if (lead.status === "contacted" && lastSent) {
    const daysSince = (Date.now() - new Date(lastSent).getTime()) / 864e5;
    if (daysSince >= 6) return "follow-up-7d";
  }
  if (lead.connectorType || lead.suggestedChannel?.toLowerCase().includes("intro")) {
    return "warm-intro-ask";
  }
  if (verticals.includes("whatsapp") || verticals.includes("ai") || why.includes("whatsapp") || why.includes(" ai ")) {
    return "whatsapp-ai-partnership";
  }
  if (why.includes("seed") || why.includes("series") || why.includes("funding") || why.includes("raised") || lead.budgetSignal?.toLowerCase().includes("fund")) {
    return "direct-founder-post-funding";
  }
  if (lead.tier === 3 || lead.score && lead.score < 72) {
    return "sa-sme-custom-build";
  }
  return "phase-1-sprint-offer";
}
async function resolveTemplate(slug) {
  let template = await getTemplate(slug);
  if (template) return template;
  const fallback = defaultEmailTemplates.find((t) => t.slug === slug);
  return fallback ?? null;
}
async function ensureDefaultTemplates() {
  const existing = await listTemplates();
  if (existing.length > 0) return;
  for (const t of defaultEmailTemplates) {
    await saveTemplate(t);
  }
}
async function sendOutreachToLead(leadId, options) {
  const lead = await getLead(leadId);
  if (!lead) return { ok: false, status: 404, error: "Lead not found" };
  if (!lead.email) return { ok: false, status: 400, error: "Lead has no email address" };
  if (lead.status === "lost") return { ok: false, status: 400, error: "Lead is marked lost" };
  if (lead.unsubscribedAt && !options?.force) {
    return { ok: false, status: 400, error: "Lead unsubscribed" };
  }
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return { ok: false, status: 503, error: "RESEND_API_KEY is not configured" };
  const templateSlug = options?.templateSlug ?? pickTemplateSlugForLead(lead);
  const template = await resolveTemplate(templateSlug);
  if (!template) {
    return { ok: false, status: 404, error: `Template not found: ${templateSlug}` };
  }
  const merged = applyTemplate(template, lead);
  const firstName = lead.name?.split(" ")[0] || lead.company?.split(" ")[0] || "there";
  const html = merged.html ?? buildBrandedOutreachEmail({
    firstName,
    bodyText: merged.text,
    preheader: merged.subject
  });
  const text = `${merged.text}${outreachPlainFooter()}`;
  const resend = new Resend3(resendKey);
  const { error } = await resend.emails.send({
    from: FROM3,
    to: [lead.email],
    subject: merged.subject,
    text,
    html,
    headers: {
      "List-Unsubscribe": `<${process.env.SITE_URL?.replace(/\/$/, "") || "https://business.qwabi.co.za"}/contact>`
    }
  });
  if (error) {
    return { ok: false, status: 400, error: error.message || "Send failed" };
  }
  const sentAt = (/* @__PURE__ */ new Date()).toISOString();
  lead.outreachDraft = {
    subject: merged.subject,
    text,
    html,
    templateSlug,
    lastSentAt: sentAt
  };
  lead.sendHistory = [
    ...lead.sendHistory ?? [],
    { sentAt, templateSlug, email: lead.email, channel: "email" }
  ];
  if (lead.status === "new") lead.status = "contacted";
  await saveLead(lead);
  return { ok: true, lead, templateSlug };
}

// api/_lib/leads/adminHandlers.ts
var FROM4 = process.env.RESEND_FROM_EMAIL || "Ayabonga Qwabi <onboarding@qwabi.co.za>";
var STATUSES = /* @__PURE__ */ new Set([
  "new",
  "qualified",
  "contacted",
  "replied",
  "won",
  "lost"
]);
function unauthorized() {
  return { status: 401, body: { error: "Unauthorized" } };
}
function requireAdmin(req) {
  const session = verifyAdminToken(bearerFromHeaders(req.headers));
  if (!session) return unauthorized();
  return null;
}
async function handleAdminLogin(body) {
  console.log("[adminLogin] Initiating login attempt...");
  const password = String(body?.password ?? "");
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim();
  console.log("[adminLogin] Password checks:", {
    hasPasswordSupplied: !!password,
    passwordSuppliedLength: password.length,
    isAdminPasswordEnvConfigured: !!expectedPassword,
    adminPasswordEnvLength: expectedPassword ? expectedPassword.length : 0
  });
  if (!verifyAdminPassword(password)) {
    console.warn("[adminLogin] Password verification failed. The provided password did not match or ADMIN_PASSWORD is empty.");
    return { status: 401, body: { error: "Invalid password" } };
  }
  const tokenSecret = process.env.ADMIN_TOKEN_SECRET?.trim();
  console.log("[adminLogin] Token secret checks:", {
    isAdminTokenSecretEnvConfigured: !!tokenSecret,
    adminTokenSecretEnvLength: tokenSecret ? tokenSecret.length : 0
  });
  if (!tokenSecret) {
    console.error("[adminLogin] ADMIN_TOKEN_SECRET is not configured or empty.");
    return {
      status: 503,
      body: { error: "ADMIN_TOKEN_SECRET is not configured" }
    };
  }
  console.log("[adminLogin] Creating admin session token...");
  const token = createAdminToken();
  if (!token) {
    console.error("[adminLogin] Could not create session. Token generator returned null.");
    return { status: 503, body: { error: "Could not create session" } };
  }
  console.log("[adminLogin] Admin login successful. Session token generated successfully. Expires at:", token.expiresAt);
  return { status: 200, body: token };
}
async function handleAdminRoute(req, segments, body) {
  const [a, b, c] = segments;
  if (a === "login" && req.method === "POST") {
    return handleAdminLogin(body);
  }
  const authErr = requireAdmin(req);
  if (authErr) return authErr;
  if (a === "leads" && !b && req.method === "GET") {
    const kind = req.query.kind;
    const status = req.query.status;
    const q = typeof req.query.q === "string" ? req.query.q : void 0;
    const entries = await listLeads({ kind, status, q });
    return { status: 200, body: { entries } };
  }
  if (a === "leads" && b && c === "send" && req.method === "POST") {
    return handleSendLeadEmail(b, body);
  }
  if (a === "leads" && b && !c && req.method === "GET") {
    const lead = await getLead(b);
    if (!lead) return { status: 404, body: { error: "Lead not found" } };
    return { status: 200, body: { lead } };
  }
  if (a === "leads" && b && !c && req.method === "PATCH") {
    return handlePatchLead(b, body);
  }
  if (a === "templates" && !b && req.method === "GET") {
    let templates = await listTemplates();
    if (templates.length === 0) {
      for (const t of defaultEmailTemplates) {
        await saveTemplate(t);
      }
      templates = await listTemplates();
    }
    return { status: 200, body: { templates } };
  }
  if (a === "templates" && b && req.method === "PUT") {
    return handlePutTemplate(b, body);
  }
  return { status: 404, body: { error: "Not found" } };
}
async function handlePatchLead(id, body) {
  console.log("[adminHandlers] handlePatchLead called", { id, bodyKeys: body ? Object.keys(body) : [] });
  const lead = await getLead(id);
  if (!lead) {
    console.warn("[adminHandlers] handlePatchLead: Lead not found with ID", id);
    return { status: 404, body: { error: "Lead not found" } };
  }
  console.log("[adminHandlers] handlePatchLead: Current lead state", { id: lead.id, status: lead.status, email: lead.email });
  if (body?.status && STATUSES.has(body.status)) {
    console.log("[adminHandlers] handlePatchLead: Updating status", { from: lead.status, to: body.status });
    lead.status = body.status;
  }
  if (typeof body?.notes === "string") {
    console.log("[adminHandlers] handlePatchLead: Updating notes");
    lead.notes = body.notes;
  }
  if (typeof body?.email === "string") {
    console.log("[adminHandlers] handlePatchLead: Updating email", { from: lead.email, to: body.email.trim().toLowerCase() });
    lead.email = body.email.trim().toLowerCase();
  }
  if (typeof body?.name === "string") {
    console.log("[adminHandlers] handlePatchLead: Updating name", { from: lead.name, to: body.name.trim() });
    lead.name = body.name.trim();
  }
  if (body?.outreachDraft && typeof body.outreachDraft === "object") {
    console.log("[adminHandlers] handlePatchLead: Updating outreach draft");
    lead.outreachDraft = body.outreachDraft;
  }
  await saveLead(lead);
  console.log("[adminHandlers] handlePatchLead: Lead successfully saved", { id: lead.id, status: lead.status });
  return { status: 200, body: { lead } };
}
async function handlePutTemplate(slug, body) {
  console.log("[adminHandlers] handlePutTemplate called", { slug, bodyKeys: body ? Object.keys(body) : [] });
  if (!body?.subject || !body?.text || !body?.name) {
    console.warn("[adminHandlers] handlePutTemplate validation failed: missing name, subject, or text", {
      hasName: !!body?.name,
      hasSubject: !!body?.subject,
      hasText: !!body?.text
    });
    return { status: 400, body: { error: "name, subject, and text are required" } };
  }
  const template = {
    slug,
    name: String(body.name),
    subject: String(body.subject),
    text: String(body.text),
    html: body.html ? String(body.html) : void 0,
    category: body.category || "direct",
    placeholders: Array.isArray(body.placeholders) ? body.placeholders : ["firstName", "company", "whyNow", "yourName", "siteUrl"],
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  console.log("[adminHandlers] handlePutTemplate: Saving template", { slug, name: template.name });
  await saveTemplate(template);
  console.log("[adminHandlers] handlePutTemplate: Template successfully saved", { slug });
  return { status: 200, body: { template } };
}
async function handleSendLeadEmail(id, body) {
  const templateSlug = body?.templateSlug ? String(body.templateSlug) : void 0;
  if (body?.subject && body?.text) {
    const lead = await getLead(id);
    if (!lead) return { status: 404, body: { error: "Lead not found" } };
    if (!lead.email) return { status: 400, body: { error: "Lead has no email address" } };
    const { buildBrandedOutreachEmail: buildBrandedOutreachEmail2, outreachPlainFooter: outreachPlainFooter2 } = await Promise.resolve().then(() => (init_outreachEmail(), outreachEmail_exports));
    const firstName = lead.name?.split(" ")[0] || lead.company?.split(" ")[0] || "there";
    const subject = String(body.subject);
    const text = String(body.text);
    const html = body.html ? String(body.html) : buildBrandedOutreachEmail2({ firstName, bodyText: text, preheader: subject });
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) return { status: 503, body: { error: "RESEND_API_KEY is not configured" } };
    const { Resend: Resend4 } = await import("resend");
    const resend = new Resend4(resendKey);
    const { error } = await resend.emails.send({
      from: FROM4,
      to: [lead.email],
      subject,
      text: `${text}${outreachPlainFooter2()}`,
      html
    });
    if (error) return { status: 400, body: { error: error.message || "Send failed" } };
    lead.outreachDraft = {
      subject,
      text,
      html,
      templateSlug,
      lastSentAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (lead.status === "new") lead.status = "contacted";
    await saveLead(lead);
    return { status: 200, body: { ok: true, lead } };
  }
  const result = await sendOutreachToLead(id, { templateSlug });
  if (!result.ok) return { status: result.status, body: { error: result.error } };
  return { status: 200, body: { ok: true, lead: result.lead, templateSlug: result.templateSlug } };
}

// api/_lib/leads/dailySendLog.ts
function logPath(dateKey) {
  return `meta/outreach-daily/${dateKey}.json`;
}
function todayKey() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
async function getDailySendLog(dateKey = todayKey()) {
  const existing = await readJson(logPath(dateKey));
  if (existing?.sent) return existing;
  return {
    date: dateKey,
    sent: [],
    discovered: 0,
    enriched: 0,
    skipped: 0,
    errors: [],
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function saveDailySendLog(log) {
  log.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await writeJson(logPath(log.date), log);
}

// api/_lib/leads/emailEnrichment.ts
var EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
var BLOCKED_LOCALS = /* @__PURE__ */ new Set([
  "noreply",
  "no-reply",
  "donotreply",
  "support",
  "hello",
  "info",
  "contact",
  "sales",
  "admin",
  "privacy",
  "legal",
  "careers",
  "jobs",
  "newsletter",
  "marketing"
]);
var BLOCKED_DOMAINS = /* @__PURE__ */ new Set([
  "example.com",
  "sentry.io",
  "wixpress.com",
  "wordpress.com",
  "squarespace.com"
]);
function extractEmailsFromHtml(html) {
  const found = /* @__PURE__ */ new Set();
  for (const match of html.matchAll(/mailto:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi)) {
    found.add(match[1].toLowerCase());
  }
  for (const match of html.matchAll(EMAIL_RE)) {
    found.add(match[0].toLowerCase());
  }
  return [...found].filter(isLikelyBusinessEmail);
}
function isLikelyBusinessEmail(email) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return false;
  if (BLOCKED_DOMAINS.has(domain)) return false;
  if (local.includes("png") || local.includes("jpg")) return false;
  if (BLOCKED_LOCALS.has(local)) return false;
  if (local.length > 48) return false;
  return true;
}
function pickBestEmail(candidates, siteHost) {
  const scored = candidates.filter(isLikelyBusinessEmail).map((email) => {
    let score = 0;
    const [local, domain] = email.split("@");
    if (siteHost && domain && siteHost.replace(/^www\./, "") === domain.replace(/^www\./, "")) {
      score += 10;
    }
    if (local && !BLOCKED_LOCALS.has(local)) score += 3;
    if (["founder", "ceo", "cto", "hello", "team"].some((p) => local.includes(p))) score += 2;
    return { email, score };
  }).sort((a, b) => b.score - a.score);
  return scored[0]?.email ?? null;
}
async function fetchPageText(url, timeoutMs = 8e3) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "QwabiEngineeringLeadBot/1.0 (+https://business.qwabi.co.za)",
        Accept: "text/html,application/xhtml+xml"
      },
      redirect: "follow"
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 25e4);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function discoverEmailForWebsite(siteUrl) {
  let host;
  try {
    host = new URL(siteUrl).hostname;
  } catch {
    return null;
  }
  const paths = ["", "/contact", "/about", "/team"];
  const emails = [];
  for (const path of paths) {
    const pageUrl = new URL(path, siteUrl).toString();
    const html = await fetchPageText(pageUrl);
    if (!html) continue;
    emails.push(...extractEmailsFromHtml(html));
    if (emails.length >= 3) break;
  }
  return pickBestEmail(emails, host);
}

// api/_lib/leads/outreachConfig.ts
var OUTREACH_DAILY_MIN = Math.max(
  1,
  Number.parseInt(process.env.OUTREACH_DAILY_MIN || "12", 10) || 12
);
var OUTREACH_DAILY_MAX = Math.max(
  OUTREACH_DAILY_MIN,
  Number.parseInt(process.env.OUTREACH_DAILY_MAX || "25", 10) || 25
);
function isOutreachEnabled() {
  const flag = process.env.OUTREACH_ENABLED?.trim().toLowerCase();
  if (flag === "false" || flag === "0") return false;
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.BLOB_READ_WRITE_TOKEN?.trim());
}
function braveSearchApiKey() {
  return process.env.BRAVE_SEARCH_API_KEY?.trim() || process.env.BRAVE_API_KEY?.trim();
}
function hasDiscoveryProvider() {
  return Boolean(
    braveSearchApiKey() || process.env.SERPAPI_API_KEY?.trim() || process.env.GOOGLE_CSE_API_KEY?.trim() && process.env.GOOGLE_CSE_ID?.trim()
  );
}
var DISCOVERY_QUERIES = [
  "South Africa startup custom software development founder contact email",
  "Cape Town fintech mobile app development CEO contact",
  "Johannesburg SME business software platform founder",
  "Durban ecommerce startup technical founder email",
  "South Africa AI startup WhatsApp automation founder",
  "Pretoria logistics marketplace software company contact",
  "Eastern Cape business app development company",
  "South Africa proptech startup engineering hiring",
  "SA edtech platform custom software founder contact",
  "South Africa healthtech app development startup CEO"
];

// api/_lib/leads/leadDiscovery.ts
function companyFromTitle(title) {
  const cleaned = title.replace(/\s*[-|–].*$/, "").replace(/\s*\|.*$/, "").trim();
  return cleaned.slice(0, 80) || "Unknown company";
}
function scoreFromSnippet(snippet, title) {
  let score = 55;
  const blob = `${title} ${snippet}`.toLowerCase();
  const signals = [
    ["software", 8],
    ["app", 6],
    ["platform", 6],
    ["startup", 7],
    ["fintech", 7],
    ["ai", 5],
    ["marketplace", 6],
    ["south africa", 8],
    ["cape town", 5],
    ["johannesburg", 5],
    ["founder", 6],
    ["ceo", 5],
    ["cto", 5],
    ["development", 7],
    ["engineering", 6]
  ];
  for (const [word, pts] of signals) {
    if (blob.includes(word)) score += pts;
  }
  return Math.min(score, 96);
}
async function searchBrave(query) {
  const key = braveSearchApiKey();
  if (!key) return [];
  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", "10");
  url.searchParams.set("country", "ZA");
  url.searchParams.set("search_lang", "en");
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-Subscription-Token": key
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.web?.results ?? []).filter((r) => r.url && r.title).map((r) => ({
    title: r.title,
    link: r.url,
    snippet: r.description ?? ""
  }));
}
async function searchSerpApi(query) {
  const key = process.env.SERPAPI_API_KEY?.trim();
  if (!key) return [];
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("num", "10");
  url.searchParams.set("gl", "za");
  url.searchParams.set("hl", "en");
  url.searchParams.set("api_key", key);
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.organic_results ?? []).filter((r) => r.link && r.title).map((r) => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet ?? ""
  }));
}
async function searchGoogleCse(query) {
  const key = process.env.GOOGLE_CSE_API_KEY?.trim();
  const cx = process.env.GOOGLE_CSE_ID?.trim();
  if (!key || !cx) return [];
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", key);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", query);
  url.searchParams.set("num", "10");
  url.searchParams.set("gl", "za");
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.items ?? []).filter((r) => r.link && r.title).map((r) => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet ?? ""
  }));
}
async function runWebSearch(query) {
  for (const search of [searchBrave, searchSerpApi, searchGoogleCse]) {
    const results = await search(query);
    if (results.length) return { query, results };
  }
  return { query, results: [] };
}
function pickDiscoveryQuery() {
  const day = Math.floor(Date.now() / 864e5);
  return DISCOVERY_QUERIES[day % DISCOVERY_QUERIES.length];
}
async function discoverLeadsFromSearch(maxNew = 15) {
  const query = pickDiscoveryQuery();
  const { results } = await runWebSearch(query);
  const index = await getLeadsIndex();
  const existingKeys = new Set(
    index.entries.map((e) => `${(e.company ?? "").toLowerCase()}|${(e.email ?? "").toLowerCase()}`)
  );
  const created = [];
  let enriched = 0;
  for (const result of results) {
    if (created.length >= maxNew) break;
    let host = "";
    try {
      host = new URL(result.link).hostname;
    } catch {
      continue;
    }
    if (/linkedin\.com|facebook\.com|twitter\.com|x\.com|instagram\.com|wikipedia\.org/i.test(host)) {
      continue;
    }
    const company = companyFromTitle(result.title);
    const key = `${company.toLowerCase()}|`;
    if (existingKeys.has(key)) continue;
    let email = await discoverEmailForWebsite(result.link);
    if (email) enriched += 1;
    const score = scoreFromSnippet(result.snippet, result.title);
    const lead = await createLead({
      kind: "outbound",
      status: email ? "qualified" : "new",
      name: void 0,
      email: email ?? void 0,
      company,
      role: void 0,
      score,
      tier: score >= 85 ? 1 : score >= 70 ? 2 : 3,
      verticals: inferVerticals(result.snippet + " " + result.title),
      whyNow: result.snippet.slice(0, 280) || `Found via search: ${query}`,
      sourcePage: result.link,
      formType: "discovery_search",
      suggestedChannel: email ? "email" : "linkedin",
      notes: `Auto-discovered ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)} \xB7 query: ${query}`
    });
    existingKeys.add(`${company.toLowerCase()}|${(email ?? "").toLowerCase()}`);
    created.push(lead);
  }
  return { created, enriched, query };
}
function inferVerticals(text) {
  const blob = text.toLowerCase();
  const map = {
    fintech: "fintech",
    payment: "fintech",
    logistics: "logistics",
    marketplace: "marketplace",
    ai: "ai",
    whatsapp: "whatsapp",
    health: "healthtech",
    edu: "edtech",
    proptech: "proptech",
    retail: "ecommerce",
    ecommerce: "ecommerce"
  };
  const out = /* @__PURE__ */ new Set();
  for (const [needle, tag] of Object.entries(map)) {
    if (blob.includes(needle)) out.add(tag);
  }
  if (!out.size) out.add("software");
  return [...out];
}

// api/_lib/leads/outreachWorker.ts
function wasSentToday(lead, dateKey) {
  const last = lead.outreachDraft?.lastSentAt;
  return Boolean(last && last.startsWith(dateKey));
}
async function enrichLeadsMissingEmail(limit = 20) {
  const entries = await listLeads({ kind: "outbound", status: "new" });
  let enriched = 0;
  for (const entry of entries.slice(0, limit)) {
    if (entry.email) continue;
    const lead = await getLead(entry.id);
    if (!lead?.sourcePage) continue;
    const email = await discoverEmailForWebsite(lead.sourcePage);
    if (!email) continue;
    lead.email = email;
    lead.status = "qualified";
    lead.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await saveLead(lead);
    enriched += 1;
  }
  return enriched;
}
function rankLead(entry) {
  const tierBoost = entry.tier === 1 ? 30 : entry.tier === 2 ? 15 : 0;
  return (entry.score ?? 50) + tierBoost;
}
async function runDailyOutreachWorker() {
  const dateKey = todayKey();
  const report = {
    date: dateKey,
    enabled: isOutreachEnabled(),
    discovered: 0,
    enrichedExisting: 0,
    attempted: 0,
    sent: 0,
    skipped: 0,
    errors: [],
    targetMin: OUTREACH_DAILY_MIN,
    targetMax: OUTREACH_DAILY_MAX
  };
  if (!report.enabled) {
    report.errors.push("Outreach disabled (set OUTREACH_ENABLED or configure Resend + Blob)");
    return report;
  }
  await ensureDefaultTemplates();
  const log = await getDailySendLog(dateKey);
  if (hasDiscoveryProvider()) {
    try {
      const discovery = await discoverLeadsFromSearch(12);
      report.discovered = discovery.created.length;
      report.discoveryQuery = discovery.query;
      log.discovered += discovery.created.length;
      log.enriched += discovery.enriched;
    } catch (err) {
      report.errors.push(
        `Discovery failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  report.enrichedExisting = await enrichLeadsMissingEmail(25);
  log.enriched += report.enrichedExisting;
  async function loadSendable() {
    const sentTodayIds = new Set(log.sent.map((s) => s.leadId));
    const candidates = await listLeads({ kind: "outbound" });
    return candidates.filter((e) => Boolean(e.email)).filter((e) => e.status === "new" || e.status === "qualified").filter((e) => !sentTodayIds.has(e.id)).sort((a, b) => rankLead(b) - rankLead(a));
  }
  let sendable = await loadSendable();
  if (sendable.length < OUTREACH_DAILY_MIN && hasDiscoveryProvider()) {
    try {
      const extra = await discoverLeadsFromSearch(15);
      report.discovered += extra.created.length;
      log.discovered += extra.created.length;
      log.enriched += extra.enriched;
      const extraEnriched = await enrichLeadsMissingEmail(15);
      report.enrichedExisting += extraEnriched;
      log.enriched += extraEnriched;
      sendable = await loadSendable();
    } catch (err) {
      report.errors.push(
        `Second discovery pass failed: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  for (const entry of sendable) {
    if (log.sent.length >= OUTREACH_DAILY_MAX) break;
    const lead = await getLead(entry.id);
    if (!lead?.email || wasSentToday(lead, dateKey)) {
      report.skipped += 1;
      continue;
    }
    report.attempted += 1;
    const result = await sendOutreachToLead(lead.id);
    if (!result.ok) {
      report.errors.push(`${lead.id}: ${result.error}`);
      log.errors.push(`${lead.id}: ${result.error}`);
      continue;
    }
    report.sent += 1;
    log.sent.push({
      leadId: lead.id,
      email: lead.email,
      templateSlug: result.templateSlug,
      sentAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  if (log.sent.length < OUTREACH_DAILY_MIN) {
    report.errors.push(
      `Only ${log.sent.length} sends today (min ${OUTREACH_DAILY_MIN}). Add discovery API keys or enrich lead emails.`
    );
  }
  await saveDailySendLog(log);
  return report;
}

// api/_lib/http.ts
function jsonResponse(res, status, body) {
  res.status(status).json(body);
}
function parseJsonBody(req) {
  const raw = req.body;
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw;
  return null;
}
function getApiPath(req) {
  const url = req.url ?? "";
  const path = url.split("?")[0];
  const match = path.match(/\/api\/(.*)$/);
  return match?.[1] ?? "";
}
function handleOptions(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }
  return false;
}
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress;
}

// api/_lib/routeApi.ts
function authorizeCron(req) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV === "development";
  return req.headers.authorization === `Bearer ${secret}`;
}
function isDevLogEnv3() {
  return process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";
}
async function dispatchApiRequest(req) {
  const apiPath = getApiPath(req);
  const method = req.method ?? "GET";
  if (apiPath === "send") {
    if (method !== "POST") {
      return { status: 405, body: { error: "Method not allowed" } };
    }
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body) {
      return { status: 400, body: { error: "Invalid JSON body" } };
    }
    const body = parseQuoteSendBody(parsed);
    const result = await handleQuoteSend(body);
    if (result.status !== 200 && "error" in result.body && isDevLogEnv3()) {
      console.error("[api/send] Request failed", {
        status: result.status,
        error: result.body.error
      });
    }
    return result;
  }
  if (apiPath === "leads/capture") {
    if (method !== "POST") {
      return { status: 405, body: { error: "Method not allowed" } };
    }
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body) {
      return { status: 400, body: { error: "Invalid JSON body" } };
    }
    const body = parseCaptureBody(parsed);
    return handleLeadCapture(body, { ip: getClientIp(req) });
  }
  if (apiPath === "cron/outreach-daily") {
    if (method !== "GET" && method !== "POST") {
      return { status: 405, body: { error: "Method not allowed" } };
    }
    if (!authorizeCron(req)) {
      return { status: 401, body: { error: "Unauthorized" } };
    }
    try {
      const report = await runDailyOutreachWorker();
      return { status: 200, body: report };
    } catch (error) {
      console.error("[cron/outreach-daily]", error);
      return {
        status: 500,
        body: {
          error: error instanceof Error ? error.message : "Worker failed"
        }
      };
    }
  }
  if (apiPath === "admin" || apiPath.startsWith("admin/")) {
    const segments = apiPath.replace(/^admin\/?/, "").split("/").filter(Boolean);
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body && method !== "GET") {
      return { status: 400, body: { error: "Invalid JSON body" } };
    }
    return handleAdminRoute(req, segments, parsed);
  }
  return { status: 404, body: { error: "Not found" } };
}

// api/_entry.ts
async function handler(req, res) {
  try {
    if (handleOptions(req, res)) return;
    const result = await dispatchApiRequest(req);
    jsonResponse(res, result.status, result.body);
  } catch (error) {
    console.error("[api] Unhandled error:", error);
    jsonResponse(res, 500, {
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  handler as default
};
