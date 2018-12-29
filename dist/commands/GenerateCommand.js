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
            builder: yargs => {
                yargs
                    .boolean("s")
                    .alias("s", "skip-install")
                    .describe("s", "Skips yarn installation and post generation routines");
                yargs
                    .string("p")
                    .alias("p", "path")
                    .describe("p", "The base path to create the file, relative to current working dir");
                yargs
                    .string("b")
                    .alias("b", "base-url")
                    .describe("b", "The base URL for the Controller generation, not applied to other components");
                yargs
                    .string("t")
                    .alias("t", "table-name")
                    .describe("t", "The table name for the Model generation, not applied to other components");
            }
        };
        this.env = yeoman.createEnv();
    }
    run({ component, name, path = "", skipInstall, baseUrl, tableName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
                throw new ts_framework_common_1.BaseError(`Could not generate unknown component: "${component}"`);
            }
            // Ensure entity name was provided for components
            if ((!name || !name.length) && component !== "app") {
                throw new ts_framework_common_1.BaseError(`Cannot not generate a ${component} without a valid name`);
            }
            const generatorName = component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";
            this.env.register(require.resolve(generatorName), `ts-framework`);
            const opts = { skipInstall, baseUrl, tableName };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkRBQWdEO0FBQ2hELDZDQUE2QztBQUM3QyxxREFBOEM7QUFTOUMsTUFBcUIsZUFBZ0IsU0FBUSxxQkFBVztJQStCdEQsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUE5QmpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHdEQUF3RDtZQUNyRSxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSztxQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDO3FCQUNaLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDO3FCQUMxQixRQUFRLENBQUMsR0FBRyxFQUFFLHNEQUFzRCxDQUFDLENBQUM7Z0JBRXpFLEtBQUs7cUJBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEdBQUcsRUFBRSxtRUFBbUUsQ0FBQyxDQUFDO2dCQUV0RixLQUFLO3FCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7cUJBQ3RCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsNkVBQTZFLENBQUMsQ0FBQztnQkFFaEcsS0FBSztxQkFDRixNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDO3FCQUN4QixRQUFRLENBQUMsR0FBRyxFQUFFLDBFQUEwRSxDQUFDLENBQUM7WUFDL0YsQ0FBQztTQUNGLENBQUM7UUFPQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFPOztZQUNuRixJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxNQUFNLElBQUksK0JBQVMsQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUM3RTtZQUVELGlEQUFpRDtZQUNqRCxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDbEQsTUFBTSxJQUFJLCtCQUFTLENBQUMseUJBQXlCLFNBQVMsdUJBQXVCLENBQUMsQ0FBQzthQUNoRjtZQUVELE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDbEUsTUFBTSxJQUFJLEdBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBRXRELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FBQTs7QUFyQ2EsNkJBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEIscUNBQXFCLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBN0JqSCxrQ0FrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBjb21wb25lbnQ6IHN0cmluZztcbiAgc2tpcEluc3RhbGw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0ZUNvbW1hbmQgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIGVudjogYW55O1xuICBjb21tYW5kID0ge1xuICAgIHN5bnRheDogXCJuZXcgPGNvbXBvbmVudD4gW25hbWVdXCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2VuZXJhdGVzIGEgbmV3IFRTIEZyYW1ld29yayBhcHBsaWNhdGlvbiBvciBjb21wb25lbnQuXCIsXG4gICAgYnVpbGRlcjogeWFyZ3MgPT4ge1xuICAgICAgeWFyZ3NcbiAgICAgICAgLmJvb2xlYW4oXCJzXCIpXG4gICAgICAgIC5hbGlhcyhcInNcIiwgXCJza2lwLWluc3RhbGxcIilcbiAgICAgICAgLmRlc2NyaWJlKFwic1wiLCBcIlNraXBzIHlhcm4gaW5zdGFsbGF0aW9uIGFuZCBwb3N0IGdlbmVyYXRpb24gcm91dGluZXNcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJwXCIpXG4gICAgICAgIC5hbGlhcyhcInBcIiwgXCJwYXRoXCIpXG4gICAgICAgIC5kZXNjcmliZShcInBcIiwgXCJUaGUgYmFzZSBwYXRoIHRvIGNyZWF0ZSB0aGUgZmlsZSwgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpclwiKTtcblxuICAgICAgeWFyZ3NcbiAgICAgICAgLnN0cmluZyhcImJcIilcbiAgICAgICAgLmFsaWFzKFwiYlwiLCBcImJhc2UtdXJsXCIpXG4gICAgICAgIC5kZXNjcmliZShcImJcIiwgXCJUaGUgYmFzZSBVUkwgZm9yIHRoZSBDb250cm9sbGVyIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIik7XG5cbiAgICAgIHlhcmdzXG4gICAgICAgIC5zdHJpbmcoXCJ0XCIpXG4gICAgICAgIC5hbGlhcyhcInRcIiwgXCJ0YWJsZS1uYW1lXCIpXG4gICAgICAgIC5kZXNjcmliZShcInRcIiwgXCJUaGUgdGFibGUgbmFtZSBmb3IgdGhlIE1vZGVsIGdlbmVyYXRpb24sIG5vdCBhcHBsaWVkIHRvIG90aGVyIGNvbXBvbmVudHNcIik7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBzdGF0aWMgQVBQX0NPTVBPTkVOVCA9IFwiYXBwXCI7XG4gIHB1YmxpYyBzdGF0aWMgQVZBSUxBQkxFX0NPTVBPRU5FTlRTID0gW0dlbmVyYXRlQ29tbWFuZC5BUFBfQ09NUE9ORU5ULCBcImNvbnRyb2xsZXJcIiwgXCJzZXJ2aWNlXCIsIFwiam9iXCIsIFwibW9kZWxcIl07XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5lbnYgPSB5ZW9tYW4uY3JlYXRlRW52KCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcnVuKHsgY29tcG9uZW50LCBuYW1lLCBwYXRoID0gXCJcIiwgc2tpcEluc3RhbGwsIGJhc2VVcmwsIHRhYmxlTmFtZSB9OiBhbnkpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGBDb3VsZCBub3QgZ2VuZXJhdGUgdW5rbm93biBjb21wb25lbnQ6IFwiJHtjb21wb25lbnR9XCJgKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgZW50aXR5IG5hbWUgd2FzIHByb3ZpZGVkIGZvciBjb21wb25lbnRzXG4gICAgaWYgKCghbmFtZSB8fCAhbmFtZS5sZW5ndGgpICYmIGNvbXBvbmVudCAhPT0gXCJhcHBcIikge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihgQ2Fubm90IG5vdCBnZW5lcmF0ZSBhICR7Y29tcG9uZW50fSB3aXRob3V0IGEgdmFsaWQgbmFtZWApO1xuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRvck5hbWUgPVxuICAgICAgY29tcG9uZW50ICE9PSBcImFwcFwiID8gYGdlbmVyYXRvci10cy1mcmFtZXdvcmsvZ2VuZXJhdG9ycy8ke2NvbXBvbmVudH1gIDogXCJnZW5lcmF0b3ItdHMtZnJhbWV3b3JrXCI7XG5cbiAgICB0aGlzLmVudi5yZWdpc3RlcihyZXF1aXJlLnJlc29sdmUoZ2VuZXJhdG9yTmFtZSksIGB0cy1mcmFtZXdvcmtgKTtcbiAgICBjb25zdCBvcHRzOiBhbnkgPSB7IHNraXBJbnN0YWxsLCBiYXNlVXJsLCB0YWJsZU5hbWUgfTtcblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBvcHRzLnBhdGggPSBwYXRoO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5lbnYucnVuKGB0cy1mcmFtZXdvcmsgJHtuYW1lID8gbmFtZSA6IFwiXCJ9YCwgb3B0cywgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=