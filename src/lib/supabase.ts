import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  company: string;
  job_title: string;
  phone?: string;
  wants_consultation: boolean;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

export interface DownloadLog {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  company: string | null;
  resource_id: string;
  resource_title: string;
  downloaded_at: string;
}
