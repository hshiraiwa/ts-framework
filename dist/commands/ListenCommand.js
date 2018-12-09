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
class ListenCommand extends BaseCommand_1.default {
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
    run({ entrypoint, env }) {
        return __awaiter(this, void 0, void 0, function* () {
            let distributionFile;
            const sourceFile = Path.resolve(process.cwd(), entrypoint);
            if (Path.extname(sourceFile) === ".ts") {
                // Try to find transpiled directory using tsconfig
                const tsConfigPath = Path.resolve(process.cwd(), 'tsconfig.json');
                const relativePath = Path.relative(process.cwd(), sourceFile);
                const tsConfig = require(tsConfigPath);
                const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);
                if (env !== 'development' && !fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    const compiler = () => new Promise((resolve, reject) => {
                        child_process_1.exec("yarn tsc", (error, stdout, stderr) => {
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
                    yield compiler();
                }
                if (env === 'development') {
                    distributionFile = sourceFile;
                }
                else {
                    distributionFile = Path.resolve(distributionPath, relativePath);
                }
                if (!fs.existsSync(distributionFile)) {
                    // Try to find in root, as a last attempt to make it work
                    this.logger.verbose(`Could not find transpiled server in "${distributionFile}"`);
                    const fileName = Path.basename(sourceFile, '.ts');
                    distributionFile = Path.join(distributionPath, fileName + '.js');
                    if (fs.existsSync(distributionFile)) {
                        // Runs from transpiled file
                        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
                    }
                }
                else if (Path.extname(distributionFile) === '.ts') {
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
            this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);
            if (env !== 'development') {
                // Force production environment
                process.env.NODE_ENV = "production";
            }
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load(distributionFile, Object.assign({}, options));
            yield instance.listen();
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlEQUFxQztBQUNyQyw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLGFBQWMsU0FBUSxxQkFBbUM7SUFDNUU7O09BRUc7SUFDVSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLCtCQUFTLENBQUMsa0NBQWtDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RjtRQUNILENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUU7O1lBQ2xDLElBQUksZ0JBQWdCLENBQUM7WUFDckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFM0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDdEMsa0RBQWtE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LENBQUM7YUFDL0Y7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXRGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCxNQUFNLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUM1QyxPQUFPLEVBQ1YsQ0FBQztZQUVILE1BQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNGO0FBNUZELGdDQTRGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgU2VydmVyLCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi4vc2VydmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RlbkNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZDx7IGVudHJ5cG9pbnQ6IHN0cmluZyB9PiB7XG4gIC8qKlxuICAgKiBMb2FkcyBhIG5ldyBTZXJ2ZXIgbW9kdWxlIGFuZCBpbml0aWFsaXplIGl0cyBpbnN0YW5jZSBmcm9tIHJlbGF0aXZlIHBhdGguXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbG9hZChyZWxhdGl2ZVBhdGg6IHN0cmluZywgb3B0aW9ucz86IFNlcnZlck9wdGlvbnMpOiBQcm9taXNlPFNlcnZlcj4ge1xuICAgIGNvbnN0IHBhdGhUb1NlcnZlciA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCByZWxhdGl2ZVBhdGgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBNb2R1bGUgPSBhd2FpdCBpbXBvcnQocGF0aFRvU2VydmVyKTtcblxuICAgICAgaWYgKCFNb2R1bGUgfHwgIU1vZHVsZS5kZWZhdWx0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTW9kdWxlLmRlZmF1bHQob3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKFwiQ291bGQgbm90IGxvYWQgU2VydmVyIGluc3RhbmNlOiBcIiArIGV4Y2VwdGlvbi5tZXNzYWdlLCBleGNlcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50LCBlbnYgfSkge1xuICAgIGxldCBkaXN0cmlidXRpb25GaWxlO1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICd0c2NvbmZpZy5qc29uJyk7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBQYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIHNvdXJjZUZpbGUpO1xuICAgICAgY29uc3QgdHNDb25maWcgPSByZXF1aXJlKHRzQ29uZmlnUGF0aCk7XG4gICAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHRzQ29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuXG4gICAgICBpZiAoZW52ICE9PSAnZGV2ZWxvcG1lbnQnICYmICFmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvblBhdGgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiQnVpbGRpbmcgdHlwZXNjcmlwdCBzb3VyY2UgaW50byBwbGFpbiBqYXZhc2NyaXB0IGZpbGVzLi4uXCIsIHsgZGlzdHJpYnV0aW9uUGF0aCB9KTtcbiAgICAgICAgY29uc3QgY29tcGlsZXIgPSAoKSA9PlxuICAgICAgICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGV4ZWMoXCJ5YXJuIHRzY1wiLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnJvciB8fCBzdGRlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRvdXQpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IGNvbXBpbGVyKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IHNvdXJjZUZpbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0cmlidXRpb25GaWxlID0gUGF0aC5yZXNvbHZlKGRpc3RyaWJ1dGlvblBhdGgsIHJlbGF0aXZlUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiByb290LCBhcyBhIGxhc3QgYXR0ZW1wdCB0byBtYWtlIGl0IHdvcmtcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgQ291bGQgbm90IGZpbmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsICcudHMnKTtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCBmaWxlTmFtZSArICcuanMnKTtcblxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAoUGF0aC5leHRuYW1lKGRpc3RyaWJ1dGlvbkZpbGUpID09PSAnLnRzJykge1xuICAgICAgICAvLyBSdW5zIGRpcmVjdGx5IGZyb20gdHlwZXNjcmlwdCBmaWxlXG4gICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHR5cGVzY3JpcHQgc291cmNlIGZpbGUgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBkaXN0cmlidXRpb25GaWxlID0gc291cmNlRmlsZTtcbiAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiLCBza2lwcGluZyBjb21waWxhdGlvbmApO1xuICAgIH1cblxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBTdGFydGluZyBzZXJ2ZXIgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgcG9ydDogcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwIH07XG4gICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmxvYWQoZGlzdHJpYnV0aW9uRmlsZSwge1xuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuXG4gICAgYXdhaXQgaW5zdGFuY2UubGlzdGVuKCk7XG4gIH1cbn1cbiJdfQ==