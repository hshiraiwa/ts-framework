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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9TZWN1cml0eUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLDZEQUF1RTtBQVd2RSxNQUFxQixpQkFBaUI7SUFJcEMsWUFBbUIsVUFBb0MsRUFBRTtRQUF0QyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDaEU7WUFFRCxpQ0FBaUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isd0NBQXdDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVqQixTQUFTLEtBQUksQ0FBQztDQUN0QjtBQWhERCxvQ0FnREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JzIGZyb20gXCJjb3JzXCI7XG5pbXBvcnQgKiBhcyBIZWxtZXQgZnJvbSBcImhlbG1ldFwiO1xuaW1wb3J0ICogYXMgcmVxdWVzdElwIGZyb20gXCJyZXF1ZXN0LWlwXCI7XG5pbXBvcnQgKiBhcyB1c2VyQWdlbnQgZnJvbSBcImV4cHJlc3MtdXNlcmFnZW50XCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3VyaXR5Q29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgaGVsbWV0PzogSGVsbWV0LklIZWxtZXRDb25maWd1cmF0aW9uIHwgZmFsc2U7XG4gIHVzZXJBZ2VudD86IGJvb2xlYW47XG4gIGNvcnM/OiBib29sZWFuIHwgY29ycy5Db3JzT3B0aW9ucztcbiAgdHJ1c3RQcm94eT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3VyaXR5Q29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGU6IENvbXBvbmVudFR5cGUuTUlERExFV0FSRTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZWN1cml0eUNvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJTZWN1cml0eUNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIEVuYWJsZSBzZWN1cml0eSBwcm90ZWN0aW9uc1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVsbWV0ICE9PSBmYWxzZSkge1xuICAgICAgc2VydmVyLmFwcC51c2UoSGVsbWV0KHRoaXMub3B0aW9ucy5oZWxtZXQpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIENPUlMgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29ycykge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENPUlNcIik7XG4gICAgICB9XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShjb3JzKHRoaXMub3B0aW9ucy5jb3JzICE9PSB0cnVlID8gdGhpcy5vcHRpb25zLmNvcnMgOiB7fSkpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1c2VyIGFnZW50IG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZXJBZ2VudCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFVzZXIgQWdlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IGZvciB0aGUgcmVhbCBJUFxuICAgICAgc2VydmVyLmFwcC51c2UocmVxdWVzdElwLm13KCkpO1xuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCB1c2VyIGFnZW50IGluZm9ybWF0aW9uXG4gICAgICBzZXJ2ZXIuYXBwLnVzZSh1c2VyQWdlbnQuZXhwcmVzcygpKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmVzIHRoZSBzZXJ2ZXIgdHJ1c3QgcHJveHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnRydXN0UHJveHkgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbnMudHJ1c3RQcm94eSkge1xuICAgICAgc2VydmVyLmFwcC5zZXQoXCJ0cnVzdF9wcm94eVwiLCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==