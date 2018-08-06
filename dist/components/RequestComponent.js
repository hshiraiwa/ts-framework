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
const Multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const middlewares_1 = require("./middlewares");
const ts_framework_common_1 = require("ts-framework-common");
class RequestComponent {
    constructor(options = {}) {
        this.options = options;
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    describe() {
        return { name: "RequestComponent" };
    }
    onMount(server) {
        // Prepare body size limit
        if (this.options.bodyLimit) {
            server.app.use(bodyParser({ limit: this.options.bodyLimit }));
        }
        // Handle multer middleware
        if (this.options.multer) {
            this.logger.silly("Initializing server middleware: Multer");
            const opts = this.options.multer;
            const multer = Multer(opts);
            if (opts.single) {
                // Single file field
                server.app.use(multer.single(opts.single));
            }
            else if (opts.array) {
                // Array field
                server.app.use(multer.array(opts.array.name, opts.array.maxCount));
            }
            else if (opts.fields) {
                // Multiple fields
                server.app.use(multer.fields(opts.fields));
            }
            else {
                // Defaults to single "file" field
                server.app.use(multer.single("file"));
            }
        }
        // Prepare body parser
        server.app.use(bodyParser.json());
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(methodOverride());
        // Only enable cookie parser if a secret was set
        if (this.options.secret) {
            if (this.logger) {
                this.logger.silly("Initializing server middleware: CookieParser");
            }
            server.app.use(cookieParser(this.options.secret));
        }
        // Utilitary middlewares for requests and responses
        server.app.use(middlewares_1.legacyParams);
        server.app.use(middlewares_1.responseBinder);
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onUnmount() { }
}
exports.default = RequestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlGO0FBZXpGLE1BQXFCLGdCQUFnQjtJQUluQyxZQUFtQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBYSxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDckIsY0FBYztnQkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxrQ0FBa0M7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFakMsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7YUFDbkU7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsbURBQW1EO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFZLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWpCLFNBQVMsS0FBSSxDQUFDO0NBQ3RCO0FBNURELG1DQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE11bHRlciBmcm9tIFwibXVsdGVyXCI7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XG5pbXBvcnQgeyBsZWdhY3lQYXJhbXMsIHJlc3BvbnNlQmluZGVyIH0gZnJvbSBcIi4vbWlkZGxld2FyZXNcIjtcbmltcG9ydCB7IExvZ2dlciwgQ29tcG9uZW50LCBDb21wb25lbnRUeXBlLCBDb21wb25lbnRPcHRpb25zIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlcjtcbiAgYm9keUxpbWl0Pzogc3RyaW5nO1xuICBzZWNyZXQ/OiBzdHJpbmc7XG4gIG11bHRlcj86IHtcbiAgICBzaW5nbGU/OiBzdHJpbmc7XG4gICAgYXJyYXk/OiB7IG5hbWU6IHN0cmluZzsgbWF4Q291bnQ6IG51bWJlciB9O1xuICAgIGZpZWxkcz86IHsgbmFtZTogc3RyaW5nOyBtYXhDb3VudDogbnVtYmVyIH1bXTtcbiAgICBvcHRpb25zPzogTXVsdGVyLk9wdGlvbnM7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3RDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZTogQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwcm90ZWN0ZWQgbG9nZ2VyOiBMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFJlcXVlc3RDb21wb25lbnRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgcHVibGljIGRlc2NyaWJlKCkge1xuICAgIHJldHVybiB7IG5hbWU6IFwiUmVxdWVzdENvbXBvbmVudFwiIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIFByZXBhcmUgYm9keSBzaXplIGxpbWl0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ib2R5TGltaXQpIHtcbiAgICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIoeyBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdCB9KSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG11bHRlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0ZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBNdWx0ZXJcIik7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5vcHRpb25zLm11bHRlciBhcyBhbnk7XG4gICAgICBjb25zdCBtdWx0ZXIgPSBNdWx0ZXIob3B0cyk7XG5cbiAgICAgIGlmIChvcHRzLnNpbmdsZSkge1xuICAgICAgICAvLyBTaW5nbGUgZmlsZSBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuc2luZ2xlKG9wdHMuc2luZ2xlKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuYXJyYXkpIHtcbiAgICAgICAgLy8gQXJyYXkgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLmFycmF5KG9wdHMuYXJyYXkubmFtZSwgb3B0cy5hcnJheS5tYXhDb3VudCkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmZpZWxkcykge1xuICAgICAgICAvLyBNdWx0aXBsZSBmaWVsZHNcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLmZpZWxkcyhvcHRzLmZpZWxkcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRGVmYXVsdHMgdG8gc2luZ2xlIFwiZmlsZVwiIGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5zaW5nbGUoXCJmaWxlXCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIGJvZHkgcGFyc2VyXG4gICAgc2VydmVyLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgc2VydmVyLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbiAgICAvLyBPbmx5IGVuYWJsZSBjb29raWUgcGFyc2VyIGlmIGEgc2VjcmV0IHdhcyBzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3JldCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBDb29raWVQYXJzZXJcIik7XG4gICAgICB9XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShjb29raWVQYXJzZXIodGhpcy5vcHRpb25zLnNlY3JldCkpO1xuICAgIH1cblxuICAgIC8vIFV0aWxpdGFyeSBtaWRkbGV3YXJlcyBmb3IgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgIHNlcnZlci5hcHAudXNlKGxlZ2FjeVBhcmFtcyk7XG4gICAgc2VydmVyLmFwcC51c2UocmVzcG9uc2VCaW5kZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHt9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHt9XG59XG4iXX0=