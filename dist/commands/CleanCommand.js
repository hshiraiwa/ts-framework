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
const rimraf = require("rimraf");
const BaseCommand_1 = require("../base/BaseCommand");
const utils_1 = require("../utils");
class ListenCommand extends BaseCommand_1.default {
    constructor() {
        super(...arguments);
        this.command = {
            // Override specific configiurations
            syntax: "clean",
            description: "Cleans the distribution files",
            handler: yargs => yargs
        };
    }
    run(_a) {
        var { entrypoint = this.options.entrypoint } = _a, options = __rest(_a, ["entrypoint"]);
        return __awaiter(this, void 0, void 0, function* () {
            // Try to find transpiled directory using tsconfig
            const config = yield utils_1.tsConfig();
            const distributionPath = Path.resolve(process.cwd(), config.compilerOptions.outDir);
            // Check if the transpiled sources directory already exists
            if (fs.existsSync(distributionPath)) {
                this.logger.debug("Cleaning distribution files...", { distributionPath });
                rimraf.sync(distributionPath);
                this.logger.info("Success!");
            }
            else {
                this.logger.info("No distribution files were found");
            }
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xlYW5Db21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0NsZWFuQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakMscURBQThDO0FBQzlDLG9DQUFvQztBQUVwQyxNQUFxQixhQUFjLFNBQVEscUJBQVc7SUFBdEQ7O1FBQ0UsWUFBTyxHQUFHO1lBQ1Isb0NBQW9DO1lBQ3BDLE1BQU0sRUFBRSxPQUFPO1lBQ2YsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLO1NBQ3hCLENBQUM7SUFnQkosQ0FBQztJQWRjLEdBQUcsQ0FBQyxFQUFvRDtZQUFwRCxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsT0FBYyxFQUFaLG9DQUFVOztZQUNqRSxrREFBa0Q7WUFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxnQkFBUSxFQUFFLENBQUM7WUFDaEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBGLDJEQUEyRDtZQUMzRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQzthQUN0RDs7S0FDRjtDQUNGO0FBdEJELGdDQXNCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgUGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgcmltcmFmIGZyb20gXCJyaW1yYWZcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgdHNDb25maWcgfSBmcm9tIFwiLi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgY29tbWFuZCA9IHtcbiAgICAvLyBPdmVycmlkZSBzcGVjaWZpYyBjb25maWdpdXJhdGlvbnNcbiAgICBzeW50YXg6IFwiY2xlYW5cIixcbiAgICBkZXNjcmlwdGlvbjogXCJDbGVhbnMgdGhlIGRpc3RyaWJ1dGlvbiBmaWxlc1wiLFxuICAgIGhhbmRsZXI6IHlhcmdzID0+IHlhcmdzXG4gIH07XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgPSB0aGlzLm9wdGlvbnMuZW50cnlwb2ludCwgLi4ub3B0aW9ucyB9KSB7XG4gICAgLy8gVHJ5IHRvIGZpbmQgdHJhbnNwaWxlZCBkaXJlY3RvcnkgdXNpbmcgdHNjb25maWdcbiAgICBjb25zdCBjb25maWcgPSBhd2FpdCB0c0NvbmZpZygpO1xuICAgIGNvbnN0IGRpc3RyaWJ1dGlvblBhdGggPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHRyYW5zcGlsZWQgc291cmNlcyBkaXJlY3RvcnkgYWxyZWFkeSBleGlzdHNcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25QYXRoKSkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJDbGVhbmluZyBkaXN0cmlidXRpb24gZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgcmltcmFmLnN5bmMoZGlzdHJpYnV0aW9uUGF0aCk7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKFwiU3VjY2VzcyFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oXCJObyBkaXN0cmlidXRpb24gZmlsZXMgd2VyZSBmb3VuZFwiKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==