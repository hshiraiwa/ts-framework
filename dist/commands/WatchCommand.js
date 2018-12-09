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
class WatchCommandCommand extends BaseCommand_1.default {
    run({ entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`[ts-framework] ${Package.version}`);
            this.logger.debug(`[ts-framework] starting server from \`start.ts\´`);
            this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\``);
            Nodemon({
                delay: "1000",
                debug: true,
                ext: "ts js",
                watch: ["./**/*"],
                exec: `node -r ts-node/register ${entrypoint || "start.ts"}`,
                ignore: ["dist/*", "./tests/*"]
            });
            Nodemon.on("restart", files => {
                this.logger.debug("[ts-framework] restarting due to changes...", { files });
            });
            Nodemon.on("quit", () => {
                this.logger.debug("[ts-framework] terminating...");
                process.exit(1);
            });
            Nodemon.on("crash", () => {
                this.logger.warn("[ts-framework] instance crashed unexpectedly");
                this.logger.debug("[ts-framework] waiting for files changes before restarting...");
            });
        });
    }
}
exports.default = WatchCommandCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxxREFBOEM7QUFFOUMsTUFBcUIsbUJBQW9CLFNBQVEscUJBQW1DO0lBQ3JFLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRTs7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztZQUV6RSxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLE9BQU87Z0JBQ1osS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsNEJBQTRCLFVBQVUsSUFBSSxVQUFVLEVBQUU7Z0JBQzVELE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUM7YUFDaEMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5RSxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUNGO0FBN0JELHNDQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSBcInBqc29uXCI7XG5pbXBvcnQgKiBhcyBOb2RlbW9uIGZyb20gXCJub2RlbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0Y2hDb21tYW5kQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kPHsgZW50cnlwb2ludDogc3RyaW5nIH0+IHtcbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgfSkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSAke1BhY2thZ2UudmVyc2lvbn1gKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gc3RhcnRpbmcgc2VydmVyIGZyb20gXFxgc3RhcnQudHNcXMK0YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHRvIHJlc3RhcnQgYXQgYW55IHRpbWUsIGVudGVyIFxcYHJzXFxgYCk7XG5cbiAgICBOb2RlbW9uKHtcbiAgICAgIGRlbGF5OiBcIjEwMDBcIixcbiAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgZXh0OiBcInRzIGpzXCIsXG4gICAgICB3YXRjaDogW1wiLi8qKi8qXCJdLFxuICAgICAgZXhlYzogYG5vZGUgLXIgdHMtbm9kZS9yZWdpc3RlciAke2VudHJ5cG9pbnQgfHwgXCJzdGFydC50c1wifWAsXG4gICAgICBpZ25vcmU6IFtcImRpc3QvKlwiLCBcIi4vdGVzdHMvKlwiXVxuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInJlc3RhcnRcIiwgZmlsZXMgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSByZXN0YXJ0aW5nIGR1ZSB0byBjaGFuZ2VzLi4uXCIsIHsgZmlsZXMgfSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicXVpdFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHRlcm1pbmF0aW5nLi4uXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcImNyYXNoXCIsICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJbdHMtZnJhbWV3b3JrXSBpbnN0YW5jZSBjcmFzaGVkIHVuZXhwZWN0ZWRseVwiKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiW3RzLWZyYW1ld29ya10gd2FpdGluZyBmb3IgZmlsZXMgY2hhbmdlcyBiZWZvcmUgcmVzdGFydGluZy4uLlwiKTtcbiAgICB9KTtcbiAgfVxufVxuIl19