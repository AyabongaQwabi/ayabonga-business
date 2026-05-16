import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import Blog from './pages/Blog.tsx';
import BlogPost from './pages/BlogPost.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { ViewTransitionHandler } from './components/ViewTransitionHandler.tsx';
import GetAQuotePage from './pages/GetAQuotePage.tsx';
import PricingStrategyPage from './pages/PricingStrategyPage.tsx';
import ServicesPage from './pages/Services.tsx';
import TechnicalCofounderPage from './pages/TechnicalCofounder.tsx';
import DynamicServicePage from './pages/DynamicServicePage.tsx';
import DynamicComparisonPage from './pages/DynamicComparisonPage.tsx';
import DevelopersRegionHub from './pages/DevelopersRegionHub.tsx';
import LocalDeveloperPage from './pages/LocalDeveloperPage.tsx';
import EspazzaProject from './pages/EspazzaProject.tsx';
import NotFound from './pages/NotFound.tsx';
import About from './pages/About.tsx';
import Privacy from './pages/Privacy.tsx';
import AppDevelopmentCostSouthAfricaPage from './pages/AppDevelopmentCostSouthAfricaPage.tsx';
import BuyerIntentPage from './pages/BuyerIntentPage.tsx';
import PartnershipLandingPage from './pages/PartnershipLandingPage.tsx';
import ServiceLandingPage from './pages/ServiceLandingPage.tsx';
import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminLeads from './pages/admin/AdminLeads.tsx';
import AdminLeadDetail from './pages/admin/AdminLeadDetail.tsx';
import AdminTemplates from './pages/admin/AdminTemplates.tsx';
import { AdminLayout } from './components/admin/AdminLayout.tsx';
import { buyerIntentPaths } from './data/buyer-intent-pages.ts';
import { partnershipPaths } from './data/partnership-landing-pages.ts';
import { serviceLandingPaths } from './data/service-landing-pages.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ViewTransitionHandler />
        <Routes>
          <Route path="/" element={<App />} />
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
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing-strategy" element={<PricingStrategyPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/get-a-quote" element={<GetAQuotePage />} />
          <Route
            path="/app-development-cost-south-africa"
            element={<AppDevelopmentCostSouthAfricaPage />}
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
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
