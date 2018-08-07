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
const Package = require("pjson");
const ts_framework_common_1 = require("ts-framework-common");
class ReplConsole extends ts_framework_common_1.Service {
    constructor(options) {
        super(options);
        this.options = options;
    }
    describe() {
        return { name: "ReplServer" };
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
                        prompt: `${this.options.name || Package.name} > `,
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
        return Object.assign({}, ctx, { clear: this.clear.bind(this) });
    }
}
exports.default = ReplConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQThCO0FBRTlCLGlDQUFpQztBQUNqQyw2REFBa0Y7QUFTbEYsTUFBcUIsV0FBWSxTQUFRLDZCQUFPO0lBSTlDLFlBQW1CLE9BQTJCO1FBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBRTlDLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVZLE1BQU07OERBQUksQ0FBQztLQUFBO0lBRWxCLE9BQU8sQ0FBQyxNQUFjOztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUVyQix3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLElBQUk7Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUs7d0JBQ2pELFNBQVMsRUFBRSxJQUFJO3dCQUNmLFNBQVMsRUFBRSxJQUFJO3dCQUNmLGVBQWUsRUFBRSxJQUFJO3FCQUN0QixDQUFDLENBQUM7WUFFTCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlEQUFpRDtZQUNqRCxPQUFPLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO29CQUM5QixNQUFNLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVqRCxHQUFHO2dCQUNELGlCQUFpQjtnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQ2hCLGlCQUFpQixDQUFDLE9BQU8sQ0FDN0IsQ0FBQztTQUNIO1FBRUQsMEJBQTBCO1FBQzFCLHlCQUFZLEdBQUcsSUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUc7SUFDbEQsQ0FBQztDQUNGO0FBckZELDhCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsQ29uc29sZU9wdGlvbnMgZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7XG4gIHJlcGw/OiByZXBsLlJFUExTZXJ2ZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGV4aXQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBsQ29uc29sZSBleHRlbmRzIFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgc2VydmVyPzogU2VydmVyO1xuICBwcm90ZWN0ZWQgcmVwbD86IHJlcGwuUkVQTFNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVwbENvbnNvbGVPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBkZXNjcmliZSgpOiBTZXJ2aWNlRGVzY3JpcHRpb24ge1xuICAgIHJldHVybiB7IG5hbWU6IFwiUmVwbFNlcnZlclwiIH07XG4gIH1cblxuICBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBhc3luYyBvblJlYWR5KHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICAvLyBTdGFydCB0aGUgcmVwbCBzZXJ2ZXJcbiAgICB0aGlzLnJlcGwgPVxuICAgICAgdGhpcy5vcHRpb25zLnJlcGwgfHxcbiAgICAgIHJlcGwuc3RhcnQoe1xuICAgICAgICBwcm9tcHQ6IGAke3RoaXMub3B0aW9ucy5uYW1lIHx8IFBhY2thZ2UubmFtZX0gPiBgLFxuICAgICAgICB1c2VDb2xvcnM6IHRydWUsXG4gICAgICAgIHVzZUdsb2JhbDogdHJ1ZSxcbiAgICAgICAgaWdub3JlVW5kZWZpbmVkOiB0cnVlXG4gICAgICB9KTtcblxuICAgIC8vIEJpbmQgc2VydmVyIGNvbnRleHRcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQoKTtcbiAgICBPYmplY3Qua2V5cyhjdHgpLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKGN0eC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXMucmVwbC5jb250ZXh0W2tleV0gPSBjdHhba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEJsb2NrIHNlcnZlciBpbml0aWFsaXphdGlvbiB0aGVuIGNsb3NlIG9uIGV4aXRcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlcGwub24oXCJleGl0XCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXhpdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5yZXBsKSB7XG4gICAgICB0aGlzLnJlcGwuY2xvc2UoKTtcbiAgICAgIHRoaXMucmVwbCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBSRVBMIGNvbnNvbGUuXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHUwMDFCWzJKXFx1MDAxQlswOzBmXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFJFUEwgY29udGV4dCBmcm9tIGZyYW1ld29yay5cbiAgICovXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IGFueSB7XG4gICAgbGV0IGN0eCA9IHt9O1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBjb25zdCBzZXJ2ZXJEZXNjcmlwdGlvbiA9IHRoaXMuc2VydmVyLmRlc2NyaWJlKCk7XG5cbiAgICAgIGN0eCA9IHtcbiAgICAgICAgLyogTWFpbiBTZXJ2ZXIgKi9cbiAgICAgICAgc2VydmVyOiB0aGlzLnNlcnZlcixcbiAgICAgICAgLi4uc2VydmVyRGVzY3JpcHRpb24uY29udGV4dFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIHJlcGwgY29udGV4dFxuICAgIHJldHVybiB7IC4uLmN0eCwgY2xlYXI6IHRoaXMuY2xlYXIuYmluZCh0aGlzKSB9O1xuICB9XG59XG4iXX0=