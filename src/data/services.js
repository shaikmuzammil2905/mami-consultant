import {
  ShieldPlus,
  Globe,
  GraduationCap,
  ClipboardCheck,
  BriefcaseBusiness,
  FileCheck,
  Users,
} from 'lucide-react';
import aboutSkylineImg from '../assets/about-doctor-skyline.jpg';
import recruitmentImg from '../assets/service-recruitment.jpg';
import heroDesktopImg from '../assets/hero-desktop.png';

export const licensingAuthorities = [
  {
    id: 'dha',
    name: 'DHA – Dubai Health Authority',
    region: 'Dubai, UAE',
    summary:
      'Complete Sheryan account setup, DataFlow verification, Prometric exam scheduling, and DHA Eligibility Letter support.',
    eligibility: 'Doctors, Nurses, Physiotherapists & Allied Health with recognized degrees and 2+ years clinical experience.',
    timeline: '4–8 Weeks (depending on PSV & exam slot)',
  },
  {
    id: 'doh-haad',
    name: 'DOH / HAAD – Abu Dhabi',
    region: 'Abu Dhabi & Al Ain, UAE',
    summary:
      'TAMM / DOH credentialing, DataFlow primary source verification, Pearson VUE exam preparation, and license activation guidance.',
    eligibility: 'Qualified medical & allied health professionals meeting DOH PQR criteria.',
    timeline: '5–9 Weeks',
  },
  {
    id: 'moh',
    name: 'MOH – UAE Ministry of Health',
    region: 'Sharjah, Ajman & Northern Emirates',
    summary:
      'End-to-end MOHAP portal filing, document verification, Prometric exam readiness, and evaluation letter issuance.',
    eligibility: 'Healthcare professionals targeting Northern Emirates healthcare facilities.',
    timeline: '4–8 Weeks',
  },
  {
    id: 'scfhs',
    name: 'Saudi Commission (SCFHS)',
    region: 'Kingdom of Saudi Arabia',
    summary:
      'Mumaris Plus registration, DataFlow PSV, professional classification, and Saudi Prometric exam preparation.',
    eligibility: 'Doctors, Nurses, Physiotherapists & Allied Health meeting SCFHS classification.',
    timeline: '5–10 Weeks',
  },
  {
    id: 'oman',
    name: 'Oman Prometric (OMSB)',
    region: 'Sultanate of Oman',
    summary:
      'Oman Medical Specialty Board Prometric scheduling, DataFlow verification, and MOH Oman viva/licensing support.',
    eligibility: 'Eligible doctors, nurses, and allied health clinicians.',
    timeline: '4–8 Weeks',
  },
  {
    id: 'qatar',
    name: 'Qatar (DHP / MOPH)',
    region: 'Doha, Qatar',
    summary:
      'Department of Healthcare Professions evaluation, Qatar Prometric prep, and primary source verification.',
    eligibility: 'Qualified healthcare professionals meeting DHP Qatar standards.',
    timeline: '6–10 Weeks',
  },
  {
    id: 'uk-ireland',
    name: 'UK & Ireland Registration',
    region: 'United Kingdom & Ireland',
    summary:
      'Advisory & registration support for GMC, NMC, HCPC (UK) and NMBI, CORU, IMC (Ireland) pathways.',
    eligibility: 'Doctors, Nurses & Physiotherapists meeting English and academic equivalency rules.',
    timeline: 'Varies by regulatory board',
  },
];

