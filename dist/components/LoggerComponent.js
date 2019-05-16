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
        try {
            this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        }
        catch (exception) {
            console.warn('Could not find default logger, a new one will be initialized');
            this.logger = ts_framework_common_1.Logger.initialize();
            // Add sentry transport to logger, if available
            if (this.options.sentry) {
                this.logger.add(new ts_framework_common_1.SentryTransport({ sentry: this.options.sentry }));
            }
        }
    }
    describe() {
        return {
            name: "LoggerComponent",
            context: {
                transports: this.logger.transports,
            }
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsNkRBTzZCO0FBVTdCLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUhoRCxTQUFJLEdBQUcsbUNBQWEsQ0FBQyxVQUFVLENBQUM7UUFJckMsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3REO1FBQUMsT0FBTyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsNEJBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQywrQ0FBK0M7WUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxxQ0FBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3RFO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO2FBQ25DO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFFNUQseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUNsRDtRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNyQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFLLENBQUM7S0FBQTtJQUVsQixTQUFTLEtBQUssQ0FBQztDQUN2QjtBQWpERCxrQ0FpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0IHsgXG4gIENvbXBvbmVudCwgXG4gIENvbXBvbmVudE9wdGlvbnMsIFxuICBDb21wb25lbnRUeXBlLCBcbiAgTG9nZ2VyLCBcbiAgTG9nZ2VySW5zdGFuY2UsIFxuICBTZW50cnlUcmFuc3BvcnQgXG59IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMb2dnZXJDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBzZW50cnk/OiB7XG4gICAgZHNuOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlID0gQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kIGRlZmF1bHQgbG9nZ2VyLCBhIG5ldyBvbmUgd2lsbCBiZSBpbml0aWFsaXplZCcpO1xuICAgICAgdGhpcy5sb2dnZXIgPSBMb2dnZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAvLyBBZGQgc2VudHJ5IHRyYW5zcG9ydCB0byBsb2dnZXIsIGlmIGF2YWlsYWJsZVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuYWRkKG5ldyBTZW50cnlUcmFuc3BvcnQoeyBzZW50cnk6IHRoaXMub3B0aW9ucy5zZW50cnkgfSkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRlc2NyaWJlKCk6IHsgbmFtZTogc3RyaW5nLCBjb250ZXh0OiB7IHRyYW5zcG9ydHM6IGFueVtdIH19IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogXCJMb2dnZXJDb21wb25lbnRcIixcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgdHJhbnNwb3J0czogdGhpcy5sb2dnZXIudHJhbnNwb3J0cyxcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpOiB2b2lkIHtcbiAgICAvLyBTdGFydCBieSByZWdpc3RlcmluZyBTZW50cnkgaWYgYXZhaWxhYmxlXG4gICAgaWYgKHRoaXMubG9nZ2VyICYmIHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBTZW50cnlcIik7XG5cbiAgICAgIC8vIFJlZ2lzdGVycyB0aGUgUmF2ZW4gZXhwcmVzcyBtaWRkbGV3YXJlXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShTZW50cnkuSGFuZGxlcnMucmVxdWVzdEhhbmRsZXIoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIHRoZSBsb2dnZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgc2VydmVyLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgc2VydmVyLmFwcC51c2UoKHJlcTogYW55LCByZXMsIG5leHQpID0+IHtcbiAgICAgICAgcmVxLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgICAgICBuZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkgeyB9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHsgfVxufVxuIl19