import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import ServiceVisualShowcase from '../components/ServiceVisualShowcase';
import { CountryFlag } from '../components/CountryFlags';
import { countries, globalRoadmapSteps } from '../data/countries';
import { services } from '../data/services';
import { useModal } from '../context/ModalContext';

export default function InternationalRegistration() {
  const { openModal } = useModal();
  const regService = services.find((s) => s.id === 'international-registration');

  return (
    <>
      <PageSEO
        title="International Registration Support | MAMI Career Consultant"
        description="Global healthcare registration guidance across UK, Ireland, UAE, Saudi Arabia, Oman, Qatar and GCC destinations."
      />
      <PageHero
        badge="UAE • Saudi Arabia • Qatar • Oman • UK • Ireland"
        title="International Registration Support"
        subtitle="Clear, structured registration guidance and documentation roadmaps for healthcare professionals relocating across the GCC and Europe."
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: 'International Registration' },
        ]}
      />

      {/* Global Career Roadmap */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-10">
          <ServiceVisualShowcase
            image={regService.image}
            alt="International Registration Support — UK, Ireland & Global Guidance"
          />
          <div>
            <SectionHeading
              title="Your Global Career Roadmap"
              subtitle="Four clear milestones from profile assessment to international healthcare registration."
            />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {globalRoadmapSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="card-mami rounded-2xl p-6"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-mami-gradient text-white font-extrabold text-sm mb-4">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-[#0B3566]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#60758A] mt-2 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Country Cards */}
      <section className="py-12 sm:py-16 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Destination Registration Guides"
            subtitle="Explore eligibility, regulatory authorities, and documentation by country."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {countries.map((country, idx) => (
              <motion.article
                id={country.id}
                key={country.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="card-mami rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CountryFlag code={country.code} className="w-12 h-12" />
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0B3566]">{country.name}</h3>
                      <p className="text-xs font-semibold text-[#0799A8]">
                        {country.authorities.join(' • ')}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#173B63]/90 leading-relaxed">{country.guidance}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="bg-[#F6FDFE] rounded-2xl p-4 border border-[#E0F5F8]">
                      <p className="text-xs font-bold text-[#007C91] mb-2">Eligibility</p>
                      <ul className="space-y-1.5">
                        {country.eligibility.map((e) => (
                          <li key={e} className="flex items-start gap-2 text-xs text-[#173B63]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0 mt-0.5" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#F6FDFE] rounded-2xl p-4 border border-[#E0F5F8]">
                      <p className="text-xs font-bold text-[#007C91] mb-2 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Key Documents
                      </p>
                      <ul className="space-y-1.5">
                        {country.documentation.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs text-[#173B63]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0799A8] shrink-0 mt-1.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAFBFD] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#60758A] font-medium">{country.pricingNote}</span>
                  <button
                    type="button"
                    onClick={() =>
                      openModal('service', {
                        serviceName: `${country.shortName} Registration Support`,
                        country: country.shortName,
                        title: `Register for ${country.name}`,
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mami-gradient text-white font-semibold text-xs sm:text-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Start {country.shortName} Process</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

