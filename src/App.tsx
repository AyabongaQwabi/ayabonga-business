import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteFallback } from './components/layout/RouteFallback';
import { buyerIntentPaths } from './data/buyer-intent-pages.ts';
import { partnershipPaths } from './data/partnership-landing-pages.ts';
import { serviceLandingPaths } from './data/service-landing-pages.ts';
import { AdminLayout } from './components/admin/AdminLayout.tsx';

const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const PricingStrategyPage = lazy(() => import('./pages/PricingStrategyPage.tsx'));
const GetAQuotePage = lazy(() => import('./pages/GetAQuotePage.tsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage.tsx'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.tsx'));
const AppDevelopmentCostPage = lazy(() => import('./pages/AppDevelopmentCostPage.tsx'));
const ServiceLandingPage = lazy(() => import('./pages/ServiceLandingPage.tsx'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.tsx'));
const EditorialPage = lazy(() => import('./pages/Editorial.tsx'));

const ServicesPage = lazy(() => import('./pages/Services.tsx'));
const TechnicalCofounderPage = lazy(() => import('./pages/TechnicalCofounder.tsx'));
const DynamicServicePage = lazy(() => import('./pages/DynamicServicePage.tsx'));
const DynamicComparisonPage = lazy(() => import('./pages/DynamicComparisonPage.tsx'));
const DevelopersRegionHub = lazy(() => import('./pages/DevelopersRegionHub.tsx'));
const LocalDeveloperPage = lazy(() => import('./pages/LocalDeveloperPage.tsx'));
const EspazzaProject = lazy(() => import('./pages/EspazzaProject.tsx'));
const BuyerIntentPage = lazy(() => import('./pages/BuyerIntentPage.tsx'));
const PartnershipLandingPage = lazy(() => import('./pages/PartnershipLandingPage.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.tsx'));
const AdminLeads = lazy(() => import('./pages/admin/AdminLeads.tsx'));
const AdminLeadDetail = lazy(() => import('./pages/admin/AdminLeadDetail.tsx'));
const AdminTemplates = lazy(() => import('./pages/admin/AdminTemplates.tsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing-strategy" element={<PricingStrategyPage />} />
        <Route path="/get-a-quote" element={<GetAQuotePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route
          path="/app-development-cost-south-africa"
          element={<AppDevelopmentCostPage />}
        />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/editorial" element={<EditorialPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/technical-cofounder" element={<TechnicalCofounderPage />} />
        <Route path="/solutions/:slug" element={<DynamicServicePage />} />
        <Route path="/vs/:slug" element={<DynamicComparisonPage />} />
        <Route
          path="/developers/south-africa"
          element={<DevelopersRegionHub regionSlug="south-africa" />}
        />
        <Route
          path="/developers/eastern-cape"
          element={<DevelopersRegionHub regionSlug="eastern-cape" />}
        />
        <Route
          path="/developers/eastern-cape/:city/:role"
          element={<LocalDeveloperPage />}
        />

        {buyerIntentPaths.map((path) => (
          <Route key={path} path={path} element={<BuyerIntentPage />} />
        ))}
        {partnershipPaths.map((path) => (
          <Route key={path} path={path} element={<PartnershipLandingPage />} />
        ))}
        {serviceLandingPaths.map((path) => (
          <Route key={path} path={path} element={<ServiceLandingPage />} />
        ))}

        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="leads" element={<AdminLeads />} />
            <Route path="leads/:id" element={<AdminLeadDetail />} />
            <Route path="templates" element={<AdminTemplates />} />
          </Route>
        </Route>

        <Route path="/projects/espazza" element={<EspazzaProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
