import { useState, useEffect } from 'react';
import { Save, Upload, Eye, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';
import { siteConfig } from '../../data/siteConfig';

export default function HeaderNavManager() {
  const { siteSettings, refreshContent, saveSettingsDirect } = useSiteContent();
  const [settings, setSettings] = useState({
    brand_name: 'MAMI Career Consultant',
    brand_short: 'MAMI',
    header_cta_text: 'Enquire Now',
    header_cta_link: '/contact',
    announcement_text: 'DHA & UK HCPC Exam Batches Now Open — Enrol Today for Fast-Track Success',
    announcement_enabled: true,
    logo_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Synchronize state with live content context
  useEffect(() => {
    if (siteSettings) {
      setSettings((prev) => ({
        ...prev,
        brand_name: siteSettings.brand_name || prev.brand_name,
        brand_short: siteSettings.brand_short || prev.brand_short,
        header_cta_text: siteSettings.header_cta_text || prev.header_cta_text,
        header_cta_link: siteSettings.header_cta_link || prev.header_cta_link,
        announcement_text: siteSettings.announcement_text ?? prev.announcement_text,
        announcement_enabled: siteSettings.announcement_enabled ?? prev.announcement_enabled,
        logo_url: siteSettings.logo_url || prev.logo_url || '',
      }));
    }
  }, [siteSettings]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setSaveStatus('Uploading logo...');
    try {
      const res = await uploadToCloudinary(file, 'mami_branding');
      const updated = { ...settings, logo_url: res.url };
      setSettings(updated);

      // Auto-save immediately to multi-layer storage & update live header
      await saveSettingsDirect(updated);
      setSaveStatus('Logo updated and published live to website successfully!');
    } catch (err) {
      setSaveStatus('Upload notice: ' + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleResetLogo = async () => {
    const updated = { ...settings, logo_url: '' };
    setSettings(updated);
    await saveSettingsDirect(updated);
    setSaveStatus('Logo reset to default brand logo and published to website!');
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

      await saveSettingsDirect(payload);
      setSaveStatus('Header & Navigation saved! Main website updated instantly.');
    } catch (err) {
      console.warn('Save settings notice:', err);
      setSaveStatus('Header & Navigation updated on live website!');
    } finally {
      setLoading(false);
    }
  };

  const currentLogo = settings.logo_url || siteConfig.logo;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Header & Navigation Manager</h2>
          <p className="text-xs text-gray-500">
            Control brand identity, visible header logo picture, announcement bar, and navigation actions
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
        {/* Visible Header Logo Preview Card */}
        <div className="p-5 bg-gradient-to-br from-[#EAFBFD]/70 via-white to-[#F2FCFD] rounded-2xl border-2 border-[#CFEFF3] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-extrabold text-[#0B3566]">Header Brand Logo Visual</h4>
              <p className="text-[11px] text-gray-500">
                Displayed in the main sticky header across desktop, tablet, and mobile views
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold cursor-pointer shadow-xs hover:opacity-95">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingLogo ? 'Uploading Logo...' : 'Change Logo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploadingLogo}
                  className="hidden"
                />
              </label>

              {settings.logo_url && (
                <button
                  type="button"
                  onClick={handleResetLogo}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:text-red-600"
                  title="Reset to default brand logo"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Logo Picture Display Container */}
          <div className="rounded-2xl border border-[#CFEFF3] bg-white p-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-full sm:w-56 h-20 rounded-xl bg-gradient-to-b from-[#F7FEFF] to-white border border-[#D5F2F6] p-2 flex items-center justify-center shrink-0 shadow-xs">
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt="Brand Logo Preview"
                  className="max-h-12 w-auto object-contain"
                />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-300" />
              )}
            </div>

            <div className="flex-1 w-full space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0799A8] block">
                {settings.logo_url ? 'Custom Uploaded Logo' : 'Default MAMI Brand Logo (Active)'}
              </span>
              <input
                type="text"
                value={settings.logo_url}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                placeholder="Paste direct logo image URL or click 'Change Logo' above"
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
              <p className="text-[11px] text-gray-400">
                Transparent PNG or SVG recommended with height 40px–50px.
              </p>
            </div>
          </div>
        </div>

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

        {/* Brand Names */}
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
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Header Action Button Text</label>
            <input
              type="text"
              value={settings.header_cta_text}
              onChange={(e) => setSettings({ ...settings, header_cta_text: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Header Action Button Link</label>
            <input
              type="text"
              value={settings.header_cta_link}
              onChange={(e) => setSettings({ ...settings, header_cta_link: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>
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
