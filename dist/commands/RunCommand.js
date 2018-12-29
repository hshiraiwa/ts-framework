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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFDckMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBVztJQUFuRDs7UUFDRSxZQUFPLEdBQUc7WUFDUixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFdBQVcsRUFBRSxvREFBb0Q7WUFDakUsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNmLEtBQUs7cUJBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDWixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQztxQkFDekIsUUFBUSxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO2dCQUUzRCxLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsZ0VBQWdFLENBQUMsQ0FBQztnQkFFbkYsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1NBQ0YsQ0FBQztJQTRHSixDQUFDO0lBMUdDOztPQUVHO0lBQ1UsSUFBSSxDQUFDLEdBQUc7O1lBQ25CLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLG9CQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDbEMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO3dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFB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R0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1lBRXZGLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtnQkFDekIsK0JBQStCO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7YUFDckM7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUFPLE9BQU8sSUFBRSxJQUFJLElBQUcsQ0FBQztZQUN6RSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7S0FDMUI7Q0FDRjtBQTdIRCw2QkE2SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IFNlcnZlciwgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4uL3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdW5Db21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJydW4gW2VudHJ5cG9pbnRdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUnVucyB0aGUgc2VydmVyIGNvbXBvbmVudHMgd2l0aG91dCBsaWZ0aW5nIGV4cHJlc3NcIixcbiAgICBidWlsZGVyOiB5YXJncyA9PiB7XG4gICAgICB5YXJnc1xuICAgICAgICAuYm9vbGVhbihcImRcIilcbiAgICAgICAgLmFsaWFzKFwiZFwiLCBcImRldmVsb3BtZW50XCIpXG4gICAgICAgIC5kZXNjcmliZShcImRcIiwgXCJTdGFydHMgc2VydmVyIHdpdGhvdXQgcHJvZHVjdGlvbiBmbGFnc1wiKTtcblxuICAgICAgeWFyZ3NcbiAgICAgICAgLnN0cmluZyhcInBcIilcbiAgICAgICAgLmFsaWFzKFwicFwiLCBcInBvcnRcIilcbiAgICAgICAgLmRlc2NyaWJlKFwicFwiLCBcIlRoZSBQT1JUIHRvIGxpc3RlbiB0bywgY2FuIGJlIG92ZXJyaWRlbiB3aXRoIFBPUlQgZW52IHZhcmlhYmxlXCIpO1xuXG4gICAgICByZXR1cm4geWFyZ3M7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTaW1wbGUgbWV0aG9kIGZvciBleGVjdXRpbmcgY2hpbGQgcHJvY2Vzc2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGV4ZWMoY21kKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGV4ZWMoY21kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciB8fCBzdGRlcnIpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihzdGRvdXQpO1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IFNlcnZlciBtb2R1bGUgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlIGZyb20gcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFByb21pc2U8U2VydmVyPiB7XG4gICAgY29uc3QgcGF0aFRvU2VydmVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlUGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IE1vZHVsZSA9IGF3YWl0IGltcG9ydChwYXRoVG9TZXJ2ZXIpO1xuXG4gICAgICBpZiAoIU1vZHVsZSB8fCAhTW9kdWxlLmRlZmF1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUuZGVmYXVsdChvcHRpb25zKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXhjZXB0aW9uKTtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiICsgZXhjZXB0aW9uLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwcmVwYXJlRGV2ZWxvcG1lbnQoeyBlbnRyeXBvaW50IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcHJlcGFyZSh7IGVudHJ5cG9pbnQsIGVudiB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGVudHJ5cG9pbnQpO1xuXG4gICAgLy8gTG9hZCBkaXJlY3RseSBmcm9tIGZpbGUgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuICAgIGlmIChlbnYgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZURldmVsb3BtZW50KHsgZW50cnlwb2ludCB9KTtcbiAgICB9XG5cbiAgICAvLyBJbiBwcm9kdWN0aW9uLCB3ZSBuZWVkIHRvIGhhbmRsZSBUUyBmaWxlc1xuICAgIGlmIChQYXRoLmV4dG5hbWUoc291cmNlRmlsZSkgPT09IFwiLnRzXCIpIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIHRyYW5zcGlsZWQgZGlyZWN0b3J5IHVzaW5nIHRzY29uZmlnXG4gICAgICBjb25zdCB0c0NvbmZpZ1BhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJ0c2NvbmZpZy5qc29uXCIpO1xuICAgICAgY29uc3QgdHNDb25maWcgPSByZXF1aXJlKHRzQ29uZmlnUGF0aCk7IC8vIFRPRE86IEhhbmRsZSBleGNlcHRpb25zIGhlcmVcbiAgICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgdHNDb25maWcuY29tcGlsZXJPcHRpb25zLm91dERpcik7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSB0cmFuc3BpbGVkIHNvdXJjZXMgZGlyZWN0b3J5IGFscmVhZHkgZXhpc3RzXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJCdWlsZGluZyB0eXBlc2NyaXB0IHNvdXJjZSBpbnRvIHBsYWluIGphdmFzY3JpcHQgZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmV4ZWMoXCJ5YXJuIHRzY1wiKTtcbiAgICAgIH1cblxuICAgICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBmaWxlIGZyb20gc3BlY2lmaWVkIHNvdXJjZVxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBQYXRoLmJhc2VuYW1lKHNvdXJjZUZpbGUsIFwiLnRzXCIpO1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gUGF0aC5yZWxhdGl2ZShwcm9jZXNzLmN3ZCgpLCBQYXRoLmRpcm5hbWUoc291cmNlRmlsZSkpO1xuICAgICAgbGV0IGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLmpvaW4oZGlzdHJpYnV0aW9uUGF0aCwgcmVsYXRpdmVQYXRoLCBmaWxlTmFtZSArIFwiLmpzXCIpO1xuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uRmlsZSkpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgaW4gZGlzdHJpYnV0aW9uIHJvb3QsIGFzIGEgbGFzdCBhdHRlbXB0IHRvIG1ha2UgaXQgd29ya1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IFBhdGguYmFzZW5hbWUoc291cmNlRmlsZSwgXCIudHNcIik7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLmpvaW4oZGlzdHJpYnV0aW9uUGF0aCwgZmlsZU5hbWUgKyBcIi5qc1wiKTtcblxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBGb3VuZCB0cmFuc3BpbGVkIHNlcnZlciBpbiBcIiR7ZGlzdHJpYnV0aW9uRmlsZX1cImApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnZlcmJvc2UoYENvdWxkIG5vdCBmaW5kIHRyYW5zcGlsZWQgZmlsZVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJ1bnMgZnJvbSB0cmFuc3BpbGVkIGZpbGVcbiAgICAgICAgdGhpcy5sb2dnZXIudmVyYm9zZShgRm91bmQgdHJhbnNwaWxlZCBzZXJ2ZXIgaW4gXCIke2Rpc3RyaWJ1dGlvbkZpbGV9XCJgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpc3RyaWJ1dGlvbkZpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZUZpbGU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgZW50cnlwb2ludCA9IHRoaXMub3B0aW9ucy5lbnRyeXBvaW50LCAuLi5vcHRpb25zIH0pIHtcbiAgICAvLyBGb3JjZSBwcm9kdWN0aW9uIHVubGVzcyBmbGFnIHdhcyBzdXBwbGllZFxuICAgIGNvbnN0IHBvcnQgPSBvcHRpb25zLnBvcnQgfHwgdGhpcy5vcHRpb25zLnBvcnQ7XG4gICAgY29uc3QgZW52ID0gb3B0aW9ucy5kZXZlbG9wbWVudCA/IFwiZGV2ZWxvcG1lbnRcIiA6IG9wdGlvbnMuZW52IHx8IFwicHJvZHVjdGlvblwiO1xuXG4gICAgLy8gUHJlcGFyZSBkaXN0cmlidXRpb24gZmlsZVxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbkZpbGUgPSBhd2FpdCB0aGlzLnByZXBhcmUoeyBlbnRyeXBvaW50LCBlbnYgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFN0YXJ0aW5nIHdvcmtlcnMgaW4gXCIke2Vudn1cIiBlbnZpcm9ubWVudCBmcm9tICR7ZGlzdHJpYnV0aW9uRmlsZX1gKTtcblxuICAgIGlmIChlbnYgIT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBcInByb2R1Y3Rpb25cIjtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7IC4uLm9wdGlvbnMsIHBvcnQgfSk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25Jbml0KCk7XG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuICB9XG59XG4iXX0=