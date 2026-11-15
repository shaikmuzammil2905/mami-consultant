import { motion } from 'framer-motion';
import {
  Stethoscope,
  Award,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { medicalAdvisors } from '../data/founderAndCertifications';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function MedicalLeadershipSection({ className = '' }) {
  const { openModal } = useModal();

  return (
    <section className={`py-12 sm:py-20 bg-gradient-to-b from-[#EAFBFD] via-[#F4FCFD] to-white overflow-hidden ${className}`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BFEBF0] shadow-xs text-[#007C91] text-xs font-black uppercase tracking-widest mb-3"
          >
            <Stethoscope className="w-4 h-4 text-[#0799A8]" />
            <span>MEDICAL ADVISORY &amp; SENIOR CONSULTANTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3566] tracking-tight leading-tight"
          >
            Senior Medical Career Consultants <br className="hidden sm:inline" />
            <span className="text-[#0799A8]">&amp; Professional Leadership</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-sm sm:text-base text-[#60758A] font-medium leading-relaxed"
          >
            Qualified MBBS practitioners guiding doctors, healthcare specialists, and allied clinical professionals through international medical career pathways and healthcare board licensing.
          </motion.p>
        </div>

        {/* 2-Column Responsive Doctors Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {medicalAdvisors.map((advisor, idx) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-3xl lg:rounded-[32px] bg-white border-2 border-[#CFEFF3] shadow-[0_20px_50px_-15px_rgba(7,153,168,0.15)] p-6 sm:p-8 flex flex-col justify-between hover:border-[#0799A8]/50 transition-all group"
            >
              <div className="space-y-6">
                {/* Doctor Portrait + Badges Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  {/* Photo Container */}
                  <div className="relative shrink-0">
                    <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-[#BFEBF0] shadow-md bg-white">
                      <img
                        src={advisor.image}
                        alt={advisor.displayName}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    {/* Qualification Badge */}
                    <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-[#0B3566] text-white text-[11px] font-black shadow-sm">
                      {advisor.degree} Qualified
                    </div>
                  </div>

                  {/* Doctor Title & Meta */}
                  <div className="text-center sm:text-left min-w-0 flex-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-[11px] font-black uppercase tracking-wider border border-[#CFEFF3] mb-1.5">
                      {advisor.badge}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-[#0B3566] tracking-tight">
                      {advisor.name}
                      <span className="text-sm font-bold text-[#0799A8] ml-1.5">({advisor.degree})</span>
                    </h3>

                    <p className="text-sm font-extrabold text-[#0799A8] mt-1">
                      {advisor.role}
                    </p>

                    <p className="text-xs font-semibold text-[#60758A] mt-0.5">
                      {advisor.subRole}
                    </p>

                    <p className="text-xs text-[#173B63]/85 leading-relaxed mt-3">
                      {advisor.description}
                    </p>
                  </div>
                </div>

                {/* Key Pillars / Highlights */}
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#007C91]">
                    Key Advisory &amp; Clinical Focus:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {advisor.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2 text-[#0B3566] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0 mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t border-[#EAFBFD] mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    openModal('counselling', {
                      source: advisor.displayName,
                      doctorName: advisor.displayName,
                    })
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] hover:from-[#007C91] hover:to-[#0B3566] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Advisory Session</span>
                </button>

                <a
                  href={getWhatsAppIndiaUrl(
                    `Hello MAMI Career Consultant, I would like to consult with ${advisor.displayName} regarding ${advisor.subRole}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all"
                  title="Connect via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp India</span>
                </a>

                <a
                  href={getWhatsAppUAEUrl(
                    `Hello MAMI Career Consultant UAE office, I would like to consult with ${advisor.displayName} regarding ${advisor.subRole}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shadow-md transition-all"
                  title="Connect via WhatsApp UAE"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp UAE</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
