import { useState, useEffect } from 'react';
import { Info, Save, Upload, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';

export default function AboutManager() {
  const { refreshContent } = useSiteContent();
  const [aboutData, setAboutData] = useState({
    badge: 'About MAMI Career Consultant',
    title: 'Your Trusted Bridge to International Healthcare Systems',
    subtitle: 'Empowering Healthcare Ambitions with Ethics and Transparency',
    description:
      'Founded by Senior Neuro Physiotherapist & UK Gold Medalist Dr. Ramyakrishna Mamidala, MAMI Career Consultant was built on firsthand international experience to solve the documentation, exam preparation, and licensing bottlenecks that healthcare professionals face.',
    cta_primary_text: 'Learn More About Our Journey',
    cta_primary_link: '/why-choose-us',
    image_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function loadAboutFromDb() {
      try {
        const { data, error } = await supabase
          .from('website_sections')
          .select('*')
          .eq('section_id', 'about')
          .maybeSingle();

        if (!error && data) {
          setAboutData((prev) => ({
            ...prev,
            badge: data.badge || prev.badge,
            title: data.title || prev.title,
            subtitle: data.subtitle || prev.subtitle,
            description: data.description || prev.description,
            cta_primary_text: data.cta_primary_text || prev.cta_primary_text,
            cta_primary_link: data.cta_primary_link || prev.cta_primary_link,
            image_url: data.image_url || '',
          }));
        }
      } catch (err) {
        console.warn('About load note:', err);
      }
    }
    loadAboutFromDb();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setSaveStatus('');
    try {
      const res = await uploadToCloudinary(file, 'mami_about');
      setAboutData((prev) => ({ ...prev, image_url: res.url }));
      setSaveStatus('About image uploaded successfully!');
    } catch (err) {
      setSaveStatus('Notice: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      const payload = {
        section_id: 'about',
        badge: aboutData.badge,
        title: aboutData.title,
        subtitle: aboutData.subtitle,
        description: aboutData.description,
        cta_primary_text: aboutData.cta_primary_text,
        cta_primary_link: aboutData.cta_primary_link,
        image_url: aboutData.image_url,
        is_visible: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('website_sections')
        .upsert([payload], { onConflict: 'section_id' });

      if (error) throw error;

      await refreshContent();
      setSaveStatus('About section updated and published to live website!');
    } catch (err) {
      alert('Failed to save About section: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">About Section Manager</h2>
          <p className="text-xs text-gray-500">
            Control the About section copy, mission statement, and imagery on the homepage
          </p>
        </div>

        <a
          href="/#about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0799A8] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview About Section</span>
        </a>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          {saveStatus}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Badge Title
          </label>
          <input
            type="text"
            value={aboutData.badge}
            onChange={(e) => setAboutData({ ...aboutData, badge: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Section Title
          </label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
            className="w-full text-sm font-bold text-[#0B3566] p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Subtitle
          </label>
          <input
            type="text"
            value={aboutData.subtitle}
            onChange={(e) => setAboutData({ ...aboutData, subtitle: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            About Description Paragraph
          </label>
          <textarea
            rows={4}
            value={aboutData.description}
            onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none leading-relaxed"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#0B3566]">About Doctor / Clinic Image</h4>
              <p className="text-[11px] text-gray-500">Cloudinary image or public URL</p>
            </div>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-[#0799A8] text-[#0799A8] font-bold text-xs cursor-pointer shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingImage ? 'Uploading...' : 'Upload Cloudinary'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={aboutData.image_url}
            onChange={(e) => setAboutData({ ...aboutData, image_url: e.target.value })}
            placeholder="https://res.cloudinary.com/... or asset URL"
            className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
          />
        </div>

        <div className="flex items-center justify-end pt-3 border-t">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing Updates...' : 'Save & Publish About'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

