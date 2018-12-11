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
        const Package = require('../package.json');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2Qyw2REFBNkQ7QUFFN0QseUNBQXNHO0FBTXpGLFFBQUEsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDO0FBQzlELFFBQUEsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztBQUNwRCxRQUFBLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFFckQsTUFBcUIsV0FBVztJQUs5QixZQUFZLFFBQXdCLEVBQUUsT0FBNEI7UUFDaEUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFM0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ3hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2FBQ2hDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUVuRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5DLDBCQUEwQjtRQUMxQixNQUFNLFdBQVcsR0FBRztZQUNsQixVQUFVLEVBQUUsMEJBQWtCO1lBQzlCLElBQUksRUFBRSxvQkFBWTtZQUNsQixHQUFHLEVBQUUsbUJBQVc7U0FDakIsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSTtZQUMxQixJQUFJLHdCQUFhLENBQUMsV0FBVyxDQUFDO1lBQzlCLElBQUksMEJBQWUsQ0FBQyxXQUFX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QUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoR0QsOEJBZ0dDO0FBRUQsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ29uc29sZUNvbW1hbmQsIEdlbmVyYXRlQ29tbWFuZCwgTGlzdGVuQ29tbWFuZCwgUnVuQ29tbWFuZCwgV2F0Y2hDb21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTGluZU9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5UUllQT0lOVCA9IHByb2Nlc3MuZW52LkVOVFJZUE9JTlQgfHwgXCIuL2FwaS9zZXJ2ZXJcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0VOViA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IFwiZGV2ZWxvcG1lbnRcIjtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBjb21tYW5kczogQmFzZUNvbW1hbmRbXTtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSwgb3B0aW9ucz86IENvbW1hbmRMaW5lT3B0aW9ucykge1xuICAgIGNvbnN0IFBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcblxuICAgIC8vIEluaXRpYWxpemUgQ29tbWFuZGVyIGluc3RhbmNlXG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pXG4gICAgICAub3B0aW9uKFwiLXYsIC0tdmVyYm9zZVwiLCBcImVuYWJsZXMgdmVyYm9zZSBtb2RlXCIpO1xuXG4gICAgLy8gUHJlcGFyZSBsb2dnZXJcbiAgICB0aGlzLmxvZ2dlciA9IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gUHJlcGFyZSBjb21tYW5kIG9wdGlvbnNcbiAgICBjb25zdCBjb21tYW5kT3B0cyA9IHtcbiAgICAgIGVudHJ5cG9pbnQ6IERFRkFVTFRfRU5UUllQT0lOVCxcbiAgICAgIHBvcnQ6IERFRkFVTFRfUE9SVCxcbiAgICAgIGVudjogREVGQVVMVF9FTlZcbiAgICB9O1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBkZWZhdWx0IGNvbW1hbmRzXG4gICAgdGhpcy5jb21tYW5kcyA9IGNvbW1hbmRzIHx8IFtcbiAgICAgIG5ldyBMaXN0ZW5Db21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBHZW5lcmF0ZUNvbW1hbmQoY29tbWFuZE9wdHMpLFxuICAgICAgbmV3IENvbnNvbGVDb21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBSdW5Db21tYW5kKGNvbW1hbmRPcHRzKSxcbiAgICAgIG5ldyBXYXRjaENvbW1hbmQoY29tbWFuZE9wdHMpXG4gICAgXTtcblxuICAgIC8vIFN0YXJ0cyBjb21tYW5kIG1vdW50aW5nXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKGNvbW1hbmRzPzogQmFzZUNvbW1hbmRbXSkge1xuICAgIHJldHVybiBuZXcgQ29tbWFuZExpbmUoY29tbWFuZHMpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcblxuICAgIC8vIEFzeW5jIGV4aXQgZm9yIGxvZyBwcm9jZXNzaW5nIHRvIG9jY3VyIGJlZm9yZSBjcmFzaGluZ1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCA1MDApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gSGFuZGxlIHZlcmJub3NlIG1vZGVcbiAgICB0aGlzLnByb2dyYW0ub24oXCJvcHRpb246dmVyYm9zZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHByb2Nlc3MuZW52LlZFUkJPU0UgPSB0aGlzLnZlcmJvc2U7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICByZXF1aXJlKFwidHMtbm9kZS9yZWdpc3Rlci90cmFuc3BpbGUtb25seVwiKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oZXhjZXB0aW9uKTtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiY29tbWFuZDoqXCIsIGFyZ3MgPT4ge1xuICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGggJiYgYXJnc1swXSA9PT0gXCJoZWxwXCIpIHtcbiAgICAgICAgdGhpcy5wcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVW5rbm93biBzeW50YXggZm9yIGNvbW1hbmQgbGluZVwiICsgXCJcXG5cXG5TZWUgLS1oZWxwIGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLlwiKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcblxuICAgIC8vIEJpbmQgYWxsIGNvbW1hbmRzIHRvIGN1cnJlbnQgcHJvZ3JhbVxuICAgIHRoaXMuY29tbWFuZHMubWFwKGNtZCA9PiBjbWQub25Qcm9ncmFtKHRoaXMucHJvZ3JhbSkpO1xuXG4gICAgLy8gUHJlcGFyZSBhZGRpdGlvbmFsIGluZm8gaW4gaGVscFxuICAgIHRoaXMucHJvZ3JhbS5vbihcIi0taGVscFwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiRW52aXJvbm1lbnQgdmFyaWFibGVzOlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgY29uc29sZS5sb2coJyAgLSBFTlRSWVBPSU5UXFx0XFx0XFx0U2V0cyBzZXJ2ZXIgZW50cnlwb2ludCBmb3IgZXhlY3V0aW9uLiBEZWZhdWx0cyB0bzogXCIuL2FwaS9zZXJ2ZXIudHNcIicpO1xuICAgICAgY29uc29sZS5sb2coJyAgLSBOT0RFX0VOVlxcdFxcdFxcdFNldHMgdGhlIGVudmlyb25tZW50IHRvIHJ1biB0aGUgc2VydmVyLiBEZWZhdWx0cyB0bzogXCJkZXZlbG9wbWVudFwiJyk7XG4gICAgICBjb25zb2xlLmxvZygnICAtIFBPUlRcXHRcXHRcXHRTZXRzIHRoZSBwb3J0IHRvIGxpc3RlbiB0by4gRGVmYXVsdHMgdG86IFwiMzAwMFwiJyk7XG4gICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiR2V0dGluZyBzdGFydGVkOlwiKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIgICQgdHMtZnJhbWV3b3JrIG5ldyBhcHBcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIiAgJCBjZCBhcHAvXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIgICQgeWFybiBzdGFydFwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBhcnNlKCkge1xuICAgIHRoaXMucHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkNvbW1hbmRMaW5lLmluaXRpYWxpemUoKTtcbiJdfQ==