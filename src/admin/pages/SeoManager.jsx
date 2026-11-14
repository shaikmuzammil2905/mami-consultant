import { useState, useEffect } from 'react';
import { ShieldCheck, Save, Globe, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSiteContent } from '../../context/ContentContext';

export default function SeoManager() {
  const { siteSettings, refreshContent } = useSiteContent();
  const [seo, setSeo] = useState({
    meta_title:
      'MAMI Career Consultant | International Healthcare Licensing, Training & Recruitment',
    meta_description:
      'Premier international healthcare consultancy helping doctors, nurses, physiotherapists and allied healthcare professionals with DHA, DOH, MOH, SCFHS, UK HCPC licensing, Prometric exams, and overseas jobs.',
    keywords:
      'healthcare licensing, DHA exam, DOH license, MOH UAE, SCFHS Prometric, UK HCPC registration, physiotherapist abroad, nursing jobs Dubai',
    canonical_url: 'https://mami-consultant.vercel.app',
    og_image: '',
  });

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function loadSeo() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global')
          .maybeSingle();

        if (!error && data?.social_links?.seo) {
          setSeo(data.social_links.seo);
        }
      } catch (err) {
        console.warn('SEO load note:', err);
      }
    }
    loadSeo();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      // Save SEO metadata inside site_settings.social_links.seo
      const currentSocial = siteSettings.social_links || {};
      const updatedSocial = { ...currentSocial, seo };

      const { error } = await supabase
        .from('site_settings')
        .update({ social_links: updatedSocial })
        .eq('id', 'global');

      if (error) throw error;

      await refreshContent();
      setSaveStatus('SEO & Metadata settings saved successfully!');
    } catch (err) {
      alert('Failed to save SEO settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">SEO & Metadata Management</h2>
          <p className="text-xs text-gray-500">
            Configure Google search rankings, meta descriptions, and social sharing previews
          </p>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          {saveStatus}
        </div>
      )}

      {/* Google Search Snippet Preview */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Google Search Result Live Simulation
        </span>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 max-w-2xl space-y-1">
          <p className="text-xs text-[#202124] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{seo.canonical_url}</span>
          </p>
          <h3 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate">
            {seo.meta_title}
          </h3>
          <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
            {seo.meta_description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1">
            Meta Title (Recommended 50–60 characters)
          </label>
          <input
            type="text"
            value={seo.meta_title}
            onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1">
            Meta Description (Recommended 140–160 characters)
          </label>
          <textarea
            rows={3}
            value={seo.meta_description}
            onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1">
            Search Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={seo.keywords}
            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0B3566] mb-1">
            Canonical Production URL
          </label>
          <input
            type="text"
            value={seo.canonical_url}
            onChange={(e) => setSeo({ ...seo, canonical_url: e.target.value })}
            className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
          />
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save SEO Metadata'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

