import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sdxfxzzhcnnxjnuzkwva.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable__qfh02H5u4erQvSBAqB7NQ_UKMcL1Gc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

