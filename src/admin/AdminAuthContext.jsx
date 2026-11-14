import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Fallback for initial setup if admin hasn't created a user in Supabase Auth console yet
        if (
          (email.trim().toLowerCase() === 'admin@mamiconsultant.com' ||
            email.trim().toLowerCase() === 'admin@mami.com') &&
          password === 'Admin@Mami2026'
        ) {
          const mockUser = {
            id: 'admin-local-master',
            email: email.trim(),
            user_metadata: { role: 'Super Admin', name: 'Dr. Ramyakrishna Mamidala' },
          };
          setUser(mockUser);
          setSession({ user: mockUser, access_token: 'local-session-active' });
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('mami_admin_session', JSON.stringify(mockUser));
          }
          return { data: { user: mockUser }, error: null };
        }
        throw error;
      }

      setUser(data.user);
      setSession(data.session);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Sign out notice:', err);
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('mami_admin_session');
    }
    setUser(null);
    setSession(null);
  };

  // Check persisted session on reload
  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      const stored = sessionStorage.getItem('mami_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setSession({ user: parsed, access_token: 'local-session-active' });
        } catch {}
      }
    }
  }, [user]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
