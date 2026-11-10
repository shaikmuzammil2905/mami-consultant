import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { countries } from '../data/countries';
import { CountryFlag } from './CountryFlags';

export default function GlobalOpportunities() {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#EAFBFD] via-[#F2FCFD] to-[#D8F3F7] border border-[#CFEFF3] px-5 py-6 sm:px-8 sm:py-7 shadow-sm"
        >
          {/* Decorative World Map Silhouette SVG */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Map & Plane Motif */}
            <div className="relative flex items-center justify-center w-full lg:w-[230px] shrink-0">
              <svg
                viewBox="0 0 260 110"
                className="w-48 sm:w-56 h-auto text-[#4DBBC7]/55"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Stylized subtle world continents silhouette */}
                <path d="M26 24c8-6 22-5 30 3 6 6 2 15-4 20-7 5-15 3-20 9-4 5-2 15-9 18-7 3-13-7-12-14 1-11 6-29 15-36zm52 40c6-4 14 1 17 8 4 8 0 18-7 25-6 6-14 3-15-5-1-9-2-23 5-28zm40-44c16-8 38-6 52 4 8 6 14 17 10 26-5 10-18 12-27 18-8 5-10 18-19 20-10 2-18-8-18-17 0-9 5-16 2-24-3-8-10-21 0-27zm68 12c14-6 33-3 44 8 8 8 11 21 5 30-5 7-17 6-24 12-5 4-6 14-13 14-8 0-12-9-13-16-2-12-10-42 1-48zm48 48c7-3 15 1 17 8 2 6-3 13-10 14-7 1-13-5-13-11 0-5 2-9 6-11z" />
              </svg>
              <motion.div
                animate={{ x: [-4, 8, -4], y: [3, -5, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-4 sm:right-2 top-3 text-[#007C91]"
              >
                <Plane className="w-6 h-6 -rotate-12" />
              </motion.div>
            </div>

            {/* Center Headline */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#0B3566] leading-snug">
                Global Opportunities in
              </h2>
              <p className="text-base sm:text-xl font-extrabold text-[#0799A8] mt-0.5">
                UAE • GCC • UK • Ireland &amp; More
              </p>
              <p className="text-xs sm:text-sm text-[#60758A] mt-1">
                Explore international registration &amp; licensing pathways across top destinations.
              </p>
            </div>

            {/* Right Animated Country Flags */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 shrink-0">
              {countries.map((country, idx) => (
                <motion.div
                  key={country.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <Link
                    to={`/services/international-registration#${country.id}`}
                    title={`${country.name} — ${country.authorities[0]}`}
                    className="group relative flex flex-col items-center gap-1 p-1 rounded-2xl hover:bg-white/80 hover:-translate-y-1 transition-all"
                  >
                    <CountryFlag code={country.code} className="w-9 h-9 sm:w-10 sm:h-10" />
                    <span className="text-[11px] font-bold text-[#0B3566] group-hover:text-[#0799A8] whitespace-nowrap">
                      {country.shortName}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

