"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        super(Object.assign(Object.assign({}, options), { name: options.name || Package.name, help: options.help || fs_extra_1.readFileSync(path.join(__dirname, "../../raw/repl.help.txt"), "utf-8") }));
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
        return Object.assign(Object.assign({}, ctx), { clear: this.clear.bind(this), help: this.help.bind(this) });
    }
}
exports.default = ReplConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLDZEQUEwRjtBQUUxRix1Q0FBd0M7QUFTeEMsTUFBcUIsV0FBWSxTQUFRLDZCQUFPO0lBSzlDLFlBQVksT0FBMkI7UUFDckMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JELEtBQUssQ0FBQyxnQ0FDRCxPQUFPLEtBQ1YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksRUFDbEMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksdUJBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUMzRSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVsQixPQUFPLENBQUMsTUFBYzs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJO2dCQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSzt3QkFDakMsU0FBUyxFQUFFLElBQUk7d0JBQ2YsU0FBUyxFQUFFLElBQUk7d0JBQ2YsZUFBZSxFQUFFLElBQUk7cUJBQ3RCLENBQUMsQ0FBQztZQUVMLHNCQUFzQjtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsaURBQWlEO1lBQ2pELE9BQU8sSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFTLEVBQUU7b0JBQzlCLE1BQU0sTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTt3QkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDakI7eUJBQU07d0JBQ0wsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVqRCxHQUFHO2dCQUNELGlCQUFpQjtnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQ2hCLGlCQUFpQixDQUFDLE9BQU8sQ0FDN0IsQ0FBQztTQUNIO1FBRUQsMEJBQTBCO1FBQzFCLHVDQUNLLEdBQUcsS0FDTixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFDMUI7SUFDSixDQUFDO0NBQ0Y7QUF4R0QsOEJBd0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcGwgPSByZXF1aXJlKFwicmVwbFwiKTtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgeyBMb2dnZXIsIFNlcnZpY2UsIFNlcnZpY2VPcHRpb25zLCBTZXJ2aWNlRGVzY3JpcHRpb24gfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnMtZXh0cmFcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsQ29uc29sZU9wdGlvbnMgZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7XG4gIHJlcGw/OiByZXBsLlJFUExTZXJ2ZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGV4aXQ/OiBib29sZWFuO1xuICBoZWxwPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBsQ29uc29sZSBleHRlbmRzIFNlcnZpY2Uge1xuICBwdWJsaWMgc2VydmVyPzogU2VydmVyO1xuICBwdWJsaWMgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcbiAgcHVibGljIG9wdGlvbnM6IFJlcGxDb25zb2xlT3B0aW9ucztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXBsQ29uc29sZU9wdGlvbnMpIHtcbiAgICBjb25zdCBsb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuaW5pdGlhbGl6ZSgpO1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBuYW1lOiBvcHRpb25zLm5hbWUgfHwgUGFja2FnZS5uYW1lLFxuICAgICAgaGVscDogb3B0aW9ucy5oZWxwIHx8IHJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL3Jhdy9yZXBsLmhlbHAudHh0XCIpLCBcInV0Zi04XCIpXG4gICAgfSBhcyBTZXJ2aWNlT3B0aW9ucyk7XG4gIH1cblxuICBkZXNjcmliZSgpOiBTZXJ2aWNlRGVzY3JpcHRpb24ge1xuICAgIHJldHVybiB7IG5hbWU6IHRoaXMub3B0aW9ucy5uYW1lIH07XG4gIH1cblxuICBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBhc3luYyBvblJlYWR5KHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICAvLyBTdGFydCB0aGUgcmVwbCBzZXJ2ZXJcbiAgICB0aGlzLnJlcGwgPVxuICAgICAgdGhpcy5vcHRpb25zLnJlcGwgfHxcbiAgICAgIHJlcGwuc3RhcnQoe1xuICAgICAgICBwcm9tcHQ6IGAke3RoaXMub3B0aW9ucy5uYW1lfSA+IGAsXG4gICAgICAgIHVzZUNvbG9yczogdHJ1ZSxcbiAgICAgICAgdXNlR2xvYmFsOiB0cnVlLFxuICAgICAgICBpZ25vcmVVbmRlZmluZWQ6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgLy8gQmluZCBzZXJ2ZXIgY29udGV4dFxuICAgIGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuICAgIE9iamVjdC5rZXlzKGN0eCkubWFwKGtleSA9PiB7XG4gICAgICBpZiAoY3R4Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpcy5yZXBsLmNvbnRleHRba2V5XSA9IGN0eFtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQmxvY2sgc2VydmVyIGluaXRpYWxpemF0aW9uIHRoZW4gY2xvc2Ugb24gZXhpdFxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVwbC5vbihcImV4aXRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5leGl0ICE9PSBmYWxzZSkge1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Vbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnJlcGwpIHtcbiAgICAgIHRoaXMucmVwbC5jbG9zZSgpO1xuICAgICAgdGhpcy5yZXBsID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIFJFUEwgY29uc29sZS5cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShcIlxcdTAwMUJbMkpcXHUwMDFCWzA7MGZcIik7XG4gIH1cblxuICAvKipcbiAgICogU2hvd3MgaGVscC5cbiAgICovXG4gIHB1YmxpYyBoZWxwKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVscCkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyh0aGlzLm9wdGlvbnMuaGVscCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFJFUEwgY29udGV4dCBmcm9tIGZyYW1ld29yay5cbiAgICovXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IGFueSB7XG4gICAgbGV0IGN0eCA9IHt9O1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBjb25zdCBzZXJ2ZXJEZXNjcmlwdGlvbiA9IHRoaXMuc2VydmVyLmRlc2NyaWJlKCk7XG5cbiAgICAgIGN0eCA9IHtcbiAgICAgICAgLyogTWFpbiBTZXJ2ZXIgKi9cbiAgICAgICAgc2VydmVyOiB0aGlzLnNlcnZlcixcbiAgICAgICAgLi4uc2VydmVyRGVzY3JpcHRpb24uY29udGV4dFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIHJlcGwgY29udGV4dFxuICAgIHJldHVybiB7XG4gICAgICAuLi5jdHgsXG4gICAgICBjbGVhcjogdGhpcy5jbGVhci5iaW5kKHRoaXMpLFxuICAgICAgaGVscDogdGhpcy5oZWxwLmJpbmQodGhpcylcbiAgICB9O1xuICB9XG59XG4iXX0=