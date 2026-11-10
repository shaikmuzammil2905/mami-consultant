import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Handshake } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-mami-gradient text-white py-9 sm:py-11">
      {/* Subtle wave / abstract healthcare circles */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <Handshake className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={1.7} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                Let’s Build Your International Career Together
              </h2>
              <p className="text-sm sm:text-base text-white/90 mt-1">
                Get in touch with our expert consultants today!
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#007C91] font-bold text-sm sm:text-base shadow-lg hover:bg-[#EAFBFD] hover:-translate-y-0.5 transition-all shrink-0 group"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

