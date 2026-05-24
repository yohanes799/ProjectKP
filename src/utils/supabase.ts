import { createClient } from '@supabase/supabase-js'

// Mengambil kredensial dari environment variables Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mengekspor instance supabase agar bisa dipanggil di file lain
export const supabase = createClient(supabaseUrl, supabaseAnonKey);