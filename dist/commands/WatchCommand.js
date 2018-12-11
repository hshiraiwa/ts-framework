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
const Nodemon = require("nodemon");
const BaseCommand_1 = require("../base/BaseCommand");
class WatchCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "watch [entrypoint]",
            description: "Starts the development server with live reload"
        };
    }
    run(entrypoint = this.options.entrypoint) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
            this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\``);
            Nodemon({
                delay: "1000",
                ext: "ts,js",
                cwd: process.cwd(),
                watch: ["./**/*"],
                ignore: ["./dist", "./build", "./docs", "./coverage"],
                exec: `ts-framework listen --development ${entrypoint}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxxREFBOEM7QUFFOUMsTUFBcUIsWUFBYSxTQUFRLHFCQUFXO0lBQXJEOztRQUNFLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsV0FBVyxFQUFFLGdEQUFnRDtTQUM5RCxDQUFDO0lBK0JKLENBQUM7SUE3QmMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7O1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxVQUFVLElBQUksQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztZQUV6RSxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFLE1BQU07Z0JBQ2IsR0FBRyxFQUFFLE9BQU87Z0JBQ1osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO2dCQUNyRCxJQUFJLEVBQUUscUNBQXFDLFVBQVUsRUFBRTthQUN4RCxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUFuQ0QsK0JBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCAqIGFzIE5vZGVtb24gZnJvbSBcIm5vZGVtb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRjaENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcIndhdGNoIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXJ0cyB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyIHdpdGggbGl2ZSByZWxvYWRcIlxuICB9O1xuXG4gIHB1YmxpYyBhc3luYyBydW4oZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50KSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdICR7UGFja2FnZS5uYW1lfUAke1BhY2thZ2UudmVyc2lvbn1gKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gc3RhcnRpbmcgc2VydmVyIGZyb20gXFxgJHtlbnRyeXBvaW50fVxcwrRgKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gd2F0Y2hpbmcgZmlsZXMgZnJvbSAgXFxgLi8qKi8qXFzCtGApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYGApO1xuXG4gICAgTm9kZW1vbih7XG4gICAgICBkZWxheTogXCIxMDAwXCIsXG4gICAgICBleHQ6IFwidHMsanNcIixcbiAgICAgIGN3ZDogcHJvY2Vzcy5jd2QoKSxcbiAgICAgIHdhdGNoOiBbXCIuLyoqLypcIl0sXG4gICAgICBpZ25vcmU6IFtcIi4vZGlzdFwiLCBcIi4vYnVpbGRcIiwgXCIuL2RvY3NcIiwgXCIuL2NvdmVyYWdlXCJdLFxuICAgICAgZXhlYzogYHRzLWZyYW1ld29yayBsaXN0ZW4gLS1kZXZlbG9wbWVudCAke2VudHJ5cG9pbnR9YFxuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInJlc3RhcnRcIiwgZmlsZXMgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSByZXN0YXJ0aW5nIGR1ZSB0byBjaGFuZ2VzLi4uXCIsIHsgZmlsZXMgfSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicXVpdFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHRlcm1pbmF0aW5nLi4uXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcImNyYXNoXCIsIGVycm9yID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJbdHMtZnJhbWV3b3JrXSBpbnN0YW5jZSBjcmFzaGVkIHVuZXhwZWN0ZWRseVwiLCBlcnJvcik7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHdhaXRpbmcgZm9yIGZpbGVzIGNoYW5nZXMgYmVmb3JlIHJlc3RhcnRpbmcuLi5cIik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==