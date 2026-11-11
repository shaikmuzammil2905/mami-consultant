import Hero from '../components/Hero';
import ServiceGrid from '../components/ServiceGrid';
import AboutSection from '../components/AboutSection';
import GlobalOpportunities from '../components/GlobalOpportunities';
import TrainingSection from '../components/TrainingSection';
import CareersPartnershipsSection from '../components/CareersPartnershipsSection';
import CertificationsSection from '../components/CertificationsSection';
import FounderGallerySection from '../components/FounderGallerySection';
import TestimonialSlider from '../components/TestimonialSlider';
import CTASection from '../components/CTASection';
import PageSEO from '../components/PageSEO';

export default function Home() {
  return (
    <>
      <PageSEO
        title="MAMI Career Consultant | Global Healthcare Career & Licensing Support"
        description="MAMI Career Consultant provides healthcare licensing guidance, international registration support, training, exam preparation, recruitment and career assistance for medical and allied healthcare professionals."
      />
      <Hero />
      <AboutSection />
      <ServiceGrid compact={true} />
      <GlobalOpportunities />
      <TrainingSection />
      <CareersPartnershipsSection />
      <CertificationsSection />
      <FounderGallerySection />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}

