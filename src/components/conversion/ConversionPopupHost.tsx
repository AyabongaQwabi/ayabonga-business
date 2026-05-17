import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ConversionSlideIn } from './ConversionSlideIn';
import { ConversionExitIntentModal } from './ConversionExitIntentModal';
import { ConversionStickyBanner } from './ConversionStickyBanner';
import { ChecklistEmailDialog } from './ChecklistEmailDialog';
import { getSlideInCopy } from './conversion-popup-copy';
import { trackConversion } from '../../lib/conversion-analytics';
import {
  canShowExitAfterSlideIn,
  getPageviewCount,
  incrementPageviewCount,
  isBannerDismissed,
  isExitDismissed,
  isPromoDismissed,
  markExitShown,
  markSlideInShown,
  wasExitShownThisSession,
  wasSessionConverted,
  wasSlideInShownThisSession,
  wasWhatsAppClicked,
} from '../../lib/conversion-popup-storage';
import {
  getSlideInVariant,
  isAdminRoute,
  isConversionDisabled,
  isDesktopViewport,
  isExitIntentEligible,
  isStickyBannerEligible,
  SLIDE_IN_MIN_MS_ON_PAGE,
  SLIDE_IN_PAGEVIEW_TRIGGER,
  SLIDE_IN_SCROLL_RATIO,
} from '../../lib/conversion-popup-rules';
import { useConversionPopup } from '../../context/ConversionPopupContext';

export function ConversionPopupHost() {
  const { pathname } = useLocation();
  const {
    checklistEmailOpen,
    checklistEmailSummary,
    closeChecklistEmailDialog,
  } = useConversionPopup();

  const [bannerVisible, setBannerVisible] = useState(false);
  const [slideInVisible, setSlideInVisible] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  const pageEnteredAt = useRef(Date.now());
  const scrollTriggered = useRef(false);
  const pageviewTriggered = useRef(false);
  const exitTriggered = useRef(false);

  const slideVariant = getSlideInVariant(pathname);
  const slideCopy = slideVariant ? getSlideInCopy(slideVariant) : null;

  const canRunPromos =
    !isAdminRoute(pathname) &&
    !isConversionDisabled(pathname) &&
    !wasSessionConverted() &&
    !wasWhatsAppClicked();

  useEffect(() => {
    pageEnteredAt.current = Date.now();
    scrollTriggered.current = false;
    pageviewTriggered.current = false;
    exitTriggered.current = false;
    setSlideInVisible(false);
    setExitOpen(false);

    const count = incrementPageviewCount();
    if (process.env.NODE_ENV === 'development') {
      console.log('[ConversionPopupHost] pageview', { pathname, count });
    }
  }, [pathname]);

  useEffect(() => {
    if (!canRunPromos || !isStickyBannerEligible(pathname) || isBannerDismissed()) {
      setBannerVisible(false);
      return;
    }
    if (getPageviewCount() === 1) {
      setBannerVisible(true);
      trackConversion('popup_view', { surface: 'sticky_banner' });
    } else {
      setBannerVisible(false);
    }
  }, [pathname, canRunPromos]);

  const tryShowSlideIn = useCallback(() => {
    if (!canRunPromos || !slideVariant || !slideCopy) return;
    if (isPromoDismissed() || wasSlideInShownThisSession()) return;
    if (slideInVisible) return;

    markSlideInShown();
    setSlideInVisible(true);
    trackConversion('popup_view', { surface: 'slide_in', variant: slideVariant });
  }, [canRunPromos, slideVariant, slideCopy, slideInVisible]);

  useEffect(() => {
    if (!canRunPromos || !slideVariant) return;

    const onScroll = () => {
      if (scrollTriggered.current) return;
      const elapsed = Date.now() - pageEnteredAt.current;
      if (elapsed < SLIDE_IN_MIN_MS_ON_PAGE) return;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const ratio = window.scrollY / scrollable;
      if (ratio >= SLIDE_IN_SCROLL_RATIO) {
        scrollTriggered.current = true;
        tryShowSlideIn();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, canRunPromos, slideVariant, tryShowSlideIn]);

  useEffect(() => {
    if (!canRunPromos || !slideVariant) return;
    if (pageviewTriggered.current) return;

    const count = getPageviewCount();
    if (count >= SLIDE_IN_PAGEVIEW_TRIGGER) {
      const elapsed = Date.now() - pageEnteredAt.current;
      if (elapsed >= SLIDE_IN_MIN_MS_ON_PAGE) {
        pageviewTriggered.current = true;
        tryShowSlideIn();
      }
    }
  }, [pathname, canRunPromos, slideVariant, tryShowSlideIn]);

  useEffect(() => {
    if (!canRunPromos || !isExitIntentEligible(pathname)) return;
    if (!isDesktopViewport()) return;
    if (isExitDismissed() || wasExitShownThisSession()) return;
    if (!canShowExitAfterSlideIn()) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (exitTriggered.current) return;
      if (e.clientY > 0) return;
      if (e.relatedTarget !== null) return;

      exitTriggered.current = true;
      markExitShown();
      setExitOpen(true);
      trackConversion('popup_view', { surface: 'exit_intent' });
    };

    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    return () => document.documentElement.removeEventListener('mouseleave', onMouseLeave);
  }, [pathname, canRunPromos]);

  const handleSlideInClose = () => {
    setSlideInVisible(false);
  };

  const handleBannerDismiss = () => {
    setBannerVisible(false);
  };

  if (isAdminRoute(pathname)) {
    return null;
  }

  return (
    <>
      {bannerVisible ? <ConversionStickyBanner onDismiss={handleBannerDismiss} /> : null}
      {slideInVisible && slideCopy ? (
        <ConversionSlideIn copy={slideCopy} onClose={handleSlideInClose} />
      ) : null}
      <ConversionExitIntentModal open={exitOpen} onOpenChange={setExitOpen} />
      <ChecklistEmailDialog
        open={checklistEmailOpen}
        summary={checklistEmailSummary}
        onOpenChange={(open) => {
          if (!open) closeChecklistEmailDialog();
        }}
      />
    </>
  );
}
