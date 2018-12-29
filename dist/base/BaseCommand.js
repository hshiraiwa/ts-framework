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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTZEO0FBbUI3RCxNQUE4QixXQUFXO0lBSXZDLFlBQW1CLFVBQThCLEVBQUU7UUFBaEMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRVksU0FBUyxDQUFDLEtBQVc7O1lBQ2hDLHNCQUFzQjtZQUN0QixNQUFNLE9BQU8sR0FBRyxDQUFNLElBQUksRUFBQyxFQUFFO2dCQUMzQixJQUFJO29CQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztnQkFBQyxPQUFPLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQSxDQUFDO1lBRUYsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNuQixPQUFPO2dCQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ2xDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87YUFDOUIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBR0Y7QUE3QkQsOEJBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXJndiB9IGZyb20gXCJ5YXJnc1wiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNvbW1hbmRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVudHJ5cG9pbnQ/OiBzdHJpbmc7XG4gIHBvcnQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGVudj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kZXJEZWZzIHtcbiAgc3ludGF4OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGJ1aWxkZXI/OlxuICAgIHwgKCh5YXJnczogQXJndikgPT4gQXJndilcbiAgICB8IHtcbiAgICAgICAgW2xhYmVsOiBzdHJpbmddOiBhbnk7XG4gICAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgYWJzdHJhY3QgY29tbWFuZDogQ29tbWFuZGVyRGVmcztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogQmFzZUNvbW1hbmRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJ1biA9IHRoaXMucnVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvblByb2dyYW0oeWFyZ3M6IEFyZ3YpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIEJpbmQgY29tbWFuZCBhY3Rpb25cbiAgICBjb25zdCBoYW5kbGVyID0gYXN5bmMgYXJndiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5ydW4uYXBwbHkodGhpcywgW2FyZ3ZdKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihleGNlcHRpb24pO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByb2Nlc3MuZXhpdCgxKSwgMTAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB5YXJncy5jb21tYW5kKHtcbiAgICAgIGhhbmRsZXIsXG4gICAgICBjb21tYW5kOiB0aGlzLmNvbW1hbmQuc3ludGF4LFxuICAgICAgZGVzY3JpYmU6IHRoaXMuY29tbWFuZC5kZXNjcmlwdGlvbixcbiAgICAgIGJ1aWxkZXI6IHRoaXMuY29tbWFuZC5idWlsZGVyXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgYXN5bmMgcnVuKGFyZ3Y6IGFueSk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=