import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, CheckCircle2, ArrowRight, MessageCircle, GraduationCap } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import StatusBadge from '../components/StatusBadge';
import { jobs } from '../data/jobs';
import { getWhatsAppUrl } from '../data/siteConfig';

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#0B3566]">Job Opening Not Found</h1>
        <Link
          to="/career"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm"
        >
          <span>Explore Career Opportunities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isClosed = job.status === 'closed';
  const applyHref = `/career/apply?jobId=${encodeURIComponent(job.id)}&job=${encodeURIComponent(
    `${job.title} – ${job.country}`
  )}`;

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
          { label: 'Career', to: '/career' },
          { label: job.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          {isClosed ? (
            <StatusBadge status="closed" label="Applications Closed" />
          ) : (
            <Link
              to={applyHref}
              state={{ job }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <a
            href={getWhatsAppUrl(`Hello MAMI Career Consultant, I am interested in ${job.title} (${job.location}).`)}
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
                {job.qualification && (
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <GraduationCap className="w-4 h-4 text-[#0799A8]" /> {job.qualification}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-extrabold text-[#0B3566]">Role Overview</h2>
              <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">{job.fullDescription}</p>

              {job.responsibilities?.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-[#0B3566] pt-2">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#173B63]">
                        <CheckCircle2 className="w-4 h-4 text-[#0799A8] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

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
              {isClosed ? (
                <div className="text-center py-2">
                  <StatusBadge status="closed" label="Applications Closed" />
                </div>
              ) : (
                <Link
                  to={applyHref}
                  state={{ job }}
                  className="w-full py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Apply for This Position</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
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
