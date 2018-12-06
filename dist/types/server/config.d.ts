import { BaseServerOptions, Job, LoggerInstance } from "ts-framework-common";
import { RequestComponentOptions, RouterComponentOptions, SecurityComponentOptions } from "../components";
import ReplServer from "../repl";
export interface ServerOptions extends BaseServerOptions {
    port: number;
    repl?: ReplServer;
    logger?: LoggerInstance;
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
