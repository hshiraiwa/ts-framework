#!/usr/bin/env node --experimental-repl-await
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
const ts_framework_common_1 = require("ts-framework-common");
const yargs = require("yargs");
const commands_1 = require("./commands");
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
exports.DEFAULT_ENV = process.env.NODE_ENV || "development";
exports.DEFAULT_PORT = process.env.PORT || 3000;
class CommandLine {
    constructor(commands, options = {}) {
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
        // Prepare command options
        const commandOpts = {
            logger: this.logger,
            entrypoint: exports.DEFAULT_ENTRYPOINT,
            port: exports.DEFAULT_PORT,
            env: exports.DEFAULT_ENV
        };
        // Initialize default commands
        this.commands = commands || [
            new commands_1.ListenCommand(commandOpts),
            new commands_1.GenerateCommand(commandOpts),
            new commands_1.ConsoleCommand(commandOpts),
            new commands_1.RunCommand(commandOpts),
            new commands_1.WatchCommand(commandOpts)
        ];
        // Starts command mounting
        this.onMount().catch(this.onError.bind(this));
    }
    static initialize(commands) {
        return new CommandLine(commands).yargs.argv;
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
            // this.yargs.command('new app [name]', 'Creates a new application', yargs => {
            //   yargs.positional('name', {
            //     type: 'string',
            //     describe: 'The name of the project to be generated',
            //   });
            // });
            // this.yargs.command('new <component> <name>', 'Creates a new component in current project', yargs => {
            //   yargs.positional('component', {
            //     type: 'string',
            //     describe: 'The kind of component to be generated',
            //     choices: ['controller', 'service', 'job', 'model']
            //   });
            //   yargs.positional('name', {
            //     type: 'string',
            //     describe: 'The name of the component to be generated',
            //   });
            // })
            // Prepare additional info in help
            this.yargs.epilog("\n" +
                "Environment variables:\n" +
                "\n" +
                '  - ENTRYPOINT: \t Sets server entrypoint for execution. Defaults to: "./api/server.ts"\n' +
                '  - NODE_ENV: \t Sets the environment to run the server. Defaults to: "development"\n' +
                '  - PORT: \t Sets the port to listen to. Defaults to: "3000"\n' +
                "\n" +
                "Getting started:\n" +
                "\n" +
                "  $ ts-framework new app\n" +
                "  $ cd app/\n" +
                "  $ yarn start\n");
        });
    }
}
exports.default = CommandLine;
CommandLine.initialize();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRXhDLDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IseUNBQXNHO0FBTXpGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBUyxVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzNFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNDLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUs7YUFDUCxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QixPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDO2FBQ3JCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUMsQ0FBQztRQUV2RCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLEtBQUs7YUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ1QsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7YUFDbEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckQsMEJBQTBCO1FBQzFCLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixVQUFVLEVBQUUsMEJBQWtCO1lBQzlCLElBQUksRUFBRSxvQkFBWTtZQUNsQixHQUFHLEVBQUUsbUJBQVc7U0FDakIsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSTtZQUMxQixJQUFJLHdCQUFhLENBQUMsV0FBVyxDQUFDO1lBQzlCLElBQUksMEJBQWUsQ0FBQyxXQUFXLENBQUM7WUFDaEMsSUFBSSx5QkFBYyxDQUFDLFdBQVcsQ0FBQztZQUMvQixJQUFJLHFCQUFVLENBQUMsV0FBVyxDQUFDO1lBQzNCLElBQUksdUJBQVksQ0FBQyxXQUFXLENBQUM7U0FDOUIsQ0FBQztRQUVGLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBd0I7UUFDL0MsT0FBTyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6Qix5REFBeUQ7UUFDekQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLDZCQUE2QjtZQUM3QixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQzVDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO2FBQzdGO1lBRUQsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVwRCwrRUFBK0U7WUFDL0UsK0JBQStCO1lBQy9CLHNCQUFzQjtZQUN0QiwyREFBMkQ7WUFDM0QsUUFBUTtZQUNSLE1BQU07WUFFTix3R0FBd0c7WUFDeEcsb0NBQW9DO1lBQ3BDLHNCQUFzQjtZQUN0Qix5REFBeUQ7WUFDekQseURBQXlEO1lBQ3pELFFBQVE7WUFFUiwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLDZEQUE2RDtZQUM3RCxRQUFRO1lBQ1IsS0FBSztZQUVMLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDZixJQUFJO2dCQUNGLDBCQUEwQjtnQkFDMUIsSUFBSTtnQkFDSiwyRkFBMkY7Z0JBQzNGLHVGQUF1RjtnQkFDdkYsZ0VBQWdFO2dCQUNoRSxJQUFJO2dCQUNKLG9CQUFvQjtnQkFDcEIsSUFBSTtnQkFDSiw0QkFBNEI7Z0JBQzVCLGVBQWU7Z0JBQ2Ysa0JBQWtCLENBQ3JCLENBQUM7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQTNHRCw4QkEyR0M7QUFFRCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlIC0tZXhwZXJpbWVudGFsLXJlcGwtYXdhaXRcblxucmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKS5pbnN0YWxsKCk7XG5cbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSBcInlhcmdzXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ29uc29sZUNvbW1hbmQsIEdlbmVyYXRlQ29tbWFuZCwgTGlzdGVuQ29tbWFuZCwgUnVuQ29tbWFuZCwgV2F0Y2hDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXIudHNcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHVibGljIHlhcmdzOiB5YXJncy5Bcmd2O1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgcHVibGljIG9wdGlvbnM6IENvbW1hbmRMaW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgUGFja2FnZSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIGxvZ2dlciBhbmQgaW5pdGlhbCB5YXJncyBpbnN0YW5jZVxuICAgIHRoaXMueWFyZ3MgPSB5YXJncy51c2FnZShcIlVzYWdlOiAkMCA8Y29tbWFuZD4gWy4uLmFyZ3NdXCIpLndyYXAoTWF0aC5taW4oMTIwLCB5YXJncy50ZXJtaW5hbFdpZHRoKCkpKTtcblxuICAgIC8vIFByZXBhcmUgdmVyYm9zZSBvcHRpb25cbiAgICB0aGlzLnlhcmdzXG4gICAgICAuc2NyaXB0TmFtZShQYWNrYWdlLm5hbWUpXG4gICAgICAuYm9vbGVhbihcInZlcmJvc2VcIilcbiAgICAgIC5hbGlhcyhcIlZcIiwgXCJ2ZXJib3NlXCIpXG4gICAgICAuZGVzY3JpYmUoXCJ2ZXJib3NlXCIsIFwiUnVucyBjb21tYW5kIGluIHZlcmJvc2UgbW9kZVwiKTtcblxuICAgIC8vIFByZXBhcmUgaGVscCBndWlkZVxuICAgIHRoaXMueWFyZ3NcbiAgICAgIC5oZWxwKFwiaFwiKVxuICAgICAgLmFsaWFzKFwiaFwiLCBcImhlbHBcIilcbiAgICAgIC5hbGlhcyhcInZcIiwgXCJ2ZXJzaW9uXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXIgaW5zdGFuY2VcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gUHJlcGFyZSBjb21tYW5kIG9wdGlvbnNcbiAgICBjb25zdCBjb21tYW5kT3B0cyA9IHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgICBwb3J0OiBERUZBVUxUX1BPUlQsXG4gICAgICBlbnY6IERFRkFVTFRfRU5WXG4gICAgfTtcblxuICAgIC8vIEluaXRpYWxpemUgZGVmYXVsdCBjb21tYW5kc1xuICAgIHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcyB8fCBbXG4gICAgICBuZXcgTGlzdGVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgR2VuZXJhdGVDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBDb25zb2xlQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgUnVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgV2F0Y2hDb21tYW5kKGNvbW1hbmRPcHRzKVxuICAgIF07XG5cbiAgICAvLyBTdGFydHMgY29tbWFuZCBtb3VudGluZ1xuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb21tYW5kcz86IEJhc2VDb21tYW5kW10pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKGNvbW1hbmRzKS55YXJncy5hcmd2O1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG5cbiAgICAvLyBBc3luYyBleGl0IGZvciBsb2cgcHJvY2Vzc2luZyB0byBvY2N1ciBiZWZvcmUgY3Jhc2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihleGNlcHRpb24pO1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b24ndCBiZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gQmluZCBhbGwgY29tbWFuZHMgdG8gY3VycmVudCBwcm9ncmFtXG4gICAgdGhpcy5jb21tYW5kcy5tYXAoY21kID0+IGNtZC5vblByb2dyYW0odGhpcy55YXJncykpO1xuXG4gICAgLy8gdGhpcy55YXJncy5jb21tYW5kKCduZXcgYXBwIFtuYW1lXScsICdDcmVhdGVzIGEgbmV3IGFwcGxpY2F0aW9uJywgeWFyZ3MgPT4ge1xuICAgIC8vICAgeWFyZ3MucG9zaXRpb25hbCgnbmFtZScsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIG5hbWUgb2YgdGhlIHByb2plY3QgdG8gYmUgZ2VuZXJhdGVkJyxcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gdGhpcy55YXJncy5jb21tYW5kKCduZXcgPGNvbXBvbmVudD4gPG5hbWU+JywgJ0NyZWF0ZXMgYSBuZXcgY29tcG9uZW50IGluIGN1cnJlbnQgcHJvamVjdCcsIHlhcmdzID0+IHtcbiAgICAvLyAgIHlhcmdzLnBvc2l0aW9uYWwoJ2NvbXBvbmVudCcsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIGtpbmQgb2YgY29tcG9uZW50IHRvIGJlIGdlbmVyYXRlZCcsXG4gICAgLy8gICAgIGNob2ljZXM6IFsnY29udHJvbGxlcicsICdzZXJ2aWNlJywgJ2pvYicsICdtb2RlbCddXG4gICAgLy8gICB9KTtcblxuICAgIC8vICAgeWFyZ3MucG9zaXRpb25hbCgnbmFtZScsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBiZSBnZW5lcmF0ZWQnLFxuICAgIC8vICAgfSk7XG4gICAgLy8gfSlcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnlhcmdzLmVwaWxvZyhcbiAgICAgIFwiXFxuXCIgK1xuICAgICAgICBcIkVudmlyb25tZW50IHZhcmlhYmxlczpcXG5cIiArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICAnICAtIEVOVFJZUE9JTlQ6IFxcdCBTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBleGVjdXRpb24uIERlZmF1bHRzIHRvOiBcIi4vYXBpL3NlcnZlci50c1wiXFxuJyArXG4gICAgICAgICcgIC0gTk9ERV9FTlY6IFxcdCBTZXRzIHRoZSBlbnZpcm9ubWVudCB0byBydW4gdGhlIHNlcnZlci4gRGVmYXVsdHMgdG86IFwiZGV2ZWxvcG1lbnRcIlxcbicgK1xuICAgICAgICAnICAtIFBPUlQ6IFxcdCBTZXRzIHRoZSBwb3J0IHRvIGxpc3RlbiB0by4gRGVmYXVsdHMgdG86IFwiMzAwMFwiXFxuJyArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICBcIkdldHRpbmcgc3RhcnRlZDpcXG5cIiArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICBcIiAgJCB0cy1mcmFtZXdvcmsgbmV3IGFwcFxcblwiICtcbiAgICAgICAgXCIgICQgY2QgYXBwL1xcblwiICtcbiAgICAgICAgXCIgICQgeWFybiBzdGFydFxcblwiXG4gICAgKTtcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=