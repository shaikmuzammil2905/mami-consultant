import { motion } from 'framer-motion';

export default function ServiceVisualShowcase({ image, alt, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#EAFBFD] to-white border-2 border-[#CFEFF3] shadow-[0_20px_50px_-14px_rgba(7,153,168,0.22)] p-2 sm:p-3"
    >
      {badge && (
        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-white/95 border border-[#CFEFF3] text-[#007C91] text-xs font-bold shadow-xs absolute top-5 left-5 z-10">
          {badge}
        </span>
      )}
      <img
        src={image}
        alt={alt}
        className="w-full h-auto max-h-[520px] object-contain rounded-2xl block mx-auto"
      />
    </motion.div>
  );
}

