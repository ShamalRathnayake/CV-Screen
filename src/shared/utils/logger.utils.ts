import pino from 'pino';
import fs from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { Writable } from 'stream';
import { Request } from 'express';

const isProd = process.env.NODE_ENV === 'production';

const logDir = join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getLogFilePath = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return join(logDir, `app-${today}.log`);
};

const logger = isProd
  ? pino(
      {
        level: 'info',
        formatters: {
          level(label) {
            return { level: label };
          },
        },
      },
      pino.destination({ dest: getLogFilePath(), sync: false })
    )
  : pino({
      level: 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      },
    });

const logRequestInit = async (
  req: Request<object, object, any>,
  action?: string,
  logMsg?: string
): Promise<void> => {
  logger.info('---------------------------------------------');
  logger.info(
    {
      action: action,
      method: req.method,
      route: req.originalUrl,
      userId: req.user?.id || 'anonymous',
      ip: req.ip,
    },
    logMsg
  );
};

const logRequestEnd = async (
  req: Request<object, object, any>,
  action?: string,
  logMsg?: string
): Promise<void> => {
  logger.info(
    {
      action: action,
      userId: req.user?.id || 'anonymous',
      ip: req.ip,
    },
    logMsg
  );
};

export { logger, logRequestInit, logRequestEnd };

export const morganStream = new Writable({
  write(chunk, _encoding, callback) {
    logger.info(chunk.toString().trim());
    callback();
  },
});
