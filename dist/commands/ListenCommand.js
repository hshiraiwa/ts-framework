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
const RunCommand_1 = require("./RunCommand");
class ListenCommand extends RunCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "listen [entrypoint]",
            description: "Starts the standalone server",
            options: [
                ["-d, --development", "starts server without production flags"],
                ["-p, --port", "the PORT to listen to, can be overriden with PORT env variable."]
            ]
        };
    }
    run(entrypoint, { port, env }) {
        return __awaiter(this, void 0, void 0, function* () {
            const distributionFile = yield this.prepare({ entrypoint, env });
            this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const options = { port: process.env.PORT || port || 3000 };
            const instance = yield this.load(distributionFile, Object.assign({}, options));
            yield instance.listen();
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0M7QUFFdEMsTUFBcUIsYUFBYyxTQUFRLG9CQUFVO0lBQXJEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFO2dCQUNQLENBQUMsbUJBQW1CLEVBQUUsd0NBQXdDLENBQUM7Z0JBQy9ELENBQUMsWUFBWSxFQUFFLGlFQUFpRSxDQUFDO2FBQ2xGO1NBQ0YsQ0FBQztJQWtCSixDQUFDO0lBaEJjLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFOztZQUN4QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdEYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUM1QyxPQUFPLEVBQ1YsQ0FBQztZQUVILE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBM0JELGdDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuL1J1bkNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuQ29tbWFuZCBleHRlbmRzIFJ1bkNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogXCJsaXN0ZW4gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3RhcnRzIHRoZSBzdGFuZGFsb25lIHNlcnZlclwiLFxuICAgIG9wdGlvbnM6IFtcbiAgICAgIFtcIi1kLCAtLWRldmVsb3BtZW50XCIsIFwic3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIl0sXG4gICAgICBbXCItcCwgLS1wb3J0XCIsIFwidGhlIFBPUlQgdG8gbGlzdGVuIHRvLCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggUE9SVCBlbnYgdmFyaWFibGUuXCJdXG4gICAgXVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oZW50cnlwb2ludCwgeyBwb3J0LCBlbnYgfSkge1xuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLnByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHNlcnZlciBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgcG9ydCB8fCAzMDAwIH07XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwge1xuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuXG4gICAgYXdhaXQgaW5zdGFuY2UubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==