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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVU5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBZXRELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZGpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxPQUFPLEVBQUU7Z0JBQ1AsQ0FBQyxvQkFBb0IsRUFBRSxzREFBc0QsQ0FBQztnQkFDOUUsQ0FBQyxtQkFBbUIsRUFBRSxtRUFBbUUsQ0FBQztnQkFDMUYsQ0FBQyxzQkFBc0IsRUFBRSw2RUFBNkUsQ0FBQztnQkFDdkcsQ0FBQyw4QkFBOEIsRUFBRSwwRUFBMEUsQ0FBQzthQUM3RztTQUNGLENBQUM7UUFNQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBMEI7O1lBQ2xGLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkIsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUN6RTtZQUVELE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbEUsTUFBTSxJQUFJLEdBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUVsQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDakQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FBQTs7QUFsQ2EscUNBQXFCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFiekYsa0NBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY29tbWFuZGVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVDb21tYW5kT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGNvbXBvbmVudDogc3RyaW5nO1xuICBza2lwSW5zdGFsbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgZW52OiBhbnk7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcIm5ldyA8Y29tcG9uZW50PiBbbmFtZV1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJHZW5lcmF0ZXMgYSBuZXcgVFMgRnJhbWV3b3JrIGFwcGxpY2F0aW9uIG9yIGNvbXBvbmVudFwiLFxuICAgIG9wdGlvbnM6IFtcbiAgICAgIFtcIi1zLCAtLXNraXAtaW5zdGFsbFwiLCBcInNraXBzIHlhcm4gaW5zdGFsbGF0aW9uIGFuZCBwb3N0IGdlbmVyYXRpb24gcm91dGluZXNcIl0sXG4gICAgICBbXCItcCwgLS1wYXRoIDxwYXRoPlwiLCBcInRoZSBiYXNlIHBhdGggdG8gY3JlYXRlIHRoZSBmaWxlLCByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyXCJdLFxuICAgICAgW1wiLWIsIC0tYmFzZS11cmwgPHVybD5cIiwgXCJ0aGUgYmFzZSBVUkwgZm9yIHRoZSBDb250cm9sbGVyIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIl0sXG4gICAgICBbXCItdCwgLS10YWJsZS1uYW1lIDx0YWJsZU5hbWU+XCIsIFwidGhlIHRhYmxlIG5hbWUgZm9yIHRoZSBNb2RlbCBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCJdXG4gICAgXVxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgQVZBSUxBQkxFX0NPTVBPRU5FTlRTID0gW1wiYXBwXCIsIFwiY29udHJvbGxlclwiLCBcInNlcnZpY2VcIiwgXCJqb2JcIiwgXCJtb2RlbFwiXTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmVudiA9IHllb21hbi5jcmVhdGVFbnYoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oY29tcG9uZW50LCBuYW1lLCB7IHBhdGggPSBcIlwiLCBza2lwSW5zdGFsbCB9OiBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zKSB7XG4gICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcblxuICAgIGlmIChHZW5lcmF0ZUNvbW1hbmQuQVZBSUxBQkxFX0NPTVBPRU5FTlRTLmluZGV4T2YoY29tcG9uZW50KSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlIHVua25vd24gY29tcG9uZW50OiBcIiR7Y29tcG9uZW50fVwiYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdG9yTmFtZSA9XG4gICAgICBjb21wb25lbnQgIT09IFwiYXBwXCIgPyBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcImdlbmVyYXRvci10cy1mcmFtZXdvcmtcIjtcblxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuXG4gICAgY29uc3Qgb3B0czogYW55ID0geyBza2lwSW5zdGFsbCB9O1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIG9wdHMucGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke25hbWV9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=