import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  QrCode,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Stethoscope,
  Phone,
  MessageCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  X,
  HelpCircle,
  UserCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import PageSEO from '../components/PageSEO';
import paymentQrImg from '../assets/payment-qr-code.png';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

const PROFESSIONS = [
  'General Physician / MBBS Doctor',
  'Specialist / Consultant Doctor (MD / MS)',
  'Registered Nurse (B.Sc / Post B.Sc)',
  'General Nurse / GNM',
  'Physiotherapist (BPT / MPT)',
  'Clinical Pharmacist / Pharm.D',
  'Medical Lab Technologist (MLT)',
  'Radiographer / Imaging Technologist',
  'Dentist (BDS / MDS)',
  'Allied Healthcare Professional',
  'Other Healthcare Specialist',
];

const DESTINATIONS = [
  'UAE – Dubai (DHA Health Authority)',
  'UAE – Abu Dhabi (DOH / HAAD)',
  'UAE – Ministry of Health (MOH)',
  'Saudi Arabia (SCFHS / Mumaris+)',
  'Qatar (DHP / Prometric)',
  'Oman (OMSB / Prometric)',
  'United Kingdom (HCPC / NMC / NHS)',
  'Ireland (CORU / NMBI)',
  'Other GCC / European Country',
];

const PACKAGES = [
  'Healthcare Licensing & Eligibility Assessment (DHA/MOH/SCFHS/HCPC)',
  'Primary Source Verification (DataFlow PSV Support)',
  'Online Exam Coaching & Mock Test Series',
  'International Hospital Job Placement Assistance',
  'All-Inclusive Complete Package (Licensing + DataFlow + Exam + Job Placement)',
];

