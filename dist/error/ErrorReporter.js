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
        const message = "The resource was not found" + this.options.group404 ? "." : `: ${req.method.toUpperCase()} ${req.originalUrl}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2RDtBQUM3RCw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBZXpDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCLEVBQUUsR0FBaUI7UUFDMUMsc0JBQXNCO1FBQ3RCLE1BQU0sT0FBTyxHQUNYLDRCQUE0QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbEgsdUJBQXVCO1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHFCQUFxQjtRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBVSxFQUFFLEdBQWdCLEVBQUUsR0FBaUIsRUFBRSxJQUFjO1FBQzFFLElBQUksV0FBc0IsQ0FBQztRQUUzQix5QkFBeUI7UUFDekIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxZQUFZLG1CQUFTLEVBQUU7WUFDNUQseUZBQXlGO1lBQ3pGLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBa0IsQ0FBQztTQUN4QzthQUFNLElBQUksS0FBSyxJQUFJLEtBQUssWUFBWSxtQkFBUyxFQUFFO1lBQzlDLFdBQVcsR0FBRyxLQUFrQixDQUFDO1NBQ2xDO2FBQU07WUFDTCxXQUFXLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksMkJBQWdCLENBQUMscUJBQXFCLEVBQUU7Z0JBQzFHLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQzFDLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQ3REO1FBRUQsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9CLHFCQUFxQjtRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7Q0FDRjtBQTVERCxzQ0E0REM7QUFFRCxrQkFBZSxhQUFhLENBQUMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMgfSBmcm9tIFwiLi9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuL2h0dHAvSHR0cEVycm9yXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRlck9wdGlvbnMge1xuICBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGdyb3VwNDA0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFcnJvckRlZmluaXRpb25zIHtcbiAgW2NvZGU6IHN0cmluZ106IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBFcnJvclJlcG9ydGVyIHtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnM7XG4gIGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZXJyb3JEZWZpbml0aW9ucyA9IGVycm9yRGVmaW5pdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhdGljIG1pZGRsZXdhcmUoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMpOiAoQXBwbGljYXRpb24pID0+IHZvaWQge1xuICAgIGNvbnN0IHJlcG9ydGVyID0gbmV3IEVycm9yUmVwb3J0ZXIoZXJyb3JEZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVycm9yUmVwb3J0ZXJNaWRkbGV3YXJlKGFwcCkge1xuICAgICAgYXBwLnVzZSgocmVxLCByZXMpID0+IHJlcG9ydGVyLm5vdEZvdW5kKHJlcSwgcmVzKSk7XG4gICAgICBhcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHJlcG9ydGVyLnVua25vd25FcnJvcihlcnJvciwgcmVxLCByZXMsIG5leHQpKTtcbiAgICAgIGFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLmVycm9ySGFuZGxlcigpKTtcbiAgICB9O1xuICB9XG5cbiAgbm90Rm91bmQocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpIHtcbiAgICAvLyBCdWlsZCBlcnJvciBtZXNzYWdlXG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICBcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIgKyB0aGlzLm9wdGlvbnMuZ3JvdXA0MDQgPyBcIi5cIiA6IGA6ICR7cmVxLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke3JlcS5vcmlnaW5hbFVybH1gO1xuXG4gICAgLy8gQnVpbGQgZXJyb3IgaW5zdGFuY2VcbiAgICBjb25zdCBlcnJvciA9IG5ldyBIdHRwRXJyb3IobWVzc2FnZSwgNDA0LCB7XG4gICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgICBvcmlnaW5hbFVybDogcmVxLm9yaWdpbmFsVXJsXG4gICAgfSk7XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3IpO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yKGVycm9yKTtcbiAgfVxuXG4gIHVua25vd25FcnJvcihlcnJvcjogYW55LCByZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pIHtcbiAgICBsZXQgc2VydmVyRXJyb3I6IEh0dHBFcnJvcjtcblxuICAgIC8vIFByZXBhcmUgZXJyb3IgaW5zdGFuY2VcbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IuaW5uZXIgJiYgZXJyb3IuaW5uZXIgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcbiAgICAgIC8vIEZpeCBmb3IgT0F1dGggMi4wIGVycm9ycywgd2hpY2ggZW5jYXBzdWxhdGUgdGhlIG9yaWdpbmFsIG9uZSBpbnRvIHRoZSBcImlubmVyXCIgcHJvcGVydHlcbiAgICAgIHNlcnZlckVycm9yID0gZXJyb3IuaW5uZXIgYXMgSHR0cEVycm9yO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IgJiYgZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcbiAgICAgIHNlcnZlckVycm9yID0gZXJyb3IgYXMgSHR0cEVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IG5ldyBIdHRwRXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgZXJyb3Iuc3RhdHVzIHx8IEh0dHBTZXJ2ZXJFcnJvcnMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB7XG4gICAgICAgIGNvZGU6IGVycm9yLmNvZGUgPyBlcnJvci5jb2RlIDogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICAgIHNlcnZlckVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2sgfHwgc2VydmVyRXJyb3Iuc3RhY2s7XG4gICAgfVxuXG4gICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihzZXJ2ZXJFcnJvcik7XG5cbiAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICByZXMuZXJyb3IgPyByZXMuZXJyb3Ioc2VydmVyRXJyb3IpIDogcmVzLnN0YXR1cyhzZXJ2ZXJFcnJvci5zdGF0dXMgfHwgNTAwKS5qc29uKHNlcnZlckVycm9yLnRvSlNPTigpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvclJlcG9ydGVyLm1pZGRsZXdhcmU7XG4iXX0=