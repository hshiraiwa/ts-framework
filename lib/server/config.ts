import { BaseServerOptions, Job, Logger } from "ts-framework-common";
import { RequestComponentOptions, RouterComponentOptions, SecurityComponentOptions } from "../components";
import ReplServer from "../repl";

export interface ServerOptions extends BaseServerOptions {
  /* Base server options */
  port: number;
  repl?: ReplServer;

  /* Logger options */
  logger?: Logger;

  /* Sentry options */
  sentry?: {
    dsn: string;
  };

  /* Security options */
  security?: SecurityComponentOptions;

  /* Request options */
  request?: RequestComponentOptions;

  /* Router options */
  router?: RouterComponentOptions;

  /* Startup options */
  startup?: {
    pipeline: Job[];
  };
}
