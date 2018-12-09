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
                .option("-d, --development", "Starts server without production flags")
                .action((entrypoint = "./api/server.ts", options = {}) => new commands_1.ListenCommand().run({
                entrypoint,
                env: options.development ? "development" : "production"
            }));
            this.program
                .command("console [entrypoint]")
                .description("Run interactive console")
                .action((entrypoint = "./api/server.ts") => new commands_1.ConsoleCommand().run({ entrypoint }));
            this.program
                .command("run [entrypoint]")
                .option("-d, --development", "Starts server without production flags")
                .description("Runs the server components without lifting express")
                .action((entrypoint = "./api/server.ts", options = {}) => new commands_1.RunCommand().run({
                entrypoint,
                env: options.development ? "development" : "production"
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMseUNBQXNHO0FBRXRHLE1BQXFCLFdBQVc7SUFJOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDekY7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNwRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2lCQUM5QixXQUFXLENBQUMscUNBQXFDLENBQUM7aUJBQ2xELE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztpQkFDckUsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLGlCQUFpQixFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUN2RCxJQUFJLHdCQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLFVBQVU7Z0JBQ1YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsWUFBWTthQUN4RCxDQUFDLENBQ0gsQ0FBQztZQUVKLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0IsV0FBVyxDQUFDLHlCQUF5QixDQUFDO2lCQUN0QyxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsT0FBTztpQkFDVCxPQUFPLENBQUMsa0JBQWtCLENBQUM7aUJBQzNCLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQztpQkFDckUsV0FBVyxDQUFDLG9EQUFvRCxDQUFDO2lCQUNqRSxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQ3ZELElBQUkscUJBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDbkIsVUFBVTtnQkFDVixHQUFHLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZO2FBQ3hELENBQUMsQ0FDSCxDQUFDO1lBRUosSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLG9CQUFvQixDQUFDO2lCQUM3QixXQUFXLENBQUMsNkNBQTZDLENBQUM7aUJBQzFELE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx1QkFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXRGLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztpQkFDakMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLHNEQUFzRCxDQUFDO2lCQUNwRixXQUFXLENBQUMsc0NBQXNDLENBQUM7aUJBQ25ELE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQ3hDLElBQUksMEJBQWUsRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDeEIsSUFBSTtnQkFDSixTQUFTO2dCQUNULFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVzthQUNqQyxDQUFDLENBQ0gsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBekZELDhCQXlGQztBQUVELFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGUgLS1oYXJtb255XG5cbmltcG9ydCAqIGFzIENvbW1hbmRlciBmcm9tIFwiY29tbWFuZGVyXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IHsgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgQ29uc29sZUNvbW1hbmQsIEdlbmVyYXRlQ29tbWFuZCwgTGlzdGVuQ29tbWFuZCwgV2F0Y2hDb21tYW5kLCBSdW5Db21tYW5kIH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZExpbmUge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvZ3JhbSA9IENvbW1hbmRlci5uYW1lKFBhY2thZ2UubmFtZSlcbiAgICAgIC52ZXJzaW9uKFBhY2thZ2UudmVyc2lvbilcbiAgICAgIC5kZXNjcmlwdGlvbihQYWNrYWdlLmRlc2NyaXB0aW9uKTtcblxuICAgIHRoaXMub25Nb3VudCgpLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZSgpIHtcbiAgICBuZXcgQ29tbWFuZExpbmUoKS5wYXJzZSgpO1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3IoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Nb3VudCgpIHtcbiAgICAvLyBIYW5kbGUgdmVyYm5vc2UgbW9kZVxuICAgIHRoaXMucHJvZ3JhbS5vbihcIm9wdGlvbjp2ZXJib3NlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcHJvY2Vzcy5lbnYuVkVSQk9TRSA9IHRoaXMudmVyYm9zZTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRzTm9kZSA9IHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKGV4Y2VwdGlvbik7XG4gICAgICBjb25zb2xlLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiY29tbWFuZDoqXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHN5bnRheCBmb3IgY29tbWFuZCBsaW5lXCIgKyBcIlxcblNlZSAtLWhlbHAgZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcImxpc3RlbiBbZW50cnlwb2ludF1cIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1bnMgdGhlIHNlcnZlciBpbiBhIHNpbmdsZSBwcm9jZXNzXCIpXG4gICAgICAub3B0aW9uKFwiLWQsIC0tZGV2ZWxvcG1lbnRcIiwgXCJTdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFnc1wiKVxuICAgICAgLmFjdGlvbigoZW50cnlwb2ludCA9IFwiLi9hcGkvc2VydmVyLnRzXCIsIG9wdGlvbnMgPSB7fSkgPT5cbiAgICAgICAgbmV3IExpc3RlbkNvbW1hbmQoKS5ydW4oe1xuICAgICAgICAgIGVudHJ5cG9pbnQsXG4gICAgICAgICAgZW52OiBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogXCJwcm9kdWN0aW9uXCJcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwiY29uc29sZSBbZW50cnlwb2ludF1cIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1biBpbnRlcmFjdGl2ZSBjb25zb2xlXCIpXG4gICAgICAuYWN0aW9uKChlbnRyeXBvaW50ID0gXCIuL2FwaS9zZXJ2ZXIudHNcIikgPT4gbmV3IENvbnNvbGVDb21tYW5kKCkucnVuKHsgZW50cnlwb2ludCB9KSk7XG5cbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwicnVuIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLm9wdGlvbihcIi1kLCAtLWRldmVsb3BtZW50XCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1bnMgdGhlIHNlcnZlciBjb21wb25lbnRzIHdpdGhvdXQgbGlmdGluZyBleHByZXNzXCIpXG4gICAgICAuYWN0aW9uKChlbnRyeXBvaW50ID0gXCIuL2FwaS9zZXJ2ZXIudHNcIiwgb3B0aW9ucyA9IHt9KSA9PlxuICAgICAgICBuZXcgUnVuQ29tbWFuZCgpLnJ1bih7XG4gICAgICAgICAgZW50cnlwb2ludCxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBcInByb2R1Y3Rpb25cIlxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJ3YXRjaCBbZW50cnlwb2ludF1cIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1biB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyIHdpdGggbGl2ZSByZWxvYWRcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSBcIi4vYXBpL3NlcnZlci50c1wiKSA9PiBuZXcgV2F0Y2hDb21tYW5kKCkucnVuKHsgZW50cnlwb2ludCB9KSk7XG5cbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiKVxuICAgICAgLm9wdGlvbihcIi1zLCAtLXNraXAtaW5zdGFsbFwiLCBcIlNraXBzIHlhcm4gaW5zdGFsbGF0aW9uIGFuZCBwb3N0IGdlbmVyYXRpb24gcm91dGluZXNcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgcHJvamVjdFwiKVxuICAgICAgLmFjdGlvbigoY29tcG9uZW50LCBuYW1lLCBvcHRpb25zID0ge30pID0+XG4gICAgICAgIG5ldyBHZW5lcmF0ZUNvbW1hbmQoKS5ydW4oe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgY29tcG9uZW50LFxuICAgICAgICAgIHNraXBJbnN0YWxsOiBvcHRpb25zLnNraXBJbnN0YWxsXG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcGFyc2UoKSB7XG4gICAgdGhpcy5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gIH1cbn1cblxuQ29tbWFuZExpbmUuaW5pdGlhbGl6ZSgpO1xuIl19