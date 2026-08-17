type Level = "debug" | "info" | "warn" | "error";

const ORDER: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const activeLevel: Level =
  process.env.LOG_LEVEL === "debug"
    ? "debug"
    : process.env.NODE_ENV === "production"
      ? "info"
      : "debug";

function write(level: Level, message: string, meta?: unknown) {
  if (ORDER[level] < ORDER[activeLevel]) return;
  const ts = new Date().toISOString();
  const suffix = meta === undefined ? "" : ` ${JSON.stringify(meta)}`;
  // eslint-disable-next-line no-console
  console[level === "debug" ? "log" : level](`[${ts}] [${level}] ${message}${suffix}`);
}

export const logger = {
  debug: (message: string, meta?: unknown) => write("debug", message, meta),
  info: (message: string, meta?: unknown) => write("info", message, meta),
  warn: (message: string, meta?: unknown) => write("warn", message, meta),
  error: (message: string, meta?: unknown) => write("error", message, meta),
};
