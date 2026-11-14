/**
 * Universal Media Upload Helper for MAMI Admin Panel
 * Seamlessly uploads to Cloudinary if configured, or converts to optimized WebP/JPEG data URL
 * so image uploads work 100% immediately without requiring any external account setup.
 */

export function getCloudinaryConfig() {
  const envCloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const storedCloud = typeof window !== 'undefined' ? localStorage.getItem('mami_cloudinary_cloud_name') : '';
  const cloudName = storedCloud || envCloud || '';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml-default';

  return {
    cloudName,
    uploadPreset,
    isConfigured: Boolean(cloudName),
  };
}

export function saveCloudinaryCloudName(name) {
  if (typeof window !== 'undefined') {
    if (name) {
      localStorage.setItem('mami_cloudinary_cloud_name', name.trim());
    } else {
      localStorage.removeItem('mami_cloudinary_cloud_name');
    }
  }
}

/**
 * Compresses an image client-side to ensure fast loading and safe storage
 */
export async function compressImageToDataUrl(file, maxWidth = 1920, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve({
          url: dataUrl,
          public_id: `local-${Date.now()}`,
          format: 'webp',
          width,
          height,
        });
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Universal Image Upload function:
 * - If Cloudinary is configured, uploads directly to Cloudinary.
 * - If Cloudinary is not configured, automatically compresses to an optimized web data URL.
 * In both cases, returns a valid URL that directly displays on the website!
 */
export async function uploadToCloudinary(file, folder = 'mami_website', onProgress = null) {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  // If Cloudinary cloud name is provided, use Cloudinary
  if (cloudName) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      if (folder) formData.append('folder', folder);

      const res = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        if (onProgress && xhr.upload) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              onProgress(Math.round((event.loaded / event.total) * 100));
            }
          };
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Cloudinary status ${xhr.status}`));
          }
        };
        xhr.onerror = () => reject(new Error('Cloudinary network error'));
        xhr.send(formData);
      });

      return {
        url: res.secure_url || res.url,
        public_id: res.public_id,
        format: res.format,
        bytes: res.bytes,
      };
    } catch (cloudErr) {
      console.warn('Cloudinary upload fallback to client storage:', cloudErr.message);
    }
  }

  // Seamless fallback: Compress & encode as ultra-fast direct web asset
  return await compressImageToDataUrl(file);
}
