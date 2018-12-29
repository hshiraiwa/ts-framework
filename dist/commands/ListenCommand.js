"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const RunCommand_1 = require("./RunCommand");
class ListenCommand extends RunCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: 'listen [entrypoint]',
            description: 'Starts the standalone server',
            builder: yargs => {
                yargs
                    .boolean('d')
                    .alias('d', 'development')
                    .describe('d', 'Starts server without production flags');
                yargs
                    .string('p')
                    .alias('p', 'port')
                    .describe('p', 'The PORT to listen to, can be overriden with PORT env variable');
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force production unless flag was supplied
            const port = options.port || this.options.port;
            const env = options.development ? "development" : "production";
            const distributionFile = yield this.prepare({ entrypoint, env });
            this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            yield instance.listen();
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBc0M7QUFFdEMsTUFBcUIsYUFBYyxTQUFRLG9CQUFVO0lBQXJEOztRQUNFLFlBQU8sR0FBRztZQUNSLG9DQUFvQztZQUNwQyxNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO2dCQUUxRCxLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQTtnQkFFbEYsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQWtCSixDQUFDO0lBaEJjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNuRSw0Q0FBNEM7WUFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUUvRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdEYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isb0JBQU8sT0FBTyxJQUFFLElBQUksSUFBRyxDQUFDO1lBQ3pFLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOztLQUN6QjtDQUNBO0FBcENELGdDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSdW5Db21tYW5kIGZyb20gXCIuL1J1bkNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuQ29tbWFuZCBleHRlbmRzIFJ1bkNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIC8vIE92ZXJyaWRlIHNwZWNpZmljIGNvbmZpZ2l1cmF0aW9uc1xuICAgIHN5bnRheDogJ2xpc3RlbiBbZW50cnlwb2ludF0nLFxuICAgIGRlc2NyaXB0aW9uOiAnU3RhcnRzIHRoZSBzdGFuZGFsb25lIHNlcnZlcicsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oJ2QnKVxuICAgICAgICAuYWxpYXMoJ2QnLCAnZGV2ZWxvcG1lbnQnKVxuICAgICAgICAuZGVzY3JpYmUoJ2QnLCAnU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3MnKVxuXG4gICAgICB5YXJnc1xuICAgICAgICAuc3RyaW5nKCdwJylcbiAgICAgICAgLmFsaWFzKCdwJywgJ3BvcnQnKVxuICAgICAgICAuZGVzY3JpYmUoJ3AnLCAnVGhlIFBPUlQgdG8gbGlzdGVuIHRvLCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggUE9SVCBlbnYgdmFyaWFibGUnKVxuXG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICBjb25zdCBlbnYgPSBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCI7XG5cbiAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMucHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHNlcnZlciBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICB9XG5cbiAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuICBhd2FpdCBpbnN0YW5jZS5saXN0ZW4oKTtcbn1cbn1cbiJdfQ==