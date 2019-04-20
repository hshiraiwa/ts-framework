import * as Sentry from "@sentry/node";
import { BaseRequest, BaseResponse } from "../components/helpers/response";
import { LoggerInstance } from "ts-framework-common";
export interface ErrorReporterOptions {
    sentry?: Sentry.NodeClient;
    logger?: LoggerInstance;
}
export interface ErrorDefinitions {
    [code: string]: {
        status: number;
        message: number;
    };
}
export declare class ErrorReporter {
    logger: LoggerInstance;
    options: ErrorReporterOptions;
    errorDefinitions: ErrorDefinitions;
    constructor(errorDefinitions: ErrorDefinitions, options?: ErrorReporterOptions);
    static middleware(errorDefinitions: ErrorDefinitions, options: ErrorReporterOptions): (Application: any) => void;
    notFound(req: BaseRequest, res: BaseResponse): void;
    unknownError(error: any, req: BaseRequest, res: BaseResponse, next: Function): void;
}
declare const _default: typeof ErrorReporter.middleware;
export default _default;
