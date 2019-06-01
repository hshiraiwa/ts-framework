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
            console.warn("Could not find default logger, a new one will be initialized");
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
                transports: this.logger.transports
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsNkRBTzZCO0FBVTdCLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUhoRCxTQUFJLEdBQUcsbUNBQWEsQ0FBQyxVQUFVLENBQUM7UUFJckMsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3REO1FBQUMsT0FBTyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsNEJBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQywrQ0FBK0M7WUFDL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxxQ0FBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO2FBQ25DO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwyQ0FBMkM7UUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFFNUQseUNBQXlDO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztTQUNsRDtRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUNyQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVqQixTQUFTLEtBQUksQ0FBQztDQUN0QjtBQWpERCxrQ0FpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRPcHRpb25zLFxuICBDb21wb25lbnRUeXBlLFxuICBMb2dnZXIsXG4gIExvZ2dlckluc3RhbmNlLFxuICBTZW50cnlUcmFuc3BvcnRcbn0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlckNvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGUgPSBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBMb2dnZXJDb21wb25lbnRPcHRpb25zID0ge30pIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkNvdWxkIG5vdCBmaW5kIGRlZmF1bHQgbG9nZ2VyLCBhIG5ldyBvbmUgd2lsbCBiZSBpbml0aWFsaXplZFwiKTtcbiAgICAgIHRoaXMubG9nZ2VyID0gTG9nZ2VyLmluaXRpYWxpemUoKTtcblxuICAgICAgLy8gQWRkIHNlbnRyeSB0cmFuc3BvcnQgdG8gbG9nZ2VyLCBpZiBhdmFpbGFibGVcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2VudHJ5KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmFkZChuZXcgU2VudHJ5VHJhbnNwb3J0KHsgc2VudHJ5OiB0aGlzLm9wdGlvbnMuc2VudHJ5IH0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKTogeyBuYW1lOiBzdHJpbmc7IGNvbnRleHQ6IHsgdHJhbnNwb3J0czogYW55W10gfSB9IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogXCJMb2dnZXJDb21wb25lbnRcIixcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgdHJhbnNwb3J0czogdGhpcy5sb2dnZXIudHJhbnNwb3J0c1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5vcHRpb25zLnNlbnRyeSkge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeVwiKTtcblxuICAgICAgLy8gUmVnaXN0ZXJzIHRoZSBSYXZlbiBleHByZXNzIG1pZGRsZXdhcmVcbiAgICAgIHNlcnZlci5hcHAudXNlKFNlbnRyeS5IYW5kbGVycy5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIGxvZ2dlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICBzZXJ2ZXIubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICBzZXJ2ZXIuYXBwLnVzZSgocmVxOiBhbnksIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICByZXEubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBvblVubW91bnQoKSB7fVxufVxuIl19