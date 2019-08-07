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
        // Log to console
        this.logger.warn(error);
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
        this.logger.error(serverError);
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2RDtBQUM3RCw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBZXpDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCLEVBQUUsR0FBaUI7UUFDMUMsc0JBQXNCO1FBQ3RCLE1BQU0sT0FBTyxHQUNYLDRCQUE0QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBILHVCQUF1QjtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztRQUVILGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixxQkFBcUI7UUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQVUsRUFBRSxHQUFnQixFQUFFLEdBQWlCLEVBQUUsSUFBYztRQUMxRSxJQUFJLFdBQXNCLENBQUM7UUFFM0IseUJBQXlCO1FBQ3pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssWUFBWSxtQkFBUyxFQUFFO1lBQzVELHlGQUF5RjtZQUN6RixXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQWtCLENBQUM7U0FDeEM7YUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksbUJBQVMsRUFBRTtZQUM5QyxXQUFXLEdBQUcsS0FBa0IsQ0FBQztZQUNuQywrRkFBK0Y7U0FDOUY7YUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzlCLFdBQVcsR0FBRyxJQUFJLG1CQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksMkJBQWdCLENBQUMscUJBQXFCLEVBQUU7Z0JBQzNHLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQzNEO2FBQU07WUFDTCxXQUFXLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksMkJBQWdCLENBQUMscUJBQXFCLEVBQUU7Z0JBQzFHLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQzFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQ3REO1FBRUQsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9CLHFCQUFxQjtRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7Q0FDRjtBQW5FRCxzQ0FtRUM7QUFFRCxrQkFBZSxhQUFhLENBQUMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMgfSBmcm9tIFwiLi9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuL2h0dHAvSHR0cEVycm9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRlck9wdGlvbnMge1xuICBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGdyb3VwNDA0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvckRlZmluaXRpb25zIHtcbiAgW2NvZGU6IHN0cmluZ106IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvclJlcG9ydGVyIHtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnM7XG4gIGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZXJyb3JEZWZpbml0aW9ucyA9IGVycm9yRGVmaW5pdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhdGljIG1pZGRsZXdhcmUoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMpOiAoQXBwbGljYXRpb24pID0+IHZvaWQge1xuICAgIGNvbnN0IHJlcG9ydGVyID0gbmV3IEVycm9yUmVwb3J0ZXIoZXJyb3JEZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVycm9yUmVwb3J0ZXJNaWRkbGV3YXJlKGFwcCkge1xuICAgICAgYXBwLnVzZSgocmVxLCByZXMpID0+IHJlcG9ydGVyLm5vdEZvdW5kKHJlcSwgcmVzKSk7XG4gICAgICBhcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHJlcG9ydGVyLnVua25vd25FcnJvcihlcnJvciwgcmVxLCByZXMsIG5leHQpKTtcbiAgICAgIGFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLmVycm9ySGFuZGxlcigpKTtcbiAgICB9O1xuICB9XG5cbiAgbm90Rm91bmQocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpIHtcbiAgICAvLyBCdWlsZCBlcnJvciBtZXNzYWdlXG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIgKyAodGhpcy5vcHRpb25zLmdyb3VwNDA0ID8gXCIuXCIgOiBgOiAke3JlcS5tZXRob2QudG9VcHBlckNhc2UoKX0gJHtyZXEub3JpZ2luYWxVcmx9YCk7XG5cbiAgICAvLyBCdWlsZCBlcnJvciBpbnN0YW5jZVxuICAgIGNvbnN0IGVycm9yID0gbmV3IEh0dHBFcnJvcihtZXNzYWdlLCA0MDQsIHtcbiAgICAgIG1ldGhvZDogcmVxLm1ldGhvZCxcbiAgICAgIG9yaWdpbmFsVXJsOiByZXEub3JpZ2luYWxVcmxcbiAgICB9KTtcblxuICAgIC8vIExvZyB0byBjb25zb2xlXG4gICAgdGhpcy5sb2dnZXIud2FybihlcnJvcik7XG5cbiAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICByZXMuZXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgdW5rbm93bkVycm9yKGVycm9yOiBhbnksIHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIGxldCBzZXJ2ZXJFcnJvcjogSHR0cEVycm9yO1xuXG4gICAgLy8gUHJlcGFyZSBlcnJvciBpbnN0YW5jZVxuICAgIGlmIChlcnJvciAmJiBlcnJvci5pbm5lciAmJiBlcnJvci5pbm5lciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgLy8gRml4IGZvciBPQXV0aCAyLjAgZXJyb3JzLCB3aGljaCBlbmNhcHN1bGF0ZSB0aGUgb3JpZ2luYWwgb25lIGludG8gdGhlIFwiaW5uZXJcIiBwcm9wZXJ0eVxuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvci5pbm5lciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIGlmIChlcnJvciAmJiBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvciBhcyBIdHRwRXJyb3I7XG4gICAgLy8gSGFuZGxlcyBlcnJvcnMgdGhyb3duIGJ5IGF4aW9zLiBBeGlvcyBzZW5kcyB0aGUgcmVsZXZhbnQgaW5mb3JtYXRpb24gb24gdGhlIGVycm9yLmRhdGEgZmllbGRcbiAgICB9IGVsc2UgaWYgKGVycm9yICYmIGVycm9yLmRhdGEpIHtcbiAgICAgIHNlcnZlckVycm9yID0gbmV3IEh0dHBFcnJvcihlcnJvci5kYXRhLm1lc3NhZ2UsIGVycm9yLmRhdGEuc3RhdHVzIHx8IEh0dHBTZXJ2ZXJFcnJvcnMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB7XG4gICAgICAgIGNvZGU6IGVycm9yLmRhdGEuY29kZVxuICAgICAgfSk7XG5cbiAgICAgIHNlcnZlckVycm9yLnN0YWNrID0gZXJyb3IuZGF0YS5zdGFjayB8fCBzZXJ2ZXJFcnJvci5zdGFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgc2VydmVyRXJyb3IgPSBuZXcgSHR0cEVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIGVycm9yLnN0YXR1cyB8fCBIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgICBjb2RlOiBlcnJvci5jb2RlID8gZXJyb3IuY29kZSA6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICBzZXJ2ZXJFcnJvci5zdGFjayA9IGVycm9yLnN0YWNrIHx8IHNlcnZlckVycm9yLnN0YWNrO1xuICAgIH1cblxuICAgIC8vIExvZyB0byBjb25zb2xlXG4gICAgdGhpcy5sb2dnZXIuZXJyb3Ioc2VydmVyRXJyb3IpO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19