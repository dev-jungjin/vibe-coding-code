import { NextResponse } from "next/server";
import { log } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();

  try {
    log({
      level: "warn",
      action: "debug.error.start",
      path: "/api/debug-error",
    });
    throw new Error("Intentional debug error for log tracing practice");
  } catch (error) {
    log({
      level: "error",
      action: "debug.error",
      path: "/api/debug-error",
      durationMs: Date.now() - started,
      meta: {
        message: error instanceof Error ? error.message : "unknown",
        hint: "Search for action=debug.error in Vercel Runtime Logs or logs/app.log",
      },
    });

    return NextResponse.json(
      {
        error: "Intentional debug error",
        hint: "Vercel Runtime Logs 또는 logs/app.log 에서 action=debug.error 를 찾으세요.",
      },
      { status: 500 },
    );
  }
}
