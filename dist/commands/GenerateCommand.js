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
        this.command = {
            syntax: "new <component> [name]",
            description: "Generates a new TS Framework application or component",
            options: [
                ["-s, --skip-install", "skips yarn installation and post generation routines"],
                ["-p, --path <path>", "the base path to create the file, relative to current working dir"],
                ["-b, --base-url <url>", "the base URL for the Controller generation, not applied to other components"],
                ["-t, --table-name <tableName>", "the table name for the Model generation, not applied to other components"]
            ]
        };
        this.env = yeoman.createEnv();
    }
    run(component, name, { path = "", skipInstall }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
                throw new Error(`Could not generate unknown component: "${component}"`);
            }
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            this.env.register(require.resolve(generatorName), `ts-framework`);
            const opts = { skipInstall };
            if (path) {
                opts.path = path;
            }
            return new Promise((resolve, reject) => this.env.run(`ts-framework ${name}`, opts, error => {
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
GenerateCommand.AVAILABLE_COMPOENENTS = ["app", "controller", "service", "job", "model"];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVU5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBZXRELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZGpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxPQUFPLEVBQUU7Z0JBQ1AsQ0FBQyxvQkFBb0IsRUFBRSxzREFBc0QsQ0FBQztnQkFDOUUsQ0FBQyxtQkFBbUIsRUFBRSxtRUFBbUUsQ0FBQztnQkFDMUYsQ0FBQyxzQkFBc0IsRUFBRSw2RUFBNkUsQ0FBQztnQkFDdkcsQ0FBQyw4QkFBOEIsRUFBRSwwRUFBMEUsQ0FBQzthQUM3RztTQUNGLENBQUM7UUFNQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBMEI7O1lBQ2xGLElBQUksZUFBZSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDekU7WUFFRCxNQUFNLGFBQWEsR0FDakIsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMscUNBQXFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztZQUVwRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sSUFBSSxHQUFRLEVBQUUsV0FBVyxFQUFFLENBQUM7WUFFbEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFFRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7O0FBaENhLHFDQUFxQixHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBYnpGLGtDQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHllb21hbiBmcm9tIFwieWVvbWFuLWVudmlyb25tZW50XCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvbW1hbmRlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBjb21wb25lbnQ6IHN0cmluZztcbiAgc2tpcEluc3RhbGw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0ZUNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGVudjogYW55O1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJuZXcgPGNvbXBvbmVudD4gW25hbWVdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2VuZXJhdGVzIGEgbmV3IFRTIEZyYW1ld29yayBhcHBsaWNhdGlvbiBvciBjb21wb25lbnRcIixcbiAgICBvcHRpb25zOiBbXG4gICAgICBbXCItcywgLS1za2lwLWluc3RhbGxcIiwgXCJza2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzXCJdLFxuICAgICAgW1wiLXAsIC0tcGF0aCA8cGF0aD5cIiwgXCJ0aGUgYmFzZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZmlsZSwgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpclwiXSxcbiAgICAgIFtcIi1iLCAtLWJhc2UtdXJsIDx1cmw+XCIsIFwidGhlIGJhc2UgVVJMIGZvciB0aGUgQ29udHJvbGxlciBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCJdLFxuICAgICAgW1wiLXQsIC0tdGFibGUtbmFtZSA8dGFibGVOYW1lPlwiLCBcInRoZSB0YWJsZSBuYW1lIGZvciB0aGUgTW9kZWwgZ2VuZXJhdGlvbiwgbm90IGFwcGxpZWQgdG8gb3RoZXIgY29tcG9uZW50c1wiXVxuICAgIF1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIEFWQUlMQUJMRV9DT01QT0VORU5UUyA9IFtcImFwcFwiLCBcImNvbnRyb2xsZXJcIiwgXCJzZXJ2aWNlXCIsIFwiam9iXCIsIFwibW9kZWxcIl07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5lbnYgPSB5ZW9tYW4uY3JlYXRlRW52KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKGNvbXBvbmVudCwgbmFtZSwgeyBwYXRoID0gXCJcIiwgc2tpcEluc3RhbGwgfTogR2VuZXJhdGVDb21tYW5kT3B0aW9ucykge1xuICAgIGlmIChHZW5lcmF0ZUNvbW1hbmQuQVZBSUxBQkxFX0NPTVBPRU5FTlRTLmluZGV4T2YoY29tcG9uZW50KSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlIHVua25vd24gY29tcG9uZW50OiBcIiR7Y29tcG9uZW50fVwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdG9yTmFtZSA9XG4gICAgICBjb21wb25lbnQgIT09IFwiYXBwXCIgPyBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcImdlbmVyYXRvci10cy1mcmFtZXdvcmtcIjtcblxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuXG4gICAgY29uc3Qgb3B0czogYW55ID0geyBza2lwSW5zdGFsbCB9O1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIG9wdHMucGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke25hbWV9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=