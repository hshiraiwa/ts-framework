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
const Commander = require("commander");
const ts_framework_common_1 = require("ts-framework-common");
const commands_1 = require("./commands");
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server";
exports.DEFAULT_ENV = process.env.NODE_ENV || "development";
exports.DEFAULT_PORT = process.env.PORT || 3000;
class CommandLine {
    constructor(commands, options) {
        const Package = require("../package.json");
        // Initialize Commander instance
        this.program = Commander.name(Package.name)
            .version(Package.version)
            .description(Package.description)
            .option("-v, --verbose", "enables verbose mode");
        // Prepare logger
        this.logger = ts_framework_common_1.Logger.getInstance();
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
        return new CommandLine(commands).parse();
    }
    onError(error) {
        this.logger.error(error);
        // Async exit for log processing to occur before crashing
        setTimeout(() => process.exit(1), 500);
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle verbnose mode
            this.program.on("option:verbose", function () {
                process.env.VERBOSE = this.verbose;
            });
            // Check TS Node is available
            try {
                require("ts-node/register/transpile-only");
            }
            catch (exception) {
                this.logger.warn(exception);
                this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
            }
            // Handle unknown commands
            this.program.on("command:*", args => {
                if (args && args.length && args[0] === "help") {
                    this.program.outputHelp();
                }
                else {
                    this.logger.error("Unknown syntax for command line" + "\n\nSee --help for a list of available commands.");
                }
                process.exit(1);
            });
            // Bind all commands to current program
            this.commands.map(cmd => cmd.onProgram(this.program));
            // Prepare additional info in help
            this.program.on("--help", () => {
                console.log("");
                console.log("Environment variables:");
                console.log("");
                console.log('  - ENTRYPOINT\t\t\tSets server entrypoint for execution. Defaults to: "./api/server.ts"');
                console.log('  - NODE_ENV\t\t\tSets the environment to run the server. Defaults to: "development"');
                console.log('  - PORT\t\t\tSets the port to listen to. Defaults to: "3000"');
                console.log("");
                console.log("Getting started:");
                console.log("");
                console.log("  $ ts-framework new app");
                console.log("  $ cd app/");
                console.log("  $ yarn start");
            });
        });
    }
    parse() {
        this.program.parse(process.argv);
        return this;
    }
}
exports.default = CommandLine;
CommandLine.initialize();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2Qyw2REFBNkQ7QUFFN0QseUNBQXNHO0FBTXpGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDO0FBQzlELFFBQUEsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztBQUNwRCxRQUFBLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFckQsTUFBcUIsV0FBVztJQUs5QixZQUFZLFFBQXdCLEVBQUUsT0FBNEI7UUFDaEUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ2hDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVuRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLDBCQUEwQjtRQUMxQixNQUFNLFdBQVcsR0FBRztZQUNsQixVQUFVLEVBQUUsMEJBQWtCO1lBQzlCLElBQUksRUFBRSxvQkFBWTtZQUNsQixHQUFHLEVBQUUsbUJBQVc7U0FDakIsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSTtZQUMxQixJQUFJLHdCQUFhLENBQUMsV0FBVyxDQUFDO1lBQzlCLElBQUksMEJBQWUsQ0FBQyxXQUFXLENBQUM7WUFDaEMsSUFBSSx5QkFBYyxDQUFDLFdBQVcsQ0FBQztZQUMvQixJQUFJLHFCQUFVLENBQUMsV0FBVyxDQUFDO1lBQzNCLElBQUksdUJBQVksQ0FBQyxXQUFXLENBQUM7U0FDOUIsQ0FBQztRQUVGLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBd0I7UUFDL0MsT0FBTyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIseURBQXlEO1FBQ3pELFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUM1QztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseUVBQXlFLENBQUMsQ0FBQzthQUM3RjtZQUVELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtvQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsa0RBQWtELENBQUMsQ0FBQztpQkFDM0c7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILHVDQUF1QztZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFdEQsa0NBQWtDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwRkFBMEYsQ0FBQyxDQUFDO2dCQUN4RyxPQUFPLENBQUMsR0FBRyxDQUFDLHNGQUFzRixDQUFDLENBQUM7Z0JBQ3BHLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0RBQStELENBQUMsQ0FBQztnQkFDN0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoR0QsOEJBZ0dDO0FBRUQsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ29uc29sZUNvbW1hbmQsIEdlbmVyYXRlQ29tbWFuZCwgTGlzdGVuQ29tbWFuZCwgUnVuQ29tbWFuZCwgV2F0Y2hDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXJcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgb3B0aW9ucz86IENvbW1hbmRMaW5lT3B0aW9ucykge1xuICAgIGNvbnN0IFBhY2thZ2UgPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBDb21tYW5kZXIgaW5zdGFuY2VcbiAgICB0aGlzLnByb2dyYW0gPSBDb21tYW5kZXIubmFtZShQYWNrYWdlLm5hbWUpXG4gICAgICAudmVyc2lvbihQYWNrYWdlLnZlcnNpb24pXG4gICAgICAuZGVzY3JpcHRpb24oUGFja2FnZS5kZXNjcmlwdGlvbilcbiAgICAgIC5vcHRpb24oXCItdiwgLS12ZXJib3NlXCIsIFwiZW5hYmxlcyB2ZXJib3NlIG1vZGVcIik7XG5cbiAgICAvLyBQcmVwYXJlIGxvZ2dlclxuICAgIHRoaXMubG9nZ2VyID0gTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBQcmVwYXJlIGNvbW1hbmQgb3B0aW9uc1xuICAgIGNvbnN0IGNvbW1hbmRPcHRzID0ge1xuICAgICAgZW50cnlwb2ludDogREVGQVVMVF9FTlRSWVBPSU5ULFxuICAgICAgcG9ydDogREVGQVVMVF9QT1JULFxuICAgICAgZW52OiBERUZBVUxUX0VOVlxuICAgIH07XG5cbiAgICAvLyBJbml0aWFsaXplIGRlZmF1bHQgY29tbWFuZHNcbiAgICB0aGlzLmNvbW1hbmRzID0gY29tbWFuZHMgfHwgW1xuICAgICAgbmV3IExpc3RlbkNvbW1hbmQoY29tbWFuZE9wdHMpLFxuICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgQ29uc29sZUNvbW1hbmQoY29tbWFuZE9wdHMpLFxuICAgICAgbmV3IFJ1bkNvbW1hbmQoY29tbWFuZE9wdHMpLFxuICAgICAgbmV3IFdhdGNoQ29tbWFuZChjb21tYW5kT3B0cylcbiAgICBdO1xuXG4gICAgLy8gU3RhcnRzIGNvbW1hbmQgbW91bnRpbmdcbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoY29tbWFuZHM/OiBCYXNlQ29tbWFuZFtdKSB7XG4gICAgcmV0dXJuIG5ldyBDb21tYW5kTGluZShjb21tYW5kcykucGFyc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXG4gICAgLy8gQXN5bmMgZXhpdCBmb3IgbG9nIHByb2Nlc3NpbmcgdG8gb2NjdXIgYmVmb3JlIGNyYXNoaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDUwMCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudCgpIHtcbiAgICAvLyBIYW5kbGUgdmVyYm5vc2UgbW9kZVxuICAgIHRoaXMucHJvZ3JhbS5vbihcIm9wdGlvbjp2ZXJib3NlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcHJvY2Vzcy5lbnYuVkVSQk9TRSA9IHRoaXMudmVyYm9zZTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihleGNlcHRpb24pO1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b24ndCBiZSBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVua25vd24gY29tbWFuZHNcbiAgICB0aGlzLnByb2dyYW0ub24oXCJjb21tYW5kOipcIiwgYXJncyA9PiB7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCAmJiBhcmdzWzBdID09PSBcImhlbHBcIikge1xuICAgICAgICB0aGlzLnByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJVbmtub3duIHN5bnRheCBmb3IgY29tbWFuZCBsaW5lXCIgKyBcIlxcblxcblNlZSAtLWhlbHAgZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuXCIpO1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgLy8gQmluZCBhbGwgY29tbWFuZHMgdG8gY3VycmVudCBwcm9ncmFtXG4gICAgdGhpcy5jb21tYW5kcy5tYXAoY21kID0+IGNtZC5vblByb2dyYW0odGhpcy5wcm9ncmFtKSk7XG5cbiAgICAvLyBQcmVwYXJlIGFkZGl0aW9uYWwgaW5mbyBpbiBoZWxwXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiLS1oZWxwXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJFbnZpcm9ubWVudCB2YXJpYWJsZXM6XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZygnICAtIEVOVFJZUE9JTlRcXHRcXHRcXHRTZXRzIHNlcnZlciBlbnRyeXBvaW50IGZvciBleGVjdXRpb24uIERlZmF1bHRzIHRvOiBcIi4vYXBpL3NlcnZlci50c1wiJyk7XG4gICAgICBjb25zb2xlLmxvZygnICAtIE5PREVfRU5WXFx0XFx0XFx0U2V0cyB0aGUgZW52aXJvbm1lbnQgdG8gcnVuIHRoZSBzZXJ2ZXIuIERlZmF1bHRzIHRvOiBcImRldmVsb3BtZW50XCInKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgIC0gUE9SVFxcdFxcdFxcdFNldHMgdGhlIHBvcnQgdG8gbGlzdGVuIHRvLiBEZWZhdWx0cyB0bzogXCIzMDAwXCInKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgY29uc29sZS5sb2coXCJHZXR0aW5nIHN0YXJ0ZWQ6XCIpO1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIiAgJCB0cy1mcmFtZXdvcmsgbmV3IGFwcFwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIGNkIGFwcC9cIik7XG4gICAgICBjb25zb2xlLmxvZyhcIiAgJCB5YXJuIHN0YXJ0XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgcGFyc2UoKSB7XG4gICAgdGhpcy5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQ29tbWFuZExpbmUuaW5pdGlhbGl6ZSgpO1xuIl19