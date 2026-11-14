import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { services as defaultServices } from '../data/services';
import { jobs as defaultJobs } from '../data/jobs';
import { testimonials as defaultTestimonials } from '../data/testimonials';
import { siteConfig } from '../data/siteConfig';

const ContentContext = createContext(null);

const STORAGE_KEYS = {
  SERVICES: 'mami_cms_services',
  JOBS: 'mami_cms_jobs',
  SECTIONS: 'mami_cms_sections',
  SETTINGS: 'mami_cms_settings',
  TESTIMONIALS: 'mami_cms_testimonials',
};

function getLocalData(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalData(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage save notice:', e);
  }
}

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
      background_url: null,
      extra_data: {},
    },
    about: {
      title: 'Your Trusted Bridge to International Healthcare Systems',
      subtitle: 'Empowering Healthcare Ambitions with Ethics and Transparency',
      description:
        'Founded by Senior Neuro Physiotherapist & UK Gold Medalist Dr. Ramyakrishna Mamidala, MAMI Career Consultant was built on firsthand international experience to solve the documentation, exam preparation, and licensing bottlenecks that healthcare professionals face.',
      badge: 'About MAMI Career Consultant',
      image_url: null,
    },
  });

  const [services, setServices] = useState(defaultServices);
  const [jobs, setJobs] = useState(defaultJobs);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);

  // Fetch all published content from Supabase + merge local CMS cache
  const loadContent = useCallback(async () => {
    try {
      // 1. Site Settings
      const localSettings = getLocalData(STORAGE_KEYS.SETTINGS, null);
      if (localSettings) {
        setSiteSettings((prev) => ({ ...prev, ...localSettings }));
      }

      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .maybeSingle();

      if (!settingsError && settingsData) {
        setSiteSettings((prev) => ({ ...prev, ...settingsData, ...(localSettings || {}) }));
        setIsLiveDb(true);
      }

      // 2. Website Sections
      const localSections = getLocalData(STORAGE_KEYS.SECTIONS, {});
      if (localSections && Object.keys(localSections).length > 0) {
        setSections((prev) => ({ ...prev, ...localSections }));
      }

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('website_sections')
        .select('*')
        .eq('is_visible', true);

      if (!sectionsError && sectionsData && sectionsData.length > 0) {
        const secMap = {};
        sectionsData.forEach((sec) => {
          secMap[sec.section_id] = sec;
        });
        setSections((prev) => ({ ...prev, ...secMap, ...localSections }));
      }

      // 3. Services (Merge dynamic database data + local additions/updates)
      const localServices = getLocalData(STORAGE_KEYS.SERVICES, []);
      let baseServices = defaultServices;

      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (!servicesError && servicesData && servicesData.length > 0) {
        baseServices = servicesData.map((dbSvc) => {
          const matchedDefault = defaultServices.find((d) => d.id === dbSvc.id);
          return {
            ...matchedDefault,
            ...dbSvc,
            id: dbSvc.id,
            title: dbSvc.title || matchedDefault?.title || '',
            shortSubtitle: dbSvc.short_subtitle || matchedDefault?.shortSubtitle || '',
            shortDescription: dbSvc.short_description || matchedDefault?.shortDescription || '',
            detailedDescription: dbSvc.detailed_description || matchedDefault?.detailedDescription || '',
            image: dbSvc.image_url || matchedDefault?.image || defaultServices[0].image,
            image_url: dbSvc.image_url,
            icon: matchedDefault?.icon || defaultServices[0].icon,
            route: dbSvc.route || matchedDefault?.route || `/services/${dbSvc.id}`,
            authorities: dbSvc.authorities || matchedDefault?.authorities || [],
            benefits: dbSvc.benefits || matchedDefault?.benefits || [],
            process: dbSvc.process || matchedDefault?.process || [],
            eligibility: dbSvc.eligibility || matchedDefault?.eligibility || [],
            requiredDocuments: dbSvc.required_documents || matchedDefault?.requiredDocuments || [],
          };
        });
      }

      // Overlay local services (updates to existing or newly created services)
      if (localServices && localServices.length > 0) {
        const mergedMap = new Map();
        baseServices.forEach((s) => mergedMap.set(s.id, s));
        localServices.forEach((locSvc) => {
          if (locSvc.is_published !== false) {
            const existing = mergedMap.get(locSvc.id) || defaultServices.find((d) => d.id === locSvc.id);
            mergedMap.set(locSvc.id, {
              ...existing,
              ...locSvc,
              id: locSvc.id,
              title: locSvc.title || existing?.title || '',
              shortSubtitle: locSvc.short_subtitle || locSvc.shortSubtitle || existing?.shortSubtitle || '',
              shortDescription: locSvc.short_description || locSvc.shortDescription || existing?.shortDescription || '',
              detailedDescription: locSvc.detailed_description || locSvc.detailedDescription || existing?.detailedDescription || '',
              image: locSvc.image_url || locSvc.image || existing?.image || defaultServices[0].image,
              image_url: locSvc.image_url || existing?.image_url,
              icon: existing?.icon || defaultServices[0].icon,
              route: locSvc.route || existing?.route || `/services/${locSvc.id}`,
            });
          } else {
            mergedMap.delete(locSvc.id);
          }
        });
        setServices(Array.from(mergedMap.values()));
      } else {
        setServices(baseServices);
      }

      // 4. Job Listings (Merge dynamic database data + local additions/updates)
      const localJobs = getLocalData(STORAGE_KEYS.JOBS, []);
      let baseJobs = defaultJobs;

      const { data: jobsData, error: jobsError } = await supabase
        .from('job_listings')
        .select('*')
        .eq('status', 'active');

      if (!jobsError && jobsData && jobsData.length > 0) {
        baseJobs = jobsData.map((j) => ({
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
          status: j.status || 'active',
          requirements: Array.isArray(j.requirements) ? j.requirements : [],
          responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities : [],
          benefits: Array.isArray(j.benefits) ? j.benefits : [],
          createdDate: j.created_date ? new Date(j.created_date).toISOString().split('T')[0] : '2026-03-01',
        }));
      }

      // Overlay local jobs
      if (localJobs && localJobs.length > 0) {
        const jobMap = new Map();
        baseJobs.forEach((j) => jobMap.set(j.id, j));
        localJobs.forEach((locJob) => {
          if (locJob.status === 'active') {
            jobMap.set(locJob.id, {
              ...locJob,
              employmentType: locJob.employment_type || locJob.employmentType || 'Full-Time',
              status: locJob.status || 'active',
            });
          } else if (locJob.status === 'closed' || locJob.status === 'draft') {
            jobMap.delete(locJob.id);
          }
        });
        setJobs(Array.from(jobMap.values()));
      } else {
        setJobs(baseJobs);
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
      console.warn('Supabase Content sync note:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + Realtime Channel Subscription + Cross-Tab/Window Event
  useEffect(() => {
    loadContent();

    const handleContentEvent = () => loadContent();
    window.addEventListener('mami_content_updated', handleContentEvent);
    window.addEventListener('storage', handleContentEvent);

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
      window.removeEventListener('mami_content_updated', handleContentEvent);
      window.removeEventListener('storage', handleContentEvent);
      supabase.removeChannel(channel);
    };
  }, [loadContent]);

  // Robust Direct Sync Methods (Persists instantly to local cache + Supabase with RLS fallback)
  const saveServiceDirect = async (svcData) => {
    // 1. Immediately store in local cache
    const currentLocals = getLocalData(STORAGE_KEYS.SERVICES, []);
    const filtered = currentLocals.filter((s) => s.id !== svcData.id);
    const updatedLocals = [...filtered, svcData];
    setLocalData(STORAGE_KEYS.SERVICES, updatedLocals);

    // 2. Dispatch event so UI re-renders instantly
    window.dispatchEvent(new Event('mami_content_updated'));
    await loadContent();

    // 3. Try Supabase upsert
    try {
      const { error } = await supabase.from('services').upsert([svcData], { onConflict: 'id' });
      if (error) {
        console.warn('Supabase RLS/Sync notice (cached locally):', error.message);
        return { success: true, warning: error.message };
      }
      return { success: true };
    } catch (e) {
      console.warn('Supabase upsert caught:', e);
      return { success: true, warning: e.message };
    }
  };

  const saveJobDirect = async (jobData) => {
    // 1. Immediately store in local cache
    const currentLocals = getLocalData(STORAGE_KEYS.JOBS, []);
    const filtered = currentLocals.filter((j) => j.id !== jobData.id);
    const updatedLocals = [...filtered, jobData];
    setLocalData(STORAGE_KEYS.JOBS, updatedLocals);

    // 2. Dispatch event so UI re-renders instantly
    window.dispatchEvent(new Event('mami_content_updated'));
    await loadContent();

    // 3. Try Supabase upsert
    try {
      const { error } = await supabase.from('job_listings').upsert([jobData], { onConflict: 'id' });
      if (error) {
        console.warn('Supabase RLS/Sync notice (cached locally):', error.message);
        return { success: true, warning: error.message };
      }
      return { success: true };
    } catch (e) {
      console.warn('Supabase upsert caught:', e);
      return { success: true, warning: e.message };
    }
  };

  const saveSectionDirect = async (sectionId, sectionData) => {
    const currentLocals = getLocalData(STORAGE_KEYS.SECTIONS, {});
    const updatedLocals = { ...currentLocals, [sectionId]: sectionData };
    setLocalData(STORAGE_KEYS.SECTIONS, updatedLocals);

    window.dispatchEvent(new Event('mami_content_updated'));
    await loadContent();

    try {
      const payload = { section_id: sectionId, ...sectionData };
      const { error } = await supabase
        .from('website_sections')
        .upsert([payload], { onConflict: 'section_id' });
      if (error) {
        console.warn('Supabase sections RLS notice:', error.message);
        return { success: true, warning: error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: true, warning: e.message };
    }
  };

  const saveSettingsDirect = async (settingsData) => {
    setLocalData(STORAGE_KEYS.SETTINGS, settingsData);
    window.dispatchEvent(new Event('mami_content_updated'));
    await loadContent();

    try {
      const payload = { id: 'global', ...settingsData };
      const { error } = await supabase
        .from('site_settings')
        .upsert([payload], { onConflict: 'id' });
      if (error) {
        console.warn('Supabase settings RLS notice:', error.message);
        return { success: true, warning: error.message };
      }
      return { success: true };
    } catch (e) {
      return { success: true, warning: e.message };
    }
  };

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
        saveServiceDirect,
        saveJobDirect,
        saveSectionDirect,
        saveSettingsDirect,
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
