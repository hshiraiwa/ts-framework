import BaseCommand from "../base/BaseCommand";
export default class WatchCommand extends BaseCommand<{
    entrypoint: string;
}> {
    run({ entrypoint }: {
        entrypoint: any;
    }): Promise<void>;
}
