/**
 * Developer-centric quote tool: set hourly rate and experience, select features,
 * adjust timeline. Pricing is dynamic (getTotals from quoteToolPricing); we do not
 * use price_zar in calculations, only days_to_complete and config.
 */

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ProgressSteps } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Info,
  LayoutGrid,
  Zap,
  Rocket,
  Sparkles,
  FileText,
  Calendar,
  Send,
  CheckCircle,
} from 'lucide-react';

import appData from '@/config/pricing/app.json';
import websiteData from '@/config/pricing/website.json';
import {
  CLIENT_QUOTE_BUFFER_PERCENT,
  CLIENT_QUOTE_HOURLY_RATE_ZAR,
  CLIENT_QUOTE_HOURS_PER_DAY,
  CLIENT_QUOTE_YEARS_EXPERIENCE,
  HOURS_PER_DAY,
  CURRENCY_OPTIONS,
  MAX_DESIRED_TIME_MULTIPLIER,
} from '@/config/quoteToolConfig';
import { getTotals, getFeatureBreakdown } from '@/lib/quoteToolPricing';
import { buildQuoteExportPayload } from '@/lib/buildQuoteExportPayload';
import { parseApiJsonResponse } from '@/lib/parseApiJsonResponse';
import { cn } from '@/lib/utils';
import { OPEN_QUOTE_EMAIL_EVENT } from '@/context/ConversionPopupContext';
import { trackConversion } from '@/lib/conversion-analytics';

const formInputCls = (hasError) => cn('form-input min-h-[44px]', hasError && 'error');

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="form-field-error" role="alert">
      {message}
    </p>
  );
}

const FOUNDER_STAGE_OPTIONS = [
  { value: 'idea', label: 'Idea / pre-build' },
  { value: 'mvp', label: 'Building MVP' },
  { value: 'live', label: 'Live product' },
  { value: 'rebuild', label: 'Rebuild or rescue' },
];

const STORAGE_KEY = 'quote-tool-draft';

// Wizard: step 1 = App type, 2 = Core, 3 = Advanced, 4 = Polish, 5 = Quote
const WIZARD_STEPS = [
  { label: 'App type', shortLabel: '1. Type', icon: '📱' },
  { label: 'Core features', shortLabel: '2. Core', icon: '⚙️' },
  { label: 'Advanced features', shortLabel: '3. Advanced', icon: '🚀' },
  { label: 'Polish', shortLabel: '4. Polish', icon: '✨' },
  { label: 'Quote & summary', shortLabel: '5. Quote', icon: '📋' },
];

const STAGE_2_TYPES = new Set([
  'auth',
  'auth-claims',
  'entity-crud',
  'user-personal-data-crud',
  'entity-crud-and-entity-state',
  'entity-states',
  'entity-collections',
  'date-entity-range',
  'learning-management-system',
]);

const STAGE_3_TYPES = new Set([
  'payment-api',
  'ecommerce',
  'payment-api-and-entity-crud',
  'entity-aggregates',
  'financial-math',
  'comms',
  'chat',
  'notifications',
  'media',
  'api-intergration',
  'entity-feed-infinite-scroll',
  'entity-metadata-collection-to-new-entity-build',
  'sub-entity-same-entity-type-interaction',
  'voting-and-support',
  'entity-collections-and-claims',
  'entity-query',
  'entity-action-job-scheduling',
  'physical-sensors',
  'gamification',
  'date-time',
  'entity-collections-metadata',
]);

const STAGE_4_TYPES = new Set([
  'entity-configuration',
  'data-conversion',
  'pdf-templating',
  'data-parse',
  'data-read',
  'privacy',
  'ux',
  'data-compliance',
  'performance',
  'content',
]);

const RECOMMENDED_BUNDLES = [
  {
    id: 'starter-invoicing',
    label: 'Starter Invoicing Pack',
    featureIds: ['user-auth', 'invoice-creation', 'client-management'],
    projectTypes: ['Invoicing App'],
  },
  {
    id: 'starter-website',
    label: 'Essential Website',
    featureIds: ['fixed-content', 'basic-navigation', 'responsive-design'],
    projectTypes: ['Static Website'],
  },
];

const CROSS_CUTTING_LABEL = 'Cross-cutting / Common';

const PROJECT_TYPE_HINTS = {
  'Fintech / Personal Finance App':
    'Banking, savings groups, loans, wallets. Money made simple.',
  'On-Demand Service / Gig Economy App':
    'Uber, SweepSouth style. Book and track local services.',
  'Healthcare / Telemedicine App':
    'Video consultations, appointments, patient records',
  'Food Delivery / Restaurant App': 'Menus, orders, drivers, and delivery tracking',
  'Real Estate / Property Management App':
    'Listings, leases, rent collection, tenant portal',
  'Agriculture / Farm Management App':
    'Fields, crops, weather, and marketplace for produce',
  'Event Management / Ticketing App': 'Tickets, RSVPs, check-in, and seating',
  'Job Board / Recruitment / HR App':
    'Post jobs, track applicants, schedule interviews',
  'Marketplace App': 'Sellers, products, orders, and commissions',
  'Invoicing App': 'Invoices, clients, payments, and reminders',
  'Quotations App': 'Quotes, proposals, e-signatures, and templates',
  'Social Media App': 'Feed, stories, chat, and communities',
  'Project Management App': 'Tasks, timelines, Gantt charts, and team workload',
  'Educational App': 'Courses, progress, certificates, and discussions',
  'Messaging App': 'SMS, email, push, and in-app chat',
  'Fitness App': 'Workouts, GPS, tracking, and personal records',
  'E-commerce App': 'Products, cart, checkout, and wishlists',
  'Static Website': 'Brochure sites, landing pages, and fast static hosting',
  'Custom / Mixed': 'Show every feature (perfect for mixed ideas)',
};

