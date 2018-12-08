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
const Package = require("pjson");
const Commander = require("commander");
const commands_1 = require("./commands");
class CommandLine {
    constructor() {
        this.program = Commander
            .name(Package.name)
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
            this.program.on('option:verbose', function () {
                process.env.VERBOSE = this.verbose;
            });
            // Check TS Node is available
            try {
                const tsNode = require('ts-node/register/transpile-only');
            }
            catch (exception) {
                console.warn(exception);
                console.warn('\n\nWARN: TS Node is not available, typescript files won\'t be supported');
            }
            // Handle unknown commands
            this.program.on('command:*', () => {
                console.error('Invalid syntax for command line' +
                    '\nSee --help for a list of available commands.');
                process.exit(1);
            });
            this.program
                .command('console')
                .description('Run interactive console')
                .action(new commands_1.ConsoleCommand().run);
        });
    }
    parse() {
        this.program.parse(process.argv);
    }
}
exports.default = CommandLine;
CommandLine.initialize();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLGlDQUFpQztBQUNqQyx1Q0FBdUM7QUFDdkMseUNBQTRDO0FBRTVDLE1BQXFCLFdBQVc7SUFHOUI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVM7YUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7YUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVO1FBQ3RCLElBQUksV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRVksT0FBTzs7WUFDbEIsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBRUgsNkJBQTZCO1lBQzdCLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7YUFDMUQ7WUFBQyxPQUFNLFNBQVMsRUFBRTtnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQywwRUFBMEUsQ0FBQyxDQUFDO2FBQzFGO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDO29CQUM3QyxnREFBZ0QsQ0FDakQsQ0FBQztnQkFDRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU87aUJBQ1QsT0FBTyxDQUFDLFNBQVMsQ0FBQztpQkFDbEIsV0FBVyxDQUFDLHlCQUF5QixDQUFDO2lCQUN0QyxNQUFNLENBQUMsSUFBSSx5QkFBYyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0NBQ0Y7QUFwREQsOEJBb0RDO0FBRUQsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZSAtLWhhcm1vbnlcblxuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tICdwanNvbic7XG5pbXBvcnQgKiBhcyBDb21tYW5kZXIgZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7IENvbnNvbGVDb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRMaW5lIHtcbiAgcHJvdGVjdGVkIHByb2dyYW06IENvbW1hbmRlci5Db21tYW5kO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvZ3JhbSA9IENvbW1hbmRlclxuICAgICAgLm5hbWUoUGFja2FnZS5uYW1lKVxuICAgICAgLnZlcnNpb24oUGFja2FnZS52ZXJzaW9uKVxuICAgICAgLmRlc2NyaXB0aW9uKFBhY2thZ2UuZGVzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5vbk1vdW50KCkuY2F0Y2godGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCkge1xuICAgIG5ldyBDb21tYW5kTGluZSgpLnBhcnNlKCk7XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbk1vdW50KCkge1xuICAgIC8vIEhhbmRsZSB2ZXJibm9zZSBtb2RlXG4gICAgdGhpcy5wcm9ncmFtLm9uKCdvcHRpb246dmVyYm9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MuZW52LlZFUkJPU0UgPSB0aGlzLnZlcmJvc2U7XG4gICAgfSk7XG5cbiAgICAvLyBDaGVjayBUUyBOb2RlIGlzIGF2YWlsYWJsZVxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0c05vZGUgPSByZXF1aXJlKCd0cy1ub2RlL3JlZ2lzdGVyL3RyYW5zcGlsZS1vbmx5JylcbiAgICB9IGNhdGNoKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKGV4Y2VwdGlvbik7XG4gICAgICBjb25zb2xlLndhcm4oJ1xcblxcbldBUk46IFRTIE5vZGUgaXMgbm90IGF2YWlsYWJsZSwgdHlwZXNjcmlwdCBmaWxlcyB3b25cXCd0IGJlIHN1cHBvcnRlZCcpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1bmtub3duIGNvbW1hbmRzXG4gICAgdGhpcy5wcm9ncmFtLm9uKCdjb21tYW5kOionLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIHN5bnRheCBmb3IgY29tbWFuZCBsaW5lJyArXG4gICAgICAgICdcXG5TZWUgLS1oZWxwIGZvciBhIGxpc3Qgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLicsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wcm9ncmFtXG4gICAgICAuY29tbWFuZCgnY29uc29sZScpXG4gICAgICAuZGVzY3JpcHRpb24oJ1J1biBpbnRlcmFjdGl2ZSBjb25zb2xlJylcbiAgICAgIC5hY3Rpb24obmV3IENvbnNvbGVDb21tYW5kKCkucnVuKTtcbiAgfVxuXG4gIHBhcnNlKCkge1xuICAgIHRoaXMucHJvZ3JhbS5wYXJzZShwcm9jZXNzLmFyZ3YpXG4gIH1cbn1cblxuQ29tbWFuZExpbmUuaW5pdGlhbGl6ZSgpOyJdfQ==