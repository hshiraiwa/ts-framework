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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlHO0FBZXpHLE1BQXFCLGdCQUFnQjtJQUluQyxZQUFtQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixZQUFZO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1osVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO2FBQzlCLENBQUMsQ0FDSCxDQUFDO1lBRUYsa0JBQWtCO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNaLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Z0JBQzdCLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUNILENBQUM7U0FDSDtRQUVELDJCQUEyQjtRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDNUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFhLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixvQkFBb0I7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixjQUFjO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsa0JBQWtCO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLGtDQUFrQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFFRCxzQkFBc0I7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUVqQyxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQzthQUNuRTtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxtREFBbUQ7UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQVksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFakIsU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUF6RUQsbUNBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTXVsdGVyIGZyb20gXCJtdWx0ZXJcIjtcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gXCJtZXRob2Qtb3ZlcnJpZGVcIjtcbmltcG9ydCB7IGxlZ2FjeVBhcmFtcywgcmVzcG9uc2VCaW5kZXIgfSBmcm9tIFwiLi9taWRkbGV3YXJlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnQsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudE9wdGlvbnMsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBTZXJ2ZXIgZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RDb21wb25lbnRPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50T3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBib2R5TGltaXQ/OiBzdHJpbmc7XG4gIHNlY3JldD86IHN0cmluZztcbiAgbXVsdGVyPzoge1xuICAgIHNpbmdsZT86IHN0cmluZztcbiAgICBhcnJheT86IHsgbmFtZTogc3RyaW5nOyBtYXhDb3VudDogbnVtYmVyIH07XG4gICAgZmllbGRzPzogeyBuYW1lOiBzdHJpbmc7IG1heENvdW50OiBudW1iZXIgfVtdO1xuICAgIG9wdGlvbnM/OiBNdWx0ZXIuT3B0aW9ucztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlJlcXVlc3RDb21wb25lbnRcIiB9O1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpIHtcbiAgICAvLyBQcmVwYXJlIGJvZHkgc2l6ZSBsaW1pdFxuICAgIGlmICh0aGlzLm9wdGlvbnMuYm9keUxpbWl0KSB7XG4gICAgICAvLyBKU09OIGJvZHlcbiAgICAgIHNlcnZlci5hcHAudXNlKFxuICAgICAgICBib2R5UGFyc2VyLmpzb24oe1xuICAgICAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMuYm9keUxpbWl0XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBVcmxlbmNvZGVkIGJvZHlcbiAgICAgIHNlcnZlci5hcHAudXNlKFxuICAgICAgICBib2R5UGFyc2VyLnVybGVuY29kZWQoe1xuICAgICAgICAgIGxpbWl0OiB0aGlzLm9wdGlvbnMuYm9keUxpbWl0LFxuICAgICAgICAgIGV4dGVuZGVkOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtdWx0ZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLm9wdGlvbnMubXVsdGVyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogTXVsdGVyXCIpO1xuICAgICAgY29uc3Qgb3B0cyA9IHRoaXMub3B0aW9ucy5tdWx0ZXIgYXMgYW55O1xuICAgICAgY29uc3QgbXVsdGVyID0gTXVsdGVyKG9wdHMpO1xuXG4gICAgICBpZiAob3B0cy5zaW5nbGUpIHtcbiAgICAgICAgLy8gU2luZ2xlIGZpbGUgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLnNpbmdsZShvcHRzLnNpbmdsZSkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmFycmF5KSB7XG4gICAgICAgIC8vIEFycmF5IGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5hcnJheShvcHRzLmFycmF5Lm5hbWUsIG9wdHMuYXJyYXkubWF4Q291bnQpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5maWVsZHMpIHtcbiAgICAgICAgLy8gTXVsdGlwbGUgZmllbGRzXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5maWVsZHMob3B0cy5maWVsZHMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIERlZmF1bHRzIHRvIHNpbmdsZSBcImZpbGVcIiBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuc2luZ2xlKFwiZmlsZVwiKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJlcGFyZSBib2R5IHBhcnNlclxuICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuICAgIHNlcnZlci5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuXG4gICAgLy8gT25seSBlbmFibGUgY29va2llIHBhcnNlciBpZiBhIHNlY3JldCB3YXMgc2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWNyZXQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5zaWxseShcIkluaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogQ29va2llUGFyc2VyXCIpO1xuICAgICAgfVxuICAgICAgc2VydmVyLmFwcC51c2UoY29va2llUGFyc2VyKHRoaXMub3B0aW9ucy5zZWNyZXQpKTtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXRhcnkgbWlkZGxld2FyZXMgZm9yIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICBzZXJ2ZXIuYXBwLnVzZShsZWdhY3lQYXJhbXMpO1xuICAgIHNlcnZlci5hcHAudXNlKHJlc3BvbnNlQmluZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7fVxuXG4gIHB1YmxpYyBvblVubW91bnQoKSB7fVxufVxuIl19