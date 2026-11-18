import { appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export type LogLevel = "info" | "warn" | "error" | "debug";

export type LogInput = {
  level: LogLevel;
  action: string;
  userId?: string | null;
  path?: string;
  durationMs?: number;
  meta?: Record<string, unknown>;
};

const SENSITIVE_KEY =
  /password|passwordHash|token|access_token|refresh_token|authorization|cookie|secret|anon_key|service_role|api[_-]?key/i;

function maskSensitive(value: unknown, key?: string): unknown {
  if (key && SENSITIVE_KEY.test(key)) {
    return "[REDACTED]";
  }
  if (Array.isArray(value)) {
    return value.map((item) => maskSensitive(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([childKey, childValue]) => [
        childKey,
        maskSensitive(childValue, childKey),
      ]),
    );
  }
  return value;
}

function appendLocalLog(line: string) {
  try {
    const dir = join(process.cwd(), "logs");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "app.log"), `${line}\n`, "utf8");
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "error",
        action: "logger.file_write_failed",
        meta: { message: error instanceof Error ? error.message : "unknown" },
      }),
    );
  }
}

export function log(input: LogInput) {
  const record = {
    timestamp: new Date().toISOString(),
    level: input.level,
    action: input.action,
    userId: input.userId ?? null,
    path: input.path,
    durationMs: input.durationMs,
    meta: input.meta ? (maskSensitive(input.meta) as Record<string, unknown>) : undefined,
  };

  const line = JSON.stringify(record);

  if (record.level === "error") {
    console.error(line);
  } else if (record.level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }

  if (process.env.NODE_ENV !== "production") {
    appendLocalLog(line);
  }
}
