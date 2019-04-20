import { BaseServerOptions, Job, Logger, LoggerInstance } from "ts-framework-common";
import { RequestComponentOptions, RouterComponentOptions, SecurityComponentOptions } from "../components";
import ReplServer from "../repl";

export interface ServerOptions extends BaseServerOptions {
  /** The port to bind to server instance and listen to HTTP requests */
  port: string | number;

  /** The REPL console instance to bind to the server instance */
  repl?: ReplServer;

  /** Enables process event binding for graceful shutdown in SIGINT and SIGTERM interruptions */
  bindToProcess?: boolean;

  /* Logger options */
  logger?: LoggerInstance;

  /* Sentry options for logging and request exception handling */
  sentry?: {
    dsn: string;
  };

  /* Security component options */
  security?: SecurityComponentOptions;

  /* Request component options */
  request?: RequestComponentOptions;

  /* Router component options */
  router?: RouterComponentOptions;

  /* Startup job options */
  startup?: {
    pipeline: Job[];
  };
}
