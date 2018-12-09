import BaseCommand from "../base/BaseCommand";
export interface GenerateCommandOptions {
    name?: string;
    component: string;
    skipInstall?: boolean;
}
export default class GenerateCommand extends BaseCommand<GenerateCommandOptions> {
    env: any;
    static AVAILABLE_COMPOENENTS: string[];
    constructor(options?: {});
    run({ name, component, skipInstall }: GenerateCommandOptions): Promise<void>;
}
