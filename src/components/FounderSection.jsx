import { motion } from 'framer-motion';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  Building2,
  MessageCircle,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { founderProfile } from '../data/founderAndCertifications';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function FounderSection({ showExtendedBio = true, className = '' }) {
  const { openModal } = useModal();

  const whatsappMessage = encodeURIComponent(
    'Hello Dr. Ramyakrishna & MAMI Career Consultant team, I would like to schedule a career counselling consultation regarding international healthcare licensing and jobs.'
  );

  return (
    <section className={`py-12 sm:py-20 bg-gradient-to-b from-white via-[#F4FCFD] to-[#EAFBFD] overflow-hidden ${className}`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Pre-heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BFEBF0] shadow-xs text-[#007C91] text-xs font-black uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>LEADERSHIP &amp; CLINICAL EXCELLENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3566] tracking-tight leading-tight"
          >
            Meet Our <span className="text-[#0799A8]">Founder &amp; Director</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-sm sm:text-base text-[#60758A] font-medium leading-relaxed"
          >
            Guided by an internationally licensed healthcare clinician with active practice credentials in the United Kingdom and Dubai, United Arab Emirates.
          </motion.p>
        </div>

        {/* Grand Showcase Card */}
        <div className="relative rounded-3xl lg:rounded-[36px] bg-white border-2 border-[#CFEFF3] shadow-[0_25px_70px_-15px_rgba(7,153,168,0.18)] p-6 sm:p-10 lg:p-12">
          {/* Subtle Ambient Decorative Gradient Halos */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#0799A8]/10 via-[#2ABCC2]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0B3566]/10 via-[#0799A8]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ================= LEFT: PORTRAIT & LIVE BADGES ================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 flex flex-col items-center"
            >
              {/* Outer Golden/Cyan Aura Frame */}
              <div className="relative w-full max-w-md">
                {/* Glow Ring Behind Portrait */}
                <div className="absolute -inset-2.5 rounded-[32px] bg-gradient-to-tr from-[#0799A8] via-[#2DD4BF] to-[#0B3566] opacity-30 blur-md group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt" />

                {/* Main Portrait Container */}
                <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#EAFBFD] to-white border-4 border-white shadow-2xl">
                  {/* Real Clinic Desk Photo of Dr. Ramyakrishna */}
                  <img
                    src={founderProfile.portrait}
                    alt="Dr. Ramyakrishna Mamidala - Founder and Director of MAMI Career Consultant"
                    className="w-full aspect-[3/4] sm:aspect-[4/5] object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Gradient Overlay at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3566]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Pill on Image: Founder & Director */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B3566]/90 backdrop-blur-md text-white border border-white/20 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="text-[11px] font-black tracking-wide uppercase">
                      Founder &amp; Director
                    </span>
                  </div>

                  {/* Floating Pill on Image: Clinical Experience */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700/90 backdrop-blur-md text-white border border-white/20 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                    <span className="text-[11px] font-bold tracking-wide">
                      12+ Yrs Experience
                    </span>
                  </div>

                  {/* Bottom Image Overlay Card */}
                  <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-[#0B3566]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-black tracking-tight text-[#0B3566]">
                          Dr. Ramyakrishna
                        </p>
                        <p className="text-xs font-bold text-[#0799A8]">
                          Senior Neuro Physiotherapist
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-lg" title="UK and UAE Registered">
                        <span role="img" aria-label="United Kingdom">🇬🇧</span>
                        <span role="img" aria-label="United Arab Emirates">🇦🇪</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dual Verified License Strip below Portrait */}
              <div className="w-full max-w-md mt-4 grid grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#F0FCFD] border border-[#BFEBF0] shadow-2xs">
                  <span className="text-lg">🇬🇧</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-[#0B3566] truncate">HCPC (UK)</p>
                    <p className="text-[10px] font-bold text-emerald-700">Verified Registered</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#F0FCFD] border border-[#BFEBF0] shadow-2xs">
                  <span className="text-lg">🇦🇪</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-[#0B3566] truncate">DHA (Dubai)</p>
                    <p className="text-[10px] font-bold text-emerald-700">Verified Licensed</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT: EXECUTIVE CONTENT & CREDENTIALS ================= */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Grand Name & Primary Role */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-black uppercase tracking-wider border border-[#CFEFF3]">
                    Healthcare Clinician &amp; Entrepreneur
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    UK Gold Medalist
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3566] tracking-tight">
                  Dr. Ramyakrishna Mamidala
                </h3>

                <p className="text-base sm:text-lg font-extrabold text-[#0799A8] mt-1 flex flex-wrap items-center gap-x-2">
                  <span>Founder and Director</span>
                  <span className="text-gray-300">•</span>
                  <span>Senior Neuro Physiotherapist</span>
                </p>

                <p className="text-xs sm:text-sm font-semibold text-[#60758A] mt-2">
                  International Healthcare Professional • Healthcare Entrepreneur • Global Career Mentor
                </p>
              </div>

              {/* DUAL GRAND LICENSURE FEATURE BOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. HCPC UK Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF8FA] border-2 border-[#BFEBF0] shadow-sm hover:border-[#0799A8] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🇬🇧</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      UK Registered
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-[#0B3566] group-hover:text-[#0799A8] transition-colors">
                    HCPC (UK) Registered
                  </h4>
                  <p className="text-xs font-semibold text-[#60758A] mt-0.5">
                    Health and Care Professions Council – United Kingdom
                  </p>
                  <p className="text-[11px] text-[#173B63]/80 mt-2 leading-relaxed">
                    Legally registered clinician authorized to practice across the UK National Health Service (NHS) &amp; private medical establishments.
                  </p>
                </div>

                {/* 2. DHA Dubai Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF8FA] border-2 border-[#BFEBF0] shadow-sm hover:border-[#0799A8] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🇦🇪</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Dubai Licensed
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-[#0B3566] group-hover:text-[#0799A8] transition-colors">
                    DHA (Dubai) Registered
                  </h4>
                  <p className="text-xs font-semibold text-[#60758A] mt-0.5">
                    Dubai Health Authority – United Arab Emirates
                  </p>
                  <p className="text-[11px] text-[#173B63]/80 mt-2 leading-relaxed">
                    Licensed Senior Physiotherapist and advisory partner trusted by leading hospitals, clinical groups, and healthcare facilities across Dubai.
                  </p>
                </div>
              </div>

              {/* Extended Founder's Vision Statement */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#CFEFF3] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#007C91]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Founder's Mission &amp; Purpose</span>
                </div>
                <p className="text-xs sm:text-sm text-[#173B63] font-medium leading-relaxed italic">
                  “As an active clinician who navigated the UK and Dubai licensing systems firsthand, I built MAMI Career Consultant to ensure no doctor, nurse, or physiotherapist is ever misled by incomplete guidance or empty promises. Behind every degree is years of sacrifice, and we protect that with total transparency.”
                </p>
              </div>

              {/* Key Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  '12+ Years Clinical & Global Healthcare Experience',
                  'UK Gold Medalist & Healthcare Excellence Awardee (Dubai)',
                  'Direct Confidence with Hospital & Clinic Decision-Makers',
                  '100% Genuine Prometric, Dataflow & Licensure Guidance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#0B3566] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Executive Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => openModal('counselling', { source: 'Founder Section', doctorName: 'Dr. Ramyakrishna' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] hover:from-[#007C91] hover:to-[#0B3566] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Founder</span>
                </button>

                <a
                  href={getWhatsAppIndiaUrl(
                    'Hello Dr. Ramyakrishna Mamidala, I saw your profile on MAMI Career Consultant and would like direct career guidance for international healthcare licensing.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp India</span>
                </a>

                <a
                  href={getWhatsAppUAEUrl(
                    'Hello Dr. Ramyakrishna Mamidala, I would like guidance regarding Dubai DHA healthcare licensing and career placement in UAE.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp UAE</span>
                </a>

                <Link
                  to="/why-choose-us"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold text-[#007C91] hover:text-[#0B3566] hover:bg-[#EAFBFD] transition-colors"
                >
                  <span>Full Biography &amp; Awards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
