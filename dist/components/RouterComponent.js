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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const OAuthServer = require("express-oauth-server");
const ts_framework_common_1 = require("ts-framework-common");
const ErrorReporter_1 = require("../error/ErrorReporter");
const router_1 = require("./router");
class RouterComponent {
    constructor(options = {}) {
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    describe() {
        return { name: "RouterComponent" };
    }
    onMount(server) {
        // Use base router for mapping the routes to the Express server
        if (this.logger) {
            this.logger.silly("Initializing server middleware: Router");
        }
        // Builds the route map and binds to current express application
        router_1.Router.build(this.options.controllers, this.options.routes, {
            app: server.app,
            path: this.options.path,
            logger: this.options.logger
        });
        // Handles oauth server
        if (this.options.oauth) {
            const _a = this.options.oauth, { token, authorize } = _a, oauth = __rest(_a, ["token", "authorize"]);
            if (this.logger) {
                this.logger.silly("Initializing server middleware: OAuth2");
            }
            // Prepare OAuth 2.0 server instance and token endpoint
            server.app.oauth = new OAuthServer(oauth);
            if (authorize) {
                server.app.use(server.app.oauth.authorize(authorize));
            }
            if (token) {
                server.app.post("/oauth/token", server.app.oauth.token(token));
            }
        }
        // Bind the error handlers
        if (this.logger) {
            this.logger.silly("Initializing server middleware: ErrorReporter");
        }
        ErrorReporter_1.default(this.options.errors, {
            logger: this.logger,
            sentry: this.options.sentry ? server.sentry : undefined,
            group404: this.options.group404,
            omitStack: this.options.omitStack
        })(server.app);
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount() { }
}
exports.default = RouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvUm91dGVyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBb0Q7QUFDcEQsNkRBQXlHO0FBQ3pHLDBEQUFzRjtBQUN0RixxQ0FBNEM7QUF3QzVDLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsK0RBQStEO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxnRUFBZ0U7UUFDaEUsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMxRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsTUFBTSxLQUFpQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBbkQsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFpQyxFQUE1QixLQUFLLGNBQTVCLHNCQUE4QixDQUFxQixDQUFDO1lBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsdURBQXVEO1lBQ3RELE1BQU0sQ0FBQyxHQUFXLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRW5ELElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBQyxHQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1lBRUQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFHLE1BQU0sQ0FBQyxHQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNwRTtRQUVELHVCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN2RCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1lBQy9CLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7U0FDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFakIsU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUE1REQsa0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT0F1dGhTZXJ2ZXIgZnJvbSBcImV4cHJlc3Mtb2F1dGgtc2VydmVyXCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCwgQ29tcG9uZW50T3B0aW9ucywgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBlcnJvck1pZGRsZXdhcmUsIEVycm9yRGVmaW5pdGlvbnMgfSBmcm9tIFwiLi4vZXJyb3IvRXJyb3JSZXBvcnRlclwiO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZU1hcCB9IGZyb20gXCIuL3JvdXRlclwiO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9yb3V0ZXIvY29udHJvbGxlclwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyQ29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgcm91dGVzPzogUm91dGVNYXA7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbiAgY29udHJvbGxlcnM/OiB7XG4gICAgW2NvbnRyb2xsZXJOYW1lOiBzdHJpbmddOiBCYXNlQ29udHJvbGxlcjtcbiAgfTtcbiAgcGF0aD86IHtcbiAgICBmaWx0ZXJzPzogc3RyaW5nO1xuICAgIGNvbnRyb2xsZXJzPzogc3RyaW5nO1xuICB9O1xuICBlcnJvcnM/OiBFcnJvckRlZmluaXRpb25zO1xuICBvYXV0aD86IHtcbiAgICBtb2RlbDogYW55OyAvLyBUT0RPOiBTcGVjaWZ5IHRoZSBzaWduYXR1cmVcbiAgICBhdXRob3JpemU/OiBhbnk7IC8vIFRPRE86IFNwZWNpZnkgdGhlIHNpZ25hdHVyZVxuICAgIHVzZUVycm9ySGFuZGxlcj86IGJvb2xlYW47XG4gICAgY29udGludWVNaWRkbGV3YXJlPzogYm9vbGVhbjtcbiAgICBhbGxvd0V4dGVuZGVkVG9rZW5BdHRyaWJ1dGVzPzogYm9vbGVhbjtcbiAgICB0b2tlbj86IHtcbiAgICAgIGV4dGVuZGVkR3JhbnRUeXBlcz86IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuICAgICAgYWNjZXNzVG9rZW5MaWZldGltZT86IG51bWJlcjtcbiAgICAgIHJlZnJlc2hUb2tlbkxpZmV0aW1lPzogbnVtYmVyO1xuICAgICAgcmVxdWlyZUNsaWVudEF1dGhlbnRpY2F0aW9uPzogYm9vbGVhbjtcbiAgICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIH07XG4gIH07XG4gIC8qIEdyb3VwIDQwNCBlcnJvcnMgYnkgb21taXRpbmcgbWV0aG9kIGFuZCB1cmwgaW5mb3JtYXRpb24gZnJvbSB0aGUgZXJyb3IgbWVzc2FnZVxuICAgICBUaGUgaW5mb3JtYXRpb24gd2lsbCBzdGlsbCBiZSBhdmFpbGFiZSBpbiB0aGUgZXJyb3IgYXMgbWV0YWRhdGFcbiAgKi9cbiAgZ3JvdXA0MDQ/OiBib29sZWFuO1xuICAvKiBPbWl0IHN0YWNrIGZyb20gdGhlIGh0dHAgZXJyb3IgcmVzcG9uc2UgKEJ1dCBzdGlsbCBsb2cgaXQpICovXG4gIG9taXRTdGFjaz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSb3V0ZXJDb21wb25lbnRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgcHVibGljIGRlc2NyaWJlKCkge1xuICAgIHJldHVybiB7IG5hbWU6IFwiUm91dGVyQ29tcG9uZW50XCIgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gICAgLy8gVXNlIGJhc2Ugcm91dGVyIGZvciBtYXBwaW5nIHRoZSByb3V0ZXMgdG8gdGhlIEV4cHJlc3Mgc2VydmVyXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogUm91dGVyXCIpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkcyB0aGUgcm91dGUgbWFwIGFuZCBiaW5kcyB0byBjdXJyZW50IGV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBSb3V0ZXIuYnVpbGQodGhpcy5vcHRpb25zLmNvbnRyb2xsZXJzLCB0aGlzLm9wdGlvbnMucm91dGVzLCB7XG4gICAgICBhcHA6IHNlcnZlci5hcHAsXG4gICAgICBwYXRoOiB0aGlzLm9wdGlvbnMucGF0aCxcbiAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlclxuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlcyBvYXV0aCBzZXJ2ZXJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9hdXRoKSB7XG4gICAgICBjb25zdCB7IHRva2VuLCBhdXRob3JpemUsIC4uLm9hdXRoIH0gPSB0aGlzLm9wdGlvbnMub2F1dGg7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE9BdXRoMlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSBPQXV0aCAyLjAgc2VydmVyIGluc3RhbmNlIGFuZCB0b2tlbiBlbmRwb2ludFxuICAgICAgKHNlcnZlci5hcHAgYXMgYW55KS5vYXV0aCA9IG5ldyBPQXV0aFNlcnZlcihvYXV0aCk7XG5cbiAgICAgIGlmIChhdXRob3JpemUpIHtcbiAgICAgICAgc2VydmVyLmFwcC51c2UoKHNlcnZlci5hcHAgYXMgYW55KS5vYXV0aC5hdXRob3JpemUoYXV0aG9yaXplKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXJ2ZXIuYXBwLnBvc3QoXCIvb2F1dGgvdG9rZW5cIiwgKHNlcnZlci5hcHAgYXMgYW55KS5vYXV0aC50b2tlbih0b2tlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEJpbmQgdGhlIGVycm9yIGhhbmRsZXJzXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogRXJyb3JSZXBvcnRlclwiKTtcbiAgICB9XG5cbiAgICBlcnJvck1pZGRsZXdhcmUodGhpcy5vcHRpb25zLmVycm9ycywge1xuICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeSA/IHNlcnZlci5zZW50cnkgOiB1bmRlZmluZWQsXG4gICAgICBncm91cDQwNDogdGhpcy5vcHRpb25zLmdyb3VwNDA0LFxuICAgICAgb21pdFN0YWNrOiB0aGlzLm9wdGlvbnMub21pdFN0YWNrXG4gICAgfSkoc2VydmVyLmFwcCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==