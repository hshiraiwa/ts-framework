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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlGO0FBZXpGLE1BQXFCLGdCQUFnQjtJQUluQyxZQUFtQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixZQUFZO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1osVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO2FBQzlCLENBQUMsQ0FDSCxDQUFDO1lBRUYsa0JBQWtCO1lBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNaLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Z0JBQzdCLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUNILENBQUM7U0FDSDtRQUVELDJCQUEyQjtRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDNUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFhLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixvQkFBb0I7Z0JBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixjQUFjO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsa0JBQWtCO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLGtDQUFrQztnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7UUFFRCxzQkFBc0I7UUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUVqQyxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQzthQUNuRTtZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxtREFBbUQ7UUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQVksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFakIsU0FBUyxLQUFJLENBQUM7Q0FDdEI7QUF6RUQsbUNBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTXVsdGVyIGZyb20gXCJtdWx0ZXJcIjtcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSBcImNvb2tpZS1wYXJzZXJcIjtcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gXCJtZXRob2Qtb3ZlcnJpZGVcIjtcbmltcG9ydCB7IGxlZ2FjeVBhcmFtcywgcmVzcG9uc2VCaW5kZXIgfSBmcm9tIFwiLi9taWRkbGV3YXJlc1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnQsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudE9wdGlvbnMgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdENvbXBvbmVudE9wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VyO1xuICBib2R5TGltaXQ/OiBzdHJpbmc7XG4gIHNlY3JldD86IHN0cmluZztcbiAgbXVsdGVyPzoge1xuICAgIHNpbmdsZT86IHN0cmluZztcbiAgICBhcnJheT86IHsgbmFtZTogc3RyaW5nOyBtYXhDb3VudDogbnVtYmVyIH07XG4gICAgZmllbGRzPzogeyBuYW1lOiBzdHJpbmc7IG1heENvdW50OiBudW1iZXIgfVtdO1xuICAgIG9wdGlvbnM/OiBNdWx0ZXIuT3B0aW9ucztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVxdWVzdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyB0eXBlOiBDb21wb25lbnRUeXBlLk1JRERMRVdBUkU7XG4gIHByb3RlY3RlZCBsb2dnZXI6IExvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVxdWVzdENvbXBvbmVudE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgZGVzY3JpYmUoKSB7XG4gICAgcmV0dXJuIHsgbmFtZTogXCJSZXF1ZXN0Q29tcG9uZW50XCIgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KHNlcnZlcjogU2VydmVyKSB7XG4gICAgLy8gUHJlcGFyZSBib2R5IHNpemUgbGltaXRcbiAgICBpZiAodGhpcy5vcHRpb25zLmJvZHlMaW1pdCkge1xuICAgICAgLy8gSlNPTiBib2R5XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShcbiAgICAgICAgYm9keVBhcnNlci5qc29uKHtcbiAgICAgICAgICBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdFxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgLy8gVXJsZW5jb2RlZCBib2R5XG4gICAgICBzZXJ2ZXIuYXBwLnVzZShcbiAgICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgICBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdCxcbiAgICAgICAgICBleHRlbmRlZDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbXVsdGVyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5vcHRpb25zLm11bHRlcikge1xuICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE11bHRlclwiKTtcbiAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLm9wdGlvbnMubXVsdGVyIGFzIGFueTtcbiAgICAgIGNvbnN0IG11bHRlciA9IE11bHRlcihvcHRzKTtcblxuICAgICAgaWYgKG9wdHMuc2luZ2xlKSB7XG4gICAgICAgIC8vIFNpbmdsZSBmaWxlIGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5zaW5nbGUob3B0cy5zaW5nbGUpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5hcnJheSkge1xuICAgICAgICAvLyBBcnJheSBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuYXJyYXkob3B0cy5hcnJheS5uYW1lLCBvcHRzLmFycmF5Lm1heENvdW50KSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZmllbGRzKSB7XG4gICAgICAgIC8vIE11bHRpcGxlIGZpZWxkc1xuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuZmllbGRzKG9wdHMuZmllbGRzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEZWZhdWx0cyB0byBzaW5nbGUgXCJmaWxlXCIgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLnNpbmdsZShcImZpbGVcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByZXBhcmUgYm9keSBwYXJzZXJcbiAgICBzZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgc2VydmVyLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuICAgIC8vIE9ubHkgZW5hYmxlIGNvb2tpZSBwYXJzZXIgaWYgYSBzZWNyZXQgd2FzIHNldFxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VjcmV0KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoXCJJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENvb2tpZVBhcnNlclwiKTtcbiAgICAgIH1cbiAgICAgIHNlcnZlci5hcHAudXNlKGNvb2tpZVBhcnNlcih0aGlzLm9wdGlvbnMuc2VjcmV0KSk7XG4gICAgfVxuXG4gICAgLy8gVXRpbGl0YXJ5IG1pZGRsZXdhcmVzIGZvciByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICAgc2VydmVyLmFwcC51c2UobGVnYWN5UGFyYW1zKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShyZXNwb25zZUJpbmRlcik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBwdWJsaWMgb25Vbm1vdW50KCkge31cbn1cbiJdfQ==