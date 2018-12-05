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
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance(options);
        // Prepare raven instance configuration
        Sentry.init(Object.assign({}, this.options.sentry, { release: SENTRY_RELEASE }));
    }
    describe() {
        return { name: "LoggerComponent" };
    }
    onMount(server) {
        // Start by registering Sentry if available
        if (this.logger && this.options.sentry) {
            this.logger.silly("Initializing server middleware: Sentry");
            // Registers the Raven express middleware
            server.app.use(Sentry.Handlers.requestHandler());
        }
        // Enable the logger middleware
        if (this.logger) {
            server.logger = this.logger;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsb0NBQW9DO0FBQ3BDLDZEQUF5RjtBQUd6Riw0RUFBNEU7QUFDNUUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO0lBQy9DLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDNUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO1FBQ0osSUFBSTtZQUNGLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxLQUFLLEVBQUUsR0FBRTtJQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBU1QsTUFBcUIsZUFBZTtJQUlsQyxZQUFtQixVQUFrQyxFQUFFO1FBQXBDLFlBQU8sR0FBUCxPQUFPLENBQTZCO1FBSGhELFNBQUksR0FBRyxtQ0FBYSxDQUFDLFVBQVUsQ0FBQztRQUlyQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUQsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLG1CQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUN0QixPQUFPLEVBQUUsY0FBYyxJQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQzNCLDJDQUEyQztRQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUU1RCx5Q0FBeUM7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWpCLFNBQVMsS0FBSSxDQUFDO0NBQ3RCO0FBeENELGtDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgKiBhcyBHaXQgZnJvbSBcImdpdC1yZXYtc3luY1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnRPcHRpb25zLCBDb21wb25lbnQsIENvbXBvbmVudFR5cGUgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbi8qIEdlbmVyYXRlcyBTZW50cnkgcmVsZWFzZSB2ZXJzaW9uIGJhc2VkIG9uIEdpdCByZXBvc2l0b3J5LCBpZiBhdmFpbGFibGUgKi9cbmNvbnN0IFNFTlRSWV9SRUxFQVNFID0gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0VcbiAgPyBwcm9jZXNzLmVudi5TRU5UUllfUkVMRUFTRVxuICA6ICgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gR2l0LmxvbmcoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIH0pKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGUgPSBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2Uob3B0aW9ucyk7XG5cbiAgICAvLyBQcmVwYXJlIHJhdmVuIGluc3RhbmNlIGNvbmZpZ3VyYXRpb25cbiAgICBTZW50cnkuaW5pdCh7XG4gICAgICAuLi50aGlzLm9wdGlvbnMuc2VudHJ5LFxuICAgICAgcmVsZWFzZTogU0VOVFJZX1JFTEVBU0UsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJMb2dnZXJDb21wb25lbnRcIiB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpOiB2b2lkIHtcbiAgICAvLyBTdGFydCBieSByZWdpc3RlcmluZyBTZW50cnkgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMubG9nZ2VyICYmIHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBTZW50cnlcIik7XG5cbiAgICAgIC8vIFJlZ2lzdGVycyB0aGUgUmF2ZW4gZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShTZW50cnkuSGFuZGxlcnMucmVxdWVzdEhhbmRsZXIoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIHRoZSBsb2dnZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgc2VydmVyLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgc2VydmVyLmFwcC51c2UoKHJlcTogYW55LCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgcmVxLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==