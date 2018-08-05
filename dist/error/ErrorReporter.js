"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        };
    }
    notFound(req, res) {
        // Build error instance
        const error = new HttpError_1.default(`The resource was not found: ${req.method.toUpperCase()} ${req.originalUrl}`, 404, {
            method: req.method,
            originalUrl: req.originalUrl,
        });
        // Send to Sentry if available
        if (this.options.raven) {
            this.options.raven.captureException(error, {
                req,
                level: 'warning',
                tags: { stackId: error.stackId },
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
                code: error.code ? error.code : undefined,
            });
            serverError.stack = error.stack || serverError.stack;
        }
        // Send to Sentry if available
        if (this.options.raven) {
            this.options.raven.captureException(serverError, {
                req,
                level: serverError.status >= 500 ? 'error' : 'warning',
                tags: { stackId: serverError.stackId },
            });
        }
        // Log to console
        this.logger.error(error.message, serverError.details);
        // TODO: Hide stack in production
        console.error(error.stack);
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkRBQTZDO0FBQzdDLDhDQUFtRDtBQUNuRCxnREFBeUM7QUFjekMsTUFBYSxhQUFhO0lBS3hCLFlBQVksZ0JBQWtDLEVBQUUsVUFBZ0MsRUFBRTtRQUNoRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWtDLEVBQUUsT0FBNkI7UUFDakYsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsT0FBTyxTQUFTLHVCQUF1QixDQUFDLEdBQUc7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBZ0IsRUFBRSxHQUFpQjtRQUMxQyx1QkFBdUI7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBUyxDQUFDLCtCQUErQixHQUFHLENBQUMs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dmVuJztcbmltcG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9jb21wb25lbnRzL2hlbHBlcnMvcmVzcG9uc2UnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBIdHRwU2VydmVyRXJyb3JzIH0gZnJvbSAnLi9odHRwL0h0dHBDb2RlJztcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSAnLi9odHRwL0h0dHBFcnJvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRlck9wdGlvbnMge1xuICByYXZlbj86IFJhdmVuLkNsaWVudDtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yRGVmaW5pdGlvbnMge1xuICBbY29kZTogc3RyaW5nXToge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEVycm9yUmVwb3J0ZXIge1xuICBsb2dnZXI6IExvZ2dlcjtcbiAgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnM7XG4gIGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuZXJyb3JEZWZpbml0aW9ucyA9IGVycm9yRGVmaW5pdGlvbnM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc3RhdGljIG1pZGRsZXdhcmUoZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucywgb3B0aW9uczogRXJyb3JSZXBvcnRlck9wdGlvbnMpOiAoQXBwbGljYXRpb24pID0+IHZvaWQge1xuICAgIGNvbnN0IHJlcG9ydGVyID0gbmV3IEVycm9yUmVwb3J0ZXIoZXJyb3JEZWZpbml0aW9ucywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGVycm9yUmVwb3J0ZXJNaWRkbGV3YXJlKGFwcCkge1xuICAgICAgYXBwLnVzZSgocmVxLCByZXMpID0+IHJlcG9ydGVyLm5vdEZvdW5kKHJlcSwgcmVzKSk7XG4gICAgICBhcHAudXNlKChlcnJvciwgcmVxLCByZXMsIG5leHQpID0+IHJlcG9ydGVyLnVua25vd25FcnJvcihlcnJvciwgcmVxLCByZXMsIG5leHQpKTtcbiAgICB9O1xuICB9XG5cbiAgbm90Rm91bmQocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpIHtcbiAgICAvLyBCdWlsZCBlcnJvciBpbnN0YW5jZVxuICAgIGNvbnN0IGVycm9yID0gbmV3IEh0dHBFcnJvcihgVGhlIHJlc291cmNlIHdhcyBub3QgZm91bmQ6ICR7cmVxLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke3JlcS5vcmlnaW5hbFVybH1gLCA0MDQsIHtcbiAgICAgIG1ldGhvZDogcmVxLm1ldGhvZCxcbiAgICAgIG9yaWdpbmFsVXJsOiByZXEub3JpZ2luYWxVcmwsXG4gICAgfSk7XG5cbiAgICAvLyBTZW5kIHRvIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhdmVuKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmF2ZW4uY2FwdHVyZUV4Y2VwdGlvbihlcnJvciwge1xuICAgICAgICByZXEsXG4gICAgICAgIGxldmVsOiAnd2FybmluZycsXG4gICAgICAgIHRhZ3M6IHsgc3RhY2tJZDogZXJyb3Iuc3RhY2tJZCB9LFxuICAgICAgfSBhcyBhbnkpO1xuICAgIH1cblxuICAgIC8vIExvZyB0byBjb25zb2xlXG4gICAgdGhpcy5sb2dnZXIud2FybihlcnJvci5tZXNzYWdlLCBlcnJvci5kZXRhaWxzKTtcblxuICAgIC8vIFJlc3BvbmQgd2l0aCBlcnJvclxuICAgIHJlcy5lcnJvcihlcnJvcik7XG4gIH1cblxuICB1bmtub3duRXJyb3IoZXJyb3I6IGFueSwgcmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHNlcnZlckVycm9yOiBIdHRwRXJyb3I7XG5cbiAgICAvLyBQcmVwYXJlIGVycm9yIGluc3RhbmNlXG4gICAgaWYgKGVycm9yICYmIGVycm9yLmlubmVyICYmIGVycm9yLmlubmVyIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICAvLyBGaXggZm9yIE9BdXRoIDIuMCBlcnJvcnMsIHdoaWNoIGVuY2Fwc3VsYXRlIHRoZSBvcmlnaW5hbCBvbmUgaW50byB0aGUgXCJpbm5lclwiIHByb3BlcnR5XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yLmlubmVyIGFzIEh0dHBFcnJvcjtcbiAgICB9IGVsc2UgaWYgKGVycm9yICYmIGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yIGFzIEh0dHBFcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VydmVyRXJyb3IgPSBuZXcgSHR0cEVycm9yKGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YXR1cyB8fCBIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgICBjb2RlOiBlcnJvci5jb2RlID8gZXJyb3IuY29kZSA6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgc2VydmVyRXJyb3Iuc3RhY2sgPSBlcnJvci5zdGFjayB8fCBzZXJ2ZXJFcnJvci5zdGFjaztcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRvIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhdmVuKSB7XG4gICAgICB0aGlzLm9wdGlvbnMucmF2ZW4uY2FwdHVyZUV4Y2VwdGlvbihzZXJ2ZXJFcnJvciwge1xuICAgICAgICByZXEsXG4gICAgICAgIGxldmVsOiBzZXJ2ZXJFcnJvci5zdGF0dXMgPj0gNTAwID8gJ2Vycm9yJyA6ICd3YXJuaW5nJyxcbiAgICAgICAgdGFnczogeyBzdGFja0lkOiBzZXJ2ZXJFcnJvci5zdGFja0lkIH0sXG4gICAgICB9IGFzIGFueSk7XG4gICAgfVxuXG4gICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlLCBzZXJ2ZXJFcnJvci5kZXRhaWxzKTtcblxuICAgIC8vIFRPRE86IEhpZGUgc3RhY2sgaW4gcHJvZHVjdGlvblxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3Iuc3RhY2spO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19