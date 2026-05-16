import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

type FaqAccordionItemProps = {
  question: string;
  answer: string;
};

/** Accessible FAQ row with height animation (grid) and chevron rotation. */
export function FaqAccordionItem({ question, answer }: FaqAccordionItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <p
            id={panelId}
            role="region"
            aria-labelledby={`${panelId}-trigger`}
            className="px-5 pb-4 text-muted-foreground leading-relaxed"
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
