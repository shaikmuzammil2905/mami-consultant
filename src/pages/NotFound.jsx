import { Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';
import PageSEO from '../components/PageSEO';

export default function NotFound() {
  return (
    <>
      <PageSEO
        title="Page Not Found | MAMI Career Consultant"
        description="The page you're looking for could not be found. Return to MAMI Career Consultant."
      />
      <section className="py-20 sm:py-28 bg-mami-soft-cyan">
        <div className="max-w-xl mx-auto px-4 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center mx-auto shadow-md animate-float-slow">
            <Plane className="w-9 h-9 -rotate-12" />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#0799A8]">404 — Route Not Found</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3566]">
            Your Global Career Journey Starts Here
          </h1>
          <p className="text-sm sm:text-base text-[#60758A]">
            The page you're looking for could not be found. Let's get you back to exploring our healthcare licensing, training, and global career pathways.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

