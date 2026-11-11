import { motion } from 'framer-motion';
import { FileCheck, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

const timelineSteps = [
  { step: '01', title: 'Submit Details', desc: 'Share your qualifications, experience letters, and target country goals.' },
  { step: '02', title: 'Document Review', desc: 'Line-by-line accuracy audit to catch date mismatches or missing seals early.' },
  { step: '03', title: 'Verification', desc: 'DataFlow Primary Source Verification (PSV), attestation & Good Standing coordination.' },
  { step: '04', title: 'Application Support', desc: 'Clean compilation of licensing, registration, and international CV files.' },
  { step: '05', title: 'Submission', desc: 'Accurate regulatory portal upload across DHA, DOH, MOH, SCFHS, UK & Ireland.' },
  { step: '06', title: 'Follow-up', desc: 'Active tracking until verification clearance and eligibility approval.' },
];

const docCategories = [
  'Document Review & Error Audit',
  'DataFlow Primary Source Verification (PSV)',
  'Application Documentation & Portal Filing',
  'Professional Registration Documents',
  'International Healthcare CV Support',
  'Licensing Documents & Good Standing Guidance',
];

export default function Documentation() {
  const { openModal } = useModal();
  const service = services.find((s) => s.id === 'documentation');

  return (
    <>
      <PageSEO
        title="Documentation & Verification Support | MAMI Career Consultant"
        description="Error-free healthcare document review, DataFlow verification, application support, CV assistance and licensing documentation."
      />
      <PageHero
        badge="Accurate • Verified • Hassle-Free"
        title="Documentation & Verification Support"
        subtitle="Prevent costly rejections and delays with thorough document auditing, DataFlow PSV assistance, and professional registration file preparation."
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: 'Documentation & Verification' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              openModal('service', {
                serviceName: 'Documentation & Verification Support',
                title: 'Request Document Audit & Verification',
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md cursor-pointer"
          >
            <span>Start Document Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={getWhatsAppUrl('Hello MAMI Career Consultant, I need help with healthcare documentation & DataFlow verification.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Document Team</span>
          </a>
        </div>
      </PageHero>

      {/* What We Handle */}
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">
              Complete Documentation <span className="text-[#0799A8]">Accuracy</span>
            </h2>
            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              {service.detailedDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {docCategories.map((cat) => (
                <div
                  key={cat}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F6FDFE] border border-[#CFEFF3]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0B3566]">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#EAFBFD] to-white shadow-xl border-2 border-[#CFEFF3] p-2.5 sm:p-3">
              <img
                src={service.image}
                alt="Documentation & Verification Support — Complete Assistance"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Process Timeline */}
      <section className="py-12 sm:py-16 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Verification Process Timeline"
            subtitle="Transparent six-stage tracking from initial submission to final clearance."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {timelineSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-mami rounded-2xl p-6 relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-full bg-mami-gradient text-white font-extrabold text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                  <FileCheck className="w-5 h-5 text-[#2ABCC2]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B3566]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#60758A] mt-1.5 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-[#60758A] mb-3">{service.pricingNote}</p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

