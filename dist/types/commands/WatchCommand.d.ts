import BaseCommand from "../base/BaseCommand";
export default class WatchCommandCommand extends BaseCommand<{
    entrypoint: string;
}> {
    run({ entrypoint }: {
        entrypoint: any;
    }): Promise<void>;
}
