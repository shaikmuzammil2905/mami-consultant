import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Eye,
  Compass,
  Award,
  TrendingUp,
  HeartHandshake,
  Globe,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import aboutImg from '../assets/about-doctor-skyline.jpg';
import { siteConfig } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

const values = [
  { title: 'Trust', desc: 'Ethical, reliable guidance you can depend on at every milestone.', icon: ShieldCheck },
  { title: 'Transparency', desc: 'Clear processes, realistic timelines, and honest eligibility advice.', icon: Eye },
  { title: 'Professional Guidance', desc: 'Led by experienced healthcare & licensing specialists.', icon: Compass },
  { title: 'Quality Support', desc: 'Thorough attention to every credential, form, and assessment.', icon: Award },
  { title: 'Career Growth', desc: 'Helping clinicians unlock fulfilling international medical careers.', icon: TrendingUp },
  { title: 'Customer First', desc: 'Personalized mentoring tailored to your specialty and goals.', icon: HeartHandshake },
  { title: 'Global Opportunity', desc: 'Pathways across UAE, GCC, UK, Ireland & beyond.', icon: Globe },
  { title: 'Proper Documentation', desc: 'Error-free verification and primary source documentation support.', icon: FileCheck2 },
];

export default function About() {
  const { openModal } = useModal();

  return (
    <>
      <PageSEO
        title="About Us | MAMI Career Consultant"
        description="Learn about MAMI Career Consultant, led by Dr. Ramyakrishna in Hyderabad, empowering doctors, nurses, physiotherapists and allied healthcare professionals globally."
      />
      <PageHero
        badge="About MAMI Career Consultant"
        title="Empowering Healthcare Professionals for Global Careers"
        subtitle="Clear Guidance • Proper Documentation • Global Career Support — led by Dr. Ramyakrishna in Hyderabad."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Who We Are */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#CFEFF3]">
              <img
                src={aboutImg}
                alt="Healthcare professional overlooking international city skyline"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">
              Who We <span className="text-[#0799A8]">Are</span>
            </h2>
            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              <strong>MAMI Career Consultant</strong> (with MAMI Career Consultant &amp; Physio Care) is an international healthcare career consultancy based in Hyderabad, founded and led by <strong>{siteConfig.owner}</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              We are dedicated to helping doctors, nurses, physiotherapists, and allied healthcare professionals navigate international healthcare licensing, registration, examination preparation, documentation, and global career placement with clarity and confidence.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openModal('counselling', { source: 'About Page' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Book Career Counselling</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-14 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="card-mami rounded-3xl p-7 sm:p-8"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-bold mb-3">
              OUR MISSION
            </span>
            <h3 className="text-2xl font-extrabold text-[#0B3566] mb-3">Genuine Guidance &amp; Transparent Support</h3>
            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              To provide genuine guidance, transparent processes and reliable career support to healthcare professionals who dream of building successful international careers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="card-mami rounded-3xl p-7 sm:p-8"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-bold mb-3">
              OUR VISION
            </span>
            <h3 className="text-2xl font-extrabold text-[#0B3566] mb-3">Confident Global Healthcare Careers</h3>
            <p className="text-sm sm:text-base text-[#173B63]/90 leading-relaxed">
              Help healthcare professionals confidently build successful international careers through reliable guidance, professional preparation and transparent support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Our Core Values"
            subtitle="Principles that define every consultation, application, and training program at MAMI."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="card-mami rounded-2xl p-5 hover:-translate-y-1 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B3566]">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-[#60758A] mt-1.5 leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose MAMI */}
      <section className="py-12 sm:py-14 bg-mami-soft-cyan">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Why Choose MAMI?"
            subtitle="Trusted by healthcare professionals pursuing international licensing and hospital placements."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.whyChoose.map((point, idx) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-[#CFEFF3] p-4 flex items-center gap-3 shadow-xs"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0799A8] shrink-0" />
                <span className="text-sm font-semibold text-[#0B3566]">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

