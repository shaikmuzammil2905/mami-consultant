import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldPlus, CheckCircle2, Clock, MessageCircle, ArrowRight, FileCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import ServiceVisualShowcase from '../components/ServiceVisualShowcase';
import { licensingAuthorities, services } from '../data/services';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function Licensing() {
  const [selectedId, setSelectedId] = useState(licensingAuthorities[0].id);
  const { openModal } = useModal();
  const service = services.find((s) => s.id === 'healthcare-licensing');
  const selectedAuth = licensingAuthorities.find((a) => a.id === selectedId) || licensingAuthorities[0];

  return (
    <>
      <PageSEO
        title="Healthcare Licensing Services | MAMI Career Consultant"
        description="Complete licensing support for DHA Dubai, DOH/HAAD Abu Dhabi, MOH UAE, Saudi SCFHS, Oman Prometric, Qatar, UK and Ireland."
      />
      <PageHero
        badge="DHA • DOH • MOH • SCFHS • Prometric • UK • Ireland"
        title="Healthcare Licensing Services"
        subtitle="Structured licensing evaluation, DataFlow Primary Source Verification, exam scheduling, and eligibility letter support for medical and allied health professionals."
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: 'Healthcare Licensing' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              openModal('service', {
                serviceName: 'Healthcare Licensing Services',
                title: 'Start Your Healthcare Licensing Enquiry',
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Enquire for Licensing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={getWhatsAppUrl('Hello MAMI Career Consultant, I need assistance with healthcare licensing.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Specialist</span>
          </a>
        </div>
      </PageHero>

      {/* Licensing Authority Cards + Interactive Details Panel */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-10">
          <ServiceVisualShowcase
            image={service.image}
            alt="Healthcare Licensing Services — DHA, DOH, MOH, SCFHS & more"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {licensingAuthorities.map((auth, idx) => {
              const isSelected = auth.id === selectedId;
              return (
                <motion.button
                  key={auth.id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  onClick={() => setSelectedId(auth.id)}
                  className={`text-left rounded-2xl p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAFBFD] border-[#0799A8] shadow-md ring-2 ring-[#0799A8]/20'
                      : 'bg-white border-[#CFEFF3] hover:border-[#2ABCC2] hover:-translate-y-1 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center">
                      <ShieldPlus className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-white text-[#007C91] border border-[#CFEFF3]">
                      {auth.region}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-[#0B3566]">{auth.name}</h2>
                  <p className="text-xs text-[#60758A] mt-1.5 leading-relaxed">{auth.summary}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Licensing Authority Details */}
          <div className="rounded-3xl bg-mami-soft-cyan border border-[#CFEFF3] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0799A8]">
                Selected Authority Pathway
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B3566]">{selectedAuth.name}</h3>
              <p className="text-sm sm:text-base text-[#173B63]/90">{selectedAuth.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white rounded-2xl p-4 border border-[#CFEFF3]">
                  <p className="text-xs font-bold text-[#007C91] mb-1">Eligibility</p>
                  <p className="text-xs sm:text-sm text-[#173B63]">{selectedAuth.eligibility}</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#CFEFF3]">
                  <p className="text-xs font-bold text-[#007C91] mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Typical Timeline
                  </p>
                  <p className="text-xs sm:text-sm text-[#173B63]">{selectedAuth.timeline}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#CFEFF3] space-y-3">
              <p className="text-xs font-bold text-[#0B3566] uppercase">Pricing &amp; Packages</p>
              <p className="text-sm text-[#60758A]">{service.pricingNote}</p>
              <button
                type="button"
                onClick={() =>
                  openModal('service', {
                    serviceName: selectedAuth.name,
                    title: `Enquire: ${selectedAuth.name}`,
                  })
                }
                className="w-full py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for {selectedAuth.name.split('–')[0].trim()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Required Documents & Step Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-mami rounded-3xl p-6 sm:p-7">
              <h3 className="text-xl font-bold text-[#0B3566] mb-4">Our Licensing Process</h3>
              <ol className="space-y-3">
                {service.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#EAFBFD] text-[#007C91] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <span className="text-sm text-[#173B63]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="card-mami rounded-3xl p-6 sm:p-7">
              <h3 className="text-xl font-bold text-[#0B3566] mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0799A8]" />
                <span>Standard Required Documents</span>
              </h3>
              <ul className="space-y-2.5">
                {service.requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

