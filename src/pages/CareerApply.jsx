import { useSearchParams, useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import JobApplicationForm from '../components/JobApplicationForm';
import { jobs } from '../data/jobs';

export default function CareerApply() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const stateJob = location.state?.job;
  const queryJobId = searchParams.get('jobId');
  const queryJobTitle = searchParams.get('job');

  const matchedJob = stateJob || jobs.find((j) => j.id === queryJobId);
  const selectedJobTitle =
    queryJobTitle ||
    (matchedJob ? `${matchedJob.title} – ${matchedJob.country}` : 'General Healthcare Career Application');

  return (
    <>
      <PageSEO
        title={`Apply for Job | ${selectedJobTitle} | MAMI Career Consultant`}
        description="Submit your healthcare career application and CV to MAMI Career Consultant for opportunities in India, UAE, GCC, UK and Ireland."
      />
      <PageHero
        badge="Career Application"
        title="Apply for Job"
        subtitle="Complete your personal, professional, and resume details below. Our team will review your profile and connect with you."
        breadcrumbs={[
          { label: 'Career', to: '/career' },
          { label: 'Apply for Job' },
        ]}
      />

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <JobApplicationForm
            selectedJobTitle={selectedJobTitle}
            selectedJobId={matchedJob?.id || queryJobId || null}
            defaultProfession={matchedJob?.profession || ''}
            defaultLocation={matchedJob?.country || ''}
          />
        </div>
      </section>
    </>
  );
}

