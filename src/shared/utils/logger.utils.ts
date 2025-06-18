import pino from 'pino';
import fs from 'fs';
import { join } from 'path';
import { format } from 'date-fns';
import { Writable } from 'stream';

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
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      },
    });

export { logger };

export const morganStream = new Writable({
  write(chunk, _encoding, callback) {
    logger.info(chunk.toString().trim());
    callback();
  },
});
