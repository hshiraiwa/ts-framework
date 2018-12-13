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
    onProgram(program) {
        return __awaiter(this, void 0, void 0, function* () {
            // Prepare command syntax
            const p = program.command(this.command.syntax).description(this.command.description);
            // Bind command arguments
            if (this.command.options) {
                this.command.options.map(options => {
                    p.option.apply(p, options);
                });
            }
            // Bind command action
            p.action((...args) => {
                try {
                    return this.run.apply(this, args);
                }
                catch (exception) {
                    this.logger.error(exception);
                    setTimeout(() => process.exit(1), 1000);
                }
            });
            return p;
        });
    }
}
exports.default = BaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTZEO0FBZTdELE1BQThCLFdBQVc7SUFJdkMsWUFBbUIsVUFBOEIsRUFBRTtRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFWSxTQUFTLENBQUMsT0FBZ0I7O1lBQ3JDLHlCQUF5QjtZQUN6QixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFckYseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsc0JBQXNCO1lBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUNuQixJQUFJO29CQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNuQztnQkFBQyxPQUFPLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FHRjtBQWpDRCw4QkFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNvbW1hbmRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVudHJ5cG9pbnQ/OiBzdHJpbmc7XG4gIHBvcnQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGVudj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kZXJEZWZzIHtcbiAgc3ludGF4OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIG9wdGlvbnM/OiBzdHJpbmdbXVtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tbWFuZCB7XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwdWJsaWMgYWJzdHJhY3QgY29tbWFuZDogQ29tbWFuZGVyRGVmcztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogQmFzZUNvbW1hbmRPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLnJ1biA9IHRoaXMucnVuLmJpbmQodGhpcyk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvblByb2dyYW0ocHJvZ3JhbTogQ29tbWFuZCk6IFByb21pc2U8Q29tbWFuZD4ge1xuICAgIC8vIFByZXBhcmUgY29tbWFuZCBzeW50YXhcbiAgICBjb25zdCBwID0gcHJvZ3JhbS5jb21tYW5kKHRoaXMuY29tbWFuZC5zeW50YXgpLmRlc2NyaXB0aW9uKHRoaXMuY29tbWFuZC5kZXNjcmlwdGlvbik7XG5cbiAgICAvLyBCaW5kIGNvbW1hbmQgYXJndW1lbnRzXG4gICAgaWYgKHRoaXMuY29tbWFuZC5vcHRpb25zKSB7XG4gICAgICB0aGlzLmNvbW1hbmQub3B0aW9ucy5tYXAob3B0aW9ucyA9PiB7XG4gICAgICAgIHAub3B0aW9uLmFwcGx5KHAsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQmluZCBjb21tYW5kIGFjdGlvblxuICAgIHAuYWN0aW9uKCguLi5hcmdzKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMSksIDEwMDApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIHJ1biguLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=