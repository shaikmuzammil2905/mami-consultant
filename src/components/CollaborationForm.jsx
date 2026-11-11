import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import FormTextarea from './form/FormTextarea';
import MultiSelectDropdown from './form/MultiSelectDropdown';
import SuccessState from './SuccessState';
import ErrorState from './ErrorState';
import { submitCollaborationRequirement } from '../services/submissionService';

const DESIGNATION_OPTIONS = [
  'HR Manager',
  'Recruiter',
  'Hospital Administrator',
  'Business Owner',
  'Director',
  'Healthcare Manager',
  'Other',
];

const ORGANIZATION_TYPES = [
  'Hospital',
  'Clinic',
  'Healthcare Organization',
  'Recruitment Agency',
  'Medical Institution',
  'Healthcare Company',
  'Other',
];

const EMPLOYEE_TYPES = [
  'Doctors',
  'Nurses',
  'Physiotherapists',
  'Allied Healthcare Professionals',
  'Hospital Staff',
  'Healthcare Administrators',
  'Other',
];

const EXPERIENCE_OPTIONS = [
  'Freshers',
  '1–2 Years',
  '3–5 Years',
  '5–10 Years',
  '10+ Years',
  'Any Experience',
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

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 15 Days',
  'Within 30 Days',
  'Within 60 Days',
  'Flexible',
];

