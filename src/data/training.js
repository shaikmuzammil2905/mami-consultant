import serviceTrainingImg from '../assets/service-training-banner.png';
import serviceMockTestsImg from '../assets/service-mock-tests.png';
import serviceCounsellingImg from '../assets/service-counselling-banner.png';
import serviceLicensingImg from '../assets/service-licensing.png';
import aboutSkylineImg from '../assets/about-doctor-skyline.jpg';
import recruitmentImg from '../assets/service-recruitment.jpg';

export const trainingCourses = [
  {
    id: 'dha-exam-prep',
    title: 'DHA Exam Preparation Program',
    badge: 'Dubai Health Authority',
    image: serviceTrainingImg,
    overview:
      'Focused online coaching for doctors, nurses, and physiotherapists preparing for the Dubai Health Authority (DHA) Prometric examination.',
    whoCanJoin: 'Physiotherapists (BPT/MPT), Registered Nurses (B.Sc/GNM), and General Practitioners / Specialists.',
    duration: '6–8 Weeks (Flexible Batches)',
    format: 'Live Online Interactive Classes + Recorded Revision + CBT Mock Portal',
    mockTests: '6 Full-Length Timed CBT Mock Exams + 1,000+ Topic Practice MCQs',
    interviewSupport: 'Includes DHA post-licensing CV & Dubai clinic interview readiness session.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by profession and batch format.',
    },
    syllabus: [
      'Core Clinical Reasoning & Evidence-Based Practice',
      'Specialty Modules (Musculoskeletal, Neuro, Cardiopulmonary, Acute Care)',
      'Patient Safety, Ethics & UAE Healthcare Protocols',
      'High-Yield Case Scenarios & Exam Time Management',
    ],
  },
  {
    id: 'doh-haad-prep',
    title: 'DOH / HAAD Abu Dhabi Exam Coaching',
    badge: 'Department of Health – Abu Dhabi',
    image: aboutSkylineImg,
    overview:
      'Comprehensive Pearson VUE exam preparation tailored to the Department of Health (DOH / HAAD) Abu Dhabi clinical test blueprint.',
    whoCanJoin: 'Nurses, Physiotherapists, Doctors & Allied Health professionals targeting Abu Dhabi hospitals.',
    duration: '6–8 Weeks',
    format: 'Live Online Coaching + Case-Based Discussions + Doubt-Clearing Clinics',
    mockTests: '5 Full Pearson VUE Pattern Mock Exams + Weak-Area Analytics',
    interviewSupport: 'Dedicated Abu Dhabi hospital HR & clinical panel interview preparation.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by profession and package.',
    },
    syllabus: [
      'DOH Clinical Standards & Infection Prevention',
      'Differential Diagnosis & Acute Clinical Judgment',
      'Pharmacology, Rehab Protocols & Critical Care Scenarios',
      'Timed Question Solving & Elimination Strategies',
    ],
  },
  {
    id: 'moh-uae-prep',
    title: 'MOH UAE Exam Preparation',
    badge: 'Ministry of Health & Prevention',
    image: recruitmentImg,
    overview:
      'Structured preparation covering MOHAP licensing assessments for healthcare practitioners across Sharjah, Ajman, and Northern Emirates.',
    whoCanJoin: 'Doctors, Nurses, Physiotherapists & Allied Healthcare applicants.',
    duration: '6 Weeks',
    format: 'Live Online Sessions + Study Compendiums',
    mockTests: '5 Full-Length Prometric Mock Examinations',
    interviewSupport: 'CV optimization & MOH facility interview coaching.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by profession and package.',
    },
    syllabus: [
      'MOHAP Competency Blueprint Review',
      'Core Clinical & Allied Health Assessment Domains',
      'Patient Care Planning & Clinical Safety',
      'Full Mock Simulations & Rationales',
    ],
  },
  {
    id: 'gcc-prometric-combo',
    title: 'GCC Prometric (SCFHS / Oman / Qatar)',
    badge: 'Saudi • Oman • Qatar',
    image: serviceLicensingImg,
    overview:
      'Unified Prometric preparation designed for Saudi SCFHS, Oman OMSB, and Qatar DHP healthcare licensing examinations.',
    whoCanJoin: 'Clinicians applying across Saudi Arabia, Oman, and Qatar.',
    duration: '8 Weeks',
    format: 'Live Online Sessions + Country-Specific Question Banks',
    mockTests: '8 Multi-Country Prometric Mock Tests + Viva Readiness (for Oman)',
    interviewSupport: 'Includes Oman Viva & GCC employer interview simulation.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by target country and package.',
    },
    syllabus: [
      'SCFHS / OMSB / DHP Exam Pattern Mastery',
      'Clinical Decision Making & Emergency Priorities',
      'Specialty Practice Questions & Case Studies',
      'Oman Viva & Employer Interview Preparation',
    ],
  },
  {
    id: 'mock-tests-series',
    title: 'Mock Examinations & Practice Test Series',
    badge: 'Practice. Prepare. Excel.',
    image: serviceMockTestsImg,
    overview:
      'Self-paced and mentor-reviewed computer-based mock examinations to benchmark your readiness before booking your official test.',
    whoCanJoin: 'Self-studying healthcare professionals seeking realistic exam simulation.',
    duration: '4 Weeks Access (Extendable)',
    format: 'Online CBT Test Portal + Detailed Score & Rationale Review',
    mockTests: '10 Timed Full-Length Mock Tests + Topic Quizzes',
    interviewSupport: 'Optional add-on 1-on-1 clinical interview review.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by exam category.',
    },
    syllabus: [
      'Timed Exam Interface Simulation',
      'Detailed Rationale Walkthroughs',
      'Domain-wise Accuracy Tracking',
      'Final Readiness Score Assessment',
    ],
  },
  {
    id: 'interview-career-coaching',
    title: 'International Interview & Career Coaching',
    badge: 'Hospital & Clinic Readiness',
    image: serviceCounsellingImg,
    overview:
      'One-on-one interview coaching, clinical scenario roleplay, and international healthcare CV workshops for GCC, UK & Ireland employers.',
    whoCanJoin: 'Licensed or license-eligible Doctors, Nurses, Physiotherapists & Allied Health staff.',
    duration: '2 Weeks Intensive',
    format: '1-on-1 Live Coaching + Mock Panel Interviews',
    mockTests: '2 Full Mock Employer Interviews with Written Feedback',
    interviewSupport: 'Full CV rewrite + LinkedIn / international job portal alignment.',
    pricing: {
      amount: null,
      currency: 'INR',
      displayLabel: 'Contact us for current pricing',
      note: 'Pricing varies by package.',
    },
    syllabus: [
      'International Healthcare CV & Cover Letter Structuring',
      'Clinical Competency & Behavioral Questions',
      'UAE, GCC, UK NHS & Irish HSE Interview Etiquette',
      'Salary Negotiation & Onboarding Expectations',
    ],
  },
];

