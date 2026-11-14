import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

export default function Contact() {
  const { submitInquiry, siteSettings } = useSiteContent();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    profession: 'Doctor',
    service: 'Healthcare Licensing Services',
    country: 'UAE',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      try {
        await submitInquiry({
          name: form.name,
          phone: form.phone,
          email: form.email,
          profession: form.profession,
          service: form.service,
          country: form.country,
          message: form.message,
          sourcePage: 'Contact Page',
        });
      } catch (err) {
        console.warn('Inquiry submit note:', err);
      } finally {
        setSubmitting(false);
        setSubmitted(true);
      }
    }
  };

  return (
    <>
      <PageSEO
        title="Contact MAMI Career Consultant | Hyderabad"
        description="Get in touch with MAMI Career Consultant in Bandlaguda, Nagole, Hyderabad. Call or WhatsApp +91 9533079819 for international healthcare career support."
      />
      <PageHero
        badge="Get in Touch"
        title="Contact MAMI"
        subtitle="Speak directly with our healthcare career consultants for licensing, training, documentation, or international job assistance."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-10">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href={siteConfig.phoneHref}
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[#0B3566]">Phone Call</h2>
              <p className="text-sm font-semibold text-[#007C91] mt-1">{siteConfig.phone}</p>
              <p className="text-xs text-[#60758A] mt-1">Tap to call directly</p>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#25D366] flex items-center justify-center mb-3.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[#0B3566]">WhatsApp</h2>
              <p className="text-sm font-semibold text-[#007C91] mt-1">{siteConfig.whatsappDisplay}</p>
              <p className="text-xs text-[#60758A] mt-1">Quick chat with consultant</p>
            </a>

            <div className="card-mami rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[#0B3566]">Email</h2>
              <p className="text-sm font-semibold text-[#007C91] mt-1">{siteConfig.emailDisplay}</p>
              <p className="text-xs text-[#60758A] mt-1">{siteConfig.emailNote}</p>
            </div>

            <div className="card-mami rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-[#0B3566]">Office Address</h2>
              <p className="text-xs sm:text-sm text-[#173B63] mt-1 leading-relaxed">{siteConfig.address}</p>
            </div>
          </div>

          {/* Form + Google Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 card-mami rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-[#0B3566] mb-1">Send Us a Message</h2>
              <p className="text-sm text-[#60758A] mb-6">
                Fill out the form below and our team will respond promptly.
              </p>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3566]">Thank You, {form.name}!</h3>
                  <p className="text-sm text-[#60758A]">
                    We have received your enquiry and will reach out to {form.phone} soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#EAFBFD] text-[#007C91] font-semibold text-sm cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                      />
                      {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 9533079819"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                      />
                      {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Profession</label>
                      <select
                        value={form.profession}
                        onChange={(e) => setForm({ ...form, profession: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>Doctor</option>
                        <option>Nurse</option>
                        <option>Physiotherapist</option>
                        <option>Allied Healthcare</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Service</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>Healthcare Licensing Services</option>
                        <option>International Registration Support</option>
                        <option>Online Training &amp; Exam Prep</option>
                        <option>Job Assistance</option>
                        <option>Documentation Support</option>
                        <option>Career Counselling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Country</label>
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
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B3566] mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Enquiry</span>
                    </button>
                    <a
                      href={getWhatsAppUrl(`Hello MAMI Career Consultant, my name is ${form.name || 'a healthcare professional'}. I am inquiring about ${form.service} for ${form.country}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EAFBFD] border border-[#8AD7E0] text-[#007C91] font-semibold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Instead</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#CFEFF3] shadow-sm min-h-[340px] bg-[#EAFBFD] flex flex-col">
              <div className="p-5 bg-[#EAFBFD] border-b border-[#CFEFF3]">
                <h3 className="text-base font-bold text-[#0B3566]">Visit Our Hyderabad Office</h3>
                <p className="text-xs text-[#60758A] mt-0.5">{siteConfig.address}</p>
              </div>
              <iframe
                title="MAMI Career Consultant Office Map - Bandlaguda, Nagole, Hyderabad"
                src="https://www.google.com/maps?q=Rajiv+Swagruha+Township,+Bandlaguda,+Nagole,+Hyderabad&output=embed"
                className="w-full flex-1 min-h-[280px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

