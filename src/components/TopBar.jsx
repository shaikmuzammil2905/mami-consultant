import { Phone, Mail, MessageCircle, Facebook, Linkedin, Youtube } from 'lucide-react';
import { siteConfig, getWhatsAppIndiaUrl, getWhatsAppUAEUrl } from '../data/siteConfig';
import { useSiteContent } from '../context/ContentContext';

export default function TopBar() {
  const { siteSettings } = useSiteContent();
  const phoneIndia = siteSettings?.phone || siteConfig.phoneIndia;
  const phoneUAE = siteConfig.phoneUAE;
  const email = siteSettings?.email || siteConfig.email;

  const phoneIndiaHref = `tel:${phoneIndia.replace(/\s+/g, '')}`;
  const phoneUAEHref = siteConfig.phoneUAEHref;

  const whatsappIndiaUrl = getWhatsAppIndiaUrl(
    'Hello MAMI Career Consultant India office, I would like to inquire about international healthcare licensing and career support.'
  );
  const whatsappUAEUrl = getWhatsAppUAEUrl(
    'Hello MAMI Career Consultant UAE office, I would like to inquire about Dubai/UAE healthcare licensing and job opportunities.'
  );

  return (
    <div className="bg-[#007C91] text-white text-xs sm:text-[13px] border-b border-white/15">
      <div className="max-w-[1320px] mx-auto px-3 sm:px-6 h-auto min-h-9 sm:min-h-10 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Contact Numbers Row: Both India & UAE */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
          {/* India Contact */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className="font-bold text-[10px] tracking-wide text-amber-200">IN</span>
            <a
              href={phoneIndiaHref}
              className="inline-flex items-center gap-1 font-semibold hover:text-[#EAFBFD] transition-colors whitespace-nowrap"
              aria-label={`Call India Helpline ${phoneIndia}`}
            >
              <Phone className="w-3 h-3 shrink-0" />
              <span>{phoneIndia}</span>
            </a>
            <a
              href={whatsappIndiaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#25D366] hover:text-white transition-colors"
              aria-label="WhatsApp India Helpline"
              title="WhatsApp India"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>

          {/* UAE Contact */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className="font-bold text-[10px] tracking-wide text-emerald-200">UAE</span>
            <a
              href={phoneUAEHref}
              className="inline-flex items-center gap-1 font-semibold hover:text-[#EAFBFD] transition-colors whitespace-nowrap"
              aria-label={`Call UAE Helpline ${phoneUAE}`}
            >
              <Phone className="w-3 h-3 shrink-0" />
              <span>{phoneUAE}</span>
            </a>
            <a
              href={whatsappUAEUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#25D366] hover:text-white transition-colors"
              aria-label="WhatsApp UAE Helpline"
              title="WhatsApp UAE"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>

          <a
            href={`mailto:${email}`}
            className="hidden lg:inline-flex items-center gap-1.5 hover:text-[#EAFBFD] transition-colors whitespace-nowrap ml-1 text-white/90"
            aria-label="Email MAMI Career Consultant"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{email}</span>
          </a>
        </div>

        {/* Desktop Right Social Icons */}
        <div className="hidden sm:flex items-center gap-2.5 ml-auto">
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

