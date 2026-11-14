import { useState, useEffect } from 'react';
import { Settings, Save, Phone, Mail, MapPin, Share2, Cloud, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { getCloudinaryConfig, saveCloudinaryCloudName } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';

export default function SettingsManager() {
  const { refreshContent } = useSiteContent();
  const [settings, setSettings] = useState({
    phone: '+91 9154605599',
    phone_uae: '+971 569069289',
    whatsapp: '+91 9154605599',
    whatsapp_uae: '+971 569069289',
    email: 'contact@mamiconsultant.com',
    address: 'Rajiv Swagruha Township, Bandlaguda, Nagole, Hyderabad, Telangana, India',
    owner_name: 'Dr. Ramyakrishna Mamidala',
    footer_text:
      'MAMI Career Consultant empowers healthcare professionals across India with genuine, transparent international licensing, exam preparation, verification, and recruitment services.',
    social_links: {
      whatsapp: 'https://wa.me/919154605599',
      whatsapp_uae: 'https://wa.me/971569069289',
      instagram: 'https://instagram.com/mami_career_consultant',
      facebook: 'https://facebook.com/mamiconsultant',
      linkedin: 'https://linkedin.com/company/mami-career-consultant',
      youtube: 'https://youtube.com/@mamiconsultant',
    },
  });

  const [cloudinaryName, setCloudinaryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const config = getCloudinaryConfig();
    setCloudinaryName(config.cloudName);

    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global')
          .maybeSingle();

        if (!error && data) {
          setSettings({
            phone: data.phone || '+91 9154605599',
            phone_uae: data.phone_uae || '+971 569069289',
            whatsapp: data.whatsapp || '+91 9154605599',
            whatsapp_uae: data.whatsapp_uae || '+971 569069289',
            email: data.email || 'contact@mamiconsultant.com',
            address: data.address || '',
            owner_name: data.owner_name || 'Dr. Ramyakrishna Mamidala',
            footer_text: data.footer_text || '',
            social_links: data.social_links || settings.social_links,
          });
        }
      } catch (err) {
        console.warn('Settings load note:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveStatus('');

    try {
      // 1. Save Cloudinary Cloud Name locally
      saveCloudinaryCloudName(cloudinaryName);

      // 2. Save site settings to Supabase
      const payload = {
        id: 'global',
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        address: settings.address,
        owner_name: settings.owner_name,
        footer_text: settings.footer_text,
        social_links: settings.social_links,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('site_settings')
        .upsert([payload], { onConflict: 'id' });

      if (error) throw error;

      await refreshContent();
      setSaveStatus('Site settings & contact configurations saved successfully!');
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
          <h2 className="text-xl font-black text-[#0B3566]">Site & Contact Settings</h2>
          <p className="text-xs text-gray-500">
            Control contact telephone numbers, WhatsApp, clinic address, and site settings
          </p>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
          {saveStatus}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Contact Numbers & Emails */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Primary Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">Founder / Owner Name</label>
              <input
                type="text"
                value={settings.owner_name}
                onChange={(e) => setSettings({ ...settings, owner_name: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Head Office Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">Footer Summary</label>
            <textarea
              rows={3}
              value={settings.footer_text}
              onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Cloud Storage Configuration */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-[#0799A8]" />
            <h3 className="text-xs font-bold text-[#0B3566] uppercase tracking-wider">
              Cloud Media Storage (Optional)
            </h3>
          </div>

          <p className="text-xs text-[#60758A]">
            Antigravity includes built-in optimized image uploads. If you wish to connect an external cloud bucket, you can configure your cloud identifier below.
          </p>

          <div>
            <label className="block text-xs font-bold text-[#0B3566] mb-1">
              Cloud Storage Identifier
            </label>
            <input
              type="text"
              value={cloudinaryName}
              onChange={(e) => setCloudinaryName(e.target.value)}
              placeholder="Optional: enter cloud storage account identifier"
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none font-mono"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#0799A8]" />
            <h3 className="text-xs font-bold text-[#0B3566] uppercase tracking-wider">
              Social Media Links
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">Instagram URL</label>
              <input
                type="text"
                value={settings.social_links?.instagram || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, instagram: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={settings.social_links?.linkedin || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, linkedin: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.social_links?.facebook || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, facebook: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B3566] mb-1">YouTube URL</label>
              <input
                type="text"
                value={settings.social_links?.youtube || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, youtube: e.target.value },
                  })
                }
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

