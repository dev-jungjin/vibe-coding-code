import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function createClient() {
  const { url, anonKey, configured } = getSupabaseEnv();
  if (!configured) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component 에서 set 이 실패할 수 있습니다.
          // 세션 갱신은 middleware 가 담당합니다.
        }
      },
    },
  });
}
