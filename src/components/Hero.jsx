import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { useSiteContent } from '../context/ContentContext';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { openModal } = useModal();
  const prefersReducedMotion = useReducedMotion();
  const { sections } = useSiteContent();
  const heroDb = sections?.hero;

  const slides = useMemo(() => {
    const base = siteConfig.heroSlides;
    if (!heroDb) return base;
    return base.map((slide, idx) => {
      if (idx === 0) {
        return {
          ...slide,
          badge: heroDb.badge || slide.badge,
          headingHighlight: heroDb.title ? heroDb.title.split(' ')[0] + ' ' : slide.headingHighlight,
          headingStart: '',
          headingEnd: heroDb.title ? heroDb.title.split(' ').slice(1).join(' ') : slide.headingEnd,
          tagline: heroDb.subtitle || slide.tagline,
          description: heroDb.description || slide.description,
          primaryCta: {
            label: heroDb.cta_primary_text || slide.primaryCta.label,
            to: heroDb.cta_primary_link || slide.primaryCta.to,
          },
          secondaryCta: heroDb.cta_secondary_text
            ? { label: heroDb.cta_secondary_text, to: heroDb.cta_secondary_link || '/why-choose-us' }
            : slide.secondaryCta,
        };
      }
      return slide;
    });
  }, [heroDb]);

  const current = slides[activeSlide] || slides[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSecondary = (cta) => {
    if (cta.action === 'enquiry') {
      openModal('enquiry', { source: 'Hero Banner' });
    } else if (cta.action === 'counselling') {
      openModal('counselling', { source: 'Hero Banner' });
    }
  };

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#DFF6FA] via-[#EAFBFD] to-[#FFFFFF]"
    >
      {/* ==================== DESKTOP VIEW HERO BACKGROUND (image copy 2.png fixed & animated ONLY on desktop) ==================== */}
      <div className="hidden md:block relative min-h-[540px] lg:min-h-[600px] xl:min-h-[650px] flex items-center">
        {/* Animated Desktop Hero Image (image copy 2.png as-is) */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
          initial={prefersReducedMotion ? false : { scale: 1.03, opacity: 0.92 }}
          animate={
            prefersReducedMotion
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [1.02, 1.045, 1.02],
                  opacity: 1,
                }
          }
          transition={{
            scale: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.7 },
          }}
        >
          <img
            src={heroDb?.image_url || siteConfig.heroImages.desktopPrimary}
            alt="MAMI Career Consultant international healthcare team"
            className="w-full h-full object-cover object-right-bottom"
          />
          {/* Subtle readable left sky feather without altering right team */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E6F8FB]/75 via-[#E6F8FB]/25 to-transparent" />
        </motion.div>

        {/* Subtle Desktop Floating Plane & World Map Particles */}
        {!prefersReducedMotion && (
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [-15, 25, -15], y: [8, -10, 8] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 right-[18%] text-[#0799A8]/35"
            >
              <Plane className="w-6 h-6 -rotate-12" />
            </motion.div>
            <motion.span
              animate={{ y: [-6, 8, -6], opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 left-[44%] w-2.5 h-2.5 rounded-full bg-[#2ABCC2]/45"
            />
            <motion.span
              animate={{ y: [6, -8, 6], opacity: [0.25, 0.65, 0.25] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-32 left-[40%] w-2 h-2 rounded-full bg-[#0799A8]/40"
            />
          </div>
        )}

        {/* Desktop Left Content */}
        <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 py-16 lg:py-20">
          <div className="max-w-[540px] lg:max-w-[590px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-[#BFEBF0] text-[#007C91] text-xs font-semibold tracking-wide mb-4 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0799A8] animate-pulse" />
                  {current.badge}
                </span>

                <h1 className="text-4xl lg:text-[52px] xl:text-[56px] font-extrabold leading-[1.1] tracking-tight text-[#0B3566]">
                  {current.headingStart}
                  <span className="text-[#0799A8]">{current.headingHighlight}</span>
                  {current.headingEnd}
                </h1>

                <p className="mt-4 text-[15px] lg:text-base font-bold text-[#0B3566]">
                  {current.tagline}
                </p>

                <p className="mt-3 text-base lg:text-[17px] text-[#173B63]/90 leading-relaxed max-w-lg">
                  {current.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    to={current.primaryCta.to}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-sm lg:text-[15px] shadow-lg shadow-[#0799A8]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                  >
                    <span>{current.primaryCta.label}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {current.secondaryCta.to ? (
                    <Link
                      to={current.secondaryCta.to}
                      className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/95 border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm lg:text-[15px] hover:bg-[#EAFBFD] hover:border-[#0799A8] hover:-translate-y-0.5 transition-all shadow-sm"
                    >
                      {current.secondaryCta.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSecondary(current.secondaryCta)}
                      className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/95 border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm lg:text-[15px] hover:bg-[#EAFBFD] hover:border-[#0799A8] hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer"
                    >
                      {current.secondaryCta.label}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Slide Indicators */}
            <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeSlide}
                  aria-label={`Slide ${idx + 1}: ${slide.headingHighlight}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeSlide
                      ? 'w-7 bg-[#0799A8]'
                      : 'w-2 bg-[#0799A8]/30 hover:bg-[#0799A8]/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE VIEW HERO (image copy 3.png animated ONLY on mobile view) ==================== */}
      <div
        className="block md:hidden relative pt-5 pb-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 88% 36%, rgba(126, 224, 252, 0.52) 0%, transparent 52%), radial-gradient(circle at 20% 25%, rgba(242, 250, 253, 0.8) 0%, transparent 60%), linear-gradient(155deg, #D5F3FE 0%, #C7EFFD 55%, #B8EBFE 100%)',
        }}
      >
        <div className="relative z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#BFEBF0] text-[#007C91] text-[11px] font-semibold mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0799A8]" />
                {current.badge}
              </span>

              <h1 className="text-[32px] leading-[1.12] font-extrabold tracking-tight text-[#0B3566]">
                {current.headingStart}
                <span className="text-[#0799A8]">{current.headingHighlight}</span>
                {current.headingEnd}
              </h1>

              <p className="mt-2.5 text-[13px] font-bold text-[#0B3566]">
                {current.tagline}
              </p>

              <p className="mt-1.5 text-[13.5px] text-[#173B63]/90 leading-snug">
                {current.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <Link
                  to={current.primaryCta.to}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-xs shadow-md"
                >
                  <span>{current.primaryCta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {current.secondaryCta.to ? (
                  <Link
                    to={current.secondaryCta.to}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white border border-[#8AD7E0] text-[#0B3566] font-semibold text-xs shadow-xs"
                  >
                    {current.secondaryCta.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSecondary(current.secondaryCta)}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white border border-[#8AD7E0] text-[#0B3566] font-semibold text-xs shadow-xs cursor-pointer"
                  >
                    {current.secondaryCta.label}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Slide Dots */}
          <div className="mt-3.5 flex items-center gap-1.5">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Mobile Slide ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide ? 'w-6 bg-[#0799A8]' : 'w-1.5 bg-[#0799A8]/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Mobile Hero Visual (image copy 3.png) */}
        <motion.div
          className="relative -mt-5 w-full overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 14%, black 28%, black 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.65) 14%, black 28%, black 100%)',
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0, scale: [1, 1.025, 1] }
          }
          transition={{
            opacity: { duration: 0.6 },
            y: { duration: 0.6 },
            scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <img
            src={heroDb?.extra_data?.mobile_image_url || heroDb?.background_url || siteConfig.heroImages.mobilePrimary}
            alt="MAMI international healthcare professionals"
            className="w-full h-auto block object-cover"
          />
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              animate={{ x: [-10, 14, -10], y: [4, -6, 4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 right-8 text-[#0799A8]/45 pointer-events-none"
            >
              <Plane className="w-5 h-5 -rotate-12" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Curved Wave Transition connecting Hero to Services Section */}
      <div className="relative w-full -mt-6 sm:-mt-10 z-20 pointer-events-none leading-none">
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-12 md:h-14 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 36C240 72 480 72 720 44C960 16 1200 0 1440 28V72H0V36Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}

