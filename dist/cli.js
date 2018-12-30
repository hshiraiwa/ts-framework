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
const fs = require("fs");
const ts_framework_common_1 = require("ts-framework-common");
const yargs = require("yargs");
const commands_1 = require("./commands");
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
exports.DEFAULT_ENV = process.env.NODE_ENV || "development";
exports.DEFAULT_PORT = process.env.PORT || 3000;
class CommandLine {
    constructor(options = {}) {
        this.options = options;
        const Package = require("../package.json");
        // Prepare logger and initial yargs instance
        this.yargs = yargs.usage("Usage: $0 <command> [...args]").wrap(Math.min(120, yargs.terminalWidth()));
        // Prepare verbose option
        this.yargs
            .scriptName(Package.name)
            .boolean("verbose")
            .alias("V", "verbose")
            .describe("verbose", "Runs command in verbose mode");
        // Prepare help guide
        this.yargs
            .help("h")
            .alias("h", "help")
            .alias("v", "version");
        // Prepare logger instance
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        // Initialize commands using current options
        this.commands = (options.commands || CommandLine.DEFAULT_COMMANDS).map((Command) => {
            return new Command(Object.assign({ logger: this.logger }, CommandLine.DEFAULT_OPTS));
        });
        // Starts command mounting
        this.onMount().catch(this.onError.bind(this));
    }
    static initialize(options = {}) {
        return new CommandLine(options).yargs.argv;
    }
    onError(error) {
        this.logger.error(error);
        // Async exit for log processing to occur before crashing
        setTimeout(() => process.exit(1), 500);
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check TS Node is available
            try {
                require("ts-node/register/transpile-only");
            }
            catch (exception) {
                this.logger.warn(exception);
                this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
            }
            // Bind all commands to current program
            this.commands.map(cmd => cmd.onProgram(this.yargs));
            // Prepare additional info in help
            this.yargs.epilog(fs.readFileSync("../raw/cli.help.txt").toString("utf-8"));
        });
    }
}
CommandLine.DEFAULT_OPTS = {
    entrypoint: exports.DEFAULT_ENTRYPOINT,
    port: exports.DEFAULT_PORT,
    env: exports.DEFAULT_ENV
};
CommandLine.DEFAULT_COMMANDS = [commands_1.GenerateCommand, commands_1.ListenCommand, commands_1.ConsoleCommand, commands_1.RunCommand, commands_1.WatchCommand];
exports.default = CommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IseUNBQXNHO0FBT3pGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBYTlCLFlBQW1CLFVBQThCLEVBQUU7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDakQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXJHLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSzthQUNQLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ3hCLE9BQU8sQ0FBQyxTQUFTLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7YUFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO1FBRXZELHFCQUFxQjtRQUNyQixJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDVCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDdEYsT0FBTyxJQUFJLE9BQU8saUJBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUssV0FBVyxDQUFDLFlBQVksRUFBRyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUE4QixFQUFFO1FBQ3ZELE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIseURBQXlEO1FBQ3pELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFWSxPQUFPOztZQUNsQiw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUM1QztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUVBQXlFLENBQUMsQ0FBQzthQUM3RjtZQUVELHVDQUF1QztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFcEQsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDO0tBQUE7O0FBaEVzQix3QkFBWSxHQUFHO0lBQ3BDLFVBQVUsRUFBRSwwQkFBa0I7SUFDOUIsSUFBSSxFQUFFLG9CQUFZO0lBQ2xCLEdBQUcsRUFBRSxtQkFBVztDQUNqQixDQUFDO0FBRXFCLDRCQUFnQixHQUFHLENBQUMsMEJBQWUsRUFBRSx3QkFBYSxFQUFFLHlCQUFjLEVBQUUscUJBQVUsRUFBRSx1QkFBWSxDQUFDLENBQUM7QUFYdkgsOEJBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCAqIGFzIHlhcmdzIGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IENvbnNvbGVDb21tYW5kLCBHZW5lcmF0ZUNvbW1hbmQsIExpc3RlbkNvbW1hbmQsIFJ1bkNvbW1hbmQsIFdhdGNoQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZExpbmVPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGNvbW1hbmRzPzogKHR5cGVvZiBCYXNlQ29tbWFuZClbXTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXIudHNcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHVibGljIHlhcmdzOiB5YXJncy5Bcmd2O1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9PUFRTID0ge1xuICAgIGVudHJ5cG9pbnQ6IERFRkFVTFRfRU5UUllQT0lOVCxcbiAgICBwb3J0OiBERUZBVUxUX1BPUlQsXG4gICAgZW52OiBERUZBVUxUX0VOVlxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9DT01NQU5EUyA9IFtHZW5lcmF0ZUNvbW1hbmQsIExpc3RlbkNvbW1hbmQsIENvbnNvbGVDb21tYW5kLCBSdW5Db21tYW5kLCBXYXRjaENvbW1hbmRdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBDb21tYW5kTGluZU9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IFBhY2thZ2UgPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgYW5kIGluaXRpYWwgeWFyZ3MgaW5zdGFuY2VcbiAgICB0aGlzLnlhcmdzID0geWFyZ3MudXNhZ2UoXCJVc2FnZTogJDAgPGNvbW1hbmQ+IFsuLi5hcmdzXVwiKS53cmFwKE1hdGgubWluKDEyMCwgeWFyZ3MudGVybWluYWxXaWR0aCgpKSk7XG5cbiAgICAvLyBQcmVwYXJlIHZlcmJvc2Ugb3B0aW9uXG4gICAgdGhpcy55YXJnc1xuICAgICAgLnNjcmlwdE5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLmJvb2xlYW4oXCJ2ZXJib3NlXCIpXG4gICAgICAuYWxpYXMoXCJWXCIsIFwidmVyYm9zZVwiKVxuICAgICAgLmRlc2NyaWJlKFwidmVyYm9zZVwiLCBcIlJ1bnMgY29tbWFuZCBpbiB2ZXJib3NlIG1vZGVcIik7XG5cbiAgICAvLyBQcmVwYXJlIGhlbHAgZ3VpZGVcbiAgICB0aGlzLnlhcmdzXG4gICAgICAuaGVscChcImhcIilcbiAgICAgIC5hbGlhcyhcImhcIiwgXCJoZWxwXCIpXG4gICAgICAuYWxpYXMoXCJ2XCIsIFwidmVyc2lvblwiKTtcblxuICAgIC8vIFByZXBhcmUgbG9nZ2VyIGluc3RhbmNlXG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIEluaXRpYWxpemUgY29tbWFuZHMgdXNpbmcgY3VycmVudCBvcHRpb25zXG4gICAgdGhpcy5jb21tYW5kcyA9IChvcHRpb25zLmNvbW1hbmRzIHx8IENvbW1hbmRMaW5lLkRFRkFVTFRfQ09NTUFORFMpLm1hcCgoQ29tbWFuZDogYW55KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENvbW1hbmQoeyBsb2dnZXI6IHRoaXMubG9nZ2VyLCAuLi5Db21tYW5kTGluZS5ERUZBVUxUX09QVFMgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBTdGFydHMgY29tbWFuZCBtb3VudGluZ1xuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShvcHRpb25zOiBDb21tYW5kTGluZU9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgQ29tbWFuZExpbmUob3B0aW9ucykueWFyZ3MuYXJndjtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXG4gICAgLy8gQXN5bmMgZXhpdCBmb3IgbG9nIHByb2Nlc3NpbmcgdG8gb2NjdXIgYmVmb3JlIGNyYXNoaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDUwMCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudCgpIHtcbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICByZXF1aXJlKFwidHMtbm9kZS9yZWdpc3Rlci90cmFuc3BpbGUtb25seVwiKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXhjZXB0aW9uKTtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgYWxsIGNvbW1hbmRzIHRvIGN1cnJlbnQgcHJvZ3JhbVxuICAgIHRoaXMuY29tbWFuZHMubWFwKGNtZCA9PiBjbWQub25Qcm9ncmFtKHRoaXMueWFyZ3MpKTtcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnlhcmdzLmVwaWxvZyhmcy5yZWFkRmlsZVN5bmMoXCIuLi9yYXcvY2xpLmhlbHAudHh0XCIpLnRvU3RyaW5nKFwidXRmLThcIikpO1xuICB9XG59XG4iXX0=