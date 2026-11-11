import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import aboutImg from '../assets/about-doctor-skyline.jpg';
import { siteConfig } from '../data/siteConfig';

export default function AboutSection() {
  return (
    <section className="py-10 sm:py-14 bg-mami-soft-cyan">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-center">
          {/* Left: Professional Healthcare + Global Skyline Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-4"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-[#EAFBFD]">
              <img
                src={aboutImg}
                alt="Healthcare professional looking toward international city skyline and airplane"
                className="w-full aspect-[16/10] lg:aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#007C91]/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Center: About MAMI */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">
              About <span className="text-[#0799A8]">MAMI</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[#173B63]/90 leading-relaxed">
              MAMI Career Consultant is an international healthcare career consultancy dedicated to helping doctors, nurses, physiotherapists and other allied healthcare professionals achieve their global career ambitions.
            </p>
            <p className="text-sm sm:text-[15px] text-[#173B63]/90 leading-relaxed">
              We provide comprehensive support for healthcare licensing registration, examination preparation, documentation and international job assistance.
            </p>
            <div className="pt-1">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Why Choose MAMI? */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-4 bg-white/85 backdrop-blur-xs rounded-3xl p-6 border border-[#CFEFF3] shadow-sm"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B3566] mb-4">
              Why Choose <span className="text-[#0799A8]">MAMI?</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {siteConfig.whyChoose.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="flex items-center gap-2.5 text-sm font-medium text-[#173B63]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0799A8] shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-[#EAFBFD]">
              <Link
                to="/why-choose-us"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0799A8] hover:text-[#007C91] transition-colors group"
              >
                <span>Meet Our Founder &amp; Why Choose MAMI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

