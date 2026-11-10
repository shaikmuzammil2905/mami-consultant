import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index = 0, compact = true, className = '' }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
      className={className}
    >
      <Link
        to={service.route}
        className={`card-mami group flex flex-col items-center text-center rounded-2xl transition-all duration-300 hover:-translate-y-1.5 h-full ${
          compact ? 'p-4 sm:p-5' : 'p-6 sm:p-7 items-start text-left'
        }`}
      >
        <div
          className={`rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center group-hover:bg-[#0799A8] group-hover:text-white group-hover:scale-105 transition-all duration-300 ${
            compact ? 'w-13 h-13 mb-3.5' : 'w-14 h-14 mb-4'
          }`}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.85} />
        </div>

        <h3
          className={`font-bold text-[#0B3566] group-hover:text-[#007C91] transition-colors leading-snug ${
            compact ? 'text-[14px] sm:text-[15px]' : 'text-lg'
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`text-[#60758A] leading-relaxed mt-1.5 ${
            compact ? 'text-[12px] sm:text-[12.5px] line-clamp-2' : 'text-sm flex-1'
          }`}
        >
          {compact ? service.shortSubtitle : service.shortDescription}
        </p>

        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0799A8] group-hover:text-[#007C91]">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );
}

