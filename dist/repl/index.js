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
const repl = require("repl");
const path = require("path");
const Package = require("pjson");
const ts_framework_common_1 = require("ts-framework-common");
const fs_extra_1 = require("fs-extra");
class ReplConsole extends ts_framework_common_1.Service {
    constructor(options) {
        const logger = options.logger || ts_framework_common_1.Logger.initialize();
        super(Object.assign({}, options, { name: options.name || Package.name, help: options.help || fs_extra_1.readFileSync(path.join(__dirname, "../../raw/repl.help.txt"), "utf-8") }));
    }
    describe() {
        return { name: this.options.name };
    }
    onMount(server) {
        this.server = server;
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onReady(server) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = server;
            // Start the repl server
            this.repl =
                this.options.repl ||
                    repl.start({
                        prompt: `${this.options.name} > `,
                        useColors: true,
                        useGlobal: true,
                        ignoreUndefined: true
                    });
            // Bind server context
            const ctx = this.getContext();
            Object.keys(ctx).map(key => {
                if (ctx.hasOwnProperty(key)) {
                    this.repl.context[key] = ctx[key];
                }
            });
            // Block server initialization then close on exit
            return new Promise(resolve => {
                this.repl.on("exit", () => __awaiter(this, void 0, void 0, function* () {
                    yield server.close();
                    if (this.options.exit !== false) {
                        process.exit(0);
                    }
                    else {
                        resolve();
                    }
                }));
            });
        });
    }
    onUnmount() {
        if (this.repl) {
            this.repl.close();
            this.repl = undefined;
        }
    }
    /**
     * Clears the REPL console.
     */
    clear() {
        process.stdout.write("\u001B[2J\u001B[0;0f");
    }
    /**
     * Shows help.
     */
    help() {
        if (this.options.help) {
            this.logger.info(this.options.help);
        }
    }
    /**
     * Gets the REPL context from framework.
     */
    getContext() {
        let ctx = {};
        if (this.server) {
            const serverDescription = this.server.describe();
            ctx = Object.assign({ 
                /* Main Server */
                server: this.server }, serverDescription.context);
        }
        // Return the repl context
        return Object.assign({}, ctx, { clear: this.clear.bind(this), help: this.help.bind(this) });
    }
}
exports.default = ReplConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBQzlCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsNkRBQTBGO0FBRTFGLHVDQUF3QztBQVN4QyxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFLOUMsWUFBWSxPQUEyQjtRQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsS0FBSyxDQUFDLGtCQUNELE9BQU8sSUFDVixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxFQUNsQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSx1QkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQzNFLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWxCLE9BQU8sQ0FBQyxNQUFjOztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUVyQix3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLElBQUk7Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLO3dCQUNqQyxTQUFTLEVBQUUsSUFBSTt3QkFDZixTQUFTLEVBQUUsSUFBSTt3QkFDZixlQUFlLEVBQUUsSUFBSTtxQkFDdEIsQ0FBQyxDQUFDO1lBRUwsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpREFBaUQ7WUFDakQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQVMsRUFBRTtvQkFDOUIsTUFBTSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO3dCQUMvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqQjt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsQ0FBQztxQkFDWDtnQkFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVO1FBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWpELEdBQUc7Z0JBQ0QsaUJBQWlCO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFDaEIsaUJBQWlCLENBQUMsT0FBTyxDQUM3QixDQUFDO1NBQ0g7UUFFRCwwQkFBMEI7UUFDMUIseUJBQ0ssR0FBRyxJQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUMxQjtJQUNKLENBQUM7Q0FDRjtBQXhHRCw4QkF3R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVwbCA9IHJlcXVpcmUoXCJyZXBsXCIpO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IExvZ2dlciwgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmcy1leHRyYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxDb25zb2xlT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHtcbiAgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgZXhpdD86IGJvb2xlYW47XG4gIGhlbHA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcGxDb25zb2xlIGV4dGVuZHMgU2VydmljZSB7XG4gIHB1YmxpYyBzZXJ2ZXI/OiBTZXJ2ZXI7XG4gIHB1YmxpYyByZXBsPzogcmVwbC5SRVBMU2VydmVyO1xuICBwdWJsaWMgb3B0aW9uczogUmVwbENvbnNvbGVPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGxDb25zb2xlT3B0aW9ucykge1xuICAgIGNvbnN0IGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5pbml0aWFsaXplKCk7XG4gICAgc3VwZXIoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSB8fCBQYWNrYWdlLm5hbWUsXG4gICAgICBoZWxwOiBvcHRpb25zLmhlbHAgfHwgcmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vcmF3L3JlcGwuaGVscC50eHRcIiksIFwidXRmLThcIilcbiAgICB9IGFzIFNlcnZpY2VPcHRpb25zKTtcbiAgfVxuXG4gIGRlc2NyaWJlKCk6IFNlcnZpY2VEZXNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHsgbmFtZTogdGhpcy5vcHRpb25zLm5hbWUgfTtcbiAgfVxuXG4gIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKSB7fVxuXG4gIGFzeW5jIG9uUmVhZHkoc2VydmVyOiBTZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcblxuICAgIC8vIFN0YXJ0IHRoZSByZXBsIHNlcnZlclxuICAgIHRoaXMucmVwbCA9XG4gICAgICB0aGlzLm9wdGlvbnMucmVwbCB8fFxuICAgICAgcmVwbC5zdGFydCh7XG4gICAgICAgIHByb21wdDogYCR7dGhpcy5vcHRpb25zLm5hbWV9ID4gYCxcbiAgICAgICAgdXNlQ29sb3JzOiB0cnVlLFxuICAgICAgICB1c2VHbG9iYWw6IHRydWUsXG4gICAgICAgIGlnbm9yZVVuZGVmaW5lZDogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAvLyBCaW5kIHNlcnZlciBjb250ZXh0XG4gICAgY29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XG4gICAgT2JqZWN0LmtleXMoY3R4KS5tYXAoa2V5ID0+IHtcbiAgICAgIGlmIChjdHguaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzLnJlcGwuY29udGV4dFtrZXldID0gY3R4W2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBCbG9jayBzZXJ2ZXIgaW5pdGlhbGl6YXRpb24gdGhlbiBjbG9zZSBvbiBleGl0XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5yZXBsLm9uKFwiZXhpdFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHNlcnZlci5jbG9zZSgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmV4aXQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvblVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucmVwbCkge1xuICAgICAgdGhpcy5yZXBsLmNsb3NlKCk7XG4gICAgICB0aGlzLnJlcGwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgUkVQTCBjb25zb2xlLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFx1MDAxQlsySlxcdTAwMUJbMDswZlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBoZWxwLlxuICAgKi9cbiAgcHVibGljIGhlbHAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWxwKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMub3B0aW9ucy5oZWxwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUkVQTCBjb250ZXh0IGZyb20gZnJhbWV3b3JrLlxuICAgKi9cbiAgcHVibGljIGdldENvbnRleHQoKTogYW55IHtcbiAgICBsZXQgY3R4ID0ge307XG5cbiAgICBpZiAodGhpcy5zZXJ2ZXIpIHtcbiAgICAgIGNvbnN0IHNlcnZlckRlc2NyaXB0aW9uID0gdGhpcy5zZXJ2ZXIuZGVzY3JpYmUoKTtcblxuICAgICAgY3R4ID0ge1xuICAgICAgICAvKiBNYWluIFNlcnZlciAqL1xuICAgICAgICBzZXJ2ZXI6IHRoaXMuc2VydmVyLFxuICAgICAgICAuLi5zZXJ2ZXJEZXNjcmlwdGlvbi5jb250ZXh0XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgcmVwbCBjb250ZXh0XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmN0eCxcbiAgICAgIGNsZWFyOiB0aGlzLmNsZWFyLmJpbmQodGhpcyksXG4gICAgICBoZWxwOiB0aGlzLmhlbHAuYmluZCh0aGlzKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==