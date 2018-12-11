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
const fs = require("fs");
const Path = require("path");
const child_process_1 = require("child_process");
const ts_framework_common_1 = require("ts-framework-common");
const BaseCommand_1 = require("../base/BaseCommand");
class RunCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "run [entrypoint]",
            description: "Runs the server components without lifting express",
            options: [["-d, --development", "starts server without production flags"]]
        };
    }
    /**
     * Simple method for executing child processes.
     */
    exec(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                child_process_1.exec(cmd, (error, stdout, stderr) => {
                    if (error || stderr) {
                        this.logger.error(stdout);
                        this.logger.error(stderr);
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
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
    prepare({ entrypoint, env }) {
        return __awaiter(this, void 0, void 0, function* () {
            let distributionFile;
            const sourceFile = Path.resolve(process.cwd(), entrypoint);
            if (Path.extname(sourceFile) === ".ts") {
                // Try to find transpiled directory using tsconfig
                const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
                const relativePath = Path.relative(process.cwd(), sourceFile);
                const tsConfig = require(tsConfigPath);
                const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);
                if (env !== "development" && !fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    yield this.exec("yarn tsc");
                }
                if (env === "development") {
                    distributionFile = sourceFile;
                }
                else {
                    distributionFile = Path.resolve(distributionPath, relativePath);
                }
                if (!fs.existsSync(distributionFile)) {
                    // Try to find in root, as a last attempt to make it work
                    const fileName = Path.basename(sourceFile, ".ts");
                    distributionFile = Path.join(distributionPath, fileName + ".js");
                    if (fs.existsSync(distributionFile)) {
                        // Runs from transpiled file
                        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                    }
                }
                else if (Path.extname(distributionFile) === ".ts") {
                    // Runs directly from typescript file
                    this.logger.verbose(`Found typescript source file in "${distributionFile}"`);
                }
                else {
                    // Runs from transpiled file
                    this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                }
            }
            else {
                distributionFile = sourceFile;
                this.logger.verbose(`Found transpiled server in "${distributionFile}", skipping compilation`);
            }
            return distributionFile;
        });
    }
    run(entrypoint = this.options.entrypoint, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // Force production unless flag was supplied
            const port = options.port || this.options.port;
            const env = options.development ? 'development' : (options.env || 'production');
            // Prepare distribution file
            const distributionFile = yield this.prepare({ entrypoint, env });
            this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const instance = yield this.load(distributionFile, Object.assign({}, options, { env, port }));
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlEQUFxQztBQUNyQyw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1NBQzNFLENBQUM7SUFxR0osQ0FBQztJQW5HQzs7T0FFRztJQUNVLElBQUksQ0FBQyxHQUFHOztZQUNuQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxvQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ2xDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTt3QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsMkNBQWEsWUFBWSxFQUFDLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7aUJBQ2pEO2dCQUVELE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSwrQkFBUyxDQUFDLGtDQUFrQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEY7UUFDSCxDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFOztZQUN0QyxJQUFJLGdCQUFnQixDQUFDO1lBQ3JCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3RDLGtEQUFrRDtnQkFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUM5RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFdEYsSUFBSSxHQUFHLEtBQUssYUFBYSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyREFBMkQsRUFBRSxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztvQkFDckcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM3QjtnQkFFRCxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7b0JBQ3pCLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztpQkFDL0I7cUJBQU07b0JBQ0wsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDakU7Z0JBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDcEMseURBQXlEO29CQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDbEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBRWpFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUNuQyw0QkFBNEI7d0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLCtCQUErQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7cUJBQ3pFO2lCQUNGO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDbkQscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO2lCQUM5RTtxQkFBTTtvQkFDTCw0QkFBNEI7b0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLCtCQUErQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7aUJBQU07Z0JBQ0wsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsZ0JBQWdCLHlCQUF5QixDQUFDLENBQUM7YUFDL0Y7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTzs7WUFDNUQsNENBQTRDO1lBQzVDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUM7WUFFaEYsNEJBQTRCO1lBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsc0JBQXNCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV2RixJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFBTyxPQUFPLElBQUUsR0FBRyxFQUFFLElBQUksSUFBRyxDQUFDO1lBQzlFLE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtDQUNGO0FBMUdELDZCQTBHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgU2VydmVyLCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcInJ1biBbZW50cnlwb2ludF1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJSdW5zIHRoZSBzZXJ2ZXIgY29tcG9uZW50cyB3aXRob3V0IGxpZnRpbmcgZXhwcmVzc1wiLFxuICAgIG9wdGlvbnM6IFtbXCItZCwgLS1kZXZlbG9wbWVudFwiLCBcInN0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzXCJdXVxuICB9O1xuXG4gIC8qKlxuICAgKiBTaW1wbGUgbWV0aG9kIGZvciBleGVjdXRpbmcgY2hpbGQgcHJvY2Vzc2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGV4ZWMoY21kKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGV4ZWMoY21kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciB8fCBzdGRlcnIpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRvdXQpO1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IFNlcnZlciBtb2R1bGUgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlIGZyb20gcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFByb21pc2U8U2VydmVyPiB7XG4gICAgY29uc3QgcGF0aFRvU2VydmVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlUGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IE1vZHVsZSA9IGF3YWl0IGltcG9ydChwYXRoVG9TZXJ2ZXIpO1xuXG4gICAgICBpZiAoIU1vZHVsZSB8fCAhTW9kdWxlLmRlZmF1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUuZGVmYXVsdChvcHRpb25zKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiICsgZXhjZXB0aW9uLm1lc3NhZ2UsIGV4Y2VwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IGRpc3RyaWJ1dGlvbkZpbGU7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBlbnRyeXBvaW50KTtcblxuICAgIGlmIChQYXRoLmV4dG5hbWUoc291cmNlRmlsZSkgPT09IFwiLnRzXCIpIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZGlyZWN0b3J5IHVzaW5nIHRzY29uZmlnXG4gICAgICBjb25zdCB0c0NvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJ0c2NvbmZpZy5qc29uXCIpO1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gUGF0aC5yZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBzb3VyY2VGaWxlKTtcbiAgICAgIGNvbnN0IHRzQ29uZmlnID0gcmVxdWlyZSh0c0NvbmZpZ1BhdGgpO1xuICAgICAgY29uc3QgZGlzdHJpYnV0aW9uUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCB0c0NvbmZpZy5jb21waWxlck9wdGlvbnMub3V0RGlyKTtcblxuICAgICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiICYmICFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvblBhdGgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiQnVpbGRpbmcgdHlwZXNjcmlwdCBzb3VyY2UgaW50byBwbGFpbiBqYXZhc2NyaXB0IGZpbGVzLi4uXCIsIHsgZGlzdHJpYnV0aW9uUGF0aCB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjKFwieWFybiB0c2NcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbnYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gc291cmNlRmlsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLnJlc29sdmUoZGlzdHJpYnV0aW9uUGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIGluIHJvb3QsIGFzIGEgbGFzdCBhdHRlbXB0IHRvIG1ha2UgaXQgd29ya1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFBhdGguYmFzZW5hbWUoc291cmNlRmlsZSwgXCIudHNcIik7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLmpvaW4oZGlzdHJpYnV0aW9uUGF0aCwgZmlsZU5hbWUgKyBcIi5qc1wiKTtcblxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFBhdGguZXh0bmFtZShkaXN0cmlidXRpb25GaWxlKSA9PT0gXCIudHNcIikge1xuICAgICAgICAvLyBSdW5zIGRpcmVjdGx5IGZyb20gdHlwZXNjcmlwdCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHR5cGVzY3JpcHQgc291cmNlIGZpbGUgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IHNvdXJjZUZpbGU7XG4gICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cIiwgc2tpcHBpbmcgY29tcGlsYXRpb25gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlzdHJpYnV0aW9uRmlsZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCBvcHRpb25zKSB7XG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiB1bmxlc3MgZmxhZyB3YXMgc3VwcGxpZWRcbiAgICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGVudiA9IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyAnZGV2ZWxvcG1lbnQnIDogKG9wdGlvbnMuZW52IHx8ICdwcm9kdWN0aW9uJyk7XG5cbiAgICAvLyBQcmVwYXJlIGRpc3RyaWJ1dGlvbiBmaWxlXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMucHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgd29ya2VycyBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgZW52LCBwb3J0IH0pO1xuICAgIGF3YWl0IGluc3RhbmNlLm9uSW5pdCgpO1xuICAgIGF3YWl0IGluc3RhbmNlLm9uUmVhZHkoKTtcbiAgfVxufVxuIl19