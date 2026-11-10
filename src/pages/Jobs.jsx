import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import { jobs } from '../data/jobs';
import { useModal } from '../context/ModalContext';

export default function Jobs() {
  const [professionFilter, setProfessionFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const { openModal } = useModal();

  const professions = ['All', 'Doctor', 'Nurse', 'Physiotherapist', 'Allied Healthcare'];
  const countryList = ['All', 'UAE', 'Saudi Arabia', 'Qatar', 'UK', 'Ireland'];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchProf = professionFilter === 'All' || job.profession === professionFilter;
      const matchCountry = countryFilter === 'All' || job.country === countryFilter;
      return matchProf && matchCountry;
    });
  }, [professionFilter, countryFilter]);

  return (
    <>
      <PageSEO
        title="International Healthcare Recruitment & Job Assistance | MAMI Career Consultant"
        description="Explore international healthcare job opportunities across UAE, Saudi Arabia, Qatar, UK and Ireland for doctors, nurses, physiotherapists and allied healthcare professionals."
      />
      <PageHero
        badge="Doctors • Nurses • Physiotherapists • Allied Health"
        title="International Healthcare Recruitment & Job Assistance"
        subtitle="Targeted career placement support including international CV preparation, interview assistance, and application coordination across UAE, GCC, UK, and Ireland."
        breadcrumbs={[{ label: 'Job Assistance' }]}
      >
        <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-semibold text-[#007C91]">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#CFEFF3]">
            <FileText className="w-4 h-4" /> International CV Preparation
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#CFEFF3]">
            <CheckCircle2 className="w-4 h-4" /> Interview Assistance
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#CFEFF3]">
            <Briefcase className="w-4 h-4" /> Application Support
          </span>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
          {/* Filters */}
          <div className="rounded-3xl bg-mami-soft-cyan border border-[#CFEFF3] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
              {countryList.map((c) => (
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

          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-[#CFEFF3] bg-[#F6FDFE]">
              <p className="text-base font-bold text-[#0B3566]">No openings match the selected filters.</p>
              <button
                type="button"
                onClick={() => {
                  setProfessionFilter('All');
                  setCountryFilter('All');
                }}
                className="mt-3 px-5 py-2 rounded-full bg-[#0799A8] text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => (
                <motion.article
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="card-mami rounded-3xl p-6 flex flex-col justify-between gap-5 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-bold">
                        {job.profession}
                      </span>
                      <span className="text-xs font-semibold text-[#60758A]">{job.authority}</span>
                    </div>

                    <h2 className="text-lg font-extrabold text-[#0B3566] leading-snug">{job.title}</h2>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#60758A]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0799A8]" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0799A8]" /> {job.experience}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#0799A8]" /> {job.employmentType}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#173B63]/85 leading-relaxed">
                      {job.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAFBFD] flex items-center gap-2.5">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-full border border-[#8AD7E0] text-[#0B3566] font-semibold text-xs hover:bg-[#EAFBFD] transition-colors"
                    >
                      View More
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        openModal('job', {
                          jobTitle: job.title,
                          country: job.country,
                          title: `Apply: ${job.title}`,
                        })
                      }
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-full bg-mami-gradient text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}

