#!/usr/bin/env node
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
require("source-map-support").install();
require("reflect-metadata");
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
            this.repl = repl.start({
                prompt: `${Package.name} > `,
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
            yield new Promise(resolve => {
                this.repl.on("exit", () => {
                    server.close();
                    process.exit(0);
                });
            });
        });
    }
    onUnmount() {
        if (this.repl) {
            this.repl.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLDZCQUE4QjtBQUU5QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBS2xGLE1BQXFCLFdBQVksU0FBUSw2QkFBTztJQUk5QyxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUU3QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxNQUFNOzhEQUFLLENBQUM7S0FBQTtJQUVuQixPQUFPLENBQUMsTUFBYzs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSztnQkFDNUIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpREFBaUQ7WUFDakQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDeEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakQsR0FBRztnQkFDRCxpQkFBaUI7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixpQkFBaUIsQ0FBQyxPQUFPLENBQzdCLENBQUM7U0FDSDtRQUVELDBCQUEwQjtRQUMxQix5QkFBWSxHQUFHLElBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFHO0lBQ2xELENBQUM7Q0FDRjtBQTlFRCw4QkE4RUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbnJlcXVpcmUoXCJzb3VyY2UtbWFwLXN1cHBvcnRcIikuaW5zdGFsbCgpO1xucmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7XG5cbmltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsU2VydmVyT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHsgfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBsQ29uc29sZSBleHRlbmRzIFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgc2VydmVyPzogU2VydmVyO1xuICBwcm90ZWN0ZWQgcmVwbDogcmVwbC5SRVBMU2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBSZXBsU2VydmVyT3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgZGVzY3JpYmUoKTogU2VydmljZURlc2NyaXB0aW9uIHtcbiAgICByZXR1cm4geyBuYW1lOiBcIlJlcGxTZXJ2ZXJcIiB9O1xuICB9XG5cbiAgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHsgfVxuXG4gIGFzeW5jIG9uUmVhZHkoc2VydmVyOiBTZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcblxuICAgIC8vIFN0YXJ0IHRoZSByZXBsIHNlcnZlclxuICAgIHRoaXMucmVwbCA9IHJlcGwuc3RhcnQoe1xuICAgICAgcHJvbXB0OiBgJHtQYWNrYWdlLm5hbWV9ID4gYCxcbiAgICAgIHVzZUNvbG9yczogdHJ1ZSxcbiAgICAgIHVzZUdsb2JhbDogdHJ1ZSxcbiAgICAgIGlnbm9yZVVuZGVmaW5lZDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgLy8gQmluZCBzZXJ2ZXIgY29udGV4dFxuICAgIGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuICAgIE9iamVjdC5rZXlzKGN0eCkubWFwKGtleSA9PiB7XG4gICAgICBpZiAoY3R4Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpcy5yZXBsLmNvbnRleHRba2V5XSA9IGN0eFtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQmxvY2sgc2VydmVyIGluaXRpYWxpemF0aW9uIHRoZW4gY2xvc2Ugb24gZXhpdFxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5yZXBsLm9uKFwiZXhpdFwiLCAoKSA9PiB7XG4gICAgICAgIHNlcnZlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uVW5tb3VudCgpIHtcbiAgICBpZiAodGhpcy5yZXBsKSB7XG4gICAgICB0aGlzLnJlcGwuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBSRVBMIGNvbnNvbGUuXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHUwMDFCWzJKXFx1MDAxQlswOzBmXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFJFUEwgY29udGV4dCBmcm9tIGZyYW1ld29yay5cbiAgICovXG4gIHB1YmxpYyBnZXRDb250ZXh0KCk6IGFueSB7XG4gICAgbGV0IGN0eCA9IHt9O1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBjb25zdCBzZXJ2ZXJEZXNjcmlwdGlvbiA9IHRoaXMuc2VydmVyLmRlc2NyaWJlKCk7XG5cbiAgICAgIGN0eCA9IHtcbiAgICAgICAgLyogTWFpbiBTZXJ2ZXIgKi9cbiAgICAgICAgc2VydmVyOiB0aGlzLnNlcnZlcixcbiAgICAgICAgLi4uc2VydmVyRGVzY3JpcHRpb24uY29udGV4dFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gdGhlIHJlcGwgY29udGV4dFxuICAgIHJldHVybiB7IC4uLmN0eCwgY2xlYXI6IHRoaXMuY2xlYXIuYmluZCh0aGlzKSB9O1xuICB9XG59XG4iXX0=