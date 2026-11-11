import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/siteConfig';

export default function ErrorState({
  title = 'Unable to Submit',
  message = 'Something went wrong while submitting your request. Please try again or contact MAMI on WhatsApp.',
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="rounded-3xl bg-rose-50/70 border border-rose-200 p-6 sm:p-8 text-center max-w-2xl mx-auto space-y-4"
    >
      <div className="w-14 h-14 rounded-full bg-white border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle className="w-7 h-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-[#0B3566]">{title}</h3>
        <p className="text-sm text-[#173B63]/90">{message}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-mami-gradient text-white font-semibold text-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
        <a
          href={getWhatsAppUrl('Hello MAMI Career Consultant, I encountered an issue submitting my form online and need assistance.')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#8AD7E0] text-[#007C91] font-semibold text-sm hover:bg-[#EAFBFD]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp MAMI</span>
        </a>
      </div>
    </div>
  );
}

