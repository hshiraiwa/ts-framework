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
    run({ entrypoint, env }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlEQUFxQztBQUNyQyw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBbUM7SUFDNUQsSUFBSSxDQUFDLEdBQUc7O1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLG9CQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDZjt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsQ0FBQztxQkFDWDtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENB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QztLQUFBO0lBRVksR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRTs7WUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUM1QyxPQUFPLEVBQ1YsQ0FBQztZQUVILE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtDQUNGO0FBaEdELDZCQWdHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgU2VydmVyLCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZDx7IGVudHJ5cG9pbnQ6IHN0cmluZyB9PiB7XG4gIHB1YmxpYyBhc3luYyBleGVjKGNtZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBleGVjKGNtZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgfHwgc3RkZXJyKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3Ioc3Rkb3V0KTtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRlcnIpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBTZXJ2ZXIgbW9kdWxlIGFuZCBpbml0aWFsaXplIGl0cyBpbnN0YW5jZSBmcm9tIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiArIGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGxldCBkaXN0cmlidXRpb25GaWxlO1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwidHNjb25maWcuanNvblwiKTtcbiAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IFBhdGgucmVsYXRpdmUocHJvY2Vzcy5jd2QoKSwgc291cmNlRmlsZSk7XG4gICAgICBjb25zdCB0c0NvbmZpZyA9IHJlcXVpcmUodHNDb25maWdQYXRoKTtcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgdHNDb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG5cbiAgICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIiAmJiAhZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25QYXRoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIkJ1aWxkaW5nIHR5cGVzY3JpcHQgc291cmNlIGludG8gcGxhaW4gamF2YXNjcmlwdCBmaWxlcy4uLlwiLCB7IGRpc3RyaWJ1dGlvblBhdGggfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZXhlYyhcInlhcm4gdHNjXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW52ID09PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IHNvdXJjZUZpbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5yZXNvbHZlKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5qb2luKGRpc3RyaWJ1dGlvblBhdGgsIGZpbGVOYW1lICsgXCIuanNcIik7XG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChQYXRoLmV4dG5hbWUoZGlzdHJpYnV0aW9uRmlsZSkgPT09IFwiLnRzXCIpIHtcbiAgICAgICAgLy8gUnVucyBkaXJlY3RseSBmcm9tIHR5cGVzY3JpcHQgZmlsZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0eXBlc2NyaXB0IHNvdXJjZSBmaWxlIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBSdW5zIGZyb20gdHJhbnNwaWxlZCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBzb3VyY2VGaWxlO1xuICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCIsIHNraXBwaW5nIGNvbXBpbGF0aW9uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3RyaWJ1dGlvbkZpbGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCwgZW52IH0pIHtcbiAgICBjb25zdCBkaXN0cmlidXRpb25GaWxlID0gYXdhaXQgdGhpcy5wcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyB3b3JrZXJzIGluIFwiJHtlbnZ9XCIgZW52aXJvbm1lbnQgZnJvbSAke2Rpc3RyaWJ1dGlvbkZpbGV9YCk7XG5cbiAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIpIHtcbiAgICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwIH07XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwge1xuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuXG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuICB9XG59XG4iXX0=