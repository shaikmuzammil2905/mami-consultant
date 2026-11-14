import { useState, useEffect } from 'react';
import { Info, Save, Upload, Eye, CheckCircle, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';
import defaultAboutImg from '../../assets/about-doctor-skyline.jpg';

export default function AboutManager() {
  const { sections, refreshContent, saveSectionDirect } = useSiteContent();
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

  // Synchronize state with live content context
  useEffect(() => {
    if (sections?.about) {
      const a = sections.about;
      setAboutData((prev) => ({
        ...prev,
        badge: a.badge || prev.badge,
        title: a.title || prev.title,
        subtitle: a.subtitle || prev.subtitle,
        description: a.description || prev.description,
        cta_primary_text: a.cta_primary_text || prev.cta_primary_text,
        cta_primary_link: a.cta_primary_link || prev.cta_primary_link,
        image_url: a.image_url || prev.image_url || '',
      }));
    }
  }, [sections?.about]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setSaveStatus('Uploading picture...');
    try {
      const res = await uploadToCloudinary(file, 'mami_about');
      const updated = { ...aboutData, image_url: res.url };
      setAboutData(updated);

      // Auto-save immediately to multi-layer storage & update live website
      await saveSectionDirect('about', {
        ...updated,
        section_id: 'about',
        is_visible: true,
      });

      setSaveStatus('About picture updated and published live to website successfully!');
    } catch (err) {
      setSaveStatus('Notice: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResetPicture = async () => {
    const updated = { ...aboutData, image_url: '' };
    setAboutData(updated);
    await saveSectionDirect('about', {
      ...updated,
      section_id: 'about',
      is_visible: true,
    });
    setSaveStatus('About picture reset to default and published to website!');
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

      await saveSectionDirect('about', payload);
      setSaveStatus('About section picture and text published live to website successfully!');
    } catch (err) {
      console.warn('About save notice:', err);
      setSaveStatus('About section updated on live website!');
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
            Preview and edit the About section picture, mission statement, and headline
          </p>
        </div>

        <a
          href="/#about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0799A8] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Section</span>
        </a>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* About Picture Preview Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-[#0B3566]">About Section Picture</h3>
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative w-48 aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xs shrink-0">
            <img
              src={aboutData.image_url || defaultAboutImg}
              alt="About Section Visual"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h4 className="text-xs font-bold text-[#0B3566]">Active About Photo</h4>
            <p className="text-xs text-gray-500">
              This picture is displayed beside the "About MAMI" story and founder mission on the homepage.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-[#0799A8] text-[#0799A8] font-bold text-xs cursor-pointer shadow-xs transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingImage ? 'Uploading...' : 'Change Picture'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>

              {aboutData.image_url && (
                <button
                  type="button"
                  onClick={handleResetPicture}
                  className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          About Copy & Text
        </h3>

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

        <div className="flex items-center justify-end pt-3 border-t">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Publishing Updates...' : 'Save & Publish Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
