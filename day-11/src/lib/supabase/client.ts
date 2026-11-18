import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createClient() {
  const { url, anonKey, configured } = getSupabaseEnv();
  if (!configured) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY 가 설정되지 않았습니다.",
    );
  }

  return createBrowserClient(url, anonKey);
}
