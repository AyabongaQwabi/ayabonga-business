import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Hotjar from '@hotjar/browser';
import App from './App.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { ViewTransitionHandler } from './components/ViewTransitionHandler.tsx';
import { ConversionPopupProvider } from './context/ConversionPopupContext.tsx';
import { ConversionPopupHost } from './components/conversion/ConversionPopupHost.tsx';
import './index.css';

const siteId = 6774281;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ConversionPopupProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ViewTransitionHandler />
          <App />
          <ConversionPopupHost />
        </BrowserRouter>
        <Analytics />
      </ConversionPopupProvider>
    </HelmetProvider>
  </StrictMode>,
);
