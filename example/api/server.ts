import { Logger, SentryTransport } from 'nano-errors';
import Server, { ServerOptions } from 'ts-framework';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';
import WelcomeJob from './jobs/WelcomeJob';

// Prepare server port
const port = process.env.PORT as any || 3000;

// Prepare global logger instance
const sentry = process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined;
const logger = Logger.initialize({
  transports: [
    ...Logger.DEFAULT_TRANSPORTS,
    new SentryTransport({ ...sentry }),
  ]
});


export default class MainServer extends Server {
  constructor(options?: ServerOptions) {
    super({
      port,
      logger,
      sentry,
      router: { 
        controllers: { StatusController } 
      },
      children: [
        UptimeService.getInstance(),
        new WelcomeJob({}),
      ],
      ...options,
    });
  }
}
