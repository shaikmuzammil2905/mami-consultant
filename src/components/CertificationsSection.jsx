import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Eye, X, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { certifications } from '../data/founderAndCertifications';

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="py-12 sm:py-16 bg-mami-soft-cyan">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Our Certifications"
          subtitle="Verified international healthcare credentials and official UAE business registration—with sensitive registration numbers securely protected."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {certifications.map((cert, idx) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="card-mami group rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Grand Framed Certificate Preview */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`View ${cert.title}`}
                  className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#EAFBFD] to-white border-b border-[#DCEFF3] p-3 overflow-hidden block cursor-pointer"
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} — ${cert.authority}`}
                    className="w-full h-full object-contain rounded-xl shadow-xs group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 border border-[#CFEFF3] text-[#007C91] text-[10px] font-bold shadow-xs">
                    <Lock className="w-3 h-3" />
                    <span>ID Protected</span>
                  </span>
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B3566]/85 text-white text-[10px] font-semibold opacity-90 group-hover:opacity-100">
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </span>
                </button>

                <div className="p-5 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAFBFD] text-[#007C91] text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.region}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#0B3566] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0799A8]">{cert.authority}</p>
                  <p className="text-xs text-[#60758A] leading-relaxed">{cert.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2.5 flex items-center justify-between gap-2 border-t border-[#F0FAFC]">
                <span className="text-[11px] font-bold text-[#0B3566] inline-flex items-center gap-1 min-w-0">
                  <Award className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
                  <span className="truncate">{cert.status}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-bold text-[#0799A8] hover:text-[#007C91] shrink-0 cursor-pointer"
                >
                  View →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-[#0B3566]/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#CFEFF3] overflow-hidden max-h-[92vh] flex flex-col"
            >
              <div className="bg-mami-gradient text-white px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-xs text-white/90">{selectedCert.authority}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate preview"
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-6 bg-[#F6FDFE] overflow-y-auto flex-1 flex flex-col items-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full max-h-[68vh] object-contain rounded-2xl border border-[#CFEFF3] bg-white shadow-sm"
                />
                <p className="mt-3 text-xs text-[#60758A] inline-flex items-center gap-1.5 text-center">
                  <Lock className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
                  <span>Registration numbers, barcodes &amp; private identifiers are redacted for privacy.</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

