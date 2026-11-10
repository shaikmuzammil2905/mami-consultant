import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PageHero({ title, subtitle, breadcrumbs = [], badge, children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DFF6FA] via-[#EAFBFD] to-[#FFFFFF] pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Subtle decorative circles */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2ABCC2]/15 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-[#0799A8]/10 blur-2xl pointer-events-none"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#60758A] mb-4">
            <Link to="/" className="hover:text-[#0799A8] font-medium">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.label} className="inline-flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#0799A8]" />
                {crumb.to && idx !== breadcrumbs.length - 1 ? (
                  <Link to={crumb.to} className="hover:text-[#0799A8] font-medium">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0B3566] font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CFEFF3] text-[#007C91] text-xs font-semibold mb-3 shadow-xs">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B3566] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-[#173B63]/90 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

