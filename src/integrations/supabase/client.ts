import { createClient } from '@supabase/supabase-js'

// Use placeholder values for development when real Supabase credentials aren't available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

// Create client with placeholder values for development
// This prevents the app from crashing when Supabase credentials aren't configured
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
