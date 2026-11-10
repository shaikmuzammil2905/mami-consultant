import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import { jobs } from '../data/jobs';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id);
  const { openModal } = useModal();

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#0B3566]">Job Opening Not Found</h1>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm"
        >
          <span>Explore Job Opportunities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={`${job.title} – ${job.location} | MAMI Career Consultant`}
        description={job.shortDescription}
      />
      <PageHero
        badge={`${job.profession} • ${job.authority}`}
        title={job.title}
        subtitle={job.shortDescription}
        breadcrumbs={[
          { label: 'Job Assistance', to: '/jobs' },
          { label: job.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              openModal('job', {
                jobTitle: job.title,
                country: job.country,
                title: `Apply: ${job.title}`,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl(`Hello MAMI Career Consultant, I am interested in applying for ${job.title} (${job.location}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Recruiter</span>
          </a>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="card-mami rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-[#173B63] pb-4 border-b border-[#EAFBFD]">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-[#0799A8]" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Clock className="w-4 h-4 text-[#0799A8]" /> {job.experience}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Briefcase className="w-4 h-4 text-[#0799A8]" /> {job.employmentType}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-[#0B3566]">Role Overview</h2>
              <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">{job.fullDescription}</p>

              <h3 className="text-lg font-bold text-[#0B3566] pt-2">Candidate Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-[#0B3566] pt-2">Compensation &amp; Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                    <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="card-mami rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-[#0B3566]">Ready to Apply?</h3>
              <p className="text-xs sm:text-sm text-[#60758A]">
                Don’t have your {job.authority} license yet? MAMI assists eligible candidates with licensing, DataFlow verification, and CV optimization.
              </p>
              <button
                type="button"
                onClick={() =>
                  openModal('job', {
                    jobTitle: job.title,
                    country: job.country,
                    title: `Apply: ${job.title}`,
                  })
                }
                className="w-full py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm cursor-pointer"
              >
                Submit Application
              </button>
              <Link
                to="/services/healthcare-licensing"
                className="block text-center text-xs font-semibold text-[#0799A8] hover:underline"
              >
                Check Licensing Requirements →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}

