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
        return {
            name: "ReplServer",
            context: this.getContext(),
        };
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
        process.stdout.write('\u001B[2J\u001B[0;0f');
    }
    ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLDZCQUE4QjtBQUU5QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBS2xGLE1BQXFCLFdBQVksU0FBUSw2QkFBTztJQUk5QyxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUU3QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU87WUFDTCxJQUFJLEVBQUUsWUFBWTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFWSxNQUFNOzhEQUFLLENBQUM7S0FBQTtJQUVuQixPQUFPLENBQUMsTUFBYzs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSztnQkFDNUIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpREFBaUQ7WUFDakQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDeEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFBQSxDQUFDO0lBRUY7O09BRUc7SUFDSSxVQUFVO1FBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWpELEdBQUc7Z0JBQ0QsaUJBQWlCO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFDaEIsaUJBQWlCLENBQUMsT0FBTyxDQUM3QixDQUFDO1NBQ0g7UUFFRCwwQkFBMEI7UUFDMUIseUJBQVksR0FBRyxJQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBRztJQUNsRCxDQUFDO0NBQ0Y7QUFqRkQsOEJBaUZDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5yZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0XCIpLmluc3RhbGwoKTtcbnJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpO1xuXG5pbXBvcnQgcmVwbCA9IHJlcXVpcmUoXCJyZXBsXCIpO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IFNlcnZpY2UsIFNlcnZpY2VPcHRpb25zLCBTZXJ2aWNlRGVzY3JpcHRpb24gfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVwbFNlcnZlck9wdGlvbnMgZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7IH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbENvbnNvbGUgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHNlcnZlcj86IFNlcnZlcjtcbiAgcHJvdGVjdGVkIHJlcGw6IHJlcGwuUkVQTFNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVwbFNlcnZlck9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIGRlc2NyaWJlKCk6IFNlcnZpY2VEZXNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFwiUmVwbFNlcnZlclwiLFxuICAgICAgY29udGV4dDogdGhpcy5nZXRDb250ZXh0KCksXG4gICAgfTtcbiAgfVxuXG4gIG9uTW91bnQoc2VydmVyOiBTZXJ2ZXIpOiB2b2lkIHsgXG4gICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Jbml0KCkgeyB9XG5cbiAgYXN5bmMgb25SZWFkeShzZXJ2ZXI6IFNlcnZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuXG4gICAgLy8gU3RhcnQgdGhlIHJlcGwgc2VydmVyXG4gICAgdGhpcy5yZXBsID0gcmVwbC5zdGFydCh7XG4gICAgICBwcm9tcHQ6IGAke1BhY2thZ2UubmFtZX0gPiBgLFxuICAgICAgdXNlQ29sb3JzOiB0cnVlLFxuICAgICAgdXNlR2xvYmFsOiB0cnVlLFxuICAgICAgaWdub3JlVW5kZWZpbmVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICAvLyBCaW5kIHNlcnZlciBjb250ZXh0XG4gICAgY29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XG4gICAgT2JqZWN0LmtleXMoY3R4KS5tYXAoa2V5ID0+IHtcbiAgICAgIGlmIChjdHguaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzLnJlcGwuY29udGV4dFtrZXldID0gY3R4W2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBCbG9jayBzZXJ2ZXIgaW5pdGlhbGl6YXRpb24gdGhlbiBjbG9zZSBvbiBleGl0XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLnJlcGwub24oXCJleGl0XCIsICgpID0+IHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgb25Vbm1vdW50KCkge1xuICAgIGlmICh0aGlzLnJlcGwpIHtcbiAgICAgIHRoaXMucmVwbC5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIFJFUEwgY29uc29sZS5cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnXFx1MDAxQlsySlxcdTAwMUJbMDswZicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBSRVBMIGNvbnRleHQgZnJvbSBmcmFtZXdvcmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29udGV4dCgpOiBhbnkge1xuICAgIGxldCBjdHggPSB7fTtcblxuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgY29uc3Qgc2VydmVyRGVzY3JpcHRpb24gPSB0aGlzLnNlcnZlci5kZXNjcmliZSgpO1xuXG4gICAgICBjdHggPSB7XG4gICAgICAgIC8qIE1haW4gU2VydmVyICovXG4gICAgICAgIHNlcnZlcjogdGhpcy5zZXJ2ZXIsXG4gICAgICAgIC4uLnNlcnZlckRlc2NyaXB0aW9uLmNvbnRleHQsXG4gICAgICB9O1xuICAgIH0gXG5cbiAgICAvLyBSZXR1cm4gdGhlIHJlcGwgY29udGV4dFxuICAgIHJldHVybiB7IC4uLmN0eCwgY2xlYXI6IHRoaXMuY2xlYXIuYmluZCh0aGlzKSB9O1xuICB9XG59XG4iXX0=