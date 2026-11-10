import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, Laptop, ArrowRight, ClipboardCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import SectionHeading from '../components/SectionHeading';
import CTASection from '../components/CTASection';
import { trainingCourses } from '../data/training';
import { useModal } from '../context/ModalContext';

export default function Training() {
  const { openModal } = useModal();

  return (
    <>
      <PageSEO
        title="Professional Training & Exam Preparation | MAMI Career Consultant"
        description="Online training sessions, DHA, DOH, MOH, GCC Prometric exam preparation, mock tests, and interview coaching for healthcare professionals."
      />
      <PageHero
        badge="DHA • DOH • MOH • GCC Prometric • Mock Exams"
        title="Professional Training & Exam Preparation"
        subtitle="Get ready for international licensing success with structured online training sessions, realistic CBT mock exams, and expert interview preparation."
        breadcrumbs={[{ label: 'Training' }]}
      >
        <button
          type="button"
          onClick={() =>
            openModal('training', {
              courseName: 'Exam Preparation Program',
              title: 'Start Your Training Journey',
            })
          }
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-lg hover:shadow-xl cursor-pointer"
        >
          <span>Start Your Training Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Training Programs & Courses"
            subtitle="Click any training program to view full syllabus, format, mock tests, and enrollment details."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingCourses.map((course, idx) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="card-mami rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#EAFBFD]">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#007C91] text-xs font-bold shadow-xs">
                      {course.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-lg font-extrabold text-[#0B3566]">{course.title}</h2>
                    <p className="text-xs sm:text-sm text-[#60758A] leading-relaxed">
                      {course.overview}
                    </p>

                    <div className="space-y-1.5 pt-1 text-xs text-[#173B63]">
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#0799A8] shrink-0" />
                        <span>Duration: {course.duration}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-[#0799A8] shrink-0" />
                        <span className="truncate">{course.format}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-[#0799A8] shrink-0" />
                        <span className="truncate">{course.mockTests}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#EAFBFD] flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#007C91]">
                    {course.pricing.displayLabel}
                  </span>
                  <Link
                    to={`/training/${course.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EAFBFD] text-[#007C91] font-bold text-xs hover:bg-[#0799A8] hover:text-white transition-colors shrink-0"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Course Details</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

