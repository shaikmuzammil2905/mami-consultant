import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Briefcase, CheckCircle2, Globe } from 'lucide-react';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import JobCard from '../components/JobCard';
import { jobs, jobCategories } from '../data/jobs';
import { getWhatsAppUrl, siteConfig } from '../data/siteConfig';

export default function Career() {
  const [professionFilter, setProfessionFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  const professions = ['All', ...jobCategories];
  const countries = ['All', 'India', 'UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'UK', 'Ireland'];

  // Only active/closed public jobs (never drafts)
  const visibleJobs = useMemo(() => {
    return jobs
      .filter((j) => j.status !== 'draft')
      .filter((j) => {
        const matchProf = professionFilter === 'All' || j.profession === professionFilter;
        const matchCountry = countryFilter === 'All' || j.country === countryFilter;
        return matchProf && matchCountry;
      });
  }, [professionFilter, countryFilter]);

  const scrollToOpenings = () => {
    document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageSEO
        title="MAMI Careers | Healthcare Jobs & International Career Opportunities"
        description="Explore career opportunities and connect with MAMI Career Consultant for professional healthcare job opportunities in India, UAE, GCC and international markets."
      />

      {/* ==================== CAREER PAGE HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DFF6FA] via-[#EAFBFD] to-[#FFFFFF] pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#CFEFF3] text-[#007C91] text-xs font-bold shadow-2xs">
              <Briefcase className="w-3.5 h-3.5" />
              <span>India • UAE • GCC • UK • Ireland</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B3566] leading-tight">
              Build Your <span className="text-[#0799A8]">Career</span> With MAMI
            </h1>

            <p className="text-base sm:text-lg font-bold text-[#007C91]">
              Take the next step toward the right healthcare career opportunity.
            </p>

            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              Explore career opportunities and connect with MAMI Career Consultant for professional healthcare job opportunities in India, UAE, GCC and international markets. We connect qualified healthcare professionals with suitable roles while providing guidance throughout the application process.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/career/apply"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <span>Apply for a Job</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={scrollToOpenings}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm hover:bg-[#EAFBFD] transition-all cursor-pointer"
              >
                <span>View Job Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#173B63]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0799A8]" /> Verified Healthcare Openings
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0799A8]" /> Easy Online Application
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#0799A8]" /> Global Career Support
              </span>
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
                src={siteConfig.heroImages.mobilePrimary}
                alt="Doctors, nurses and allied healthcare professionals pursuing global careers with MAMI"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CURRENT JOB OPPORTUNITIES ==================== */}
      <section id="openings" className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeading
            title="Current Job Opportunities"
            subtitle="Discover active roles across Doctors, Nurses, Physiotherapists, Allied Healthcare Professionals, Hospital Staff & Healthcare Administration."
          />

          {/* Filters */}
          <div className="rounded-3xl bg-mami-soft-cyan border border-[#CFEFF3] p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#0B3566] mr-1">Profession:</span>
              {professions.map((prof) => (
                <button
                  key={prof}
                  type="button"
                  onClick={() => setProfessionFilter(prof)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    professionFilter === prof
                      ? 'bg-[#0799A8] text-white shadow-xs'
                      : 'bg-white text-[#173B63] border border-[#CFEFF3] hover:bg-[#EAFBFD]'
                  }`}
                >
                  {prof}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#0B3566] mr-1">Destination:</span>
              {countries.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCountryFilter(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    countryFilter === c
                      ? 'bg-[#0B3566] text-white shadow-xs'
                      : 'bg-white text-[#173B63] border border-[#CFEFF3] hover:bg-[#EAFBFD]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Job Grid or Empty State */}
          {visibleJobs.length === 0 ? (
            <div className="rounded-3xl bg-[#F6FDFE] border border-[#CFEFF3] p-10 text-center space-y-4 max-w-xl mx-auto">
              <h3 className="text-2xl font-extrabold text-[#0B3566]">No Current Openings</h3>
              <p className="text-sm text-[#60758A]">
                We are always interested in connecting with talented healthcare professionals. Submit your profile and our team will reach out when matching opportunities arise.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Link
                  to="/career/apply"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md"
                >
                  <span>Submit Your Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {(professionFilter !== 'All' || countryFilter !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfessionFilter('All');
                      setCountryFilter('All');
                    }}
                    className="px-5 py-3 rounded-full border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm hover:bg-[#EAFBFD] cursor-pointer"
                  >
                    View All Jobs
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleJobs.map((job, idx) => (
                <JobCard key={job.id} job={job} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== BOTTOM CTA ==================== */}
      <section className="relative overflow-hidden bg-mami-gradient text-white py-10 sm:py-12">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
        />
        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Next Career Opportunity Could Start Here
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Submit your profile to MAMI and let our team help you explore suitable healthcare career opportunities.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/career/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#007C91] font-bold text-sm shadow-lg hover:bg-[#EAFBFD] transition-all"
            >
              <span>Apply for a Job</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getWhatsAppUrl('Hello MAMI Career Consultant, I would like to submit my profile for healthcare job opportunities.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-semibold text-sm hover:bg-white/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp MAMI</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

