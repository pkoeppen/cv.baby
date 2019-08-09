import * as winston from 'winston';
const { format } = winston;

export function createLogger(identifier, level = 'debug') {
  const logger = winston.createLogger({
    level,
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(
        info =>
          `${info.timestamp} ${info.level}: ` +
          `[${identifier}][${info.fn}] ${info.message}`
      )
    ),
    defaultMeta: { identifier, fn: 'unknown' },
    transports: [] // TODO: Add Loggly transport
  });

  // If we're not in production, log to the console.
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf(
            info =>
              `${info.timestamp} ${info.level}: ` +
              `[${identifier}][${info.fn}] ${info.message}`
          )
        )
      })
    );
  }

  return logger;
}
