"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorReporter = void 0;
const Sentry = require("@sentry/node");
const ts_framework_common_1 = require("ts-framework-common");
const HttpCode_1 = require("./http/HttpCode");
const HttpError_1 = require("./http/HttpError");
const errorHelper_1 = require("./errorHelper");
class ErrorReporter {
    constructor(errorDefinitions, options = {}) {
        this.errorDefinitions = errorDefinitions;
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    static middleware(errorDefinitions, options) {
        const reporter = new ErrorReporter(errorDefinitions, options);
        return function errorReporterMiddleware(app) {
            app.use((req, res) => reporter.notFound(req, res));
            app.use((error, req, res, next) => reporter.unknownError(error, req, res, next));
            app.use(Sentry.Handlers.errorHandler());
        };
    }
    notFound(req, res) {
        // Build error message
        const message = "The resource was not found" + (this.options.group404 ? "." : `: ${req.method.toUpperCase()} ${req.originalUrl}`);
        // Build error instance
        const error = new HttpError_1.default(message, 404, {
            method: req.method,
            originalUrl: req.originalUrl
        });
        Sentry.withScope(scope => {
            if (this.options.group404) {
                scope.setFingerprint([req.method, req.originalUrl, "404"]);
            }
            // Log to console
            this.logger.warn(error.message, error);
            if (this.options.omitStack) {
                errorHelper_1.stripStacks(error);
            }
            // Respond with error
            res.error(error);
        });
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
            // Handles errors thrown by axios. Axios sends the relevant information on the error.data field
        }
        else if (error && error.data) {
            serverError = new HttpError_1.default(error.data.message, error.data.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR, {
                code: error.data.code
            });
            serverError.stack = error.data.stack || serverError.stack;
        }
        else {
            serverError = new HttpError_1.default(error.message || error, error.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR, {
                code: error.code ? error.code : undefined
            });
            serverError.stack = error.stack || serverError.stack;
        }
        // Log to console
        this.logger.error(serverError.message, serverError);
        if (this.options.omitStack) {
            errorHelper_1.stripStacks(serverError);
        }
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUF1QztBQUV2Qyw2REFBNkQ7QUFDN0QsOENBQW1EO0FBQ25ELGdEQUF5QztBQUN6QywrQ0FBNEM7QUFnQjVDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQs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QUFXLENBQUMsQ0FBQztTQUMxQjtRQUVELHFCQUFxQjtRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7Q0FDRjtBQWpGRCxzQ0FpRkM7QUFFRCxrQkFBZSxhQUFhLENBQUMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMgfSBmcm9tIFwiLi9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuL2h0dHAvSHR0cEVycm9yXCI7XG5pbXBvcnQgeyBzdHJpcFN0YWNrcyB9IGZyb20gXCIuL2Vycm9ySGVscGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRlck9wdGlvbnMge1xuICBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGdyb3VwNDA0PzogYm9vbGVhbjtcbiAgb21pdFN0YWNrPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvckRlZmluaXRpb25zIHtcbiAgW2NvZGU6IHN0cmluZ106IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvclJlcG9ydGVyIHtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnM7XG4gIGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZXJyb3JEZWZpbml0aW9ucyA9IGVycm9yRGVmaW5pdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhdGljIG1pZGRsZXdhcmUoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMpOiAoQXBwbGljYXRpb24pID0+IHZvaWQge1xuICAgIGNvbnN0IHJlcG9ydGVyID0gbmV3IEVycm9yUmVwb3J0ZXIoZXJyb3JEZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVycm9yUmVwb3J0ZXJNaWRkbGV3YXJlKGFwcCkge1xuICAgICAgYXBwLnVzZSgocmVxLCByZXMpID0+IHJlcG9ydGVyLm5vdEZvdW5kKHJlcSwgcmVzKSk7XG4gICAgICBhcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHJlcG9ydGVyLnVua25vd25FcnJvcihlcnJvciwgcmVxLCByZXMsIG5leHQpKTtcbiAgICAgIGFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLmVycm9ySGFuZGxlcigpKTtcbiAgICB9O1xuICB9XG5cbiAgbm90Rm91bmQocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpIHtcbiAgICAvLyBCdWlsZCBlcnJvciBtZXNzYWdlXG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIgKyAodGhpcy5vcHRpb25zLmdyb3VwNDA0ID8gXCIuXCIgOiBgOiAke3JlcS5tZXRob2QudG9VcHBlckNhc2UoKX0gJHtyZXEub3JpZ2luYWxVcmx9YCk7XG5cbiAgICAvLyBCdWlsZCBlcnJvciBpbnN0YW5jZVxuICAgIGNvbnN0IGVycm9yID0gbmV3IEh0dHBFcnJvcihtZXNzYWdlLCA0MDQsIHtcbiAgICAgIG1ldGhvZDogcmVxLm1ldGhvZCxcbiAgICAgIG9yaWdpbmFsVXJsOiByZXEub3JpZ2luYWxVcmxcbiAgICB9KTtcblxuICAgIFNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ncm91cDQwNCkge1xuICAgICAgICBzY29wZS5zZXRGaW5nZXJwcmludChbcmVxLm1ldGhvZCwgcmVxLm9yaWdpbmFsVXJsLCBcIjQwNFwiXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIExvZyB0byBjb25zb2xlXG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGVycm9yLm1lc3NhZ2UsIGVycm9yKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5vbWl0U3RhY2spIHtcbiAgICAgICAgc3RyaXBTdGFja3MoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICAgIHJlcy5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICB1bmtub3duRXJyb3IoZXJyb3I6IGFueSwgcmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHNlcnZlckVycm9yOiBIdHRwRXJyb3I7XG5cbiAgICAvLyBQcmVwYXJlIGVycm9yIGluc3RhbmNlXG4gICAgaWYgKGVycm9yICYmIGVycm9yLmlubmVyICYmIGVycm9yLmlubmVyIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICAvLyBGaXggZm9yIE9BdXRoIDIuMCBlcnJvcnMsIHdoaWNoIGVuY2Fwc3VsYXRlIHRoZSBvcmlnaW5hbCBvbmUgaW50byB0aGUgXCJpbm5lclwiIHByb3BlcnR5XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yLmlubmVyIGFzIEh0dHBFcnJvcjtcbiAgICB9IGVsc2UgaWYgKGVycm9yICYmIGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yIGFzIEh0dHBFcnJvcjtcbiAgICAgIC8vIEhhbmRsZXMgZXJyb3JzIHRocm93biBieSBheGlvcy4gQXhpb3Mgc2VuZHMgdGhlIHJlbGV2YW50IGluZm9ybWF0aW9uIG9uIHRoZSBlcnJvci5kYXRhIGZpZWxkXG4gICAgfSBlbHNlIGlmIChlcnJvciAmJiBlcnJvci5kYXRhKSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IG5ldyBIdHRwRXJyb3IoZXJyb3IuZGF0YS5tZXNzYWdlLCBlcnJvci5kYXRhLnN0YXR1cyB8fCBIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgICBjb2RlOiBlcnJvci5kYXRhLmNvZGVcbiAgICAgIH0pO1xuXG4gICAgICBzZXJ2ZXJFcnJvci5zdGFjayA9IGVycm9yLmRhdGEuc3RhY2sgfHwgc2VydmVyRXJyb3Iuc3RhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlcnZlckVycm9yID0gbmV3IEh0dHBFcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yLCBlcnJvci5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHtcbiAgICAgICAgY29kZTogZXJyb3IuY29kZSA/IGVycm9yLmNvZGUgOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgICAgc2VydmVyRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjayB8fCBzZXJ2ZXJFcnJvci5zdGFjaztcbiAgICB9XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLmVycm9yKHNlcnZlckVycm9yLm1lc3NhZ2UsIHNlcnZlckVycm9yKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMub21pdFN0YWNrKSB7XG4gICAgICBzdHJpcFN0YWNrcyhzZXJ2ZXJFcnJvcik7XG4gICAgfVxuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19