import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Check if we have real Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client for development when Supabase isn't configured
const createMockSupabaseClient = (): any => ({
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => ({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => ({ data: null, error: { message: 'Supabase not configured' } })
  })
});

// Export either real or mock client
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabaseClient();
