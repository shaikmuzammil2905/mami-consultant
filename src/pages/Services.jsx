import { Stethoscope, HeartPulse, Activity, Microscope } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import ServiceGrid from '../components/ServiceGrid';
import CTASection from '../components/CTASection';
import SectionHeading from '../components/SectionHeading';

const targetGroups = [
  {
    icon: Stethoscope,
    title: 'Doctors',
    desc: 'General Practitioners, Specialists, and Medical Officers targeting UAE, GCC, UK & Ireland.',
  },
  {
    icon: HeartPulse,
    title: 'Nurses',
    desc: 'B.Sc & GNM Registered Nurses preparing for DHA, DOH, MOH, SCFHS, NMBI & NMC.',
  },
  {
    icon: Activity,
    title: 'Physiotherapists',
    desc: 'BPT & MPT physiotherapists pursuing DHA, DOH, MOH, HCPC UK & CORU Ireland.',
  },
  {
    icon: Microscope,
    title: 'Allied Healthcare Professionals',
    desc: 'Pharmacists, Radiographers, Lab Technologists, Optometrists & Rehab Therapists.',
  },
];

export default function Services() {
  return (
    <>
      <PageSEO
        title="Our Services | MAMI Career Consultant"
        description="Explore healthcare licensing, international registration, exam training, mock tests, documentation verification, recruitment and career counselling services."
      />
      <PageHero
        badge="Comprehensive Healthcare Career Support"
        title="Our Services"
        subtitle="End-to-end international healthcare career solutions—from initial career counselling and licensing verification to exam training and global job placement."
        breadcrumbs={[{ label: 'Our Services' }]}
      />

      <ServiceGrid compact={false} />

      <section className="py-12 sm:py-14 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Who We Support"
            subtitle="Specialized pathways tailored for every category of medical and allied healthcare professional."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {targetGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="card-mami rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B3566]">{group.title}</h3>
                  <p className="text-sm text-[#60758A] mt-1.5 leading-relaxed">{group.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

