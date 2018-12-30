"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Path = require("path");
const JSON5 = require("json5");
const ts_framework_common_1 = require("ts-framework-common");
const BaseCommand_1 = require("../base/BaseCommand");
const utils_1 = require("../utils");
class RunCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            syntax: "run [entrypoint]",
            description: "Runs the server components without lifting express",
            builder: yargs => {
                yargs
                    .boolean("d")
                    .alias("d", "development")
                    .describe("d", "Starts server without production flags");
                yargs
                    .string("p")
                    .alias("p", "port")
                    .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
                return yargs;
            }
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
                console.error(exception);
                throw new ts_framework_common_1.BaseError("Could not load Server instance: " + exception.message);
            }
        });
    }
    prepareDevelopment({ entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Path.resolve(process.cwd(), entrypoint);
        });
    }
    prepare({ entrypoint, env }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sourceFile = Path.resolve(process.cwd(), entrypoint);
            // Load directly from file in development mode
            if (env === "development") {
                return this.prepareDevelopment({ entrypoint });
            }
            // In production, we need to handle TS files
            if (Path.extname(sourceFile) === ".ts") {
                // Try to find transpiled directory using tsconfig
                const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
                const tsConfigRaw = fs.readFileSync(tsConfigPath);
                if (!tsConfigRaw || !tsConfigRaw.toString()) {
                    throw new ts_framework_common_1.BaseError(`Could not load TS Config file from: "${tsConfigPath}"`);
                }
                // TODO: Handle exceptions here
                const tsConfig = JSON5.parse(tsConfigRaw.toString());
                const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);
                // Check if the transpiled sources directory already exists
                if (!fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    yield utils_1.exec("yarn tsc");
                }
                // Try to find transpiled file from specified source
                const fileName = Path.basename(sourceFile, ".ts");
                const relativePath = Path.relative(process.cwd(), Path.dirname(sourceFile));
                let distributionFile = Path.join(distributionPath, relativePath, fileName + ".js");
                if (!fs.existsSync(distributionFile)) {
                    // Try to find in distribution root, as a last attempt to make it work
                    const fileName = Path.basename(sourceFile, ".ts");
                    distributionFile = Path.join(distributionPath, fileName + ".js");
                    if (fs.existsSync(distributionFile)) {
                        // Runs from transpiled file
                        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                    }
                    else {
                        this.logger.verbose(`Could not find transpiled file"`);
                    }
                }
                else {
                    // Runs from transpiled file
                    this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                }
                return distributionFile;
            }
            return sourceFile;
        });
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Force production unless flag was supplied
            const port = options.port || this.options.port;
            const env = options.development ? "development" : options.env || "production";
            // Prepare distribution file
            const distributionFile = yield this.prepare({ entrypoint, env });
            this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            // Load server constructor from distribution file path
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            // Manually start the server lifecycle without listening to express port
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUMvQiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRTlDLG9DQUFnQztBQUVoQyxNQUFxQixVQUFXLFNBQVEscUJBQVc7SUFBbkQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixXQUFXLEVBQUUsb0RBQW9EO1lBQ2pFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDZixLQUFLO3FCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7cUJBQ1osS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUM7cUJBQ3pCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztnQkFFM0QsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDO3FCQUNsQixRQUFRLENBQUMsR0FBRyxFQUFFLGdFQUFnRSxDQUFDLENBQUM7Z0JBRW5GLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztTQUNGLENBQUM7SUFxR0osQ0FBQztJQW5HQzs7T0FFRztJQUNVLElBQUksQ0FBQyxZQUFvQixFQUFFLE9BQXVCOztZQUM3RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMvRCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLDJDQUFhLFlBQVksRUFBQyxDQUFDO2dCQUUxQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2lCQUNqRDtnQkFFRCxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLElBQUksK0JBQVMsQ0FBQyxrQ0FBa0MsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDN0U7UUFDSCxDQUFDO0tBQUE7SUFFWSxrQkFBa0IsQ0FBQyxFQUFFLFVBQVUsRUFBRTs7WUFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFWSxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFOztZQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUUzRCw4Q0FBOEM7WUFDOUMsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDaEQ7WUFFRCw0Q0FBNEM7WUFDNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDdEMsa0RBQWtEO2dCQUNsRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDbEUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFbEQsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDM0MsTUFBTSxJQUFJLCtCQUFTLENBQUMsd0NBQXdDLFlBQVksR0FBRyxDQUFDLENBQUM7aUJBQzlFO2dCQUVELCtCQUErQjtnQkFDL0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDckQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV0RiwyREFBMkQ7Z0JBQzNELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJEQUEyRCxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO29CQUNyRyxNQUFNLFlBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDeEI7Z0JBRUQsb0RBQW9EO2dCQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFFbkYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDcEMsc0VBQXNFO29CQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDbEQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBRWpFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUNuQyw0QkFBNEI7d0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLCtCQUErQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7cUJBQ3pFO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7cUJBQ3hEO2lCQUNGO3FCQUFNO29CQUNMLDRCQUE0QjtvQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0JBQStCLGdCQUFnQixHQUFHLENBQUMsQ0FBQztpQkFDekU7Z0JBRUQsT0FBTyxnQkFBZ0IsQ0FBQzthQUN6QjtZQUVELE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSw0Q0FBNEM7WUFDNUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMvQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDO1lBRTlFLDRCQUE0QjtZQUM1QixNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdkYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELHNEQUFzRDtZQUN0RCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUFPLE9BQU8sSUFBRSxJQUFJLElBQUcsQ0FBQztZQUV6RSx3RUFBd0U7WUFDeEUsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7O0tBQzFCO0NBQ0Y7QUF0SEQsNkJBc0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBKU09ONSBmcm9tIFwianNvbjVcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwicnVuIFtlbnRyeXBvaW50XVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJ1bnMgdGhlIHNlcnZlciBjb21wb25lbnRzIHdpdGhvdXQgbGlmdGluZyBleHByZXNzXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJkXCIpXG4gICAgICAgIC5hbGlhcyhcImRcIiwgXCJkZXZlbG9wbWVudFwiKVxuICAgICAgICAuZGVzY3JpYmUoXCJkXCIsIFwiU3RhcnRzIHNlcnZlciB3aXRob3V0IHByb2R1Y3Rpb24gZmxhZ3NcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJwXCIpXG4gICAgICAgIC5hbGlhcyhcInBcIiwgXCJwb3J0XCIpXG4gICAgICAgIC5kZXNjcmliZShcInBcIiwgXCJUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZVwiKTtcblxuICAgICAgcmV0dXJuIHlhcmdzO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgU2VydmVyIG1vZHVsZSBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UgZnJvbSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIkNvdWxkIG5vdCBsb2FkIFNlcnZlciBpbnN0YW5jZTogXCIgKyBleGNlcHRpb24ubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByZXBhcmVEZXZlbG9wbWVudCh7IGVudHJ5cG9pbnQgfSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBlbnRyeXBvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICAvLyBMb2FkIGRpcmVjdGx5IGZyb20gZmlsZSBpbiBkZXZlbG9wbWVudCBtb2RlXG4gICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVwYXJlRGV2ZWxvcG1lbnQoeyBlbnRyeXBvaW50IH0pO1xuICAgIH1cblxuICAgIC8vIEluIHByb2R1Y3Rpb24sIHdlIG5lZWQgdG8gaGFuZGxlIFRTIGZpbGVzXG4gICAgaWYgKFBhdGguZXh0bmFtZShzb3VyY2VGaWxlKSA9PT0gXCIudHNcIikge1xuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICAgIGNvbnN0IHRzQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInRzY29uZmlnLmpzb25cIik7XG4gICAgICBjb25zdCB0c0NvbmZpZ1JhdyA9IGZzLnJlYWRGaWxlU3luYyh0c0NvbmZpZ1BhdGgpO1xuXG4gICAgICBpZiAoIXRzQ29uZmlnUmF3IHx8ICF0c0NvbmZpZ1Jhdy50b1N0cmluZygpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoYENvdWxkIG5vdCBsb2FkIFRTIENvbmZpZyBmaWxlIGZyb206IFwiJHt0c0NvbmZpZ1BhdGh9XCJgKTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogSGFuZGxlIGV4Y2VwdGlvbnMgaGVyZVxuICAgICAgY29uc3QgdHNDb25maWcgPSBKU09ONS5wYXJzZSh0c0NvbmZpZ1Jhdy50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgdHNDb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSB0cmFuc3BpbGVkIHNvdXJjZXMgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJCdWlsZGluZyB0eXBlc2NyaXB0IHNvdXJjZSBpbnRvIHBsYWluIGphdmFzY3JpcHQgZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgICBhd2FpdCBleGVjKFwieWFybiB0c2NcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZmlsZSBmcm9tIHNwZWNpZmllZCBzb3VyY2VcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgUGF0aC5kaXJuYW1lKHNvdXJjZUZpbGUpKTtcbiAgICAgIGxldCBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCwgZmlsZU5hbWUgKyBcIi5qc1wiKTtcblxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIGluIGRpc3RyaWJ1dGlvbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIGZpbGVOYW1lICsgXCIuanNcIik7XG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBDb3VsZCBub3QgZmluZCB0cmFuc3BpbGVkIGZpbGVcImApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXN0cmlidXRpb25GaWxlO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiB1bmxlc3MgZmxhZyB3YXMgc3VwcGxpZWRcbiAgICBjb25zdCBwb3J0ID0gb3B0aW9ucy5wb3J0IHx8IHRoaXMub3B0aW9ucy5wb3J0O1xuICAgIGNvbnN0IGVudiA9IG9wdGlvbnMuZGV2ZWxvcG1lbnQgPyBcImRldmVsb3BtZW50XCIgOiBvcHRpb25zLmVudiB8fCBcInByb2R1Y3Rpb25cIjtcblxuICAgIC8vIFByZXBhcmUgZGlzdHJpYnV0aW9uIGZpbGVcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5wcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyB3b3JrZXJzIGluIFwiJHtlbnZ9XCIgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBzZXJ2ZXIgY29uc3RydWN0b3IgZnJvbSBkaXN0cmlidXRpb24gZmlsZSBwYXRoXG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwgeyAuLi5vcHRpb25zLCBwb3J0IH0pO1xuXG4gICAgLy8gTWFudWFsbHkgc3RhcnQgdGhlIHNlcnZlciBsaWZlY3ljbGUgd2l0aG91dCBsaXN0ZW5pbmcgdG8gZXhwcmVzcyBwb3J0XG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuICB9XG59XG4iXX0=