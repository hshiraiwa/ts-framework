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
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount() { }
}
exports.default = LoggerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0Isb0NBQW9DO0FBQ3BDLDZEQUF5RjtBQUd6Riw0RUFBNEU7QUFDNUUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0lBQy9DLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ0osSUFBSTtZQUNGLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtJQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBU1QsTUFBcUIsZUFBZTtJQUlsQyxZQUFtQixVQUFrQyxFQUFFO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBSGhELFNBQUksR0FBRyxtQ0FBYSxDQUFDLFVBQVUsQ0FBQztRQUlyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsMkNBQTJDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBRTVELHVDQUF1QztZQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNuRCxlQUFlLEVBQUUsSUFBSTtnQkFDckIsTUFBTSxFQUFFLHFCQUFxQjtnQkFDN0IsT0FBTyxFQUFFLGNBQWM7YUFDeEIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRWIseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDckMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFakIsU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUF4Q0Qsa0NBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmF2ZW4gZnJvbSBcInJhdmVuXCI7XG5pbXBvcnQgKiBhcyBHaXQgZnJvbSBcImdpdC1yZXYtc3luY1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnRPcHRpb25zLCBDb21wb25lbnQsIENvbXBvbmVudFR5cGUgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbi8qIEdlbmVyYXRlcyBTZW50cnkgcmVsZWFzZSB2ZXJzaW9uIGJhc2VkIG9uIEdpdCByZXBvc2l0b3J5LCBpZiBhdmFpbGFibGUgKi9cbmNvbnN0IFNFTlRSWV9SRUxFQVNFID0gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0VcbiAgPyBwcm9jZXNzLmVudi5TRU5UUllfUkVMRUFTRVxuICA6ICgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gR2l0LmxvbmcoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIH0pKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGUgPSBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIkxvZ2dlckNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5vcHRpb25zLnNlbnRyeSkge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeVwiKTtcblxuICAgICAgLy8gUHJlcGFyZSByYXZlbiBpbnN0YW5jZSBjb25maWd1cmF0aW9uXG4gICAgICBzZXJ2ZXIucmF2ZW4gPSBSYXZlbi5jb25maWcodGhpcy5vcHRpb25zLnNlbnRyeS5kc24sIHtcbiAgICAgICAgYXV0b0JyZWFkY3J1bWJzOiB0cnVlLFxuICAgICAgICBsb2dnZXI6IFwidHMtZnJhbWV3b3JrLWxvZ2dlclwiLFxuICAgICAgICByZWxlYXNlOiBTRU5UUllfUkVMRUFTRVxuICAgICAgfSkuaW5zdGFsbCgpO1xuXG4gICAgICAvLyBSZWdpc3RlcnMgdGhlIFJhdmVuIGV4cHJlc3MgbWlkZGxld2FyZVxuICAgICAgc2VydmVyLmFwcC51c2UoUmF2ZW4ucmVxdWVzdEhhbmRsZXIoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIHRoZSBsb2dnZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgc2VydmVyLmFwcC51c2UoKHJlcTogYW55LCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgcmVxLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==