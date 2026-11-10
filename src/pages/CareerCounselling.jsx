import { motion } from 'framer-motion';
import { Globe, ShieldPlus, Compass, GraduationCap, FileCheck, BriefcaseBusiness, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

const counsellingPillars = [
  { icon: Globe, title: 'Country Selection', desc: 'Compare UAE, Saudi Arabia, Qatar, Oman, UK, and Ireland based on your specialty and career goals.' },
  { icon: ShieldPlus, title: 'Licensing Pathway', desc: 'Identify the exact regulator (DHA, DOH, MOH, SCFHS, NMC, HCPC, NMBI) and exemption eligibility.' },
  { icon: Compass, title: 'Career Planning', desc: 'Map out realistic timelines, relocation readiness, and long-term salary & growth prospects.' },
  { icon: GraduationCap, title: 'Exam Preparation', desc: 'Plan your Prometric, Pearson VUE, OET/IELTS, or CBT preparation schedule effectively.' },
  { icon: FileCheck, title: 'Documentation', desc: 'Understand exact experience letters, DataFlow PSV, and Good Standing requirements upfront.' },
  { icon: BriefcaseBusiness, title: 'Job Opportunities', desc: 'Align your CV and clinical profile with active international hospital and clinic demand.' },
];

export default function CareerCounselling() {
  const { openModal } = useModal();

  return (
    <>
      <PageSEO
        title="Career Counselling | MAMI Career Consultant"
        description="Personalized healthcare career counselling for country selection, licensing pathways, exam preparation, documentation, and global job opportunities."
      />
      <PageHero
        badge="Personalized 1-on-1 Healthcare Guidance"
        title="Career Counselling"
        subtitle={`Honest, personalized global career planning led by ${siteConfig.owner} for doctors, nurses, physiotherapists, and allied healthcare professionals.`}
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: 'Career Counselling' },
        ]}
      >
        <button
          type="button"
          onClick={() => openModal('counselling', { source: 'Career Counselling Page' })}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <span>Book Career Counselling</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="What We Cover in Your Session"
            subtitle="Six pillars of clarity before you take your next international career step."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {counsellingPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="card-mami rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B3566]">{item.title}</h3>
                  <p className="text-sm text-[#60758A] mt-1.5 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl bg-mami-soft-cyan border border-[#CFEFF3] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0B3566]">Ready to Map Your Global Healthcare Career?</h3>
              <p className="text-sm text-[#173B63]/85 mt-1">
                Book an online consultation or visit us at {siteConfig.address}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openModal('counselling', { source: 'Counselling Bottom CTA' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md shrink-0 cursor-pointer"
            >
              <span>Book Career Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

