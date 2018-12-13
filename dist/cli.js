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
exports.DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2Qyw2REFBNkQ7QUFFN0QseUNBQXNHO0FBTXpGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUM7QUFDakUsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDO0FBQ3BELFFBQUEsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUVyRCxNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBRSxPQUE0QjtRQUNoRSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUzQyxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRW5ELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsMEJBQTBCO1FBQzFCLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLFVBQVUsRUFBRSwwQkFBa0I7WUFDOUIsSUFBSSxFQUFFLG9CQUFZO1lBQ2xCLEdBQUcsRUFBRSxtQkFBVztTQUNqQixDQUFDO1FBRUYsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJO1lBQzFCLElBQUksd0JBQWEsQ0FBQyxXQUFXLENBQUM7WUFDOUIsSUFBSSwwQkFBZSxDQUFDLFdB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Q0FBQztnQkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQWhHRCw4QkFnR0M7QUFFRCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCAqIGFzIENvbW1hbmRlciBmcm9tIFwiY29tbWFuZGVyXCI7XG5pbXBvcnQgeyBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBSdW5Db21tYW5kLCBXYXRjaENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRMaW5lT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlRSWVBPSU5UID0gcHJvY2Vzcy5lbnYuRU5UUllQT0lOVCB8fCBcIi4vYXBpL3NlcnZlci50c1wiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5WID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgXCJkZXZlbG9wbWVudFwiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZExpbmUge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIGNvbW1hbmRzOiBCYXNlQ29tbWFuZFtdO1xuICBwcm90ZWN0ZWQgcHJvZ3JhbTogQ29tbWFuZGVyLkNvbW1hbmQ7XG5cbiAgY29uc3RydWN0b3IoY29tbWFuZHM/OiBCYXNlQ29tbWFuZFtdLCBvcHRpb25zPzogQ29tbWFuZExpbmVPcHRpb25zKSB7XG4gICAgY29uc3QgUGFja2FnZSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbiAgICAvLyBJbml0aWFsaXplIENvbW1hbmRlciBpbnN0YW5jZVxuICAgIHRoaXMucHJvZ3JhbSA9IENvbW1hbmRlci5uYW1lKFBhY2thZ2UubmFtZSlcbiAgICAgIC52ZXJzaW9uKFBhY2thZ2UudmVyc2lvbilcbiAgICAgIC5kZXNjcmlwdGlvbihQYWNrYWdlLmRlc2NyaXB0aW9uKVxuICAgICAgLm9wdGlvbihcIi12LCAtLXZlcmJvc2VcIiwgXCJlbmFibGVzIHZlcmJvc2UgbW9kZVwiKTtcblxuICAgIC8vIFByZXBhcmUgbG9nZ2VyXG4gICAgdGhpcy5sb2dnZXIgPSBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIFByZXBhcmUgY29tbWFuZCBvcHRpb25zXG4gICAgY29uc3QgY29tbWFuZE9wdHMgPSB7XG4gICAgICBlbnRyeXBvaW50OiBERUZBVUxUX0VOVFJZUE9JTlQsXG4gICAgICBwb3J0OiBERUZBVUxUX1BPUlQsXG4gICAgICBlbnY6IERFRkFVTFRfRU5WXG4gICAgfTtcblxuICAgIC8vIEluaXRpYWxpemUgZGVmYXVsdCBjb21tYW5kc1xuICAgIHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcyB8fCBbXG4gICAgICBuZXcgTGlzdGVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgR2VuZXJhdGVDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBDb25zb2xlQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgUnVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgV2F0Y2hDb21tYW5kKGNvbW1hbmRPcHRzKVxuICAgIF07XG5cbiAgICAvLyBTdGFydHMgY29tbWFuZCBtb3VudGluZ1xuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZShjb21tYW5kcz86IEJhc2VDb21tYW5kW10pIHtcbiAgICByZXR1cm4gbmV3IENvbW1hbmRMaW5lKGNvbW1hbmRzKS5wYXJzZSgpO1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG5cbiAgICAvLyBBc3luYyBleGl0IGZvciBsb2cgcHJvY2Vzc2luZyB0byBvY2N1ciBiZWZvcmUgY3Jhc2hpbmdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwib3B0aW9uOnZlcmJvc2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBwcm9jZXNzLmVudi5WRVJCT1NFID0gdGhpcy52ZXJib3NlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdW5rbm93biBjb21tYW5kc1xuICAgIHRoaXMucHJvZ3JhbS5vbihcImNvbW1hbmQ6KlwiLCBhcmdzID0+IHtcbiAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0gPT09IFwiaGVscFwiKSB7XG4gICAgICAgIHRoaXMucHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlVua25vd24gc3ludGF4IGZvciBjb21tYW5kIGxpbmVcIiArIFwiXFxuXFxuU2VlIC0taGVscCBmb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBjb21tYW5kcy5cIik7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnByb2dyYW0pKTtcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnByb2dyYW0ub24oXCItLWhlbHBcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudmlyb25tZW50IHZhcmlhYmxlczpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgIC0gRU5UUllQT0lOVFxcdFxcdFxcdFNldHMgc2VydmVyIGVudHJ5cG9pbnQgZm9yIGV4ZWN1dGlvbi4gRGVmYXVsdHMgdG86IFwiLi9hcGkvc2VydmVyLnRzXCInKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgIC0gTk9ERV9FTlZcXHRcXHRcXHRTZXRzIHRoZSBlbnZpcm9ubWVudCB0byBydW4gdGhlIHNlcnZlci4gRGVmYXVsdHMgdG86IFwiZGV2ZWxvcG1lbnRcIicpO1xuICAgICAgY29uc29sZS5sb2coJyAgLSBQT1JUXFx0XFx0XFx0U2V0cyB0aGUgcG9ydCB0byBsaXN0ZW4gdG8uIERlZmF1bHRzIHRvOiBcIjMwMDBcIicpO1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkdldHRpbmcgc3RhcnRlZDpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHRzLWZyYW1ld29yayBuZXcgYXBwXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIgICQgY2QgYXBwL1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHlhcm4gc3RhcnRcIik7XG4gICAgfSk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=