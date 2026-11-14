import { Phone, Mail, MessageCircle, Facebook, Linkedin, Youtube } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

export default function TopBar() {
  const { siteSettings } = useSiteContent();
  const phone = siteSettings?.phone || siteConfig.phone;
  const whatsapp = siteSettings?.whatsapp || siteConfig.whatsapp;
  const email = siteSettings?.email || siteConfig.email;
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`;
  const whatsappClean = whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    'Hello MAMI Career Consultant, I would like to inquire about international healthcare licensing and career support.'
  )}`;

  return (
    <div className="bg-[#007C91] text-white text-xs sm:text-[13px] border-b border-white/15">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-6 h-9 sm:h-10 flex items-center justify-between gap-2">
        {/* Desktop Left & Mobile Compact Row */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-5">
          <a
            href={phoneHref}
            className="inline-flex items-center gap-1.5 hover:text-[#EAFBFD] transition-colors whitespace-nowrap"
            aria-label={`Call ${phone}`}
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{phone}</span>
          </a>

          <span className="text-white/35 sm:hidden">|</span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#EAFBFD] transition-colors whitespace-nowrap"
            aria-label={`WhatsApp ${whatsapp}`}
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{whatsapp}</span>
          </a>

          <span className="text-white/35 sm:hidden">|</span>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 hover:text-[#EAFBFD] transition-colors whitespace-nowrap"
            aria-label="Email MAMI Career Consultant"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline font-medium">{email}</span>
          </a>
        </div>

        {/* Desktop Right Social Icons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <span className="text-white/90 text-xs font-medium">Follow Us:</span>
          <div className="flex items-center gap-1.5">
            <a
              href={siteConfig.socialLinks[0].href}
              aria-label="Facebook"
              className="w-5 h-5 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
            >
              <Facebook className="w-3 h-3" />
            </a>
            <a
              href={siteConfig.socialLinks[1].href}
              aria-label="LinkedIn"
              className="w-5 h-5 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
            >
              <Linkedin className="w-3 h-3" />
            </a>
            <a
              href={siteConfig.socialLinks[2].href}
              aria-label="YouTube"
              className="w-5 h-5 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
            >
              <Youtube className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

