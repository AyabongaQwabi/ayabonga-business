import type { EmailTemplate } from './types';

const rawColdTemplates = [
  {
    slug: 'cold-custom-software',
    name: 'Cold — custom software development',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Custom software for {{company}} (senior-led, SA-based)',
    text: 'Hi {{firstName}},\n\nI am {{yourName}}, senior product engineer based in Queenstown. I build custom software for South African businesses: internal tools, customer portals, integrations, and production-ready web systems.\n\n{{whyNow}}\n\nIf {{company}} is planning a new system or replacing spreadsheets and manual workflows, I can scope a fixed Phase 1 build (typically from R50k depending on scope). The quote tool on my site takes about 3 minutes.\n\n{{yourName}}\n{{siteUrl}}/get-a-quote',
  },
  {
    slug: 'cold-web-app',
    name: 'Cold — web app development',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Web app development for {{company}}',
    text: 'Hi {{firstName}},\n\nI help SA companies ship web applications without agency overhead: React/Next.js frontends, secure APIs, admin dashboards, and cloud deployment on GCP/AWS.\n\n{{whyNow}}\n\nRecent work includes marketplaces, booking systems, and enrolment platforms shipped in days, not months. If {{company}} needs a new web app or a rebuild of an existing one, I am happy to share a scoped estimate.\n\n{{yourName}}\n{{siteUrl}}/web-development-south-africa',
  },
  {
    slug: 'cold-mobile-app',
    name: 'Cold — mobile app development',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'Mobile app build for {{company}}',
    text: 'Hi {{firstName}},\n\nI build mobile and cross-platform apps for SA businesses (React Native, Firebase/Supabase backends, NFC wallets, offline-first flows where needed).\n\n{{whyNow}}\n\nIf {{company}} is exploring a customer app, field worker app, or internal mobile tool, I can outline a realistic Phase 1 scope and timeline.\n\n{{yourName}}\n{{siteUrl}}/get-a-quote',
  },
  {
    slug: 'cold-ai-integration',
    name: 'Cold — AI and automation',
    category: 'direct',
    placeholders: ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    subject: 'AI workflows and automation for {{company}}',
    text: 'Hi {{firstName}},\n\nI implement production AI for SA teams: WhatsApp bots, document automation, LLM agents with guardrails, and integrations into existing systems.\n\n{{whyNow}}\n\nIf {{company}} wants to automate support, internal ops, or customer-facing workflows, I can propose a small pilot with clear deliverables.\n\n{{yourName}}\n{{siteUrl}}/ai-system-integration-south-africa',
  },
  {
    slug: 'cold-follow-up-7d',
    name: 'Cold follow-up (7 days)',
    category: 'follow_up',
    placeholders: ['firstName', 'company', 'yourName', 'siteUrl'],
    subject: 'Re: software build for {{company}}',
    text: 'Hi {{firstName}},\n\nQuick follow-up on my note last week about software development for {{company}}. If timing is wrong, no problem.\n\nIf you still need a scoped build or web app estimate, reply with one sentence on the problem and I will send a short outline.\n\n{{yourName}}\n{{siteUrl}}',
  },
] as const;

const now = new Date().toISOString();

export const defaultColdTemplates: EmailTemplate[] = rawColdTemplates.map((t) => ({
  ...t,
  category: t.category as EmailTemplate['category'],
  placeholders: [...t.placeholders],
  updatedAt: now,
}));
