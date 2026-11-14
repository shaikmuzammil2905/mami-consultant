import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://abufyigzfbjsfsthscmk.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidWZ5aWd6ZmJqc2ZzdGhzY21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ0ODA1NTcsImV4cCI6MjExMDA1NjU1N30.4TwnBKvhaLlymXJdx_zwR0GzXeJqlIckPhuY7Emt08Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Verifies Supabase reachability
 */
export async function checkSupabaseConnection() {
  try {
    const { error } = await supabase.from('site_settings').select('count', { count: 'exact', head: true });
    // Even if table doesn't exist yet, HTTP 200/404 from supabase confirms endpoint connectivity
    return { ok: !error || error.code === 'PGRST116' || error.code === '42P01', error: error?.message || null };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
