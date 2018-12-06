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
const ts_framework_common_1 = require("ts-framework-common");
class LoggerComponent {
    constructor(options = {}) {
        this.options = options;
        this.type = ts_framework_common_1.ComponentType.MIDDLEWARE;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance(Object.assign({}, options));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsNkRBQXlHO0FBV3pHLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUhoRCxTQUFJLEdBQUcsbUNBQWEsQ0FBQyxVQUFVLENBQUM7UUFJckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFLLE9BQU8sQ0FBeUIsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFFNUQseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUNsRDtRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNyQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFLLENBQUM7S0FBQTtJQUVsQixTQUFTLEtBQUssQ0FBQztDQUN2QjtBQWxDRCxrQ0FrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRPcHRpb25zLCBDb21wb25lbnRUeXBlLCBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IFNpbXBsZUxvZ2dlck9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3RzLWZyYW1ld29yay1jb21tb24vZGlzdC90eXBlcy9sb2dnZXIvbG9nZ2VyXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2dnZXJDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBzZW50cnk/OiB7XG4gICAgZHNuOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlID0gQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoeyAuLi5vcHRpb25zIH0gYXMgU2ltcGxlTG9nZ2VyT3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJMb2dnZXJDb21wb25lbnRcIiB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpOiB2b2lkIHtcbiAgICAvLyBTdGFydCBieSByZWdpc3RlcmluZyBTZW50cnkgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMubG9nZ2VyICYmIHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBTZW50cnlcIik7XG5cbiAgICAgIC8vIFJlZ2lzdGVycyB0aGUgUmF2ZW4gZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShTZW50cnkuSGFuZGxlcnMucmVxdWVzdEhhbmRsZXIoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIHRoZSBsb2dnZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgc2VydmVyLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgc2VydmVyLmFwcC51c2UoKHJlcTogYW55LCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgcmVxLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkgeyB9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHsgfVxufVxuIl19