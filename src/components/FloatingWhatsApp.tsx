import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/site-config';

type FloatingWhatsAppProps = {
  label?: string;
};

export function FloatingWhatsApp({ label = 'Chat on WhatsApp' }: FloatingWhatsAppProps) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive-button fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-primary-foreground font-semibold text-sm border border-[#128C7E]/40 hover:bg-[#128C7E] hover:scale-[1.02] motion-reduce:hover:scale-100 focus-visible:ring-[#25D366]"
      aria-label={label}
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
