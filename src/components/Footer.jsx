import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Facebook, Linkedin, Youtube, ChevronDown, ChevronRight } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <footer className="bg-mami-footer text-white pt-10 sm:pt-12 pb-6">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        {/* Desktop & Tablet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-white/15">
          {/* Logo & Brand */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" aria-label="MAMI Career Consultant Home">
              <img
                src={siteConfig.logoLight}
                alt="MAMI Career Consultant & Physio Care"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed max-w-xs">
              International healthcare career consultancy led by {siteConfig.owner}, empowering doctors, nurses, and physiotherapists worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => toggleAccordion('quick')}
              className="md:hidden w-full flex items-center justify-between py-2 font-bold text-base border-b border-white/15"
            >
              <span>Quick Links</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openAccordion === 'quick' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <h3 className="hidden md:block text-base font-bold text-white mb-4">Quick Links</h3>
            <ul
              className={`space-y-2.5 text-sm text-white/85 mt-3 md:mt-0 ${
                openAccordion === 'quick' ? 'block' : 'hidden md:block'
              }`}
            >
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Services', to: '/services' },
                { label: 'Training', to: '/training' },
                { label: 'Job Assistance', to: '/jobs' },
                { label: 'Contact Us', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 hover:text-[#7DE8F0] transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#2ABCC2]" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3">
            <button
              type="button"
              onClick={() => toggleAccordion('services')}
              className="md:hidden w-full flex items-center justify-between py-2 font-bold text-base border-b border-white/15"
            >
              <span>Our Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openAccordion === 'services' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <h3 className="hidden md:block text-base font-bold text-white mb-4">Our Services</h3>
            <ul
              className={`space-y-2.5 text-sm text-white/85 mt-3 md:mt-0 ${
                openAccordion === 'services' ? 'block' : 'hidden md:block'
              }`}
            >
              {[
                { label: 'Licensing Support', to: '/services/healthcare-licensing' },
                { label: 'Training & Preparation', to: '/services/training' },
                { label: 'Job Assistance', to: '/jobs' },
                { label: 'Documentation', to: '/services/documentation' },
                { label: 'Career Counselling', to: '/services/career-counselling' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 hover:text-[#7DE8F0] transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#2ABCC2]" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-white mb-3.5">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2.5 hover:text-[#7DE8F0]">
                  <Phone className="w-4 h-4 text-[#2ABCC2] shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#7DE8F0]"
                >
                  <MessageCircle className="w-4 h-4 text-[#2ABCC2] shrink-0" />
                  <span>{siteConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2ABCC2] shrink-0 mt-0.5" />
                <span className="leading-snug text-white/85">{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="text-base font-bold text-white mb-3.5">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socialLinks[0].href}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[1].href}
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks[2].href}
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white text-[#007C91] flex items-center justify-center hover:bg-[#EAFBFD] hover:scale-105 transition-transform"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/80 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.businessName}. All Rights Reserved.</p>
          <p>
            Your Global Career Partner | {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

