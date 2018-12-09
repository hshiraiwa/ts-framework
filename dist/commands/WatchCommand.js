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
                ignore: [
                    "dist/*",
                    "./tests/*"
                ]
            });
            Nodemon.on('restart', (files) => {
                this.logger.debug('[ts-framework] restarting due to changes...', { files });
            });
            Nodemon.on('quit', () => {
                this.logger.debug('[ts-framework] terminating...');
                process.exit(1);
            });
            Nodemon.on('crash', () => {
                this.logger.warn('[ts-framework] instance crashed unexpectedly');
                this.logger.debug('[ts-framework] waiting for files changes before restarting...');
            });
        });
    }
}
exports.default = WatchCommandCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2F0Y2hDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL1dhdGNoQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyxxREFBOEM7QUFFOUMsTUFBcUIsbUJBQW9CLFNBQVEscUJBQWlDO0lBQ25FLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRTs7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztZQUV6RSxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLE9BQU87Z0JBQ1osS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsNEJBQTRCLFVBQVUsSUFBSSxVQUFVLEVBQUU7Z0JBQzVELE1BQU0sRUFBRTtvQkFDTixRQUFRO29CQUNSLFdBQVc7aUJBQ1o7YUFDRixDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQWhDRCxzQ0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQYWNrYWdlIGZyb20gJ3Bqc29uJztcbmltcG9ydCAqIGFzIE5vZGVtb24gZnJvbSAnbm9kZW1vbic7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2F0Y2hDb21tYW5kQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kPHtlbnRyeXBvaW50OiBzdHJpbmd9PiB7XG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50IH0pIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgW3RzLWZyYW1ld29ya10gJHtQYWNrYWdlLnZlcnNpb259YCk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFt0cy1mcmFtZXdvcmtdIHN0YXJ0aW5nIHNlcnZlciBmcm9tIFxcYHN0YXJ0LnRzXFzCtGApO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBbdHMtZnJhbWV3b3JrXSB0byByZXN0YXJ0IGF0IGFueSB0aW1lLCBlbnRlciBcXGByc1xcYGApO1xuXG4gICAgTm9kZW1vbih7XG4gICAgICBkZWxheTogXCIxMDAwXCIsXG4gICAgICBkZWJ1ZzogdHJ1ZSxcbiAgICAgIGV4dDogXCJ0cyBqc1wiLFxuICAgICAgd2F0Y2g6IFtcIi4vKiovKlwiXSxcbiAgICAgIGV4ZWM6IGBub2RlIC1yIHRzLW5vZGUvcmVnaXN0ZXIgJHtlbnRyeXBvaW50IHx8IFwic3RhcnQudHNcIn1gLFxuICAgICAgaWdub3JlOiBbXG4gICAgICAgIFwiZGlzdC8qXCIsXG4gICAgICAgIFwiLi90ZXN0cy8qXCJcbiAgICAgIF1cbiAgICB9KTtcblxuICAgIE5vZGVtb24ub24oJ3Jlc3RhcnQnLCAoZmlsZXMpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdbdHMtZnJhbWV3b3JrXSByZXN0YXJ0aW5nIGR1ZSB0byBjaGFuZ2VzLi4uJywge2ZpbGVzfSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKCdxdWl0JywgKCkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1t0cy1mcmFtZXdvcmtdIHRlcm1pbmF0aW5nLi4uJyk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG5cbiAgICBOb2RlbW9uLm9uKCdjcmFzaCcsICgpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1t0cy1mcmFtZXdvcmtdIGluc3RhbmNlIGNyYXNoZWQgdW5leHBlY3RlZGx5Jyk7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnW3RzLWZyYW1ld29ya10gd2FpdGluZyBmb3IgZmlsZXMgY2hhbmdlcyBiZWZvcmUgcmVzdGFydGluZy4uLicpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=