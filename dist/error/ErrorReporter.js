"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
const ts_framework_common_1 = require("ts-framework-common");
const HttpCode_1 = require("./http/HttpCode");
const HttpError_1 = require("./http/HttpError");
class ErrorReporter {
    constructor(errorDefinitions, options = {}) {
        this.errorDefinitions = errorDefinitions;
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    static middleware(errorDefinitions, options) {
        const reporter = new ErrorReporter(errorDefinitions, options);
        return function errorReporterMiddleware(app) {
            app.use(Sentry.Handlers.errorHandler());
            app.use((req, res) => reporter.notFound(req, res));
            app.use((error, req, res, next) => reporter.unknownError(error, req, res, next));
        };
    }
    notFound(req, res) {
        // Build error instance
        const error = new HttpError_1.default(`The resource was not found: ${req.method.toUpperCase()} ${req.originalUrl}`, 404, {
            method: req.method,
            originalUrl: req.originalUrl
        });
        // Send to Sentry if available
        if (this.options.sentry) {
            this.options.sentry.captureException(error, {
                req,
                level: "warning",
                tags: { stackId: error.stackId }
            });
        }
        // Log to console
        this.logger.warn(error.message, error.details);
        // Respond with error
        res.error(error);
    }
    unknownError(error, req, res, next) {
        let serverError;
        // Prepare error instance
        if (error && error.inner && error.inner instanceof HttpError_1.default) {
            // Fix for OAuth 2.0 errors, which encapsulate the original one into the "inner" property
            serverError = error.inner;
        }
        else if (error && error instanceof HttpError_1.default) {
            serverError = error;
        }
        else {
            serverError = new HttpError_1.default(error.message, error.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR, {
                code: error.code ? error.code : undefined
            });
            serverError.stack = error.stack || serverError.stack;
        }
        // Send to Sentry if available
        if (this.options.sentry) {
            this.options.sentry.captureException(serverError, {
                req,
                level: serverError.status >= 500 ? "error" : "warning",
                tags: { stackId: serverError.stackId }
            });
        }
        // Log to console
        this.logger.error(error.message, serverError.details);
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2QztBQUM3Qyw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBY3pDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdC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IFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVscGVycy9yZXNwb25zZVwiO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMgfSBmcm9tIFwiLi9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuL2h0dHAvSHR0cEVycm9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRlck9wdGlvbnMge1xuICBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yRGVmaW5pdGlvbnMge1xuICBbY29kZTogc3RyaW5nXToge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEVycm9yUmVwb3J0ZXIge1xuICBsb2dnZXI6IExvZ2dlcjtcbiAgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnM7XG4gIGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZXJyb3JEZWZpbml0aW9ucyA9IGVycm9yRGVmaW5pdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhdGljIG1pZGRsZXdhcmUoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMpOiAoQXBwbGljYXRpb24pID0+IHZvaWQge1xuICAgIGNvbnN0IHJlcG9ydGVyID0gbmV3IEVycm9yUmVwb3J0ZXIoZXJyb3JEZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVycm9yUmVwb3J0ZXJNaWRkbGV3YXJlKGFwcCkge1xuICAgICAgYXBwLnVzZShTZW50cnkuSGFuZGxlcnMuZXJyb3JIYW5kbGVyKCkpO1xuICAgICAgYXBwLnVzZSgocmVxLCByZXMpID0+IHJlcG9ydGVyLm5vdEZvdW5kKHJlcSwgcmVzKSk7XG4gICAgICBhcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHJlcG9ydGVyLnVua25vd25FcnJvcihlcnJvciwgcmVxLCByZXMsIG5leHQpKTtcbiAgICB9XG4gIH1cblxuICBub3RGb3VuZChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIC8vIEJ1aWxkIGVycm9yIGluc3RhbmNlXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgSHR0cEVycm9yKGBUaGUgcmVzb3VyY2Ugd2FzIG5vdCBmb3VuZDogJHtyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cmVxLm9yaWdpbmFsVXJsfWAsIDQwNCwge1xuICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgb3JpZ2luYWxVcmw6IHJlcS5vcmlnaW5hbFVybFxuICAgIH0pO1xuXG4gICAgLy8gU2VuZCB0byBTZW50cnkgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnJvciwge1xuICAgICAgICByZXEsXG4gICAgICAgIGxldmVsOiBcIndhcm5pbmdcIixcbiAgICAgICAgdGFnczogeyBzdGFja0lkOiBlcnJvci5zdGFja0lkIH1cbiAgICAgIH0gYXMgYW55KTtcbiAgICB9XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3IubWVzc2FnZSwgZXJyb3IuZGV0YWlscyk7XG5cbiAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICByZXMuZXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgdW5rbm93bkVycm9yKGVycm9yOiBhbnksIHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIGxldCBzZXJ2ZXJFcnJvcjogSHR0cEVycm9yO1xuXG4gICAgLy8gUHJlcGFyZSBlcnJvciBpbnN0YW5jZVxuICAgIGlmIChlcnJvciAmJiBlcnJvci5pbm5lciAmJiBlcnJvci5pbm5lciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgLy8gRml4IGZvciBPQXV0aCAyLjAgZXJyb3JzLCB3aGljaCBlbmNhcHN1bGF0ZSB0aGUgb3JpZ2luYWwgb25lIGludG8gdGhlIFwiaW5uZXJcIiBwcm9wZXJ0eVxuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvci5pbm5lciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIGlmIChlcnJvciAmJiBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlcnZlckVycm9yID0gbmV3IEh0dHBFcnJvcihlcnJvci5tZXNzYWdlLCBlcnJvci5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHtcbiAgICAgICAgY29kZTogZXJyb3IuY29kZSA/IGVycm9yLmNvZGUgOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgICAgc2VydmVyRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjayB8fCBzZXJ2ZXJFcnJvci5zdGFjaztcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRvIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlbnRyeSkge1xuICAgICAgdGhpcy5vcHRpb25zLnNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKHNlcnZlckVycm9yLCB7XG4gICAgICAgIHJlcSxcbiAgICAgICAgbGV2ZWw6IHNlcnZlckVycm9yLnN0YXR1cyA+PSA1MDAgPyBcImVycm9yXCIgOiBcIndhcm5pbmdcIixcbiAgICAgICAgdGFnczogeyBzdGFja0lkOiBzZXJ2ZXJFcnJvci5zdGFja0lkIH1cbiAgICAgIH0gYXMgYW55KTtcbiAgICB9XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UsIHNlcnZlckVycm9yLmRldGFpbHMpO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19