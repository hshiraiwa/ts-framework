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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBQzlCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBRWxGLHVDQUF3QztBQVN4QyxNQUFxQixXQUFZLFNBQVEsNkJBQU87SUFLOUMsWUFBWSxPQUEyQjtRQUNyQyxLQUFLLENBQUMsa0JBQ0QsT0FBTyxJQUNWLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQ2xDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLHVCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUseUJBQXlCLENBQUMsRUFBRSxPQUFPLENBQUMsR0FDM0UsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRVksTUFBTTs4REFBSSxDQUFDO0tBQUE7SUFFbEIsT0FBTyxDQUFDLE1BQWM7O1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBRXJCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsSUFBSTtnQkFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ1QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUs7d0JBQ2pDLFNBQVMsRUFBRSxJQUFJO3dCQUNmLFNBQVMsRUFBRSxJQUFJO3dCQUNmLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLENBQUM7WUFFTCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlEQUFpRDtZQUNqRCxPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO29CQUM5QixNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNULElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakQsR0FBRztnQkFDRCxpQkFBaUI7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixpQkFBaUIsQ0FBQyxPQUFPLENBQzdCLENBQUM7U0FDSDtRQUVELDBCQUEwQjtRQUMxQix5QkFDSyxHQUFHLElBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQzFCO0lBQ0osQ0FBQztDQUNGO0FBdkdELDhCQXVHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmcy1leHRyYVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxDb25zb2xlT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHtcbiAgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgZXhpdD86IGJvb2xlYW47XG4gIGhlbHA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcGxDb25zb2xlIGV4dGVuZHMgU2VydmljZSB7XG4gIHB1YmxpYyBzZXJ2ZXI/OiBTZXJ2ZXI7XG4gIHB1YmxpYyByZXBsPzogcmVwbC5SRVBMU2VydmVyO1xuICBwdWJsaWMgb3B0aW9uczogUmVwbENvbnNvbGVPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcGxDb25zb2xlT3B0aW9ucykge1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUgfHwgUGFja2FnZS5uYW1lLFxuICAgICAgaGVscDogb3B0aW9ucy5oZWxwIHx8IHJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL3Jhdy9yZXBsLmhlbHAudHh0XCIpLCBcInV0Zi04XCIpXG4gICAgfSBhcyBTZXJ2aWNlT3B0aW9ucyk7XG4gIH1cblxuICBkZXNjcmliZSgpOiBTZXJ2aWNlRGVzY3JpcHRpb24ge1xuICAgIHJldHVybiB7IG5hbWU6IHRoaXMub3B0aW9ucy5uYW1lIH07XG4gIH1cblxuICBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBhc3luYyBvblJlYWR5KHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICAvLyBTdGFydCB0aGUgcmVwbCBzZXJ2ZXJcbiAgICB0aGlzLnJlcGwgPVxuICAgICAgdGhpcy5vcHRpb25zLnJlcGwgfHxcbiAgICAgIHJlcGwuc3RhcnQoe1xuICAgICAgICBwcm9tcHQ6IGAke3RoaXMub3B0aW9ucy5uYW1lfSA+IGAsXG4gICAgICAgIHVzZUNvbG9yczogdHJ1ZSxcbiAgICAgICAgdXNlR2xvYmFsOiB0cnVlLFxuICAgICAgICBpZ25vcmVVbmRlZmluZWQ6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgLy8gQmluZCBzZXJ2ZXIgY29udGV4dFxuICAgIGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuICAgIE9iamVjdC5rZXlzKGN0eCkubWFwKGtleSA9PiB7XG4gICAgICBpZiAoY3R4Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpcy5yZXBsLmNvbnRleHRba2V5XSA9IGN0eFtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQmxvY2sgc2VydmVyIGluaXRpYWxpemF0aW9uIHRoZW4gY2xvc2Ugb24gZXhpdFxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVwbC5vbihcImV4aXRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5leGl0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Vbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnJlcGwpIHtcbiAgICAgIHRoaXMucmVwbC5jbG9zZSgpO1xuICAgICAgdGhpcy5yZXBsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIFJFUEwgY29uc29sZS5cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShcIlxcdTAwMUJbMkpcXHUwMDFCWzA7MGZcIik7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgaGVscC5cbiAgICovXG4gIHB1YmxpYyBoZWxwKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVscCkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyh0aGlzLm9wdGlvbnMuaGVscCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFJFUEwgY29udGV4dCBmcm9tIGZyYW1ld29yay5cbiAgICovXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IGFueSB7XG4gICAgbGV0IGN0eCA9IHt9O1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBjb25zdCBzZXJ2ZXJEZXNjcmlwdGlvbiA9IHRoaXMuc2VydmVyLmRlc2NyaWJlKCk7XG5cbiAgICAgIGN0eCA9IHtcbiAgICAgICAgLyogTWFpbiBTZXJ2ZXIgKi9cbiAgICAgICAgc2VydmVyOiB0aGlzLnNlcnZlcixcbiAgICAgICAgLi4uc2VydmVyRGVzY3JpcHRpb24uY29udGV4dFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIHJlcGwgY29udGV4dFxuICAgIHJldHVybiB7XG4gICAgICAuLi5jdHgsXG4gICAgICBjbGVhcjogdGhpcy5jbGVhci5iaW5kKHRoaXMpLFxuICAgICAgaGVscDogdGhpcy5oZWxwLmJpbmQodGhpcylcbiAgICB9O1xuICB9XG59XG4iXX0=