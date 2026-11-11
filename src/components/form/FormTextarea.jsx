export default function FormTextarea({
  id,
  label,
  required = false,
  error,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-xs sm:text-sm font-bold text-[#0B3566] mb-1.5">
          {label}
          {required && <span className="text-rose-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-[#173B63] placeholder:text-[#60758A]/70 transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-[#CFEFF3] focus:border-[#0799A8] focus:ring-[#0799A8]/20'
        }`}
        {...props}
      />
      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

