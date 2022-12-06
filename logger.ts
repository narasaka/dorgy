import { log } from './deps.ts';

log.setup({
  handlers: {
    file: new log.handlers.FileHandler('INFO', {
      filename: './dorgy.log',
      formatter: '{levelName} {msg}',
    }),
  },

  loggers: {
    default: {
      level: 'INFO',
      handlers: ['file'],
    },
  },
});

export const logger = log.getLogger();
