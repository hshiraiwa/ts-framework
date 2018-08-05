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
const SENTRY_RELEASE = process.env.SENTRY_RELEASE ? process.env.SENTRY_RELEASE : (() => {
    try {
        return Git.long();
    }
    catch (error) {
    }
})();
class LoggerComponent {
    constructor(options = {}) {
        this.options = options;
        this.type = ts_framework_common_1.ComponentType.MIDDLEWARE;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    describe() {
        return { name: 'LoggerMiddleware' };
    }
    onMount(server) {
        // Start by registering Sentry if available
        if (this.logger && this.options.sentry) {
            this.logger.info('Initializing server middleware: Sentry');
            // Prepare raven instance configuration
            server.raven = Raven.config(this.options.sentry.dsn, {
                autoBreadcrumbs: true,
                logger: 'ts-framework-logger',
                release: SENTRY_RELEASE,
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
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount(server) {
    }
}
exports.default = LoggerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isb0NBQW9DO0FBQ3BDLDZEQUF5RjtBQUd6Riw0RUFBNEU7QUFDNUUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUNyRixJQUFJO1FBQ0YsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkI7SUFBQyxPQUFPLEtBQUssRUFBRTtLQUNmO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQVNMLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUhoRCxTQUFJLEdBQUcsbUNBQWEsQ0FBQyxVQUFVLENBQUM7UUFJckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQzNCLDJDQUEyQztRQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUUzRCx1Q0FBdUM7WUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDbkQsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLE1BQU0sRUFBRSxxQkFBcUI7Z0JBQzdCLE9BQU8sRUFBRSxjQUFjO2FBQ3hCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUViLHlDQUF5QztZQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUN4QztRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVLLE1BQU0sQ0FBQyxNQUFjOztRQUMzQixDQUFDO0tBQUE7SUFFRCxTQUFTLENBQUMsTUFBYztJQUN4QixDQUFDO0NBQ0Y7QUExQ0Qsa0NBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmF2ZW4gZnJvbSAncmF2ZW4nO1xuaW1wb3J0ICogYXMgR2l0IGZyb20gJ2dpdC1yZXYtc3luYyc7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudE9wdGlvbnMsIENvbXBvbmVudCwgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IFNlcnZlciBmcm9tICcuLi9zZXJ2ZXInO1xuXG4vKiBHZW5lcmF0ZXMgU2VudHJ5IHJlbGVhc2UgdmVyc2lvbiBiYXNlZCBvbiBHaXQgcmVwb3NpdG9yeSwgaWYgYXZhaWxhYmxlICovXG5jb25zdCBTRU5UUllfUkVMRUFTRSA9IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFID8gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0UgOiAoKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBHaXQubG9uZygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICB9XG59KSgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlckNvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBzZW50cnk/OiB7XG4gICAgZHNuOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlID0gQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IExvZ2dlckNvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogJ0xvZ2dlck1pZGRsZXdhcmUnIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5vcHRpb25zLnNlbnRyeSkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBTZW50cnknKTtcblxuICAgICAgLy8gUHJlcGFyZSByYXZlbiBpbnN0YW5jZSBjb25maWd1cmF0aW9uXG4gICAgICBzZXJ2ZXIucmF2ZW4gPSBSYXZlbi5jb25maWcodGhpcy5vcHRpb25zLnNlbnRyeS5kc24sIHtcbiAgICAgICAgYXV0b0JyZWFkY3J1bWJzOiB0cnVlLFxuICAgICAgICBsb2dnZXI6ICd0cy1mcmFtZXdvcmstbG9nZ2VyJyxcbiAgICAgICAgcmVsZWFzZTogU0VOVFJZX1JFTEVBU0UsXG4gICAgICB9KS5pbnN0YWxsKCk7XG5cbiAgICAgIC8vIFJlZ2lzdGVycyB0aGUgUmF2ZW4gZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShSYXZlbi5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIGxvZ2dlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICBzZXJ2ZXIuYXBwLnVzZSgocmVxOiBhbnksIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICByZXEubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG9uSW5pdChzZXJ2ZXI6IFNlcnZlcikge1xuICB9XG5cbiAgb25Vbm1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gIH1cbn1cbiJdfQ==