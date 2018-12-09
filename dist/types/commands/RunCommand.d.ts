import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";
export default class RunCommand extends BaseCommand<{
    entrypoint: string;
}> {
    exec(cmd: any): Promise<void>;
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath: string, options?: ServerOptions): Promise<Server>;
    prepare({ entrypoint, env }: {
        entrypoint: any;
        env: any;
    }): Promise<string>;
    run({ entrypoint, env }: {
        entrypoint: any;
        env: any;
    }): Promise<void>;
}
