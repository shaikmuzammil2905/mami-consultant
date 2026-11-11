export default function FormSelect({
  id,
  label,
  required = false,
  error,
  options = [],
  placeholder = 'Select an option',
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
      <select
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-sm bg-white text-[#173B63] transition-colors focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-[#CFEFF3] focus:border-[#0799A8] focus:ring-[#0799A8]/20'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value;
          const text = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

