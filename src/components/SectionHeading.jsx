import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, align = 'center', withLines = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className={align === 'center' ? 'text-center mb-8 sm:mb-10' : 'text-left mb-6 sm:mb-8'}
    >
      <div
        className={`flex items-center gap-4 ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
      >
        {withLines && align === 'center' && (
          <span className="hidden sm:block h-[1.5px] w-14 md:w-20 bg-gradient-to-r from-transparent to-[#7DD3DE]" />
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B3566]">
          {title}
        </h2>
        {withLines && (
          <span className="hidden sm:block h-[1.5px] w-14 md:w-20 bg-gradient-to-l from-transparent to-[#7DD3DE]" />
        )}
      </div>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-[#173B63]/85 font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

