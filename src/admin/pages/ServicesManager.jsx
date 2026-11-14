import { useState, useEffect } from 'react';
import {
  Stethoscope,
  PlusCircle,
  Edit,
  Trash2,
  EyeOff,
  Upload,
  CheckCircle,
  RefreshCw,
  X,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { services as defaultServices } from '../../data/services';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useSiteContent } from '../../context/ContentContext';

export default function ServicesManager() {
  const { services: liveServices, refreshContent } = useSiteContent();
  const [dbServices, setDbServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  const getDefaultImageForId = (id) => {
    const found = defaultServices.find((s) => s.id === id);
    return found?.image || '';
  };

  const fetchDbServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        setDbServices(data);
      } else {
        // Map from defaults if DB is fresh
        setDbServices(
          defaultServices.map((s, idx) => ({
            id: s.id,
            title: s.title,
            short_subtitle: s.shortSubtitle,
            short_description: s.shortDescription,
            detailed_description: s.detailedDescription,
            route: s.route,
            display_order: idx + 1,
            is_published: true,
            authorities: s.authorities || [],
            image_url: '',
          }))
        );
      }
    } catch (err) {
      console.warn('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbServices();
  }, []);

  const handleEdit = (svc) => {
    setFormMsg('');
    setIsNew(false);
    setEditingService({
      id: svc.id,
      title: svc.title,
      short_subtitle: svc.short_subtitle || svc.shortSubtitle || '',
      short_description: svc.short_description || svc.shortDescription || '',
      detailed_description: svc.detailed_description || svc.detailedDescription || '',
      icon_name: svc.icon_name || 'ShieldPlus',
      image_url: svc.image_url || '',
      route: svc.route || `/services/${svc.id}`,
      display_order: svc.display_order || 1,
      is_published: svc.is_published ?? true,
      authorities: svc.authorities || [],
    });
  };

  const handleNew = () => {
    setFormMsg('');
    setIsNew(true);
    setEditingService({
      id: `service-${Date.now()}`,
      title: '',
      short_subtitle: '',
      short_description: '',
      detailed_description: '',
      icon_name: 'Stethoscope',
      image_url: '',
      route: '/services/new-service',
      display_order: dbServices.length + 1,
      is_published: true,
      authorities: [],
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormMsg('');
    try {
      const res = await uploadToCloudinary(file, 'mami_services');
      setEditingService((prev) => ({ ...prev, image_url: res.url }));
      setFormMsg('Service picture updated! Remember to click "Save & Publish" to update the website.');
    } catch (err) {
      setFormMsg('Upload notice: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResetImage = () => {
    setEditingService((prev) => ({ ...prev, image_url: '' }));
    setFormMsg('Reset to default service artwork.');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingService.title.trim()) {
      alert('Service title is required');
      return;
    }

    setSaveLoading(true);
    setFormMsg('');
    try {
      const payload = {
        id: editingService.id,
        title: editingService.title,
        short_subtitle: editingService.short_subtitle,
        short_description: editingService.short_description,
        detailed_description: editingService.detailed_description,
        icon_name: editingService.icon_name,
        image_url: editingService.image_url,
        route: editingService.route,
        display_order: parseInt(editingService.display_order) || 1,
        is_published: Boolean(editingService.is_published),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('services').upsert([payload], { onConflict: 'id' });
      if (error) throw error;

      await fetchDbServices();
      await refreshContent();
      setFormMsg('Service saved! Live website updated instantly.');
      setTimeout(() => setEditingService(null), 1200);
    } catch (err) {
      alert('Failed to save service: ' + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const togglePublish = async (svc) => {
    try {
      const newStatus = !svc.is_published;
      const { error } = await supabase
        .from('services')
        .update({ is_published: newStatus })
        .eq('id', svc.id);

      if (!error) {
        setDbServices((prev) =>
          prev.map((item) => (item.id === svc.id ? { ...item, is_published: newStatus } : item))
        );
        refreshContent();
      }
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) {
        setDbServices((prev) => prev.filter((item) => item.id !== id));
        refreshContent();
      }
    } catch (err) {
      alert('Failed to delete service: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Services Management</h2>
          <p className="text-xs text-gray-500">
            Preview pictures and control titles, subtitles, descriptions, and banners for all healthcare services
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchDbServices}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#0799A8]"
            title="Refresh services list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-xs hover:opacity-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid / List with Visible Picture Previews */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Picture</th>
                <th className="py-3 px-4">Service Title & Subtitle</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {dbServices.map((svc) => {
                const activeImg = svc.image_url || getDefaultImageForId(svc.id);
                return (
                  <tr key={svc.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-400">#{svc.display_order}</td>

                    {/* Visible Service Picture Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-16 h-11 rounded-xl bg-gradient-to-b from-[#EAFBFD] to-white border border-[#CFEFF3] p-1 flex items-center justify-center overflow-hidden shadow-xs">
                        {activeImg ? (
                          <img
                            src={activeImg}
                            alt={svc.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-bold text-[#0B3566] text-sm">{svc.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {svc.short_subtitle || svc.shortSubtitle}
                      </p>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#0799A8]">
                      {svc.route}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => togglePublish(svc)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border cursor-pointer transition-colors ${
                          svc.is_published
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {svc.is_published ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(svc)}
                          className="p-1.5 rounded-lg text-[#0799A8] hover:bg-[#EAFBFD] transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(svc.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / New Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0B3566]">
                  {isNew ? 'Create New Service' : `Edit Service: ${editingService.title}`}
                </h3>
                <p className="text-xs text-gray-500">
                  Changes to picture and text reflect instantly across the main website
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
                {formMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Service Picture Visual Section */}
              <div className="p-4 bg-gradient-to-br from-[#EAFBFD]/60 via-white to-[#F2FCFD] rounded-2xl border-2 border-[#CFEFF3] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0B3566]">
                      Service Visual Picture
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Displayed on homepage service cards and dedicated service pages
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-bold text-[11px] cursor-pointer shadow-xs hover:opacity-95">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading Picture...' : 'Change Picture'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {editingService.image_url && (
                      <button
                        type="button"
                        onClick={handleResetImage}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-[11px] font-bold hover:text-red-600"
                        title="Reset to default artwork"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Live Preview Display */}
                <div className="rounded-2xl border border-[#CFEFF3] bg-white p-3 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-48 h-32 rounded-xl bg-gradient-to-b from-[#EAFBFD] to-white border border-[#D7F3F7] p-2 flex items-center justify-center shrink-0 overflow-hidden">
                    {editingService.image_url || getDefaultImageForId(editingService.id) ? (
                      <img
                        src={editingService.image_url || getDefaultImageForId(editingService.id)}
                        alt={editingService.title || 'Service preview'}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0799A8] block">
                      {editingService.image_url ? 'Custom Uploaded Picture' : 'Default Service Artwork'}
                    </span>
                    <input
                      type="text"
                      value={editingService.image_url}
                      onChange={(e) =>
                        setEditingService((prev) => ({ ...prev, image_url: e.target.value }))
                      }
                      placeholder="Paste picture URL or click 'Change Picture' above"
                      className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                    />
                    <p className="text-[11px] text-gray-400">
                      Supports direct image uploads (PNG, JPG, WebP) or any web image link.
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0B3566] mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B3566] mb-1">
                    Short Subtitle (Badge Text)
                  </label>
                  <input
                    type="text"
                    value={editingService.short_subtitle}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, short_subtitle: e.target.value }))
                    }
                    placeholder="e.g. DHA, DOH, MOH, SCFHS & more"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0B3566] mb-1">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={editingService.short_description}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, short_description: e.target.value }))
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0B3566] mb-1">
                  Detailed Description (Page Overview)
                </label>
                <textarea
                  rows={4}
                  value={editingService.detailed_description}
                  onChange={(e) =>
                    setEditingService((prev) => ({
                      ...prev,
                      detailed_description: e.target.value,
                    }))
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0799A8] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#0B3566] mb-1">Route</label>
                  <input
                    type="text"
                    value={editingService.route}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, route: e.target.value }))
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B3566] mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={editingService.display_order}
                    onChange={(e) =>
                      setEditingService((prev) => ({
                        ...prev,
                        display_order: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0B3566] mb-1">Publish Status</label>
                  <select
                    value={editingService.is_published ? 'true' : 'false'}
                    onChange={(e) =>
                      setEditingService((prev) => ({
                        ...prev,
                        is_published: e.target.value === 'true',
                      }))
                    }
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white outline-none font-bold"
                  >
                    <option value="true">Published (Live)</option>
                    <option value="false">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-5 py-2 font-bold text-white bg-gradient-to-r from-[#0799A8] to-[#007C91] rounded-xl shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {saveLoading ? 'Saving to Database...' : 'Save & Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
