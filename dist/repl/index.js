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
        super(Object.assign({}, options, { name: options.name || Package.name, help: options.help || fs_extra_1.readFileSync(path.join(__dirname, "../../raw/help.txt"), "utf-8") }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBRTlCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBRWxGLHVDQUF3QztBQVN4QyxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFLOUMsWUFBWSxPQUEyQjtRQUNyQyxLQUFLLENBQUMsa0JBQ0QsT0FBTyxJQUNWLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQ2xDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLHVCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsRUFBRSxPQUFPLENBQUMsR0FDdEUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFbEIsT0FBTyxDQUFDLE1BQWM7O1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRXJCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsSUFBSTtnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ1QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUs7d0JBQ2pDLFNBQVMsRUFBRSxJQUFJO3dCQUNmLFNBQVMsRUFBRSxJQUFJO3dCQUNmLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLENBQUM7WUFFTCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlEQUFpRDtZQUNqRCxPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO29CQUM5QixNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakQsR0FBRztnQkFDRCxpQkFBaUI7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixpQkFBaUIsQ0FBQyxPQUFPLENBQzdCLENBQUM7U0FDSDtRQUVELDBCQUEwQjtRQUMxQix5QkFDSyxHQUFHLElBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQzFCO0lBQ0osQ0FBQztDQUNGO0FBdkdELDhCQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmcy1leHRyYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxDb25zb2xlT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHtcbiAgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgZXhpdD86IGJvb2xlYW47XG4gIGhlbHA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcGxDb25zb2xlIGV4dGVuZHMgU2VydmljZSB7XG4gIHB1YmxpYyBzZXJ2ZXI/OiBTZXJ2ZXI7XG4gIHB1YmxpYyByZXBsPzogcmVwbC5SRVBMU2VydmVyO1xuICBwdWJsaWMgb3B0aW9uczogUmVwbENvbnNvbGVPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGxDb25zb2xlT3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUgfHwgUGFja2FnZS5uYW1lLFxuICAgICAgaGVscDogb3B0aW9ucy5oZWxwIHx8IHJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL3Jhdy9oZWxwLnR4dFwiKSwgXCJ1dGYtOFwiKVxuICAgIH0gYXMgU2VydmljZU9wdGlvbnMpO1xuICB9XG5cbiAgZGVzY3JpYmUoKTogU2VydmljZURlc2NyaXB0aW9uIHtcbiAgICByZXR1cm4geyBuYW1lOiB0aGlzLm9wdGlvbnMubmFtZSB9O1xuICB9XG5cbiAgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHt9XG5cbiAgYXN5bmMgb25SZWFkeShzZXJ2ZXI6IFNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuXG4gICAgLy8gU3RhcnQgdGhlIHJlcGwgc2VydmVyXG4gICAgdGhpcy5yZXBsID1cbiAgICAgIHRoaXMub3B0aW9ucy5yZXBsIHx8XG4gICAgICByZXBsLnN0YXJ0KHtcbiAgICAgICAgcHJvbXB0OiBgJHt0aGlzLm9wdGlvbnMubmFtZX0gPiBgLFxuICAgICAgICB1c2VDb2xvcnM6IHRydWUsXG4gICAgICAgIHVzZUdsb2JhbDogdHJ1ZSxcbiAgICAgICAgaWdub3JlVW5kZWZpbmVkOiB0cnVlXG4gICAgICB9KTtcblxuICAgIC8vIEJpbmQgc2VydmVyIGNvbnRleHRcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQoKTtcbiAgICBPYmplY3Qua2V5cyhjdHgpLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKGN0eC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXMucmVwbC5jb250ZXh0W2tleV0gPSBjdHhba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEJsb2NrIHNlcnZlciBpbml0aWFsaXphdGlvbiB0aGVuIGNsb3NlIG9uIGV4aXRcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlcGwub24oXCJleGl0XCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXhpdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5yZXBsKSB7XG4gICAgICB0aGlzLnJlcGwuY2xvc2UoKTtcbiAgICAgIHRoaXMucmVwbCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBSRVBMIGNvbnNvbGUuXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHUwMDFCWzJKXFx1MDAxQlswOzBmXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3dzIGhlbHAuXG4gICAqL1xuICBwdWJsaWMgaGVscCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlbHApIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5vcHRpb25zLmhlbHApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBSRVBMIGNvbnRleHQgZnJvbSBmcmFtZXdvcmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBhbnkge1xuICAgIGxldCBjdHggPSB7fTtcblxuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgY29uc3Qgc2VydmVyRGVzY3JpcHRpb24gPSB0aGlzLnNlcnZlci5kZXNjcmliZSgpO1xuXG4gICAgICBjdHggPSB7XG4gICAgICAgIC8qIE1haW4gU2VydmVyICovXG4gICAgICAgIHNlcnZlcjogdGhpcy5zZXJ2ZXIsXG4gICAgICAgIC4uLnNlcnZlckRlc2NyaXB0aW9uLmNvbnRleHRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSByZXBsIGNvbnRleHRcbiAgICByZXR1cm4ge1xuICAgICAgLi4uY3R4LFxuICAgICAgY2xlYXI6IHRoaXMuY2xlYXIuYmluZCh0aGlzKSxcbiAgICAgIGhlbHA6IHRoaXMuaGVscC5iaW5kKHRoaXMpXG4gICAgfTtcbiAgfVxufVxuIl19