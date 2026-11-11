import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react';
import { getWhatsAppUrl } from '../data/siteConfig';

export default function SuccessState({
  title,
  message,
  subMessage,
  referenceId,
  referenceLabel = 'Reference ID',
  backTo = '/',
  backLabel = 'Go Back',
  whatsappMessage,
  whatsappLabel = 'Contact MAMI on WhatsApp',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="card-mami rounded-3xl p-7 sm:p-10 text-center max-w-2xl mx-auto space-y-5"
    >
      <div className="w-18 h-18 rounded-full bg-[#EAFBFD] border-2 border-[#BFEBF0] text-[#0799A8] flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3566]">{title}</h2>
        <p className="text-sm sm:text-base text-[#173B63] font-medium">{message}</p>
        {subMessage && <p className="text-xs sm:text-sm text-[#60758A]">{subMessage}</p>}
      </div>

      {referenceId && (
        <div className="inline-flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 px-5 py-3 rounded-2xl bg-[#F4FCFD] border border-[#CFEFF3]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#60758A]">
            {referenceLabel}:
          </span>
          <span className="text-sm font-extrabold text-[#007C91] select-all">{referenceId}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={getWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{whatsappLabel}</span>
        </a>

        <Link
          to={backTo}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#8AD7E0] text-[#0B3566] font-semibold text-sm hover:bg-[#EAFBFD] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>
      </div>
    </motion.div>
  );
}

