import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle2, FileText, Building2, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import JobCard from '../components/JobCard';
import { jobs as defaultJobs, jobCategories } from '../data/jobs';
import { useSiteContent } from '../context/ContentContext';

export default function Jobs() {
  const { jobs = defaultJobs } = useSiteContent();
  const [professionFilter, setProfessionFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  const professions = ['All', ...jobCategories];
  const countryList = ['All', 'India', 'UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'UK', 'Ireland'];

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((j) => j.status !== 'draft')
      .filter((job) => {
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
        subtitle="Targeted career placement support including international CV preparation, interview assistance, and application coordination across India, UAE, GCC, UK, and Ireland."
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
          {/* Hiring Partnership Callout */}
          <div className="rounded-2xl bg-[#EAFBFD] border border-[#BFEBF0] px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#0799A8] shrink-0" />
              <p className="text-sm font-bold text-[#0B3566]">
                Are You Hiring Healthcare Professionals?
              </p>
            </div>
            <Link
              to="/collaborate"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-mami-gradient text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all"
            >
              <span>Partner With MAMI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

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
            <div className="text-center py-12 rounded-3xl border border-[#CFEFF3] bg-[#F6FDFE] space-y-3">
              <p className="text-base font-bold text-[#0B3566]">No openings match the selected filters.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setProfessionFilter('All');
                    setCountryFilter('All');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#0799A8] text-white text-xs font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
                <Link
                  to="/career/apply"
                  className="px-5 py-2.5 rounded-full border border-[#8AD7E0] text-[#0B3566] text-xs font-semibold hover:bg-[#EAFBFD]"
                >
                  Submit Your Profile →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, idx) => (
                <JobCard key={job.id} job={job} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
