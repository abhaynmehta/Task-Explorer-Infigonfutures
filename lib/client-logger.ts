const isDev = process.env.NODE_ENV === "development";

export const clientLogger = {
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (isDev) console.debug(message, meta);
  },
  info: (message: string, meta?: Record<string, unknown>) => {
    if (isDev) console.info(message, meta);
  },
  warn: (message: string, meta?: Record<string, unknown>) => console.warn(message, meta),
  error: (message: string, meta?: Record<string, unknown>) => console.error(message, meta),
};


