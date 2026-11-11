import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  Globe,
  Target,
  Headset,
  Zap,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import { getWhatsAppUrl } from '../data/siteConfig';
import recruitmentImg from '../assets/service-recruitment.jpg';

const targetPartners = [
  'Hospitals',
  'Clinics',
  'Healthcare Organizations',
  'Recruitment Companies',
  'Job Providers',
  'Medical Institutions',
  'Healthcare Employers',
];

const partnerBenefits = [
  {
    icon: Users,
    title: 'Qualified Healthcare Talent',
    description: 'Connect with healthcare professionals based on your exact clinical requirements.',
  },
  {
    icon: Globe,
    title: 'International Recruitment Support',
    description: 'Reach suitable candidates for India, UAE, GCC and international opportunities.',
  },
  {
    icon: Target,
    title: 'Requirement-Based Matching',
    description: 'Share your exact manpower requirements and receive relevant, vetted profiles.',
  },
  {
    icon: Headset,
    title: 'Professional Support',
    description: 'MAMI assists throughout the recruitment, licensing and candidate coordination process.',
  },
  {
    icon: Zap,
    title: 'Faster Hiring',
    description: 'Reduce the time required to identify suitable, license-ready healthcare professionals.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Partnership',
    description: 'Build a long-term institutional recruitment relationship with MAMI.',
  },
];

const hiringSteps = [
  { step: '01', title: 'Share Your Requirement', desc: 'Submit organization, manpower & role details.' },
  { step: '02', title: 'MAMI Reviews Your Requirement', desc: 'Clinical & licensing scope verified by our team.' },
  { step: '03', title: 'Suitable Professionals Identified', desc: 'Targeted sourcing from qualified healthcare pools.' },
  { step: '04', title: 'Profiles / Candidates Shared', desc: 'Shortlisted, pre-screened CVs delivered to you.' },
  { step: '05', title: 'Interview & Selection', desc: 'Coordinated interviews with your HR & clinical panel.' },
  { step: '06', title: 'Successful Hiring', desc: 'Smooth documentation, onboarding & placement closure.' },
];

export default function Collaborate() {
  return (
    <>
      <PageSEO
        title="Partner With MAMI | Healthcare Recruitment & Hiring Support"
        description="Collaborate with MAMI Career Consultant to hire qualified doctors, nurses, physiotherapists and allied healthcare professionals for hospitals and healthcare organizations."
      />

      {/* ==================== COLLABORATION HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DFF6FA] via-[#EAFBFD] to-[#FFFFFF] pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CFEFF3] text-[#007C91] text-xs font-bold shadow-2xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>Collaborate With MAMI • Employer Partnerships</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0B3566] leading-tight">
              Get the Right <span className="text-[#0799A8]">Healthcare Professionals</span> With MAMI
            </h1>

            <p className="text-base sm:text-lg font-bold text-[#007C91]">
              Hire Qualified Healthcare Professionals Through MAMI
            </p>

            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              Partner with MAMI Career Consultant to connect your organization with qualified doctors, nurses, physiotherapists and allied healthcare professionals across India, UAE, GCC and international healthcare markets.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/collaborate/requirement"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <span>Submit Your Requirement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={getWhatsAppUrl('Hello MAMI Career Consultant, our organization would like to collaborate with MAMI for healthcare hiring.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm hover:bg-[#EAFBFD] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#0799A8]" />
                <span>Talk to MAMI</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl overflow-hidden border-2 border-white shadow-2xl bg-white">
              <img
                src={recruitmentImg}
                alt="Healthcare HR & hospital leadership collaborating with MAMI Career Consultant"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== WHO WE PARTNER WITH ==================== */}
      <section className="py-8 bg-white border-b border-[#EAFBFD]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#0799A8]">
            Who We Partner With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {targetPartners.map((partner) => (
              <span
                key={partner}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EAFBFD] border border-[#CFEFF3] text-[#0B3566] text-xs sm:text-sm font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8]" />
                <span>{partner}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY PARTNER WITH MAMI ==================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Why Partner With MAMI?"
            subtitle="MAMI Career Consultant works with hospitals, healthcare organizations, recruiters and job providers to deliver verified healthcare talent."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {partnerBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.38, delay: idx * 0.05 }}
                  className="card-mami rounded-3xl p-6 sm:p-7 hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0B3566]">{item.title}</h3>
                  <p className="text-sm text-[#60758A] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 6-STEP HIRING COLLABORATION PROCESS ==================== */}
      <section className="py-12 sm:py-16 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeading
            title="Partner With MAMI for Your Healthcare Hiring Needs"
            subtitle="A structured, transparent six-step hiring workflow from manpower requirement submission to successful onboarding."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hiringSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.38, delay: idx * 0.06 }}
                className="card-mami rounded-2xl p-6 flex items-start gap-4"
              >
                <span className="w-11 h-11 rounded-2xl bg-mami-gradient text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  {s.step}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#0B3566]">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-[#60758A] mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative overflow-hidden bg-mami-gradient text-white py-10 sm:py-12">
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Hire Qualified Healthcare Talent?
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Share your hospital or organization’s hiring requirements and partner with MAMI today.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/collaborate/requirement"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#007C91] font-bold text-sm shadow-lg hover:bg-[#EAFBFD] transition-all"
            >
              <span>Submit Your Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppUrl('Hello MAMI Career Consultant, we want to discuss a healthcare hiring partnership.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to MAMI</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

