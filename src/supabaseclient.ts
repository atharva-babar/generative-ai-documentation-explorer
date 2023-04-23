import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

export const supabaseClient = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_PUBLIC_KEY || '',
);
