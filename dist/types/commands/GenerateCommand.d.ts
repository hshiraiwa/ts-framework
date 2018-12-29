import BaseCommand from "../base/BaseCommand";
export interface GenerateCommandOptions {
    name?: string;
    path?: string;
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
    static APP_COMPONENT: string;
    static AVAILABLE_COMPOENENTS: string[];
    constructor(options?: {});
    run({ component, name, path, skipInstall }: any): Promise<void>;
}
