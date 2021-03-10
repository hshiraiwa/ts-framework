"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
                this.logger.add(new ts_framework_common_1.SentryTransport(this.options.sentry));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvTG9nZ2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLDZEQU82QjtBQVU3QixNQUFxQixlQUFlO0lBSWxDLFlBQW1CLFVBQWtDLEVBQUU7UUFBcEMsWUFBTyxHQUFQLE9BQU8sQ0FBNkI7UUFIaEQsU0FBSSxHQUFHLG1DQUFhLENBQUMsVUFBVSxDQUFDO1FBSXJDLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0RDtRQUFDLE9BQU8sU0FBUyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsOERBQThELENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEMsK0NBQStDO1lBQy9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUkscUNBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0Q7U0FDRjtJQUNILENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7YUFDbkM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQzNCLDJDQUEyQztRQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUU1RCx5Q0FBeUM7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWpCLFNBQVMsS0FBSSxDQUFDO0NBQ3RCO0FBakRELGtDQWlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbXBvbmVudE9wdGlvbnMsXG4gIENvbXBvbmVudFR5cGUsXG4gIExvZ2dlcixcbiAgTG9nZ2VySW5zdGFuY2UsXG4gIFNlbnRyeVRyYW5zcG9ydFxufSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyQ29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgc2VudHJ5Pzoge1xuICAgIGRzbjogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZSA9IENvbXBvbmVudFR5cGUuTUlERExFV0FSRTtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IExvZ2dlckNvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IGZpbmQgZGVmYXVsdCBsb2dnZXIsIGEgbmV3IG9uZSB3aWxsIGJlIGluaXRpYWxpemVkXCIpO1xuICAgICAgdGhpcy5sb2dnZXIgPSBMb2dnZXIuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAvLyBBZGQgc2VudHJ5IHRyYW5zcG9ydCB0byBsb2dnZXIsIGlmIGF2YWlsYWJsZVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zZW50cnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuYWRkKG5ldyBTZW50cnlUcmFuc3BvcnQodGhpcy5vcHRpb25zLnNlbnRyeSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpOiB7IG5hbWU6IHN0cmluZzsgY29udGV4dDogeyB0cmFuc3BvcnRzOiBhbnlbXSB9IH0ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBcIkxvZ2dlckNvbXBvbmVudFwiLFxuICAgICAgY29udGV4dDoge1xuICAgICAgICB0cmFuc3BvcnRzOiB0aGlzLmxvZ2dlci50cmFuc3BvcnRzXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgLy8gU3RhcnQgYnkgcmVnaXN0ZXJpbmcgU2VudHJ5IGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLmxvZ2dlciAmJiB0aGlzLm9wdGlvbnMuc2VudHJ5KSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogU2VudHJ5XCIpO1xuXG4gICAgICAvLyBSZWdpc3RlcnMgdGhlIFJhdmVuIGV4cHJlc3MgbWlkZGxld2FyZVxuICAgICAgc2VydmVyLmFwcC51c2UoU2VudHJ5LkhhbmRsZXJzLnJlcXVlc3RIYW5kbGVyKCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgbG9nZ2VyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHNlcnZlci5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcbiAgICAgIHNlcnZlci5hcHAudXNlKChyZXE6IGFueSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcS5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHt9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHt9XG59XG4iXX0=