import { BaseServerOptions, Job, LoggerInstance } from "ts-framework-common";
import { RequestComponentOptions, RouterComponentOptions, SecurityComponentOptions } from "../components";
import ReplServer from "../repl";
export interface ServerOptions extends BaseServerOptions {
    /** The port to bind to server instance and listen to HTTP requests */
    port: string | number;
    /** The REPL console instance to bind to the server instance */
    repl?: ReplServer;
    /** Enables process event binding for graceful shutdown in SIGINT and SIGTERM interruptions */
    bindToProcess?: boolean;
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
