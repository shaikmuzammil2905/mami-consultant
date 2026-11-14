import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import logoImg from '../assets/logo.png';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const { error } = await login(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid administrator credentials. Please try again.');
    } else {
      navigate(from, { replace: true });
    }
  };

  const fillQuickCredentials = () => {
    setEmail('admin@mamiconsultant.com');
    setPassword('Admin@Mami2026');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAFBFD] via-[#F4FBFD] to-[#E2F7FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#0799A8] hover:text-[#0B3566] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to MAMI Public Website</span>
        </Link>

        <div className="flex justify-center">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-[#CFEFF3]">
            <img src={logoImg} alt="MAMI Career Consultant" className="h-12 w-auto object-contain" />
          </div>
        </div>

        <h2 className="mt-5 text-center text-2xl font-black text-[#0B3566] tracking-tight">
          MAMI Admin Portal
        </h2>
        <p className="mt-1 text-center text-xs sm:text-sm text-[#60758A]">
          Manage website content, inquiries, jobs, and applications
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-6 sm:px-10 shadow-[0_20px_50px_-15px_rgba(7,153,168,0.18)] rounded-3xl border border-[#CFEFF3]">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
              <span className="font-bold shrink-0">Error:</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0799A8]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mamiconsultant.com"
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm text-[#0B3566] bg-[#F8FAFC] border border-[#D5EBF0] rounded-xl focus:ring-2 focus:ring-[#0799A8] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3566] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0799A8]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm text-[#0B3566] bg-[#F8FAFC] border border-[#D5EBF0] rounded-xl focus:ring-2 focus:ring-[#0799A8] focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#0799A8] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-[#0799A8] focus:ring-[#0799A8] mr-2"
                />
                <span>Remember this workstation</span>
              </label>
              <button
                type="button"
                onClick={fillQuickCredentials}
                className="text-[#0799A8] hover:underline font-semibold"
              >
                Auto-fill credentials
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-[#0799A8] to-[#007C91] hover:from-[#007C91] hover:to-[#0B3566] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0799A8] transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#60758A]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0799A8]" />
              <span>256-bit Supabase Protected</span>
            </span>
            <span>Version 2.0.0 Production</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
