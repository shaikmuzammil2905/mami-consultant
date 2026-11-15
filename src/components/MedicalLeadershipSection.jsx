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
  TrendingUp,
  Handshake,
  Users,
} from 'lucide-react';
import { medicalAdvisors, leadershipTeam } from '../data/founderAndCertifications';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function MedicalLeadershipSection({ className = '' }) {
  const { openModal } = useModal();
  const teamList = leadershipTeam || medicalAdvisors;

  return (
    <section className={`py-12 sm:py-20 bg-gradient-to-b from-[#EAFBFD] via-[#F4FCFD] to-white overflow-hidden ${className}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BFEBF0] shadow-xs text-[#007C91] text-xs font-black uppercase tracking-widest mb-3"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>EXECUTIVE LEADERSHIP &amp; MEDICAL ADVISORY TEAM</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3566] tracking-tight leading-tight"
          >
            Senior Medical Career Consultants <br className="hidden sm:inline" />
            <span className="text-[#0799A8]">&amp; Business Leadership</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-sm sm:text-base text-[#60758A] font-medium leading-relaxed"
          >
            Qualified MBBS practitioners and senior business leaders guiding doctors, healthcare specialists, and international hospital partners through global career pathways, licensing, and strategic healthcare collaborations.
          </motion.p>
        </div>

        {/* 3-Column Responsive Leadership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {teamList.map((member, idx) => {
            const isExecutive = member.category === 'executive' || !member.degree;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl lg:rounded-[32px] bg-white border-2 border-[#CFEFF3] shadow-[0_20px_50px_-15px_rgba(7,153,168,0.15)] p-5 sm:p-7 flex flex-col justify-between hover:border-[#0799A8]/60 transition-all hover:shadow-[0_25px_60px_-15px_rgba(7,153,168,0.22)] group"
              >
                <div className="space-y-5">
                  {/* Portrait Card */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#BFEBF0] shadow-md bg-slate-50">
                    <img
                      src={member.image}
                      alt={member.displayName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Subtle Gradient at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3566]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0B3566]/90 backdrop-blur-md text-white border border-white/20 shadow-md">
                      {isExecutive ? (
                        <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                      ) : (
                        <Stethoscope className="w-3.5 h-3.5 text-[#CFEFF3]" />
                      )}
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                        {member.badge}
                      </span>
                    </div>

                    {/* Bottom Floating Status Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0B3566] text-[11px] font-black shadow-md border border-[#CFEFF3]">
                        {isExecutive ? (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0799A8]" />
                            <span>Executive Leadership</span>
                          </>
                        ) : (
                          <>
                            <Award className="w-3.5 h-3.5 text-amber-600" />
                            <span>{member.degree} Qualified Doctor</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Member Meta */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0B3566] tracking-tight leading-snug">
                      {member.name}
                      {member.degree && (
                        <span className="text-sm font-bold text-[#0799A8] ml-1.5">
                          ({member.degree})
                        </span>
                      )}
                    </h3>

                    <p className="text-sm font-extrabold text-[#0799A8] mt-1 leading-snug">
                      {member.role}
                    </p>

                    <p className="text-xs font-semibold text-[#60758A] mt-0.5">
                      {member.subRole}
                    </p>

                    <p className="text-xs text-[#173B63]/85 leading-relaxed mt-3">
                      {member.description}
                    </p>
                  </div>

                  {/* Highlights / Focus Pillars */}
                  <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 space-y-2">
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#007C91]">
                      Key Strategic &amp; Advisory Focus:
                    </p>
                    <div className="space-y-1.5 text-xs">
                      {member.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2 text-[#0B3566] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0 mt-0.5" />
                          <span className="leading-tight text-[11px] sm:text-xs">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-5 border-t border-[#EAFBFD] mt-5 space-y-2.5">
                  {isExecutive ? (
                    <button
                      type="button"
                      onClick={() =>
                        openModal('collaborate', {
                          source: member.displayName,
                          title: 'Hospital & Business Collaboration',
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-[#0B3566] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Handshake className="w-4 h-4" />
                      <span>Partner &amp; Collaborate</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        openModal('counselling', {
                          source: member.displayName,
                          doctorName: member.displayName,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] hover:from-[#007C91] hover:to-[#0B3566] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Advisory Session</span>
                    </button>
                  )}

                  {/* Dual WhatsApp Buttons for India and UAE */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getWhatsAppIndiaUrl(
                        `Hello MAMI Career Consultant, I would like to connect regarding ${member.displayName} (${member.role}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] shadow-sm transition-all text-center"
                      title="WhatsApp India (+91 9154605599)"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span className="truncate">WA India</span>
                    </a>

                    <a
                      href={getWhatsAppUAEUrl(
                        `Hello MAMI Career Consultant UAE office, I would like to connect regarding ${member.displayName} (${member.role}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-[11px] shadow-sm transition-all text-center"
                      title="WhatsApp UAE (+971 569069289)"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span className="truncate">WA UAE</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
