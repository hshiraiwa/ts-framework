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
const Package = require("pjson");
const ts_framework_common_1 = require("ts-framework-common");
const commands_1 = require("./commands");
class CommandLine {
    constructor(commands, options) {
        // Initialize Commander instance
        this.program = Commander.name(Package.name)
            .version(Package.version)
            .description(Package.description)
            .option('-v, --verbose', 'enables verbose mode');
        // Prepare logger
        this.logger = ts_framework_common_1.Logger.getInstance();
        // Initialize default commands
        this.commands = commands || [
            new commands_1.ListenCommand(),
            new commands_1.GenerateCommand(),
            new commands_1.ConsoleCommand(),
            new commands_1.RunCommand(),
        ];
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
            this.program.on("command:*", (args) => {
                if (args && args.length && args[0] === 'help') {
                    this.program.outputHelp();
                }
                else {
                    this.logger.error("Unknown syntax for command line" + "\n\nSee --help for a list of available commands.");
                }
                process.exit(1);
            });
            this.commands.map(cmd => {
                // Prepare command syntax
                const p = this.program
                    .command(cmd.command.syntax)
                    .description(cmd.command.description);
                // Bind command arguments
                if (cmd.command.options) {
                    cmd.command.options.map(options => {
                        p.option.apply(p, options);
                    });
                }
                // Bind command action
                p.action((...args) => cmd.run.apply(cmd, args));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsNkRBQTZEO0FBRTdELHlDQUF3RjtBQU14RixNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBRSxPQUE0QjtRQUNoRSxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRW5ELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJO1lBQzFCLElBQUksd0JBQWEsRUFBRTtZQUNuQixJQUFJLDBCQUFlLEVBQUU7WUFDckIsSUFBSSx5QkFBYyxFQUFFO1lBQ3BCLElBQUkscUJBQVUsRUFBRTtTQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQXdCO1FBQy9DLE9BQU8sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVksT0FBTzs7WUFDbEIsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBRUgsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDN0Y7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTtvQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsa0RBQWtELENBQUMsQ0FBQztpQkFDM0c7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUV0Qix5QkFBeUI7Z0JBQ3pCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPO3FCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7cUJBQzNCLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV4Qyx5QkFBeUI7Z0JBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQTtpQkFDSDtnQkFFRCxzQkFBc0I7Z0JBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBcEZELDhCQW9GQztBQUVELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0ICogYXMgQ29tbWFuZGVyIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSwgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBSdW5Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZExpbmUge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIGNvbW1hbmRzOiBCYXNlQ29tbWFuZFtdO1xuICBwcm90ZWN0ZWQgcHJvZ3JhbTogQ29tbWFuZGVyLkNvbW1hbmQ7XG5cbiAgY29uc3RydWN0b3IoY29tbWFuZHM/OiBCYXNlQ29tbWFuZFtdLCBvcHRpb25zPzogQ29tbWFuZExpbmVPcHRpb25zKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBDb21tYW5kZXIgaW5zdGFuY2VcbiAgICB0aGlzLnByb2dyYW0gPSBDb21tYW5kZXIubmFtZShQYWNrYWdlLm5hbWUpXG4gICAgICAudmVyc2lvbihQYWNrYWdlLnZlcnNpb24pXG4gICAgICAuZGVzY3JpcHRpb24oUGFja2FnZS5kZXNjcmlwdGlvbilcbiAgICAgIC5vcHRpb24oJy12LCAtLXZlcmJvc2UnLCAnZW5hYmxlcyB2ZXJib3NlIG1vZGUnKTtcblxuICAgIC8vIFByZXBhcmUgbG9nZ2VyXG4gICAgdGhpcy5sb2dnZXIgPSBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIEluaXRpYWxpemUgZGVmYXVsdCBjb21tYW5kc1xuICAgIHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcyB8fCBbXG4gICAgICBuZXcgTGlzdGVuQ29tbWFuZCgpLFxuICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZCgpLFxuICAgICAgbmV3IENvbnNvbGVDb21tYW5kKCksXG4gICAgICBuZXcgUnVuQ29tbWFuZCgpLFxuICAgIF07XG5cbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoY29tbWFuZHM/OiBCYXNlQ29tbWFuZFtdKSB7XG4gICAgcmV0dXJuIG5ldyBDb21tYW5kTGluZShjb21tYW5kcykucGFyc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKGVycm9yKSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuXG4gICAgLy8gQXN5bmMgZXhpdCBmb3IgbG9nIHByb2Nlc3NpbmcgdG8gb2NjdXIgYmVmb3JlIGNyYXNoaW5nXG4gICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDUwMCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudCgpIHtcbiAgICAvLyBIYW5kbGUgdmVyYm5vc2UgbW9kZVxuICAgIHRoaXMucHJvZ3JhbS5vbihcIm9wdGlvbjp2ZXJib3NlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MuZW52LlZFUkJPU0UgPSB0aGlzLnZlcmJvc2U7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICByZXF1aXJlKFwidHMtbm9kZS9yZWdpc3Rlci90cmFuc3BpbGUtb25seVwiKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXhjZXB0aW9uKTtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiY29tbWFuZDoqXCIsIChhcmdzKSA9PiB7XG4gICAgICBpZiAoYXJncyAmJiBhcmdzLmxlbmd0aCAmJiBhcmdzWzBdID09PSAnaGVscCcpIHtcbiAgICAgICAgdGhpcy5wcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVW5rbm93biBzeW50YXggZm9yIGNvbW1hbmQgbGluZVwiICsgXCJcXG5cXG5TZWUgLS1oZWxwIGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLlwiKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29tbWFuZHMubWFwKGNtZCA9PiB7XG5cbiAgICAgIC8vIFByZXBhcmUgY29tbWFuZCBzeW50YXhcbiAgICAgIGNvbnN0IHAgPSB0aGlzLnByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoY21kLmNvbW1hbmQuc3ludGF4KVxuICAgICAgICAuZGVzY3JpcHRpb24oY21kLmNvbW1hbmQuZGVzY3JpcHRpb24pO1xuXG4gICAgICAvLyBCaW5kIGNvbW1hbmQgYXJndW1lbnRzXG4gICAgICBpZiAoY21kLmNvbW1hbmQub3B0aW9ucykge1xuICAgICAgICBjbWQuY29tbWFuZC5vcHRpb25zLm1hcChvcHRpb25zID0+IHtcbiAgICAgICAgICBwLm9wdGlvbi5hcHBseShwLCBvcHRpb25zKTtcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLy8gQmluZCBjb21tYW5kIGFjdGlvblxuICAgICAgcC5hY3Rpb24oKC4uLmFyZ3MpID0+IGNtZC5ydW4uYXBwbHkoY21kLCBhcmdzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=