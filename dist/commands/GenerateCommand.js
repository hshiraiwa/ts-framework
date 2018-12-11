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
            syntax: 'new <component> [name]',
            description: 'Generates a new TS Framework application or component',
            options: [
                ['-s, --skip-install', 'Skips yarn installation and post generation routines']
            ]
        };
        this.env = yeoman.createEnv();
    }
    run(component, name, { skipInstall }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVE5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFXO0lBWXRELFlBQVksT0FBTyxHQUFHLEVBQUU7UUFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBWGpCLFlBQU8sR0FBRztZQUNSLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxPQUFPLEVBQUU7Z0JBQ1AsQ0FBQyxvQkFBb0IsRUFBRSxzREFBc0QsQ0FBQzthQUMvRTtTQUNGLENBQUM7UUFNQSxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRVksR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxXQUFXLEVBQTBCOztZQUN2RSxJQUFJLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoRSxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsb0NBQW9DO1lBQ3BDLE1BQU0sYUFBYSxHQUNqQixTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQ0FBcUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1lBRXBHLHVGQUF1RjtZQUN2RixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRWxFLG1DQUFtQztZQUNuQyxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1RCxJQUFJLEtBQUssRUFBRTtvQkFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQztLQUFBOztBQTdCYSxxQ0FBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBVmhGLGtDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHllb21hbiBmcm9tIFwieWVvbWFuLWVudmlyb25tZW50XCI7XG5pbXBvcnQgQmFzZUNvbW1hbmQgZnJvbSBcIi4uL2Jhc2UvQmFzZUNvbW1hbmRcIjtcblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZUNvbW1hbmRPcHRpb25zIHtcbiAgbmFtZT86IHN0cmluZztcbiAgY29tcG9uZW50OiBzdHJpbmc7XG4gIHNraXBJbnN0YWxsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGVDb21tYW5kIGV4dGVuZHMgQmFzZUNvbW1hbmQge1xuICBlbnY6IGFueTtcbiAgY29tbWFuZCA9IHtcbiAgICBzeW50YXg6ICduZXcgPGNvbXBvbmVudD4gW25hbWVdJyxcbiAgICBkZXNjcmlwdGlvbjogJ0dlbmVyYXRlcyBhIG5ldyBUUyBGcmFtZXdvcmsgYXBwbGljYXRpb24gb3IgY29tcG9uZW50JyxcbiAgICBvcHRpb25zOiBbXG4gICAgICBbJy1zLCAtLXNraXAtaW5zdGFsbCcsICdTa2lwcyB5YXJuIGluc3RhbGxhdGlvbiBhbmQgcG9zdCBnZW5lcmF0aW9uIHJvdXRpbmVzJ11cbiAgICBdXG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBBVkFJTEFCTEVfQ09NUE9FTkVOVFMgPSBbXCJhcHBcIiwgXCJjb250cm9sbGVyXCIsIFwic2VydmljZVwiLCBcImpvYlwiXTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmVudiA9IHllb21hbi5jcmVhdGVFbnYoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oY29tcG9uZW50LCBuYW1lLCB7IHNraXBJbnN0YWxsIH06IEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBnZW5lcmF0ZSB1bmtub3duIGNvbXBvbmVudDogXCIke2NvbXBvbmVudH1cImApO1xuICAgIH1cblxuICAgIC8vIFByZXBhcmUgZ2VuZXJhdG9yIG5hbWUgcmVzb2x1dGlvblxuICAgIGNvbnN0IGdlbmVyYXRvck5hbWUgPVxuICAgICAgY29tcG9uZW50ICE9PSBcImFwcFwiID8gYGdlbmVyYXRvci10cy1mcmFtZXdvcmsvZ2VuZXJhdG9ycy8ke2NvbXBvbmVudH1gIDogXCJnZW5lcmF0b3ItdHMtZnJhbWV3b3JrXCI7XG5cbiAgICAvLyBIZXJlIHdlIHJlZ2lzdGVyIGEgZ2VuZXJhdG9yIGJhc2VkIG9uIGl0cyBwYXRoLiBQcm92aWRpbmcgdGhlIG5hbWVzcGFjZSBpcyBvcHRpb25hbC5cbiAgICB0aGlzLmVudi5yZWdpc3RlcihyZXF1aXJlLnJlc29sdmUoZ2VuZXJhdG9yTmFtZSksIGB0cy1mcmFtZXdvcmtgKTtcblxuICAgIC8vIE9yIHBhc3NpbmcgYXJndW1lbnRzIGFuZCBvcHRpb25zXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLmVudi5ydW4oYHRzLWZyYW1ld29yayAke25hbWV9YCwgeyBza2lwSW5zdGFsbCB9LCBlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==