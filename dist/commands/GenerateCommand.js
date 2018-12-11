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
    run(component, name, { path = '', skipInstall }) {
        return __awaiter(this, arguments, void 0, function* () {
            console.log(arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVU5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBZXRELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZGpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxPQUFPLEVBQUU7Z0JBQ1AsQ0FBQyxvQkFBb0IsRUFBRSxzREFBc0QsQ0FBQztnQkFDOUUsQ0FBQyxtQkFBbUIsRUFBRSxtRUFBbUUsQ0FBQztnQkFDMUYsQ0FBQyxzQkFBc0IsRUFBRSw2RUFBNkUsQ0FBQztnQkFDdkcsQ0FBQyw4QkFBOEIsRUFBRSwwRUFBMEUsQ0FBQzthQUM3RztTQUNGLENBQUM7UUFNQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBMEI7O1lBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkIsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUN6RTtZQUVELE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbEUsTUFBTSxJQUFJLEdBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUVsQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMvRixJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQztLQUFBOztBQWhDYSxxQ0FBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQWJ6RixrQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB5ZW9tYW4gZnJvbSBcInllb21hbi1lbnZpcm9ubWVudFwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5pbXBvcnQgeyBDb21tYW5kIH0gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jb21tYW5kZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50XCIsXG4gICAgb3B0aW9uczogW1xuICAgICAgW1wiLXMsIC0tc2tpcC1pbnN0YWxsXCIsIFwic2tpcHMgeWFybiBpbnN0YWxsYXRpb24gYW5kIHBvc3QgZ2VuZXJhdGlvbiByb3V0aW5lc1wiXSxcbiAgICAgIFtcIi1wLCAtLXBhdGggPHBhdGg+XCIsIFwidGhlIGJhc2UgcGF0aCB0byBjcmVhdGUgdGhlIGZpbGUsIHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJcIl0sXG4gICAgICBbXCItYiwgLS1iYXNlLXVybCA8dXJsPlwiLCBcInRoZSBiYXNlIFVSTCBmb3IgdGhlIENvbnRyb2xsZXIgZ2VuZXJhdGlvbiwgbm90IGFwcGxpZWQgdG8gb3RoZXIgY29tcG9uZW50c1wiXSxcbiAgICAgIFtcIi10LCAtLXRhYmxlLW5hbWUgPHRhYmxlTmFtZT5cIiwgXCJ0aGUgdGFibGUgbmFtZSBmb3IgdGhlIE1vZGVsIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIl1cbiAgICBdXG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBBVkFJTEFCTEVfQ09NUE9FTkVOVFMgPSBbXCJhcHBcIiwgXCJjb250cm9sbGVyXCIsIFwic2VydmljZVwiLCBcImpvYlwiLCBcIm1vZGVsXCJdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuZW52ID0geWVvbWFuLmNyZWF0ZUVudigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihjb21wb25lbnQsIG5hbWUsIHsgcGF0aCA9ICcnLCBza2lwSW5zdGFsbCB9OiBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcblxuICAgIGlmIChHZW5lcmF0ZUNvbW1hbmQuQVZBSUxBQkxFX0NPTVBPRU5FTlRTLmluZGV4T2YoY29tcG9uZW50KSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlIHVua25vd24gY29tcG9uZW50OiBcIiR7Y29tcG9uZW50fVwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdG9yTmFtZSA9XG4gICAgICBjb21wb25lbnQgIT09IFwiYXBwXCIgPyBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcImdlbmVyYXRvci10cy1mcmFtZXdvcmtcIjtcblxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuXG4gICAgY29uc3Qgb3B0czogYW55ID0geyBza2lwSW5zdGFsbCB9O1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIG9wdHMucGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHRoaXMuZW52LnJ1bihgdHMtZnJhbWV3b3JrICR7bmFtZX1gLCBvcHRzLCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cbn1cbiJdfQ==