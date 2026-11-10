import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, ClipboardCheck, Users, Lightbulb, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const highlights = [
  {
    icon: Laptop,
    title: 'Online Training Sessions',
    description: 'Interactive live & guided exam prep for DHA, DOH, MOH & GCC Prometric.',
    to: '/training',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Examinations & Practice Tests',
    description: 'Timed CBT mock exams with realistic clinical case scenarios.',
    to: '/services/mock-tests',
  },
  {
    icon: Users,
    title: 'Interview Preparation & Professional Guidance',
    description: 'Structured hospital interview coaching & career confidence building.',
    to: '/services/career-counselling',
  },
];

export default function TrainingSection() {
  return (
    <section className="py-10 sm:py-14 bg-mami-soft-cyan">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Professional Training & Exam Preparation"
          subtitle="Get ready for international success with our expert-led training programs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="lg:col-span-3"
              >
                <Link
                  to={item.to}
                  className="card-mami group flex items-center sm:items-start gap-3.5 rounded-2xl p-5 h-full transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EAFBFD] border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shrink-0 group-hover:bg-[#0799A8] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" strokeWidth={1.85} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0B3566] group-hover:text-[#007C91] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#60758A] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Featured Dark Teal CTA Card matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="lg:col-span-3 sm:col-span-2 lg:col-span-3"
          >
            <Link
              to="/training"
              className="group relative overflow-hidden rounded-2xl bg-mami-gradient text-white p-5 h-full flex items-center justify-between gap-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-extrabold leading-tight">
                    Prepare Today...
                    <br />
                    Achieve Globally!
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#EAFBFD] mt-1">
                    <span>Start Training</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

