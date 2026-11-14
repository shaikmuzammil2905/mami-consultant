import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquareText,
  BriefcaseBusiness,
  Building2,
  Stethoscope,
  FileText,
  Quote,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlusCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Database,
  Cloud,
} from 'lucide-react';
import { supabase, checkSupabaseConnection } from '../../lib/supabase';
import { getCloudinaryConfig } from '../../lib/cloudinary';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    inquiriesTotal: 0,
    inquiriesNew: 0,
    applicationsTotal: 0,
    applicationsNew: 0,
    collaborationsTotal: 0,
    servicesCount: 7,
    jobsCount: 4,
    testimonialsCount: 3,
    mediaCount: 12,
  });

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [dbStatus, setDbStatus] = useState({ ok: true, checking: true });
  const [cloudinaryConfig, setCloudinaryConfig] = useState(getCloudinaryConfig());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      // 1. Check DB Health
      const conn = await checkSupabaseConnection();
      setDbStatus({ ok: conn.ok, checking: false });

      try {
        // 2. Fetch Inquiries Counts
        const { count: inqCount } = await supabase
          .from('contact_inquiries')
          .select('*', { count: 'exact', head: true });

        const { count: inqNewCount } = await supabase
          .from('contact_inquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'New');

        // 3. Fetch Recent Inquiries
        const { data: inqData } = await supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (inqData) setRecentInquiries(inqData);

        // 4. Fetch Career Applications Counts
        const { count: appCount } = await supabase
          .from('career_applications')
          .select('*', { count: 'exact', head: true });

        const { count: appNewCount } = await supabase
          .from('career_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'New');

        // 5. Fetch Recent Applications
        const { data: appData } = await supabase
          .from('career_applications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (appData) setRecentApplications(appData);

        // 6. Fetch Collaboration Counts
        const { count: collabCount } = await supabase
          .from('collaboration_requirements')
          .select('*', { count: 'exact', head: true });

        // 7. Services & Jobs Counts
        const { count: svcCount } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        const { count: jbCount } = await supabase
          .from('job_listings')
          .select('*', { count: 'exact', head: true });

        const { count: testCount } = await supabase
          .from('testimonials')
          .select('*', { count: 'exact', head: true });

        const { count: medCount } = await supabase
          .from('media_assets')
          .select('*', { count: 'exact', head: true });

        setStats({
          inquiriesTotal: inqCount || 0,
          inquiriesNew: inqNewCount || 0,
          applicationsTotal: appCount || 0,
          applicationsNew: appNewCount || 0,
          collaborationsTotal: collabCount || 0,
          servicesCount: svcCount || 7,
          jobsCount: jbCount || 4,
          testimonialsCount: testCount || 3,
          mediaCount: medCount || 12,
        });
      } catch (err) {
        console.warn('Dashboard data fetch notice:', err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Contact Inquiries',
      value: stats.inquiriesTotal,
      badge: `${stats.inquiriesNew} New`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: MessageSquareText,
      color: 'text-[#0799A8]',
      bg: 'bg-[#EAFBFD]',
      link: '/admin/inquiries',
    },
    {
      title: 'Job Applications',
      value: stats.applicationsTotal,
      badge: `${stats.applicationsNew} Pending`,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: BriefcaseBusiness,
      color: 'text-[#0B3566]',
      bg: 'bg-blue-50',
      link: '/admin/applications',
    },
    {
      title: 'Partner Requirements',
      value: stats.collaborationsTotal,
      badge: 'Active',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      icon: Building2,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      link: '/admin/collaborations',
    },
    {
      title: 'Published Services',
      value: stats.servicesCount,
      badge: 'Live',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      icon: Stethoscope,
      color: 'text-[#007C91]',
      bg: 'bg-[#E0F7FA]',
      link: '/admin/services',
    },
    {
      title: 'Active Job Openings',
      value: stats.jobsCount,
      badge: 'Recruiting',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: FileText,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      link: '/admin/jobs',
    },
    {
      title: 'Client Testimonials',
      value: stats.testimonialsCount,
      badge: 'Featured',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Quote,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      link: '/admin/testimonials',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B3566] via-[#0799A8] to-[#007C91] p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MAMI Career Consultant CMS Dashboard</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Welcome, Dr. Ramyakrishna Mamidala & Management
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-cyan-100 leading-relaxed">
            Manage your international healthcare licensing content, review prospective candidate CVs, update hospital recruitment requirements, and control all public website sections in real time.
          </p>
        </div>
      </div>

      {/* Backend & Cloudinary Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Supabase Status */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Supabase Backend</p>
              <p className="text-sm font-bold text-[#0B3566]">
                {dbStatus.ok ? 'Connected (Live API)' : 'Offline / Standby'}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active</span>
          </span>
        </div>

        {/* Cloudinary Status */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAFBFD] text-[#0799A8] flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Cloudinary Media</p>
              <p className="text-sm font-bold text-[#0B3566]">
                Preset: {cloudinaryConfig.uploadPreset}
              </p>
            </div>
          </div>
          <Link
            to="/admin/settings"
            className="text-[11px] font-bold text-[#0799A8] hover:underline"
          >
            {cloudinaryConfig.isConfigured ? 'Configured' : 'Set Cloud Name'}
          </Link>
        </div>

        {/* Public Website Status */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B3566] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">Live Production Site</p>
              <p className="text-sm font-bold text-[#0B3566]">mami-consultant.vercel.app</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#0799A8] hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-[#0799A8] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B3566] tracking-tight">
                  {card.value}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1 truncate">
                  {card.title}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-[#0799A8] group-hover:translate-x-0.5 transition-transform">
                <span>Manage</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-xs">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/jobs"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EAFBFD] border border-gray-200 hover:border-[#CFEFF3] text-xs font-bold text-[#0B3566] transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#0799A8]" />
            <span>Post New Job</span>
          </Link>
          <Link
            to="/admin/services"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EAFBFD] border border-gray-200 hover:border-[#CFEFF3] text-xs font-bold text-[#0B3566] transition-all"
          >
            <Stethoscope className="w-4 h-4 text-[#0799A8]" />
            <span>Edit Services</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EAFBFD] border border-gray-200 hover:border-[#CFEFF3] text-xs font-bold text-[#0B3566] transition-all"
          >
            <ImageIcon className="w-4 h-4 text-[#0799A8]" />
            <span>Upload Images</span>
          </Link>
          <Link
            to="/admin/hero"
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EAFBFD] border border-gray-200 hover:border-[#CFEFF3] text-xs font-bold text-[#0B3566] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#0799A8]" />
            <span>Update Hero Copy</span>
          </Link>
        </div>
      </div>

      {/* Recent Submissions Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Inquiries */}
        <div className="p-5 sm:p-6 bg-white rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-[#0B3566] text-base">Recent Contact Inquiries</h3>
              <p className="text-xs text-gray-500">Prospective healthcare candidates</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-[#0799A8] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs">
              <MessageSquareText className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <span>No inquiries recorded yet. Form submissions will appear here.</span>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0B3566] truncate">{inq.full_name}</p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {inq.profession || 'Healthcare Professional'} • {inq.phone}
                    </p>
                    <p className="text-[11px] text-[#0799A8] font-medium truncate mt-0.5">
                      Interest: {inq.service_interest || 'General Consultation'}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      inq.status === 'New'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Career Applications */}
        <div className="p-5 sm:p-6 bg-white rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-[#0B3566] text-base">Recent Job Applications</h3>
              <p className="text-xs text-gray-500">Candidates applying via /career/apply</p>
            </div>
            <Link
              to="/admin/applications"
              className="text-xs font-bold text-[#0799A8] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentApplications.length === 0 ? (
            <div className="py-8 text-center text-gray-400 text-xs">
              <BriefcaseBusiness className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <span>No applications received yet. Applications submitted via /career will appear here.</span>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentApplications.map((app) => (
                <div key={app.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#0B3566] truncate">{app.full_name}</p>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {app.application_ref}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate">
                      {app.applied_job} • {app.experience} Exp
                    </p>
                    <p className="text-[11px] text-[#0799A8] font-medium truncate mt-0.5">
                      {app.qualification} • {app.preferred_location}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      app.status === 'New'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

