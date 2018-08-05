import { Job, Logger, BaseServerOptions } from 'ts-framework-common';
import { SecurityComponentOptions, RequestComponentOptions, RouterComponentOptions } from '../components';
import ReplServer from '../repl';
export interface ServerOptions extends BaseServerOptions {
    port: number;
    repl?: ReplServer;
    logger?: Logger;
    sentry?: {
        dsn: string;
    };
    security?: SecurityComponentOptions;
    request?: RequestComponentOptions;
    router?: RouterComponentOptions;
    startup?: {
        pipeline: Job[];
    };
}
