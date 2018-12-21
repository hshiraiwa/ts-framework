import Server, { ReplConsole } from '../../lib';
import StatusController from './controllers/StatusController';
import UptimeService from './services/UptimeService';
import { Logger } from 'ts-framework-common';

// Prepare server port
const port = process.env.PORT as any || 3000;

// Prepare global logger instance
const sentry = process.env.SENTRY_DSN ? { dsn: process.env.SENTRY_DSN } : undefined;
const logger = Logger.getInstance({ sentry });

export default class MainServer extends Server {
  constructor() {
    super({
      port,
      logger,
      sentry,
      router: { 
        controllers: { StatusController } 
      },
      children: [
        UptimeService.getInstance()
      ],
    });
  }
}
