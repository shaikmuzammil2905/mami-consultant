import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, Building2, ArrowRight, Users } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function CareersPartnershipsSection() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeading
          title="Careers & Partnerships"
          subtitle="Whether you are advancing your global healthcare career or hiring verified clinicians for your hospital, MAMI connects talent with opportunity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Career Seekers */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.45 }}
            className="card-mami rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#EAFBFD] via-white to-[#F6FDFE] flex flex-col justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shadow-xs">
                <BriefcaseBusiness className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3566]">
                Find Your Next Career Opportunity
              </h3>
              <p className="text-sm sm:text-[15px] text-[#173B63]/90 leading-relaxed">
                For doctors, nurses, physiotherapists and allied healthcare professionals seeking opportunities in India, UAE, GCC, UK, and Ireland.
              </p>
            </div>

            <div>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <span>Apply for a Job</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Hospitals & Employers */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0B3566] via-[#045B6E] to-[#007C91] text-white shadow-xl flex flex-col justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 text-[#EAFBFD] flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Hire Through MAMI
              </h3>
              <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed">
                For hospitals, healthcare organizations and job providers looking for qualified, license-ready healthcare professionals.
              </p>
            </div>

            <div>
              <Link
                to="/collaborate"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#007C91] font-bold text-sm shadow-md hover:bg-[#EAFBFD] hover:-translate-y-0.5 transition-all group"
              >
                <span>Collaborate With MAMI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hiring Banner CTA near Job Assistance */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-[#EAFBFD] border border-[#BFEBF0] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base font-extrabold text-[#0B3566]">
              Are You Hiring Healthcare Professionals?
            </p>
          </div>
          <Link
            to="/collaborate"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-bold text-xs sm:text-sm hover:bg-[#0799A8] hover:text-white hover:border-[#0799A8] transition-all shrink-0 group"
          >
            <span>Partner With MAMI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

