import { useState, useEffect } from 'react';
import { Globe, Save, Plus, Trash2, ArrowUp, ArrowDown, Upload, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';

export default function HeaderNavManager() {
  const { siteSettings, refreshContent } = useSiteContent();
  const [settings, setSettings] = useState({
    brand_name: 'MAMI Career Consultant',
    brand_short: 'MAMI',
    header_cta_text: 'Enquire Now',
    header_cta_link: '/contact',
    announcement_text: 'DHA & UK HCPC Exam Batches Now Open — Enrol Today for Fast-Track Success',
    announcement_enabled: true,
    logo_url: '',
  });

  const [navItems, setNavItems] = useState([
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/#about' },
    { label: 'Our Services', path: '/services' },
    { label: 'Training', path: '/training' },
    { label: 'Job Assistance', path: '/jobs' },
    { label: 'Why Choose Us', path: '/why-choose-us' },
    { label: 'Career', path: '/career' },
    { label: 'Collaborate With MAMI', path: '/collaborate' },
    { label: 'Contact Us', path: '/contact' },
  ]);

  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global')
          .maybeSingle();

        if (!error && data) {
          setSettings({
            brand_name: data.brand_name || 'MAMI Career Consultant',
            brand_short: data.brand_short || 'MAMI',
            header_cta_text: data.header_cta_text || 'Enquire Now',
            header_cta_link: data.header_cta_link || '/contact',
            announcement_text: data.announcement_text || '',
            announcement_enabled: data.announcement_enabled ?? true,
            logo_url: data.logo_url || '',
          });
        }
      } catch (err) {
        console.warn('Settings load note:', err);
      }
    }
    loadSettings();
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setSaveStatus('');
    try {
      const res = await uploadToCloudinary(file, 'mami_branding');
      setSettings((prev) => ({ ...prev, logo_url: res.url }));
      setSaveStatus('Logo uploaded to Cloudinary successfully!');
    } catch (err) {
      setSaveStatus('Upload notice: ' + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      const payload = {
        id: 'global',
        brand_name: settings.brand_name,
        brand_short: settings.brand_short,
        header_cta_text: settings.header_cta_text,
        header_cta_link: settings.header_cta_link,
        announcement_text: settings.announcement_text,
        announcement_enabled: settings.announcement_enabled,
        logo_url: settings.logo_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('site_settings')
        .upsert([payload], { onConflict: 'id' });

      if (error) throw error;

      await refreshContent();
      setSaveStatus('Header & Navigation updated and live on website!');
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Header & Navigation Manager</h2>
          <p className="text-xs text-gray-500">
            Control brand identity, top announcement bar, logo, and header action buttons
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#0799A8] hover:bg-gray-50 transition-colors shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Live Header</span>
        </a>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          {saveStatus}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-5">
        {/* Top Announcement Bar */}
        <div className="p-4 bg-[#EAFBFD] rounded-2xl border border-[#CFEFF3] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#0B3566]">Top Announcement Bar</h4>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0799A8]">
              <input
                type="checkbox"
                checked={settings.announcement_enabled}
                onChange={(e) =>
                  setSettings({ ...settings, announcement_enabled: e.target.checked })
                }
                className="rounded text-[#0799A8]"
              />
              <span>Enable Announcement</span>
            </label>
          </div>
          <input
            type="text"
            value={settings.announcement_text}
            onChange={(e) => setSettings({ ...settings, announcement_text: e.target.value })}
            placeholder="e.g. DHA & UK HCPC Exam Batches Now Open..."
            className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-xl outline-none"
          />
        </div>

        {/* Brand Names & Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Full Brand Name</label>
            <input
              type="text"
              value={settings.brand_name}
              onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Brand Short Name</label>
            <input
              type="text"
              value={settings.brand_short}
              onChange={(e) => setSettings({ ...settings, brand_short: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Header CTA Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Header CTA Button Text</label>
            <input
              type="text"
              value={settings.header_cta_text}
              onChange={(e) => setSettings({ ...settings, header_cta_text: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Header CTA Button Link</label>
            <input
              type="text"
              value={settings.header_cta_link}
              onChange={(e) => setSettings({ ...settings, header_cta_link: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Logo Upload Option */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#0B3566]">Custom Header Logo URL</h4>
              <p className="text-[11px] text-gray-500">Leave blank to use default transparent MAMI logo</p>
            </div>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-[#0799A8] text-[#0799A8] font-bold text-xs cursor-pointer shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingLogo ? 'Uploading...' : 'Upload Cloudinary'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploadingLogo}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            value={settings.logo_url}
            onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
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
            <span>{loading ? 'Saving...' : 'Save & Publish Header'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

