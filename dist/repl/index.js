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
        super(Object.assign({}, options, { name: options.name || Package.name, help: options.help || fs_extra_1.readFileSync(path.join(__dirname, '../../raw/help.txt'), 'utf-8') }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBRTlCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBRWxGLHVDQUF3QztBQVN4QyxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFLOUMsWUFBWSxPQUEyQjtRQUNyQyxLQUFLLENBQUMsa0JBQ0QsT0FBTyxJQUNWLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQ2xDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLHVCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxPQUFPLENBQUMsR0FDdEUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRVksTUFBTTs4REFBSyxDQUFDO0tBQUE7SUFFbkIsT0FBTyxDQUFDLE1BQWM7O1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRXJCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsSUFBSTtnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ1QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUs7d0JBQ2pDLFNBQVMsRUFBRSxJQUFJO3dCQUNmLFNBQVMsRUFBRSxJQUFJO3dCQUNmLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLENBQUM7WUFFTCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlEQUFpRDtZQUNqRCxPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO29CQUM5QixNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakQsR0FBRztnQkFDRCxpQkFBaUI7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixpQkFBaUIsQ0FBQyxPQUFPLENBQzdCLENBQUM7U0FDSDtRQUVELDBCQUEwQjtRQUMxQix5QkFDSyxHQUFHLElBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQzFCO0lBQ0osQ0FBQztDQUNGO0FBdkdELDhCQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmcy1leHRyYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxDb25zb2xlT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHtcbiAgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgZXhpdD86IGJvb2xlYW47XG4gIGhlbHA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcGxDb25zb2xlIGV4dGVuZHMgU2VydmljZSB7XG4gIHByb3RlY3RlZCBzZXJ2ZXI/OiBTZXJ2ZXI7XG4gIHByb3RlY3RlZCByZXBsPzogcmVwbC5SRVBMU2VydmVyO1xuICBwdWJsaWMgb3B0aW9uczogUmVwbENvbnNvbGVPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGxDb25zb2xlT3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUgfHwgUGFja2FnZS5uYW1lLFxuICAgICAgaGVscDogb3B0aW9ucy5oZWxwIHx8IHJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vcmF3L2hlbHAudHh0JyksICd1dGYtOCcpLFxuICAgIH0gYXMgU2VydmljZU9wdGlvbnMpO1xuICB9XG5cbiAgZGVzY3JpYmUoKTogU2VydmljZURlc2NyaXB0aW9uIHtcbiAgICByZXR1cm4geyBuYW1lOiB0aGlzLm9wdGlvbnMubmFtZSB9O1xuICB9XG5cbiAgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHsgfVxuXG4gIGFzeW5jIG9uUmVhZHkoc2VydmVyOiBTZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcblxuICAgIC8vIFN0YXJ0IHRoZSByZXBsIHNlcnZlclxuICAgIHRoaXMucmVwbCA9XG4gICAgICB0aGlzLm9wdGlvbnMucmVwbCB8fFxuICAgICAgcmVwbC5zdGFydCh7XG4gICAgICAgIHByb21wdDogYCR7dGhpcy5vcHRpb25zLm5hbWV9ID4gYCxcbiAgICAgICAgdXNlQ29sb3JzOiB0cnVlLFxuICAgICAgICB1c2VHbG9iYWw6IHRydWUsXG4gICAgICAgIGlnbm9yZVVuZGVmaW5lZDogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAvLyBCaW5kIHNlcnZlciBjb250ZXh0XG4gICAgY29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XG4gICAgT2JqZWN0LmtleXMoY3R4KS5tYXAoa2V5ID0+IHtcbiAgICAgIGlmIChjdHguaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzLnJlcGwuY29udGV4dFtrZXldID0gY3R4W2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBCbG9jayBzZXJ2ZXIgaW5pdGlhbGl6YXRpb24gdGhlbiBjbG9zZSBvbiBleGl0XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5yZXBsLm9uKFwiZXhpdFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHNlcnZlci5jbG9zZSgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmV4aXQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvblVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucmVwbCkge1xuICAgICAgdGhpcy5yZXBsLmNsb3NlKCk7XG4gICAgICB0aGlzLnJlcGwgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgUkVQTCBjb25zb2xlLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFx1MDAxQlsySlxcdTAwMUJbMDswZlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93cyBoZWxwLlxuICAgKi9cbiAgcHVibGljIGhlbHAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5oZWxwKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMub3B0aW9ucy5oZWxwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUkVQTCBjb250ZXh0IGZyb20gZnJhbWV3b3JrLlxuICAgKi9cbiAgcHVibGljIGdldENvbnRleHQoKTogYW55IHtcbiAgICBsZXQgY3R4ID0ge307XG5cbiAgICBpZiAodGhpcy5zZXJ2ZXIpIHtcbiAgICAgIGNvbnN0IHNlcnZlckRlc2NyaXB0aW9uID0gdGhpcy5zZXJ2ZXIuZGVzY3JpYmUoKTtcblxuICAgICAgY3R4ID0ge1xuICAgICAgICAvKiBNYWluIFNlcnZlciAqL1xuICAgICAgICBzZXJ2ZXI6IHRoaXMuc2VydmVyLFxuICAgICAgICAuLi5zZXJ2ZXJEZXNjcmlwdGlvbi5jb250ZXh0XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgcmVwbCBjb250ZXh0XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmN0eCxcbiAgICAgIGNsZWFyOiB0aGlzLmNsZWFyLmJpbmQodGhpcyksXG4gICAgICBoZWxwOiB0aGlzLmhlbHAuYmluZCh0aGlzKSxcbiAgICB9O1xuICB9XG59XG4iXX0=