import { Job, Logger, BaseServerOptions } from 'ts-framework-common';
import { ErrorDefinitions } from '../error/ErrorReporter';
import { SecurityComponentOptions, RequestComponentOptions, RouterComponentOptions } from '../components';
import ReplServer from '../repl';

export interface ServerOptions extends BaseServerOptions {
  /* Base server options */
  port: number;
  repl?: ReplServer;

  /* Logger options */
  logger?: Logger;
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