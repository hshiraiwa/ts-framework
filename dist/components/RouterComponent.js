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
        return { name: 'RouterComponent' };
    }
    onMount(server) {
        // Use base router for mapping the routes to the Express server
        if (this.logger) {
            this.logger.silly('Initializing server middleware: Router');
        }
        // Builds the route map and binds to current express application
        router_1.Router.build(this.options.controllers, this.options.routes, {
            app: server.app,
            path: this.options.path,
            logger: this.options.logger,
        });
        // Handles oauth server
        if (this.options.oauth) {
            const _a = this.options.oauth, { token, authorize } = _a, oauth = __rest(_a, ["token", "authorize"]);
            if (this.logger) {
                this.logger.silly('Initializing server middleware: OAuth2');
            }
            // Prepare OAuth 2.0 server instance and token endpoint
            server.app.oauth = new OAuthServer(oauth);
            if (authorize) {
                server.app.use(server.app.oauth.authorize(authorize));
            }
            if (token) {
                server.app.post('/oauth/token', server.app.oauth.token(token));
            }
        }
        // Bind the error handlers
        if (this.logger) {
            this.logger.silly('Initializing server middleware: ErrorReporter');
        }
        ErrorReporter_1.default(this.options.errors, {
            logger: this.logger,
            raven: this.options.sentry ? server.raven : undefined,
        })(server.app);
    }
    onInit(server) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount(server) {
    }
}
exports.default = RouterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvUm91dGVyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBb0Q7QUFDcEQsNkRBQXlGO0FBQ3pGLDBEQUFzRjtBQUN0RixxQ0FBNEM7QUFrQzVDLE1BQXFCLGVBQWU7SUFJbEMsWUFBbUIsVUFBa0MsRUFBRTtRQUFwQyxZQUFPLEdBQVAsT0FBTyxDQUE2QjtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsK0RBQStEO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7UUFFRCxnRUFBZ0U7UUFDaEUsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMxRCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsTUFBTSx1QkFBbUQsRUFBbkQsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFpQyxFQUEvQiwwQ0FBK0IsQ0FBQztZQUMxRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUM3RDtZQUVELHVEQUF1RDtZQUN0RCxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNoRTtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRyxNQUFNLENBQUMsR0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBRUQsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFFRCx1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRVksTUFBTSxDQUFDLE1BQWM7O1FBQ2xDLENBQUM7S0FBQTtJQUVNLFNBQVMsQ0FBQyxNQUFjO0lBQy9CLENBQUM7Q0FDRjtBQTVERCxrQ0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBPQXV0aFNlcnZlciBmcm9tICdleHByZXNzLW9hdXRoLXNlcnZlcic7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCwgQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBlcnJvck1pZGRsZXdhcmUsIEVycm9yRGVmaW5pdGlvbnMgfSBmcm9tICcuLi9lcnJvci9FcnJvclJlcG9ydGVyJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGVNYXAgfSBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gJy4vcm91dGVyL2NvbnRyb2xsZXInO1xuaW1wb3J0IFNlcnZlciBmcm9tICcuLi9zZXJ2ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlckNvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICByb3V0ZXM/OiBSb3V0ZU1hcDtcbiAgc2VudHJ5Pzoge1xuICAgIGRzbjogc3RyaW5nO1xuICB9O1xuICBjb250cm9sbGVycz86IHtcbiAgICBbY29udHJvbGxlck5hbWU6IHN0cmluZ106IEJhc2VDb250cm9sbGVyO1xuICB9O1xuICBwYXRoPzoge1xuICAgIGZpbHRlcnM/OiBzdHJpbmc7XG4gICAgY29udHJvbGxlcnM/OiBzdHJpbmc7XG4gIH07XG4gIGVycm9ycz86IEVycm9yRGVmaW5pdGlvbnM7XG4gIG9hdXRoPzoge1xuICAgIG1vZGVsOiBhbnk7IC8vIFRPRE86IFNwZWNpZnkgdGhlIHNpZ25hdHVyZVxuICAgIGF1dGhvcml6ZT86IGFueSwgLy8gVE9ETzogU3BlY2lmeSB0aGUgc2lnbmF0dXJlXG4gICAgdXNlRXJyb3JIYW5kbGVyPzogYm9vbGVhbjtcbiAgICBjb250aW51ZU1pZGRsZXdhcmU/OiBib29sZWFuO1xuICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIHRva2VuPzoge1xuICAgICAgZXh0ZW5kZWRHcmFudFR5cGVzPzogeyBbbmFtZTogc3RyaW5nXTogYW55IH07XG4gICAgICBhY2Nlc3NUb2tlbkxpZmV0aW1lPzogbnVtYmVyO1xuICAgICAgcmVmcmVzaFRva2VuTGlmZXRpbWU/OiBudW1iZXI7XG4gICAgICByZXF1aXJlQ2xpZW50QXV0aGVudGljYXRpb24/OiBib29sZWFuO1xuICAgICAgYWxsb3dFeHRlbmRlZFRva2VuQXR0cmlidXRlcz86IGJvb2xlYW47XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZTogQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFJvdXRlckNvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogJ1JvdXRlckNvbXBvbmVudCcgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gICAgLy8gVXNlIGJhc2Ugcm91dGVyIGZvciBtYXBwaW5nIHRoZSByb3V0ZXMgdG8gdGhlIEV4cHJlc3Mgc2VydmVyXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseSgnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBSb3V0ZXInKTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZHMgdGhlIHJvdXRlIG1hcCBhbmQgYmluZHMgdG8gY3VycmVudCBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAgUm91dGVyLmJ1aWxkKHRoaXMub3B0aW9ucy5jb250cm9sbGVycywgdGhpcy5vcHRpb25zLnJvdXRlcywge1xuICAgICAgYXBwOiBzZXJ2ZXIuYXBwLFxuICAgICAgcGF0aDogdGhpcy5vcHRpb25zLnBhdGgsXG4gICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXIsXG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGVzIG9hdXRoIHNlcnZlclxuICAgIGlmICh0aGlzLm9wdGlvbnMub2F1dGgpIHtcbiAgICAgIGNvbnN0IHsgdG9rZW4sIGF1dGhvcml6ZSwgLi4ub2F1dGggfSA9IHRoaXMub3B0aW9ucy5vYXV0aDtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5zaWxseSgnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBPQXV0aDInKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSBPQXV0aCAyLjAgc2VydmVyIGluc3RhbmNlIGFuZCB0b2tlbiBlbmRwb2ludFxuICAgICAgKHNlcnZlci5hcHAgYXMgYW55KS5vYXV0aCA9IG5ldyBPQXV0aFNlcnZlcihvYXV0aCk7XG5cbiAgICAgIGlmIChhdXRob3JpemUpIHtcbiAgICAgICAgc2VydmVyLmFwcC51c2UoKHNlcnZlci5hcHAgYXMgYW55KS5vYXV0aC5hdXRob3JpemUoYXV0aG9yaXplKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXJ2ZXIuYXBwLnBvc3QoJy9vYXV0aC90b2tlbicsIChzZXJ2ZXIuYXBwIGFzIGFueSkub2F1dGgudG9rZW4odG9rZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCaW5kIHRoZSBlcnJvciBoYW5kbGVyc1xuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogRXJyb3JSZXBvcnRlcicpO1xuICAgIH1cblxuICAgIGVycm9yTWlkZGxld2FyZSh0aGlzLm9wdGlvbnMuZXJyb3JzLCB7XG4gICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgcmF2ZW46IHRoaXMub3B0aW9ucy5zZW50cnkgPyBzZXJ2ZXIucmF2ZW4gOiB1bmRlZmluZWQsXG4gICAgfSkoc2VydmVyLmFwcCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KHNlcnZlcjogU2VydmVyKSB7XG4gIH1cblxuICBwdWJsaWMgb25Vbm1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gIH1cbn1cbiJdfQ==