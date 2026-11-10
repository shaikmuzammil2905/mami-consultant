import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, Laptop, ClipboardCheck, Users, ArrowRight, MessageCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import CTASection from '../components/CTASection';
import { trainingCourses } from '../data/training';
import { getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';

export default function TrainingCourseDetails() {
  const { courseId } = useParams();
  const course = trainingCourses.find((c) => c.id === courseId);
  const { openModal } = useModal();

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#0B3566]">Training Course Not Found</h1>
        <Link
          to="/training"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm"
        >
          <span>Back to Training Programs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageSEO
        title={`${course.title} | MAMI Career Consultant`}
        description={course.overview}
      />
      <PageHero
        badge={course.badge}
        title={course.title}
        subtitle={course.overview}
        breadcrumbs={[
          { label: 'Training', to: '/training' },
          { label: course.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              openModal('training', {
                courseName: course.title,
                title: `Apply: ${course.title}`,
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md cursor-pointer"
          >
            <span>Enquire / Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={getWhatsAppUrl(`Hello MAMI Career Consultant, I want pricing & batch details for ${course.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp for Schedule</span>
          </a>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[#CFEFF3] shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            <div className="card-mami rounded-3xl p-6 sm:p-7 space-y-4">
              <h2 className="text-2xl font-extrabold text-[#0B3566]">Course Syllabus &amp; Focus Areas</h2>
              <ul className="space-y-2.5">
                {course.syllabus.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-[#173B63]">
                    <CheckCircle2 className="w-5 h-5 text-[#0799A8] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="card-mami rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-[#0B3566]">Program Highlights</h3>

              <div className="space-y-3 text-sm text-[#173B63]">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#0799A8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0B3566] text-xs uppercase">Who Can Join</p>
                    <p className="text-xs sm:text-sm mt-0.5">{course.whoCanJoin}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#0799A8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0B3566] text-xs uppercase">Duration</p>
                    <p className="text-xs sm:text-sm mt-0.5">{course.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Laptop className="w-5 h-5 text-[#0799A8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0B3566] text-xs uppercase">Training Format</p>
                    <p className="text-xs sm:text-sm mt-0.5">{course.format}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClipboardCheck className="w-5 h-5 text-[#0799A8] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0B3566] text-xs uppercase">Mock Tests &amp; Interview Support</p>
                    <p className="text-xs sm:text-sm mt-0.5">{course.mockTests}</p>
                    <p className="text-xs text-[#60758A] mt-1">{course.interviewSupport}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] space-y-1">
                <p className="text-xs font-bold uppercase text-[#007C91]">Program Fee</p>
                <p className="text-sm font-bold text-[#0B3566]">
                  {course.pricing.amount ? `${course.pricing.currency} ${course.pricing.amount}` : course.pricing.displayLabel}
                </p>
                <p className="text-xs text-[#60758A]">{course.pricing.note}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  openModal('training', {
                    courseName: course.title,
                    title: `Enroll in ${course.title}`,
                  })
                }
                className="w-full py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Apply for This Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}

