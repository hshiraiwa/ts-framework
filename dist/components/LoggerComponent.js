"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Raven = require("raven");
const Git = require("git-rev-sync");
const ts_framework_common_1 = require("ts-framework-common");
/* Generates Sentry release version based on Git repository, if available */
const SENTRY_RELEASE = process.env.SENTRY_RELEASE
    ? process.env.SENTRY_RELEASE
    : (() => {
        try {
            return Git.long();
        }
        catch (error) { }
    })();
class LoggerComponent {
    constructor(options = {}) {
        this.options = options;
        this.type = ts_framework_common_1.ComponentType.MIDDLEWARE;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    describe() {
        return { name: "LoggerComponent" };
    }
    onMount(server) {
        // Start by registering Sentry if available
        if (this.logger && this.options.sentry) {
            this.logger.silly("Initializing server middleware: Sentry");
            // Prepare raven instance configuration
            server.raven = Raven.config(this.options.sentry.dsn, {
                autoBreadcrumbs: true,
                logger: "ts-framework-logger",
                release: SENTRY_RELEASE
            }).install();
            // Registers the Raven express middleware
            server.app.use(Raven.requestHandler());
        }
        // Enable the logger middleware
        if (this.logger) {
            server.app.use((req, res, next) => {
                req.logger = this.logger;
                next();
            });
        }
    }
    onInit(server) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount(server) { }
}
exports.default = LoggerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isb0NBQW9DO0FBQ3BDLDZEQUF5RjtBQUd6Riw0RUFBNEU7QUFDNUUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0lBQy9DLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ0osSUFBSTtZQUNGLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtJQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBU1QsTUFBcUIsZUFBZTtJQUlsQyxZQUFtQixVQUFrQyxFQUFFO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBSGhELFNBQUksR0FBRyxtQ0FBYSxDQUFDLFVBQVUsQ0FBQztRQUlyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBRTVELHVDQUF1QztZQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNuRCxlQUFlLEVBQUUsSUFBSTtnQkFDckIsTUFBTSxFQUFFLHFCQUFxQjtnQkFDN0IsT0FBTyxFQUFFLGNBQWM7YUFDeEIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWIseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDckMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUssTUFBTSxDQUFDLE1BQWM7OERBQUcsQ0FBQztLQUFBO0lBRS9CLFNBQVMsQ0FBQyxNQUFjLElBQUcsQ0FBQztDQUM3QjtBQXhDRCxrQ0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSYXZlbiBmcm9tIFwicmF2ZW5cIjtcbmltcG9ydCAqIGFzIEdpdCBmcm9tIFwiZ2l0LXJldi1zeW5jXCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudE9wdGlvbnMsIENvbXBvbmVudCwgQ29tcG9uZW50VHlwZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuLyogR2VuZXJhdGVzIFNlbnRyeSByZWxlYXNlIHZlcnNpb24gYmFzZWQgb24gR2l0IHJlcG9zaXRvcnksIGlmIGF2YWlsYWJsZSAqL1xuY29uc3QgU0VOVFJZX1JFTEVBU0UgPSBwcm9jZXNzLmVudi5TRU5UUllfUkVMRUFTRVxuICA/IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFXG4gIDogKCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBHaXQubG9uZygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfSkoKTtcblxuZXhwb3J0IGludGVyZmFjZSBMb2dnZXJDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgc2VudHJ5Pzoge1xuICAgIGRzbjogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZSA9IENvbXBvbmVudFR5cGUuTUlERExFV0FSRTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBMb2dnZXJDb21wb25lbnRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgcHVibGljIGRlc2NyaWJlKCkge1xuICAgIHJldHVybiB7IG5hbWU6IFwiTG9nZ2VyQ29tcG9uZW50XCIgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgLy8gU3RhcnQgYnkgcmVnaXN0ZXJpbmcgU2VudHJ5IGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLmxvZ2dlciAmJiB0aGlzLm9wdGlvbnMuc2VudHJ5KSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogU2VudHJ5XCIpO1xuXG4gICAgICAvLyBQcmVwYXJlIHJhdmVuIGluc3RhbmNlIGNvbmZpZ3VyYXRpb25cbiAgICAgIHNlcnZlci5yYXZlbiA9IFJhdmVuLmNvbmZpZyh0aGlzLm9wdGlvbnMuc2VudHJ5LmRzbiwge1xuICAgICAgICBhdXRvQnJlYWRjcnVtYnM6IHRydWUsXG4gICAgICAgIGxvZ2dlcjogXCJ0cy1mcmFtZXdvcmstbG9nZ2VyXCIsXG4gICAgICAgIHJlbGVhc2U6IFNFTlRSWV9SRUxFQVNFXG4gICAgICB9KS5pbnN0YWxsKCk7XG5cbiAgICAgIC8vIFJlZ2lzdGVycyB0aGUgUmF2ZW4gZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShSYXZlbi5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIGxvZ2dlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICBzZXJ2ZXIuYXBwLnVzZSgocmVxOiBhbnksIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICByZXEubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG9uSW5pdChzZXJ2ZXI6IFNlcnZlcikge31cblxuICBvblVubW91bnQoc2VydmVyOiBTZXJ2ZXIpIHt9XG59XG4iXX0=