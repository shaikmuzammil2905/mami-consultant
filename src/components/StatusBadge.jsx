const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  New: 'bg-[#EAFBFD] text-[#007C91] border-[#BFEBF0]',
  'Under Review': 'bg-sky-50 text-sky-700 border-sky-200',
  Shortlisted: 'bg-teal-50 text-teal-700 border-teal-200',
  'Interview Scheduled': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Contacted: 'bg-sky-50 text-sky-700 border-sky-200',
  'Requirement Confirmed': 'bg-teal-50 text-teal-700 border-teal-200',
  'Profiles Shared': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Interview Stage': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Position Filled': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  closed: 'bg-slate-100 text-slate-600 border-slate-200',
  Closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function StatusBadge({ status, label }) {
  const classes = STATUS_STYLES[status] || 'bg-[#EAFBFD] text-[#007C91] border-[#CFEFF3]';
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${classes}`}
    >
      {label || status}
    </span>
  );
}

