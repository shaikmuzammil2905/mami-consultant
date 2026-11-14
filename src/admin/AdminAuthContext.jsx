import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AdminAuthContext = createContext(null);

function safeStorageGet(key) {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function safeStorageSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    console.warn('Storage write notice:', e);
  }
}

function safeStorageRemove(key) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(key);
  } catch (e) {}
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = safeStorageGet('mami_admin_session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [session, setSession] = useState(() => {
    const stored = safeStorageGet('mami_admin_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return { user: parsed, access_token: 'local-session-active' };
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Safety timeout to ensure loading state never hangs
    const safetyTimer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 2000);

    // 1. Get initial session from Supabase
    try {
      supabase.auth
        .getSession()
        .then(({ data }) => {
          if (!isMounted) return;
          const currentSession = data?.session ?? null;
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user ?? null);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.warn('Supabase auth getSession note:', err);
          if (isMounted) setLoading(false);
        });
    } catch (e) {
      console.warn('Supabase getSession sync note:', e);
      if (isMounted) setLoading(false);
    }

    // 2. Listen for auth state changes
    let subscription = null;
    try {
      const authListener = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!isMounted) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      });
      subscription = authListener?.data?.subscription;
    } catch (err) {
      console.warn('Supabase onAuthStateChange error:', err);
    }

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      try {
        subscription?.unsubscribe?.();
      } catch (e) {}
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Attempt standard Supabase Auth signIn
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      // 2. If user doesn't exist yet in Supabase Auth, attempt automatic signup
      if (error && error.message?.toLowerCase().includes('invalid login credentials')) {
        try {
          const signUpRes = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: { role: 'Super Admin', name: 'Dr. Ramyakrishna Mamidala' },
            },
          });
          if (signUpRes.data?.session) {
            data = signUpRes.data;
            error = null;
          }
        } catch (signErr) {
          console.warn('Auto signup note:', signErr);
        }
      }

      if (error) {
        // Fallback for initial setup if admin credentials match master login
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
          safeStorageSet('mami_admin_session', JSON.stringify(mockUser));
          return { data: { user: mockUser }, error: null };
        }
        throw error;
      }

      setUser(data.user);
      setSession(data.session);
      safeStorageSet('mami_admin_session', JSON.stringify(data.user));
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
    safeStorageRemove('mami_admin_session');
    setUser(null);
    setSession(null);
  };

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

