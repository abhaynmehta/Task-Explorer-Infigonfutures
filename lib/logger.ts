import winston from "winston";

declare global {
  var __productLogger: winston.Logger | undefined;
}

const getLogger = () => {
  if (typeof window !== "undefined") {
    throw new Error("Logger can only be used server-side");
  }

  if (global.__productLogger) {
    return global.__productLogger;
  }

  const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...meta }) => {
        const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
        return `${timestamp} [${level}] ${message}${metaStr}`;
      }),
    ),
    transports: [new winston.transports.Console()],
  });

  global.__productLogger = logger;
  return logger;
};

export const logger = getLogger();

