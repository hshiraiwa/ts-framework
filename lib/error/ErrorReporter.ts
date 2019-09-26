import * as Sentry from "@sentry/node";
import { BaseRequest, BaseResponse } from "../components/helpers/response";
import { Logger, LoggerInstance } from "ts-framework-common";
import { HttpServerErrors } from "./http/HttpCode";
import HttpError from "./http/HttpError";

export interface ErrorReporterOptions {
  sentry?: Sentry.NodeClient;
  logger?: LoggerInstance;
  group404?: boolean;
}

export interface ErrorDefinitions {
  [code: string]: {
    status: number;
    message: number;
  };
}

export class ErrorReporter {
  logger: LoggerInstance;
  options: ErrorReporterOptions;
  errorDefinitions: ErrorDefinitions;

  constructor(errorDefinitions: ErrorDefinitions, options: ErrorReporterOptions = {}) {
    this.errorDefinitions = errorDefinitions;
    this.options = options;
    this.logger = options.logger || Logger.getInstance();
  }

  static middleware(errorDefinitions: ErrorDefinitions, options: ErrorReporterOptions): (Application) => void {
    const reporter = new ErrorReporter(errorDefinitions, options);
    return function errorReporterMiddleware(app) {
      app.use((req, res) => reporter.notFound(req, res));
      app.use((error, req, res, next) => reporter.unknownError(error, req, res, next));
      app.use(Sentry.Handlers.errorHandler());
    };
  }

  notFound(req: BaseRequest, res: BaseResponse) {
    // Build error message
    const message =
      "The resource was not found" + (this.options.group404 ? "." : `: ${req.method.toUpperCase()} ${req.originalUrl}`);

    // Build error instance
    const error = new HttpError(message, 404, {
      method: req.method,
      originalUrl: req.originalUrl
    });

    // Log to console
    this.logger.warn(error);

    // Respond with error
    res.error(error);
  }

  unknownError(error: any, req: BaseRequest, res: BaseResponse, next: Function) {
    let serverError: HttpError;

    // Prepare error instance
    if (error && error.inner && error.inner instanceof HttpError) {
      // Fix for OAuth 2.0 errors, which encapsulate the original one into the "inner" property
      serverError = error.inner as HttpError;
    } else if (error && error instanceof HttpError) {
      serverError = error as HttpError;
      // Handles errors thrown by axios. Axios sends the relevant information on the error.data field
    } else if (error && error.data) {
      serverError = new HttpError(error.data.message, error.data.status || HttpServerErrors.INTERNAL_SERVER_ERROR, {
        code: error.data.code
      });

      serverError.stack = error.data.stack || serverError.stack;
    } else {
      serverError = new HttpError(error.message || error, error.status || HttpServerErrors.INTERNAL_SERVER_ERROR, {
        code: error.code ? error.code : undefined
      });
      serverError.stack = error.stack || serverError.stack;
    }

    // Log to console
    this.logger.error(serverError);

    // Respond with error
    res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
  }
}

export default ErrorReporter.middleware;
