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
const Path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const BaseCommand_1 = require("../base/BaseCommand");
const repl_1 = require("../repl");
class ConsoleCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "console [entrypoint]",
            description: "starts the interactive console"
        };
    }
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathToServer = Path.resolve(process.cwd(), relativePath);
            try {
                const Module = yield Promise.resolve().then(() => require(pathToServer));
                if (!Module || !Module.default) {
                    throw new Error("Module has no default export");
                }
                return new Module.default(options);
            }
            catch (exception) {
                throw new ts_framework_common_1.BaseError("Could not load Server instance: " + exception.message, exception);
            }
        });
    }
    /**
     * Runs the REPL console in the supplied Server instance.
     */
    run({ entrypoint = this.options.entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load(entrypoint, Object.assign({}, options, { repl: new repl_1.default({
                    name: require("../../package.json").name
                }) }));
            yield instance.listen();
        });
    }
}
exports.default = ConsoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQ29uc29sZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBQzlDLGtDQUFrQztBQUdsQyxNQUFxQixjQUFlLFNBQVEscUJBQVc7SUFBdkQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLHNCQUFzQjtZQUM5QixXQUFXLEVBQUUsZ0NBQWdDO1NBQzlDLENBQUM7SUFpQ0osQ0FBQztJQS9CQzs7T0FFRztJQUNVLElBQUksQ0FBQyxZQUFvQixFQUFFLE9BQXVCOztZQUM3RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMvRCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLDJDQUFhLFlBQVksRUFBQyxDQUFDO2dCQUUxQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2lCQUNqRDtnQkFFRCxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixNQUFNLElBQUksK0JBQVMsQ0FBQyxrQ0FBa0MsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3hGO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxHQUFHLENBQUMsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7O1lBQ3ZELE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLG9CQUN0QyxPQUFPLElBQ1YsSUFBSSxFQUFFLElBQUksY0FBVyxDQUFDO29CQUNwQixJQUFJLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSTtpQkFDekMsQ0FBQyxJQUNGLENBQUM7WUFDSCxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQXJDRCxpQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgUmVwbENvbnNvbGUgZnJvbSBcIi4uL3JlcGxcIjtcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZUNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcImNvbnNvbGUgW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwic3RhcnRzIHRoZSBpbnRlcmFjdGl2ZSBjb25zb2xlXCJcbiAgfTtcblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgU2VydmVyIG1vZHVsZSBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UgZnJvbSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIkNvdWxkIG5vdCBsb2FkIFNlcnZlciBpbnN0YW5jZTogXCIgKyBleGNlcHRpb24ubWVzc2FnZSwgZXhjZXB0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVucyB0aGUgUkVQTCBjb25zb2xlIGluIHRoZSBzdXBwbGllZCBTZXJ2ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50IH0pIHtcbiAgICBjb25zdCBvcHRpb25zID0geyBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAgfTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChlbnRyeXBvaW50LCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgcmVwbDogbmV3IFJlcGxDb25zb2xlKHtcbiAgICAgICAgbmFtZTogcmVxdWlyZShcIi4uLy4uL3BhY2thZ2UuanNvblwiKS5uYW1lXG4gICAgICB9KVxuICAgIH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLmxpc3RlbigpO1xuICB9XG59XG4iXX0=