"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
            raven: this.options.sentry ? server.raven : undefined
        })(server.app);
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount() { }
}
exports.default = RouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvUm91dGVyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBb0Q7QUFDcEQsNkRBQXlGO0FBQ3pGLDBEQUFzRjtBQUN0RixxQ0FBNEM7QUFrQzVDLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsK0RBQStEO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxnRUFBZ0U7UUFDaEUsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMxRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsTUFBTSx1QkFBbUQsRUFBbkQsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFpQyxFQUEvQiwwQ0FBK0IsQ0FBQztZQUMxRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUM3RDtZQUVELHVEQUF1RDtZQUN0RCxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNoRTtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRyxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFFRCx1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRVksTUFBTTs7UUFFbkIsQ0FBQztLQUFBO0lBRU0sU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUE1REQsa0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT0F1dGhTZXJ2ZXIgZnJvbSBcImV4cHJlc3Mtb2F1dGgtc2VydmVyXCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCwgQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGVycm9yTWlkZGxld2FyZSwgRXJyb3JEZWZpbml0aW9ucyB9IGZyb20gXCIuLi9lcnJvci9FcnJvclJlcG9ydGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlTWFwIH0gZnJvbSBcIi4vcm91dGVyXCI7XG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL3JvdXRlci9jb250cm9sbGVyXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgcm91dGVzPzogUm91dGVNYXA7XG4gIHNlbnRyeT86IHtcbiAgICBkc246IHN0cmluZztcbiAgfTtcbiAgY29udHJvbGxlcnM/OiB7XG4gICAgW2NvbnRyb2xsZXJOYW1lOiBzdHJpbmddOiBCYXNlQ29udHJvbGxlcjtcbiAgfTtcbiAgcGF0aD86IHtcbiAgICBmaWx0ZXJzPzogc3RyaW5nO1xuICAgIGNvbnRyb2xsZXJzPzogc3RyaW5nO1xuICB9O1xuICBlcnJvcnM/OiBFcnJvckRlZmluaXRpb25zO1xuICBvYXV0aD86IHtcbiAgICBtb2RlbDogYW55OyAvLyBUT0RPOiBTcGVjaWZ5IHRoZSBzaWduYXR1cmVcbiAgICBhdXRob3JpemU/OiBhbnk7IC8vIFRPRE86IFNwZWNpZnkgdGhlIHNpZ25hdHVyZVxuICAgIHVzZUVycm9ySGFuZGxlcj86IGJvb2xlYW47XG4gICAgY29udGludWVNaWRkbGV3YXJlPzogYm9vbGVhbjtcbiAgICBhbGxvd0V4dGVuZGVkVG9rZW5BdHRyaWJ1dGVzPzogYm9vbGVhbjtcbiAgICB0b2tlbj86IHtcbiAgICAgIGV4dGVuZGVkR3JhbnRUeXBlcz86IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xuICAgICAgYWNjZXNzVG9rZW5MaWZldGltZT86IG51bWJlcjtcbiAgICAgIHJlZnJlc2hUb2tlbkxpZmV0aW1lPzogbnVtYmVyO1xuICAgICAgcmVxdWlyZUNsaWVudEF1dGhlbnRpY2F0aW9uPzogYm9vbGVhbjtcbiAgICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUm91dGVyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlJvdXRlckNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIFVzZSBiYXNlIHJvdXRlciBmb3IgbWFwcGluZyB0aGUgcm91dGVzIHRvIHRoZSBFeHByZXNzIHNlcnZlclxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFJvdXRlclwiKTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZHMgdGhlIHJvdXRlIG1hcCBhbmQgYmluZHMgdG8gY3VycmVudCBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAgUm91dGVyLmJ1aWxkKHRoaXMub3B0aW9ucy5jb250cm9sbGVycywgdGhpcy5vcHRpb25zLnJvdXRlcywge1xuICAgICAgYXBwOiBzZXJ2ZXIuYXBwLFxuICAgICAgcGF0aDogdGhpcy5vcHRpb25zLnBhdGgsXG4gICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXJcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZXMgb2F1dGggc2VydmVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vYXV0aCkge1xuICAgICAgY29uc3QgeyB0b2tlbiwgYXV0aG9yaXplLCAuLi5vYXV0aCB9ID0gdGhpcy5vcHRpb25zLm9hdXRoO1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBPQXV0aDJcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgT0F1dGggMi4wIHNlcnZlciBpbnN0YW5jZSBhbmQgdG9rZW4gZW5kcG9pbnRcbiAgICAgIChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGggPSBuZXcgT0F1dGhTZXJ2ZXIob2F1dGgpO1xuXG4gICAgICBpZiAoYXV0aG9yaXplKSB7XG4gICAgICAgIHNlcnZlci5hcHAudXNlKChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGguYXV0aG9yaXplKGF1dGhvcml6ZSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2VydmVyLmFwcC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGgudG9rZW4odG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCaW5kIHRoZSBlcnJvciBoYW5kbGVyc1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IEVycm9yUmVwb3J0ZXJcIik7XG4gICAgfVxuXG4gICAgZXJyb3JNaWRkbGV3YXJlKHRoaXMub3B0aW9ucy5lcnJvcnMsIHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICByYXZlbjogdGhpcy5vcHRpb25zLnNlbnRyeSA/IHNlcnZlci5yYXZlbiA6IHVuZGVmaW5lZFxuICAgIH0pKHNlcnZlci5hcHApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHtcblxuICB9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHt9XG59XG4iXX0=