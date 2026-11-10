import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 360);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#CFEFF3] text-[#007C91] shadow-lg flex items-center justify-center hover:bg-[#EAFBFD] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Call Dialer Button */}
      <a
        href={siteConfig.phoneHref}
        aria-label={`Call ${siteConfig.phone}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B3566] text-white shadow-lg flex items-center justify-center hover:bg-[#173B63] hover:scale-105 transition-all"
        title={`Call ${siteConfig.phone}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Floating CTA */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MAMI on WhatsApp"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        title="Chat on WhatsApp"
      >
        <span className="hidden md:block absolute right-15 px-3 py-1.5 rounded-full bg-[#0B3566] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp Us
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

