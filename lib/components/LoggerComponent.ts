import * as Sentry from "@sentry/node";
import {
  Component,
  ComponentOptions,
  ComponentType,
  Logger,
  LoggerInstance,
  SentryTransport
} from "ts-framework-common";
import Server from "../server";

export interface LoggerComponentOptions extends ComponentOptions {
  logger?: LoggerInstance;
  sentry?: {
    dsn: string;
  };
}

export default class LoggerComponent implements Component {
  public type = ComponentType.MIDDLEWARE;
  public logger: LoggerInstance;

  constructor(public options: LoggerComponentOptions = {}) {
    try {
      this.logger = options.logger || Logger.getInstance();
    } catch (exception) {
      console.warn("Could not find default logger, a new one will be initialized");
      this.logger = Logger.initialize();

      // Add sentry transport to logger, if available
      if (this.options.sentry) {
        this.logger.add(new SentryTransport(this.options.sentry));
      }
    }
  }

  public describe(): { name: string; context: { transports: any[] } } {
    return {
      name: "LoggerComponent",
      context: {
        transports: this.logger.transports
      }
    };
  }

  public onMount(server: Server): void {
    // Start by registering Sentry if available
    if (this.logger && this.options.sentry) {
      this.logger.silly("Initializing server middleware: Sentry");

      // Registers the Raven express middleware
      server.app.use(Sentry.Handlers.requestHandler());
    }

    // Enable the logger middleware
    if (this.logger) {
      server.logger = this.logger;
      server.app.use((req: any, res, next) => {
        req.logger = this.logger;
        next();
      });
    }
  }

  public async onInit() {}

  public onUnmount() {}
}
