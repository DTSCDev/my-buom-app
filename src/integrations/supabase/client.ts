import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key_for_development'

// For development, create a client even with placeholder values
// The auth features won't work, but the app will load
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
