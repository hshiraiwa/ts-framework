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
        const cmdArr = options.commands || CommandLine.DEFAULT_COMMANDS;
        this.commands = cmdArr.map((Command) => {
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
CommandLine.DEFAULT_COMMANDS = [
    commands_1.CleanCommand,
    commands_1.GenerateCommand,
    commands_1.ListenCommand,
    commands_1.ConsoleCommand,
    commands_1.RunCommand,
    commands_1.WatchCommand
];
exports.default = CommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IseUNBQW9IO0FBT3ZHLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBb0I5QixZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNDLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUs7YUFDUCxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QixPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO2FBQ3JCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUV2RCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLEtBQUs7YUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckQsNENBQTRDO1FBQzVDLE1BQU0sTUFBTSxHQUEyQixPQUFPLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN4RixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUMxQyxPQUFPLElBQUksT0FBTyxpQkFBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSyxXQUFXLENBQUMsWUFBWSxFQUFHLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFFSCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQThCLEVBQUU7UUFDdkQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzdDLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6Qix5REFBeUQ7UUFDekQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLDZCQUE2QjtZQUM3QixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQzVDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO2FBQzdGO1lBRUQsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVwRCxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7S0FBQTs7QUF4RXNCLHdCQUFZLEdBQUc7SUFDcEMsVUFBVSxFQUFFLDBCQUFrQjtJQUM5QixJQUFJLEVBQUUsb0JBQVk7SUFDbEIsR0FBRyxFQUFFLG1CQUFXO0NBQ2pCLENBQUM7QUFFcUIsNEJBQWdCLEdBQUc7SUFDeEMsdUJBQVk7SUFDWiwwQkFBZTtJQUNmLHdCQUFhO0lBQ2IseUJBQWM7SUFDZCxxQkFBVTtJQUNWLHVCQUFZO0NBQ2IsQ0FBQztBQWxCSiw4QkE4RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ2xlYW5Db21tYW5kLCBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBSdW5Db21tYW5kLCBXYXRjaENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRMaW5lT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBjb21tYW5kcz86ICh0eXBlb2YgQmFzZUNvbW1hbmQpW107XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOVFJZUE9JTlQgPSBwcm9jZXNzLmVudi5FTlRSWVBPSU5UIHx8IFwiLi9hcGkvc2VydmVyLnRzXCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCBcImRldmVsb3BtZW50XCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgY29tbWFuZHM6IEJhc2VDb21tYW5kW107XG4gIHB1YmxpYyB5YXJnczogeWFyZ3MuQXJndjtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfT1BUUyA9IHtcbiAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgcG9ydDogREVGQVVMVF9QT1JULFxuICAgIGVudjogREVGQVVMVF9FTlZcbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfQ09NTUFORFMgPSBbXG4gICAgQ2xlYW5Db21tYW5kLFxuICAgIEdlbmVyYXRlQ29tbWFuZCxcbiAgICBMaXN0ZW5Db21tYW5kLFxuICAgIENvbnNvbGVDb21tYW5kLFxuICAgIFJ1bkNvbW1hbmQsXG4gICAgV2F0Y2hDb21tYW5kXG4gIF07XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IENvbW1hbmRMaW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgUGFja2FnZSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIGxvZ2dlciBhbmQgaW5pdGlhbCB5YXJncyBpbnN0YW5jZVxuICAgIHRoaXMueWFyZ3MgPSB5YXJncy51c2FnZShcIlVzYWdlOiAkMCA8Y29tbWFuZD4gWy4uLmFyZ3NdXCIpLndyYXAoTWF0aC5taW4oMTIwLCB5YXJncy50ZXJtaW5hbFdpZHRoKCkpKTtcblxuICAgIC8vIFByZXBhcmUgdmVyYm9zZSBvcHRpb25cbiAgICB0aGlzLnlhcmdzXG4gICAgICAuc2NyaXB0TmFtZShQYWNrYWdlLm5hbWUpXG4gICAgICAuYm9vbGVhbihcInZlcmJvc2VcIilcbiAgICAgIC5hbGlhcyhcIlZcIiwgXCJ2ZXJib3NlXCIpXG4gICAgICAuZGVzY3JpYmUoXCJ2ZXJib3NlXCIsIFwiUnVucyBjb21tYW5kIGluIHZlcmJvc2UgbW9kZVwiKTtcblxuICAgIC8vIFByZXBhcmUgaGVscCBndWlkZVxuICAgIHRoaXMueWFyZ3NcbiAgICAgIC5oZWxwKFwiaFwiKVxuICAgICAgLmFsaWFzKFwiaFwiLCBcImhlbHBcIilcbiAgICAgIC5hbGlhcyhcInZcIiwgXCJ2ZXJzaW9uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgaW5zdGFuY2VcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBjb21tYW5kcyB1c2luZyBjdXJyZW50IG9wdGlvbnNcbiAgICBjb25zdCBjbWRBcnI6ICh0eXBlb2YgQmFzZUNvbW1hbmQpW10gPSBvcHRpb25zLmNvbW1hbmRzIHx8IENvbW1hbmRMaW5lLkRFRkFVTFRfQ09NTUFORFM7XG4gICAgdGhpcy5jb21tYW5kcyA9IGNtZEFyci5tYXAoKENvbW1hbmQ6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDb21tYW5kKHsgbG9nZ2VyOiB0aGlzLmxvZ2dlciwgLi4uQ29tbWFuZExpbmUuREVGQVVMVF9PUFRTIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gU3RhcnRzIGNvbW1hbmQgbW91bnRpbmdcbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogQ29tbWFuZExpbmVPcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKG9wdGlvbnMpLnlhcmdzLmFyZ3Y7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcblxuICAgIC8vIEFzeW5jIGV4aXQgZm9yIGxvZyBwcm9jZXNzaW5nIHRvIG9jY3VyIGJlZm9yZSBjcmFzaGluZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCA1MDApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnlhcmdzKSk7XG5cbiAgICAvLyBQcmVwYXJlIGFkZGl0aW9uYWwgaW5mbyBpbiBoZWxwXG4gICAgdGhpcy55YXJncy5lcGlsb2coZnMucmVhZEZpbGVTeW5jKFwiLi4vcmF3L2NsaS5oZWxwLnR4dFwiKS50b1N0cmluZyhcInV0Zi04XCIpKTtcbiAgfVxufVxuIl19