const PROJECT_TYPE_EMOJI = {
  'Fintech / Personal Finance App': '💳',
  'On-Demand Service / Gig Economy App': '🚗',
  'Healthcare / Telemedicine App': '🏥',
  'Food Delivery / Restaurant App': '🍕',
  'Real Estate / Property Management App': '🏠',
  'Agriculture / Farm Management App': '🌾',
  'Event Management / Ticketing App': '🎫',
  'Job Board / Recruitment / HR App': '💼',
  'Marketplace App': '🛒',
  'Invoicing App': '📄',
  'Quotations App': '📝',
  'Social Media App': '👥',
  'Project Management App': '📊',
  'Educational App': '📚',
  'Messaging App': '💬',
  'Fitness App': '💪',
  'E-commerce App': '🛍️',
  'Static Website': '🌐',
  'Custom / Mixed': '🎯',
};

function buildGroupedAndSortedFeatures() {
  const byComplexity = (a, b) =>
    (a.complexity ?? 0) !== (b.complexity ?? 0)
      ? (a.complexity ?? 0) - (b.complexity ?? 0)
      : (a.days_to_complete || 0) - (b.days_to_complete || 0);

  const appGroups = appData.app_types.map((appType) => ({
    label: appType.type,
    features: [...appType.features]
      .map((f) => ({ ...f, type: f.type || 'entity-crud' }))
      .sort(byComplexity),
  }));

  const websiteFeatures = websiteData.features.map((f) => ({
    ...f,
    id: f.name.toLowerCase().replace(/\s/g, '-'),
    survey_question: `Would you like ${f.name.toLowerCase()}?`,
    type: f.type || 'entity-crud',
  }));
  const websiteGroup = {
    label: websiteData.type || 'Static Website',
    features: websiteFeatures.sort(byComplexity),
  };

  const groups = [...appGroups, websiteGroup];
  return groups.flatMap((g) =>
    g.features.map((f) => ({ ...f, groupLabel: g.label }))
  );
}

const allFeatures = buildGroupedAndSortedFeatures();

function getProjectTypeOptions() {
  const types = appData.app_types.map((t) => t.type);
  return [...types, websiteData.type || 'Static Website', 'Custom / Mixed'];
}

function getFeaturesForStage(selectedProjectTypes, stageNum) {
  if (!selectedProjectTypes?.length) return [];

  const isCustom = selectedProjectTypes.includes('Custom / Mixed');

  if (isCustom) {
    if (stageNum === 2) {
      return allFeatures.filter(
        (f) =>
          f.groupLabel === CROSS_CUTTING_LABEL || STAGE_2_TYPES.has(f.type)
      );
    }
    if (stageNum === 3) {
      return allFeatures.filter(
        (f) =>
          f.groupLabel === CROSS_CUTTING_LABEL || STAGE_3_TYPES.has(f.type)
      );
    }
    if (stageNum === 4) {
      return allFeatures.filter(
        (f) =>
          f.groupLabel === CROSS_CUTTING_LABEL || STAGE_4_TYPES.has(f.type)
      );
    }
    return allFeatures;
  }

  const set = new Set(selectedProjectTypes);
  const filtered = allFeatures.filter(
    (f) => set.has(f.groupLabel) || f.groupLabel === CROSS_CUTTING_LABEL
  );
  if (stageNum === 2) {
    return filtered.filter(
      (f) => f.groupLabel === CROSS_CUTTING_LABEL || STAGE_2_TYPES.has(f.type)
    );
  }
  if (stageNum === 3) {
    return filtered.filter(
      (f) => f.groupLabel === CROSS_CUTTING_LABEL || STAGE_3_TYPES.has(f.type)
    );
  }
  if (stageNum === 4) {
    return filtered.filter(
      (f) => f.groupLabel === CROSS_CUTTING_LABEL || STAGE_4_TYPES.has(f.type)
    );
  }
  return [];
}

function groupFeaturesByLabel(features) {
  const byGroup = {};
  features.forEach((f) => {
    if (!byGroup[f.groupLabel]) byGroup[f.groupLabel] = [];
    byGroup[f.groupLabel].push(f);
  });
  return byGroup;
}

/** Format amount in selected currency (display only; math is always ZAR). */
function formatMoney(amountZar, currencyCode) {
  const opt = CURRENCY_OPTIONS.find((c) => c.code === currencyCode) || CURRENCY_OPTIONS[0];
  const value = amountZar * (opt.code === 'ZAR' ? 1 : opt.rateToZar);
  const symbol = opt.code === 'ZAR' ? 'R' : opt.code === 'USD' ? '$' : '€';
  return `${symbol}${Math.round(value).toLocaleString()}`;
}

