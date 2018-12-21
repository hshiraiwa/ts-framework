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
const cors = require("cors");
const Helmet = require("helmet");
const requestIp = require("request-ip");
const userAgent = require("express-useragent");
const ts_framework_common_1 = require("ts-framework-common");
class SecurityComponent {
    constructor(options = {}) {
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    describe() {
        return { name: "SecurityComponent" };
    }
    onMount(server) {
        // Enable security protections
        if (this.options.helmet !== false) {
            server.app.use(Helmet(this.options.helmet));
        }
        // Enable the CORS middleware
        if (this.options.cors) {
            if (this.logger) {
                this.logger.info("Initializing server middleware: CORS");
            }
            server.app.use(cors(this.options.cors !== true ? this.options.cors : {}));
        }
        // Handle user agent middleware
        if (this.options.userAgent) {
            if (this.logger) {
                this.logger.info("Initializing server middleware: User Agent");
            }
            // Parses request for the real IP
            server.app.use(requestIp.mw());
            // Parses request user agent information
            server.app.use(userAgent.express());
        }
        // Ensures the server trust proxy
        if (this.options.trustProxy === undefined || this.options.trustProxy) {
            server.app.set("trust_proxy", 1);
        }
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount() { }
}
exports.default = SecurityComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9TZWN1cml0eUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLDZEQUF1RjtBQVd2RixNQUFxQixpQkFBaUI7SUFJcEMsWUFBbUIsVUFBb0MsRUFBRTtRQUF0QyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDaEU7WUFFRCxpQ0FBaUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isd0NBQXdDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVqQixTQUFTLEtBQUksQ0FBQztDQUN0QjtBQWhERCxvQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JzIGZyb20gXCJjb3JzXCI7XG5pbXBvcnQgKiBhcyBIZWxtZXQgZnJvbSBcImhlbG1ldFwiO1xuaW1wb3J0ICogYXMgcmVxdWVzdElwIGZyb20gXCJyZXF1ZXN0LWlwXCI7XG5pbXBvcnQgKiBhcyB1c2VyQWdlbnQgZnJvbSBcImV4cHJlc3MtdXNlcmFnZW50XCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTZWN1cml0eUNvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgaGVsbWV0PzogSGVsbWV0LklIZWxtZXRDb25maWd1cmF0aW9uIHwgZmFsc2U7XG4gIHVzZXJBZ2VudD86IGJvb2xlYW47XG4gIGNvcnM/OiBib29sZWFuIHwgY29ycy5Db3JzT3B0aW9ucztcbiAgdHJ1c3RQcm94eT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3VyaXR5Q29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGU6IENvbXBvbmVudFR5cGUuTUlERExFV0FSRTtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlY3VyaXR5Q29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlNlY3VyaXR5Q29tcG9uZW50XCIgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gICAgLy8gRW5hYmxlIHNlY3VyaXR5IHByb3RlY3Rpb25zXG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWxtZXQgIT09IGZhbHNlKSB7XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShIZWxtZXQodGhpcy5vcHRpb25zLmhlbG1ldCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgQ09SUyBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jb3JzKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogQ09SU1wiKTtcbiAgICAgIH1cbiAgICAgIHNlcnZlci5hcHAudXNlKGNvcnModGhpcy5vcHRpb25zLmNvcnMgIT09IHRydWUgPyB0aGlzLm9wdGlvbnMuY29ycyA6IHt9KSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVzZXIgYWdlbnQgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlckFnZW50KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogVXNlciBBZ2VudFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2VzIHJlcXVlc3QgZm9yIHRoZSByZWFsIElQXG4gICAgICBzZXJ2ZXIuYXBwLnVzZShyZXF1ZXN0SXAubXcoKSk7XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IHVzZXIgYWdlbnQgaW5mb3JtYXRpb25cbiAgICAgIHNlcnZlci5hcHAudXNlKHVzZXJBZ2VudC5leHByZXNzKCkpO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZXMgdGhlIHNlcnZlciB0cnVzdCBwcm94eVxuICAgIGlmICh0aGlzLm9wdGlvbnMudHJ1c3RQcm94eSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMub3B0aW9ucy50cnVzdFByb3h5KSB7XG4gICAgICBzZXJ2ZXIuYXBwLnNldChcInRydXN0X3Byb3h5XCIsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBvblVubW91bnQoKSB7fVxufVxuIl19