import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

export default function SplashScreen({ isVisible, onFinish }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible) return;
    const duration = prefersReducedMotion ? 350 : 1450;
    const timer = setTimeout(() => {
      onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, onFinish, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="mami-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, #FFFFFF 0%, #EAFBFD 48%, #CBEFFD 100%)',
          }}
          role="status"
          aria-label="Loading MAMI Career Consultant"
        >
          {/* Subtle decorative pulsing rings */}
          {!prefersReducedMotion && (
            <>
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0.85, opacity: 0.5 }}
                animate={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-[#2ABCC2]/40 pointer-events-none"
              />
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0.75, opacity: 0.4 }}
                animate={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.35, repeat: Infinity, ease: 'easeOut' }}
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#0799A8]/35 pointer-events-none"
              />
            </>
          )}

          {/* MAMI Transparent Logo */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <img
              src={siteConfig.logo}
              alt="MAMI Career Consultant & Physio Care"
              className="h-20 sm:h-28 w-auto object-contain drop-shadow-sm"
            />

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-4 text-xs sm:text-sm font-bold tracking-wide text-[#0B3566] max-w-sm"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* Smooth Teal Loading Progress Bar */}
            <div className="mt-5 w-44 sm:w-52 h-1.5 rounded-full bg-[#CFEFF3] overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: prefersReducedMotion ? 0.3 : 1.25, ease: 'easeInOut' }}
                className="h-full rounded-full bg-gradient-to-r from-[#007C91] via-[#0799A8] to-[#2ABCC2]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

