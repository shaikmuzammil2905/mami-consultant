import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, Phone, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { useModal } from '../context/ModalContext';
import { useSiteContent } from '../context/ContentContext';

const serviceLinks = [
  { label: 'Healthcare Licensing Services', to: '/services/healthcare-licensing' },
  { label: 'International Registration Support', to: '/services/international-registration' },
  { label: 'Online Training & Exam Preparation', to: '/services/training' },
  { label: 'Mock Tests & Interview Preparation', to: '/services/mock-tests' },
  { label: 'International Healthcare Recruitment', to: '/services/recruitment' },
  { label: 'Documentation & Verification Support', to: '/services/documentation' },
  { label: 'Career Counselling', to: '/services/career-counselling' },
];

const trainingLinks = [
  { label: 'All Training Programs', to: '/training' },
  { label: 'DHA / DOH / MOH Exam Prep', to: '/services/training' },
  { label: 'Mock Tests & Interview Prep', to: '/services/mock-tests' },
];

export default function Header() {
  const { siteSettings } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const dropdownTimerRef = useRef(null);
  const location = useLocation();
  const { openModal } = useModal();

  const logoSrc = siteSettings?.logo_url || siteConfig.logo;
  const ctaText = siteSettings?.header_cta_text || 'Enquire Now';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (key) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const navLinkClass = ({ isActive }) =>
    `px-1 xl:px-2 2xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'bg-[#0799A8] text-white shadow-sm'
        : 'text-[#0B3566] hover:text-[#0799A8] hover:bg-[#EAFBFD]'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_6px_24px_-6px_rgba(7,153,168,0.18)] py-1.5'
            : 'bg-white/85 backdrop-blur-sm py-2.5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-3 sm:px-5 2xl:px-6 flex items-center justify-between gap-2 xl:gap-3">
          {/* Brand Logo — zero white patch */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0799A8] rounded-lg"
            aria-label="MAMI Career Consultant Home"
          >
            <img
              src={logoSrc}
              alt="MAMI Career Consultant & Physio Care"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-9 xl:h-11 2xl:h-12' : 'h-10 xl:h-12 2xl:h-13'
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 2xl:gap-1" aria-label="Main Navigation">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>

            <NavLink to="/why-choose-us" className={navLinkClass}>
              Why Choose Us
            </NavLink>

            {/* Our Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `inline-flex items-center gap-0.5 xl:gap-1 px-1 xl:px-2 2xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0799A8] text-white shadow-sm'
                      : 'text-[#0B3566] hover:text-[#0799A8] hover:bg-[#EAFBFD]'
                  }`
                }
              >
                <span>Our Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-1.5 w-72 rounded-2xl bg-white border border-[#CFEFF3] shadow-xl p-2 z-50"
                  >
                    {serviceLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#173B63] hover:bg-[#EAFBFD] hover:text-[#007C91] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Training Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('training')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/training"
                className={({ isActive }) =>
                  `inline-flex items-center gap-0.5 xl:gap-1 px-1 xl:px-2 2xl:px-3 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-[12.5px] 2xl:text-[14px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0799A8] text-white shadow-sm'
                      : 'text-[#0B3566] hover:text-[#0799A8] hover:bg-[#EAFBFD]'
                  }`
                }
              >
                <span>Training</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'training' ? 'rotate-180' : ''
                  }`}
                />
              </NavLink>

              <AnimatePresence>
                {openDropdown === 'training' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-1.5 w-64 rounded-2xl bg-white border border-[#CFEFF3] shadow-xl p-2 z-50"
                  >
                    {trainingLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#173B63] hover:bg-[#EAFBFD] hover:text-[#007C91] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/jobs" className={navLinkClass}>
              Job Assistance
            </NavLink>

            <NavLink to="/career" className={navLinkClass}>
              Career
            </NavLink>

            <NavLink to="/collaborate" className={navLinkClass}>
              Collaborate With MAMI
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>

          {/* Desktop Right CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openModal('enquiry', { source: 'Header Button' })}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 xl:px-4 2xl:px-5 py-1.5 xl:py-2 2xl:py-2.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-[11px] xl:text-xs 2xl:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group whitespace-nowrap"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button matching mobile UI reference */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileOpen}
              className="lg:hidden w-11 h-11 rounded-xl bg-gradient-to-br from-[#0799A8] to-[#007C91] text-white flex items-center justify-center shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#0B3566]/45 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
              aria-label="Mobile Navigation"
            >
              <div>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAFBFD]">
                  <img
                    src={siteConfig.logo}
                    alt="MAMI Career Consultant"
                    className="h-11 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close Menu"
                    className="w-10 h-10 rounded-xl bg-[#EAFBFD] text-[#007C91] flex items-center justify-center hover:bg-[#D4F6FA] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4 space-y-1.5">
                  <NavLink
                    to="/"
                    end
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    About Us
                  </NavLink>

                  <NavLink
                    to="/why-choose-us"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Why Choose Us
                  </NavLink>

                  {/* Services collapsible */}
                  <div>
                    <div className="flex items-center justify-between rounded-xl hover:bg-[#EAFBFD]">
                      <NavLink
                        to="/services"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 px-4 py-3 font-semibold text-[15px] text-[#0B3566]"
                      >
                        Services
                      </NavLink>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenu(mobileSubmenu === 'services' ? null : 'services')
                        }
                        aria-label="Toggle Services Submenu"
                        className="p-3 text-[#007C91] cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileSubmenu === 'services' ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileSubmenu === 'services' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 space-y-1 pb-1"
                        >
                          {serviceLinks.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 rounded-lg text-sm text-[#173B63] hover:bg-[#EAFBFD] hover:text-[#007C91]"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <NavLink
                    to="/training"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Training
                  </NavLink>

                  <NavLink
                    to="/jobs"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Job Assistance
                  </NavLink>

                  <NavLink
                    to="/career"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Career
                  </NavLink>

                  <NavLink
                    to="/collaborate"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Collaborate With MAMI
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-semibold text-[15px] ${
                        isActive ? 'bg-[#0799A8] text-white' : 'text-[#0B3566] hover:bg-[#EAFBFD]'
                      }`
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>

                <div className="px-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openModal('enquiry', { source: 'Mobile Drawer' });
                    }}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0799A8] to-[#007C91] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5 bg-[#EAFBFD] border-t border-[#CFEFF3] space-y-2.5">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#0B3566]"
                >
                  <Phone className="w-4 h-4 text-[#0799A8]" />
                  <span>{siteConfig.phone}</span>
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-semibold text-[#007C91]"
                >
                  <MessageCircle className="w-4 h-4 text-[#0799A8]" />
                  <span>Chat on WhatsApp</span>
                </a>
                <p className="text-xs text-[#60758A] pt-1">{siteConfig.tagline}</p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

