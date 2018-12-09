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
    run({ entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
            this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\``);
            Nodemon({
                delay: "1000",
                ext: "ts,js",
                cwd: process.cwd(),
                watch: ["./**/*"],
                ignore: ["./dist", "./build", "./docs", "./coverage"],
                exec: `ts-framework listen --development ${entrypoint}`,
            });
            Nodemon.on("restart", files => {
                this.logger.debug("[ts-framework] restarting due to changes...", { files });
            });
            Nodemon.on("quit", () => {
                this.logger.debug("[ts-framework] terminating...");
                process.exit(1);
            });
            Nodemon.on("crash", (error) => {
                this.logger.warn("[ts-framework] instance crashed unexpectedly", error);
                this.logger.debug("[ts-framework] waiting for files changes before restarting...");
            });
        });
    }
}
exports.default = WatchCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxxREFBOEM7QUFFOUMsTUFBcUIsWUFBYSxTQUFRLHFCQUFtQztJQUM5RCxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUU7O1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFFekUsT0FBTyxDQUFDO2dCQUNOLEtBQUssRUFBRSxNQUFNO2dCQUNiLEdBQUcsRUFBRSxPQUFPO2dCQUNaLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNsQixLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztnQkFDckQsSUFBSSxFQUFFLHFDQUFxQyxVQUFVLEVBQUU7YUFDeEQsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1lBQ3JGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsK0JBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgUGFja2FnZSBmcm9tIFwicGpzb25cIjtcbmltcG9ydCAqIGFzIE5vZGVtb24gZnJvbSBcIm5vZGVtb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXRjaENvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZDx7IGVudHJ5cG9pbnQ6IHN0cmluZyB9PiB7XG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50IH0pIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gJHtQYWNrYWdlLnZlcnNpb259YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHN0YXJ0aW5nIHNlcnZlciBmcm9tIFxcYCR7ZW50cnlwb2ludH1cXMK0YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHdhdGNoaW5nIGZpbGVzIGZyb20gIFxcYC4vKiovKlxcwrRgKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gdG8gcmVzdGFydCBhdCBhbnkgdGltZSwgZW50ZXIgXFxgcnNcXGBgKTtcblxuICAgIE5vZGVtb24oe1xuICAgICAgZGVsYXk6IFwiMTAwMFwiLFxuICAgICAgZXh0OiBcInRzLGpzXCIsXG4gICAgICBjd2Q6IHByb2Nlc3MuY3dkKCksXG4gICAgICB3YXRjaDogW1wiLi8qKi8qXCJdLFxuICAgICAgaWdub3JlOiBbXCIuL2Rpc3RcIiwgXCIuL2J1aWxkXCIsIFwiLi9kb2NzXCIsIFwiLi9jb3ZlcmFnZVwiXSxcbiAgICAgIGV4ZWM6IGB0cy1mcmFtZXdvcmsgbGlzdGVuIC0tZGV2ZWxvcG1lbnQgJHtlbnRyeXBvaW50fWAsXG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicmVzdGFydFwiLCBmaWxlcyA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHJlc3RhcnRpbmcgZHVlIHRvIGNoYW5nZXMuLi5cIiwgeyBmaWxlcyB9KTtcbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oXCJxdWl0XCIsICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gdGVybWluYXRpbmcuLi5cIik7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwiY3Jhc2hcIiwgKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKFwiW3RzLWZyYW1ld29ya10gaW5zdGFuY2UgY3Jhc2hlZCB1bmV4cGVjdGVkbHlcIiwgZXJyb3IpO1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSB3YWl0aW5nIGZvciBmaWxlcyBjaGFuZ2VzIGJlZm9yZSByZXN0YXJ0aW5nLi4uXCIpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=