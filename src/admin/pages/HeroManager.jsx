import { useState, useEffect } from 'react';
import { Sparkles, Save, Upload, Eye, Image as ImageIcon, CheckCircle, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';
import defaultDesktopHero from '../../assets/hero-desktop.png';
import defaultMobileHero from '../../assets/hero-mobile.png';

export default function HeroManager() {
  const { refreshContent } = useSiteContent();
  const [heroData, setHeroData] = useState({
    badge: 'Premier Healthcare Career Consultancy',
    title: 'Navigate Your Global Healthcare Career with Absolute Confidence',
    subtitle: 'Clear Guidance • Proper Documentation • Global Career Support.',
    description:
      'Empowering Doctors, Nurses, Physiotherapists & Allied Healthcare Professionals to achieve DHA, DOH, MOH, SCFHS, UK HCPC & Ireland licensure with complete transparency.',
    cta_primary_text: 'Explore Licensing Pathways',
    cta_primary_link: '/services/healthcare-licensing',
    cta_secondary_text: 'Speak with Our Founder',
    cta_secondary_link: '/why-choose-us',
    image_url: '',
    mobile_image_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function loadHeroFromDb() {
      try {
        const { data, error } = await supabase
          .from('website_sections')
          .select('*')
          .eq('section_id', 'hero')
          .maybeSingle();

        if (!error && data) {
          setHeroData((prev) => ({
            ...prev,
            badge: data.badge || prev.badge,
            title: data.title || prev.title,
            subtitle: data.subtitle || prev.subtitle,
            description: data.description || prev.description,
            cta_primary_text: data.cta_primary_text || prev.cta_primary_text,
            cta_primary_link: data.cta_primary_link || prev.cta_primary_link,
            cta_secondary_text: data.cta_secondary_text || prev.cta_secondary_text,
            cta_secondary_link: data.cta_secondary_link || prev.cta_secondary_link,
            image_url: data.image_url || '',
            mobile_image_url: data.extra_data?.mobile_image_url || data.background_url || '',
          }));
        }
      } catch (err) {
        console.warn('Hero load note:', err);
      }
    }
    loadHeroFromDb();
  }, []);

  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    setSaveStatus('');
    try {
      const res = await uploadToCloudinary(file, 'mami_hero');
      setHeroData((prev) => ({ ...prev, [field]: res.url }));
      setSaveStatus('Picture updated successfully! Click "Save & Publish Changes" to apply to live website.');
    } catch (err) {
      setSaveStatus('Upload notice: ' + err.message);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      const payload = {
        section_id: 'hero',
        badge: heroData.badge,
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        cta_primary_text: heroData.cta_primary_text,
        cta_primary_link: heroData.cta_primary_link,
        cta_secondary_text: heroData.cta_secondary_text,
        cta_secondary_link: heroData.cta_secondary_link,
        image_url: heroData.image_url,
        background_url: heroData.mobile_image_url,
        extra_data: { mobile_image_url: heroData.mobile_image_url },
        is_visible: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('website_sections')
        .upsert([payload], { onConflict: 'section_id' });

      if (error) throw error;

      await refreshContent();
      setSaveStatus('Hero pictures and text published live to website successfully!');
    } catch (err) {
      alert('Failed to save Hero section: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Hero Section Manager</h2>
          <p className="text-xs text-gray-500">
            Preview and change the Desktop and Mobile hero pictures, headline, and buttons
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0799A8] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Website</span>
        </a>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Hero Visuals Preview Card (Both Desktop & Mobile Pics Visible) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-[#0B3566]">Hero Section Pictures</h3>
            <p className="text-xs text-gray-500">
              Both active pictures are shown below. Change either picture anytime with instant preview.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Desktop Hero Picture */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B3566]">Desktop Hero Visual</span>
                <span className="text-[10px] font-bold text-[#0799A8] bg-[#EAFBFD] px-2 py-0.5 rounded-full border border-[#CFEFF3]">
                  Desktop View
                </span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                <img
                  src={heroData.image_url || defaultDesktopHero}
                  alt="Desktop Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-[#0799A8] text-[#0799A8] font-bold text-xs cursor-pointer shadow-xs transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingField === 'image_url' ? 'Uploading...' : 'Change Desktop Picture'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image_url')}
                  disabled={uploadingField !== null}
                  className="hidden"
                />
              </label>

              {heroData.image_url && (
                <button
                  type="button"
                  onClick={() => setHeroData({ ...heroData, image_url: '' })}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. Mobile Hero Picture */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0B3566]">Mobile Hero Visual</span>
                <span className="text-[10px] font-bold text-[#007C91] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  Mobile View
                </span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                <img
                  src={heroData.mobile_image_url || defaultMobileHero}
                  alt="Mobile Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-[#0799A8] text-[#0799A8] font-bold text-xs cursor-pointer shadow-xs transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingField === 'mobile_image_url' ? 'Uploading...' : 'Change Mobile Picture'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'mobile_image_url')}
                  disabled={uploadingField !== null}
                  className="hidden"
                />
              </label>

              {heroData.mobile_image_url && (
                <button
                  type="button"
                  onClick={() => setHeroData({ ...heroData, mobile_image_url: '' })}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Hero Copy & Headline Content
        </h3>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Hero Top Pill / Badge
          </label>
          <input
            type="text"
            value={heroData.badge}
            onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Main Headline Title
          </label>
          <input
            type="text"
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            className="w-full text-sm font-bold text-[#0B3566] p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Subtitle / Brand Tagline
          </label>
          <input
            type="text"
            value={heroData.subtitle}
            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1.5 uppercase tracking-wider">
            Hero Description Paragraph
          </label>
          <textarea
            rows={3}
            value={heroData.description}
            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
            className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none leading-relaxed"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="text-xs font-bold text-[#0B3566]">Primary Action Button</h4>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Button Label</label>
              <input
                type="text"
                value={heroData.cta_primary_text}
                onChange={(e) => setHeroData({ ...heroData, cta_primary_text: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Destination URL</label>
              <input
                type="text"
                value={heroData.cta_primary_link}
                onChange={(e) => setHeroData({ ...heroData, cta_primary_link: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="text-xs font-bold text-[#0B3566]">Secondary Action Button</h4>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Button Label</label>
              <input
                type="text"
                value={heroData.cta_secondary_text}
                onChange={(e) => setHeroData({ ...heroData, cta_secondary_text: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Destination URL</label>
              <input
                type="text"
                value={heroData.cta_secondary_link}
                onChange={(e) => setHeroData({ ...heroData, cta_secondary_link: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end pt-3 border-t">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing to Website...' : 'Save & Publish Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
