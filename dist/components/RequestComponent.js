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
        return { name: 'RequestMiddleware' };
    }
    onMount(server) {
        // Prepare body size limit
        if (this.options.bodyLimit) {
            server.app.use(bodyParser({ limit: this.options.bodyLimit }));
        }
        // Handle multer middleware
        if (this.options.multer) {
            this.logger.info('Initializing server middleware: Multer');
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
                server.app.use(multer.single('file'));
            }
        }
        // Prepare body parser
        server.app.use(bodyParser.json());
        server.app.use(bodyParser.urlencoded({ extended: false }));
        server.app.use(methodOverride());
        // Only enable cookie parser if a secret was set
        if (this.options.secret) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: CookieParser');
            }
            server.app.use(cookieParser(this.options.secret));
        }
        // Utilitary middlewares for requests and responses
        server.app.use(middlewares_1.legacyParams);
        server.app.use(middlewares_1.responseBinder);
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onUnmount() {
    }
}
exports.default = RequestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1JlcXVlc3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCwrQ0FBNkQ7QUFDN0QsNkRBQXlGO0FBZXpGLE1BQXFCLGdCQUFnQjtJQUluQyxZQUFtQixVQUFtQyxFQUFFO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYztRQUMzQiwwQkFBMEI7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBYSxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2Ysb0JBQW9CO2dCQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDckIsY0FBYztnQkFDZCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwRTtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLGtCQUFrQjtnQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxrQ0FBa0M7Z0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFFakMsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7YUFDbEU7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsbURBQW1EO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFZLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBYyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVZLE1BQU07O1FBRW5CLENBQUM7S0FBQTtJQUVNLFNBQVM7SUFFaEIsQ0FBQztDQUNGO0FBaEVELG1DQWdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE11bHRlciBmcm9tICdtdWx0ZXInO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0IHsgbGVnYWN5UGFyYW1zLCByZXNwb25zZUJpbmRlciB9IGZyb20gJy4vbWlkZGxld2FyZXMnO1xuaW1wb3J0IHsgTG9nZ2VyLCBDb21wb25lbnQsIENvbXBvbmVudFR5cGUsIENvbXBvbmVudE9wdGlvbnMgfSBmcm9tICd0cy1mcmFtZXdvcmstY29tbW9uJztcbmltcG9ydCBTZXJ2ZXIgZnJvbSAnLi4vc2VydmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXI7XG4gIGJvZHlMaW1pdD86IHN0cmluZztcbiAgc2VjcmV0Pzogc3RyaW5nO1xuICBtdWx0ZXI/OiB7XG4gICAgc2luZ2xlPzogc3RyaW5nO1xuICAgIGFycmF5PzogeyBuYW1lOiBzdHJpbmcsIG1heENvdW50OiBudW1iZXIgfTtcbiAgICBmaWVsZHM/OiB7IG5hbWU6IHN0cmluZywgbWF4Q291bnQ6IG51bWJlciB9W107XG4gICAgb3B0aW9ucz86IE11bHRlci5PcHRpb25zO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXF1ZXN0Q29tcG9uZW50IGltcGxlbWVudHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHR5cGU6IENvbXBvbmVudFR5cGUuTUlERExFV0FSRTtcbiAgcHJvdGVjdGVkIGxvZ2dlcjogTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXNjcmliZSgpIHtcbiAgICByZXR1cm4geyBuYW1lOiAnUmVxdWVzdE1pZGRsZXdhcmUnIH07XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcikge1xuICAgIC8vIFByZXBhcmUgYm9keSBzaXplIGxpbWl0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5ib2R5TGltaXQpIHtcbiAgICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIoeyBsaW1pdDogdGhpcy5vcHRpb25zLmJvZHlMaW1pdCB9KSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG11bHRlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tdWx0ZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogTXVsdGVyJyk7XG4gICAgICBjb25zdCBvcHRzID0gdGhpcy5vcHRpb25zLm11bHRlciBhcyBhbnk7XG4gICAgICBjb25zdCBtdWx0ZXIgPSBNdWx0ZXIob3B0cyk7XG5cbiAgICAgIGlmIChvcHRzLnNpbmdsZSkge1xuICAgICAgICAvLyBTaW5nbGUgZmlsZSBmaWVsZFxuICAgICAgICBzZXJ2ZXIuYXBwLnVzZShtdWx0ZXIuc2luZ2xlKG9wdHMuc2luZ2xlKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuYXJyYXkpIHtcbiAgICAgICAgLy8gQXJyYXkgZmllbGRcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLmFycmF5KG9wdHMuYXJyYXkubmFtZSwgb3B0cy5hcnJheS5tYXhDb3VudCkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmZpZWxkcykge1xuICAgICAgICAvLyBNdWx0aXBsZSBmaWVsZHNcbiAgICAgICAgc2VydmVyLmFwcC51c2UobXVsdGVyLmZpZWxkcyhvcHRzLmZpZWxkcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRGVmYXVsdHMgdG8gc2luZ2xlIFwiZmlsZVwiIGZpZWxkXG4gICAgICAgIHNlcnZlci5hcHAudXNlKG11bHRlci5zaW5nbGUoJ2ZpbGUnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJlcGFyZSBib2R5IHBhcnNlclxuICAgIHNlcnZlci5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICBzZXJ2ZXIuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuICAgIHNlcnZlci5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuXG4gICAgLy8gT25seSBlbmFibGUgY29va2llIHBhcnNlciBpZiBhIHNlY3JldCB3YXMgc2V0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWNyZXQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENvb2tpZVBhcnNlcicpO1xuICAgICAgfVxuICAgICAgc2VydmVyLmFwcC51c2UoY29va2llUGFyc2VyKHRoaXMub3B0aW9ucy5zZWNyZXQpKTtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXRhcnkgbWlkZGxld2FyZXMgZm9yIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICBzZXJ2ZXIuYXBwLnVzZShsZWdhY3lQYXJhbXMpO1xuICAgIHNlcnZlci5hcHAudXNlKHJlc3BvbnNlQmluZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7XG5cbiAgfVxuXG4gIHB1YmxpYyBvblVubW91bnQoKSB7XG5cbiAgfVxufVxuIl19