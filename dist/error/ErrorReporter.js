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
        Sentry.withScope(scope => {
            if (this.options.group404) {
                scope.setFingerprint([req.method, req.originalUrl, "404"]);
            }
            // Log to console
            this.logger.warn(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JSZXBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9lcnJvci9FcnJvclJlcG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXVDO0FBRXZDLDZEQUE2RDtBQUM3RCw4Q0FBbUQ7QUFDbkQsZ0RBQXlDO0FBZXpDLE1BQWEsYUFBYTtJQUt4QixZQUFZLGdCQUFrQyxFQUFFLFVBQWdDLEVBQUU7UUFDaEYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLGdCQUFrQyxFQUFFLE9BQTZCO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyx1QkFBdUIsQ0FBQyxHQUFHO1lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCLEVBQUUsR0FBaUI7UUFDMUMsc0JBQXNCO1FBQ3RCLE1BQU0sT0FBTyxHQUNYLDRCQUE0QixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBILHVCQUF1QjtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUN4QyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDekIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhCLHFCQUFxQjtZQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVLEVBQUUsR0FBZ0IsRUFBRSxHQUFpQixFQUFFLElBQWM7UUFDMUUsSUFBSSxXQUFzQixDQUFDO1FBRTNCLHlCQUF5QjtRQUN6QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLFlBQVksbUJBQVMsRUFBRTtZQUM1RCx5RkFBeUY7WUFDekYsV0FBVyxHQUFHLEtBQUssQ0FBQyxLQUFrQixDQUFDO1NBQ3hDO2FBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLG1CQUFTLEVBQUU7WUFDOUMsV0FBVyxHQUFHLEtBQWtCLENBQUM7U0FDbEM7YUFBTTtZQUNMLFdBQVcsR0FBRyxJQUFJLG1CQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSwyQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRTtnQkFDMUcsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDMUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDdEQ7UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFL0IscUJBQXFCO1FBQ3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDeEcsQ0FBQztDQUNGO0FBbEVELHNDQWtFQztBQUVELGtCQUFlLGFBQWEsQ0FBQyxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL2hlbHBlcnMvcmVzcG9uc2VcIjtcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgSHR0cFNlcnZlckVycm9ycyB9IGZyb20gXCIuL2h0dHAvSHR0cENvZGVcIjtcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSBcIi4vaHR0cC9IdHRwRXJyb3JcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFcnJvclJlcG9ydGVyT3B0aW9ucyB7XG4gIHNlbnRyeT86IFNlbnRyeS5Ob2RlQ2xpZW50O1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgZ3JvdXA0MDQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yRGVmaW5pdGlvbnMge1xuICBbY29kZTogc3RyaW5nXToge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIEVycm9yUmVwb3J0ZXIge1xuICBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucztcbiAgZXJyb3JEZWZpbml0aW9uczogRXJyb3JEZWZpbml0aW9ucztcblxuICBjb25zdHJ1Y3RvcihlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zLCBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5lcnJvckRlZmluaXRpb25zID0gZXJyb3JEZWZpbml0aW9ucztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBzdGF0aWMgbWlkZGxld2FyZShlcnJvckRlZmluaXRpb25zOiBFcnJvckRlZmluaXRpb25zLCBvcHRpb25zOiBFcnJvclJlcG9ydGVyT3B0aW9ucyk6IChBcHBsaWNhdGlvbikgPT4gdm9pZCB7XG4gICAgY29uc3QgcmVwb3J0ZXIgPSBuZXcgRXJyb3JSZXBvcnRlcihlcnJvckRlZmluaXRpb25zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gZXJyb3JSZXBvcnRlck1pZGRsZXdhcmUoYXBwKSB7XG4gICAgICBhcHAudXNlKChyZXEsIHJlcykgPT4gcmVwb3J0ZXIubm90Rm91bmQocmVxLCByZXMpKTtcbiAgICAgIGFwcC51c2UoKGVycm9yLCByZXEsIHJlcywgbmV4dCkgPT4gcmVwb3J0ZXIudW5rbm93bkVycm9yKGVycm9yLCByZXEsIHJlcywgbmV4dCkpO1xuICAgICAgYXBwLnVzZShTZW50cnkuSGFuZGxlcnMuZXJyb3JIYW5kbGVyKCkpO1xuICAgIH07XG4gIH1cblxuICBub3RGb3VuZChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkge1xuICAgIC8vIEJ1aWxkIGVycm9yIG1lc3NhZ2VcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgIFwiVGhlIHJlc291cmNlIHdhcyBub3QgZm91bmRcIiArICh0aGlzLm9wdGlvbnMuZ3JvdXA0MDQgPyBcIi5cIiA6IGA6ICR7cmVxLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke3JlcS5vcmlnaW5hbFVybH1gKTtcblxuICAgIC8vIEJ1aWxkIGVycm9yIGluc3RhbmNlXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgSHR0cEVycm9yKG1lc3NhZ2UsIDQwNCwge1xuICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgb3JpZ2luYWxVcmw6IHJlcS5vcmlnaW5hbFVybFxuICAgIH0pO1xuXG4gICAgU2VudHJ5LndpdGhTY29wZShzY29wZSA9PiB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmdyb3VwNDA0KSB7XG4gICAgICAgIHNjb3BlLnNldEZpbmdlcnByaW50KFtyZXEubWV0aG9kLCByZXEub3JpZ2luYWxVcmwsIFwiNDA0XCJdKTtcbiAgICAgIH1cblxuICAgICAgLy8gTG9nIHRvIGNvbnNvbGVcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXJyb3IpO1xuXG4gICAgICAvLyBSZXNwb25kIHdpdGggZXJyb3JcbiAgICAgIHJlcy5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICB1bmtub3duRXJyb3IoZXJyb3I6IGFueSwgcmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHNlcnZlckVycm9yOiBIdHRwRXJyb3I7XG5cbiAgICAvLyBQcmVwYXJlIGVycm9yIGluc3RhbmNlXG4gICAgaWYgKGVycm9yICYmIGVycm9yLmlubmVyICYmIGVycm9yLmlubmVyIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICAvLyBGaXggZm9yIE9BdXRoIDIuMCBlcnJvcnMsIHdoaWNoIGVuY2Fwc3VsYXRlIHRoZSBvcmlnaW5hbCBvbmUgaW50byB0aGUgXCJpbm5lclwiIHByb3BlcnR5XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yLmlubmVyIGFzIEh0dHBFcnJvcjtcbiAgICB9IGVsc2UgaWYgKGVycm9yICYmIGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICBzZXJ2ZXJFcnJvciA9IGVycm9yIGFzIEh0dHBFcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VydmVyRXJyb3IgPSBuZXcgSHR0cEVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIGVycm9yLnN0YXR1cyB8fCBIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwge1xuICAgICAgICBjb2RlOiBlcnJvci5jb2RlID8gZXJyb3IuY29kZSA6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICBzZXJ2ZXJFcnJvci5zdGFjayA9IGVycm9yLnN0YWNrIHx8IHNlcnZlckVycm9yLnN0YWNrO1xuICAgIH1cblxuICAgIC8vIExvZyB0byBjb25zb2xlXG4gICAgdGhpcy5sb2dnZXIuZXJyb3Ioc2VydmVyRXJyb3IpO1xuXG4gICAgLy8gUmVzcG9uZCB3aXRoIGVycm9yXG4gICAgcmVzLmVycm9yID8gcmVzLmVycm9yKHNlcnZlckVycm9yKSA6IHJlcy5zdGF0dXMoc2VydmVyRXJyb3Iuc3RhdHVzIHx8IDUwMCkuanNvbihzZXJ2ZXJFcnJvci50b0pTT04oKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JSZXBvcnRlci5taWRkbGV3YXJlO1xuIl19