import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareText,
  BriefcaseBusiness,
  Building2,
  FileText,
  Sparkles,
  Info,
  Stethoscope,
  Quote,
  Image as ImageIcon,
  Settings,
  Globe,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import logoImg from '../assets/logo.png';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navCategories = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
      ],
    },
    {
      title: 'LEADS & SUBMISSIONS',
      items: [
        { name: 'Contact Inquiries', path: '/admin/inquiries', icon: MessageSquareText },
        { name: 'Career Applications', path: '/admin/applications', icon: BriefcaseBusiness },
        { name: 'Partner Requests', path: '/admin/collaborations', icon: Building2 },
      ],
    },
    {
      title: 'WEBSITE CMS',
      items: [
        { name: 'Header & Navigation', path: '/admin/header', icon: Globe },
        { name: 'Hero Section', path: '/admin/hero', icon: Sparkles },
        { name: 'About Section', path: '/admin/about', icon: Info },
        { name: 'Services Manager', path: '/admin/services', icon: Stethoscope },
        { name: 'Job Openings', path: '/admin/jobs', icon: FileText },
        { name: 'Testimonials', path: '/admin/testimonials', icon: Quote },
      ],
    },
    {
      title: 'ASSETS & CONFIG',
      items: [
        { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
        { name: 'Site & Contact Settings', path: '/admin/settings', icon: Settings },
        { name: 'SEO & Metadata', path: '/admin/seo', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Permanent + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B2545] text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-xs shrink-0">
              <img src={logoImg} alt="MAMI" className="h-8 w-auto object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-sm tracking-tight text-white truncate">
                MAMI CMS
              </h2>
              <p className="text-[11px] text-[#2DD4BF] font-semibold">Admin Panel v2.0</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Live Website Button */}
        <div className="px-4 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#0799A8]/20 border border-white/10 text-xs font-semibold text-white/90 transition-all group"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>View Public Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navCategories.map((category) => (
            <div key={category.title}>
              <p className="px-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">
                {category.title}
              </p>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#0799A8] text-white font-bold shadow-sm'
                          : 'text-gray-300 hover:bg-white/8 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Admin Footer & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#081B33]">
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-bold text-white truncate">
                {user?.user_metadata?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email || 'admin@mami.com'}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2DD4BF]/20 text-[#2DD4BF] shrink-0">
              PROD
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-gray-500 hidden sm:block">MAMI Career Consultant</p>
              <h1 className="text-sm sm:text-base font-extrabold text-[#0B3566]">
                Content Management System
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0799A8] hover:text-[#007C91] px-3 py-1.5 rounded-lg border border-[#CFEFF3] bg-[#EAFBFD] transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="w-8 h-8 rounded-full bg-[#0799A8] text-white flex items-center justify-center text-xs font-black shadow-xs">
              M
            </div>
          </div>
        </header>

        {/* Routed Admin Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