export default function Registration() {
  const { submitInquiry } = useSiteContent();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    country: 'India',
    profession: PROFESSIONS[0],
    qualification: '',
    experienceYears: '2-5 Years',
    currentHospital: '',
    targetCountry: DESTINATIONS[0],
    packageSelected: PACKAGES[0],
    utrNumber: '',
    amountPaid: '2500',
    remarks: '',
  });

  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);
  const [errors, setErrors] = useState({});

  const upiId = 'msmamitourandtravels.eazypay@icici';
  const accountName = 'M/S.MAMI TOUR AND TRAVELS';
  const bankName = 'ICICI Bank';

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG or WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size exceeds 10MB. Please upload a smaller file.');
      return;
    }

    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      setScreenshotPreview(loadEvt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full Name is required.';
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, '').length < 8) {
      nextErrors.mobile = 'Valid Mobile / WhatsApp Number is required.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Valid Email Address is required.';
    }
    if (!form.qualification.trim()) {
      nextErrors.qualification = 'Highest Qualification is required.';
    }
    if (!form.utrNumber.trim()) {
      nextErrors.utrNumber = 'Transaction / UTR reference number is required after payment.';
    }
    if (!screenshotPreview) {
      nextErrors.screenshot = 'Please upload your payment transfer screenshot / receipt.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const generateRegistrationRef = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `MAMI-REG-${dateStr}-${rand}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 380, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    const regRef = generateRegistrationRef();

    try {
      // 1. Submit to Supabase inquiries backend
      await submitInquiry({
        name: form.fullName,
        phone: form.mobile,
        email: form.email,
        profession: form.profession,
        service: form.packageSelected,
        country: form.targetCountry,
        message: `[REGISTRATION APPLICATION] Ref: ${regRef} | Qualification: ${form.qualification} | Experience: ${form.experienceYears} | UTR / Txn ID: ${form.utrNumber} | Amount: Rs. ${form.amountPaid} | City: ${form.city}, ${form.country} | Remarks: ${form.remarks || 'None'}`,
        sourcePage: 'Registration Form with Payment QR',
      });

      // 2. Cache in localStorage for admin panel visibility
      if (typeof window !== 'undefined') {
        try {
          const existing = JSON.parse(localStorage.getItem('mami_candidate_registrations') || '[]');
          existing.unshift({
            ref: regRef,
            ...form,
            hasScreenshot: Boolean(screenshotPreview),
            screenshotPreview: screenshotPreview,
            submittedAt: new Date().toISOString(),
          });
          localStorage.setItem('mami_candidate_registrations', JSON.stringify(existing.slice(0, 50)));
        } catch (e) {
          console.warn('Storage cache note:', e);
        }
      }

      setSubmittedRef(regRef);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } catch (err) {
      console.warn('Registration submit note:', err);
      // Still allow success with generated ref so user can send WhatsApp confirmation
      setSubmittedRef(regRef);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  // Structured WhatsApp Message
  const buildWhatsAppMessage = (refId) => {
    return encodeURIComponent(
      `*🏥 NEW CANDIDATE REGISTRATION — MAMI CAREER CONSULTANT*\n\n` +
      `*Registration Ref:* ${refId}\n` +
      `*Date:* ${new Date().toLocaleDateString('en-GB')}\n\n` +
      `*👤 Candidate Information:*\n` +
      `• Name: ${form.fullName}\n` +
      `• Phone/WhatsApp: ${form.mobile}\n` +
      `• Email: ${form.email}\n` +
      `• Location: ${form.city || 'N/A'}, ${form.country}\n\n` +
      `*🩺 Professional Details:*\n` +
      `• Profession: ${form.profession}\n` +
      `• Qualification: ${form.qualification}\n` +
      `• Experience: ${form.experienceYears}\n` +
      `• Target Destination: ${form.targetCountry}\n` +
      `• Package/Service: ${form.packageSelected}\n\n` +
      `*💳 Payment Verification:*\n` +
      `• Paid To: ${accountName} (${bankName})\n` +
      `• UPI ID: ${upiId}\n` +
      `• UTR / Transaction ID: ${form.utrNumber}\n` +
      `• Amount Paid: ₹${form.amountPaid}\n\n` +
      `_I have uploaded my payment screenshot on the website and am attaching the receipt image here for your immediate file verification. Please confirm my registration._`
    );
  };

  return (
    <>
      <PageSEO
        title="Candidate Registration Form with UPI Payment | MAMI Career Consultant"
        description="Register your healthcare licensing and career file with MAMI Career Consultant. Scan official ICICI Bank UPI QR code to complete registration fee and forward verification to our India & UAE helplines."
      />

      <PageHero
        badge="MAMI Candidate Registration"
        title="Candidate Registration &amp; File Processing Form"
        description="Complete your official registration for DHA, DOH, MOH, SCFHS, Prometric, UK HCPC &amp; International Hospital Job Placement with secure UPI fee verification."
      />

      <section className="py-10 sm:py-16 bg-[#F4FCFD]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {submittedRef ? (
              /* ================= SUCCESS CONFIRMATION STATE ================= */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl border-2 border-[#CFEFF3] shadow-xl p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-[#EAFBFD] border-4 border-[#BFEBF0] text-[#0799A8] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black tracking-wide border border-emerald-200 uppercase mb-2">
                    Registration Recorded Successfully ✓
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B3566]">
                    Thank You, {form.fullName}!
                  </h2>
                  <p className="text-sm sm:text-base text-[#60758A] font-medium mt-1">
                    Your candidate registration file has been generated with Reference ID:
                  </p>
                  <div className="mt-3 inline-block px-5 py-2.5 rounded-2xl bg-[#F0FCFD] border-2 border-[#0799A8] text-[#0799A8] text-base sm:text-lg font-black tracking-wider select-all shadow-xs">
                    {submittedRef}
                  </div>
                </div>

                {/* Important Next Step Warning */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-left space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>FINAL STEP: WhatsApp Verification</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    Please tap the button below to open WhatsApp with your chosen office. Send the pre-filled registration text and attach your payment receipt screenshot so our advisors can immediately issue your official fee receipt and initiate file documentation.
                  </p>
                </div>

                {/* Uploaded Screenshot Preview */}
                {screenshotPreview && (
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-left flex items-center gap-4">
                    <img
                      src={screenshotPreview}
                      alt="Payment Receipt Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-gray-300 shadow-2xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#0B3566]">Payment Screenshot Attached</p>
                      <p className="text-[11px] text-gray-500">UTR / Ref: {form.utrNumber}</p>
                      <p className="text-[11px] font-semibold text-emerald-700">Amount: ₹{form.amountPaid}</p>
                    </div>
                  </div>
                )}

                {/* Dual Direct WhatsApp Buttons (India & UAE) */}
                <div className="pt-2 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappIndiaNumber}?text=${buildWhatsAppMessage(submittedRef)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Send Details to India Helpline (+91 9154605599)</span>
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappUAENumber}?text=${buildWhatsAppMessage(submittedRef)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#128C7E] hover:bg-[#075E54] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Send Details to UAE / Dubai Office (+971 569069289)</span>
                  </a>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setScreenshotFile(null);
                      setScreenshotPreview(null);
                    }}
                    className="text-xs font-bold text-[#0799A8] hover:underline cursor-pointer"
                  >
                    Register Another Candidate
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ================= MAIN REGISTRATION FORM ================= */
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* 1. Candidate Details Card */}
                <div className="bg-white rounded-3xl border border-[#CFEFF3] shadow-md p-6 sm:p-8 space-y-6">
                  <div className="border-b border-[#EAFBFD] pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center font-black">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B3566]">
                        Personal &amp; Contact Details
                      </h3>
                      <p className="text-xs text-[#60758A]">
                        Please enter information exactly as written on your degree and passport.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Full Name (as per Passport) *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Dr. / Nurse / Full Name"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none transition-all ${
                          errors.fullName ? 'border-rose-500' : 'border-[#CFEFF3] focus:border-[#0799A8]'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="+91 9154605599"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none transition-all ${
                          errors.mobile ? 'border-rose-500' : 'border-[#CFEFF3] focus:border-[#0799A8]'
                        }`}
                      />
                      {errors.mobile && <p className="text-xs text-rose-600 mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="youremail@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none transition-all ${
                          errors.email ? 'border-rose-500' : 'border-[#CFEFF3] focus:border-[#0799A8]'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>

                    {/* City & State */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        City &amp; State / Country
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Hyderabad, Telangana, India"
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Professional & Healthcare Background Card */}
                <div className="bg-white rounded-3xl border border-[#CFEFF3] shadow-md p-6 sm:p-8 space-y-6">
                  <div className="border-b border-[#EAFBFD] pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center font-black">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B3566]">
                        Professional Qualifications &amp; Licensing Target
                      </h3>
                      <p className="text-xs text-[#60758A]">
                        Tell us your clinical degree, experience, and where you want to practice.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Profession */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Healthcare Profession *
                      </label>
                      <select
                        value={form.profession}
                        onChange={(e) => setForm({ ...form, profession: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      >
                        {PROFESSIONS.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    {/* Qualification */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Highest Qualification / Degree *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.qualification}
                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                        placeholder="e.g. MBBS / B.Sc Nursing / BPT / MPT"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none transition-all ${
                          errors.qualification ? 'border-rose-500' : 'border-[#CFEFF3] focus:border-[#0799A8]'
                        }`}
                      />
                      {errors.qualification && <p className="text-xs text-rose-600 mt-1">{errors.qualification}</p>}
                    </div>

                    {/* Clinical Experience */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Total Clinical Experience
                      </label>
                      <select
                        value={form.experienceYears}
                        onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      >
                        <option value="Fresher / Intern">Fresher / Intern (&lt; 1 Year)</option>
                        <option value="1-2 Years">1 - 2 Years</option>
                        <option value="2-5 Years">2 - 5 Years (Eligible for GCC Exams)</option>
                        <option value="5-10 Years">5 - 10 Years</option>
                        <option value="10+ Years">10+ Years Senior Specialist</option>
                      </select>
                    </div>

                    {/* Current Organization */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Current Working Hospital / Clinic (if applicable)
                      </label>
                      <input
                        type="text"
                        value={form.currentHospital}
                        onChange={(e) => setForm({ ...form, currentHospital: e.target.value })}
                        placeholder="e.g. Apollo Hospital, Yashoda, etc."
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      />
                    </div>

                    {/* Target Country / Authority */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Target Destination / Licensing Authority *
                      </label>
                      <select
                        value={form.targetCountry}
                        onChange={(e) => setForm({ ...form, targetCountry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Service Package */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Registration Package / Service Required *
                      </label>
                      <select
                        value={form.packageSelected}
                        onChange={(e) => setForm({ ...form, packageSelected: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      >
                        {PACKAGES.map((pkg) => (
                          <option key={pkg} value={pkg}>{pkg}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Official ICICI Bank UPI QR Payment Section Card */}
                <div className="bg-white rounded-3xl border-2 border-[#0799A8]/40 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                    Official Payment Gateway
                  </div>

                  <div className="border-b border-[#EAFBFD] pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0799A8] text-white flex items-center justify-center font-black">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B3566]">
                        Registration Payment via ICICI Bank UPI QR
                      </h3>
                      <p className="text-xs text-[#60758A]">
                        Scan the QR code with any UPI App or use the official UPI ID.
                      </p>
                    </div>
                  </div>

                  {/* QR Card & Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-br from-[#F4FCFD] via-white to-[#EAFBFD] rounded-2xl p-5 sm:p-6 border border-[#CFEFF3]">
                    {/* QR Code Presentation Box */}
                    <div className="md:col-span-5 flex flex-col items-center">
                      <div className="p-3 bg-white rounded-2xl border-2 border-[#0799A8] shadow-lg max-w-[240px]">
                        <img
                          src={paymentQrImg}
                          alt="ICICI Bank Official UPI QR Code - M/S. MAMI TOUR AND TRAVELS"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-[#60758A] mt-2 text-center">
                        Scan with Google Pay, PhonePe, Paytm, iMobile or BHIM
                      </p>
                    </div>

                    {/* Bank Details & One-Click Copy */}
                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#0799A8]">
                          Verified Merchant Account
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-[#0B3566]">
                          {accountName}
                        </h4>
                        <p className="text-xs font-semibold text-gray-500">
                          Banking Partner: <span className="font-bold text-[#0B3566]">{bankName}</span>
                        </p>
                      </div>

                      {/* UPI ID Copy Card */}
                      <div className="p-3.5 rounded-xl bg-white border border-[#BFEBF0] flex items-center justify-between gap-3 shadow-2xs">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Official Merchant UPI ID
                          </p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#007C91] truncate select-all">
                            {upiId}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-1.5 rounded-lg bg-[#EAFBFD] hover:bg-[#D5F5F9] text-[#007C91] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy UPI</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Quick Instruction Bullets */}
                      <div className="text-xs text-[#173B63]/85 space-y-1.5 pt-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
                          <span>Pay standard initial candidate registration fee of <strong>₹{form.amountPaid}</strong>.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
                          <span>Copy the <strong>12-digit UTR / UPI Transaction ID</strong> from your app.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0799A8] shrink-0" />
                          <span>Upload screenshot below for immediate file verification.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Verification Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* UTR / Transaction ID */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        UPI Transaction / UTR ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.utrNumber}
                        onChange={(e) => setForm({ ...form, utrNumber: e.target.value })}
                        placeholder="e.g. 4319XXXXXXXX or UPI Ref ID"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none transition-all ${
                          errors.utrNumber ? 'border-rose-500' : 'border-[#CFEFF3] focus:border-[#0799A8]'
                        }`}
                      />
                      {errors.utrNumber && <p className="text-xs text-rose-600 mt-1">{errors.utrNumber}</p>}
                    </div>

                    {/* Amount Paid */}
                    <div>
                      <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                        Amount Transferred (₹ INR) *
                      </label>
                      <input
                        type="number"
                        required
                        value={form.amountPaid}
                        onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
                        placeholder="2500"
                        className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Screenshot File Upload Box */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                      Upload Payment Transfer Screenshot / Receipt *
                    </label>

                    {screenshotPreview ? (
                      <div className="p-4 rounded-2xl bg-[#F0FCFD] border-2 border-emerald-300 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={screenshotPreview}
                            alt="Screenshot Preview"
                            className="w-16 h-16 object-cover rounded-xl border border-emerald-400 shadow-xs shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-black text-emerald-800 truncate">
                              {screenshotFile?.name || 'Payment Receipt Image'}
                            </p>
                            <p className="text-[11px] font-medium text-emerald-600">
                              Ready for submission • {(screenshotFile?.size ? (screenshotFile.size / 1024).toFixed(1) + ' KB' : 'Image loaded')}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={removeScreenshot}
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer shrink-0"
                          title="Remove Screenshot"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className={`block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        errors.screenshot ? 'border-rose-400 bg-rose-50/50' : 'border-[#0799A8]/40 hover:border-[#0799A8] bg-[#F8FAFC] hover:bg-[#EAFBFD]'
                      }`}>
                        <Upload className="w-8 h-8 text-[#0799A8] mx-auto mb-2" />
                        <p className="text-xs sm:text-sm font-bold text-[#0B3566]">
                          Click to Browse or Drag Payment Screenshot Here
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1">
                          PNG, JPG, JPEG or WebP up to 10MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    {errors.screenshot && <p className="text-xs text-rose-600 mt-1.5">{errors.screenshot}</p>}
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                      Any Remarks or Specific Inquiries (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={form.remarks}
                      onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                      placeholder="e.g. Please expedite Dataflow verification, or calling time preferences..."
                      className="w-full px-4 py-3 rounded-xl border border-[#CFEFF3] text-sm text-[#0B3566] bg-[#F8FAFC] focus:bg-white outline-none focus:border-[#0799A8] transition-all"
                    />
                  </div>
                </div>

                {/* Submit Action Card */}
                <div className="bg-white rounded-3xl border border-[#CFEFF3] shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#0799A8] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#0B3566]">
                        Direct Integration with Official WhatsApp Helplines
                      </p>
                      <p className="text-[11px] text-[#60758A]">
                        Upon submission, your registration details &amp; UTR verification auto-route to WhatsApp for immediate advisor onboarding.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0799A8] via-[#007C91] to-[#0B3566] hover:from-[#007C91] hover:to-[#0799A8] text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration &amp; Forward Details</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
