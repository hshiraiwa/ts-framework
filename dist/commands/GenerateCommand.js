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
const ts_framework_common_1 = require("ts-framework-common");
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
    run({ component, name, path = "", skipInstall }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxxREFBOEM7QUFTOUMsTUFBcUIsZUFBZ0IsU0FBUSxxQkFBVztJQWdCdEQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFmakIsWUFBTyxHQUFHO1lBQ1IsTUFBTSxFQUFFLHdCQUF3QjtZQUNoQyxXQUFXLEVBQUUsd0RBQXdEO1lBQ3JFLE9BQU8sRUFBRTtnQkFDUCxDQUFDLG9CQUFvQixFQUFFLHNEQUFzRCxDQUFDO2dCQUM5RSxDQUFDLG1CQUFtQixFQUFFLG1FQUFtRSxDQUFDO2dCQUMxRixDQUFDLHNCQUFzQixFQUFFLDZFQUE2RSxDQUFDO2dCQUN2RyxDQUFDLDhCQUE4QixFQUFFLDBFQUEwRSxDQUFDO2FBQzdHO1NBQ0YsQ0FBQztRQU9BLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFWSxHQUFHLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFPOztZQUM5RCxJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxNQUFNLElBQUksK0JBQVMsQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUM3RTtZQUVELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2hDLE1BQU0sSUFBSSwrQkFBUyxDQUFDLHNCQUFzQixTQUFTLGlCQUFpQixDQUFDLENBQUM7YUFDdkU7WUFFRCxNQUFNLGFBQWEsR0FDakIsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMscUNBQXFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztZQUVwRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sSUFBSSxHQUFRLEVBQUUsV0FBVyxFQUFFLENBQUM7WUFFbEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFFRCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM3RCxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQztLQUFBOztBQXRDYSw2QkFBYSxHQUFHLEtBQUssQ0FBQztBQUN0QixxQ0FBcUIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFkakgsa0NBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCAqIGFzIHllb21hbiBmcm9tIFwieWVvbWFuLWVudmlyb25tZW50XCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgcGF0aD86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6IFwibmV3IDxjb21wb25lbnQ+IFtuYW1lXVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkdlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50LlwiLFxuICAgIG9wdGlvbnM6IFtcbiAgICAgIFtcIi1zLCAtLXNraXAtaW5zdGFsbFwiLCBcInNraXBzIHlhcm4gaW5zdGFsbGF0aW9uIGFuZCBwb3N0IGdlbmVyYXRpb24gcm91dGluZXNcIl0sXG4gICAgICBbXCItcCwgLS1wYXRoIDxwYXRoPlwiLCBcInRoZSBiYXNlIHBhdGggdG8gY3JlYXRlIHRoZSBmaWxlLCByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyXCJdLFxuICAgICAgW1wiLWIsIC0tYmFzZS11cmwgPHVybD5cIiwgXCJ0aGUgYmFzZSBVUkwgZm9yIHRoZSBDb250cm9sbGVyIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIl0sXG4gICAgICBbXCItdCwgLS10YWJsZS1uYW1lIDx0YWJsZU5hbWU+XCIsIFwidGhlIHRhYmxlIG5hbWUgZm9yIHRoZSBNb2RlbCBnZW5lcmF0aW9uLCBub3QgYXBwbGllZCB0byBvdGhlciBjb21wb25lbnRzXCJdXG4gICAgXVxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgQVBQX0NPTVBPTkVOVCA9IFwiYXBwXCI7XG4gIHB1YmxpYyBzdGF0aWMgQVZBSUxBQkxFX0NPTVBPRU5FTlRTID0gW0dlbmVyYXRlQ29tbWFuZC5BUFBfQ09NUE9ORU5ULCBcImNvbnRyb2xsZXJcIiwgXCJzZXJ2aWNlXCIsIFwiam9iXCIsIFwibW9kZWxcIl07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5lbnYgPSB5ZW9tYW4uY3JlYXRlRW52KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHtjb21wb25lbnQsIG5hbWUsIHBhdGggPSBcIlwiLCBza2lwSW5zdGFsbCB9OiBhbnkpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgZ2VuZXJhdGUgdW5rbm93biBjb21wb25lbnQ6IFwiJHtjb21wb25lbnR9XCJgKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgZW50aXR5IG5hbWUgd2FzIHByb3ZpZGVkIGZvciBjb21wb25lbnRzXG4gICAgaWYgKCFuYW1lICYmIGNvbXBvbmVudCAhPT0gXCJhcHBcIikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ291bGQgbm90IGdlbmVyYXRlICR7Y29tcG9uZW50fSB3aXRob3V0IGEgbmFtZWApO1xuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRvck5hbWUgPVxuICAgICAgY29tcG9uZW50ICE9PSBcImFwcFwiID8gYGdlbmVyYXRvci10cy1mcmFtZXdvcmsvZ2VuZXJhdG9ycy8ke2NvbXBvbmVudH1gIDogXCJnZW5lcmF0b3ItdHMtZnJhbWV3b3JrXCI7XG5cbiAgICB0aGlzLmVudi5yZWdpc3RlcihyZXF1aXJlLnJlc29sdmUoZ2VuZXJhdG9yTmFtZSksIGB0cy1mcmFtZXdvcmtgKTtcblxuICAgIGNvbnN0IG9wdHM6IGFueSA9IHsgc2tpcEluc3RhbGwgfTtcblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBvcHRzLnBhdGggPSBwYXRoO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5lbnYucnVuKGB0cy1mcmFtZXdvcmsgJHtuYW1lID8gbmFtZSA6IFwiXCJ9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=