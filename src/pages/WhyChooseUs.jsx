import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Quote,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CertificationsSection from '../components/CertificationsSection';
import CTASection from '../components/CTASection';
import { founderProfile } from '../data/founderAndCertifications';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function WhyChooseUs() {
  const { openModal } = useModal();

  return (
    <>
      <PageSEO
        title="Why Choose MAMI Career Consultant | Meet Our Founder Dr. Ramyakrishna Mamidala"
        description="Meet Dr. Ramyakrishna Mamidala, Founder & Director of MAMI Career Consultant. UK HCPC & DHA Dubai licensed clinician trusted by healthcare professionals and hospitals worldwide."
      />

      <PageHero
        badge="Why Choose Us • Meet Our Founder"
        title="Trusted Leadership. Transparent Guidance. Global Healthcare Excellence."
        subtitle="Led by Dr. Ramyakrishna Mamidala — International Healthcare Professional, Senior Neuro Physiotherapist, and Healthcare Entrepreneur."
        breadcrumbs={[{ label: 'Why Choose Us' }]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openModal('counselling', { source: 'Why Choose Us Hero' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Book Career Counselling</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={getWhatsAppUrl('Hello MAMI Career Consultant, I would like to connect regarding international healthcare guidance or hospital hiring.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp MAMI</span>
          </a>
        </div>
      </PageHero>

      {/* ==================== MEET OUR FOUNDER ==================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#EAFBFD] via-white to-[#DFF6FA] border-2 border-[#CFEFF3] shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden bg-[#0B3566] border-2 border-white shadow-xl max-w-md mx-auto">
                <img
                  src={founderProfile.portrait}
                  alt={founderProfile.name}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 space-y-5"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#BFEBF0] text-[#007C91] text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meet Our Founder</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B3566]">
                  {founderProfile.name}
                </h2>
                <p className="text-base sm:text-lg font-bold text-[#0799A8] mt-1">
                  {founderProfile.role}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#60758A] mt-1.5">
                  {founderProfile.subtitles.join(' | ')}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#0B3566] mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0799A8]" />
                  <span>Professional Credentials &amp; Achievements</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {founderProfile.credentials.map((cred) => (
                    <div
                      key={cred}
                      className="flex items-start gap-2.5 bg-white/95 rounded-2xl p-3 border border-[#CFEFF3] shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] font-semibold text-[#0B3566]">
                        {cred}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== HER JOURNEY & WHY SHE STARTED MAMI ==================== */}
      <section className="py-12 sm:py-16 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.4 }}
            className="card-mami rounded-3xl p-6 sm:p-8 space-y-4"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-extrabold uppercase tracking-wide">
              12 Years in Healthcare
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3566]">
              Her Journey – From Healthcare Professional to Healthcare Entrepreneur
            </h2>
            <div className="space-y-3 text-sm sm:text-[15px] text-[#173B63]/90 leading-relaxed">
              {founderProfile.journey.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="card-mami rounded-3xl p-6 sm:p-8 space-y-4"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-extrabold uppercase tracking-wide">
              Purpose &amp; Empathy
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3566]">
              Why Did She Choose MAMI Career Consultant?
            </h2>
            <div className="space-y-3 text-sm sm:text-[15px] text-[#173B63]/90 leading-relaxed">
              {founderProfile.whyStartedMami.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 7 PILLARS: WHY CHOOSE MAMI CAREER CONSULTANT ==================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Why Choose MAMI Career Consultant?"
            subtitle="Seven pillars of clinical leadership, ethical transparency, and personalized guidance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {founderProfile.whyChoosePoints.map((point, idx) => (
              <motion.article
                key={point.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.25) }}
                className={`card-mami rounded-3xl p-6 sm:p-7 flex flex-col gap-3 ${
                  idx === founderProfile.whyChoosePoints.length - 1
                    ? 'md:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#EAFBFD]/80 via-white to-[#EAFBFD]/80'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-mami-gradient text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {point.number}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0B3566]">{point.title}</h3>
                </div>
                <p className="text-sm text-[#173B63]/90 leading-relaxed">{point.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED BY HOSPITALS & HEALTHCARE LEADERS ==================== */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#0B3566] via-[#045B6E] to-[#007C91] text-white relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#2ABCC2]/15 blur-2xl pointer-events-none"
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-[#EAFBFD] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>{founderProfile.hospitalTrust.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {founderProfile.hospitalTrust.title}
            </h2>
            <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
              {founderProfile.hospitalTrust.lead}
            </p>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {founderProfile.hospitalTrust.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {founderProfile.hospitalTrust.pillars.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 p-5 space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 text-[#7DE8F0] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MAMI – MORE THAN A CONSULTANCY + MISSION & VISION ==================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
          <div className="rounded-3xl bg-[#F6FDFE] border border-[#CFEFF3] p-6 sm:p-8 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">
              MAMI – <span className="text-[#0799A8]">More Than a Consultancy</span>
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              {founderProfile.moreThanConsultancy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-mami rounded-3xl p-6 sm:p-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-extrabold">
                OUR MISSION
              </span>
              <p className="text-sm sm:text-base text-[#173B63] leading-relaxed font-medium">
                {founderProfile.mission}
              </p>
            </div>
            <div className="card-mami rounded-3xl p-6 sm:p-8 space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-extrabold">
                OUR VISION
              </span>
              <p className="text-sm sm:text-base text-[#173B63] leading-relaxed font-medium">
                {founderProfile.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OUR CERTIFICATIONS ==================== */}
      <CertificationsSection />

      {/* ==================== A MESSAGE FROM OUR FOUNDER & BRAND PROMISE ==================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-gradient-to-br from-[#EAFBFD] via-white to-[#DFF6FA] border-2 border-[#CFEFF3] p-6 sm:p-10 shadow-lg relative"
          >
            <Quote className="w-10 h-10 text-[#0799A8]/30 mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566] mb-5">
              A Message from Our Founder
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#173B63] leading-relaxed italic">
              {founderProfile.founderMessage.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#CFEFF3]">
              <p className="text-sm text-[#60758A]">With gratitude and commitment,</p>
              <p className="text-lg font-extrabold text-[#0B3566] mt-1">{founderProfile.name}</p>
              <p className="text-xs sm:text-sm font-bold text-[#0799A8]">
                Founder &amp; Director • MAMI Career Consultant
              </p>
            </div>
          </motion.div>

          {/* Brand Promise Card */}
          <div className="rounded-3xl bg-mami-gradient text-white p-7 sm:p-10 text-center space-y-3 shadow-xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Our Brand Promise</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {founderProfile.brandPromise.brand}
            </h3>
            <p className="text-sm sm:text-base font-bold text-[#EAFBFD]">
              {founderProfile.brandPromise.tagline}
            </p>
            <p className="text-base sm:text-lg text-white/95 max-w-2xl mx-auto">
              {founderProfile.brandPromise.statement}
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

