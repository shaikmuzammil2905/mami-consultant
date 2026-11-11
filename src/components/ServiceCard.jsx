import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({
  service,
  index = 0,
  compact = true,
  isActive = false,
  onPreview,
  className = '',
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
      className={className}
      onMouseEnter={() => onPreview?.(index)}
      onFocus={() => onPreview?.(index)}
    >
      <Link
        to={service.route}
        className={`card-mami group flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1.5 h-full overflow-hidden ${
          compact
            ? `items-center text-center p-4 sm:p-5 ${
                isActive
                  ? '!border-[#0799A8] ring-2 ring-[#0799A8]/20 shadow-[0_14px_32px_-8px_rgba(7,153,168,0.28)]'
                  : ''
              }`
            : 'items-start text-left'
        }`}
      >
        {/* Full Grand Service Picture Header on non-compact (/services & related cards) */}
        {!compact && service.image && (
          <div className="w-full bg-gradient-to-b from-[#EAFBFD] to-white border-b border-[#E2F6F9] p-2.5">
            <img
              src={service.image}
              alt={service.title}
              className="w-full aspect-[16/9] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        <div className={compact ? 'flex flex-col items-center h-full w-full' : 'p-6 flex flex-col flex-1 w-full'}>
          <div
            className={`rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center group-hover:bg-[#0799A8] group-hover:text-white group-hover:scale-105 transition-all duration-300 ${
              compact ? 'w-13 h-13 mb-3.5' : 'w-12 h-12 mb-3.5'
            }`}
          >
            <Icon className={compact ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-6 h-6'} strokeWidth={1.85} />
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

          <span className="mt-3 pt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#0799A8] group-hover:text-[#007C91]">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
