import BaseCommand from "../base/BaseCommand";
export default class WatchCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        options: string[][];
    };
    run(entrypoint: string, options: any): Promise<void>;
}