export const services = [
  {
    id: 'healthcare-licensing',
    title: 'Healthcare Licensing Services',
    shortSubtitle: 'DHA, DOH, MOH, SCFHS & more',
    shortDescription:
      'End-to-end healthcare licensing support for DHA Dubai, DOH Abu Dhabi, MOH UAE, SCFHS Saudi, Oman Prometric, Qatar, UK & Ireland.',
    icon: ShieldPlus,
    image: aboutSkylineImg,
    route: '/services/healthcare-licensing',
    pricingNote: 'Pricing varies by authority, profession, and package. Contact us for current pricing.',
    detailedDescription:
      'Navigating international healthcare licensing requires precision, up-to-date regulatory knowledge, and error-free documentation. MAMI Career Consultant provides dedicated licensing guidance for doctors, nurses, physiotherapists, and allied healthcare professionals across the UAE, GCC, UK, and Ireland.',
    benefits: [
      'Complete regulatory portal setup & profile evaluation',
      'DataFlow Primary Source Verification (PSV) coordination',
      'Prometric / Pearson VUE / CBT exam slot guidance',
      'Zero guesswork with transparent step-by-step tracking',
    ],
    process: [
      'Qualification & clinical experience eligibility check',
      'Document audit and Good Standing Certificate guidance',
      'DataFlow PSV submission and regulatory portal filing',
      'Exam preparation, slot booking, and Eligibility Letter issuance',
    ],
    eligibility: [
      'MBBS / MD / BDS / B.Sc Nursing / GNM / BPT / MPT / Allied Health Diploma or Degree',
      'Valid home-country professional registration certificate',
      'Required post-qualification clinical experience (typically 2+ years for GCC)',
    ],
    requiredDocuments: [
      'Valid Passport copy & recent white-background photograph',
      'Degree / Diploma certificates and academic mark sheets',
      'Home-country registration / license certificate',
      'Experience certificates & Good Standing Certificate (GSC)',
    ],
    authorities: ['DHA – Dubai', 'DOH / HAAD – Abu Dhabi', 'MOH – UAE', 'SCFHS – Saudi Arabia', 'Oman Prometric', 'Qatar DHP', 'UK & Ireland'],
  },
  {
    id: 'international-registration',
    title: 'International Registration Support',
    shortSubtitle: 'UK, Ireland & Global Guidance',
    shortDescription:
      'Structured global registration guidance across UK, Ireland, UAE, Saudi Arabia, Oman, Qatar, and other GCC destinations.',
    icon: Globe,
    image: aboutSkylineImg,
    route: '/services/international-registration',
    pricingNote: 'Pricing varies by destination country and regulatory council.',
    detailedDescription:
      'Every destination country maintains distinct professional registration boards, credential evaluation rules, and language requirements. We build a clear country-specific roadmap so you can pursue international registration smoothly without costly rejections or delays.',
    benefits: [
      'Country-by-country regulatory roadmap tailored to your specialty',
      'Assistance with NMC, HCPC, GMC, NMBI, CORU & GCC boards',
      'Syllabus & clinical hours verification guidance',
      'Aligned timeline for exams, English tests & registration',
    ],
    process: [
      'Target country & regulator selection based on your credentials',
      'Academic transcript & clinical placement mapping',
      'Application compilation & regulator portal submission',
      'Decision letter follow-up & post-registration career support',
    ],
    eligibility: [
      'Registered Doctors, Nurses, Midwives, Physiotherapists & Allied Health Staff',
      'Active professional registration in home jurisdiction',
      'Readiness to meet target country English/exam benchmarks',
    ],
    requiredDocuments: [
      'Degree certificate, transcripts & detailed syllabus (where needed)',
      'Valid professional registration & Good Standing Certificate',
      'Employer reference letters & passport',
      'IELTS / OET scorecard (for UK / Ireland pathways)',
    ],
    authorities: ['UK (GMC / NMC / HCPC)', 'Ireland (NMBI / CORU)', 'UAE (DHA / DOH / MOH)', 'Saudi Arabia (SCFHS)', 'Qatar (DHP)', 'Oman (OMSB)'],
  },
  {
    id: 'training',
    title: 'Online Training & Exam Preparation',
    shortSubtitle: 'DHA, DOH, MOH & GCC Prometric',
    shortDescription:
      'Expert-led live online training sessions covering DHA, DOH, MOH, and GCC Prometric healthcare licensing examinations.',
    icon: GraduationCap,
    image: heroDesktopImg,
    route: '/services/training',
    pricingNote: 'Contact us for current pricing across individual & combo training packages.',
    detailedDescription:
      'Our specialized online coaching programs are designed by experienced healthcare educators to help doctors, nurses, and physiotherapists master licensing exam blueprints with clarity and confidence.',
    benefits: [
      'Flexible live online batches suited for working clinicians',
      'Updated exam-blueprint topic coverage & high-yield clinical notes',
      'Dedicated doubt-clearing & mentor feedback',
      'Structured study schedules tailored to your exam date',
    ],
    process: [
      'Diagnostic assessment of your target exam & specialty',
      'Enrollment into structured online training modules',
      'Topic-by-topic clinical & scenario-based review',
      'Full-length timed mock exams & readiness sign-off',
    ],
    eligibility: [
      'Healthcare professionals preparing for DHA, DOH/HAAD, MOH, SCFHS, Oman, or Qatar Prometric',
      'Doctors, Nurses, Physiotherapists & Allied Healthcare candidates',
    ],
    requiredDocuments: [
      'Qualification & target exam details during enrollment',
      'Stable internet connection for live online sessions',
    ],
    authorities: ['DHA Prometric', 'DOH / HAAD Pearson VUE', 'MOHAP Exam', 'SCFHS Saudi Prometric', 'Oman & Qatar Prometric'],
  },
  {
    id: 'mock-tests',
    title: 'Mock Tests & Interview Preparation',
    shortSubtitle: 'Practice. Prepare. Excel.',
    shortDescription:
      'Realistic computer-based mock examinations, practice question banks, and international hospital interview coaching.',
    icon: ClipboardCheck,
    image: recruitmentImg,
    route: '/services/mock-tests',
    pricingNote: 'Pricing varies by test series and interview coaching package.',
    detailedDescription:
      'Passing licensing exams and clearing international hospital interviews requires familiarity with clinical question styles and employer expectations. Our mock test series and interview prep build speed, accuracy, and poise.',
    benefits: [
      'CBT-style timed mock exams simulating real Prometric & Pearson VUE tests',
      'Detailed answer rationales & weak-area analytics',
      'One-on-one mock interviews with clinical & HR feedback',
      'Confidence building for GCC, UK & Ireland healthcare panels',
    ],
    process: [
      'Select your profession & target licensing/employer panel',
      'Complete timed practice tests & score review',
      'Attend personalized answer-technique & interview coaching',
      'Final readiness check before exam or hospital interview',
    ],
    eligibility: [
      'Candidates scheduled for licensing exams or hospital interviews',
      'Doctors, Nurses, Physiotherapists & Allied Health graduates',
    ],
    requiredDocuments: [
      'Updated CV (for interview coaching)',
      'Target licensing authority / employer details',
    ],
    authorities: ['Prometric CBT', 'Pearson VUE CBT', 'UAE & GCC Hospital Panels', 'UK & Ireland NHS / HSE Interviews'],
  },
  {
    id: 'recruitment',
    title: 'International Recruitment / Job Assistance',
    shortSubtitle: 'UAE, GCC & Beyond',
    shortDescription:
      'Targeted job assistance, international healthcare CV building, application tracking, and interview coordination across UAE, GCC, UK & Ireland.',
    icon: BriefcaseBusiness,
    image: recruitmentImg,
    route: '/services/recruitment',
    pricingNote: 'Contact us for current job assistance & career placement support details.',
    detailedDescription:
      'Once your licensing or registration is underway, MAMI Career Consultant connects your profile with international healthcare job opportunities across leading clinics, rehabilitation centers, and hospitals.',
    benefits: [
      'Professionally formatted international healthcare CV',
      'Access to active openings across UAE, Saudi Arabia, Qatar, Oman, UK & Ireland',
      'Employer application submission & interview coordination',
      'Offer review & pre-departure orientation guidance',
    ],
    process: [
      'Career profile & license readiness evaluation',
      'International healthcare CV & portfolio optimization',
      'Targeted matching with partner employers & job openings',
      'Interview preparation, scheduling & onboarding guidance',
    ],
    eligibility: [
      'Licensed or license-eligible Doctors, Nurses, Physiotherapists & Allied Health staff',
      'Relevant post-qualification hospital or clinic experience',
    ],
    requiredDocuments: [
      'Updated CV with clinical procedures & department details',
      'Licensing / Eligibility letter or DataFlow status',
      'Passport & experience letters',
    ],
    authorities: ['UAE Clinics & Hospitals', 'GCC Medical Groups', 'UK & Ireland Care Providers'],
  },
  {
    id: 'documentation',
    title: 'Documentation & Verification Support',
    shortSubtitle: 'Complete Assistance',
    shortDescription:
      'Thorough document review, DataFlow PSV coordination, attestation guidance, and error-free regulatory file preparation.',
    icon: FileCheck,
    image: aboutSkylineImg,
    route: '/services/documentation',
    pricingNote: 'Pricing varies by number of documents, authority, and verification scope.',
    detailedDescription:
      'Missing signatures, mismatched dates, or improperly formatted experience letters are the leading cause of licensing delays. Our documentation specialists audit every single file before submission.',
    benefits: [
      'Line-by-line document audit before DataFlow or regulator submission',
      'Experience letter & Good Standing Certificate format guidance',
      'Attestation, apostille & translation advisory',
      'Active follow-up on verification discrepancies',
    ],
    process: [
      'Submit Details',
      'Document Review',
      'Verification (DataFlow / PSV)',
      'Application Support',
      'Submission',
      'Follow-up',
    ],
    eligibility: [
      'All healthcare professionals applying for international licensing or registration',
    ],
    requiredDocuments: [
      'Academic certificates & mark sheets',
      'Registration & Good Standing certificates',
      'Hospital/clinic experience letters',
      'Passport & ID documents',
    ],
    authorities: ['DataFlow Group PSV', 'HRD / MEA Attestation Guidance', 'GCC & European Regulators'],
  },
  {
    id: 'career-counselling',
    title: 'Career Counselling',
    shortSubtitle: 'Plan Your Global Career',
    shortDescription:
      'Personalized one-on-one guidance on country selection, licensing pathways, timelines, and long-term global career planning.',
    icon: Users,
    image: recruitmentImg,
    route: '/services/career-counselling',
    pricingNote: 'Contact us to book your personalized career counselling session.',
    detailedDescription:
      'Choosing the right country, licensing exam, and timeline can save months of effort and significant expense. Led by Dr. Ramyakrishna and our consultancy team, we provide honest, transparent career counselling tailored to your qualifications.',
    benefits: [
      'Personalized country & licensing pathway comparison',
      'Honest eligibility & timeline assessment before you invest',
      'Custom roadmap covering exams, documents, and job market demand',
      'Ongoing mentorship from initial planning to international placement',
    ],
    process: [
      'Book a 1-on-1 counselling session (in-person in Hyderabad or online)',
      'Review qualifications, experience & career preferences',
      'Compare UAE, GCC, UK & Ireland pathways',
      'Receive an actionable step-by-step career blueprint',
    ],
    eligibility: [
      'Final-year healthcare students, fresh graduates & experienced clinicians',
      'Doctors, Nurses, Physiotherapists & Allied Healthcare Professionals',
    ],
    requiredDocuments: [
      'Current CV or summary of education & clinical experience',
    ],
    authorities: ['Global Healthcare Career Advisory'],
  },
];

