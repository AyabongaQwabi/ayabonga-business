import type { EmailTemplate } from './types';

/** Bump when copy changes so ensureDefaultTemplates refreshes blob copies. */
export const WARM_TEMPLATE_SEED_VERSION = 2;

const rawTemplates = [
  {
    slug: 'sa-sme-custom-build',
    name: 'SA SME custom software build',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Custom software for {{company}}',
    text: 'Hi {{firstName}},\n\nI am {{yourName}}, senior product engineer in Queenstown. I build custom software for South African SMEs: internal tools, customer portals, integrations, and production web systems. One engineer, no agency overhead.\n\n{{whyNow}}\n\nRecent work: a full enrolment platform shipped in 7 days (Ilithiyana Academics), occupational health systems for mining (ClinicPlus), and a campus payments app.\n\nIf you are replacing spreadsheets or manual workflows, I can scope a fixed Phase 1 build, typically from R50k depending on depth. Reply with one sentence on the bottleneck and I will send a one-page scope.\n\n{{yourName}}\n{{siteUrl}}/get-a-quote',
  },
  {
    slug: 'warm-intro-ask',
    name: 'Warm intro ask (investor bridge)',
    category: 'intro_ask',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Intro request for {{company}} engineering partnership',
    text: 'Hi {{firstName}},\n\nI saw your firm backed {{company}}. I am {{yourName}}, senior product engineer in SA (cloud, AI, and production fintech). I build agent systems and funded startup platforms.\n\n{{whyNow}}\n\nIf you are open to it, a short intro to the founders would help. Happy to send a two-sentence forwardable note.\n\n{{yourName}}\n{{siteUrl}}',
  },
  {
    slug: 'direct-founder-post-funding',
    name: 'Direct founder (post-funding)',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Engineering for {{company}} after the raise',
    text: 'Hi {{firstName}},\n\n{{whyNow}}\n\nI am {{yourName}}, senior product engineer. Payments, marketplaces, AI agents, and SA production systems. I take founders from MVP to production without agency overhead.\n\nIf you are staffing engineering for the next phase, I can share a one-page view of how I structure Phase 1 sprints, typically from R50k. Open to 15 minutes if useful.\n\n{{yourName}}\n{{siteUrl}}',
  },
  {
    slug: 'whatsapp-ai-partnership',
    name: 'WhatsApp + AI systems',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'WhatsApp + LLM production work in SA',
    text: 'Hi {{firstName}},\n\n{{whyNow}}\n\nI build production AI agents and WhatsApp-adjacent flows for SA businesses (Next.js, Supabase, guardrails for real user data and POPIA-sensitive patterns).\n\nIf you want a short call on agent memory, human handoff, and deployment, I am happy to compare notes.\n\n{{yourName}}\n{{siteUrl}}',
  },
  {
    slug: 'phase-1-sprint-offer',
    name: 'Phase 1 engineering sprint',
    category: 'direct',
    placeholders: ['firstName', 'company', 'yourName', 'siteUrl'],
    subject: 'Phase 1 engineering sprint (4-8 weeks)',
    text: 'Hi {{firstName}},\n\nI run fixed-scope Phase 1 sprints for funded teams: architecture plus build for one critical workflow (payments edge, agent MVP, marketplace admin, or integration hardening).\n\nTypical entry is R50k+ depending on scope. You keep the codebase and docs. No open-ended retainer required to start.\n\nWorth 20 minutes to see if {{company}} has a lane that fits this quarter?\n\n{{yourName}}\n{{siteUrl}}/technical-partnership-phase-1',
  },
  {
    slug: 'follow-up-7d',
    name: 'Follow-up (7 days)',
    category: 'follow_up',
    placeholders: ['firstName', 'company', 'yourName', 'siteUrl'],
    subject: 'Re: {{company}}, still useful?',
    text: 'Hi {{firstName}},\n\nQuick follow-up on my note last week. If timing is wrong, no problem.\n\nIf engineering capacity is still a bottleneck, I can send a short scope outline for a Phase 1 sprint rather than a generic deck.\n\n{{yourName}}\n{{siteUrl}}',
  },
] as const;

const now = new Date().toISOString();

export const defaultEmailTemplates: EmailTemplate[] = rawTemplates.map((t) => ({
  ...t,
  category: t.category as EmailTemplate['category'],
  placeholders: [...t.placeholders],
  updatedAt: now,
  seedVersion: WARM_TEMPLATE_SEED_VERSION,
}));
