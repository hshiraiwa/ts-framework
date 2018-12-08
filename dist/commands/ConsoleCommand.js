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
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathToServer = Path.resolve(process.cwd(), relativePath);
            try {
                const Module = yield Promise.resolve().then(() => require(pathToServer));
                if (!Module || !Module.default) {
                    throw new Error('Module has no default export');
                }
                return new Module.default(options);
            }
            catch (exception) {
                throw new ts_framework_common_1.BaseError('Could not load Server instance: ' + exception.message, exception);
            }
        });
    }
    /**
     * Runs the REPL console in the supplied Server instance.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load('./api/MainServer', Object.assign({}, options, { repl: new repl_1.default({}) }));
            yield instance.listen();
        });
    }
}
exports.default = ConsoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQ29uc29sZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRTlDLGtDQUFrQztBQUVsQyxNQUFxQixjQUFlLFNBQVEscUJBQVc7SUFDckQ7O09BRUc7SUFDVSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLCtCQUFTLENBQUMsa0NBQWtDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RjtRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsR0FBRzs7WUFDZCxNQUFNLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLG9CQUFPLE9BQU8sSUFBRSxJQUFJLEVBQUUsSUFBSSxjQUFXLENBQUMsRUFBRSxDQUFDLElBQUcsQ0FBQztZQUNoRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQTNCRCxpQ0EyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSAnLi4vYmFzZS9CYXNlQ29tbWFuZCc7XG5pbXBvcnQgU2VydmVyLCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tICcuLi9zZXJ2ZXInO1xuaW1wb3J0IFJlcGxDb25zb2xlIGZyb20gJy4uL3JlcGwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IFNlcnZlciBtb2R1bGUgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlIGZyb20gcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFByb21pc2U8U2VydmVyPiB7XG4gICAgY29uc3QgcGF0aFRvU2VydmVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlUGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IE1vZHVsZSA9IGF3YWl0IGltcG9ydChwYXRoVG9TZXJ2ZXIpO1xuXG4gICAgICBpZiAoIU1vZHVsZSB8fCAhTW9kdWxlLmRlZmF1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKCdDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6ICcgKyBleGNlcHRpb24ubWVzc2FnZSwgZXhjZXB0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVucyB0aGUgUkVQTCBjb25zb2xlIGluIHRoZSBzdXBwbGllZCBTZXJ2ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcnVuKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCB9O1xuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKCcuL2FwaS9NYWluU2VydmVyJywgeyAuLi5vcHRpb25zLCByZXBsOiBuZXcgUmVwbENvbnNvbGUoe30pIH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLmxpc3RlbigpO1xuICB9XG59Il19