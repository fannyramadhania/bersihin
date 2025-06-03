const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_SUPABASE_PUBLIC_URL,
  process.env.NEXT_SUPABASE_ANON_KEY
);

export default supabase;
