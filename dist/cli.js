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
            .option("-v, --verbose", "enables verbose mode");
        // Prepare logger
        this.logger = ts_framework_common_1.Logger.getInstance();
        // Initialize default commands
        this.commands = commands || [
            new commands_1.ListenCommand(),
            new commands_1.GenerateCommand(),
            new commands_1.ConsoleCommand(),
            new commands_1.RunCommand(),
            new commands_1.WatchCommand()
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
                console.log('  - NODE_ENV\tSets the environment to run the server. Defaults to: "development"');
                console.log('  - PORT\t\tSets the port to listen to. Defaults to: "3000"');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsNkRBQTZEO0FBRTdELHlDQUFzRztBQU10RyxNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBRSxPQUE0QjtRQUNoRSxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRW5ELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJO1lBQzFCLElBQUksd0JBQWEsRUFBRTtZQUNuQixJQUFJLDBCQUFlLEVBQUU7WUFDckIsSUFBSSx5QkFBYyxFQUFFO1lBQ3BCLElBQUkscUJBQVUsRUFBRTtZQUNoQixJQUFJLHVCQUFZLEVBQUU7U0FDbkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUF3QjtRQUMvQyxPQUFPLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTSxPQUFPLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6Qix5REFBeUQ7UUFDekQsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVZLE9BQU87O1lBQ2xCLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUVILDZCQUE2QjtZQUM3QixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2FBQzVDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO2FBQzdGO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO29CQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxrREFBa0QsQ0FBQyxDQUFDO2lCQUMzRztnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsdUNBQXVDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV0RCxrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtGQUFrRixDQUFDLENBQUM7Z0JBQ2hHLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQTZELENBQUMsQ0FBQztnQkFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFyRkQsOEJBcUZDO0FBRUQsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlLCBMb2dnZXIgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IENvbnNvbGVDb21tYW5kLCBHZW5lcmF0ZUNvbW1hbmQsIExpc3RlbkNvbW1hbmQsIFJ1bkNvbW1hbmQsIFdhdGNoQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZExpbmVPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgb3B0aW9ucz86IENvbW1hbmRMaW5lT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgQ29tbWFuZGVyIGluc3RhbmNlXG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pXG4gICAgICAub3B0aW9uKFwiLXYsIC0tdmVyYm9zZVwiLCBcImVuYWJsZXMgdmVyYm9zZSBtb2RlXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXJcbiAgICB0aGlzLmxvZ2dlciA9IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IGNvbW1hbmRzXG4gICAgdGhpcy5jb21tYW5kcyA9IGNvbW1hbmRzIHx8IFtcbiAgICAgIG5ldyBMaXN0ZW5Db21tYW5kKCksIFxuICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZCgpLCBcbiAgICAgIG5ldyBDb25zb2xlQ29tbWFuZCgpLCBcbiAgICAgIG5ldyBSdW5Db21tYW5kKCksIFxuICAgICAgbmV3IFdhdGNoQ29tbWFuZCgpXG4gICAgXTtcblxuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb21tYW5kcz86IEJhc2VDb21tYW5kW10pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKGNvbW1hbmRzKS5wYXJzZSgpO1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG5cbiAgICAvLyBBc3luYyBleGl0IGZvciBsb2cgcHJvY2Vzc2luZyB0byBvY2N1ciBiZWZvcmUgY3Jhc2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwib3B0aW9uOnZlcmJvc2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLmVudi5WRVJCT1NFID0gdGhpcy52ZXJib3NlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdW5rbm93biBjb21tYW5kc1xuICAgIHRoaXMucHJvZ3JhbS5vbihcImNvbW1hbmQ6KlwiLCBhcmdzID0+IHtcbiAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0gPT09IFwiaGVscFwiKSB7XG4gICAgICAgIHRoaXMucHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlVua25vd24gc3ludGF4IGZvciBjb21tYW5kIGxpbmVcIiArIFwiXFxuXFxuU2VlIC0taGVscCBmb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBjb21tYW5kcy5cIik7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnByb2dyYW0pKTtcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnByb2dyYW0ub24oXCItLWhlbHBcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudmlyb25tZW50IHZhcmlhYmxlczpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgIC0gTk9ERV9FTlZcXHRTZXRzIHRoZSBlbnZpcm9ubWVudCB0byBydW4gdGhlIHNlcnZlci4gRGVmYXVsdHMgdG86IFwiZGV2ZWxvcG1lbnRcIicpO1xuICAgICAgY29uc29sZS5sb2coJyAgLSBQT1JUXFx0XFx0U2V0cyB0aGUgcG9ydCB0byBsaXN0ZW4gdG8uIERlZmF1bHRzIHRvOiBcIjMwMDBcIicpO1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkdldHRpbmcgc3RhcnRlZDpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHRzLWZyYW1ld29yayBuZXcgYXBwXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIgICQgY2QgYXBwL1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHlhcm4gc3RhcnRcIik7XG4gICAgfSk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=