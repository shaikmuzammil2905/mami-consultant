import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export default function MultiSelectDropdown({
  id = 'multi-select',
  label,
  required = false,
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select one or more options',
  error,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((item) => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label htmlFor={id} className="block text-xs sm:text-sm font-bold text-[#0B3566] mb-1.5">
          {label}
          {required && <span className="text-rose-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-left text-sm bg-white flex items-center justify-between gap-2 transition-colors focus:outline-none focus:ring-2 cursor-pointer ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-[#CFEFF3] focus:border-[#0799A8] focus:ring-[#0799A8]/20'
        }`}
      >
        <span className={selected.length ? 'text-[#173B63] font-medium truncate' : 'text-[#60758A]/75'}>
          {selected.length > 0 ? `${selected.length} selected: ${selected.join(', ')}` : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#0799A8] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAFBFD] border border-[#BFEBF0] text-[#007C91] text-xs font-semibold"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => toggleOption(item)}
                aria-label={`Remove ${item}`}
                className="hover:text-rose-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-2xl bg-white border border-[#CFEFF3] shadow-xl p-1.5 z-30"
        >
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggleOption(opt)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left text-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#EAFBFD] text-[#007C91] font-semibold'
                      : 'text-[#173B63] hover:bg-[#F5FDFE]'
                  }`}
                >
                  <span>{opt}</span>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#0799A8] border-[#0799A8] text-white'
                        : 'border-[#CFEFF3] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p role="alert" className="text-xs font-medium text-rose-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

