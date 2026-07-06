import type { EmailTemplate } from './types';

/** Bump when copy changes so ensureDefaultTemplates refreshes blob copies. */
export const COLD_TEMPLATE_SEED_VERSION = 4;

const STANDARD_COLD_BODY = `Hi {{firstName}},

{{valueHook}}

For {{company}}, builds I often scope in a first call:
{{buildIdeas}}

Recent shipped work: ClinicPlus (health records), Ilithiyana Academics (enrolment platform, 7 days), Laundry Marketplace.

If one line above matches a bottleneck you have now, reply with it and I will send a one-page Phase 1 scope (typically from R50k depending on depth).

{{yourName}}
{{siteUrl}}/get-a-quote`;

const rawColdTemplates = [
  { slug: 'cold-legal', name: 'Cold — legal / legal aid', subject: 'Workflow software for {{company}}' },
  { slug: 'cold-healthcare', name: 'Cold — clinics and medical', subject: 'Clinic booking and ops software for {{company}}' },
  { slug: 'cold-pharmacy', name: 'Cold — pharmacy', subject: 'Pharmacy ops tools for {{company}}' },
  { slug: 'cold-construction', name: 'Cold — construction', subject: 'Job tracking software for {{company}}' },
  { slug: 'cold-hospitality', name: 'Cold — restaurants and hotels', subject: 'Booking and ordering systems for {{company}}' },
  { slug: 'cold-logistics', name: 'Cold — transport and logistics', subject: 'Dispatch and delivery software for {{company}}' },
  { slug: 'cold-retail', name: 'Cold — retail', subject: 'Ecommerce and inventory tools for {{company}}' },
  { slug: 'cold-education', name: 'Cold — schools and training', subject: 'Enrolment and scheduling platform for {{company}}' },
  { slug: 'cold-agriculture', name: 'Cold — farming and agriculture', subject: 'Farm ops and order software for {{company}}' },
  { slug: 'cold-property', name: 'Cold — estate and property', subject: 'Property workflow software for {{company}}' },
  { slug: 'cold-accounting', name: 'Cold — accounting firms', subject: 'Client workflow tools for {{company}}' },
  { slug: 'cold-manufacturing', name: 'Cold — manufacturing', subject: 'Production tracking for {{company}}' },
  { slug: 'cold-nonprofit', name: 'Cold — NGOs and nonprofits', subject: 'Programme and donor tools for {{company}}' },
  { slug: 'cold-mining', name: 'Cold — mining services', subject: 'Compliance and workforce software for {{company}}' },
  { slug: 'cold-sme', name: 'Cold — SME (general)', subject: 'Custom software for {{company}}' },
  { slug: 'cold-custom-software', name: 'Cold — custom software (legacy slug)', subject: 'Custom software for {{company}}' },
  {
    slug: 'cold-web-app',
    name: 'Cold — web app development',
    subject: 'Web app for {{company}}',
    text:
      'Hi {{firstName}},\n\n{{valueHook}}\n\nTypical web app builds:\n{{buildIdeas}}\n\nStack: React/Next.js, secure APIs, admin dashboards, deployed on GCP or AWS.\n\nReply with the line that fits and I will send a scoped estimate.\n\n{{yourName}}\n{{siteUrl}}/web-development-south-africa',
  },
  {
    slug: 'cold-mobile-app',
    name: 'Cold — mobile app development',
    subject: 'Mobile app for {{company}}',
    text:
      'Hi {{firstName}},\n\n{{valueHook}}\n\nTypical mobile builds:\n{{buildIdeas}}\n\nStack: React Native, Supabase/Firebase, store releases when needed.\n\nReply with the line that fits and I will send a scoped estimate.\n\n{{yourName}}\n{{siteUrl}}/get-a-quote',
  },
  {
    slug: 'cold-ai-integration',
    name: 'Cold — AI and automation',
    subject: 'AI automation for {{company}}',
    text:
      'Hi {{firstName}},\n\n{{valueHook}}\n\nTypical AI pilots:\n{{buildIdeas}}\n\nProduction guardrails, POPIA-sensitive patterns, human handoff built in.\n\nReply with the line that fits and I will outline a small pilot.\n\n{{yourName}}\n{{siteUrl}}/ai-system-integration-south-africa',
  },
  {
    slug: 'cold-follow-up-7d',
    name: 'Cold follow-up (7 days)',
    category: 'follow_up' as const,
    subject: 'Re: software for {{company}}',
    text:
      'Hi {{firstName}},\n\nQuick follow-up on my note last week. If timing is wrong, no problem.\n\nIf {{company}} still has a workflow stuck in spreadsheets or WhatsApp, reply with one sentence on the problem and I will send a short scope outline.\n\n{{yourName}}\n{{siteUrl}}',
    placeholders: ['firstName', 'company', 'yourName', 'siteUrl'] as const,
  },
] as const;

const COLD_PLACEHOLDERS = [
  'firstName',
  'company',
  'valueHook',
  'buildIdeas',
  'yourName',
  'siteUrl',
] as const;

const now = new Date().toISOString();

export const defaultColdTemplates: EmailTemplate[] = rawColdTemplates.map((t) => ({
  slug: t.slug,
  name: t.name,
  subject: t.subject,
  text: 'text' in t && t.text ? t.text : STANDARD_COLD_BODY,
  category: ('category' in t ? t.category : 'direct') as EmailTemplate['category'],
  placeholders: [...('placeholders' in t ? t.placeholders : COLD_PLACEHOLDERS)],
  updatedAt: now,
  seedVersion: COLD_TEMPLATE_SEED_VERSION,
}));
