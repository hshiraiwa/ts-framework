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
    run({ entrypoint }) {
        return __awaiter(this, void 0, void 0, function* () {
            let distributionFile;
            const sourceFile = Path.resolve(process.cwd(), entrypoint);
            if (Path.extname(sourceFile) === ".ts") {
                // Try to find transpiled directory using tsconfig
                const tsConfigPath = Path.resolve(process.cwd(), 'tsconfig.json');
                const relativePath = Path.relative(process.cwd(), sourceFile);
                const tsConfig = require(tsConfigPath);
                const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);
                if (!fs.existsSync(distributionPath)) {
                    this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
                    const compiler = () => new Promise((resolve, reject) => {
                        child_process_1.exec("yarn tsc", (error, stdout, stderr) => {
                            if (error || stderr) {
                                this.logger.error(stderr);
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                    yield compiler();
                    distributionFile = Path.resolve(distributionPath, relativePath);
                    if (!fs.existsSync(distributionFile)) {
                        // Try to find in root, as a last attempt to make it work
                        const fileName = Path.basename(sourceFile, '.ts');
                        distributionFile = Path.resolve(distributionPath, fileName + '.js');
                    }
                }
            }
            else {
                distributionFile = sourceFile;
            }
            this.logger.debug('Starting workers in "production" environment...');
            // Force production environment
            process.env.NODE_ENV = "production";
            const options = { port: process.env.PORT || 3000 };
            const instance = yield this.load(distributionFile, Object.assign({}, options));
            // Start server components without listening requests
            yield instance.onInit();
            // Notify server to child components
            yield instance.onReady();
        });
    }
}
exports.default = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21tYW5kcy9SdW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpREFBcUM7QUFDckMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw2REFBZ0Q7QUFDaEQscURBQThDO0FBRzlDLE1BQXFCLFVBQVcsU0FBUSxxQkFBbUM7SUFDekU7O09BRUc7SUFDVSxJQUFJLENBQUMsWUFBb0IsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRywyQ0FBYSxZQUFZLEVBQUMsQ0FBQztnQkFFMUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLCtCQUFTLENBQUMsa0NBQWtDLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RjtRQUNILENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRTs7WUFDN0IsSUFBSSxnQkFBZ0IsQ0FBQztZQUNyQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUUzRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUN0QyxrREFBa0Q7Z0JBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXRGLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJEQUEyRCxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO29CQUNyRyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7d0JBQ3BDLG9CQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDekMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO2dDQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzZCQUNmO2lDQUFNO2dDQUNMLE9BQU8sRUFBRSxDQUFDOzZCQUNYO3dCQUNILENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUVMLE1BQU0sUUFBUSxFQUFFLENBQUM7b0JBQ2pCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBRWhFLElBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7d0JBQ25DLHlEQUF5RDt3QkFDekQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ2xELGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO3FCQUNyRTtpQkFDRjthQUNGO2lCQUFNO2dCQUNMLGdCQUFnQixHQUFHLFVBQVUsQ0FBQzthQUMvQjtZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFFckUsK0JBQStCO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztZQUVwQyxNQUFNLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLG9CQUM1QyxPQUFPLEVBQ1YsQ0FBQztZQUVILHFEQUFxRDtZQUNyRCxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV4QixvQ0FBb0M7WUFDcEMsTUFBTSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0NBQ0Y7QUF6RUQsNkJBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIFBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCBTZXJ2ZXIsIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuLi9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVuQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kPHsgZW50cnlwb2ludDogc3RyaW5nIH0+IHtcbiAgLyoqXG4gICAqIExvYWRzIGEgbmV3IFNlcnZlciBtb2R1bGUgYW5kIGluaXRpYWxpemUgaXRzIGluc3RhbmNlIGZyb20gcmVsYXRpdmUgcGF0aC5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsb2FkKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFByb21pc2U8U2VydmVyPiB7XG4gICAgY29uc3QgcGF0aFRvU2VydmVyID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHJlbGF0aXZlUGF0aCk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IE1vZHVsZSA9IGF3YWl0IGltcG9ydChwYXRoVG9TZXJ2ZXIpO1xuXG4gICAgICBpZiAoIU1vZHVsZSB8fCAhTW9kdWxlLmRlZmF1bHQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIGhhcyBubyBkZWZhdWx0IGV4cG9ydFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNb2R1bGUuZGVmYXVsdChvcHRpb25zKTtcbiAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBTZXJ2ZXIgaW5zdGFuY2U6IFwiICsgZXhjZXB0aW9uLm1lc3NhZ2UsIGV4Y2VwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bih7IGVudHJ5cG9pbnQgfSkge1xuICAgIGxldCBkaXN0cmlidXRpb25GaWxlO1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBQYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZW50cnlwb2ludCk7XG5cbiAgICBpZiAoUGF0aC5leHRuYW1lKHNvdXJjZUZpbGUpID09PSBcIi50c1wiKSB7XG4gICAgICAvLyBUcnkgdG8gZmluZCB0cmFuc3BpbGVkIGRpcmVjdG9yeSB1c2luZyB0c2NvbmZpZ1xuICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICd0c2NvbmZpZy5qc29uJyk7XG4gICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBQYXRoLnJlbGF0aXZlKHByb2Nlc3MuY3dkKCksIHNvdXJjZUZpbGUpO1xuICAgICAgY29uc3QgdHNDb25maWcgPSByZXF1aXJlKHRzQ29uZmlnUGF0aCk7XG4gICAgICBjb25zdCBkaXN0cmlidXRpb25QYXRoID0gUGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHRzQ29uZmlnLmNvbXBpbGVyT3B0aW9ucy5vdXREaXIpO1xuXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlzdHJpYnV0aW9uUGF0aCkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJCdWlsZGluZyB0eXBlc2NyaXB0IHNvdXJjZSBpbnRvIHBsYWluIGphdmFzY3JpcHQgZmlsZXMuLi5cIiwgeyBkaXN0cmlidXRpb25QYXRoIH0pO1xuICAgICAgICBjb25zdCBjb21waWxlciA9ICgpID0+XG4gICAgICAgICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZXhlYyhcInlhcm4gdHNjXCIsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yIHx8IHN0ZGVycikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHN0ZGVycik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IGNvbXBpbGVyKCk7XG4gICAgICAgIGRpc3RyaWJ1dGlvbkZpbGUgPSBQYXRoLnJlc29sdmUoZGlzdHJpYnV0aW9uUGF0aCwgcmVsYXRpdmVQYXRoKTtcblxuICAgICAgICBpZighZnMuZXhpc3RzU3luYyhkaXN0cmlidXRpb25GaWxlKSkge1xuICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGluIHJvb3QsIGFzIGEgbGFzdCBhdHRlbXB0IHRvIG1ha2UgaXQgd29ya1xuICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gUGF0aC5iYXNlbmFtZShzb3VyY2VGaWxlLCAnLnRzJyk7XG4gICAgICAgICAgZGlzdHJpYnV0aW9uRmlsZSA9IFBhdGgucmVzb2x2ZShkaXN0cmlidXRpb25QYXRoLCBmaWxlTmFtZSArICcuanMnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXN0cmlidXRpb25GaWxlID0gc291cmNlRmlsZTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3RhcnRpbmcgd29ya2VycyBpbiBcInByb2R1Y3Rpb25cIiBlbnZpcm9ubWVudC4uLicpO1xuXG4gICAgLy8gRm9yY2UgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gXCJwcm9kdWN0aW9uXCI7XG5cbiAgICBjb25zdCBvcHRpb25zID0geyBwb3J0OiBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAgfTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMubG9hZChkaXN0cmlidXRpb25GaWxlLCB7XG4gICAgICAuLi5vcHRpb25zXG4gICAgfSk7XG5cbiAgICAvLyBTdGFydCBzZXJ2ZXIgY29tcG9uZW50cyB3aXRob3V0IGxpc3RlbmluZyByZXF1ZXN0c1xuICAgIGF3YWl0IGluc3RhbmNlLm9uSW5pdCgpO1xuXG4gICAgLy8gTm90aWZ5IHNlcnZlciB0byBjaGlsZCBjb21wb25lbnRzXG4gICAgYXdhaXQgaW5zdGFuY2Uub25SZWFkeSgpO1xuICB9XG59XG4iXX0=