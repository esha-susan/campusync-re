import { createClient } from "@supabase/supabase-js";

// This is the CORRECT way to get environment variables in a Vite project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// This line creates the Supabase client and exports it
export const supabase = createClient(supabaseUrl, supabaseAnonKey);