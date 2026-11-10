export default function PageLoadingFallback() {
  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 space-y-8" aria-busy="true" aria-label="Loading page">
      <div className="h-44 rounded-3xl skeleton-shimmer" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-[#EAFBFD] p-6 space-y-3 bg-white">
            <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
            <div className="h-5 w-3/4 rounded skeleton-shimmer" />
            <div className="h-4 w-full rounded skeleton-shimmer" />
            <div className="h-4 w-2/3 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

