import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Send, CheckCircle2, Upload } from 'lucide-react';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

const MODAL_TITLES = {
  enquiry: {
    heading: 'Send an Enquiry',
    subheading: 'Get clear guidance on healthcare licensing, training, and global careers.',
  },
  counselling: {
    heading: 'Book Career Counselling',
    subheading: 'One-on-one guidance for country selection, licensing pathways & career planning.',
  },
  job: {
    heading: 'Apply for Healthcare Position',
    subheading: 'Submit your details and our recruitment specialists will connect with you.',
  },
  training: {
    heading: 'Register for Training Program',
    subheading: 'Reserve your seat for live online exam preparation and mock tests.',
  },
  service: {
    heading: 'Service Consultation Request',
    subheading: 'Tell us your profession and preferred destination for tailored support.',
  },
};

export default function PopupModal({ isOpen, type, payload, onClose }) {
  const { submitInquiry } = useSiteContent();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    profession: 'Doctor',
    service: 'Healthcare Licensing Services',
    country: 'UAE',
    experience: '',
    cvFileName: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setForm((prev) => ({
        ...prev,
        service: payload?.serviceName || payload?.courseName || prev.service,
        country: payload?.country || prev.country,
        message: payload?.jobTitle
          ? `Applying for: ${payload.jobTitle}`
          : payload?.courseName
            ? `Interested in training: ${payload.courseName}`
            : '',
      }));
    }
  }, [isOpen, payload]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const meta = MODAL_TITLES[type] || MODAL_TITLES.enquiry;
  const heading = payload?.title || meta.heading;

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 8) {
      nextErrors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitInquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        profession: form.profession,
        service: payload?.serviceName || payload?.courseName || form.service,
        country: payload?.country || form.country,
        message: form.message,
        sourcePage: `Popup Modal: ${type}`,
      });
    } catch (err) {
      console.warn('Modal submit note:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappText = `Hello MAMI Career Consultant, my name is ${form.name || 'a healthcare professional'}. Profession: ${form.profession}. Interested in: ${
    payload?.jobTitle || payload?.courseName || form.service
  } (${form.country}). Phone: ${form.phone || 'N/A'}. ${form.message}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mami-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B3566]/55 backdrop-blur-xs"
          />

          {/* Modal Container (Desktop Centered, Mobile Bottom-Sheet style) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#CFEFF3] overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-mami-gradient text-white px-6 py-5 flex items-start justify-between gap-4 shrink-0">
              <div>
                <h3 id="mami-modal-title" className="text-lg sm:text-xl font-bold text-white">
                  {heading}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-0.5">{meta.subheading}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close popup"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto">
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0B3566]">Thank You, {form.name}!</h4>
                  <p className="text-sm text-[#173B63]/85 max-w-sm mx-auto">
                    Your enquiry has been successfully recorded. Connect directly with our healthcare career advisors below:
                  </p>
                  <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
                    <a
                      href={getWhatsAppIndiaUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:opacity-95 shadow-sm transition-opacity"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp India (+91 9154605599)</span>
                    </a>
                    <a
                      href={getWhatsAppUAEUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#128C7E] text-white font-bold text-xs hover:opacity-95 shadow-sm transition-opacity"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp UAE (+971 569069289)</span>
                    </a>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Dr. / Nurse / Your Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8] focus:ring-2 focus:ring-[#0799A8]/15"
                      />
                      {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9154605599"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8] focus:ring-2 focus:ring-[#0799A8]/15"
                      />
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8] focus:ring-2 focus:ring-[#0799A8]/15"
                      />
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Healthcare Profession
                      </label>
                      <select
                        value={form.profession}
                        onChange={(e) => setForm({ ...form, profession: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>Doctor</option>
                        <option>Nurse</option>
                        <option>Physiotherapist</option>
                        <option>Allied Healthcare Professional</option>
                        <option>Medical Student / Intern</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        {type === 'job' ? 'Years of Experience' : 'Service Required'}
                      </label>
                      {type === 'job' ? (
                        <input
                          type="text"
                          value={form.experience}
                          onChange={(e) => setForm({ ...form, experience: e.target.value })}
                          placeholder="e.g., 3 Years"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                        />
                      ) : (
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                        >
                          <option>Healthcare Licensing Services</option>
                          <option>International Registration Support</option>
                          <option>Online Training &amp; Exam Preparation</option>
                          <option>Mock Tests &amp; Interview Preparation</option>
                          <option>International Healthcare Recruitment</option>
                          <option>Documentation &amp; Verification Support</option>
                          <option>Career Counselling</option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Preferred Country
                      </label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>UAE</option>
                        <option>Saudi Arabia</option>
                        <option>Qatar</option>
                        <option>Oman</option>
                        <option>UK</option>
                        <option>Ireland</option>
                        <option>Other GCC / International</option>
                      </select>
                    </div>
                  </div>

                  {type === 'job' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                        Upload CV (PDF / DOC)
                      </label>
                      <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-dashed border-[#8AD7E0] bg-[#EAFBFD]/60 text-xs sm:text-sm text-[#007C91] cursor-pointer hover:bg-[#EAFBFD]">
                        <Upload className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                          {form.cvFileName || 'Choose CV file (optional)'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              cvFileName: e.target.files?.[0]?.name || '',
                            })
                          }
                        />
                      </label>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#0B3566] mb-1">
                      Message / Query
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your qualification, target exam, or career goals..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8] focus:ring-2 focus:ring-[#0799A8]/15"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{type === 'job' ? 'Submit Application' : 'Submit Enquiry'}</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#EAFBFD] border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#D6F5F9] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Instead</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

