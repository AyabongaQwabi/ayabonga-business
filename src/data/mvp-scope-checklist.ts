export const MVP_SCOPE_CHECKLIST_PATH = '/mvp-scope-checklist';

export const MVP_SCOPE_CHECKLIST_META_TITLE =
  'Free MVP scope checklist for South African founders';

export const MVP_SCOPE_CHECKLIST_META_DESCRIPTION =
  'Interactive checklist to define MVP boundaries before you hire a developer or agency. Covers users, core flows, Paystack-ready payments, POPIA basics, and what to defer to phase two.';

export type ChecklistItemTier = 'mvp' | 'phase2';

export type MvpChecklistItem = {
  id: string;
  label: string;
  hint?: string;
  tier: ChecklistItemTier;
};

export type MvpChecklistSection = {
  id: string;
  title: string;
  description?: string;
  items: MvpChecklistItem[];
};

export const MVP_SCOPE_CHECKLIST_SECTIONS: MvpChecklistSection[] = [
  {
    id: 'problem',
    title: 'Problem and outcome',
    description: 'What you are proving in the first release.',
    items: [
      {
        id: 'problem-statement',
        label: 'One-sentence problem statement a customer would agree with',
        tier: 'mvp',
      },
      {
        id: 'success-metric',
        label: 'Single success metric for the first 90 days (signups, orders, bookings, etc.)',
        tier: 'mvp',
      },
      {
        id: 'non-goals',
        label: 'Three features explicitly marked as not in MVP',
        hint: 'Cuts scope creep before build starts.',
        tier: 'mvp',
      },
    ],
  },
  {
    id: 'users',
    title: 'Users and access',
    items: [
      {
        id: 'primary-persona',
        label: 'Primary user role defined (customer, vendor, admin, etc.)',
        tier: 'mvp',
      },
      {
        id: 'auth-method',
        label: 'Sign-up and login approach chosen (email, phone OTP, social, invite-only)',
        tier: 'mvp',
      },
      {
        id: 'roles-permissions',
        label: 'Role permissions sketched (who can see or change what)',
        tier: 'mvp',
      },
      {
        id: 'sso-enterprise',
        label: 'SSO or enterprise directory (Azure AD, SAML)',
        tier: 'phase2',
      },
    ],
  },
  {
    id: 'core-loop',
    title: 'Core product loop',
    description: 'The shortest path from intent to value.',
    items: [
      {
        id: 'happy-path',
        label: 'Happy path written in 5–8 steps (no wireframes required)',
        tier: 'mvp',
      },
      {
        id: 'create-record',
        label: 'User can create the main object (listing, order, booking, profile)',
        tier: 'mvp',
      },
      {
        id: 'status-flow',
        label: 'Status changes defined (pending, paid, completed, cancelled)',
        tier: 'mvp',
      },
      {
        id: 'notifications',
        label: 'At least one notification channel for key events (email or push)',
        tier: 'mvp',
      },
      {
        id: 'search-filters',
        label: 'Search, filters, or recommendations',
        tier: 'phase2',
      },
      {
        id: 'chat-in-app',
        label: 'In-app chat between users',
        tier: 'phase2',
      },
    ],
  },
  {
    id: 'sa-ready',
    title: 'South Africa readiness',
    items: [
      {
        id: 'payment-gateway',
        label: 'Payment gateway chosen (Paystack, PayFast, Ozow, or manual EFT)',
        tier: 'mvp',
      },
      {
        id: 'pricing-model',
        label: 'Pricing model clear (once-off, subscription, commission, wallet)',
        tier: 'mvp',
      },
      {
        id: 'popia-basics',
        label: 'POPIA (Protection of Personal Information Act) basics: privacy policy and consent for data you collect',
        tier: 'mvp',
      },
      {
        id: 'vat-invoicing',
        label: 'VAT invoices and tax reporting automation',
        tier: 'phase2',
      },
      {
        id: 'multi-currency',
        label: 'Multi-currency or cross-border payouts',
        tier: 'phase2',
      },
    ],
  },
  {
    id: 'ops',
    title: 'Operations and admin',
    items: [
      {
        id: 'admin-dashboard',
        label: 'Minimal admin view to support users or orders',
        tier: 'mvp',
      },
      {
        id: 'audit-trail',
        label: 'Audit log for sensitive actions',
        tier: 'phase2',
      },
      {
        id: 'reporting',
        label: 'Exports and analytics dashboards',
        tier: 'phase2',
      },
    ],
  },
  {
    id: 'launch',
    title: 'Launch and quality',
    items: [
      {
        id: 'environments',
        label: 'Staging and production environments planned',
        tier: 'mvp',
      },
      {
        id: 'error-handling',
        label: 'User-facing errors and empty states considered for core screens',
        tier: 'mvp',
      },
      {
        id: 'mobile-target',
        label: 'Mobile vs web priority decided (responsive web, native, or both)',
        tier: 'mvp',
      },
      {
        id: 'offline-mode',
        label: 'Full offline-first sync',
        tier: 'phase2',
      },
      {
        id: 'load-testing',
        label: 'Formal load testing before marketing spend',
        tier: 'phase2',
      },
    ],
  },
];

export const MVP_SCOPE_ALL_ITEMS = MVP_SCOPE_CHECKLIST_SECTIONS.flatMap((s) => s.items);

export const MVP_ESSENTIAL_ITEMS = MVP_SCOPE_ALL_ITEMS.filter((i) => i.tier === 'mvp');

export const MVP_PHASE2_ITEMS = MVP_SCOPE_ALL_ITEMS.filter((i) => i.tier === 'phase2');
