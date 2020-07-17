"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.logger.warn(error);
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
        this.logger.error(serverError);
        if (this.options.omitStack) {
            errorHelper_1.stripStacks(serverError);
        }
        // Respond with error
        res.error ? res.error(serverError) : res.status(serverError.status || 500).json(serverError.toJSON());
    }
}
exports.ErrorReporter = ErrorReporter;
exports.default = ErrorReporter.middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2RDtBQUM3RCw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBQ3pDLCtDQUE0QztBQWdCNUMsTUFBYSxhQUFhO0lBS3hCLFlBQVksZ0JBQWtDLEVBQUUsVUFBZ0MsRUFBRTtRQUNoRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsZ0JBQWtDLEVBQUUsT0FBNkI7UUFDakYsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsT0FBTyxTQUFTLHVCQUF1QixDQUFDLEdBQUc7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxR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RyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN4RyxDQUFDO0NBQ0Y7QUFqRkQsc0NBaUZDO0FBRUQsa0JBQWUsYUFBYSxDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvaGVscGVycy9yZXNwb25zZVwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBIdHRwU2VydmVyRXJyb3JzIH0gZnJvbSBcIi4vaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tIFwiLi9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgc3RyaXBTdGFja3MgfSBmcm9tIFwiLi9lcnJvckhlbHBlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yUmVwb3J0ZXJPcHRpb25zIHtcbiAgc2VudHJ5PzogU2VudHJ5Lk5vZGVDbGllbnQ7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBncm91cDQwND86IGJvb2xlYW47XG4gIG9taXRTdGFjaz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JEZWZpbml0aW9ucyB7XG4gIFtjb2RlOiBzdHJpbmddOiB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogbnVtYmVyO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgRXJyb3JSZXBvcnRlciB7XG4gIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zO1xuICBlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmVycm9yRGVmaW5pdGlvbnMgPSBlcnJvckRlZmluaXRpb25zO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHN0YXRpYyBtaWRkbGV3YXJlKGVycm9yRGVmaW5pdGlvbnM6IEVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnM6IEVycm9yUmVwb3J0ZXJPcHRpb25zKTogKEFwcGxpY2F0aW9uKSA9PiB2b2lkIHtcbiAgICBjb25zdCByZXBvcnRlciA9IG5ldyBFcnJvclJlcG9ydGVyKGVycm9yRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBmdW5jdGlvbiBlcnJvclJlcG9ydGVyTWlkZGxld2FyZShhcHApIHtcbiAgICAgIGFwcC51c2UoKHJlcSwgcmVzKSA9PiByZXBvcnRlci5ub3RGb3VuZChyZXEsIHJlcykpO1xuICAgICAgYXBwLnVzZSgoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSA9PiByZXBvcnRlci51bmtub3duRXJyb3IoZXJyb3IsIHJlcSwgcmVzLCBuZXh0KSk7XG4gICAgICBhcHAudXNlKFNlbnRyeS5IYW5kbGVycy5lcnJvckhhbmRsZXIoKSk7XG4gICAgfTtcbiAgfVxuXG4gIG5vdEZvdW5kKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSB7XG4gICAgLy8gQnVpbGQgZXJyb3IgbWVzc2FnZVxuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgXCJUaGUgcmVzb3VyY2Ugd2FzIG5vdCBmb3VuZFwiICsgKHRoaXMub3B0aW9ucy5ncm91cDQwNCA/IFwiLlwiIDogYDogJHtyZXEubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cmVxLm9yaWdpbmFsVXJsfWApO1xuXG4gICAgLy8gQnVpbGQgZXJyb3IgaW5zdGFuY2VcbiAgICBjb25zdCBlcnJvciA9IG5ldyBIdHRwRXJyb3IobWVzc2FnZSwgNDA0LCB7XG4gICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgICBvcmlnaW5hbFVybDogcmVxLm9yaWdpbmFsVXJsXG4gICAgfSk7XG5cbiAgICBTZW50cnkud2l0aFNjb3BlKHNjb3BlID0+IHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JvdXA0MDQpIHtcbiAgICAgICAgc2NvcGUuc2V0RmluZ2VycHJpbnQoW3JlcS5tZXRob2QsIHJlcS5vcmlnaW5hbFVybCwgXCI0MDRcIl0pO1xuICAgICAgfVxuXG4gICAgICAvLyBMb2cgdG8gY29uc29sZVxuICAgICAgdGhpcy5sb2dnZXIud2FybihlcnJvcik7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMub21pdFN0YWNrKSB7XG4gICAgICAgIHN0cmlwU3RhY2tzKGVycm9yKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgICByZXMuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgdW5rbm93bkVycm9yKGVycm9yOiBhbnksIHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikge1xuICAgIGxldCBzZXJ2ZXJFcnJvcjogSHR0cEVycm9yO1xuXG4gICAgLy8gUHJlcGFyZSBlcnJvciBpbnN0YW5jZVxuICAgIGlmIChlcnJvciAmJiBlcnJvci5pbm5lciAmJiBlcnJvci5pbm5lciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgLy8gRml4IGZvciBPQXV0aCAyLjAgZXJyb3JzLCB3aGljaCBlbmNhcHN1bGF0ZSB0aGUgb3JpZ2luYWwgb25lIGludG8gdGhlIFwiaW5uZXJcIiBwcm9wZXJ0eVxuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvci5pbm5lciBhcyBIdHRwRXJyb3I7XG4gICAgfSBlbHNlIGlmIChlcnJvciAmJiBlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgc2VydmVyRXJyb3IgPSBlcnJvciBhcyBIdHRwRXJyb3I7XG4gICAgICAvLyBIYW5kbGVzIGVycm9ycyB0aHJvd24gYnkgYXhpb3MuIEF4aW9zIHNlbmRzIHRoZSByZWxldmFudCBpbmZvcm1hdGlvbiBvbiB0aGUgZXJyb3IuZGF0YSBmaWVsZFxuICAgIH0gZWxzZSBpZiAoZXJyb3IgJiYgZXJyb3IuZGF0YSkge1xuICAgICAgc2VydmVyRXJyb3IgPSBuZXcgSHR0cEVycm9yKGVycm9yLmRhdGEubWVzc2FnZSwgZXJyb3IuZGF0YS5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHtcbiAgICAgICAgY29kZTogZXJyb3IuZGF0YS5jb2RlXG4gICAgICB9KTtcblxuICAgICAgc2VydmVyRXJyb3Iuc3RhY2sgPSBlcnJvci5kYXRhLnN0YWNrIHx8IHNlcnZlckVycm9yLnN0YWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IG5ldyBIdHRwRXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgZXJyb3Iuc3RhdHVzIHx8IEh0dHBTZXJ2ZXJFcnJvcnMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB7XG4gICAgICAgIGNvZGU6IGVycm9yLmNvZGUgPyBlcnJvci5jb2RlIDogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICAgIHNlcnZlckVycm9yLnN0YWNrID0gZXJyb3Iuc3RhY2sgfHwgc2VydmVyRXJyb3Iuc3RhY2s7XG4gICAgfVxuXG4gICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihzZXJ2ZXJFcnJvcik7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm9taXRTdGFjaykge1xuICAgICAgc3RyaXBTdGFja3Moc2VydmVyRXJyb3IpO1xuICAgIH1cblxuICAgIC8vIFJlc3BvbmQgd2l0aCBlcnJvclxuICAgIHJlcy5lcnJvciA/IHJlcy5lcnJvcihzZXJ2ZXJFcnJvcikgOiByZXMuc3RhdHVzKHNlcnZlckVycm9yLnN0YXR1cyB8fCA1MDApLmpzb24oc2VydmVyRXJyb3IudG9KU09OKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yUmVwb3J0ZXIubWlkZGxld2FyZTtcbiJdfQ==