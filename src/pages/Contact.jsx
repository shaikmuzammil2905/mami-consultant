import { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

export default function Contact() {
  const { submitInquiry } = useSiteContent();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    profession: 'Doctor',
    service: 'Healthcare Licensing Services',
    country: 'UAE',
    whatsappDestination: 'india', // 'india' or 'uae'
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const buildWhatsAppMessage = () => {
    return `Hello MAMI Career Consultant,
*New Healthcare Career Enquiry:*
• *Name:* ${form.name || 'Healthcare Professional'}
• *Phone:* ${form.phone || 'N/A'}
• *Email:* ${form.email || 'N/A'}
• *Profession:* ${form.profession}
• *Service Interest:* ${form.service}
• *Target Country:* ${form.country}
• *Message:* ${form.message || 'I would like to receive eligibility and licensing guidance.'}`;
  };

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
          sourcePage: `Contact Page (${form.whatsappDestination.toUpperCase()} WhatsApp)`,
        });

        // Directly integrate and redirect to the chosen WhatsApp number with formatted inquiry
        const waMsg = buildWhatsAppMessage();
        const waUrl =
          form.whatsappDestination === 'uae'
            ? getWhatsAppUAEUrl(waMsg)
            : getWhatsAppIndiaUrl(waMsg);

        window.open(waUrl, '_blank', 'noopener,noreferrer');
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
        title="Contact MAMI Career Consultant | India & UAE Healthcare Guidance"
        description="Connect with MAMI Career Consultant. Call or WhatsApp our India office at +91 9154605599 or UAE office at +971 569069289 for healthcare licensing and international job support."
      />
      <PageHero
        badge="Direct Contact & WhatsApp Integration"
        title="Contact MAMI"
        subtitle="Speak directly with our healthcare career specialists in India & Dubai for licensing, training, verification, or international job assistance."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-10">
          {/* Contact Cards — India & UAE Direct Helpline + WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. India Office Call */}
            <a
              href="tel:+919154605599"
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block border-2 hover:border-[#0799A8]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0799A8] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                India Helpline
              </span>
              <h2 className="text-base font-bold text-[#0B3566] mt-2">+91 9154605599</h2>
              <p className="text-xs text-[#60758A] mt-1">Tap to call India office directly</p>
            </a>

            {/* 2. UAE Office Call */}
            <a
              href="tel:+971569069289"
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block border-2 hover:border-[#0799A8]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center mb-3.5">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#007C91] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                UAE / Dubai Helpline
              </span>
              <h2 className="text-base font-bold text-[#0B3566] mt-2">+971 569069289</h2>
              <p className="text-xs text-[#60758A] mt-1">Tap to call UAE office directly</p>
            </a>

            {/* 3. India WhatsApp */}
            <a
              href={getWhatsAppIndiaUrl('Hello MAMI Career Consultant, I want to consult regarding healthcare licensing.')}
              target="_blank"
              rel="noopener noreferrer"
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block border-2 hover:border-[#25D366]"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center mb-3.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                WhatsApp India
              </span>
              <h2 className="text-base font-bold text-[#0B3566] mt-2">+91 9154605599</h2>
              <p className="text-xs text-[#60758A] mt-1">Instant WhatsApp chat (India)</p>
            </a>

            {/* 4. UAE WhatsApp */}
            <a
              href={getWhatsAppUAEUrl('Hello MAMI Career Consultant, I am inquiring from UAE/Gulf regarding licensing and jobs.')}
              target="_blank"
              rel="noopener noreferrer"
              className="card-mami rounded-2xl p-6 hover:-translate-y-1 transition-all block border-2 hover:border-[#25D366]"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center mb-3.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                WhatsApp UAE / Gulf
              </span>
              <h2 className="text-base font-bold text-[#0B3566] mt-2">+971 569069289</h2>
              <p className="text-xs text-[#60758A] mt-1">Instant WhatsApp chat (Dubai/UAE)</p>
            </a>
          </div>

          {/* Form + Google Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 card-mami rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-[#0B3566] mb-1">Send an Enquiry</h2>
              <p className="text-sm text-[#60758A] mb-6">
                Submitting this form connects directly with our consultants on WhatsApp and records your request.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mx-auto border-2 border-emerald-200">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3566]">Thank You, {form.name}!</h3>
                  <p className="text-sm text-[#60758A] max-w-md mx-auto">
                    Your enquiry has been received and opened on WhatsApp. If your WhatsApp did not open automatically, click either button below to continue:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                    <a
                      href={getWhatsAppIndiaUrl(buildWhatsAppMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-md hover:opacity-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on India WhatsApp (+91 9154605599)</span>
                    </a>
                    <a
                      href={getWhatsAppUAEUrl(buildWhatsAppMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#007C91] text-white font-bold text-sm shadow-md hover:opacity-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on UAE WhatsApp (+971 569069289)</span>
                    </a>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
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
                        placeholder="e.g. Dr. Ramesh Kumar"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                      />
                      {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +91 9154605599 or +971 569069289"
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
                        <option>Hospital Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Service Interest</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>Healthcare Licensing Services</option>
                        <option>International Registration Support</option>
                        <option>Online Training &amp; Exam Prep</option>
                        <option>Mock Tests &amp; Interview Prep</option>
                        <option>Job Assistance &amp; Placement</option>
                        <option>Documentation &amp; DataFlow</option>
                        <option>Career Counselling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B3566] mb-1">Target Destination</label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFEFF3] text-sm bg-white focus:outline-none focus:border-[#0799A8]"
                      >
                        <option>UAE (Dubai / Abu Dhabi)</option>
                        <option>Saudi Arabia</option>
                        <option>Qatar</option>
                        <option>Oman</option>
                        <option>United Kingdom</option>
                        <option>Ireland</option>
                        <option>India</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B3566] mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                    />
                  </div>

                  {/* WhatsApp Office Routing Choice */}
                  <div className="p-3.5 bg-gradient-to-br from-[#EAFBFD] to-white rounded-2xl border border-[#CFEFF3] space-y-2">
                    <label className="block text-xs font-bold text-[#0B3566]">
                      Direct WhatsApp Integration:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        form.whatsappDestination === 'india'
                          ? 'bg-white border-[#0799A8] ring-2 ring-[#0799A8]/20 font-bold text-[#0B3566]'
                          : 'bg-white/60 border-gray-200 text-gray-700'
                      }`}>
                        <input
                          type="radio"
                          name="waDestination"
                          checked={form.whatsappDestination === 'india'}
                          onChange={() => setForm({ ...form, whatsappDestination: 'india' })}
                          className="text-[#0799A8]"
                        />
                        <span>Send to India Office (+91 9154605599)</span>
                      </label>

                      <label className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        form.whatsappDestination === 'uae'
                          ? 'bg-white border-[#0799A8] ring-2 ring-[#0799A8]/20 font-bold text-[#0B3566]'
                          : 'bg-white/60 border-gray-200 text-gray-700'
                      }`}>
                        <input
                          type="radio"
                          name="waDestination"
                          checked={form.whatsappDestination === 'uae'}
                          onChange={() => setForm({ ...form, whatsappDestination: 'uae' })}
                          className="text-[#0799A8]"
                        />
                        <span>Send to UAE / Dubai Office (+971 569069289)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B3566] mb-1">Your Message / Qualifications</label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your qualifications, clinical experience, or licensing questions..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CFEFF3] text-sm focus:outline-none focus:border-[#0799A8]"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Submitting & Connecting...' : 'Submit & Connect to WhatsApp →'}</span>
                    </button>

                    {/* Direct Quick WhatsApp Connect Buttons */}
                    <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="font-semibold text-gray-500">Or chat directly:</span>
                      <a
                        href={getWhatsAppIndiaUrl('Hello MAMI Career Consultant, I would like to inquire about international healthcare licensing.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAFBFD] border border-[#8AD7E0] text-[#007C91] font-bold hover:bg-[#D5F4F8]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>India WhatsApp: +91 9154605599</span>
                      </a>
                      <a
                        href={getWhatsAppUAEUrl('Hello MAMI Career Consultant, I am inquiring regarding UAE licensing and opportunities.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAFBFD] border border-[#8AD7E0] text-[#007C91] font-bold hover:bg-[#D5F4F8]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>UAE WhatsApp: +971 569069289</span>
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Office Info & Map */}
            <div className="lg:col-span-5 space-y-4">
              <div className="card-mami rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-[#0B3566]">Global Office Locations</h3>
                
                <div className="p-3.5 rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] space-y-1">
                  <p className="text-xs font-extrabold text-[#007C91] uppercase tracking-wider">India Head Office</p>
                  <p className="text-xs text-[#0B3566] font-semibold">{siteConfig.address}</p>
                  <p className="text-xs text-[#60758A]">Phone / WhatsApp: <a href="tel:+919154605599" className="font-bold text-[#0799A8] underline">+91 9154605599</a></p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EAFBFD] border border-[#CFEFF3] space-y-1">
                  <p className="text-xs font-extrabold text-[#007C91] uppercase tracking-wider">UAE / Dubai Office</p>
                  <p className="text-xs text-[#0B3566] font-semibold">{siteConfig.addressUAE}</p>
                  <p className="text-xs text-[#60758A]">Phone / WhatsApp: <a href="tel:+971569069289" className="font-bold text-[#0799A8] underline">+971 569069289</a></p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-[#CFEFF3] shadow-sm min-h-[260px] bg-[#EAFBFD] flex flex-col">
                <div className="p-4 bg-[#EAFBFD] border-b border-[#CFEFF3]">
                  <h4 className="text-sm font-bold text-[#0B3566]">Hyderabad Office Location</h4>
                  <p className="text-[11px] text-[#60758A] mt-0.5">{siteConfig.address}</p>
                </div>
                <iframe
                  title="MAMI Career Consultant Office Map - Bandlaguda, Nagole, Hyderabad"
                  src="https://www.google.com/maps?q=Rajiv+Swagruha+Township,+Bandlaguda,+Nagole,+Hyderabad&output=embed"
                  className="w-full flex-1 min-h-[220px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
