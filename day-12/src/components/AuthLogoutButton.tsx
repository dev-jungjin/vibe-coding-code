"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function AuthLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onLogout() {
    if (!isSupabaseConfigured()) {
      return;
    }

    setPending(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
    } finally {
      setPending(false);
    }
  }

  return (
    <button className="nav-link" type="button" onClick={() => void onLogout()} disabled={pending}>
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
