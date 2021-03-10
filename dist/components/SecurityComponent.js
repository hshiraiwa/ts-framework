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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9TZWN1cml0eUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsd0NBQXdDO0FBQ3hDLCtDQUErQztBQUMvQyw2REFBdUY7QUFXdkYsTUFBcUIsaUJBQWlCO0lBSXBDLFlBQW1CLFVBQW9DLEVBQUU7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7UUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVNLFFBQVE7UUFDYixPQUFPLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQzNCLDhCQUE4QjtRQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7YUFDMUQ7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUVELCtCQUErQjtRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2FBQ2hFO1lBRUQsaUNBQWlDO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLHdDQUF3QztZQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUVELGlDQUFpQztRQUNqQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFakIsU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUFoREQsb0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29ycyBmcm9tIFwiY29yc1wiO1xuaW1wb3J0ICogYXMgSGVsbWV0IGZyb20gXCJoZWxtZXRcIjtcbmltcG9ydCAqIGFzIHJlcXVlc3RJcCBmcm9tIFwicmVxdWVzdC1pcFwiO1xuaW1wb3J0ICogYXMgdXNlckFnZW50IGZyb20gXCJleHByZXNzLXVzZXJhZ2VudFwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnRUeXBlLCBDb21wb25lbnQsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdXJpdHlDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGhlbG1ldD86IEhlbG1ldC5JSGVsbWV0Q29uZmlndXJhdGlvbiB8IGZhbHNlO1xuICB1c2VyQWdlbnQ/OiBib29sZWFuO1xuICBjb3JzPzogYm9vbGVhbiB8IGNvcnMuQ29yc09wdGlvbnM7XG4gIHRydXN0UHJveHk/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN1cml0eUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZWN1cml0eUNvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJTZWN1cml0eUNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIEVuYWJsZSBzZWN1cml0eSBwcm90ZWN0aW9uc1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVsbWV0ICE9PSBmYWxzZSkge1xuICAgICAgc2VydmVyLmFwcC51c2UoSGVsbWV0KHRoaXMub3B0aW9ucy5oZWxtZXQpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIENPUlMgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMuY29ycykge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENPUlNcIik7XG4gICAgICB9XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShjb3JzKHRoaXMub3B0aW9ucy5jb3JzICE9PSB0cnVlID8gdGhpcy5vcHRpb25zLmNvcnMgOiB7fSkpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1c2VyIGFnZW50IG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZXJBZ2VudCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFVzZXIgQWdlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IGZvciB0aGUgcmVhbCBJUFxuICAgICAgc2VydmVyLmFwcC51c2UocmVxdWVzdElwLm13KCkpO1xuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCB1c2VyIGFnZW50IGluZm9ybWF0aW9uXG4gICAgICBzZXJ2ZXIuYXBwLnVzZSh1c2VyQWdlbnQuZXhwcmVzcygpKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmVzIHRoZSBzZXJ2ZXIgdHJ1c3QgcHJveHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnRydXN0UHJveHkgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbnMudHJ1c3RQcm94eSkge1xuICAgICAgc2VydmVyLmFwcC5zZXQoXCJ0cnVzdF9wcm94eVwiLCAxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==