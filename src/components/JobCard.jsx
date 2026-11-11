import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, Globe, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function JobCard({ job, index = 0 }) {
  const isClosed = job.status === 'closed';
  const applyHref = `/career/apply?jobId=${encodeURIComponent(job.id)}&job=${encodeURIComponent(
    `${job.title} – ${job.country}`
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
      className="card-mami rounded-3xl p-6 flex flex-col justify-between gap-5 transition-all hover:-translate-y-1"
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-xs font-bold">
            {job.profession}
          </span>
          {isClosed ? (
            <StatusBadge status="closed" label="Applications Closed" />
          ) : (
            <span className="text-xs font-semibold text-[#60758A]">{job.authority}</span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-[#0B3566] leading-snug">{job.title}</h3>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[#60758A]">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
            <span className="truncate">{job.country}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
            <span className="truncate">{job.location}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
            <span className="truncate">{job.experience}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
            <span className="truncate">{job.employmentType}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#173B63]/85 leading-relaxed">
          {job.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-[#EAFBFD] flex items-center gap-2.5">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 text-center py-2.5 px-3 rounded-full border border-[#8AD7E0] text-[#0B3566] font-semibold text-xs hover:bg-[#EAFBFD] transition-colors"
        >
          View Details
        </Link>

        {isClosed ? (
          <span className="flex-1 text-center py-2.5 px-3 rounded-full bg-slate-100 text-slate-500 font-semibold text-xs">
            Applications Closed
          </span>
        ) : (
          <Link
            to={applyHref}
            state={{ job }}
            className="flex-1 inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-full bg-mami-gradient text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all group"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

