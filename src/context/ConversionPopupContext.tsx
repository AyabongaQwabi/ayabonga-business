import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export const OPEN_QUOTE_EMAIL_EVENT = 'qwabi-open-quote-email';

type ConversionPopupContextValue = {
  checklistEmailOpen: boolean;
  checklistEmailSummary: string;
  openChecklistEmailDialog: (summary: string) => void;
  closeChecklistEmailDialog: () => void;
  requestQuoteEmailCapture: () => void;
};

const ConversionPopupContext = createContext<ConversionPopupContextValue | null>(
  null,
);

export function ConversionPopupProvider({ children }: { children: ReactNode }) {
  const [checklistEmailOpen, setChecklistEmailOpen] = useState(false);
  const [checklistEmailSummary, setChecklistEmailSummary] = useState('');

  const openChecklistEmailDialog = useCallback((summary: string) => {
    setChecklistEmailSummary(summary);
    setChecklistEmailOpen(true);
  }, []);

  const closeChecklistEmailDialog = useCallback(() => {
    setChecklistEmailOpen(false);
  }, []);

  const requestQuoteEmailCapture = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(OPEN_QUOTE_EMAIL_EVENT));
    }
  }, []);

  const value = useMemo(
    () => ({
      checklistEmailOpen,
      checklistEmailSummary,
      openChecklistEmailDialog,
      closeChecklistEmailDialog,
      requestQuoteEmailCapture,
    }),
    [
      checklistEmailOpen,
      checklistEmailSummary,
      openChecklistEmailDialog,
      closeChecklistEmailDialog,
      requestQuoteEmailCapture,
    ],
  );

  return (
    <ConversionPopupContext.Provider value={value}>
      {children}
    </ConversionPopupContext.Provider>
  );
}

export function useConversionPopup(): ConversionPopupContextValue {
  const ctx = useContext(ConversionPopupContext);
  if (!ctx) {
    throw new Error('useConversionPopup must be used within ConversionPopupProvider');
  }
  return ctx;
}

export function useConversionPopupOptional(): ConversionPopupContextValue | null {
  return useContext(ConversionPopupContext);
}
