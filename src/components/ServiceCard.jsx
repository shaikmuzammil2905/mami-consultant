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
  const serviceImg = service.image_url || service.image;

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
            ? `items-center text-center p-2.5 sm:p-3.5 ${
                isActive
                  ? '!border-[#0799A8] ring-2 ring-[#0799A8]/20 shadow-[0_14px_32px_-8px_rgba(7,153,168,0.28)]'
                  : ''
              }`
            : 'items-start text-left'
        }`}
      >
        {/* Mapped Service Visual replacing the plain icon box on both Home & /services */}
        {compact ? (
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-b from-[#EAFBFD] to-white border border-[#D4F2F6] mb-3 shrink-0 shadow-xs">
            <img
              src={serviceImg}
              alt={service.title}
              className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-500"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-lg bg-white/95 border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shadow-xs group-hover:bg-[#0799A8] group-hover:text-white transition-colors"
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
          </div>
        ) : (
          <div className="relative w-full bg-gradient-to-b from-[#EAFBFD] to-white border-b border-[#E2F6F9] p-2.5">
            <img
              src={serviceImg}
              alt={service.title}
              className="w-full aspect-[16/9] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 w-9 h-9 rounded-xl bg-white/95 border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shadow-sm group-hover:bg-[#0799A8] group-hover:text-white transition-colors"
            >
              <Icon className="w-5 h-5" strokeWidth={1.9} />
            </span>
          </div>
        )}

        <div className={compact ? 'flex flex-col items-center flex-1 w-full px-0.5 pb-1' : 'p-6 flex flex-col flex-1 w-full'}>
          <h3
            className={`font-bold text-[#0B3566] group-hover:text-[#007C91] transition-colors leading-snug ${
              compact ? 'text-[13px] sm:text-[14px]' : 'text-lg'
            }`}
          >
            {service.title}
          </h3>

          <p
            className={`text-[#60758A] leading-relaxed mt-1.5 ${
              compact ? 'text-[11.5px] sm:text-[12px] line-clamp-2' : 'text-sm flex-1'
            }`}
          >
            {compact ? service.shortSubtitle : service.shortDescription}
          </p>

          <span className="mt-auto pt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#0799A8] group-hover:text-[#007C91]">
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
