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
            description: "Generates a new TS Framework application or component.",
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
            // Ensure entity name was provided for components
            if (!name && component !== 'app') {
                throw new Error(`Could not generate ${component} without a name`);
            }
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            this.env.register(require.resolve(generatorName), `ts-framework`);
            const opts = { skipInstall };
            if (path) {
                opts.path = path;
            }
            return new Promise((resolve, reject) => this.env.run(`ts-framework ${name ? name : ''}`, opts, error => {
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
GenerateCommand.APP_COMPONENT = 'app';
GenerateCommand.AVAILABLE_COMPOENENTS = [
    GenerateCommand.APP_COMPONENT,
    "controller",
    "service",
    "job",
    "model"
];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVM5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBc0J0RCxZQUFZLE9BQU8sR0FBRyxFQUFFO1FBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQXJCakIsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxXQUFXLEVBQUUsd0RBQXdEO1lBQ3JFLE9BQU8sRUFBRTtnQkFDUCxDQUFDLG9CQUFvQixFQUFFLHNEQUFzRCxDQUFDO2dCQUM5RSxDQUFDLG1CQUFtQixFQUFFLG1FQUFtRSxDQUFDO2dCQUMxRixDQUFDLHNCQUFzQixFQUFFLDZFQUE2RSxDQUFDO2dCQUN2RyxDQUFDLDhCQUE4QixFQUFFLDBFQUEwRSxDQUFDO2FBQzdHO1NBQ0YsQ0FBQztRQWFBLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFWSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUEwQjs7WUFDbEYsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUN6RTtZQUVELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLFNBQVMsaUJBQWlCLENBQUMsQ0FBQzthQUNuRTtZQUVELE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbEUsTUFBTSxJQUFJLEdBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUVsQyxJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUVELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDO0tBQUE7O0FBNUNhLDZCQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLHFDQUFxQixHQUFHO0lBQ3BDLGVBQWUsQ0FBQyxhQUFhO0lBQzdCLFlBQVk7SUFDWixTQUFTO0lBQ1QsS0FBSztJQUNMLE9BQU87Q0FDUixDQUFDO0FBcEJKLGtDQTBEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHllb21hbiBmcm9tIFwieWVvbWFuLWVudmlyb25tZW50XCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50LlwiLFxuICAgIG9wdGlvbnM6IFtcbiAgICAgIFtcIi1zLCAtLXNraXAtaW5zdGFsbFwiLCBcInNraXBzIHlhcm4gaW5zdGFsbGF0aW9uIGFuZCBwb3N0IGdlbmVyYXRpb24gcm91dGluZXNcIl0sXG4gICAgICBbXCItcCwgLS1wYXRoIDxwYXRoPlwiLCBcInRoZSBiYXNlIHBhdGggdG8gY3JlYXRlIHRoZSBmaWxlLCByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyXCJdLFxuICAgICAgW1wiLWIsIC0tYmFzZS11cmwgPHVybD5cIiwgXCJ0aGUgYmFzZSBVUkwgZm9yIHRoZSBDb250cm9sbGVyIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIl0sXG4gICAgICBbXCItdCwgLS10YWJsZS1uYW1lIDx0YWJsZU5hbWU+XCIsIFwidGhlIHRhYmxlIG5hbWUgZm9yIHRoZSBNb2RlbCBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCJdXG4gICAgXVxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgQVBQX0NPTVBPTkVOVCA9ICdhcHAnO1xuICBwdWJsaWMgc3RhdGljIEFWQUlMQUJMRV9DT01QT0VORU5UUyA9IFtcbiAgICBHZW5lcmF0ZUNvbW1hbmQuQVBQX0NPTVBPTkVOVCxcbiAgICBcImNvbnRyb2xsZXJcIixcbiAgICBcInNlcnZpY2VcIixcbiAgICBcImpvYlwiLFxuICAgIFwibW9kZWxcIlxuICBdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuZW52ID0geWVvbWFuLmNyZWF0ZUVudigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihjb21wb25lbnQsIG5hbWUsIHsgcGF0aCA9IFwiXCIsIHNraXBJbnN0YWxsIH06IEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBnZW5lcmF0ZSB1bmtub3duIGNvbXBvbmVudDogXCIke2NvbXBvbmVudH1cImApO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSBlbnRpdHkgbmFtZSB3YXMgcHJvdmlkZWQgZm9yIGNvbXBvbmVudHNcbiAgICBpZiAoIW5hbWUgJiYgY29tcG9uZW50ICE9PSAnYXBwJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZ2VuZXJhdGUgJHtjb21wb25lbnR9IHdpdGhvdXQgYSBuYW1lYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2VuZXJhdG9yTmFtZSA9XG4gICAgICBjb21wb25lbnQgIT09IFwiYXBwXCIgPyBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcImdlbmVyYXRvci10cy1mcmFtZXdvcmtcIjtcblxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuXG4gICAgY29uc3Qgb3B0czogYW55ID0geyBza2lwSW5zdGFsbCB9O1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIG9wdHMucGF0aCA9IHBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke25hbWUgPyBuYW1lIDogJyd9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=