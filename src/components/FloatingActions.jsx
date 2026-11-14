import { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false);

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

      {/* WhatsApp Dual Destination Popup Menu */}
      <AnimatePresence>
        {showWhatsAppMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl border border-[#CFEFF3] p-3 w-64 space-y-2 mb-1"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
              <span className="text-xs font-bold text-[#0B3566]">Chat with Our Advisors</span>
              <button
                type="button"
                onClick={() => setShowWhatsAppMenu(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* India WhatsApp */}
            <a
              href={getWhatsAppIndiaUrl(
                'Hello MAMI Career Consultant India office, I need assistance with healthcare licensing and exams.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-emerald-100 transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <span>India Helpline</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">IN</span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">{siteConfig.phoneIndia}</div>
              </div>
            </a>

            {/* UAE WhatsApp */}
            <a
              href={getWhatsAppUAEUrl(
                'Hello MAMI Career Consultant UAE office, I need assistance with Dubai DHA/MOH licensing and healthcare jobs.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-emerald-100 transition-colors group"
            >
              <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-current" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <span>UAE / Dubai Office</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">UAE</span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">{siteConfig.phoneUAE}</div>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Direct Phone Dial Button (India default) */}
      <a
        href={siteConfig.phoneIndiaHref}
        aria-label={`Call ${siteConfig.phoneIndia}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B3566] text-white shadow-lg flex items-center justify-center hover:bg-[#173B63] hover:scale-105 transition-all"
        title={`Call India Helpline: ${siteConfig.phoneIndia}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Floating CTA - Toggles quick menu with both WhatsApp numbers */}
      <button
        type="button"
        onClick={() => setShowWhatsAppMenu((prev) => !prev)}
        aria-label="Chat with MAMI on WhatsApp"
        className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        title="Chat on WhatsApp (India & UAE)"
      >
        <span className="hidden md:block absolute right-15 px-3 py-1.5 rounded-full bg-[#0B3566] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp Us (India & UAE)
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
}

