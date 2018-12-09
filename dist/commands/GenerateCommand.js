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
const yeoman = require("yeoman-environment");
const BaseCommand_1 = require("../base/BaseCommand");
class GenerateCommand extends BaseCommand_1.default {
    constructor(options = {}) {
        super(options);
        this.env = yeoman.createEnv();
    }
    run({ name, component, skipInstall }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
                throw new Error(`Could not generate unknown component: "${component}"`);
            }
            // Prepare generator name resolution
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            // Here we register a generator based on its path. Providing the namespace is optional.
            this.env.register(require.resolve(generatorName), `ts-framework`);
            // Or passing arguments and options
            return new Promise((resolve, reject) => this.env.run(`ts-framework ${name}`, { skipInstall }, error => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            }));
        });
    }
}
GenerateCommand.AVAILABLE_COMPOENENTS = ["app", "controller", "service", "job"];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVE5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFtQztJQUs5RSxZQUFZLE9BQU8sR0FBRyxFQUFFO1FBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBMEI7O1lBQ3ZFLElBQUksZUFBZSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDekU7WUFFRCxvQ0FBb0M7WUFDcEMsTUFBTSxhQUFhLEdBQ2pCLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7WUFFcEcsdUZBQXVGO1lBQ3ZGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbEUsbUNBQW1DO1lBQ25DLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzVELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7O0FBN0JhLHFDQUFxQixHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFIaEYsa0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBjb21wb25lbnQ6IHN0cmluZztcbiAgc2tpcEluc3RhbGw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0ZUNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZDxHZW5lcmF0ZUNvbW1hbmRPcHRpb25zPiB7XG4gIGVudjogYW55O1xuXG4gIHB1YmxpYyBzdGF0aWMgQVZBSUxBQkxFX0NPTVBPRU5FTlRTID0gW1wiYXBwXCIsIFwiY29udHJvbGxlclwiLCBcInNlcnZpY2VcIiwgXCJqb2JcIl07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5lbnYgPSB5ZW9tYW4uY3JlYXRlRW52KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgbmFtZSwgY29tcG9uZW50LCBza2lwSW5zdGFsbCB9OiBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zKSB7XG4gICAgaWYgKEdlbmVyYXRlQ29tbWFuZC5BVkFJTEFCTEVfQ09NUE9FTkVOVFMuaW5kZXhPZihjb21wb25lbnQpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZ2VuZXJhdGUgdW5rbm93biBjb21wb25lbnQ6IFwiJHtjb21wb25lbnR9XCJgKTtcbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIGdlbmVyYXRvciBuYW1lIHJlc29sdXRpb25cbiAgICBjb25zdCBnZW5lcmF0b3JOYW1lID1cbiAgICAgIGNvbXBvbmVudCAhPT0gXCJhcHBcIiA/IGBnZW5lcmF0b3ItdHMtZnJhbWV3b3JrL2dlbmVyYXRvcnMvJHtjb21wb25lbnR9YCA6IFwiZ2VuZXJhdG9yLXRzLWZyYW1ld29ya1wiO1xuXG4gICAgLy8gSGVyZSB3ZSByZWdpc3RlciBhIGdlbmVyYXRvciBiYXNlZCBvbiBpdHMgcGF0aC4gUHJvdmlkaW5nIHRoZSBuYW1lc3BhY2UgaXMgb3B0aW9uYWwuXG4gICAgdGhpcy5lbnYucmVnaXN0ZXIocmVxdWlyZS5yZXNvbHZlKGdlbmVyYXRvck5hbWUpLCBgdHMtZnJhbWV3b3JrYCk7XG5cbiAgICAvLyBPciBwYXNzaW5nIGFyZ3VtZW50cyBhbmQgb3B0aW9uc1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5lbnYucnVuKGB0cy1mcmFtZXdvcmsgJHtuYW1lfWAsIHsgc2tpcEluc3RhbGwgfSwgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=