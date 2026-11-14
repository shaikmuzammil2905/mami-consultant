import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { services as defaultServices } from '../data/services';
import { jobs as defaultJobs } from '../data/jobs';
import { testimonials as defaultTestimonials } from '../data/testimonials';
import { siteConfig } from '../data/siteConfig';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState({
    brand_name: siteConfig?.businessName || 'MAMI Career Consultant',
    brand_short: siteConfig?.brandName || 'MAMI',
    tagline: siteConfig?.tagline || 'Clear Guidance • Proper Documentation • Global Career Support.',
    phone: siteConfig?.phone || '+91 9533079819',
    whatsapp: siteConfig?.whatsappDisplay || siteConfig?.phone || '+91 9533079819',
    email: siteConfig?.email || 'contact@mamiconsultant.com',
    address: siteConfig?.address || 'Rajiv Swagruha Township, Bandlaguda, Nagole, Hyderabad, India',
    owner_name: siteConfig?.owner || 'Dr. Ramyakrishna Mamidala',
    logo_url: null,
    announcement_text: 'DHA & UK HCPC Exam Batches Now Open — Enrol Today for Fast-Track Success',
    announcement_enabled: true,
    social_links: {
      whatsapp: 'https://wa.me/919533079819',
      instagram: 'https://instagram.com/mami_career_consultant',
      facebook: 'https://facebook.com/mamiconsultant',
      linkedin: 'https://linkedin.com/company/mami-career-consultant',
      youtube: 'https://youtube.com/@mamiconsultant',
    },
    footer_text:
      'MAMI Career Consultant empowers healthcare professionals across India with genuine, transparent international licensing, exam preparation, verification, and recruitment services.',
  });

  const [sections, setSections] = useState({
    hero: {
      title: 'Navigate Your Global Healthcare Career with Absolute Confidence',
      subtitle: 'Clear Guidance • Proper Documentation • Global Career Support.',
      description:
        'Empowering Doctors, Nurses, Physiotherapists & Allied Healthcare Professionals to achieve DHA, DOH, MOH, SCFHS, UK HCPC & Ireland licensure with complete transparency.',
      badge: 'Premier Healthcare Career Consultancy',
      cta_primary_text: 'Explore Licensing Pathways',
      cta_primary_link: '/services/healthcare-licensing',
      cta_secondary_text: 'Speak with Our Founder',
      cta_secondary_link: '/why-choose-us',
      image_url: null,
    },
    about: {
      title: 'Your Trusted Bridge to International Healthcare Systems',
      subtitle: 'Empowering Healthcare Ambitions with Ethics and Transparency',
      description:
        'Founded by Senior Neuro Physiotherapist & UK Gold Medalist Dr. Ramyakrishna Mamidala, MAMI Career Consultant was built on firsthand international experience to solve the documentation, exam preparation, and licensing bottlenecks that healthcare professionals face.',
      badge: 'About MAMI Career Consultant',
    },
  });

  const [services, setServices] = useState(defaultServices);
  const [jobs, setJobs] = useState(defaultJobs);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);

  // Fetch all published content from Supabase
  const loadContent = useCallback(async () => {
    try {
      // 1. Site Settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (!settingsError && settingsData) {
        setSiteSettings((prev) => ({ ...prev, ...settingsData }));
        setIsLiveDb(true);
      }

      // 2. Website Sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('website_sections')
        .select('*')
        .eq('is_visible', true);

      if (!sectionsError && sectionsData && sectionsData.length > 0) {
        const secMap = {};
        sectionsData.forEach((sec) => {
          secMap[sec.section_id] = sec;
        });
        setSections((prev) => ({ ...prev, ...secMap }));
      }

      // 3. Services (Merge dynamic data with default icons/fallback images)
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!servicesError && servicesData && servicesData.length > 0) {
        const merged = servicesData.map((dbSvc) => {
          const matchedDefault = defaultServices.find((d) => d.id === dbSvc.id);
          return {
            ...matchedDefault,
            ...dbSvc,
            shortSubtitle: dbSvc.short_subtitle || matchedDefault?.shortSubtitle || '',
            shortDescription: dbSvc.short_description || matchedDefault?.shortDescription || '',
            detailedDescription: dbSvc.detailed_description || matchedDefault?.detailedDescription || '',
            image: dbSvc.image_url || matchedDefault?.image,
            icon: matchedDefault?.icon || defaultServices[0].icon,
            route: dbSvc.route || matchedDefault?.route || `/services/${dbSvc.id}`,
            authorities: dbSvc.authorities || matchedDefault?.authorities || [],
            benefits: dbSvc.benefits || matchedDefault?.benefits || [],
            process: dbSvc.process || matchedDefault?.process || [],
            eligibility: dbSvc.eligibility || matchedDefault?.eligibility || [],
            requiredDocuments: dbSvc.required_documents || matchedDefault?.requiredDocuments || [],
          };
        });
        setServices(merged);
      }

      // 4. Job Listings
      const { data: jobsData, error: jobsError } = await supabase
        .from('job_listings')
        .select('*')
        .eq('status', 'active')
        .order('created_date', { ascending: false });

      if (!jobsError && jobsData && jobsData.length > 0) {
        const mappedJobs = jobsData.map((j) => ({
          id: j.id,
          title: j.title,
          profession: j.profession,
          description: j.description,
          location: j.location,
          country: j.country,
          experience: j.experience,
          qualification: j.qualification,
          employmentType: j.employment_type || 'Full-Time',
          authority: j.authority || '',
          requirements: Array.isArray(j.requirements) ? j.requirements : [],
          responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities : [],
          benefits: Array.isArray(j.benefits) ? j.benefits : [],
          createdDate: j.created_date ? new Date(j.created_date).toISOString().split('T')[0] : '2026-03-01',
        }));
        setJobs(mappedJobs);
      }

      // 5. Testimonials
      const { data: testData, error: testError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!testError && testData && testData.length > 0) {
        const mappedTestimonials = testData.map((t, idx) => {
          const fallback = defaultTestimonials[idx % defaultTestimonials.length];
          return {
            id: t.id,
            name: t.name,
            qualification: t.qualification || '',
            role: t.role || '',
            location: t.location,
            rating: t.rating || 5,
            quote: t.quote,
            avatar: t.avatar_url || fallback?.avatar,
          };
        });
        setTestimonials(mappedTestimonials);
      }
    } catch (err) {
      console.warn('Supabase Content sync note (falling back to offline defaults):', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + Realtime Channel Subscription
  useEffect(() => {
    loadContent();

    // Listen for live database changes across public tables
    const channel = supabase
      .channel('public:site-content')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        () => loadContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'website_sections' },
        () => loadContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'services' },
        () => loadContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'job_listings' },
        () => loadContent()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'testimonials' },
        () => loadContent()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadContent]);

  // Submit Contact Inquiry
  const submitInquiry = async (formData) => {
    try {
      const payload = {
        full_name: formData.name || formData.fullName,
        email: formData.email,
        phone: formData.phone || formData.mobile,
        profession: formData.profession || '',
        service_interest: formData.service || formData.serviceInterest || '',
        country_interest: formData.country || formData.countryInterest || '',
        message: formData.message || '',
        source_page: formData.sourcePage || 'contact',
      };

      const { data, error } = await supabase.from('contact_inquiries').insert([payload]).select();
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Contact inquiry submission error:', err);
      return { success: false, error: err.message };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        siteSettings,
        sections,
        services,
        jobs,
        testimonials,
        loading,
        isLiveDb,
        refreshContent: loadContent,
        submitInquiry,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a ContentProvider');
  }
  return context;
}

