#!/usr/bin/env node --harmony
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
const commands_1 = require("./commands");
class CommandLine {
    constructor() {
        this.program = Commander.name(Package.name)
            .version(Package.version)
            .description(Package.description);
        this.onMount().catch(this.onError.bind(this));
    }
    static initialize() {
        new CommandLine().parse();
    }
    onError(error) {
        console.error(error);
        process.exit(1);
    }
    onMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle verbnose mode
            this.program.on("option:verbose", function () {
                process.env.VERBOSE = this.verbose;
            });
            // Check TS Node is available
            try {
                const tsNode = require("ts-node/register/transpile-only");
            }
            catch (exception) {
                console.warn(exception);
                console.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
            }
            // Handle unknown commands
            this.program.on("command:*", () => {
                console.error("Invalid syntax for command line" + "\nSee --help for a list of available commands.");
                process.exit(1);
            });
            this.program
                .command("listen [entrypoint]")
                .description("Runs the server in a single process")
                .option('-d, --development', 'Starts server without production flags')
                .action((entrypoint = "./api/server.ts", options = {}) => new commands_1.ListenCommand().run({
                entrypoint,
                env: options.development ? 'development' : 'production',
            }));
            this.program
                .command("console [entrypoint]")
                .description("Run interactive console")
                .action((entrypoint = "./api/server.ts") => new commands_1.ConsoleCommand().run({ entrypoint }));
            this.program
                .command("run [entrypoint]")
                .option('-d, --development', 'Starts server without production flags')
                .description("Runs the server components without lifting express")
                .action((entrypoint = "./api/server.ts") => new commands_1.RunCommand().run({ entrypoint }));
            this.program
                .command("watch [entrypoint]")
                .description("Run the development server with live reload")
                .action((entrypoint = "./api/server.ts") => new commands_1.WatchCommand().run({ entrypoint }));
            this.program
                .command("new <component> [name]")
                .option("-s, --skip-install", "Skips yarn installation and post generation routines")
                .description("Generates a new TS Framework project")
                .action((component, name, options = {}) => new commands_1.GenerateCommand().run({
                name,
                component,
                skipInstall: options.skipInstall
            }));
        });
    }
    parse() {
        this.program.parse(process.argv);
    }
}
exports.default = CommandLine;
CommandLine.initialize();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMseUNBQXNHO0FBRXRHLE1BQXFCLFdBQVc7SUFJOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDekY7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNwRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2lCQUM5QixXQUFXLENBQUMscUNBQXFDLENBQUM7aUJBQ2xELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztpQkFDckUsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLGlCQUFpQixFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksd0JBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDaEYsVUFBVTtnQkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZO2FBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRU4sSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2lCQUMvQixXQUFXLENBQUMseUJBQXlCLENBQUM7aUJBQ3RDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx5QkFBYyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXhGLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztpQkFDM0IsTUFBTSxDQUFDLG1CQUFtQixFQUFFLHdDQUF3QyxDQUFDO2lCQUNyRSxXQUFXLENBQUMsb0RBQW9ELENBQUM7aUJBQ2pFLE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxxQkFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBGLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztpQkFDN0IsV0FBVyxDQUFDLDZDQUE2QyxDQUFDO2lCQUMxRCxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksdUJBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV0RixJQUFJLENBQUMsT0FBTztpQkFDVCxPQUFPLENBQUMsd0JBQXdCLENBQUM7aUJBQ2pDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxzREFBc0QsQ0FBQztpQkFDcEYsV0FBVyxDQUFDLHNDQUFzQyxDQUFDO2lCQUNuRCxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN4QyxJQUFJLDBCQUFlLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLElBQUk7Z0JBQ0osU0FBUztnQkFDVCxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7YUFDakMsQ0FBQyxDQUNILENBQUM7UUFDTixDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQWxGRCw4QkFrRkM7QUFFRCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlIC0taGFybW9ueVxuXG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IENvbnNvbGVDb21tYW5kLCBHZW5lcmF0ZUNvbW1hbmQsIExpc3RlbkNvbW1hbmQsIFdhdGNoQ29tbWFuZCwgUnVuQ29tbWFuZCB9IGZyb20gXCIuL2NvbW1hbmRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHByb3RlY3RlZCBwcm9ncmFtOiBDb21tYW5kZXIuQ29tbWFuZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2dyYW0gPSBDb21tYW5kZXIubmFtZShQYWNrYWdlLm5hbWUpXG4gICAgICAudmVyc2lvbihQYWNrYWdlLnZlcnNpb24pXG4gICAgICAuZGVzY3JpcHRpb24oUGFja2FnZS5kZXNjcmlwdGlvbik7XG5cbiAgICB0aGlzLm9uTW91bnQoKS5jYXRjaCh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKSB7XG4gICAgbmV3IENvbW1hbmRMaW5lKCkucGFyc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uTW91bnQoKSB7XG4gICAgLy8gSGFuZGxlIHZlcmJub3NlIG1vZGVcbiAgICB0aGlzLnByb2dyYW0ub24oXCJvcHRpb246dmVyYm9zZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHByb2Nlc3MuZW52LlZFUkJPU0UgPSB0aGlzLnZlcmJvc2U7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0c05vZGUgPSByZXF1aXJlKFwidHMtbm9kZS9yZWdpc3Rlci90cmFuc3BpbGUtb25seVwiKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIGNvbnNvbGUud2FybihleGNlcHRpb24pO1xuICAgICAgY29uc29sZS53YXJuKFwiXFxuXFxuV0FSTjogVFMgTm9kZSBpcyBub3QgYXZhaWxhYmxlLCB0eXBlc2NyaXB0IGZpbGVzIHdvbid0IGJlIHN1cHBvcnRlZFwiKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdW5rbm93biBjb21tYW5kc1xuICAgIHRoaXMucHJvZ3JhbS5vbihcImNvbW1hbmQ6KlwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBzeW50YXggZm9yIGNvbW1hbmQgbGluZVwiICsgXCJcXG5TZWUgLS1oZWxwIGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLlwiKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJsaXN0ZW4gW2VudHJ5cG9pbnRdXCIpXG4gICAgICAuZGVzY3JpcHRpb24oXCJSdW5zIHRoZSBzZXJ2ZXIgaW4gYSBzaW5nbGUgcHJvY2Vzc1wiKVxuICAgICAgLm9wdGlvbignLWQsIC0tZGV2ZWxvcG1lbnQnLCAnU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3MnKVxuICAgICAgLmFjdGlvbigoZW50cnlwb2ludCA9IFwiLi9hcGkvc2VydmVyLnRzXCIsIG9wdGlvbnMgPSB7fSkgPT4gbmV3IExpc3RlbkNvbW1hbmQoKS5ydW4oeyBcbiAgICAgICAgZW50cnlwb2ludCxcbiAgICAgICAgZW52OiBvcHRpb25zLmRldmVsb3BtZW50ID8gJ2RldmVsb3BtZW50JyA6ICdwcm9kdWN0aW9uJyxcbiAgICAgIH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJjb25zb2xlIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVuIGludGVyYWN0aXZlIGNvbnNvbGVcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSBcIi4vYXBpL3NlcnZlci50c1wiKSA9PiBuZXcgQ29uc29sZUNvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcbiAgICBcbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwicnVuIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLm9wdGlvbignLWQsIC0tZGV2ZWxvcG1lbnQnLCAnU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3MnKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSBcIi4vYXBpL3NlcnZlci50c1wiKSA9PiBuZXcgUnVuQ29tbWFuZCgpLnJ1bih7IGVudHJ5cG9pbnQgfSkpO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcIndhdGNoIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVuIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIgd2l0aCBsaXZlIHJlbG9hZFwiKVxuICAgICAgLmFjdGlvbigoZW50cnlwb2ludCA9IFwiLi9hcGkvc2VydmVyLnRzXCIpID0+IG5ldyBXYXRjaENvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJuZXcgPGNvbXBvbmVudD4gW25hbWVdXCIpXG4gICAgICAub3B0aW9uKFwiLXMsIC0tc2tpcC1pbnN0YWxsXCIsIFwiU2tpcHMgeWFybiBpbnN0YWxsYXRpb24gYW5kIHBvc3QgZ2VuZXJhdGlvbiByb3V0aW5lc1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiR2VuZXJhdGVzIGEgbmV3IFRTIEZyYW1ld29yayBwcm9qZWN0XCIpXG4gICAgICAuYWN0aW9uKChjb21wb25lbnQsIG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cbiAgICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZCgpLnJ1bih7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgc2tpcEluc3RhbGw6IG9wdGlvbnMuc2tpcEluc3RhbGxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=