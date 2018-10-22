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
const Sentry = require("@sentry/node");
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
            Sentry.init(Object.assign({}, this.options.sentry, { release: SENTRY_RELEASE }));
            // Registers the Raven express middleware
            server.app.use(Sentry.Handlers.requestHandler());
        }
        // Enable the logger middleware
        if (this.logger) {
            server.app.use((req, res, next) => {
                req.logger = this.logger;
                next();
            });
        }
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount() { }
}
exports.default = LoggerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLDZEQUF5RjtBQUd6Riw0RUFBNEU7QUFDNUUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0lBQy9DLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ04sSUFBSTtZQUNGLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRztJQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBU1AsTUFBcUIsZUFBZTtJQUlsQyxZQUFtQixVQUFrQyxFQUFFO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBSGhELFNBQUksR0FBRyxtQ0FBYSxDQUFDLFVBQVUsQ0FBQztRQUlyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBRTVELHVDQUF1QztZQUN2QyxNQUFNLENBQUMsSUFBSSxtQkFDTixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFDdEIsT0FBTyxFQUFFLGNBQWMsSUFDdkIsQ0FBQztZQUVILHlDQUF5QztZQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7U0FDbEQ7UUFFRCwrQkFBK0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNyQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFLLENBQUM7S0FBQTtJQUVsQixTQUFTLEtBQUssQ0FBQztDQUN2QjtBQXZDRCxrQ0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0ICogYXMgR2l0IGZyb20gXCJnaXQtcmV2LXN5bmNcIjtcbmltcG9ydCB7IExvZ2dlciwgQ29tcG9uZW50T3B0aW9ucywgQ29tcG9uZW50LCBDb21wb25lbnRUeXBlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlclwiO1xuXG4vKiBHZW5lcmF0ZXMgU2VudHJ5IHJlbGVhc2UgdmVyc2lvbiBiYXNlZCBvbiBHaXQgcmVwb3NpdG9yeSwgaWYgYXZhaWxhYmxlICovXG5jb25zdCBTRU5UUllfUkVMRUFTRSA9IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFXG4gID8gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0VcbiAgOiAoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gR2l0LmxvbmcoKTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gIH0pKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGUgPSBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIkxvZ2dlckNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5vcHRpb25zLnNlbnRyeSkge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeVwiKTtcblxuICAgICAgLy8gUHJlcGFyZSByYXZlbiBpbnN0YW5jZSBjb25maWd1cmF0aW9uXG4gICAgICBTZW50cnkuaW5pdCh7XG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5zZW50cnksXG4gICAgICAgIHJlbGVhc2U6IFNFTlRSWV9SRUxFQVNFXG4gICAgICB9KTtcblxuICAgICAgLy8gUmVnaXN0ZXJzIHRoZSBSYXZlbiBleHByZXNzIG1pZGRsZXdhcmVcbiAgICAgIHNlcnZlci5hcHAudXNlKFNlbnRyeS5IYW5kbGVycy5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIGxvZ2dlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICBzZXJ2ZXIuYXBwLnVzZSgocmVxOiBhbnksIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICByZXEubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7IH1cblxuICBwdWJsaWMgb25Vbm1vdW50KCkgeyB9XG59XG4iXX0=