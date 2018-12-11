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
            p.action((...args) => this.run.apply(this, args));
            return p;
        });
    }
}
exports.default = BaseCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkRBQTZEO0FBYTdELE1BQThCLFdBQVc7SUFJdkMsWUFBbUIsVUFBOEIsRUFBRTtRQUFoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSw0QkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFWSxTQUFTLENBQUMsT0FBZ0I7O1lBQ3JDLHlCQUF5QjtZQUN6QixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFckYseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsc0JBQXNCO1lBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FHRjtBQTFCRCw4QkEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcImNvbW1hbmRlclwiO1xuaW1wb3J0IHsgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUNvbW1hbmRPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVudHJ5cG9pbnQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZGVyRGVmcyB7XG4gIHN5bnRheDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBvcHRpb25zPzogc3RyaW5nW11bXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZUNvbW1hbmQge1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHVibGljIGFic3RyYWN0IGNvbW1hbmQ6IENvbW1hbmRlckRlZnM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IEJhc2VDb21tYW5kT3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5ydW4gPSB0aGlzLnJ1bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgb25Qcm9ncmFtKHByb2dyYW06IENvbW1hbmQpOiBQcm9taXNlPENvbW1hbmQ+IHtcbiAgICAvLyBQcmVwYXJlIGNvbW1hbmQgc3ludGF4XG4gICAgY29uc3QgcCA9IHByb2dyYW0uY29tbWFuZCh0aGlzLmNvbW1hbmQuc3ludGF4KS5kZXNjcmlwdGlvbih0aGlzLmNvbW1hbmQuZGVzY3JpcHRpb24pO1xuXG4gICAgLy8gQmluZCBjb21tYW5kIGFyZ3VtZW50c1xuICAgIGlmICh0aGlzLmNvbW1hbmQub3B0aW9ucykge1xuICAgICAgdGhpcy5jb21tYW5kLm9wdGlvbnMubWFwKG9wdGlvbnMgPT4ge1xuICAgICAgICBwLm9wdGlvbi5hcHBseShwLCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEJpbmQgY29tbWFuZCBhY3Rpb25cbiAgICBwLmFjdGlvbigoLi4uYXJncykgPT4gdGhpcy5ydW4uYXBwbHkodGhpcywgYXJncykpO1xuICAgIHJldHVybiBwO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IGFzeW5jIHJ1biguLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8dm9pZD47XG59XG4iXX0=