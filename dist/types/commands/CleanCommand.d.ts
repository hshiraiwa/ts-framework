import BaseCommand from "../base/BaseCommand";
export default class ListenCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        handler: (yargs: any) => any;
    };
    run({ entrypoint, ...options }: {
        [x: string]: any;
        entrypoint?: string;
    }): Promise<void>;
}
