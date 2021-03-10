"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvYmFzZS9CYXNlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZEQUE2RDtBQXdCN0QsTUFBOEIsV0FBVztJQUl2QyxZQUFtQixVQUE4QixFQUFFO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVZLFNBQVMsQ0FBQyxLQUFXOztZQUNoQyxzQkFBc0I7WUFDdEIsTUFBTSxPQUFPLEdBQUcsQ0FBTSxJQUFJLEVBQUMsRUFBRTtnQkFDM0IsSUFBSTtvQkFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7Z0JBQUMsT0FBTyxTQUFTLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDLENBQUEsQ0FBQztZQUVGLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsT0FBTztnQkFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUM1QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUNsQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQzlCLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtDQUdGO0FBN0JELDhCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFyZ3YgfSBmcm9tIFwieWFyZ3NcIjtcbmltcG9ydCB7IExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VDb21tYW5kT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBlbnRyeXBvaW50Pzogc3RyaW5nO1xuICBwb3J0Pzogc3RyaW5nIHwgbnVtYmVyO1xuICBlbnY/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZGVyRGVmcyB7XG4gIHN5bnRheDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBoYW5kbGVyPzpcbiAgICB8ICgoeWFyZ3M6IEFyZ3YpID0+IEFyZ3YpXG4gICAgfCB7XG4gICAgICAgIFtsYWJlbDogc3RyaW5nXTogYW55O1xuICAgICAgfTtcbiAgYnVpbGRlcj86XG4gICAgfCAoKHlhcmdzOiBBcmd2KSA9PiBBcmd2KVxuICAgIHwge1xuICAgICAgICBbbGFiZWw6IHN0cmluZ106IGFueTtcbiAgICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VDb21tYW5kIHtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHB1YmxpYyBhYnN0cmFjdCBjb21tYW5kOiBDb21tYW5kZXJEZWZzO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBCYXNlQ29tbWFuZE9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMucnVuID0gdGhpcy5ydW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uUHJvZ3JhbSh5YXJnczogQXJndik6IFByb21pc2U8YW55PiB7XG4gICAgLy8gQmluZCBjb21tYW5kIGFjdGlvblxuICAgIGNvbnN0IGhhbmRsZXIgPSBhc3luYyBhcmd2ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJ1bi5hcHBseSh0aGlzLCBbYXJndl0pO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCAxMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHlhcmdzLmNvbW1hbmQoe1xuICAgICAgaGFuZGxlcixcbiAgICAgIGNvbW1hbmQ6IHRoaXMuY29tbWFuZC5zeW50YXgsXG4gICAgICBkZXNjcmliZTogdGhpcy5jb21tYW5kLmRlc2NyaXB0aW9uLFxuICAgICAgYnVpbGRlcjogdGhpcy5jb21tYW5kLmJ1aWxkZXJcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBydW4oYXJndjogYW55KTogUHJvbWlzZTx2b2lkPjtcbn1cbiJdfQ==