export default function CollaborationForm() {
  const [form, setForm] = useState({
    organizationName: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobile: '',
    location: '',
    organizationType: '',
    peopleRequired: '',
    employeeTypes: [],
    jobPosition: '',
    qualification: '',
    experience: '',
    preferredLocation: '',
    joiningTimeline: '',
    additionalRequirements: '',
  });
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
    if (!form.organizationName.trim() || form.organizationName.trim().length < 2) {
      next.organizationName = 'Company / Hospital / Organization name is required.';
    }
    if (!form.contactPerson.trim() || form.contactPerson.trim().length < 2) {
      next.contactPerson = 'Contact person full name is required.';
    }
    if (!form.designation) next.designation = 'Please select your designation / role.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid business email address.';
    }
    const digits = form.mobile.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) {
      next.mobile = 'Please enter a valid mobile number (8–15 digits).';
    }
    if (!form.location.trim()) next.location = 'Organization location is required.';
    if (!form.organizationType) next.organizationType = 'Please select organization type.';
    const count = Number(form.peopleRequired);
    if (!Number.isFinite(count) || count < 1) {
      next.peopleRequired = 'Please enter number of people required (minimum 1).';
    }
    if (form.employeeTypes.length === 0) {
      next.employeeTypes = 'Please select at least one employee type required.';
    }
    if (!form.jobPosition.trim()) next.jobPosition = 'Job position / role is required.';
    if (!form.qualification.trim()) next.qualification = 'Required qualification is required.';
    if (!form.experience) next.experience = 'Please select required experience.';
    if (!form.preferredLocation) next.preferredLocation = 'Please select preferred work location.';
    if (!form.joiningTimeline) next.joiningTimeline = 'Please select expected joining timeline.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;
    if (!validate()) return;

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await submitCollaborationRequirement(form);
      setResult(response);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while submitting your requirement.');
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  if (result) {
    const whatsappMsg = `Hello MAMI Career Consultant,\n\nWe have submitted a hiring requirement to partner with MAMI.\n\nOrganization: ${form.organizationName}\nContact: ${form.contactPerson} (${form.designation})\nRequirement: ${form.peopleRequired} × ${form.employeeTypes.join(', ')}\nLocation: ${form.preferredLocation}\nReference ID: ${result.requirementId}\n\nPlease share the next steps.`;

    return (
      <SuccessState
        title="Requirement Submitted Successfully ✓"
        message="Thank You for Partnering With MAMI."
        subMessage="Your hiring requirement has been successfully submitted. Our team will review your requirements and contact you shortly."
        referenceId={result.requirementId}
        referenceLabel="Requirement ID"
        backTo="/collaborate"
        backLabel="Back to Collaborate"
        whatsappMessage={whatsappMsg}
        whatsappLabel="WhatsApp MAMI"
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
      {submitError && (
        <ErrorState message={submitError} onRetry={() => setSubmitError('')} />
      )}

      <form onSubmit={handleSubmit} noValidate className="card-mami rounded-3xl p-5 sm:p-8 space-y-8">
        {/* 1. Company / Organization Details */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Company / Organization Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="collab-org-name"
              label="Company / Hospital / Organization Name"
              required
              value={form.organizationName}
              onChange={(e) => updateField('organizationName', e.target.value)}
              placeholder="e.g., Care Multi-Specialty Hospital"
              error={errors.organizationName}
            />
            <FormInput
              id="collab-contact-person"
              label="Full Name"
              required
              value={form.contactPerson}
              onChange={(e) => updateField('contactPerson', e.target.value)}
              placeholder="Your Full Name"
              error={errors.contactPerson}
            />
            <FormSelect
              id="collab-designation"
              label="Designation / Role"
              required
              options={DESIGNATION_OPTIONS}
              value={form.designation}
              onChange={(e) => updateField('designation', e.target.value)}
              placeholder="Select designation"
              error={errors.designation}
            />
            <FormSelect
              id="collab-org-type"
              label="Organization Type"
              required
              options={ORGANIZATION_TYPES}
              value={form.organizationType}
              onChange={(e) => updateField('organizationType', e.target.value)}
              placeholder="Select organization type"
              error={errors.organizationType}
            />
            <FormInput
              id="collab-email"
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="hr@hospital.com"
              error={errors.email}
            />
            <FormInput
              id="collab-mobile"
              label="Mobile Number"
              type="tel"
              required
              value={form.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
              placeholder="+971 / +91 Mobile Number"
              error={errors.mobile}
            />
            <FormInput
              id="collab-location"
              label="Location"
              required
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="City, Country"
              error={errors.location}
              className="md:col-span-2"
            />
          </div>
        </section>

        {/* 2. Manpower Requirement */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Manpower Requirement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormInput
              id="collab-people-count"
              label="Number of People Required"
              type="number"
              min="1"
              required
              value={form.peopleRequired}
              onChange={(e) => updateField('peopleRequired', e.target.value)}
              placeholder="e.g., 5"
              error={errors.peopleRequired}
            />
            <MultiSelectDropdown
              id="collab-employee-types"
              label="Type of Employees Required"
              required
              options={EMPLOYEE_TYPES}
              selected={form.employeeTypes}
              onChange={(vals) => updateField('employeeTypes', vals)}
              placeholder="Select one or more categories"
              error={errors.employeeTypes}
            />
          </div>
        </section>

        {/* 3. Job Requirement Details */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Job Requirement Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="collab-position"
              label="Job Position / Role Required"
              required
              value={form.jobPosition}
              onChange={(e) => updateField('jobPosition', e.target.value)}
              placeholder="e.g., ICU Registered Nurse / Orthopedic Physiotherapist"
              error={errors.jobPosition}
            />
            <FormInput
              id="collab-qualification"
              label="Required Qualification"
              required
              value={form.qualification}
              onChange={(e) => updateField('qualification', e.target.value)}
              placeholder="e.g., B.Sc Nursing, BPT/MPT, MBBS/MD"
              error={errors.qualification}
            />
            <FormSelect
              id="collab-experience"
              label="Experience Required"
              required
              options={EXPERIENCE_OPTIONS}
              value={form.experience}
              onChange={(e) => updateField('experience', e.target.value)}
              placeholder="Select experience range"
              error={errors.experience}
            />
            <FormSelect
              id="collab-work-location"
              label="Preferred Work Location"
              required
              options={LOCATION_OPTIONS}
              value={form.preferredLocation}
              onChange={(e) => updateField('preferredLocation', e.target.value)}
              placeholder="Select work location"
              error={errors.preferredLocation}
            />
            <FormSelect
              id="collab-timeline"
              label="Expected Joining Timeline"
              required
              options={TIMELINE_OPTIONS}
              value={form.joiningTimeline}
              onChange={(e) => updateField('joiningTimeline', e.target.value)}
              placeholder="Select timeline"
              error={errors.joiningTimeline}
              className="md:col-span-2"
            />
          </div>
        </section>

        {/* 4. Additional Requirements */}
        <section className="space-y-4">
          <div className="border-b border-[#EAFBFD] pb-2">
            <h2 className="text-lg font-extrabold text-[#0B3566]">Additional Requirements</h2>
          </div>
          <FormTextarea
            id="collab-notes"
            label="Additional Requirements"
            value={form.additionalRequirements}
            onChange={(e) => updateField('additionalRequirements', e.target.value)}
            placeholder="Mention specific licensing requirements (DHA, DOH, MOH, SCFHS, HCPC, NMBI), shift preferences, salary range, or accommodation benefits..."
            rows={4}
          />
        </section>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAFBFD]">
          <p className="text-xs text-[#60758A]">
            All organization requirements are handled confidentially by MAMI’s recruitment partnership desk.
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
                <span>Submit Requirement</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

