"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodemon = require("nodemon");
const Path = require("path");
const Package = require("pjson");
const BaseCommand_1 = require("../base/BaseCommand");
class WatchCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "watch [entrypoint]",
            description: "Starts the development server with live reload",
            builder: yargs => {
                yargs
                    .string('p')
                    .alias('p', 'port')
                    .describe('p', 'The PORT to listen to, can be overriden with PORT env variable');
                yargs
                    .boolean('i')
                    .alias('i', 'inspect')
                    .describe('i', 'Starts development server with inspection flags for debug');
                return yargs;
            }
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
            this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
            if (options.inspect) {
                this.logger.debug(`[ts-framework] inspect mode:  \`${options.inspect.toString()}\``);
            }
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\`\n`);
            // Prepare command execution
            const port = process.env.PORT || options.port || 3000;
            const command = `node ${options.inspect ? `--inspect=${options.inspect}` : ""}`;
            const exec = `${command} ${Path.join(__dirname, "../cli")} listen --development ${entrypoint} --port ${port}`;
            Nodemon({
                exec,
                delay: "1000",
                ext: "ts,js",
                cwd: process.cwd(),
                watch: ["./**/*"],
                ignore: ["./dist", "./build", "./docs", "./coverage"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMscURBQThDO0FBRTlDLE1BQXFCLFlBQWEsU0FBUSxxQkFBVztJQUFyRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLFdBQVcsRUFBRSxnREFBZ0Q7WUFDN0QsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxnRUFBZ0UsQ0FBQyxDQUFBO2dCQUVsRixLQUFLO3FCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUM7cUJBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsMkRBQTJELENBQUMsQ0FBQTtnQkFFN0UsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQXVDSixDQUFDO0lBckNjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ3BFLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RGO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUUzRSw0QkFBNEI7WUFDNUIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7WUFDdEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEYsTUFBTSxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLHlCQUF5QixVQUFVLFdBQVcsSUFBSSxFQUFFLENBQUM7WUFFOUcsT0FBTyxDQUFDO2dCQUNOLElBQUk7Z0JBQ0osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsR0FBRyxFQUFFLE9BQU87Z0JBQ1osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO2FBQ3RELENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7O0tBQ0o7Q0FDRjtBQXhERCwrQkF3REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBOb2RlbW9uIGZyb20gXCJub2RlbW9uXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGNoQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwid2F0Y2ggW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3RhcnRzIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIgd2l0aCBsaXZlIHJlbG9hZFwiLFxuICAgIGJ1aWxkZXI6IHlhcmdzID0+IHtcbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoJ3AnKVxuICAgICAgICAuYWxpYXMoJ3AnLCAncG9ydCcpXG4gICAgICAgIC5kZXNjcmliZSgncCcsICdUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZScpXG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5ib29sZWFuKCdpJylcbiAgICAgICAgLmFsaWFzKCdpJywgJ2luc3BlY3QnKVxuICAgICAgICAuZGVzY3JpYmUoJ2knLCAnU3RhcnRzIGRldmVsb3BtZW50IHNlcnZlciB3aXRoIGluc3BlY3Rpb24gZmxhZ3MgZm9yIGRlYnVnJylcblxuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gJHtQYWNrYWdlLm5hbWV9QCR7UGFja2FnZS52ZXJzaW9ufWApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSBzdGFydGluZyBzZXJ2ZXIgZnJvbSBcXGAke2VudHJ5cG9pbnR9XFzCtGApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB3YXRjaGluZyBmaWxlcyBmcm9tICBcXGAuLyoqLypcXMK0YCk7XG4gICAgaWYgKG9wdGlvbnMuaW5zcGVjdCkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIGluc3BlY3QgbW9kZTogIFxcYCR7b3B0aW9ucy5pbnNwZWN0LnRvU3RyaW5nKCl9XFxgYCk7XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYFxcbmApO1xuXG4gICAgLy8gUHJlcGFyZSBjb21tYW5kIGV4ZWN1dGlvblxuICAgIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IG9wdGlvbnMucG9ydCB8fCAzMDAwO1xuICAgIGNvbnN0IGNvbW1hbmQgPSBgbm9kZSAke29wdGlvbnMuaW5zcGVjdCA/IGAtLWluc3BlY3Q9JHtvcHRpb25zLmluc3BlY3R9YCA6IFwiXCJ9YDtcbiAgICBjb25zdCBleGVjID0gYCR7Y29tbWFuZH0gJHtQYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL2NsaVwiKX0gbGlzdGVuIC0tZGV2ZWxvcG1lbnQgJHtlbnRyeXBvaW50fSAtLXBvcnQgJHtwb3J0fWA7XG5cbiAgICBOb2RlbW9uKHtcbiAgICAgIGV4ZWMsXG4gICAgICBkZWxheTogXCIxMDAwXCIsXG4gICAgICBleHQ6IFwidHMsanNcIixcbiAgICAgIGN3ZDogcHJvY2Vzcy5jd2QoKSxcbiAgICAgIHdhdGNoOiBbXCIuLyoqLypcIl0sXG4gICAgICBpZ25vcmU6IFtcIi4vZGlzdFwiLCBcIi4vYnVpbGRcIiwgXCIuL2RvY3NcIiwgXCIuL2NvdmVyYWdlXCJdXG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicmVzdGFydFwiLCBmaWxlcyA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHJlc3RhcnRpbmcgZHVlIHRvIGNoYW5nZXMuLi5cIiwgeyBmaWxlcyB9KTtcbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJxdWl0XCIsICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gdGVybWluYXRpbmcuLi5cIik7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwiY3Jhc2hcIiwgZXJyb3IgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIud2FybihcIlt0cy1mcmFtZXdvcmtdIGluc3RhbmNlIGNyYXNoZWQgdW5leHBlY3RlZGx5XCIsIGVycm9yKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gd2FpdGluZyBmb3IgZmlsZXMgY2hhbmdlcyBiZWZvcmUgcmVzdGFydGluZy4uLlwiKTtcbiAgICB9KTtcbiAgfVxufVxuIl19