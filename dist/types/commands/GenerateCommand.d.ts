import BaseCommand from "../base/BaseCommand";
export interface GenerateCommandOptions {
    name?: string;
    component: string;
    skipInstall?: boolean;
}
export default class GenerateCommand extends BaseCommand {
    env: any;
    command: {
        syntax: string;
        description: string;
        options: string[][];
    };
    static AVAILABLE_COMPOENENTS: string[];
    constructor(options?: {});
    run(component: any, name: any, { skipInstall }: GenerateCommandOptions): Promise<void>;
}
