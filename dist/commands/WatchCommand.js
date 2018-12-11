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
            syntax: 'watch [entrypoint]',
            description: 'Starts the development server with live reload',
        };
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxxREFBOEM7QUFFOUMsTUFBcUIsWUFBYSxTQUFRLHFCQUFXO0lBQXJEOztRQUNFLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsV0FBVyxFQUFFLGdEQUFnRDtTQUM5RCxDQUFDO0lBK0JKLENBQUM7SUE3QmMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFOztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMseUNBQXlDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBRXpFLE9BQU8sQ0FBQztnQkFDTixLQUFLLEVBQUUsTUFBTTtnQkFDYixHQUFHLEVBQUUsT0FBTztnQkFDWixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDbEIsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7Z0JBQ3JELElBQUksRUFBRSxxQ0FBcUMsVUFBVSxFQUFFO2FBQ3hELENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQW5DRCwrQkFtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gXCJwanNvblwiO1xuaW1wb3J0ICogYXMgTm9kZW1vbiBmcm9tIFwibm9kZW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGNoQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6ICd3YXRjaCBbZW50cnlwb2ludF0nLFxuICAgIGRlc2NyaXB0aW9uOiAnU3RhcnRzIHRoZSBkZXZlbG9wbWVudCBzZXJ2ZXIgd2l0aCBsaXZlIHJlbG9hZCcsXG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgfSkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSAke1BhY2thZ2UudmVyc2lvbn1gKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gc3RhcnRpbmcgc2VydmVyIGZyb20gXFxgJHtlbnRyeXBvaW50fVxcwrRgKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gd2F0Y2hpbmcgZmlsZXMgZnJvbSAgXFxgLi8qKi8qXFzCtGApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYGApO1xuXG4gICAgTm9kZW1vbih7XG4gICAgICBkZWxheTogXCIxMDAwXCIsXG4gICAgICBleHQ6IFwidHMsanNcIixcbiAgICAgIGN3ZDogcHJvY2Vzcy5jd2QoKSxcbiAgICAgIHdhdGNoOiBbXCIuLyoqLypcIl0sXG4gICAgICBpZ25vcmU6IFtcIi4vZGlzdFwiLCBcIi4vYnVpbGRcIiwgXCIuL2RvY3NcIiwgXCIuL2NvdmVyYWdlXCJdLFxuICAgICAgZXhlYzogYHRzLWZyYW1ld29yayBsaXN0ZW4gLS1kZXZlbG9wbWVudCAke2VudHJ5cG9pbnR9YFxuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcInJlc3RhcnRcIiwgZmlsZXMgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJbdHMtZnJhbWV3b3JrXSByZXN0YXJ0aW5nIGR1ZSB0byBjaGFuZ2VzLi4uXCIsIHsgZmlsZXMgfSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKFwicXVpdFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHRlcm1pbmF0aW5nLi4uXCIpO1xuICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xuXG4gICAgTm9kZW1vbi5vbihcImNyYXNoXCIsIGVycm9yID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJbdHMtZnJhbWV3b3JrXSBpbnN0YW5jZSBjcmFzaGVkIHVuZXhwZWN0ZWRseVwiLCBlcnJvcik7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlt0cy1mcmFtZXdvcmtdIHdhaXRpbmcgZm9yIGZpbGVzIGNoYW5nZXMgYmVmb3JlIHJlc3RhcnRpbmcuLi5cIik7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==