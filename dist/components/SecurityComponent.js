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
        return { name: 'SecurityMiddleware' };
    }
    onMount(server) {
        // Enable security protections
        if (this.options.helmet !== false) {
            server.app.use(Helmet(this.options.helmet));
        }
        // Enable the CORS middleware
        if (this.options.cors) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: CORS');
            }
            server.app.use(cors(this.options.cors !== true ? this.options.cors : {}));
        }
        // Handle user agent middleware
        if (this.options.userAgent) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: User Agent');
            }
            // Parses request for the real IP
            server.app.use(requestIp.mw());
            // Parses request user agent information
            server.app.use(userAgent.express());
        }
        // Ensures the server trust proxy
        if (this.options.trustProxy === undefined || this.options.trustProxy) {
            server.app.set('trust_proxy', 1);
        }
    }
    onInit(server) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount(server) {
    }
}
exports.default = SecurityComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdXJpdHlDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9TZWN1cml0eUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLDZEQUF1RTtBQVd2RSxNQUFxQixpQkFBaUI7SUFJcEMsWUFBbUIsVUFBb0MsRUFBRTtRQUF0QyxZQUFPLEdBQVAsT0FBTyxDQUErQjtRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNFO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDaEU7WUFFRCxpQ0FBaUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFL0Isd0NBQXdDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFWSxNQUFNLENBQUMsTUFBYzs7UUFDbEMsQ0FBQztLQUFBO0lBRU0sU0FBUyxDQUFDLE1BQWM7SUFDL0IsQ0FBQztDQUNGO0FBbERELG9DQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgKiBhcyBIZWxtZXQgZnJvbSAnaGVsbWV0JztcbmltcG9ydCAqIGFzIHJlcXVlc3RJcCBmcm9tICdyZXF1ZXN0LWlwJztcbmltcG9ydCAqIGFzIHVzZXJBZ2VudCBmcm9tICdleHByZXNzLXVzZXJhZ2VudCc7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudCB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuaW1wb3J0IFNlcnZlciBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdXJpdHlDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBoZWxtZXQ/OiBIZWxtZXQuSUhlbG1ldENvbmZpZ3VyYXRpb24gfCBmYWxzZTtcbiAgdXNlckFnZW50PzogYm9vbGVhbjtcbiAgY29ycz86IGJvb2xlYW4gfCBjb3JzLkNvcnNPcHRpb25zO1xuICB0cnVzdFByb3h5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdXJpdHlDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZTogQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlY3VyaXR5Q29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiAnU2VjdXJpdHlNaWRkbGV3YXJlJyB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpIHtcbiAgICAvLyBFbmFibGUgc2VjdXJpdHkgcHJvdGVjdGlvbnNcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlbG1ldCAhPT0gZmFsc2UpIHtcbiAgICAgIHNlcnZlci5hcHAudXNlKEhlbG1ldCh0aGlzLm9wdGlvbnMuaGVsbWV0KSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIHRoZSBDT1JTIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5vcHRpb25zLmNvcnMpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENPUlMnKTtcbiAgICAgIH1cbiAgICAgIHNlcnZlci5hcHAudXNlKGNvcnModGhpcy5vcHRpb25zLmNvcnMgIT09IHRydWUgPyB0aGlzLm9wdGlvbnMuY29ycyA6IHt9KSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVzZXIgYWdlbnQgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlckFnZW50KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBVc2VyIEFnZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IGZvciB0aGUgcmVhbCBJUFxuICAgICAgc2VydmVyLmFwcC51c2UocmVxdWVzdElwLm13KCkpO1xuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCB1c2VyIGFnZW50IGluZm9ybWF0aW9uXG4gICAgICBzZXJ2ZXIuYXBwLnVzZSh1c2VyQWdlbnQuZXhwcmVzcygpKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmVzIHRoZSBzZXJ2ZXIgdHJ1c3QgcHJveHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnRydXN0UHJveHkgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm9wdGlvbnMudHJ1c3RQcm94eSkge1xuICAgICAgc2VydmVyLmFwcC5zZXQoJ3RydXN0X3Byb3h5JywgMSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdChzZXJ2ZXI6IFNlcnZlcikge1xuICB9XG5cbiAgcHVibGljIG9uVW5tb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICB9XG59XG4iXX0=