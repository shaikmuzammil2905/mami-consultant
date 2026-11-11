import { Upload, FileText, X } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export default function FileUpload({
  id = 'cv-upload',
  label = 'Resume / CV Upload',
  required = false,
  file,
  error,
  onFileSelect,
  onValidationError,
}) {
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const lower = selected.name.toLowerCase();
    const isValidType = ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
    if (!isValidType) {
      onValidationError?.('Only PDF, DOC, or DOCX files are accepted.');
      e.target.value = '';
      return;
    }

    if (selected.size > MAX_SIZE_BYTES) {
      onValidationError?.('File size must be 5 MB or less.');
      e.target.value = '';
      return;
    }

    onValidationError?.('');
    onFileSelect?.(selected);
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs sm:text-sm font-bold text-[#0B3566] mb-1.5">
          {label}
          {required && <span className="text-rose-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {file ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-[#0799A8] bg-[#EAFBFD]">
          <div className="flex items-center gap-2.5 min-w-0">
            <FileText className="w-5 h-5 text-[#007C91] shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0B3566] truncate">{file.name}</p>
              <p className="text-xs text-[#60758A]">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onFileSelect?.(null)}
            aria-label="Remove uploaded CV"
            className="w-8 h-8 rounded-full bg-white text-[#0B3566] hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2.5 px-4 py-5 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            error
              ? 'border-rose-400 bg-rose-50/40'
              : 'border-[#8AD7E0] bg-[#EAFBFD]/50 hover:bg-[#EAFBFD]'
          }`}
        >
          <Upload className="w-5 h-5 text-[#0799A8] shrink-0" />
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-[#0B3566]">
              Click to upload your Resume / CV
            </p>
            <p className="text-xs text-[#60758A]">Accepted formats: PDF, DOC, DOCX (Max 5 MB)</p>
          </div>
          <input
            id={id}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

