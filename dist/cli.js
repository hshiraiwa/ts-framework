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
                .command("console")
                .description("Run interactive console")
                .action(() => new commands_1.ConsoleCommand().run({}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMseUNBQTZEO0FBRTdELE1BQXFCLFdBQVc7SUFJOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVU7UUFDdEIsSUFBSSxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sT0FBTyxDQUFDLEtBQUs7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFWSxPQUFPOztZQUNsQix1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCw2QkFBNkI7WUFDN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7YUFDekY7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNwRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLFNBQVMsQ0FBQztpQkFDbEIsV0FBVyxDQUFDLHlCQUF5QixDQUFDO2lCQUN0QyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSx5QkFBYyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLHdCQUF3QixDQUFDO2lCQUNqQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsc0RBQXNELENBQUM7aUJBQ3BGLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQztpQkFDbkQsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLDBCQUFlLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ25FLElBQUk7Z0JBQ0osU0FBUztnQkFDVCxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7YUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO0tBQUE7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQTVERCw4QkE0REM7QUFFRCxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlIC0taGFybW9ueVxuXG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IENvbnNvbGVDb21tYW5kLCBHZW5lcmF0ZUNvbW1hbmQgfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kTGluZSB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwcm90ZWN0ZWQgcHJvZ3JhbTogQ29tbWFuZGVyLkNvbW1hbmQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9ncmFtID0gQ29tbWFuZGVyLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgIG5ldyBDb21tYW5kTGluZSgpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwib3B0aW9uOnZlcmJvc2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5lbnYuVkVSQk9TRSA9IHRoaXMudmVyYm9zZTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIFRTIE5vZGUgaXMgYXZhaWxhYmxlXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRzTm9kZSA9IHJlcXVpcmUoXCJ0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5XCIpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKGV4Y2VwdGlvbik7XG4gICAgICBjb25zb2xlLndhcm4oXCJcXG5cXG5XQVJOOiBUUyBOb2RlIGlzIG5vdCBhdmFpbGFibGUsIHR5cGVzY3JpcHQgZmlsZXMgd29uJ3QgYmUgc3VwcG9ydGVkXCIpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKFwiY29tbWFuZDoqXCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHN5bnRheCBmb3IgY29tbWFuZCBsaW5lXCIgKyBcIlxcblNlZSAtLWhlbHAgZm9yIGEgbGlzdCBvZiBhdmFpbGFibGUgY29tbWFuZHMuXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcImNvbnNvbGVcIilcbiAgICAgIC5kZXNjcmlwdGlvbihcIlJ1biBpbnRlcmFjdGl2ZSBjb25zb2xlXCIpXG4gICAgICAuYWN0aW9uKCgpID0+IG5ldyBDb25zb2xlQ29tbWFuZCgpLnJ1bih7fSkpO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZChcIm5ldyA8Y29tcG9uZW50PiBbbmFtZV1cIilcbiAgICAgIC5vcHRpb24oXCItcywgLS1za2lwLWluc3RhbGxcIiwgXCJTa2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzXCIpXG4gICAgICAuZGVzY3JpcHRpb24oXCJHZW5lcmF0ZXMgYSBuZXcgVFMgRnJhbWV3b3JrIHByb2plY3RcIilcbiAgICAgIC5hY3Rpb24oKGNvbXBvbmVudCwgbmFtZSwgb3B0aW9ucyA9IHt9KSA9PiBuZXcgR2VuZXJhdGVDb21tYW5kKCkucnVuKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY29tcG9uZW50LFxuICAgICAgICBza2lwSW5zdGFsbDogb3B0aW9ucy5za2lwSW5zdGFsbFxuICAgICAgfSkpO1xuICB9XG5cbiAgcGFyc2UoKSB7XG4gICAgdGhpcy5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gIH1cbn1cblxuQ29tbWFuZExpbmUuaW5pdGlhbGl6ZSgpO1xuIl19