import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CollaborationForm from '../components/CollaborationForm';

export default function CollaborateRequirement() {
  return (
    <>
      <PageSEO
        title="Partner With MAMI | Submit Hiring Requirement | MAMI Career Consultant"
        description="Submit your healthcare manpower and recruitment requirements to partner with MAMI Career Consultant."
      />
      <PageHero
        badge="Employer & Hospital Partnership"
        title="Partner With MAMI"
        subtitle="Tell us about your hiring requirements and our team will get in touch with you."
        breadcrumbs={[
          { label: 'Collaborate With MAMI', to: '/collaborate' },
          { label: 'Submit Requirement' },
        ]}
      />

      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <CollaborationForm />
        </div>
      </section>
    </>
  );
}

