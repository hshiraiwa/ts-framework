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
            syntax: 'listen [entrypoint]',
            description: 'Starts the server',
            options: [
                ['-d, --development', 'Starts server without production flags'],
                ['-p, --port', 'The PORT to listen to, can be overriden with PORT env variable.']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0M7QUFFdEMsTUFBcUIsYUFBYyxTQUFRLG9CQUFVO0lBQXJEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsT0FBTyxFQUFFO2dCQUNQLENBQUMsbUJBQW1CLEVBQUUsd0NBQXdDLENBQUM7Z0JBQy9ELENBQUMsWUFBWSxFQUFFLGlFQUFpRSxDQUFDO2FBQ2xGO1NBQ0YsQ0FBQztJQWtCSixDQUFDO0lBaEJjLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFOztZQUN4QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdEYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUM1QyxPQUFPLEVBQ1YsQ0FBQztZQUVILE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBM0JELGdDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuL1J1bkNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuQ29tbWFuZCBleHRlbmRzIFJ1bkNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogJ2xpc3RlbiBbZW50cnlwb2ludF0nLFxuICAgIGRlc2NyaXB0aW9uOiAnU3RhcnRzIHRoZSBzZXJ2ZXInLFxuICAgIG9wdGlvbnM6IFtcbiAgICAgIFsnLWQsIC0tZGV2ZWxvcG1lbnQnLCAnU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3MnXSxcbiAgICAgIFsnLXAsIC0tcG9ydCcsICdUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZS4nXVxuICAgIF1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKGVudHJ5cG9pbnQsIHsgcG9ydCwgZW52IH0pIHtcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5wcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBzZXJ2ZXIgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0geyBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IHBvcnQgfHwgMzAwMCB9O1xuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHtcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9KTtcblxuICAgIGF3YWl0IGluc3RhbmNlLmxpc3RlbigpO1xuICB9XG59XG4iXX0=