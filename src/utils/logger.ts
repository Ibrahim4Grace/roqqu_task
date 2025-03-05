import pino from 'pino';
import dayjs from 'dayjs';
const isDevelopment = process.env.NODE_ENV === 'development';

export const log = pino({
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
