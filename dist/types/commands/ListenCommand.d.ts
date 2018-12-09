import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";
export default class WatchCommandCommand extends BaseCommand<{
    entrypoint: string;
}> {
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath: string, options?: ServerOptions): Promise<Server>;
    run({ entrypoint }: {
        entrypoint: any;
    }): Promise<void>;
}
