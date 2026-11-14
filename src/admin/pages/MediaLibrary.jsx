import { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { uploadToCloudinary } from '../../lib/cloudinary';

export default function MediaLibrary() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setAssets(data);
      }
    } catch (err) {
      console.warn('Media fetch note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setStatusMsg('');

    try {
      for (const file of files) {
        const res = await uploadToCloudinary(file, 'mami_media');
        // Record in Supabase
        await supabase.from('media_assets').insert([
          {
            name: file.name,
            public_id: res.public_id,
            url: res.url,
            format: res.format,
            size_bytes: res.bytes,
            folder: 'mami_media',
          },
        ]);
      }
      setStatusMsg(`Successfully uploaded ${files.length} picture(s)!`);
      await fetchMedia();
    } catch (err) {
      setStatusMsg('Upload notice: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this media record?')) return;
    try {
      const { error } = await supabase.from('media_assets').delete().eq('id', id);
      if (!error) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0B3566]">Media & Image Assets</h2>
          <p className="text-xs text-gray-500">
            Upload and manage pictures used across hero banners, services, about section, and logos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchMedia}
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#0799A8]"
            title="Refresh assets"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white text-xs font-bold shadow-md hover:opacity-95 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading Pictures...' : 'Upload Images'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3.5 bg-cyan-50 border border-cyan-200 text-[#0799A8] rounded-2xl text-xs font-semibold">
          {statusMsg}
        </div>
      )}

      {/* Media Gallery Grid */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">
            <div className="w-8 h-8 border-3 border-[#0799A8]/20 border-t-[#0799A8] rounded-full animate-spin mx-auto mb-2" />
            <span>Loading image assets...</span>
          </div>
        ) : assets.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-bold text-[#0B3566]">No uploaded assets found yet</p>
            <p className="mt-1">
              Click "Upload Images" above to upload photos directly to your media storage.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="group rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 flex flex-col justify-between hover:border-[#0799A8] transition-all"
              >
                <div className="relative aspect-video bg-white flex items-center justify-center overflow-hidden border-b">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View Full Image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3">
                  <p className="font-bold text-xs text-[#0B3566] truncate">{asset.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate font-mono">
                    {asset.public_id || 'asset-upload'}
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => copyUrl(asset.id, asset.url)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0799A8] hover:underline"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(asset.id)}
                      className="p-1 rounded-md text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
