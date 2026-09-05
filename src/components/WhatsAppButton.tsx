import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const WhatsAppButton: React.FC = () => {
  const number = SITE_CONFIG.whatsappNumber;
  if (!number) return null;

  const message = encodeURIComponent(SITE_CONFIG.whatsappMessage);
  const whatsappUrl = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kanha Bazaar on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
      id="floating-whatsapp-btn"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline-block text-xs font-bold tracking-wide">
        WhatsApp Help
      </span>
    </a>
  );
};
