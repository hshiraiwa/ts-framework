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
exports.DEFAULT_ENTRYPOINT = './api/server';
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
        const commandOpts = { entrypoint: exports.DEFAULT_ENTRYPOINT };
        this.commands = commands || [
            new commands_1.ListenCommand(commandOpts),
            new commands_1.GenerateCommand(commandOpts),
            new commands_1.ConsoleCommand(commandOpts),
            new commands_1.RunCommand(commandOpts),
            new commands_1.WatchCommand(commandOpts),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFDakMsNkRBQTZEO0FBRTdELHlDQUFzRztBQU16RixRQUFBLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztBQUVqRCxNQUFxQixXQUFXO0lBSzlCLFlBQVksUUFBd0IsRUFBRSxPQUE0QjtRQUNoRSxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRW5ELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLE1BQU0sV0FBVyxHQUFHLEVBQUUsVUFBVSxFQUFFLDBCQUFrQixFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUk7WUFDMUIsSUFBSSx3QkFBYSxDQUFDLFdBQVcsQ0FBQztZQUM5QixJQUFJLDBCQUFlLENBQUMsV0FBVyxDQUFDO1lBQ2hDLElBQUkseUJBQWMsQ0FBQyxXQUFXLENBQUM7WUFDL0IsSUFBSSxxQkFBVSxDQUFDLFdBQVcsQ0FBQztZQUMzQixJQUFJLHVCQUFZLENBQUMsV0FBVyxDQUFDO1NBQzlCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBd0I7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aW4vZW52IG5vZGVcblxuaW1wb3J0ICogYXMgQ29tbWFuZGVyIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSwgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBSdW5Db21tYW5kLCBXYXRjaENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRMaW5lT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FTlRSWVBPSU5UID0gJy4vYXBpL3NlcnZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgb3B0aW9ucz86IENvbW1hbmRMaW5lT3B0aW9ucykge1xuICAgIC8vIEluaXRpYWxpemUgQ29tbWFuZGVyIGluc3RhbmNlXG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pXG4gICAgICAub3B0aW9uKFwiLXYsIC0tdmVyYm9zZVwiLCBcImVuYWJsZXMgdmVyYm9zZSBtb2RlXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXJcbiAgICB0aGlzLmxvZ2dlciA9IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IGNvbW1hbmRzXG4gICAgY29uc3QgY29tbWFuZE9wdHMgPSB7IGVudHJ5cG9pbnQ6IERFRkFVTFRfRU5UUllQT0lOVCB9O1xuICAgIHRoaXMuY29tbWFuZHMgPSBjb21tYW5kcyB8fCBbXG4gICAgICBuZXcgTGlzdGVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgR2VuZXJhdGVDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBDb25zb2xlQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgUnVuQ29tbWFuZChjb21tYW5kT3B0cyksXG4gICAgICBuZXcgV2F0Y2hDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICBdO1xuXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSkge1xuICAgIHJldHVybiBuZXcgQ29tbWFuZExpbmUoY29tbWFuZHMpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcblxuICAgIC8vIEFzeW5jIGV4aXQgZm9yIGxvZyBwcm9jZXNzaW5nIHRvIG9jY3VyIGJlZm9yZSBjcmFzaGluZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCA1MDApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gSGFuZGxlIHZlcmJub3NlIG1vZGVcbiAgICB0aGlzLnByb2dyYW0ub24oXCJvcHRpb246dmVyYm9zZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9jZXNzLmVudi5WRVJCT1NFID0gdGhpcy52ZXJib3NlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgVFMgTm9kZSBpcyBhdmFpbGFibGVcbiAgICB0cnkge1xuICAgICAgcmVxdWlyZShcInRzLW5vZGUvcmVnaXN0ZXIvdHJhbnNwaWxlLW9ubHlcIik7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGV4Y2VwdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdW5rbm93biBjb21tYW5kc1xuICAgIHRoaXMucHJvZ3JhbS5vbihcImNvbW1hbmQ6KlwiLCBhcmdzID0+IHtcbiAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0gPT09IFwiaGVscFwiKSB7XG4gICAgICAgIHRoaXMucHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcIlVua25vd24gc3ludGF4IGZvciBjb21tYW5kIGxpbmVcIiArIFwiXFxuXFxuU2VlIC0taGVscCBmb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBjb21tYW5kcy5cIik7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICAvLyBCaW5kIGFsbCBjb21tYW5kcyB0byBjdXJyZW50IHByb2dyYW1cbiAgICB0aGlzLmNvbW1hbmRzLm1hcChjbWQgPT4gY21kLm9uUHJvZ3JhbSh0aGlzLnByb2dyYW0pKTtcblxuICAgIC8vIFByZXBhcmUgYWRkaXRpb25hbCBpbmZvIGluIGhlbHBcbiAgICB0aGlzLnByb2dyYW0ub24oXCItLWhlbHBcIiwgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkVudmlyb25tZW50IHZhcmlhYmxlczpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKCcgIC0gTk9ERV9FTlZcXHRTZXRzIHRoZSBlbnZpcm9ubWVudCB0byBydW4gdGhlIHNlcnZlci4gRGVmYXVsdHMgdG86IFwiZGV2ZWxvcG1lbnRcIicpO1xuICAgICAgY29uc29sZS5sb2coJyAgLSBQT1JUXFx0XFx0U2V0cyB0aGUgcG9ydCB0byBsaXN0ZW4gdG8uIERlZmF1bHRzIHRvOiBcIjMwMDBcIicpO1xuICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIkdldHRpbmcgc3RhcnRlZDpcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHRzLWZyYW1ld29yayBuZXcgYXBwXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIgICQgY2QgYXBwL1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiICAkIHlhcm4gc3RhcnRcIik7XG4gICAgfSk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=