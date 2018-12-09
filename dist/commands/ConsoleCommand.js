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
    run({ entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load(entrypoint, Object.assign({}, options, { repl: new repl_1.default({}) }));
            yield instance.listen();
        });
    }
}
exports.default = ConsoleCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc29sZUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tbWFuZHMvQ29uc29sZUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRTlDLGtDQUFrQztBQUVsQyxNQUFxQixjQUFlLFNBQVEscUJBQW1DO0lBQzdFOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsMkNBQWEsWUFBWSxFQUFDLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7aUJBQ2pEO2dCQUVELE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSwrQkFBUyxDQUFDLGtDQUFrQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEY7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRTs7WUFDN0IsTUFBTSxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsb0JBQU8sT0FBTyxJQUFFLElBQUksRUFBRSxJQUFJLGNBQVcsQ0FBQyxFQUFFLENBQUMsSUFBRyxDQUFDO1lBQ3hGLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBM0JELGlDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCBSZXBsQ29uc29sZSBmcm9tIFwiLi4vcmVwbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kPHsgZW50cnlwb2ludDogc3RyaW5nIH0+IHtcbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IFNlcnZlciBtb2R1bGUgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlIGZyb20gcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFByb21pc2U8U2VydmVyPiB7XG4gICAgY29uc3QgcGF0aFRvU2VydmVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlUGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IE1vZHVsZSA9IGF3YWl0IGltcG9ydChwYXRoVG9TZXJ2ZXIpO1xuXG4gICAgICBpZiAoIU1vZHVsZSB8fCAhTW9kdWxlLmRlZmF1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUuZGVmYXVsdChvcHRpb25zKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiICsgZXhjZXB0aW9uLm1lc3NhZ2UsIGV4Y2VwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIFJFUEwgY29uc29sZSBpbiB0aGUgc3VwcGxpZWQgU2VydmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgfSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCB9O1xuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGVudHJ5cG9pbnQsIHsgLi4ub3B0aW9ucywgcmVwbDogbmV3IFJlcGxDb25zb2xlKHt9KSB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5saXN0ZW4oKTtcbiAgfVxufVxuIl19