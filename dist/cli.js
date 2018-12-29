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
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        this.yargs = yargs.usage('Usage: $0 <command> [options]')
            .wrap(Math.min(120, yargs.terminalWidth()));
        // Prepare verbose option
        this.yargs
            .scriptName(Package.name)
            .boolean('verbose')
            .alias('V', 'verbose')
            .describe('verbose', 'Runs command in verbose mode');
        // Prepare help guide
        this.yargs
            .help('h')
            .alias('h', 'help')
            .alias('v', 'version');
        // Prepare command options
        const commandOpts = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRXhDLDZEQUE2RDtBQUM3RCwrQkFBK0I7QUFFL0IseUNBQXNHO0FBTXpGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBUyxVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQzNFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTNDLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUM7YUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFN0MseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLO2FBQ1AsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDeEIsT0FBTyxDQUFDLFNBQVMsQ0FBQzthQUNsQixLQUFLLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQzthQUNyQixRQUFRLENBQUMsU0FBUyxFQUFFLDhCQUE4QixDQUFDLENBQUE7UUFFdEQscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNULEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFekIsMEJBQTBCO1FBQzFCLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLFVBQVUsRUFBRSwwQkFBa0I7WUFDOUIsSUFBSSxFQUFFLG9CQUFZO1lBQ2xCLEdBQUcsRUFBRSxtQkFBVztTQUNqQixDQUFDO1FBRUYsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJO1lBQzFCLElBQUksd0JBQWEsQ0FBQyxXQUFXLENBQUM7WUFDOUIsSUFBSSwwQkFBZSxDQUFDLFdBQVcsQ0FBQztZQUNoQyxJQUFJLHlCQUFjLENBQUMsV0FBVyxDQUFDO1lBQy9CLElBQUkscUJBQVUsQ0FBQyxXQUFXLENBQUM7WUFDM0IsSUFBSSx1QkFBWSxDQUFDLFdBQVcsQ0FBQztTQUM5QixDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUF3QjtRQUMvQyxPQUFPLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDN0Y7WUFFRCx1Q0FBdUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBELCtFQUErRTtZQUMvRSwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLDJEQUEyRDtZQUMzRCxRQUFRO1lBQ1IsTUFBTTtZQUVOLHdHQUF3RztZQUN4RyxvQ0FBb0M7WUFDcEMsc0JBQXNCO1lBQ3RCLHlEQUF5RDtZQUN6RCx5REFBeUQ7WUFDekQsUUFBUTtZQUVSLCtCQUErQjtZQUMvQixzQkFBc0I7WUFDdEIsNkRBQTZEO1lBQzdELFFBQVE7WUFDUixLQUFLO1lBRUwsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNmLElBQUk7Z0JBQ0osMEJBQTBCO2dCQUMxQixJQUFJO2dCQUNKLDJGQUEyRjtnQkFDM0YsdUZBQXVGO2dCQUN2RixnRUFBZ0U7Z0JBQ2hFLElBQUk7Z0JBQ0osb0JBQW9CO2dCQUNwQixJQUFJO2dCQUNKLDRCQUE0QjtnQkFDNUIsZUFBZTtnQkFDZixrQkFBa0IsQ0FDbkIsQ0FBQztRQUNKLENBQUM7S0FBQTtDQUNGO0FBekdELDhCQXlHQztBQUVELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGUgLS1leHBlcmltZW50YWwtcmVwbC1hd2FpdFxuXG5yZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0XCIpLmluc3RhbGwoKTtcblxuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgKiBhcyB5YXJncyBmcm9tICd5YXJncyc7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ29uc29sZUNvbW1hbmQsIEdlbmVyYXRlQ29tbWFuZCwgTGlzdGVuQ29tbWFuZCwgUnVuQ29tbWFuZCwgV2F0Y2hDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXIudHNcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHVibGljIHlhcmdzOiB5YXJncy5Bcmd2O1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgcHVibGljIG9wdGlvbnM6IENvbW1hbmRMaW5lT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgUGFja2FnZSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbiAgICAvLyBQcmVwYXJlIGxvZ2dlciBhbmQgaW5pdGlhbCB5YXJncyBpbnN0YW5jZVxuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgdGhpcy55YXJncyA9IHlhcmdzLnVzYWdlKCdVc2FnZTogJDAgPGNvbW1hbmQ+IFtvcHRpb25zXScpXG4gICAgICAud3JhcChNYXRoLm1pbigxMjAsIHlhcmdzLnRlcm1pbmFsV2lkdGgoKSkpXG5cbiAgICAvLyBQcmVwYXJlIHZlcmJvc2Ugb3B0aW9uXG4gICAgdGhpcy55YXJnc1xuICAgICAgLnNjcmlwdE5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLmJvb2xlYW4oJ3ZlcmJvc2UnKVxuICAgICAgLmFsaWFzKCdWJywgJ3ZlcmJvc2UnKVxuICAgICAgLmRlc2NyaWJlKCd2ZXJib3NlJywgJ1J1bnMgY29tbWFuZCBpbiB2ZXJib3NlIG1vZGUnKVxuXG4gICAgLy8gUHJlcGFyZSBoZWxwIGd1aWRlXG4gICAgdGhpcy55YXJnc1xuICAgICAgLmhlbHAoJ2gnKVxuICAgICAgLmFsaWFzKCdoJywgJ2hlbHAnKVxuICAgICAgLmFsaWFzKCd2JywgJ3ZlcnNpb24nKTtcblxuICAgIC8vIFByZXBhcmUgY29tbWFuZCBvcHRpb25zXG4gICAgY29uc3QgY29tbWFuZE9wdHMgPSB7XG4gICAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgICBwb3J0OiBERUZBVUxUX1BPUlQsXG4gICAgICBlbnY6IERFRkFVTFRfRU5WXG4gICAgfTtcblxuICAgIC8vIEluaXRpYWxpemUgZGVmYXVsdCBjb21tYW5kc1xuICAgIHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcyB8fCBbXG4gICAgICBuZXcgTGlzdGVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgR2VuZXJhdGVDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBDb25zb2xlQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgUnVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgV2F0Y2hDb21tYW5kKGNvbW1hbmRPcHRzKVxuICAgIF07XG5cbiAgICAvLyBTdGFydHMgY29tbWFuZCBtb3VudGluZ1xuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb21tYW5kcz86IEJhc2VDb21tYW5kW10pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKGNvbW1hbmRzKS55YXJncy5hcmd2O1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG5cbiAgICAvLyBBc3luYyBleGl0IGZvciBsb2cgcHJvY2Vzc2luZyB0byBvY2N1ciBiZWZvcmUgY3Jhc2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihleGNlcHRpb24pO1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b24ndCBiZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gQmluZCBhbGwgY29tbWFuZHMgdG8gY3VycmVudCBwcm9ncmFtXG4gICAgdGhpcy5jb21tYW5kcy5tYXAoY21kID0+IGNtZC5vblByb2dyYW0odGhpcy55YXJncykpO1xuXG4gICAgLy8gdGhpcy55YXJncy5jb21tYW5kKCduZXcgYXBwIFtuYW1lXScsICdDcmVhdGVzIGEgbmV3IGFwcGxpY2F0aW9uJywgeWFyZ3MgPT4ge1xuICAgIC8vICAgeWFyZ3MucG9zaXRpb25hbCgnbmFtZScsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIG5hbWUgb2YgdGhlIHByb2plY3QgdG8gYmUgZ2VuZXJhdGVkJyxcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xuXG4gICAgLy8gdGhpcy55YXJncy5jb21tYW5kKCduZXcgPGNvbXBvbmVudD4gPG5hbWU+JywgJ0NyZWF0ZXMgYSBuZXcgY29tcG9uZW50IGluIGN1cnJlbnQgcHJvamVjdCcsIHlhcmdzID0+IHtcbiAgICAvLyAgIHlhcmdzLnBvc2l0aW9uYWwoJ2NvbXBvbmVudCcsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIGtpbmQgb2YgY29tcG9uZW50IHRvIGJlIGdlbmVyYXRlZCcsXG4gICAgLy8gICAgIGNob2ljZXM6IFsnY29udHJvbGxlcicsICdzZXJ2aWNlJywgJ2pvYicsICdtb2RlbCddXG4gICAgLy8gICB9KTtcblxuICAgIC8vICAgeWFyZ3MucG9zaXRpb25hbCgnbmFtZScsIHtcbiAgICAvLyAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgLy8gICAgIGRlc2NyaWJlOiAnVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBiZSBnZW5lcmF0ZWQnLFxuICAgIC8vICAgfSk7XG4gICAgLy8gfSlcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnlhcmdzLmVwaWxvZyhcbiAgICAgIFwiXFxuXCIgK1xuICAgICAgXCJFbnZpcm9ubWVudCB2YXJpYWJsZXM6XFxuXCIgK1xuICAgICAgXCJcXG5cIiArXG4gICAgICAnICAtIEVOVFJZUE9JTlQ6IFxcdCBTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBleGVjdXRpb24uIERlZmF1bHRzIHRvOiBcIi4vYXBpL3NlcnZlci50c1wiXFxuJyArXG4gICAgICAnICAtIE5PREVfRU5WOiBcXHQgU2V0cyB0aGUgZW52aXJvbm1lbnQgdG8gcnVuIHRoZSBzZXJ2ZXIuIERlZmF1bHRzIHRvOiBcImRldmVsb3BtZW50XCJcXG4nICtcbiAgICAgICcgIC0gUE9SVDogXFx0IFNldHMgdGhlIHBvcnQgdG8gbGlzdGVuIHRvLiBEZWZhdWx0cyB0bzogXCIzMDAwXCJcXG4nICtcbiAgICAgIFwiXFxuXCIgK1xuICAgICAgXCJHZXR0aW5nIHN0YXJ0ZWQ6XFxuXCIgK1xuICAgICAgXCJcXG5cIiArXG4gICAgICBcIiAgJCB0cy1mcmFtZXdvcmsgbmV3IGFwcFxcblwiICtcbiAgICAgIFwiICAkIGNkIGFwcC9cXG5cIiArXG4gICAgICBcIiAgJCB5YXJuIHN0YXJ0XFxuXCJcbiAgICApO1xuICB9XG59XG5cbkNvbW1hbmRMaW5lLmluaXRpYWxpemUoKTsiXX0=