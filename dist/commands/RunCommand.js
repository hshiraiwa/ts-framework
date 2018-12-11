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
            syntax: 'run [entrypoint]',
            description: 'Runs the server components without lifting express',
            options: [
                ['-d, --development', 'Starts server without production flags']
            ]
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
    run(entrypoint, { env }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlEQUFxQztBQUNyQyw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFO2dCQUNQLENBQUMsbUJBQW1CLEVBQUUsd0NBQXdDLENBQUM7YUFDaEU7U0FDRixDQUFDO0lBb0dKLENBQUM7SUFsR0M7O09BRUc7SUFDVSxJQUFJLENBQUMsR0FBRzs7WUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0Msb0JBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNsQyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLElBQUksQ0FBQyxZQUFvQixFQUFFLE9BQXVCOztZQUM3RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZ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QUFDO2lCQUN6RTthQUNGO2lCQUFNO2dCQUNMLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0JBQStCLGdCQUFnQix5QkFBeUIsQ0FBQyxDQUFDO2FBQy9GO1lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFWSxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFOztZQUNsQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLHNCQUFzQixnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFFdkYsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO2dCQUN6QiwrQkFBK0I7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0Isb0JBQzVDLE9BQU8sRUFDVixDQUFDO1lBRUgsTUFBTSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0NBQ0Y7QUEzR0QsNkJBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBQYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6ICdydW4gW2VudHJ5cG9pbnRdJyxcbiAgICBkZXNjcmlwdGlvbjogJ1J1bnMgdGhlIHNlcnZlciBjb21wb25lbnRzIHdpdGhvdXQgbGlmdGluZyBleHByZXNzJyxcbiAgICBvcHRpb25zOiBbXG4gICAgICBbJy1kLCAtLWRldmVsb3BtZW50JywgJ1N0YXJ0cyBzZXJ2ZXIgd2l0aG91dCBwcm9kdWN0aW9uIGZsYWdzJ11cbiAgICBdXG4gIH07XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRob2QgZm9yIGV4ZWN1dGluZyBjaGlsZCBwcm9jZXNzZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZXhlYyhjbWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZXhlYyhjbWQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIHx8IHN0ZGVycikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZG91dCk7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3Ioc3RkZXJyKTtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgU2VydmVyIG1vZHVsZSBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UgZnJvbSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIkNvdWxkIG5vdCBsb2FkIFNlcnZlciBpbnN0YW5jZTogXCIgKyBleGNlcHRpb24ubWVzc2FnZSwgZXhjZXB0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgZGlzdHJpYnV0aW9uRmlsZTtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGVudHJ5cG9pbnQpO1xuXG4gICAgaWYgKFBhdGguZXh0bmFtZShzb3VyY2VGaWxlKSA9PT0gXCIudHNcIikge1xuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICAgIGNvbnN0IHRzQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInRzY29uZmlnLmpzb25cIik7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBQYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIHNvdXJjZUZpbGUpO1xuICAgICAgY29uc3QgdHNDb25maWcgPSByZXF1aXJlKHRzQ29uZmlnUGF0aCk7XG4gICAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHRzQ29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuXG4gICAgICBpZiAoZW52ICE9PSBcImRldmVsb3BtZW50XCIgJiYgIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJCdWlsZGluZyB0eXBlc2NyaXB0IHNvdXJjZSBpbnRvIHBsYWluIGphdmFzY3JpcHQgZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmV4ZWMoXCJ5YXJuIHRzY1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBzb3VyY2VGaWxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGgucmVzb2x2ZShkaXN0cmlidXRpb25QYXRoLCByZWxhdGl2ZVBhdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgaW4gcm9vdCwgYXMgYSBsYXN0IGF0dGVtcHQgdG8gbWFrZSBpdCB3b3JrXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCBmaWxlTmFtZSArIFwiLmpzXCIpO1xuXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoUGF0aC5leHRuYW1lKGRpc3RyaWJ1dGlvbkZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAgIC8vIFJ1bnMgZGlyZWN0bHkgZnJvbSB0eXBlc2NyaXB0IGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHlwZXNjcmlwdCBzb3VyY2UgZmlsZSBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXN0cmlidXRpb25GaWxlID0gc291cmNlRmlsZTtcbiAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiLCBza2lwcGluZyBjb21waWxhdGlvbmApO1xuICAgIH1cblxuICAgIHJldHVybiBkaXN0cmlidXRpb25GaWxlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihlbnRyeXBvaW50LCB7IGVudiB9KSB7XG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMucHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgd29ya2VycyBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCB9O1xuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHtcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9KTtcblxuICAgIGF3YWl0IGluc3RhbmNlLm9uSW5pdCgpO1xuICAgIGF3YWl0IGluc3RhbmNlLm9uUmVhZHkoKTtcbiAgfVxufVxuIl19