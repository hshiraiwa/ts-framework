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
const ts_framework_common_1 = require("ts-framework-common");
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
                throw new ts_framework_common_1.BaseError(`Could not generate unknown component: "${component}"`);
            }
            // Ensure entity name was provided for components
            if (!name && component !== "app") {
                throw new ts_framework_common_1.BaseError(`Could not generate ${component} without a name`);
            }
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            this.env.register(require.resolve(generatorName), `ts-framework`);
            const opts = { skipInstall };
            if (path) {
                opts.path = path;
            }
            return new Promise((resolve, reject) => this.env.run(`ts-framework ${name ? name : ""}`, opts, error => {
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
GenerateCommand.APP_COMPONENT = "app";
GenerateCommand.AVAILABLE_COMPOENENTS = [GenerateCommand.APP_COMPONENT, "controller", "service", "job", "model"];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLDZEQUFnRDtBQUNoRCxxREFBOEM7QUFTOUMsTUFBcUIsZUFBZ0IsU0FBUSxxQkFBVztJQWdCdEQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFmakIsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxXQUFXLEVBQUUsd0RBQXdEO1lBQ3JFLE9BQU8sRUFBRTtnQkFDUCxDQUFDLG9CQUFvQixFQUFFLHNEQUFzRCxDQUFDO2dCQUM5RSxDQUFDLG1CQUFtQixFQUFFLG1FQUFtRSxDQUFDO2dCQUMxRixDQUFDLHNCQUFzQixFQUFFLDZFQUE2RSxDQUFDO2dCQUN2RyxDQUFDLDhCQUE4QixFQUFFLDBFQUEwRSxDQUFDO2FBQzdHO1NBQ0YsQ0FBQztRQU9BLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFWSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUEwQjs7WUFDbEYsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLCtCQUFTLENBQUMsMENBQTBDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDN0U7WUFFRCxpREFBaUQ7WUFDakQsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO2dCQUNoQyxNQUFNLElBQUksK0JBQVMsQ0FBQyxzQkFBc0IsU0FBUyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsTUFBTSxhQUFhLEdBQ2pCLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7WUFFcEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVsRSxNQUFNLElBQUksR0FBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO1lBRWxDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FBQTs7QUF0Q2EsNkJBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEIscUNBQXFCLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBZGpILGtDQW9EQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHllb21hbiBmcm9tIFwieWVvbWFuLWVudmlyb25tZW50XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IEJhc2VDb21tYW5kIGZyb20gXCIuLi9iYXNlL0Jhc2VDb21tYW5kXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVDb21tYW5kT3B0aW9ucyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHBhdGg/OiBzdHJpbmc7XG4gIGNvbXBvbmVudDogc3RyaW5nO1xuICBza2lwSW5zdGFsbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kIHtcbiAgZW52OiBhbnk7XG4gIGNvbW1hbmQgPSB7XG4gICAgc3ludGF4OiBcIm5ldyA8Y29tcG9uZW50PiBbbmFtZV1cIixcbiAgICBkZXNjcmlwdGlvbjogXCJHZW5lcmF0ZXMgYSBuZXcgVFMgRnJhbWV3b3JrIGFwcGxpY2F0aW9uIG9yIGNvbXBvbmVudC5cIixcbiAgICBvcHRpb25zOiBbXG4gICAgICBbXCItcywgLS1za2lwLWluc3RhbGxcIiwgXCJza2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzXCJdLFxuICAgICAgW1wiLXAsIC0tcGF0aCA8cGF0aD5cIiwgXCJ0aGUgYmFzZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZmlsZSwgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpclwiXSxcbiAgICAgIFtcIi1iLCAtLWJhc2UtdXJsIDx1cmw+XCIsIFwidGhlIGJhc2UgVVJMIGZvciB0aGUgQ29udHJvbGxlciBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCJdLFxuICAgICAgW1wiLXQsIC0tdGFibGUtbmFtZSA8dGFibGVOYW1lPlwiLCBcInRoZSB0YWJsZSBuYW1lIGZvciB0aGUgTW9kZWwgZ2VuZXJhdGlvbiwgbm90IGFwcGxpZWQgdG8gb3RoZXIgY29tcG9uZW50c1wiXVxuICAgIF1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIEFQUF9DT01QT05FTlQgPSBcImFwcFwiO1xuICBwdWJsaWMgc3RhdGljIEFWQUlMQUJMRV9DT01QT0VORU5UUyA9IFtHZW5lcmF0ZUNvbW1hbmQuQVBQX0NPTVBPTkVOVCwgXCJjb250cm9sbGVyXCIsIFwic2VydmljZVwiLCBcImpvYlwiLCBcIm1vZGVsXCJdO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuZW52ID0geWVvbWFuLmNyZWF0ZUVudigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihjb21wb25lbnQsIG5hbWUsIHsgcGF0aCA9IFwiXCIsIHNraXBJbnN0YWxsIH06IEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgZ2VuZXJhdGUgdW5rbm93biBjb21wb25lbnQ6IFwiJHtjb21wb25lbnR9XCJgKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgZW50aXR5IG5hbWUgd2FzIHByb3ZpZGVkIGZvciBjb21wb25lbnRzXG4gICAgaWYgKCFuYW1lICYmIGNvbXBvbmVudCAhPT0gXCJhcHBcIikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlICR7Y29tcG9uZW50fSB3aXRob3V0IGEgbmFtZWApO1xuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRvck5hbWUgPVxuICAgICAgY29tcG9uZW50ICE9PSBcImFwcFwiID8gYGdlbmVyYXRvci10cy1mcmFtZXdvcmsvZ2VuZXJhdG9ycy8ke2NvbXBvbmVudH1gIDogXCJnZW5lcmF0b3ItdHMtZnJhbWV3b3JrXCI7XG5cbiAgICB0aGlzLmVudi5yZWdpc3RlcihyZXF1aXJlLnJlc29sdmUoZ2VuZXJhdG9yTmFtZSksIGB0cy1mcmFtZXdvcmtgKTtcblxuICAgIGNvbnN0IG9wdHM6IGFueSA9IHsgc2tpcEluc3RhbGwgfTtcblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBvcHRzLnBhdGggPSBwYXRoO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5lbnYucnVuKGB0cy1mcmFtZXdvcmsgJHtuYW1lID8gbmFtZSA6IFwiXCJ9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=