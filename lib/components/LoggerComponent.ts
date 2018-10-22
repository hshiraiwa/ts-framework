import * as Sentry from "@sentry/node";
import * as Git from "git-rev-sync";
import { Logger, ComponentOptions, Component, ComponentType } from "ts-framework-common";
import Server from "../server";

/* Generates Sentry release version based on Git repository, if available */
const SENTRY_RELEASE = process.env.SENTRY_RELEASE
  ? process.env.SENTRY_RELEASE
  : (() => {
      try {
        return Git.long();
      } catch (error) {}
    })();

export interface LoggerComponentOptions extends ComponentOptions {
  logger?: Logger;
  sentry?: {
    dsn: string;
  };
}

export default class LoggerComponent implements Component {
  public type = ComponentType.MIDDLEWARE;
  protected logger: Logger;

  constructor(public options: LoggerComponentOptions = {}) {
    this.logger = options.logger || Logger.getInstance();
  }

  public describe() {
    return { name: "LoggerComponent" };
  }

  public onMount(server: Server): void {
    // Start by registering Sentry if available
    if (this.logger && this.options.sentry) {
      this.logger.silly("Initializing server middleware: Sentry");

      // Prepare raven instance configuration
      Sentry.init({
        ...this.options.sentry,
        release: SENTRY_RELEASE
      });

      // Registers the Raven express middleware
      server.app.use(Sentry.Handlers.requestHandler());
    }

    // Enable the logger middleware
    if (this.logger) {
      server.app.use((req: any, res, next) => {
        req.logger = this.logger;
        next();
      });
    }
  }

  public async onInit() {}

  public onUnmount() {}
}
