import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, PlayCircle, Eye, X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { recognitionPhotos, recognitionVideos } from '../data/founderAndCertifications';

export default function FounderGallerySection() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-10">
        <SectionHeading
          title="Awards, Recognition & Media"
          subtitle="Celebrating Dr. Ramyakrishna Mamidala’s international healthcare excellence and global career leadership in Dubai, UAE."
        />

        {/* Recognition Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {recognitionPhotos.map((photo, idx) => (
            <motion.article
              key={photo.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="card-mami group rounded-3xl overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(photo)}
                className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#EAFBFD] to-white overflow-hidden cursor-pointer block"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B3566]/85 text-white text-[11px] font-semibold">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Expand</span>
                </span>
              </button>
              <div className="p-5 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0799A8] uppercase tracking-wide mb-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Dubai Recognition</span>
                </div>
                <h3 className="text-base font-extrabold text-[#0B3566]">{photo.title}</h3>
                <p className="text-xs sm:text-sm text-[#60758A] mt-1 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Recognition Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recognitionVideos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="card-mami rounded-3xl overflow-hidden bg-gradient-to-b from-[#EAFBFD]/60 to-white p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center shrink-0">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0B3566]">{vid.title}</h3>
                  <p className="text-xs text-[#60758A]">{vid.description}</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-[#0B3566] border border-[#CFEFF3] shadow-sm">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-contain bg-black"
                >
                  <source src={vid.src} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="fixed inset-0 bg-[#0B3566]/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#CFEFF3]"
            >
              <div className="bg-mami-gradient text-white px-5 py-3.5 flex items-center justify-between gap-3">
                <h3 className="text-sm sm:text-base font-bold text-white">{activePhoto.title}</h3>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  aria-label="Close photo"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 bg-[#F6FDFE]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full max-h-[72vh] object-contain rounded-2xl mx-auto"
                />
                <p className="text-xs sm:text-sm text-[#60758A] text-center mt-3">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

