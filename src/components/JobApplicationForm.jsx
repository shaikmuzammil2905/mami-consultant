import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, Loader2 } from 'lucide-react';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import FormTextarea from './form/FormTextarea';
import FileUpload from './form/FileUpload';
import SuccessState from './SuccessState';
import ErrorState from './ErrorState';
import { submitCareerApplication } from '../services/submissionService';

const PROFESSION_OPTIONS = [
  'Doctor',
  'Nurse',
  'Physiotherapist',
  'Allied Healthcare Professional',
  'Healthcare Administrator',
  'Hospital Staff',
  'Other',
];

const JOB_TYPE_OPTIONS = [
  'Full-Time',
  'Part-Time',
  'Contract / Locum',
  'Permanent Placement',
];

const EXPERIENCE_OPTIONS = [
  '0–1 Years',
  '2–3 Years',
  '4–5 Years',
  '6–10 Years',
  '10+ Years',
];

const LOCATION_OPTIONS = [
  'India',
  'UAE',
  'Dubai',
  'Abu Dhabi',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Kuwait',
  'Bahrain',
  'UK',
  'Ireland',
  'Other',
];

export default function JobApplicationForm({
  selectedJobTitle = 'General Healthcare Career Application',
  selectedJobId = null,
  defaultProfession = '',
  defaultLocation = '',
}) {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    profession: defaultProfession || '',
    jobType: 'Full-Time',
    experience: '',
    preferredLocation: defaultLocation || '',
    qualification: '',
    currentOrganization: '',
    message: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [result, setResult] = useState(null);
  const submittingRef = useRef(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      next.fullName = 'Full name is required.';
    }
    const digits = form.mobile.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) {
      next.mobile = 'Please enter a valid mobile number (8–15 digits).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.city.trim()) {
      next.city = 'City / Location is required.';
    }
    if (!form.profession) {
      next.profession = 'Please select your profession.';
    }
    if (!form.jobType) {
      next.jobType = 'Please select a job type.';
    }
    if (!form.experience) {
      next.experience = 'Please select your years of experience.';
    }
    if (!form.preferredLocation) {
      next.preferredLocation = 'Please select your preferred job location.';
    }
    if (!form.qualification.trim()) {
      next.qualification = 'Highest qualification is required.';
    }
    if (!resumeFile) {
      setResumeError('Please upload your Resume / CV (PDF, DOC, or DOCX).');
    }

    setErrors(next);
    return Object.keys(next).length === 0 && Boolean(resumeFile) && !resumeError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitCareerApplication({
        ...form,
        jobId: selectedJobId,
        appliedJob: selectedJobTitle,
        resumeFilename: resumeFile?.name || null,
        resumeMimeType: resumeFile?.type || null,
        resumeSizeBytes: resumeFile?.size || null,
      });
      setResult(response);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while submitting your request.');
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (result) {
    const whatsappMsg = `Hello MAMI Career Consultant,\n\nI have submitted a job application.\n\nName: ${form.fullName}\nProfession: ${form.profession}\nJob: ${selectedJobTitle}\nReference ID: ${result.applicationId}\n\nI would like to know the next steps.`;

    return (
      <SuccessState
        title="Application Submitted Successfully ✓"
        message="Thank you for applying with MAMI Career Consultant."
        subMessage="Our team will review your profile and contact you regarding suitable opportunities."
        referenceId={result.applicationId}
        referenceLabel="Application ID"
        backTo="/career"
        backLabel="Back to Career"
        whatsappMessage={whatsappMsg}
        whatsappLabel="Contact MAMI on WhatsApp"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Selected Job Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#EAFBFD] to-[#DFF6FA] border border-[#BFEBF0] px-5 py-4 flex items-center gap-3.5 shadow-xs">
        <div className="w-11 h-11 rounded-xl bg-white border border-[#CFEFF3] text-[#0799A8] flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0799A8]">
            Applying For
          </p>
          <p className="text-base sm:text-lg font-extrabold text-[#0B3566]">{selectedJobTitle}</p>
        </div>
      </div>

      {submitError && (
        <ErrorState message={submitError} onRetry={() => setSubmitError('')} />
      )}

      <form onSubmit={handleSubmit} noValidate className="card-mami rounded-3xl p-5 sm:p-8 space-y-8">
        {/* 1. Personal Information */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="app-fullname"
              label="Full Name"
              required
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Dr. / Nurse / Your Full Name"
              error={errors.fullName}
            />
            <FormInput
              id="app-mobile"
              label="Mobile Number"
              type="tel"
              required
              value={form.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
              placeholder="+91 9533079819"
              error={errors.mobile}
            />
            <FormInput
              id="app-email"
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
            />
            <FormInput
              id="app-city"
              label="City / Location"
              required
              value={form.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="e.g., Hyderabad, India"
              error={errors.city}
            />
          </div>
        </section>

        {/* 2. Professional Information */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Professional Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              id="app-profession"
              label="Type of Job / Profession"
              required
              options={PROFESSION_OPTIONS}
              value={form.profession}
              onChange={(e) => updateField('profession', e.target.value)}
              placeholder="Select profession"
              error={errors.profession}
            />
            <FormSelect
              id="app-job-type"
              label="Employment Type"
              required
              options={JOB_TYPE_OPTIONS}
              value={form.jobType}
              onChange={(e) => updateField('jobType', e.target.value)}
              placeholder="Select job type"
              error={errors.jobType}
            />
            <FormSelect
              id="app-experience"
              label="Years of Experience"
              required
              options={EXPERIENCE_OPTIONS}
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              placeholder="Select experience"
              error={errors.experience}
            />
            <FormInput
              id="app-qualification"
              label="Highest Qualification"
              required
              value={form.qualification}
              onChange={(e) => updateField('qualification', e.target.value)}
              placeholder="e.g., MBBS, B.Sc Nursing, BPT, MPT"
              error={errors.qualification}
            />
            <FormInput
              id="app-org"
              label="Current Organization / Hospital"
              value={form.currentOrganization}
              onChange={(e) => updateField('currentOrganization', e.target.value)}
              placeholder="Optional"
              className="md:col-span-2"
            />
          </div>
        </section>

        {/* 3. Career Preferences */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Career Preferences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              id="app-location"
              label="Preferred Job Location"
              required
              options={LOCATION_OPTIONS}
              value={form.preferredLocation}
              onChange={(e) => updateField('preferredLocation', e.target.value)}
              placeholder="Select preferred destination"
              error={errors.preferredLocation}
            />
            <FormInput
              id="app-applied-role"
              label="Applied Position"
              value={selectedJobTitle}
              readOnly
              className="opacity-90"
            />
          </div>
        </section>

        {/* 4. Resume / Documents */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Resume / Documents</h2>
          </div>
          <FileUpload
            id="career-cv-upload"
            label="Resume / CV Upload (PDF, DOC, DOCX)"
            required
            file={resumeFile}
            error={resumeError}
            onFileSelect={(f) => {
              setResumeFile(f);
              setResumeError('');
            }}
            onValidationError={(msg) => setResumeError(msg)}
          />
        </section>

        {/* 5. Message */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Message</h2>
          </div>
          <FormTextarea
            id="app-message"
            label="Additional Message / Career Preference"
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Share your licensing status (DHA/DOH/SCFHS/HCPC/NMBI), notice period, or preferred specialty..."
            rows={4}
          />
        </section>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAFBFD]">
          <p className="text-xs text-[#60758A]">
            Your details and CV are kept strictly confidential and reviewed only by MAMI Career Consultant.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-mami-gradient text-white font-bold text-sm shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

