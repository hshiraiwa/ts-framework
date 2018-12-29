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
            builder: yargs => {
                yargs
                    .boolean('d')
                    .alias('d', 'development')
                    .describe('d', 'Starts server without production flags');
                yargs
                    .string('p')
                    .alias('p', 'port')
                    .describe('p', 'The PORT to listen to, can be overriden with PORT env variable');
                return yargs;
            }
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
            const instance = yield this.load(distributionFile, Object.assign({}, options, { port }));
            yield instance.onInit();
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFDckMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFBO2dCQUUxRCxLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQTtnQkFFbEYsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQTRHSixDQUFDO0lBMUdDOztPQUVHO0lBQ1UsSUFBSSxDQUFDLEdBQUc7O1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLG9CQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFB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R0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUFPLE9BQU8sSUFBRSxJQUFJLElBQUcsQ0FBQztZQUN6RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7S0FDMUI7Q0FDRjtBQTdIRCw2QkE2SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IFNlcnZlciwgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJydW4gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbignZCcpXG4gICAgICAgIC5hbGlhcygnZCcsICdkZXZlbG9wbWVudCcpXG4gICAgICAgIC5kZXNjcmliZSgnZCcsICdTdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFncycpXG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoJ3AnKVxuICAgICAgICAuYWxpYXMoJ3AnLCAncG9ydCcpXG4gICAgICAgIC5kZXNjcmliZSgncCcsICdUaGUgUE9SVCB0byBsaXN0ZW4gdG8sIGNhbiBiZSBvdmVycmlkZW4gd2l0aCBQT1JUIGVudiB2YXJpYWJsZScpXG5cbiAgICAgIHJldHVybiB5YXJncztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBtZXRob2QgZm9yIGV4ZWN1dGluZyBjaGlsZCBwcm9jZXNzZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZXhlYyhjbWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZXhlYyhjbWQsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIHx8IHN0ZGVycikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZG91dCk7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3Ioc3RkZXJyKTtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgU2VydmVyIG1vZHVsZSBhbmQgaW5pdGlhbGl6ZSBpdHMgaW5zdGFuY2UgZnJvbSByZWxhdGl2ZSBwYXRoLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxvYWQocmVsYXRpdmVQYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXJ2ZXJPcHRpb25zKTogUHJvbWlzZTxTZXJ2ZXI+IHtcbiAgICBjb25zdCBwYXRoVG9TZXJ2ZXIgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgcmVsYXRpdmVQYXRoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgTW9kdWxlID0gYXdhaXQgaW1wb3J0KHBhdGhUb1NlcnZlcik7XG5cbiAgICAgIGlmICghTW9kdWxlIHx8ICFNb2R1bGUuZGVmYXVsdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1vZHVsZS5kZWZhdWx0KG9wdGlvbnMpO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgY29uc29sZS5lcnJvcihleGNlcHRpb24pO1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIkNvdWxkIG5vdCBsb2FkIFNlcnZlciBpbnN0YW5jZTogXCIgKyBleGNlcHRpb24ubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHByZXBhcmVEZXZlbG9wbWVudCh7IGVudHJ5cG9pbnQgfSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBlbnRyeXBvaW50KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwYXJlKHsgZW50cnlwb2ludCwgZW52IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICAvLyBMb2FkIGRpcmVjdGx5IGZyb20gZmlsZSBpbiBkZXZlbG9wbWVudCBtb2RlXG4gICAgaWYgKGVudiA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmVwYXJlRGV2ZWxvcG1lbnQoeyBlbnRyeXBvaW50IH0pO1xuICAgIH1cblxuICAgIC8vIEluIHByb2R1Y3Rpb24sIHdlIG5lZWQgdG8gaGFuZGxlIFRTIGZpbGVzXG4gICAgaWYgKFBhdGguZXh0bmFtZShzb3VyY2VGaWxlKSA9PT0gXCIudHNcIikge1xuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICAgIGNvbnN0IHRzQ29uZmlnUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInRzY29uZmlnLmpzb25cIik7XG4gICAgICBjb25zdCB0c0NvbmZpZyA9IHJlcXVpcmUodHNDb25maWdQYXRoKTsgLy8gVE9ETzogSGFuZGxlIGV4Y2VwdGlvbnMgaGVyZVxuICAgICAgY29uc3QgZGlzdHJpYnV0aW9uUGF0aCA9IFBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCB0c0NvbmZpZy5jb21waWxlck9wdGlvbnMub3V0RGlyKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRyYW5zcGlsZWQgc291cmNlcyBkaXJlY3RvcnkgYWxyZWFkeSBleGlzdHNcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25QYXRoKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIkJ1aWxkaW5nIHR5cGVzY3JpcHQgc291cmNlIGludG8gcGxhaW4gamF2YXNjcmlwdCBmaWxlcy4uLlwiLCB7IGRpc3RyaWJ1dGlvblBhdGggfSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZXhlYyhcInlhcm4gdHNjXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGZpbGUgZnJvbSBzcGVjaWZpZWQgc291cmNlXG4gICAgICBjb25zdCBmaWxlTmFtZSA9IFBhdGguYmFzZW5hbWUoc291cmNlRmlsZSwgXCIudHNcIik7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBQYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIFBhdGguZGlybmFtZShzb3VyY2VGaWxlKSk7XG4gICAgICBsZXQgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCByZWxhdGl2ZVBhdGgsIGZpbGVOYW1lICsgXCIuanNcIik7XG5cbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBpbiBkaXN0cmlidXRpb24gcm9vdCwgYXMgYSBsYXN0IGF0dGVtcHQgdG8gbWFrZSBpdCB3b3JrXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCBcIi50c1wiKTtcbiAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGguam9pbihkaXN0cmlidXRpb25QYXRoLCBmaWxlTmFtZSArIFwiLmpzXCIpO1xuXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpc3RyaWJ1dGlvbkZpbGUpKSB7XG4gICAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYEZvdW5kIHRyYW5zcGlsZWQgc2VydmVyIGluIFwiJHtkaXN0cmlidXRpb25GaWxlfVwiYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgQ291bGQgbm90IGZpbmQgdHJhbnNwaWxlZCBmaWxlXCJgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUnVucyBmcm9tIHRyYW5zcGlsZWQgZmlsZVxuICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGlzdHJpYnV0aW9uRmlsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBlbnRyeXBvaW50ID0gdGhpcy5vcHRpb25zLmVudHJ5cG9pbnQsIC4uLm9wdGlvbnMgfSkge1xuICAgIC8vIEZvcmNlIHByb2R1Y3Rpb24gdW5sZXNzIGZsYWcgd2FzIHN1cHBsaWVkXG4gICAgY29uc3QgcG9ydCA9IG9wdGlvbnMucG9ydCB8fCB0aGlzLm9wdGlvbnMucG9ydDtcbiAgICBjb25zdCBlbnYgPSBvcHRpb25zLmRldmVsb3BtZW50ID8gXCJkZXZlbG9wbWVudFwiIDogb3B0aW9ucy5lbnYgfHwgXCJwcm9kdWN0aW9uXCI7XG5cbiAgICAvLyBQcmVwYXJlIGRpc3RyaWJ1dGlvbiBmaWxlXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uRmlsZSA9IGF3YWl0IHRoaXMucHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgU3RhcnRpbmcgd29ya2VycyBpbiBcIiR7ZW52fVwiIGVudmlyb25tZW50IGZyb20gJHtkaXN0cmlidXRpb25GaWxlfWApO1xuXG4gICAgaWYgKGVudiAhPT0gXCJkZXZlbG9wbWVudFwiKSB7XG4gICAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5sb2FkKGRpc3RyaWJ1dGlvbkZpbGUsIHsgLi4ub3B0aW9ucywgcG9ydCB9KTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vbkluaXQoKTtcbiAgICBhd2FpdCBpbnN0YW5jZS5vblJlYWR5KCk7XG4gIH1cbn1cbiJdfQ==