import heroDesktopImg from '../assets/hero-desktop.png';
import heroMobileImg from '../assets/hero-mobile.png';
import logoImg from '../assets/logo.png';
import logoLightImg from '../assets/logo-light.png';

export const siteConfig = {
  businessName: 'MAMI Career Consultant',
  brandName: 'MAMI',
  subtitle: 'Career Consultant & Physio Care',
  owner: 'Dr. Ramyakrishna',
  phone: '+91 9533079819',
  phoneHref: 'tel:+919533079819',
  whatsappNumber: '919533079819',
  whatsappDisplay: '+91 9533079819',
  email: 'info@mami.in',
  emailDisplay: 'info@mami.in (Coming Soon)',
  emailNote: 'To be updated',
  address: 'Rajiv Swagruha Township, Bandlaguda, Nagole, Hyderabad.',
  tagline: 'Clear Guidance • Proper Documentation • Global Career Support.',
  defaultWhatsAppMessage:
    'Hello MAMI Career Consultant, I would like to know more about your international healthcare career services.',
  logo: logoImg,
  logoLight: logoLightImg,
  socialLinks: [
    { name: 'Facebook', href: '#facebook', platform: 'facebook' },
    { name: 'LinkedIn', href: '#linkedin', platform: 'linkedin' },
    { name: 'YouTube', href: '#youtube', platform: 'youtube' },
  ],
  heroImages: {
    desktopPrimary: heroDesktopImg,
    mobilePrimary: heroMobileImg,
  },
  heroSlides: [
    {
      id: 'global-careers',
      badge: 'International Healthcare Consultancy',
      headingStart: 'Your ',
      headingHighlight: 'Global Career',
      headingEnd: ' Starts Here',
      tagline: 'Clear Guidance • Proper Documentation • Global Career Support',
      description:
        'MAMI Career Consultant is your trusted partner for international healthcare career opportunities.',
      primaryCta: { label: 'Explore Our Services', to: '/services' },
      secondaryCta: { label: 'Contact Us', to: '/contact' },
      usePrimaryBackdrop: true,
    },
    {
      id: 'healthcare-licensing',
      badge: 'DHA • DOH • MOH • SCFHS • Prometric',
      headingStart: 'Seamless ',
      headingHighlight: 'Healthcare Licensing',
      headingEnd: ' Guidance',
      tagline: 'End-to-End Registration • DataFlow • Eligibility Letters',
      description:
        'Structured licensing and international registration pathways for doctors, nurses, physiotherapists, and allied health experts.',
      primaryCta: { label: 'Licensing Pathways', to: '/services/healthcare-licensing' },
      secondaryCta: { label: 'Enquire Now', action: 'enquiry' },
      usePrimaryBackdrop: false,
      slideKey: 'licensing',
    },
    {
      id: 'exam-training',
      badge: 'Expert-Led Online Coaching',
      headingStart: 'Focused ',
      headingHighlight: 'Exam Training',
      headingEnd: ' & Mock Tests',
      tagline: 'Live Online Sessions • Practice Exams • Interview Coaching',
      description:
        'Prepare confidently for DHA, DOH, MOH, and GCC Prometric assessments with guided mock exams and mentor support.',
      primaryCta: { label: 'Explore Training', to: '/training' },
      secondaryCta: { label: 'Book Counselling', action: 'counselling' },
      usePrimaryBackdrop: false,
      slideKey: 'training',
    },
    {
      id: 'global-recruitment',
      badge: 'UAE • Saudi Arabia • Qatar • UK • Ireland',
      headingStart: 'Trusted ',
      headingHighlight: 'Global Recruitment',
      headingEnd: ' & Job Support',
      tagline: 'CV Optimization • Hospital Interviews • Placement Support',
      description:
        'Connect with reputable international healthcare employers across UAE, GCC, UK, and Ireland with tailored career guidance.',
      primaryCta: { label: 'Explore Job Assistance', to: '/jobs' },
      secondaryCta: { label: 'Contact Us', to: '/contact' },
      usePrimaryBackdrop: false,
      slideKey: 'recruitment',
    },
  ],
  whyChoose: [
    'Expert Guidance & Support',
    'Transparent Processes',
    'Global Career Opportunities',
    'Dedicated Team',
    'Proper Documentation',
    'Professional Training',
    'Career-Focused Assistance',
    'Your Success, Our Mission',
  ],
};

export function getWhatsAppUrl(customMessage) {
  const msg = encodeURIComponent(customMessage || siteConfig.defaultWhatsAppMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
}

