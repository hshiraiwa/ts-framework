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
require('source-map-support').install();
require('reflect-metadata');
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
            name: 'ReplServer',
            context: this.getContext(),
        };
    }
    onMount(server) {
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    onReady(server) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = server;
            // Start the repl server
            this.repl = repl.start({
                prompt: `${Package.name} > `,
                useColors: true,
                useGlobal: true,
                ignoreUndefined: true,
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
                this.repl.on('exit', () => {
                    resolve();
                    server.close();
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
     * Gets the REPL context from framework.
     */
    getContext() {
        return {
            /* Main Server */
            server: this.server,
        };
    }
}
exports.default = ReplConsole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvcmVwbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTVCLDZCQUE4QjtBQUU5QixpQ0FBaUM7QUFDakMsNkRBQWtGO0FBT2xGLE1BQXFCLFdBQVksU0FBUSw2QkFBTztJQUk5QyxZQUFtQixPQUEwQjtRQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUU3QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU87WUFDTCxJQUFJLEVBQUUsWUFBWTtZQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtTQUMzQixDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFjO0lBQ3RCLENBQUM7SUFFWSxNQUFNOztRQUNuQixDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsTUFBYzs7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksS0FBSztnQkFDNUIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsZUFBZSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpREFBaUQ7WUFDakQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDeEIsT0FBTyxFQUFFLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsU0FBUztRQUNQLElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxVQUFVO1FBQ2YsT0FBTztZQUNMLGlCQUFpQjtZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQWhFRCw4QkFnRUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKTtcbnJlcXVpcmUoJ3JlZmxlY3QtbWV0YWRhdGEnKTtcblxuaW1wb3J0IHJlcGwgPSByZXF1aXJlKCdyZXBsJyk7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tICdwanNvbic7XG5pbXBvcnQgeyBTZXJ2aWNlLCBTZXJ2aWNlT3B0aW9ucywgU2VydmljZURlc2NyaXB0aW9uIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgU2VydmVyIGZyb20gJy4uL3NlcnZlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVwbFNlcnZlck9wdGlvbnMgZXh0ZW5kcyBTZXJ2aWNlT3B0aW9ucyB7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwbENvbnNvbGUgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHNlcnZlcj86IFNlcnZlcjtcbiAgcHJvdGVjdGVkIHJlcGw6IHJlcGwuUkVQTFNlcnZlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogUmVwbFNlcnZlck9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIGRlc2NyaWJlKCk6IFNlcnZpY2VEZXNjcmlwdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdSZXBsU2VydmVyJyxcbiAgICAgIGNvbnRleHQ6IHRoaXMuZ2V0Q29udGV4dCgpLFxuICAgIH1cbiAgfVxuICBcbiAgb25Nb3VudChzZXJ2ZXI6IFNlcnZlcik6IHZvaWQge1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpIHtcbiAgfVxuXG4gIGFzeW5jIG9uUmVhZHkoc2VydmVyOiBTZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcblxuICAgIC8vIFN0YXJ0IHRoZSByZXBsIHNlcnZlclxuICAgIHRoaXMucmVwbCA9IHJlcGwuc3RhcnQoe1xuICAgICAgcHJvbXB0OiBgJHtQYWNrYWdlLm5hbWV9ID4gYCxcbiAgICAgIHVzZUNvbG9yczogdHJ1ZSxcbiAgICAgIHVzZUdsb2JhbDogdHJ1ZSxcbiAgICAgIGlnbm9yZVVuZGVmaW5lZDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIC8vIEJpbmQgc2VydmVyIGNvbnRleHRcbiAgICBjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQoKTtcbiAgICBPYmplY3Qua2V5cyhjdHgpLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKGN0eC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXMucmVwbC5jb250ZXh0W2tleV0gPSBjdHhba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEJsb2NrIHNlcnZlciBpbml0aWFsaXphdGlvbiB0aGVuIGNsb3NlIG9uIGV4aXRcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMucmVwbC5vbignZXhpdCcsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIFxuICBvblVubW91bnQoKSB7XG4gICAgaWYodGhpcy5yZXBsKSB7XG4gICAgICB0aGlzLnJlcGwuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUkVQTCBjb250ZXh0IGZyb20gZnJhbWV3b3JrLlxuICAgKi9cbiAgcHVibGljIGdldENvbnRleHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8qIE1haW4gU2VydmVyICovXG4gICAgICBzZXJ2ZXI6IHRoaXMuc2VydmVyLFxuICAgIH1cbiAgfVxufVxuIl19