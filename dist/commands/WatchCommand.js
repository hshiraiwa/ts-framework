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
const Path = require("path");
const Package = require("pjson");
const Nodemon = require("nodemon");
const BaseCommand_1 = require("../base/BaseCommand");
class WatchCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "watch [entrypoint]",
            description: "Starts the development server with live reload",
            options: [
                ["-i, --inspect <address>", "starts server with inspection flags for debug"],
            ]
        };
    }
    run(entrypoint = this.options.entrypoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
            this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
            if (options.inspect) {
                this.logger.debug(`[ts-framework] inspect mode:  \`${options.inspect.toString()}\``);
            }
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\`\n`);
            // Prepare command execution
            const command = `node ${options.inspect ? `--inspect=${options.inspect}` : ''}`;
            const exec = `${command} ${Path.join(__dirname, '../cli')} listen --development ${entrypoint}`;
            Nodemon({
                exec,
                delay: "1000",
                ext: "ts,js",
                cwd: process.cwd(),
                watch: ["./**/*"],
                ignore: ["./dist", "./build", "./docs", "./coverage"],
            });
            Nodemon.on("restart", files => {
                this.logger.debug("[ts-framework] restarting due to changes...", { files });
            });
            Nodemon.on("quit", () => {
                this.logger.debug("[ts-framework] terminating...");
                process.exit(1);
            });
            Nodemon.on("crash", error => {
                this.logger.warn("[ts-framework] instance crashed unexpectedly", error);
                this.logger.debug("[ts-framework] waiting for files changes before restarting...");
            });
        });
    }
}
exports.default = WatchCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkMscURBQThDO0FBRTlDLE1BQXFCLFlBQWEsU0FBUSxxQkFBVztJQUFyRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsT0FBTyxFQUFFO2dCQUNQLENBQUMseUJBQXlCLEVBQUUsK0NBQStDLENBQUM7YUFDN0U7U0FDRixDQUFDO0lBc0NKLENBQUM7SUFwQ2MsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPOztZQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ3BFLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUUzRSw0QkFBNEI7WUFDNUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEYsTUFBTSxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLHlCQUF5QixVQUFVLEVBQUUsQ0FBQztZQUUvRixPQUFPLENBQUM7Z0JBQ04sSUFBSTtnQkFDSixLQUFLLEVBQUUsTUFBTTtnQkFDYixHQUFHLEVBQUUsT0FBTztnQkFDWixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7YUFDdEQsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBN0NELCtCQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgKiBhcyBOb2RlbW9uIGZyb20gXCJub2RlbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0Y2hDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJ3YXRjaCBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGFydHMgdGhlIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGxpdmUgcmVsb2FkXCIsXG4gICAgb3B0aW9uczogW1xuICAgICAgW1wiLWksIC0taW5zcGVjdCA8YWRkcmVzcz5cIiwgXCJzdGFydHMgc2VydmVyIHdpdGggaW5zcGVjdGlvbiBmbGFncyBmb3IgZGVidWdcIl0sXG4gICAgXVxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdICR7UGFja2FnZS5uYW1lfUAke1BhY2thZ2UudmVyc2lvbn1gKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gc3RhcnRpbmcgc2VydmVyIGZyb20gXFxgJHtlbnRyeXBvaW50fVxcwrRgKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gd2F0Y2hpbmcgZmlsZXMgZnJvbSAgXFxgLi8qKi8qXFzCtGApO1xuICAgIGlmKG9wdGlvbnMuaW5zcGVjdCkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIGluc3BlY3QgbW9kZTogIFxcYCR7b3B0aW9ucy5pbnNwZWN0LnRvU3RyaW5nKCl9XFxgYCk7XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYFxcbmApO1xuXG4gICAgLy8gUHJlcGFyZSBjb21tYW5kIGV4ZWN1dGlvblxuICAgIGNvbnN0IGNvbW1hbmQgPSBgbm9kZSAke29wdGlvbnMuaW5zcGVjdCA/IGAtLWluc3BlY3Q9JHtvcHRpb25zLmluc3BlY3R9YCA6ICcnfWA7XG4gICAgY29uc3QgZXhlYyA9IGAke2NvbW1hbmR9ICR7UGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2NsaScpfSBsaXN0ZW4gLS1kZXZlbG9wbWVudCAke2VudHJ5cG9pbnR9YDtcblxuICAgIE5vZGVtb24oe1xuICAgICAgZXhlYyxcbiAgICAgIGRlbGF5OiBcIjEwMDBcIixcbiAgICAgIGV4dDogXCJ0cyxqc1wiLFxuICAgICAgY3dkOiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgd2F0Y2g6IFtcIi4vKiovKlwiXSxcbiAgICAgIGlnbm9yZTogW1wiLi9kaXN0XCIsIFwiLi9idWlsZFwiLCBcIi4vZG9jc1wiLCBcIi4vY292ZXJhZ2VcIl0sXG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicmVzdGFydFwiLCBmaWxlcyA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHJlc3RhcnRpbmcgZHVlIHRvIGNoYW5nZXMuLi5cIiwgeyBmaWxlcyB9KTtcbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJxdWl0XCIsICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gdGVybWluYXRpbmcuLi5cIik7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwiY3Jhc2hcIiwgZXJyb3IgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlt0cy1mcmFtZXdvcmtdIGluc3RhbmNlIGNyYXNoZWQgdW5leHBlY3RlZGx5XCIsIGVycm9yKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gd2FpdGluZyBmb3IgZmlsZXMgY2hhbmdlcyBiZWZvcmUgcmVzdGFydGluZy4uLlwiKTtcbiAgICB9KTtcbiAgfVxufVxuIl19