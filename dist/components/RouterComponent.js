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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvUm91dGVyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBb0Q7QUFDcEQsNkRBQXlHO0FBQ3pHLDBEQUFzRjtBQUN0RixxQ0FBNEM7QUF3QzVDLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsK0RBQStEO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxnRUFBZ0U7UUFDaEUsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMxRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsTUFBTSx1QkFBbUQsRUFBbkQsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFpQyxFQUEvQiwwQ0FBK0IsQ0FBQztZQUMxRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUM3RDtZQUVELHVEQUF1RDtZQUN0RCxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNoRTtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRyxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFFRCx1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDdkQsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1NBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWpCLFNBQVMsS0FBSSxDQUFDO0NBQ3RCO0FBNURELGtDQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE9BdXRoU2VydmVyIGZyb20gXCJleHByZXNzLW9hdXRoLXNlcnZlclwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnRUeXBlLCBDb21wb25lbnQsIENvbXBvbmVudE9wdGlvbnMsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZXJyb3JNaWRkbGV3YXJlLCBFcnJvckRlZmluaXRpb25zIH0gZnJvbSBcIi4uL2Vycm9yL0Vycm9yUmVwb3J0ZXJcIjtcbmltcG9ydCB7IFJvdXRlciwgUm91dGVNYXAgfSBmcm9tIFwiLi9yb3V0ZXJcIjtcbmltcG9ydCB7IEJhc2VDb250cm9sbGVyIH0gZnJvbSBcIi4vcm91dGVyL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIHJvdXRlcz86IFJvdXRlTWFwO1xuICBzZW50cnk/OiB7XG4gICAgZHNuOiBzdHJpbmc7XG4gIH07XG4gIGNvbnRyb2xsZXJzPzoge1xuICAgIFtjb250cm9sbGVyTmFtZTogc3RyaW5nXTogQmFzZUNvbnRyb2xsZXI7XG4gIH07XG4gIHBhdGg/OiB7XG4gICAgZmlsdGVycz86IHN0cmluZztcbiAgICBjb250cm9sbGVycz86IHN0cmluZztcbiAgfTtcbiAgZXJyb3JzPzogRXJyb3JEZWZpbml0aW9ucztcbiAgb2F1dGg/OiB7XG4gICAgbW9kZWw6IGFueTsgLy8gVE9ETzogU3BlY2lmeSB0aGUgc2lnbmF0dXJlXG4gICAgYXV0aG9yaXplPzogYW55OyAvLyBUT0RPOiBTcGVjaWZ5IHRoZSBzaWduYXR1cmVcbiAgICB1c2VFcnJvckhhbmRsZXI/OiBib29sZWFuO1xuICAgIGNvbnRpbnVlTWlkZGxld2FyZT86IGJvb2xlYW47XG4gICAgYWxsb3dFeHRlbmRlZFRva2VuQXR0cmlidXRlcz86IGJvb2xlYW47XG4gICAgdG9rZW4/OiB7XG4gICAgICBleHRlbmRlZEdyYW50VHlwZXM/OiB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfTtcbiAgICAgIGFjY2Vzc1Rva2VuTGlmZXRpbWU/OiBudW1iZXI7XG4gICAgICByZWZyZXNoVG9rZW5MaWZldGltZT86IG51bWJlcjtcbiAgICAgIHJlcXVpcmVDbGllbnRBdXRoZW50aWNhdGlvbj86IGJvb2xlYW47XG4gICAgICBhbGxvd0V4dGVuZGVkVG9rZW5BdHRyaWJ1dGVzPzogYm9vbGVhbjtcbiAgICB9O1xuICB9O1xuICAvKiBHcm91cCA0MDQgZXJyb3JzIGJ5IG9tbWl0aW5nIG1ldGhvZCBhbmQgdXJsIGluZm9ybWF0aW9uIGZyb20gdGhlIGVycm9yIG1lc3NhZ2VcbiAgICAgVGhlIGluZm9ybWF0aW9uIHdpbGwgc3RpbGwgYmUgYXZhaWxhYmUgaW4gdGhlIGVycm9yIGFzIG1ldGFkYXRhXG4gICovXG4gIGdyb3VwNDA0PzogYm9vbGVhbjtcbiAgLyogT21pdCBzdGFjayBmcm9tIHRoZSBodHRwIGVycm9yIHJlc3BvbnNlIChCdXQgc3RpbGwgbG9nIGl0KSAqL1xuICBvbWl0U3RhY2s/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZTogQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUm91dGVyQ29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlJvdXRlckNvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIFVzZSBiYXNlIHJvdXRlciBmb3IgbWFwcGluZyB0aGUgcm91dGVzIHRvIHRoZSBFeHByZXNzIHNlcnZlclxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFJvdXRlclwiKTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZHMgdGhlIHJvdXRlIG1hcCBhbmQgYmluZHMgdG8gY3VycmVudCBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAgUm91dGVyLmJ1aWxkKHRoaXMub3B0aW9ucy5jb250cm9sbGVycywgdGhpcy5vcHRpb25zLnJvdXRlcywge1xuICAgICAgYXBwOiBzZXJ2ZXIuYXBwLFxuICAgICAgcGF0aDogdGhpcy5vcHRpb25zLnBhdGgsXG4gICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXJcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZXMgb2F1dGggc2VydmVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vYXV0aCkge1xuICAgICAgY29uc3QgeyB0b2tlbiwgYXV0aG9yaXplLCAuLi5vYXV0aCB9ID0gdGhpcy5vcHRpb25zLm9hdXRoO1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBPQXV0aDJcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgT0F1dGggMi4wIHNlcnZlciBpbnN0YW5jZSBhbmQgdG9rZW4gZW5kcG9pbnRcbiAgICAgIChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGggPSBuZXcgT0F1dGhTZXJ2ZXIob2F1dGgpO1xuXG4gICAgICBpZiAoYXV0aG9yaXplKSB7XG4gICAgICAgIHNlcnZlci5hcHAudXNlKChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGguYXV0aG9yaXplKGF1dGhvcml6ZSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2VydmVyLmFwcC5wb3N0KFwiL29hdXRoL3Rva2VuXCIsIChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGgudG9rZW4odG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCaW5kIHRoZSBlcnJvciBoYW5kbGVyc1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IEVycm9yUmVwb3J0ZXJcIik7XG4gICAgfVxuXG4gICAgZXJyb3JNaWRkbGV3YXJlKHRoaXMub3B0aW9ucy5lcnJvcnMsIHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICBzZW50cnk6IHRoaXMub3B0aW9ucy5zZW50cnkgPyBzZXJ2ZXIuc2VudHJ5IDogdW5kZWZpbmVkLFxuICAgICAgZ3JvdXA0MDQ6IHRoaXMub3B0aW9ucy5ncm91cDQwNCxcbiAgICAgIG9taXRTdGFjazogdGhpcy5vcHRpb25zLm9taXRTdGFja1xuICAgIH0pKHNlcnZlci5hcHApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHt9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHt9XG59XG4iXX0=