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
        if (this.options.sentry) {
            this.options.sentry.captureException(error, {
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
        if (this.options.sentry) {
            this.options.sentry.captureException(serverError, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkRBQTZDO0FBQzdDLDhDQUFtRDtBQUNuRCxnREFBeUM7QUFjekMsTUFBYSxhQUFhO0lBS3hCLFlBQVksZ0JBQWtDLEVBQUUsVUFBZ0MsRUFBRTtRQUNoRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWtDLEVBQUUsT0FBNkI7UUFDakYsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsT0FBTyxTQUFTLHVCQUF1QixDQUFDLEdBQUc7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBZ0IsRUFBRSxHQUFpQjtRQUMxQyx1QkFBdUI7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBUyxDQUFDLCtCQUErQixHQUFHLENBQUMs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c2VudHJ5L25vZGUnO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvaGVscGVycy9yZXNwb25zZSc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmstY29tbW9uJztcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMgfSBmcm9tICcuL2h0dHAvSHR0cENvZGUnO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tICcuL2h0dHAvSHR0cEVycm9yJztcblxuZXhwb3J0IGludGVyZmFjZSBFcnJvclJlcG9ydGVyT3B0aW9ucyB7XG4gIHNlbnRyeT86IFNlbnRyeS5Ob2RlQ2xpZW50O1xuICBsb2dnZXI/OiBMb2dnZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JEZWZpbml0aW9ucyB7XG4gIFtjb2RlOiBzdHJpbmddOiB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRXJyb3JSZXBvcnRlciB7XG4gIGxvZ2dlcjogTG9nZ2VyO1xuICBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucztcbiAgZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucztcblxuICBjb25zdHJ1Y3RvcihlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zLCBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5lcnJvckRlZmluaXRpb25zID0gZXJyb3JEZWZpbml0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBzdGF0aWMgbWlkZGxld2FyZShlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zLCBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucyk6IChBcHBsaWNhdGlvbikgPT4gdm9pZCB7XG4gICAgY29uc3QgcmVwb3J0ZXIgPSBuZXcgRXJyb3JSZXBvcnRlcihlcnJvckRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZXJyb3JSZXBvcnRlck1pZGRsZXdhcmUoYXBwKSB7XG4gICAgICBhcHAudXNlKChyZXEsIHJlcykgPT4gcmVwb3J0ZXIubm90Rm91bmQocmVxLCByZXMpKTtcbiAgICAgIGFwcC51c2UoKGVycm9yLCByZXEsIHJlcywgbmV4dCkgPT4gcmVwb3J0ZXIudW5rbm93bkVycm9yKGVycm9yLCByZXEsIHJlcywgbmV4dCkpO1xuICAgIH07XG4gIH1cblxuICBub3RGb3VuZChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIC8vIEJ1aWxkIGVycm9yIGluc3RhbmNlXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgSHR0cEVycm9yKGBUaGUgcmVzb3VyY2Ugd2FzIG5vdCBmb3VuZDogJHtyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cmVxLm9yaWdpbmFsVXJsfWAsIDQwNCwge1xuICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgb3JpZ2luYWxVcmw6IHJlcS5vcmlnaW5hbFVybCxcbiAgICB9KTtcblxuICAgIC8vIFNlbmQgdG8gU2VudHJ5IGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VudHJ5KSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc2VudHJ5LmNhcHR1cmVFeGNlcHRpb24oZXJyb3IsIHtcbiAgICAgICAgcmVxLFxuICAgICAgICBsZXZlbDogJ3dhcm5pbmcnLFxuICAgICAgICB0YWdzOiB7IHN0YWNrSWQ6IGVycm9yLnN0YWNrSWQgfSxcbiAgICAgIH0gYXMgYW55KTtcbiAgICB9XG5cbiAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3IubWVzc2FnZSwgZXJyb3IuZGV0YWlscyk7XG5cbiAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICByZXMuZXJyb3IoZXJyb3IpO1xuICB9XG5cbiAgdW5rbm93bkVycm9yKGVycm9yOiBhbnksIHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIGxldCBzZXJ2ZXJFcnJvcjogSHR0cEVycm9yO1xuXG4gICAgLy8gUHJlcGFyZSBlcnJvciBpbnN0YW5jZVxuICAgIGlmIChlcnJvciAmJiBlcnJvci5pbm5lciAmJiBlcnJvci5pbm5lciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgLy8gRml4IGZvciBPQXV0aCAyLjAgZXJyb3JzLCB3aGljaCBlbmNhcHN1bGF0ZSB0aGUgb3JpZ2luYWwgb25lIGludG8gdGhlIFwiaW5uZXJcIiBwcm9wZXJ0eVxuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvci5pbm5lciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIGlmIChlcnJvciAmJiBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlcnZlckVycm9yID0gbmV3IEh0dHBFcnJvcihlcnJvci5tZXNzYWdlLCBlcnJvci5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHtcbiAgICAgICAgY29kZTogZXJyb3IuY29kZSA/IGVycm9yLmNvZGUgOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICAgIHNlcnZlckVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2sgfHwgc2VydmVyRXJyb3Iuc3RhY2s7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0byBTZW50cnkgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihzZXJ2ZXJFcnJvciwge1xuICAgICAgICByZXEsXG4gICAgICAgIGxldmVsOiBzZXJ2ZXJFcnJvci5zdGF0dXMgPj0gNTAwID8gJ2Vycm9yJyA6ICd3YXJuaW5nJyxcbiAgICAgICAgdGFnczogeyBzdGFja0lkOiBzZXJ2ZXJFcnJvci5zdGFja0lkIH0sXG4gICAgICB9IGFzIGFueSk7XG4gICAgfVxuXG4gICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlLCBzZXJ2ZXJFcnJvci5kZXRhaWxzKTtcblxuICAgIC8vIFRPRE86IEhpZGUgc3RhY2sgaW4gcHJvZHVjdGlvblxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3Iuc3RhY2spO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19