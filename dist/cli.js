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
                .description("Runs the server in production mode")
                .action((entrypoint = './api/server.ts') => new commands_1.ListenCommand().run({ entrypoint }));
            this.program
                .command("console [entrypoint]")
                .description("Run interactive console")
                .action((entrypoint = './api/server.ts') => new commands_1.ConsoleCommand().run({ entrypoint }));
            this.program
                .command("watch [entrypoint]")
                .description("Run the development server with live reload")
                .action((entrypoint = './api/server.ts') => new commands_1.WatchCommand().run({ entrypoint }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMseUNBQTBGO0FBRTFGLE1BQXFCLFdBQVc7SUFJOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDekY7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNwRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHFCQUFxQixDQUFDO2lCQUM5QixXQUFXLENBQUMsb0NBQW9DLENBQUM7aUJBQ2pELE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSx3QkFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZGLElBQUksQ0FBQyxPQUFPO2lCQUNULE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztpQkFDL0IsV0FBVyxDQUFDLHlCQUF5QixDQUFDO2lCQUN0QyxNQUFNLENBQUMsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUkseUJBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV4RixJQUFJLENBQUMsT0FBTztpQkFDVCxPQUFPLENBQUMsb0JBQW9CLENBQUM7aUJBQzdCLFdBQVcsQ0FBQyw2Q0FBNkMsQ0FBQztpQkFDMUQsTUFBTSxDQUFDLENBQUMsVUFBVSxHQUFHLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLHVCQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdEYsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHdCQUF3QixDQUFDO2lCQUNqQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsc0RBQXNELENBQUM7aUJBQ3BGLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQztpQkFDbkQsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FDeEMsSUFBSSwwQkFBZSxFQUFFLENBQUMsR0FBRyxDQUFDO2dCQUN4QixJQUFJO2dCQUNKLFNBQVM7Z0JBQ1QsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2FBQ2pDLENBQUMsQ0FDSCxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUF4RUQsOEJBd0VDO0FBRUQsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZSAtLWhhcm1vbnlcblxuaW1wb3J0ICogYXMgQ29tbWFuZGVyIGZyb20gXCJjb21tYW5kZXJcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBDb25zb2xlQ29tbWFuZCwgR2VuZXJhdGVDb21tYW5kLCBMaXN0ZW5Db21tYW5kLCBXYXRjaENvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwcm90ZWN0ZWQgcHJvZ3JhbTogQ29tbWFuZGVyLkNvbW1hbmQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgIG5ldyBDb21tYW5kTGluZSgpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwib3B0aW9uOnZlcmJvc2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5lbnYuVkVSQk9TRSA9IHRoaXMudmVyYm9zZTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRzTm9kZSA9IHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKGV4Y2VwdGlvbik7XG4gICAgICBjb25zb2xlLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiY29tbWFuZDoqXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHN5bnRheCBmb3IgY29tbWFuZCBsaW5lXCIgKyBcIlxcblNlZSAtLWhlbHAgZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcImxpc3RlbiBbZW50cnlwb2ludF1cIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1bnMgdGhlIHNlcnZlciBpbiBwcm9kdWN0aW9uIG1vZGVcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSAnLi9hcGkvc2VydmVyLnRzJykgPT4gbmV3IExpc3RlbkNvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJjb25zb2xlIFtlbnRyeXBvaW50XVwiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiUnVuIGludGVyYWN0aXZlIGNvbnNvbGVcIilcbiAgICAgIC5hY3Rpb24oKGVudHJ5cG9pbnQgPSAnLi9hcGkvc2VydmVyLnRzJykgPT4gbmV3IENvbnNvbGVDb21tYW5kKCkucnVuKHsgZW50cnlwb2ludCB9KSk7XG5cbiAgICB0aGlzLnByb2dyYW1cbiAgICAgIC5jb21tYW5kKFwid2F0Y2ggW2VudHJ5cG9pbnRdXCIpXG4gICAgICAuZGVzY3JpcHRpb24oXCJSdW4gdGhlIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGxpdmUgcmVsb2FkXCIpXG4gICAgICAuYWN0aW9uKChlbnRyeXBvaW50ID0gJy4vYXBpL3NlcnZlci50cycpID0+IG5ldyBXYXRjaENvbW1hbmQoKS5ydW4oeyBlbnRyeXBvaW50IH0pKTtcblxuICAgIHRoaXMucHJvZ3JhbVxuICAgICAgLmNvbW1hbmQoXCJuZXcgPGNvbXBvbmVudD4gW25hbWVdXCIpXG4gICAgICAub3B0aW9uKFwiLXMsIC0tc2tpcC1pbnN0YWxsXCIsIFwiU2tpcHMgeWFybiBpbnN0YWxsYXRpb24gYW5kIHBvc3QgZ2VuZXJhdGlvbiByb3V0aW5lc1wiKVxuICAgICAgLmRlc2NyaXB0aW9uKFwiR2VuZXJhdGVzIGEgbmV3IFRTIEZyYW1ld29yayBwcm9qZWN0XCIpXG4gICAgICAuYWN0aW9uKChjb21wb25lbnQsIG5hbWUsIG9wdGlvbnMgPSB7fSkgPT5cbiAgICAgICAgbmV3IEdlbmVyYXRlQ29tbWFuZCgpLnJ1bih7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgc2tpcEluc3RhbGw6IG9wdGlvbnMuc2tpcEluc3RhbGxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwYXJzZSgpIHtcbiAgICB0aGlzLnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiAgfVxufVxuXG5Db21tYW5kTGluZS5pbml0aWFsaXplKCk7XG4iXX0=