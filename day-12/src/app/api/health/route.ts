import { NextResponse } from "next/server";
import { log } from "@/lib/logger";
import { isDatabaseConfigured } from "@/lib/prisma";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();
  const payload = {
    ok: true,
    timestamp: new Date().toISOString(),
    databaseConfigured: isDatabaseConfigured(),
    supabaseConfigured: isSupabaseConfigured(),
  };

  log({
    level: "info",
    action: "health.check",
    path: "/api/health",
    durationMs: Date.now() - started,
    meta: payload,
  });

  return NextResponse.json(payload);
}
