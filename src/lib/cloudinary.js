/**
 * Cloudinary Media Integration Helper
 * Performs secure unsigned client uploads using preset 'ml-default'
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
 * Uploads an image File or Blob directly to Cloudinary
 * @param {File|Blob} file
 * @param {string} folder
 * @param {function} onProgress
 * @returns {Promise<{ url: string, public_id: string, format: string, bytes: number, width: number, height: number }>}
 */
export async function uploadToCloudinary(file, folder = 'mami_consultant', onProgress = null) {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  if (!cloudName) {
    throw new Error(
      'Cloudinary Cloud Name is not configured. Please enter your Cloud Name in Admin Settings -> Media & Cloudinary.'
    );
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  if (folder) {
    formData.append('folder', folder);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve({
            url: res.secure_url || res.url,
            public_id: res.public_id,
            format: res.format,
            bytes: res.bytes,
            width: res.width,
            height: res.height,
            created_at: res.created_at,
          });
        } catch (e) {
          reject(new Error('Failed to parse Cloudinary response: ' + e.message));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Cloudinary upload failed (${xhr.status})`));
        } catch {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during Cloudinary upload'));
    xhr.send(formData);
  });
}

