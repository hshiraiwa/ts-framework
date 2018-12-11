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
    run(entrypoint = this.options.entrypoint, { env }) {
        return __awaiter(this, void 0, void 0, function* () {
            const distributionFile = yield this.prepare({ entrypoint, env });
            this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);
            if (env !== "development") {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load(distributionFile, Object.assign({}, options));
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlEQUFxQztBQUNyQyw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1NBQzNFLENBQUM7SUFvR0osQ0FBQztJQWxHQzs7T0FFRztJQUNVLElBQUksQ0FBQyxHQUFHOztZQUNuQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxvQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ2xDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTt3QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlB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QUM7aUJBQ3pFO2FBQ0Y7aUJBQU07Z0JBQ0wsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsZ0JBQWdCLHlCQUF5QixDQUFDLENBQUM7YUFDL0Y7WUFFRCxPQUFPLGdCQUFnQixDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUU7O1lBQzVELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsc0JBQXNCLGdCQUFnQixFQUFFLENBQUMsQ0FBQztZQUV2RixJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7Z0JBQ3pCLCtCQUErQjtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1lBRUQsTUFBTSxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixvQkFDNUMsT0FBTyxFQUNWLENBQUM7WUFFSCxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7Q0FDRjtBQXpHRCw2QkF5R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IFNlcnZlciwgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJydW4gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIixcbiAgICBvcHRpb25zOiBbW1wiLWQsIC0tZGV2ZWxvcG1lbnRcIiwgXCJzdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFnc1wiXV1cbiAgfTtcblxuICAvKipcbiAgICogU2ltcGxlIG1ldGhvZCBmb3IgZXhlY3V0aW5nIGNoaWxkIHByb2Nlc3Nlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBleGVjKGNtZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBleGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgfHwgc3RkZXJyKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3Ioc3Rkb3V0KTtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBTZXJ2ZXIgbW9kdWxlIGFuZCBpbml0aWFsaXplIGl0cyBpbnN0YW5jZSBmcm9tIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiArIGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxldCBkaXN0cmlidXRpb25GaWxlO1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwidHNjb25maWcuanNvblwiKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgc291cmNlRmlsZSk7XG4gICAgICBjb25zdCB0c0NvbmZpZyA9IHJlcXVpcmUodHNDb25maWdQYXRoKTtcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgdHNDb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG5cbiAgICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIiAmJiAhZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25QYXRoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIkJ1aWxkaW5nIHR5cGVzY3JpcHQgc291cmNlIGludG8gcGxhaW4gamF2YXNjcmlwdCBmaWxlcy4uLlwiLCB7IGRpc3RyaWJ1dGlvblBhdGggfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZXhlYyhcInlhcm4gdHNjXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW52ID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IHNvdXJjZUZpbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5yZXNvbHZlKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIGZpbGVOYW1lICsgXCIuanNcIik7XG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChQYXRoLmV4dG5hbWUoZGlzdHJpYnV0aW9uRmlsZSkgPT09IFwiLnRzXCIpIHtcbiAgICAgICAgLy8gUnVucyBkaXJlY3RseSBmcm9tIHR5cGVzY3JpcHQgZmlsZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0eXBlc2NyaXB0IHNvdXJjZSBmaWxlIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBzb3VyY2VGaWxlO1xuICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCIsIHNraXBwaW5nIGNvbXBpbGF0aW9uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RyaWJ1dGlvbkZpbGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgeyBlbnYgfSkge1xuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLnByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHdvcmtlcnMgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0geyBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAgfTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7XG4gICAgICAuLi5vcHRpb25zXG4gICAgfSk7XG5cbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG4gIH1cbn1cbiJdfQ==