import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { countries } from '../data/countries';
import { CountryFlag } from './CountryFlags';
import globalBgImg from '../assets/global-opportunities-bg.png';

export default function GlobalOpportunities() {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#BFEBF0] shadow-[0_18px_46px_-14px_rgba(7,153,168,0.24)] bg-[#E7F7FD]"
        >
          {/* ==================== DESKTOP / TABLET VIEW (Grand Full-Bleed Background) ==================== */}
          <div className="hidden md:flex relative min-h-[215px] lg:min-h-[245px] items-center">
            <img
              src={globalBgImg}
              alt="Global healthcare opportunities across UAE, GCC, UK, Ireland and worldwide"
              className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none select-none"
            />
            {/* Soft readability sheen on right side only so left globe & landmarks stay crystal sharp */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EAFBFD]/65 to-[#E6F8FE]/90 pointer-events-none"
            />

            <motion.div
              aria-hidden="true"
              animate={{ x: [-6, 10, -6], y: [4, -5, 4] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 left-[27%] text-[#007C91]/55 pointer-events-none"
            >
              <Plane className="w-5 h-5 -rotate-12" />
            </motion.div>

            <div className="relative z-10 w-full grid grid-cols-12 items-center px-6 lg:px-8 py-6 gap-4">
              {/* Open Left Showcase Space for Globe, Airplane & Landmarks */}
              <div className="col-span-4 lg:col-span-4" aria-hidden="true" />

              {/* Headline + Flags on Bright Dotted World Map Area */}
              <div className="col-span-8 lg:col-span-8 flex flex-col xl:flex-row items-center justify-between gap-5 pl-2">
                <div className="text-center xl:text-left">
                  <h2 className="text-2xl lg:text-[27px] font-extrabold text-[#0B3566] leading-snug">
                    Global Opportunities in
                  </h2>
                  <p className="text-lg lg:text-xl font-extrabold text-[#0799A8] mt-0.5">
                    UAE • GCC • UK • Ireland &amp; More
                  </p>
                  <p className="text-xs lg:text-sm text-[#173B63]/85 mt-1 font-medium">
                    Explore international registration &amp; licensing pathways across top destinations.
                  </p>
                </div>

                {/* Circular Country Flags */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-2.5 lg:gap-3 shrink-0 bg-white/70 backdrop-blur-xs rounded-2xl px-3.5 py-2.5 border border-white/90 shadow-xs">
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
                        className="group relative flex flex-col items-center gap-1 p-1 rounded-xl hover:bg-white hover:-translate-y-1 transition-all"
                      >
                        <CountryFlag code={country.code} className="w-9 h-9 lg:w-10 lg:h-10" />
                        <span className="text-[11px] font-bold text-[#0B3566] group-hover:text-[#0799A8] whitespace-nowrap">
                          {country.shortName}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ==================== MOBILE VIEW (Grand Visual Header + Frosted Country Panel) ==================== */}
          <div className="block md:hidden">
            {/* Top Grand Visual Artwork */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={globalBgImg}
                alt="Global healthcare opportunities worldwide"
                className="w-full h-full object-cover object-left scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E5F7FD]"
              />
            </div>

            {/* Bottom Seamless Content & Flags */}
            <div className="relative z-10 -mt-5 px-4 pb-5 text-center space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0B3566] leading-snug">
                  Global Opportunities in
                </h2>
                <p className="text-[15px] font-extrabold text-[#0799A8] mt-0.5">
                  UAE • GCC • UK • Ireland &amp; More
                </p>
                <p className="text-xs text-[#173B63]/85 mt-1">
                  Explore international registration &amp; licensing pathways across top destinations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 bg-white/80 backdrop-blur-xs rounded-2xl p-3 border border-white shadow-xs">
                {countries.map((country) => (
                  <Link
                    key={country.id}
                    to={`/services/international-registration#${country.id}`}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-white transition-colors"
                  >
                    <CountryFlag code={country.code} className="w-9 h-9" />
                    <span className="text-[11px] font-bold text-[#0B3566] leading-tight">
                      {country.shortName}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
