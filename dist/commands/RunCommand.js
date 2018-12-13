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
const child_process_1 = require("child_process");
const fs = require("fs");
const Path = require("path");
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
                const tsConfig = require(tsConfigPath); // TODO: Handle exceptions here
                const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);
                // Check if the transpiled sources directory already exists
                if (!fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    yield this.exec("yarn tsc");
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
    run(entrypoint = this.options.entrypoint, options) {
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
            const instance = yield this.load(distributionFile, Object.assign({}, options, { env, port }));
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFDckMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1NBQzNFLENBQUM7SUE0R0osQ0FBQztJQTFHQzs7T0FFRztJQUNVLElBQUksQ0FBQyxHQUFHOztZQUNuQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyxvQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ2xDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTt3QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsT0FBTyxFQUFFLENBQUM7cUJBQ1g7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsSUFBSSxDQUFDLFlBQW9CLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlB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QUFJLElBQUcsQ0FBQztZQUM5RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7Q0FDRjtBQWpIRCw2QkFpSEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IFNlcnZlciwgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJydW4gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIixcbiAgICBvcHRpb25zOiBbW1wiLWQsIC0tZGV2ZWxvcG1lbnRcIiwgXCJzdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFnc1wiXV1cbiAgfTtcblxuICAvKipcbiAgICogU2ltcGxlIG1ldGhvZCBmb3IgZXhlY3V0aW5nIGNoaWxkIHByb2Nlc3Nlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBleGVjKGNtZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBleGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgfHwgc3RkZXJyKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3Ioc3Rkb3V0KTtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBTZXJ2ZXIgbW9kdWxlIGFuZCBpbml0aWFsaXplIGl0cyBpbnN0YW5jZSBmcm9tIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGV4Y2VwdGlvbik7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiArIGV4Y2VwdGlvbi5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGFyZURldmVsb3BtZW50KHsgZW50cnlwb2ludCB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGVudHJ5cG9pbnQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgc291cmNlRmlsZSA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBlbnRyeXBvaW50KTtcblxuICAgIC8vIExvYWQgZGlyZWN0bHkgZnJvbSBmaWxlIGluIGRldmVsb3BtZW50IG1vZGVcbiAgICBpZiAoZW52ID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXBhcmVEZXZlbG9wbWVudCh7IGVudHJ5cG9pbnQgfSk7XG4gICAgfVxuXG4gICAgLy8gSW4gcHJvZHVjdGlvbiwgd2UgbmVlZCB0byBoYW5kbGUgVFMgZmlsZXNcbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwidHNjb25maWcuanNvblwiKTtcbiAgICAgIGNvbnN0IHRzQ29uZmlnID0gcmVxdWlyZSh0c0NvbmZpZ1BhdGgpOyAvLyBUT0RPOiBIYW5kbGUgZXhjZXB0aW9ucyBoZXJlXG4gICAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHRzQ29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdHJhbnNwaWxlZCBzb3VyY2VzIGRpcmVjdG9yeSBhbHJlYWR5IGV4aXN0c1xuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvblBhdGgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiQnVpbGRpbmcgdHlwZXNjcmlwdCBzb3VyY2UgaW50byBwbGFpbiBqYXZhc2NyaXB0IGZpbGVzLi4uXCIsIHsgZGlzdHJpYnV0aW9uUGF0aCB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5leGVjKFwieWFybiB0c2NcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZmlsZSBmcm9tIHNwZWNpZmllZCBzb3VyY2VcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgUGF0aC5kaXJuYW1lKHNvdXJjZUZpbGUpKTtcbiAgICAgIGxldCBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCwgZmlsZU5hbWUgKyBcIi5qc1wiKTtcblxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIGluIGRpc3RyaWJ1dGlvbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIGZpbGVOYW1lICsgXCIuanNcIik7XG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBDb3VsZCBub3QgZmluZCB0cmFuc3BpbGVkIGZpbGVcImApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXN0cmlidXRpb25GaWxlO1xuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2VGaWxlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIG9wdGlvbnMpIHtcbiAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZW52ID0gb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IG9wdGlvbnMuZW52IHx8IFwicHJvZHVjdGlvblwiO1xuXG4gICAgLy8gUHJlcGFyZSBkaXN0cmlidXRpb24gZmlsZVxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLnByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHdvcmtlcnMgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIGVudiwgcG9ydCB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG4gIH1cbn1cbiJdfQ==