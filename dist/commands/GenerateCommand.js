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
    constructor() {
        super();
        this.env = yeoman.createEnv();
    }
    run({ name, component, skipInstall }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
                throw new Error(`Could not generate unknown component: "${component}"`);
            }
            // Prepare generator name resolution
            const generatorName = component !== 'app' ?
                `generator-ts-framework/generators/${component}` :
                'generator-ts-framework';
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
GenerateCommand.AVAILABLE_COMPOENENTS = ['app', 'controller'];
exports.default = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VuZXJhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbW1hbmRzL0dlbmVyYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLHFEQUE4QztBQVE5QyxNQUFxQixlQUFnQixTQUFRLHFCQUFtQztJQUs5RTtRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUEwQjs7WUFDdkUsSUFBSSxlQUFlLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUN6RTtZQUVELG9DQUFvQztZQUNwQyxNQUFNLGFBQWEsR0FBRyxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLHFDQUFxQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCx3QkFBd0IsQ0FBQztZQUUzQix1RkFBdUY7WUFDdkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVsRSxtQ0FBbUM7WUFDbkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNmO3FCQUFNO29CQUNMLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FBQTs7QUE5QmEscUNBQXFCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFIOUQsa0NBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgeWVvbWFuIGZyb20gXCJ5ZW9tYW4tZW52aXJvbm1lbnRcIjtcbmltcG9ydCBCYXNlQ29tbWFuZCBmcm9tIFwiLi4vYmFzZS9CYXNlQ29tbWFuZFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMge1xuICBuYW1lPzogc3RyaW5nLFxuICBjb21wb25lbnQ6IHN0cmluZyxcbiAgc2tpcEluc3RhbGw/OiBib29sZWFuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRlQ29tbWFuZCBleHRlbmRzIEJhc2VDb21tYW5kPEdlbmVyYXRlQ29tbWFuZE9wdGlvbnM+IHtcbiAgZW52OiBhbnk7XG5cbiAgcHVibGljIHN0YXRpYyBBVkFJTEFCTEVfQ09NUE9FTkVOVFMgPSBbJ2FwcCcsICdjb250cm9sbGVyJ107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVudiA9IHllb21hbi5jcmVhdGVFbnYoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4oeyBuYW1lLCBjb21wb25lbnQsIHNraXBJbnN0YWxsIH06IEdlbmVyYXRlQ29tbWFuZE9wdGlvbnMpIHtcbiAgICBpZiAoR2VuZXJhdGVDb21tYW5kLkFWQUlMQUJMRV9DT01QT0VORU5UUy5pbmRleE9mKGNvbXBvbmVudCkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBnZW5lcmF0ZSB1bmtub3duIGNvbXBvbmVudDogXCIke2NvbXBvbmVudH1cImApO1xuICAgIH1cblxuICAgIC8vIFByZXBhcmUgZ2VuZXJhdG9yIG5hbWUgcmVzb2x1dGlvblxuICAgIGNvbnN0IGdlbmVyYXRvck5hbWUgPSBjb21wb25lbnQgIT09ICdhcHAnID8gXG4gICAgICBgZ2VuZXJhdG9yLXRzLWZyYW1ld29yay9nZW5lcmF0b3JzLyR7Y29tcG9uZW50fWAgOiBcbiAgICAgICdnZW5lcmF0b3ItdHMtZnJhbWV3b3JrJztcblxuICAgIC8vIEhlcmUgd2UgcmVnaXN0ZXIgYSBnZW5lcmF0b3IgYmFzZWQgb24gaXRzIHBhdGguIFByb3ZpZGluZyB0aGUgbmFtZXNwYWNlIGlzIG9wdGlvbmFsLlxuICAgIHRoaXMuZW52LnJlZ2lzdGVyKHJlcXVpcmUucmVzb2x2ZShnZW5lcmF0b3JOYW1lKSwgYHRzLWZyYW1ld29ya2ApO1xuXG4gICAgLy8gT3IgcGFzc2luZyBhcmd1bWVudHMgYW5kIG9wdGlvbnNcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIHRoaXMuZW52LnJ1bihgdHMtZnJhbWV3b3JrICR7bmFtZX1gLCB7IHNraXBJbnN0YWxsIH0sIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19