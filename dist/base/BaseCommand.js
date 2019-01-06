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
const ts_framework_common_1 = require("ts-framework-common");
class BaseCommand {
    constructor(options = {}) {
        this.options = options;
        this.run = this.run.bind(this);
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
    }
    onProgram(yargs) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bind command action
            const handler = (argv) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.run.apply(this, [argv]);
                }
                catch (exception) {
                    this.logger.error(exception);
                    setTimeout(() => process.exit(1), 1000);
                }
            });
            return yargs.command({
                handler,
                command: this.command.syntax,
                describe: this.command.description,
                builder: this.command.builder
            });
        });
    }
}
exports.default = BaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTZEO0FBd0I3RCxNQUE4QixXQUFXO0lBSXZDLFlBQW1CLFVBQThCLEVBQUU7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRVksU0FBUyxDQUFDLEtBQVc7O1lBQ2hDLHNCQUFzQjtZQUN0QixNQUFNLE9BQU8sR0FBRyxDQUFNLElBQUksRUFBQyxFQUFFO2dCQUMzQixJQUFJO29CQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztnQkFBQyxPQUFPLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQSxDQUFDO1lBRUYsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNuQixPQUFPO2dCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDOUIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBR0Y7QUE3QkQsOEJBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJndiB9IGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNvbW1hbmRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVudHJ5cG9pbnQ/OiBzdHJpbmc7XG4gIHBvcnQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGVudj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kZXJEZWZzIHtcbiAgc3ludGF4OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGhhbmRsZXI/OlxuICAgIHwgKCh5YXJnczogQXJndikgPT4gQXJndilcbiAgICB8IHtcbiAgICAgICAgW2xhYmVsOiBzdHJpbmddOiBhbnk7XG4gICAgICB9O1xuICBidWlsZGVyPzpcbiAgICB8ICgoeWFyZ3M6IEFyZ3YpID0+IEFyZ3YpXG4gICAgfCB7XG4gICAgICAgIFtsYWJlbDogc3RyaW5nXTogYW55O1xuICAgICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbW1hbmQge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIGFic3RyYWN0IGNvbW1hbmQ6IENvbW1hbmRlckRlZnM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IEJhc2VDb21tYW5kT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ydW4gPSB0aGlzLnJ1bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Qcm9ncmFtKHlhcmdzOiBBcmd2KTogUHJvbWlzZTxhbnk+IHtcbiAgICAvLyBCaW5kIGNvbW1hbmQgYWN0aW9uXG4gICAgY29uc3QgaGFuZGxlciA9IGFzeW5jIGFyZ3YgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucnVuLmFwcGx5KHRoaXMsIFthcmd2XSk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDEwMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4geWFyZ3MuY29tbWFuZCh7XG4gICAgICBoYW5kbGVyLFxuICAgICAgY29tbWFuZDogdGhpcy5jb21tYW5kLnN5bnRheCxcbiAgICAgIGRlc2NyaWJlOiB0aGlzLmNvbW1hbmQuZGVzY3JpcHRpb24sXG4gICAgICBidWlsZGVyOiB0aGlzLmNvbW1hbmQuYnVpbGRlclxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIHJ1bihhcmd2OiBhbnkpOiBQcm9taXNlPHZvaWQ+O1xufVxuIl19