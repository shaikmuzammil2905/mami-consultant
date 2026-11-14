import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import ServiceCard from './ServiceCard';
import { services as defaultServices } from '../data/services';
import { useSiteContent } from '../context/ContentContext';

export default function ServiceGrid({ compact = true }) {
  const { services = defaultServices } = useSiteContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!compact || paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [compact, paused]);

  const activeService = services[activeIndex] || services[0];
  const ActiveIcon = activeService.icon;

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive Support for Your International Healthcare Career"
        />

        <div
          className={
            compact
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5 sm:gap-4'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
          }
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={idx}
              compact={compact}
              isActive={compact && idx === activeIndex}
              onPreview={compact ? setActiveIndex : undefined}
              className={
                compact && idx === services.length - 1
                  ? 'col-span-2 sm:col-span-1 xl:col-span-1'
                  : ''
              }
            />
          ))}
        </div>

        {/* Grand Interactive Visual Showcase for the 7 Services (Desktop + Mobile) */}
        {compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="mt-7 sm:mt-9 rounded-3xl bg-gradient-to-br from-[#EAFBFD] via-white to-[#DFF6FA] border-2 border-[#CFEFF3] shadow-[0_20px_50px_-15px_rgba(7,153,168,0.22)] p-3.5 sm:p-5 lg:p-6"
          >
            {/* Quick Pill Tabs on Mobile & Desktop */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shrink-0 shadow-xs">
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0799A8]">
                    Service Spotlight • 0{activeIndex + 1} / 0{services.length}
                  </p>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0B3566] truncate">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous Service Visual"
                  onClick={() =>
                    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CFEFF3] text-[#0B3566] hover:bg-[#0799A8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next Service Visual"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % services.length)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#CFEFF3] text-[#0B3566] hover:bg-[#0799A8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grand Full-Clarity Banner Frame */}
            <Link
              to={activeService.route}
              className="block relative rounded-2xl overflow-hidden bg-white border border-[#DDF3F6] shadow-sm group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-auto max-h-[460px] object-contain mx-auto block group-hover:scale-[1.01] transition-transform duration-500"
                />
              </AnimatePresence>
            </Link>

            {/* Bottom Controls + CTA */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                {services.map((srv, i) => (
                  <button
                    key={srv.id}
                    type="button"
                    aria-label={`Preview ${srv.title}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex
                        ? 'w-7 bg-[#0799A8]'
                        : 'w-2 bg-[#0799A8]/30 hover:bg-[#0799A8]/60'
                    }`}
                  />
                ))}
              </div>

              <Link
                to={activeService.route}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mami-gradient text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <span>Explore {activeService.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
