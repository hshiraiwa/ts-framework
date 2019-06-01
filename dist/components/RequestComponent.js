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
            // Text body
            server.app.use(bodyParser.text({
                limit: this.options.bodyLimit
            }));
            // JSON body
            server.app.use(bodyParser.json({
                limit: this.options.bodyLimit
            }));
            // Urlencoded body
            server.app.use(bodyParser.urlencoded({
                limit: this.options.bodyLimit,
                extended: true
            }));
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
        server.app.use(bodyParser.text());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlHO0FBZXpHLE1BQXFCLGdCQUFnQjtJQUluQyxZQUFtQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixZQUFZO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1osVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO2FBQzlCLENBQUMsQ0FDSCxDQUFDO1lBRUYsWUFBWTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNaLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzthQUM5QixDQUFDLENBQ0gsQ0FBQztZQUVGLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDWixVQUFVLENBQUMsVUFBVSxDQUFDO2dCQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO2dCQUM3QixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FDSCxDQUFDO1NBQ0g7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzVELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBYSxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDckIsY0FBYztnQkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxrQ0FBa0M7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFakMsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7YUFDbkU7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsbURBQW1EO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFZLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWpCLFNBQVMsS0FBSSxDQUFDO0NBQ3RCO0FBakZELG1DQWlGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE11bHRlciBmcm9tIFwibXVsdGVyXCI7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tIFwibWV0aG9kLW92ZXJyaWRlXCI7XG5pbXBvcnQgeyBsZWdhY3lQYXJhbXMsIHJlc3BvbnNlQmluZGVyIH0gZnJvbSBcIi4vbWlkZGxld2FyZXNcIjtcbmltcG9ydCB7IExvZ2dlciwgQ29tcG9uZW50LCBDb21wb25lbnRUeXBlLCBDb21wb25lbnRPcHRpb25zLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgYm9keUxpbWl0Pzogc3RyaW5nO1xuICBzZWNyZXQ/OiBzdHJpbmc7XG4gIG11bHRlcj86IHtcbiAgICBzaW5nbGU/OiBzdHJpbmc7XG4gICAgYXJyYXk/OiB7IG5hbWU6IHN0cmluZzsgbWF4Q291bnQ6IG51bWJlciB9O1xuICAgIGZpZWxkcz86IHsgbmFtZTogc3RyaW5nOyBtYXhDb3VudDogbnVtYmVyIH1bXTtcbiAgICBvcHRpb25zPzogTXVsdGVyLk9wdGlvbnM7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3RDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnQge1xuICBwdWJsaWMgdHlwZTogQ29tcG9uZW50VHlwZS5NSURETEVXQVJFO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVxdWVzdENvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJSZXF1ZXN0Q29tcG9uZW50XCIgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gICAgLy8gUHJlcGFyZSBib2R5IHNpemUgbGltaXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmJvZHlMaW1pdCkge1xuICAgICAgLy8gVGV4dCBib2R5XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShcbiAgICAgICAgYm9keVBhcnNlci50ZXh0KHtcbiAgICAgICAgICBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgLy8gSlNPTiBib2R5XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShcbiAgICAgICAgYm9keVBhcnNlci5qc29uKHtcbiAgICAgICAgICBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gVXJsZW5jb2RlZCBib2R5XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShcbiAgICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgICBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdCxcbiAgICAgICAgICBleHRlbmRlZDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbXVsdGVyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5vcHRpb25zLm11bHRlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE11bHRlclwiKTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdGlvbnMubXVsdGVyIGFzIGFueTtcbiAgICAgIGNvbnN0IG11bHRlciA9IE11bHRlcihvcHRzKTtcblxuICAgICAgaWYgKG9wdHMuc2luZ2xlKSB7XG4gICAgICAgIC8vIFNpbmdsZSBmaWxlIGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5zaW5nbGUob3B0cy5zaW5nbGUpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5hcnJheSkge1xuICAgICAgICAvLyBBcnJheSBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuYXJyYXkob3B0cy5hcnJheS5uYW1lLCBvcHRzLmFycmF5Lm1heENvdW50KSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZmllbGRzKSB7XG4gICAgICAgIC8vIE11bHRpcGxlIGZpZWxkc1xuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuZmllbGRzKG9wdHMuZmllbGRzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEZWZhdWx0cyB0byBzaW5nbGUgXCJmaWxlXCIgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLnNpbmdsZShcImZpbGVcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByZXBhcmUgYm9keSBwYXJzZXJcbiAgICBzZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLnRleHQoKSk7XG4gICAgc2VydmVyLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgc2VydmVyLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbiAgICAvLyBPbmx5IGVuYWJsZSBjb29raWUgcGFyc2VyIGlmIGEgc2VjcmV0IHdhcyBzZXRcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3JldCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KFwiSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBDb29raWVQYXJzZXJcIik7XG4gICAgICB9XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShjb29raWVQYXJzZXIodGhpcy5vcHRpb25zLnNlY3JldCkpO1xuICAgIH1cblxuICAgIC8vIFV0aWxpdGFyeSBtaWRkbGV3YXJlcyBmb3IgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgIHNlcnZlci5hcHAudXNlKGxlZ2FjeVBhcmFtcyk7XG4gICAgc2VydmVyLmFwcC51c2UocmVzcG9uc2VCaW5kZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHt9XG5cbiAgcHVibGljIG9uVW5tb3VudCgpIHt9XG59XG4iXX0=