export default function GetAQuote({ trustStats = null }) {
  const [wizardStep, setWizardStep] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(String(CLIENT_QUOTE_HOURLY_RATE_ZAR));
  const [yearsExperience, setYearsExperience] = useState(String(CLIENT_QUOTE_YEARS_EXPERIENCE));
  const [hoursPerDay, setHoursPerDay] = useState(String(CLIENT_QUOTE_HOURS_PER_DAY));
  const [bufferPercent, setBufferPercent] = useState(CLIENT_QUOTE_BUFFER_PERCENT);
  const [currency, setCurrency] = useState('ZAR');
  const [selectedProjectTypes, setSelectedProjectTypes] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [buildTime, setBuildTime] = useState('');
  const [showEnquiryForm, setShowEnquiryForm] = useState(null);
  const [projectDetailsSent, setProjectDetailsSent] = useState(false);
  const [founderStage, setFounderStage] = useState('mvp');
  const [buildRequestForm, setBuildRequestForm] = useState({
    name: '',
    email: '',
    projectDetails: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    projectDetails: '',
  });

  const [isRapidBuild, setIsRapidBuild] = useState(false);
  const [addScopingSprint, setAddScopingSprint] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.selectedProjectTypes?.length)
        setSelectedProjectTypes(data.selectedProjectTypes);
      if (Array.isArray(data.selectedFeatures))
        setSelectedFeatures(data.selectedFeatures);
      if (data.buildTime != null) setBuildTime(String(data.buildTime));
      if (typeof data.isRapidBuild === 'boolean')
        setIsRapidBuild(data.isRapidBuild);
      if (typeof data.addScopingSprint === 'boolean')
        setAddScopingSprint(data.addScopingSprint);
      // Legacy drafts used 6 steps (incl. "Your details"); map to 5-step flow.
      let w = data.wizardStep;
      if (typeof w === 'number' && Number.isFinite(w)) {
        if (w >= 2 && w <= 6) w -= 1;
        if (w >= 1 && w <= 5) setWizardStep(w);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const openEmailCapture = () => {
      setShowEnquiryForm(true);
      trackConversion('popup_view', { surface: 'quote_email_prompt' });
      window.requestAnimationFrame(() => {
        document
          .getElementById('quote-email-section')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };
    window.addEventListener(OPEN_QUOTE_EMAIL_EVENT, openEmailCapture);
    return () => window.removeEventListener(OPEN_QUOTE_EMAIL_EVENT, openEmailCapture);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedProjectTypes,
          selectedFeatures,
          buildTime,
          wizardStep,
          isRapidBuild,
          addScopingSprint,
        })
      );
    } catch (_) {}
  }, [selectedProjectTypes, selectedFeatures, buildTime, wizardStep, isRapidBuild, addScopingSprint]);

  // Dynamic pricing: getTotals uses hourly rate, experience, hours/day, desired days; no price_zar in math
  const totals = useMemo(() => {
    const rate = Math.max(1, parseInt(hourlyRate, 10) || CLIENT_QUOTE_HOURLY_RATE_ZAR);
    const years = Math.max(0, parseInt(yearsExperience, 10) || 0);
    const hoursDay = Math.max(1, parseInt(hoursPerDay, 10) || HOURS_PER_DAY);
    const desiredDays = buildTime.trim() ? parseInt(buildTime, 10) : null;
    const baseTotals = getTotals(
      selectedFeatures,
      allFeatures,
      {
        hourlyRate: rate,
        yearsExperience: years,
        hoursPerDay: hoursDay,
        desiredDays: desiredDays ?? undefined,
      },
      bufferPercent
    );

    let estimated_days = baseTotals.estimated_days;
    let estimated_hours = baseTotals.estimated_hours;
    let base_price = baseTotals.base_price;
    let effective_desired_days = baseTotals.effective_desired_days;
    let adjusted_price = baseTotals.adjusted_price;

    if (isRapidBuild) {
      const multiplier = 0.5;
      estimated_days = Math.max(1, baseTotals.estimated_days * multiplier);
      estimated_hours = baseTotals.estimated_hours * multiplier;
      base_price = baseTotals.base_price * multiplier;

      if (desiredDays !== null) {
        effective_desired_days = Math.max(10, Math.min(20, desiredDays));
      } else {
        effective_desired_days = Math.max(10, Math.min(20, Math.round(estimated_days)));
      }

      adjusted_price = baseTotals.adjusted_price * multiplier;
    }

    // Add Paid Scoping Sprint (ZAR 15,000) if selected
    if (isRapidBuild && addScopingSprint) {
      adjusted_price += 15000;
      base_price += 15000;
    }

    return {
      ...baseTotals,
      estimated_days,
      estimated_hours,
      base_price,
      effective_desired_days,
      adjusted_price,
    };
  }, [
    selectedFeatures,
    hourlyRate,
    yearsExperience,
    hoursPerDay,
    buildTime,
    bufferPercent,
    isRapidBuild,
    addScopingSprint,
  ]);

  const handleBuildRequestSubmit = async (e) => {
    e.preventDefault();
    const nextFieldErrors = { name: '', email: '', projectDetails: '' };
    const name = buildRequestForm.name?.trim() ?? '';
    const email = buildRequestForm.email?.trim() ?? '';
    const notes = buildRequestForm.projectDetails?.trim() ?? '';

    if (!name) nextFieldErrors.name = 'Enter your name.';
    if (!email) {
      nextFieldErrors.email = 'Enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextFieldErrors.email = 'Enter a valid email address.';
    }
    if (notes.length < 30) {
      nextFieldErrors.projectDetails =
        'Add a short project brief (30+ characters): who it is for, what success looks like in 90 days.';
    }

    setFieldErrors(nextFieldErrors);

    if (nextFieldErrors.name || nextFieldErrors.email || nextFieldErrors.projectDetails) {
      setSubmitError(null);
      const firstInvalidId = nextFieldErrors.name
        ? 'build-name'
        : nextFieldErrors.email
          ? 'build-email'
          : 'build-details';
      requestAnimationFrame(() => {
        document.getElementById(firstInvalidId)?.focus();
      });
      return;
    }
    if (!totals.hasFeatures) {
      setSubmitError('Select at least one feature before emailing your quote.');
      return;
    }
    setSubmitError(null);
    setSubmitLoading(true);
    try {
      const rate = Math.max(1, parseInt(hourlyRate, 10) || CLIENT_QUOTE_HOURLY_RATE_ZAR);
      const years = Math.max(0, parseInt(yearsExperience, 10) || 0);
      const hoursDay = Math.max(1, parseInt(hoursPerDay, 10) || HOURS_PER_DAY);
      const baseBreakdown = getFeatureBreakdown(
        selectedFeatures,
        allFeatures,
        {
          hourlyRate: rate,
          yearsExperience: years,
          hoursPerDay: hoursDay,
          desiredDays: buildTime.trim() ? parseInt(buildTime, 10) : undefined,
        },
        bufferPercent,
      );
      const breakdown = isRapidBuild
        ? baseBreakdown.map((row) => ({
            ...row,
            adjusted_days: row.adjusted_days * 0.5,
            feature_base_price: row.feature_base_price * 0.5,
            feature_adjusted_price: (row.feature_adjusted_price ?? 0) * 0.5,
          }))
        : baseBreakdown;
      const quote = buildQuoteExportPayload({
        selectedProjectTypes,
        selectedFeatures,
        allFeatures,
        totals,
        breakdown,
        currency,
        hourlyRate,
        yearsExperience,
        hoursPerDay,
        bufferPercent,
        buildTime,
      });

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: buildRequestForm.name.trim(),
          email: buildRequestForm.email.trim(),
          founderStage,
          projectDetails: notes,
          quote,
        }),
      });

      const data = await parseApiJsonResponse(response);
      if (!response.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Failed to send request',
        );
      }

      setProjectDetailsSent(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGroupSelectAll = (featureIds, checked) => {
    setSelectedFeatures((prev) => {
      const set = new Set(prev);
      featureIds.forEach((id) => (checked ? set.add(id) : set.delete(id)));
      return [...set];
    });
  };

  const applyBundle = (featureIds) => {
    setSelectedFeatures((prev) => {
      const set = new Set(prev);
      featureIds.forEach((id) => set.add(id));
      return [...set];
    });
  };

  const projectTypeOptions = useMemo(() => getProjectTypeOptions(), []);
  const featuresStage2 = useMemo(
    () => getFeaturesForStage(selectedProjectTypes, 2),
    [selectedProjectTypes]
  );
  const featuresStage3 = useMemo(
    () => getFeaturesForStage(selectedProjectTypes, 3),
    [selectedProjectTypes]
  );
  const featuresStage4 = useMemo(
    () => getFeaturesForStage(selectedProjectTypes, 4),
    [selectedProjectTypes]
  );

  const visibleBundles = useMemo(
    () =>
      RECOMMENDED_BUNDLES.filter((b) =>
        b.projectTypes.some((t) => selectedProjectTypes.includes(t))
      ),
    [selectedProjectTypes]
  );

  const maxDesiredTimeForDiscount = Math.max(
    Math.ceil(totals.estimated_days * MAX_DESIRED_TIME_MULTIPLIER),
    90
  );
  const desiredTimeNum = totals.effective_desired_days;
  const isRush =
    totals.hasFeatures &&
    totals.estimated_days > 0 &&
    desiredTimeNum < totals.estimated_days * 0.6;
  const showMiniSummary =
    wizardStep >= 1 && wizardStep <= 4 && selectedFeatures.length > 0;

  // Complexity for UI flair only (not used in pricing)
  const complexityTotal = selectedFeatures.reduce((acc, id) => {
    const f = allFeatures.find((x) => x.id === id);
    return acc + (f?.complexity ?? 0);
  }, 0);
  const totalComplexity = Math.max(selectedFeatures.length * 5, 1);
  const complexityPerc = Math.round((complexityTotal / totalComplexity) * 100);

  function renderStage1() {
    return (
      <Card className="w-full max-w-4xl mx-auto border-border/80 bg-gradient-to-b from-card via-card to-secondary/25">
        <CardHeader className="border-b border-border/60 bg-secondary/20">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" aria-hidden />
            What kind of project are you building?
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Pick one or more that best match your idea, or choose &quot;Custom /
            Mixed&quot; if your app combines several things.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-background/40 pt-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            role="group"
            aria-label="Project type"
          >
            {projectTypeOptions.map((type) => {
              const isSelected = selectedProjectTypes.includes(type);
              const emoji = PROJECT_TYPE_EMOJI[type] ?? '📌';
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    if (type === 'Custom / Mixed') {
                      setSelectedProjectTypes((prev) =>
                        prev.includes('Custom / Mixed')
                          ? prev.filter((t) => t !== 'Custom / Mixed')
                          : ['Custom / Mixed']
                      );
                    } else {
                      setSelectedProjectTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      );
                    }
                  }}
                  className={cn(
                    'rounded-lg border-2 p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] min-h-[44px]',
                    isSelected
                      ? 'border-primary bg-primary/15 text-foreground shadow-[inset_0_1px_0_0_hsl(var(--primary)/0.25)] ring-1 ring-primary/35'
                      : 'border-border bg-secondary/40 text-foreground hover:border-primary/45 hover:bg-secondary/70'
                  )}
                  aria-pressed={isSelected}
                >
                  <span className="font-medium">{emoji} {type}</span>
                  {PROJECT_TYPE_HINTS[type] && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {PROJECT_TYPE_HINTS[type]}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-border/60 bg-secondary/15 pt-6">
          <Button
            onClick={() => setWizardStep(2)}
            disabled={selectedProjectTypes.length === 0}
            aria-disabled={selectedProjectTypes.length === 0}
          >
            Next: Core features →
          </Button>
        </CardFooter>
      </Card>
    );
  }

  function renderFeatureStage(stageNum, title, subtitle, features, IconComponent) {
    const byGroup = groupFeaturesByLabel(features);
    const groupLabels = Object.keys(byGroup).sort((a, b) => {
      if (a === CROSS_CUTTING_LABEL) return 1;
      if (b === CROSS_CUTTING_LABEL) return -1;
      return a.localeCompare(b);
    });

    const hasFeatures = groupLabels.length > 0;

    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-cyan-800 flex items-center gap-2">
            {IconComponent && <IconComponent className="h-5 w-5" aria-hidden />}
            {title}
          </CardTitle>
          <CardDescription>
            {stageNum === 3 && 'The everyday basics your app probably needs'}
            {stageNum === 4 && 'Things that make money or connect people'}
            {stageNum === 5 && 'Nice extras that make it feel modern and trustworthy'}
          </CardDescription>
          {visibleBundles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {visibleBundles.map((bundle) => (
                <Badge
                  key={bundle.id}
                  variant="secondary"
                  className="cursor-pointer hover:bg-cyan-100"
                  onClick={() => applyBundle(bundle.featureIds)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      applyBundle(bundle.featureIds);
                    }
                  }}
                >
                  ✨ Recommended: {bundle.label}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!hasFeatures ? (
            <p className="text-muted-foreground text-sm py-4">
              No features in this category for your project type. Click Next to
              continue.
            </p>
          ) : (
            <Accordion type="multiple" defaultValue={[]}>
              {groupLabels.map((groupLabel) => {
                const groupFeatures = byGroup[groupLabel];
                const ids = groupFeatures.map((f) => f.id);
                const selectedCount = ids.filter((id) =>
                  selectedFeatures.includes(id)
                ).length;
                const allSelected = selectedCount === ids.length;

                return (
                  <AccordionItem key={groupLabel} value={groupLabel}>
                    <AccordionTrigger
                      value={groupLabel}
                      className="hover:no-underline"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={(checked) =>
                            handleGroupSelectAll(ids, checked === true)
                          }
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select all ${groupLabel}`}
                        />
                        <span className="font-semibold">{groupLabel}</span>
                        {selectedCount > 0 && (
                          <span className="text-muted-foreground text-xs">
                            ({selectedCount} selected)
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent value={groupLabel}>
                      <ul className="space-y-1">
                        {groupFeatures.map((feature) => (
                          <li key={feature.id}>
                            <div
                              className={cn(
                                'flex items-center gap-3 rounded-md p-3 min-h-[44px] border border-transparent hover:bg-muted/50 hover:border-muted transition-colors',
                                selectedFeatures.includes(feature.id) && 'bg-cyan-50/50'
                              )}
                            >
                              <Checkbox
                                id={feature.id}
                                checked={selectedFeatures.includes(feature.id)}
                                onCheckedChange={() =>
                                  handleFeatureToggle(feature.id)
                                }
                                aria-describedby={`${feature.id}-desc`}
                              />
                              <label
                                htmlFor={feature.id}
                                className="flex-1 text-sm text-foreground cursor-pointer"
                                id={`${feature.id}-desc`}
                              >
                                {feature.survey_question}
                              </label>
                              <Popover>
                                <PopoverTrigger
                                  type="button"
                                  className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                                  aria-label={`Info about ${feature.name}`}
                                >
                                  <Info className="h-4 w-4" />
                                </PopoverTrigger>
                                <PopoverContent align="end" className="max-w-xs">
                                  <p className="text-sm">{feature.survey_question}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Baseline: {feature.days_to_complete ?? 'n/a'} days (mid-level). Your
                                    estimate depends on your experience and rate.
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Common in: {feature.groupLabel}
                                  </p>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={() => setWizardStep((w) => Math.max(1, w - 1))}>
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setWizardStep((w) => Math.min(5, w + 1))}
            >
              None of these → Next
            </Button>
            <Button onClick={() => setWizardStep((w) => Math.min(5, w + 1))}>Next →</Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  function renderStage5Quote() {
    const rate = Math.max(1, parseInt(hourlyRate, 10) || CLIENT_QUOTE_HOURLY_RATE_ZAR);
    const years = Math.max(0, parseInt(yearsExperience, 10) || 0);
    const hoursDay = Math.max(1, parseInt(hoursPerDay, 10) || HOURS_PER_DAY);
    const breakdown = getFeatureBreakdown(
      selectedFeatures,
      allFeatures,
      {
        hourlyRate: rate,
        yearsExperience: years,
        hoursPerDay: hoursDay,
        desiredDays: buildTime.trim() ? parseInt(buildTime, 10) : undefined,
      },
      bufferPercent
    );

    const complexityCopy =
      complexityPerc <= 20
        ? 'Straightforward scope. Good to go.'
        : complexityPerc <= 40
          ? 'Moderate complexity. Well within reach.'
          : complexityPerc <= 60
            ? 'Substantial scope. Plan accordingly.'
            : complexityPerc <= 80
              ? 'High complexity. Consider phasing.'
              : 'Very high complexity. Break into phases.';

    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {totals.hasFeatures ? (
          <div
            className="rounded-xl border border-surface-border bg-surface-raised p-6 md:p-8"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="section-label mb-2">Estimated ballpark</p>
            <p className="quote-price-result">{formatMoney(totals.adjusted_price, currency)}</p>
            <p className="mt-3 text-sm text-text-secondary">
              ~{Math.round(desiredTimeNum)} days at your timeline ·{' '}
              {selectedFeatures.length} features selected
            </p>
            <p className="mt-1 text-xs text-text-muted">
              Display currency: {currency}. Figures are indicative until we review scope together.
            </p>
          </div>
        ) : null}

        {/* Methodology Selection Card */}
        {totals.hasFeatures && (
          <Card className="border-surface-border bg-surface-raised overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-accent-gold/5 to-transparent border-b border-surface-border">
              <CardTitle className="text-xl text-text-primary flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent-gold animate-pulse" aria-hidden />
                Select Build Methodology
              </CardTitle>
              <CardDescription>
                Choose how we engineer your software. Qwabi Engineering offers both traditional manual-led engineering and next-generation, AI-accelerated delivery models.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Traditional Card */}
                <div
                  onClick={() => {
                    setIsRapidBuild(false);
                    setAddScopingSprint(false);
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between h-full hover:border-surface-border/85",
                    !isRapidBuild 
                      ? "border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.05)]" 
                      : "border-surface-border bg-surface/40 opacity-70 hover:opacity-100"
                  )}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">Standard Build</span>
                      <Badge variant={!isRapidBuild ? "default" : "outline"} className={!isRapidBuild ? "bg-accent-gold text-black hover:bg-accent-gold border-none" : "border-surface-border"}>
                        Traditional
                      </Badge>
                    </div>
                    <h4 className="text-base font-bold text-text-primary mb-2">Classic Engineering</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Standard development cycle. Manual architecture planning, strict manual code reviews, and deep iterative cycles. Ideal for complex, hyper-custom systems or low-level performance tuning.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-border/30 flex justify-between items-center text-xs">
                    <span className="text-text-muted">Standard timeline</span>
                    <span className="font-semibold text-text-primary">100% Rate</span>
                  </div>
                </div>

                {/* AI-Powered Rapid Build Card */}
                <div
                  onClick={() => setIsRapidBuild(true)}
                  className={cn(
                    "cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between h-full hover:border-surface-border/85",
                    isRapidBuild 
                      ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                      : "border-surface-border bg-surface/40 opacity-70 hover:opacity-100"
                  )}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold tracking-wide uppercase text-emerald-400">Accelerated Build</span>
                      <Badge variant={isRapidBuild ? "default" : "outline"} className={isRapidBuild ? "bg-emerald-500 text-black hover:bg-emerald-500 border-none" : "border-surface-border"}>
                        50% Cost Saving
                      </Badge>
                    </div>
                    <h4 className="text-base font-bold text-text-primary mb-2 flex items-center gap-1.5">
                      AI-Powered Rapid Build
                      <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Next-generation engineering workflow using AI-assisted software production and documentation-driven development, protected by strict human-architected quality gates.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-border/30 flex justify-between items-center text-xs">
                    <span className="text-emerald-400 font-medium">Cut timeline in half</span>
                    <span className="font-bold text-emerald-400">50% Discount Applied</span>
                  </div>
                </div>

              </div>

              {/* Paid Scoping Sprint Sub-Option (Only visible when AI-Powered Rapid Build is selected) */}
              {isRapidBuild && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 transition-all duration-300 animate-fadeIn space-y-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-text-primary flex flex-wrap items-center gap-1.5">
                        Add Paid Scoping Sprint Option
                        <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[10px]">1-Week Scoping</Badge>
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">
                        Accelerate alignment. A high-intensity 1-week collaborative session producing a comprehensive Product Requirements Document (PRD), core data schemas, and a click-through wireframe blueprint.
                      </p>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        ★ Credited back in full (100% discount) if you build the project with us.
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 self-end sm:self-start">
                      <span className="text-[10px] text-text-muted">Sprint Fee</span>
                      <span className="text-base font-extrabold text-emerald-400">{formatMoney(15000, currency)}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between">
                    <label htmlFor="scoping-checkbox" className="text-xs text-text-primary font-medium cursor-pointer select-none flex items-center gap-2">
                      <input
                        id="scoping-checkbox"
                        type="checkbox"
                        checked={addScopingSprint}
                        onChange={(e) => setAddScopingSprint(e.target.checked)}
                        className="rounded border-emerald-500/30 text-emerald-500 focus:ring-emerald-500 bg-surface h-4 w-4"
                      />
                      Add Paid Scoping Sprint to my project
                    </label>
                    {addScopingSprint && (
                      <span className="text-xs text-emerald-400 font-medium">Added to estimate</span>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}


        <Card className="border-surface-border bg-surface-raised">
          <CardHeader>
            <CardTitle className="text-xl text-text-primary flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent-gold" aria-hidden />
              Timeline
            </CardTitle>
            <CardDescription>
              How many days would you like to aim for? Longer timelines get a
              discount (with a floor); shorter timelines add a premium.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="buildTime" className="text-text-primary">
              Desired build time (days)
            </Label>
            <input
              id="buildTime"
              type="number"
              min={1}
              max={maxDesiredTimeForDiscount}
              value={buildTime}
              onChange={(e) => setBuildTime(e.target.value)}
              placeholder={String(
                totals.hasFeatures ? Math.max(1, Math.round(totals.estimated_days)) : 1
              )}
              className={cn(formInputCls(false), 'mt-2 max-w-[10rem]')}
              aria-describedby="buildTime-hint"
            />
            <p id="buildTime-hint" className="text-xs text-text-muted mt-1">
              Our estimate: {Math.round(totals.estimated_days)} days. Max discount
              timeline: {maxDesiredTimeForDiscount} days (price floor applies beyond).
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setWizardStep(4)}>
              ← Back
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-cyan-800 flex items-center gap-2">
              <FileText className="h-5 w-5" aria-hidden />
              Summary
            </CardTitle>
            <CardDescription>
              Your selected features and estimated costs (currency: {currency})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Complexity:</strong> {Math.round(complexityTotal)} /{' '}
              {Math.round(totalComplexity)} = {complexityPerc}%
            </p>
            <p className="text-emerald-600 text-sm italic">{complexityCopy}</p>

            {isRapidBuild && (
              <div
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-400 font-medium"
                role="status"
              >
                ⚡ AI-Powered Rapid Build active (50% faster timeline and 50% cost savings applied).
                {addScopingSprint && (
                  <span> Includes 1-Week Paid Scoping Sprint (credited back if you build).</span>
                )}
              </div>
            )}

            <p>
              <strong>Our time:</strong> {Math.round(totals.estimated_days)} days ·{' '}
              {formatMoney(totals.base_price, currency)}
            </p>
            <p>
              <strong>Desired time:</strong> {Math.round(desiredTimeNum)} days ·{' '}
              {formatMoney(totals.adjusted_price, currency)}
            </p>

            {isRush && (
              <div
                className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-text-primary"
                role="alert"
              >
                Faster delivery increases cost; we&apos;ve applied a rush multiplier.
              </div>
            )}

            {totals.time_ratio < 1 && totals.effective_ratio === 0.4 && (
              <p className="text-xs text-muted-foreground">
                Discount floor applied for this timeline.
              </p>
            )}

            {trustStats && (
              <p className="text-sm text-muted-foreground">
                Typical range for projects like this: {trustStats.range}.
              </p>
            )}

            {breakdown.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Adjusted days</TableHead>
                      <TableHead>Hours (ours)</TableHead>
                      <TableHead>Price (base)</TableHead>
                      <TableHead>Price (desired)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdown.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.complexity ?? 'n/a'}</TableCell>
                        <TableCell>{row.adjusted_days.toFixed(1)}</TableCell>
                        <TableCell>
                          {Math.round(row.adjusted_days * (parseInt(hoursPerDay, 10) || HOURS_PER_DAY))}
                        </TableCell>
                        <TableCell>
                          {formatMoney(row.feature_base_price, currency)}
                        </TableCell>
                        <TableCell>
                          {formatMoney(row.feature_adjusted_price, currency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!totals.hasFeatures && (
              <p className="text-sm text-amber-700">
                Select at least one feature to see a quote. Go back to Core /
                Advanced / Polish to add features.
              </p>
            )}
          </CardContent>
        </Card>

        {showEnquiryForm === null && (
          <Card id="quote-email-section">
            <CardHeader>
              <CardTitle className="text-lg text-cyan-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" aria-hidden />
                Email this scope summary?
              </CardTitle>
              <CardDescription>
                Get a copy in your inbox, plus a short founder series on scoping and rebuild
                traps. For quick chats, WhatsApp is on the main site. Serious builds start
                with context here.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setShowEnquiryForm(true);
                  trackConversion('popup_cta', { surface: 'quote_email_prompt' });
                  window.requestAnimationFrame(() => {
                    document
                      .getElementById('quote-email-section')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  });
                }}
                disabled={!totals.hasFeatures}
                className="bg-emerald-600 hover:bg-emerald-700 min-h-[44px]"
              >
                Email me this quote
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEnquiryForm(false)}
                className="min-h-[44px]"
              >
                No, thanks
              </Button>
            </CardContent>
          </Card>
        )}

        {showEnquiryForm === false && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-cyan-700">
                You can copy the summary from the table above or come back to
                export later.
              </p>
            </CardContent>
          </Card>
        )}

        {showEnquiryForm === true && !projectDetailsSent && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-cyan-800 flex items-center gap-2">
                <Send className="h-5 w-5" aria-hidden />
                Save quote to your inbox
              </CardTitle>
              <CardDescription>
                Your feature breakdown, totals, and assumptions. Plus four short emails on
                scoping and rebuild traps (unsubscribe anytime).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBuildRequestSubmit} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="build-name" className="text-text-primary">
                    Name *
                  </Label>
                  <input
                    id="build-name"
                    name="name"
                    autoComplete="name"
                    value={buildRequestForm.name}
                    onChange={(e) => {
                      setBuildRequestForm((p) => ({ ...p, name: e.target.value }));
                      if (fieldErrors.name) setFieldErrors((f) => ({ ...f, name: '' }));
                    }}
                    placeholder="Your name"
                    className={cn(formInputCls(Boolean(fieldErrors.name)), 'mt-1')}
                    aria-invalid={fieldErrors.name ? 'true' : undefined}
                    aria-describedby={fieldErrors.name ? 'build-name-error' : undefined}
                    required
                  />
                  <FieldError id="build-name-error" message={fieldErrors.name} />
                </div>
                <div>
                  <Label htmlFor="build-stage" className="text-text-primary">
                    Where is the product today? *
                  </Label>
                  <select
                    id="build-stage"
                    value={founderStage}
                    onChange={(e) => setFounderStage(e.target.value)}
                    className={cn(formInputCls(false), 'mt-1')}
                    required
                  >
                    {FOUNDER_STAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="build-email" className="text-text-primary">
                    Email *
                  </Label>
                  <input
                    id="build-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={buildRequestForm.email}
                    onChange={(e) => {
                      setBuildRequestForm((p) => ({ ...p, email: e.target.value }));
                      if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: '' }));
                    }}
                    placeholder="your@email.com"
                    className={cn(formInputCls(Boolean(fieldErrors.email)), 'mt-1')}
                    aria-invalid={fieldErrors.email ? 'true' : undefined}
                    aria-describedby={fieldErrors.email ? 'build-email-error' : undefined}
                    required
                  />
                  <FieldError id="build-email-error" message={fieldErrors.email} />
                </div>
                <div>
                  <Label htmlFor="build-details" className="text-text-primary">
                    Project brief *
                  </Label>
                  <textarea
                    id="build-details"
                    name="projectDetails"
                    value={buildRequestForm.projectDetails}
                    onChange={(e) => {
                      setBuildRequestForm((p) => ({
                        ...p,
                        projectDetails: e.target.value,
                      }));
                      if (fieldErrors.projectDetails) {
                        setFieldErrors((f) => ({ ...f, projectDetails: '' }));
                      }
                    }}
                    placeholder="Who is it for, what must work in the next 90 days, and what have you already tried? (30+ characters)"
                    rows={4}
                    required
                    minLength={30}
                    className={cn(
                      formInputCls(Boolean(fieldErrors.projectDetails)),
                      'mt-1 min-h-[120px]',
                    )}
                    aria-invalid={fieldErrors.projectDetails ? 'true' : undefined}
                    aria-describedby={
                      fieldErrors.projectDetails ? 'build-details-error' : undefined
                    }
                  />
                  <FieldError id="build-details-error" message={fieldErrors.projectDetails} />
                </div>
                {submitError ? (
                  <p className="form-field-error" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button type="submit" disabled={submitLoading} className="btn-primary min-h-[44px]">
                  {submitLoading ? 'Sending...' : 'Send quote to my inbox'}
                </button>
              </form>
            </CardContent>
          </Card>
        )}

        {showEnquiryForm === true && projectDetailsSent && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-emerald-600 font-medium flex items-center gap-2">
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden />
                Check your inbox for your scope summary. Over the next two weeks you will get
                a few short notes on scoping and rebuild prevention. Reply to any email when
                you are ready to talk through the build.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="relative pb-24">
      <div className="sticky top-0 z-10 bg-surface-base/95 backdrop-blur py-3 border-b border-surface-border mb-6">
        <ProgressSteps
          steps={WIZARD_STEPS}
          currentStep={wizardStep}
          onStepClick={(step) => setWizardStep(step)}
          className="max-w-4xl mx-auto px-4"
        />
      </div>

      <div className="px-4">
        {wizardStep === 1 && renderStage1()}
        {wizardStep === 2 &&
          renderFeatureStage(
            3,
            'Core features',
            'Auth, users, and basic CRUD.',
            featuresStage2,
            Zap
          )}
        {wizardStep === 3 &&
          renderFeatureStage(
            4,
            'Advanced features',
            'Payments, integrations, media.',
            featuresStage3,
            Rocket
          )}
        {wizardStep === 4 &&
          renderFeatureStage(
            5,
            'Polish & cross-cutting',
            'Dark mode, i18n, compliance.',
            featuresStage4,
            Sparkles
          )}
        {wizardStep === 5 && renderStage5Quote()}
      </div>

      {showMiniSummary && (
        <div
          className="fixed bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-20 bg-card border border-border rounded-lg p-4 sm:rounded-xl"
          role="complementary"
          aria-label="Quote summary"
        >
          <p className="text-sm font-medium">
            📋 {selectedFeatures.length} features ·{' '}
            {formatMoney(totals.adjusted_price, currency)} · ~
            {Math.round(totals.estimated_days)} days
          </p>
          <Button className="w-full mt-2 min-h-[44px]" onClick={() => setWizardStep(5)}>
            View full summary →
          </Button>
        </div>
      )}
    </div>
  );
}
