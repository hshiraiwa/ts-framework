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
                limit: this.options.bodyLimit,
                inflate: this.options.inflate
            }));
            // JSON body
            server.app.use(bodyParser.json({
                limit: this.options.bodyLimit,
                inflate: this.options.inflate
            }));
            // Urlencoded body
            server.app.use(bodyParser.urlencoded({
                limit: this.options.bodyLimit,
                inflate: this.options.inflate,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlHO0FBZ0J6RyxNQUFxQixnQkFBZ0I7SUFJbkMsWUFBbUIsVUFBbUMsRUFBRTtRQUFyQyxZQUFPLEdBQVAsT0FBTyxDQUE4QjtRQUN0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sT0FBTyxDQUFDLE1BQWM7UUFDM0IsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDMUIsWUFBWTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNaLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztnQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTzthQUM5QixDQUFDLENBQ0gsQ0FBQztZQUVGLFlBQVk7WUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDWixVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDOUIsQ0FBQyxDQUNILENBQUM7WUFFRixrQkFBa0I7WUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1osVUFBVSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztnQkFDN0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDN0IsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsMkJBQTJCO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUM1RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQWEsQ0FBQztZQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLG9CQUFvQjtnQkFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1QztpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3JCLGNBQWM7Z0JBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDcEU7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsa0NBQWtDO2dCQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDdkM7U0FDRjtRQUVELHNCQUFzQjtRQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLGdEQUFnRDtRQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNuRDtRQUVELG1EQUFtRDtRQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBWSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsNEJBQWMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVqQixTQUFTLEtBQUksQ0FBQztDQUN0QjtBQXBGRCxtQ0FvRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNdWx0ZXIgZnJvbSBcIm11bHRlclwiO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tIFwiY29va2llLXBhcnNlclwiO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSBcIm1ldGhvZC1vdmVycmlkZVwiO1xuaW1wb3J0IHsgbGVnYWN5UGFyYW1zLCByZXNwb25zZUJpbmRlciB9IGZyb20gXCIuL21pZGRsZXdhcmVzXCI7XG5pbXBvcnQgeyBMb2dnZXIsIENvbXBvbmVudCwgQ29tcG9uZW50VHlwZSwgQ29tcG9uZW50T3B0aW9ucywgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGJvZHlMaW1pdD86IHN0cmluZztcbiAgaW5mbGF0ZT86IGJvb2xlYW47XG4gIHNlY3JldD86IHN0cmluZztcbiAgbXVsdGVyPzoge1xuICAgIHNpbmdsZT86IHN0cmluZztcbiAgICBhcnJheT86IHsgbmFtZTogc3RyaW5nOyBtYXhDb3VudDogbnVtYmVyIH07XG4gICAgZmllbGRzPzogeyBuYW1lOiBzdHJpbmc7IG1heENvdW50OiBudW1iZXIgfVtdO1xuICAgIG9wdGlvbnM/OiBNdWx0ZXIuT3B0aW9ucztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlJlcXVlc3RDb21wb25lbnRcIiB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpIHtcbiAgICAvLyBQcmVwYXJlIGJvZHkgc2l6ZSBsaW1pdFxuICAgIGlmICh0aGlzLm9wdGlvbnMuYm9keUxpbWl0KSB7XG4gICAgICAvLyBUZXh0IGJvZHlcbiAgICAgIHNlcnZlci5hcHAudXNlKFxuICAgICAgICBib2R5UGFyc2VyLnRleHQoe1xuICAgICAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMuYm9keUxpbWl0LFxuICAgICAgICAgIGluZmxhdGU6IHRoaXMub3B0aW9ucy5pbmZsYXRlXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBKU09OIGJvZHlcbiAgICAgIHNlcnZlci5hcHAudXNlKFxuICAgICAgICBib2R5UGFyc2VyLmpzb24oe1xuICAgICAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMuYm9keUxpbWl0LFxuICAgICAgICAgIGluZmxhdGU6IHRoaXMub3B0aW9ucy5pbmZsYXRlXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBVcmxlbmNvZGVkIGJvZHlcbiAgICAgIHNlcnZlci5hcHAudXNlKFxuICAgICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMuYm9keUxpbWl0LFxuICAgICAgICAgIGluZmxhdGU6IHRoaXMub3B0aW9ucy5pbmZsYXRlLFxuICAgICAgICAgIGV4dGVuZGVkOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtdWx0ZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMubXVsdGVyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogTXVsdGVyXCIpO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMub3B0aW9ucy5tdWx0ZXIgYXMgYW55O1xuICAgICAgY29uc3QgbXVsdGVyID0gTXVsdGVyKG9wdHMpO1xuXG4gICAgICBpZiAob3B0cy5zaW5nbGUpIHtcbiAgICAgICAgLy8gU2luZ2xlIGZpbGUgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLnNpbmdsZShvcHRzLnNpbmdsZSkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmFycmF5KSB7XG4gICAgICAgIC8vIEFycmF5IGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5hcnJheShvcHRzLmFycmF5Lm5hbWUsIG9wdHMuYXJyYXkubWF4Q291bnQpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5maWVsZHMpIHtcbiAgICAgICAgLy8gTXVsdGlwbGUgZmllbGRzXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5maWVsZHMob3B0cy5maWVsZHMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERlZmF1bHRzIHRvIHNpbmdsZSBcImZpbGVcIiBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuc2luZ2xlKFwiZmlsZVwiKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJlcGFyZSBib2R5IHBhcnNlclxuICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIudGV4dCgpKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgc2VydmVyLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuICAgIC8vIE9ubHkgZW5hYmxlIGNvb2tpZSBwYXJzZXIgaWYgYSBzZWNyZXQgd2FzIHNldFxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VjcmV0KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENvb2tpZVBhcnNlclwiKTtcbiAgICAgIH1cbiAgICAgIHNlcnZlci5hcHAudXNlKGNvb2tpZVBhcnNlcih0aGlzLm9wdGlvbnMuc2VjcmV0KSk7XG4gICAgfVxuXG4gICAgLy8gVXRpbGl0YXJ5IG1pZGRsZXdhcmVzIGZvciByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICAgc2VydmVyLmFwcC51c2UobGVnYWN5UGFyYW1zKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShyZXNwb25zZUJpbmRlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==