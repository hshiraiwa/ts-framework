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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLDZCQUE4QjtBQUU5QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBS2xGLE1BQXFCLFdBQVksU0FBUSw2QkFBTztJQUk5QyxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUU3QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxNQUFNOzhEQUFJLENBQUM7S0FBQTtJQUVsQixPQUFPLENBQUMsTUFBYzs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSztnQkFDNUIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpREFBaUQ7WUFDakQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDeEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakQsR0FBRztnQkFDRCxpQkFBaUI7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixpQkFBaUIsQ0FBQyxPQUFPLENBQzdCLENBQUM7U0FDSDtRQUVELDBCQUEwQjtRQUMxQix5QkFBWSxHQUFHLElBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFHO0lBQ2xELENBQUM7Q0FDRjtBQTlFRCw4QkE4RUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbnJlcXVpcmUoXCJzb3VyY2UtbWFwLXN1cHBvcnRcIikuaW5zdGFsbCgpO1xucmVxdWlyZShcInJlZmxlY3QtbWV0YWRhdGFcIik7XG5cbmltcG9ydCByZXBsID0gcmVxdWlyZShcInJlcGxcIik7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgU2VydmljZSwgU2VydmljZU9wdGlvbnMsIFNlcnZpY2VEZXNjcmlwdGlvbiB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXBsU2VydmVyT3B0aW9ucyBleHRlbmRzIFNlcnZpY2VPcHRpb25zIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcGxDb25zb2xlIGV4dGVuZHMgU2VydmljZSB7XG4gIHByb3RlY3RlZCBzZXJ2ZXI/OiBTZXJ2ZXI7XG4gIHByb3RlY3RlZCByZXBsOiByZXBsLlJFUExTZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFJlcGxTZXJ2ZXJPcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBkZXNjcmliZSgpOiBTZXJ2aWNlRGVzY3JpcHRpb24ge1xuICAgIHJldHVybiB7IG5hbWU6IFwiUmVwbFNlcnZlclwiIH07XG4gIH1cblxuICBvbk1vdW50KHNlcnZlcjogU2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkge31cblxuICBhc3luYyBvblJlYWR5KHNlcnZlcjogU2VydmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG5cbiAgICAvLyBTdGFydCB0aGUgcmVwbCBzZXJ2ZXJcbiAgICB0aGlzLnJlcGwgPSByZXBsLnN0YXJ0KHtcbiAgICAgIHByb21wdDogYCR7UGFja2FnZS5uYW1lfSA+IGAsXG4gICAgICB1c2VDb2xvcnM6IHRydWUsXG4gICAgICB1c2VHbG9iYWw6IHRydWUsXG4gICAgICBpZ25vcmVVbmRlZmluZWQ6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIEJpbmQgc2VydmVyIGNvbnRleHRcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQoKTtcbiAgICBPYmplY3Qua2V5cyhjdHgpLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKGN0eC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXMucmVwbC5jb250ZXh0W2tleV0gPSBjdHhba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEJsb2NrIHNlcnZlciBpbml0aWFsaXphdGlvbiB0aGVuIGNsb3NlIG9uIGV4aXRcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVwbC5vbihcImV4aXRcIiwgKCkgPT4ge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvblVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMucmVwbCkge1xuICAgICAgdGhpcy5yZXBsLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgUkVQTCBjb25zb2xlLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKCkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFx1MDAxQlsySlxcdTAwMUJbMDswZlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBSRVBMIGNvbnRleHQgZnJvbSBmcmFtZXdvcmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBhbnkge1xuICAgIGxldCBjdHggPSB7fTtcblxuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgY29uc3Qgc2VydmVyRGVzY3JpcHRpb24gPSB0aGlzLnNlcnZlci5kZXNjcmliZSgpO1xuXG4gICAgICBjdHggPSB7XG4gICAgICAgIC8qIE1haW4gU2VydmVyICovXG4gICAgICAgIHNlcnZlcjogdGhpcy5zZXJ2ZXIsXG4gICAgICAgIC4uLnNlcnZlckRlc2NyaXB0aW9uLmNvbnRleHRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHRoZSByZXBsIGNvbnRleHRcbiAgICByZXR1cm4geyAuLi5jdHgsIGNsZWFyOiB0aGlzLmNsZWFyLmJpbmQodGhpcykgfTtcbiAgfVxufVxuIl19