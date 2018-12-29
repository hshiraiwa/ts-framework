import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";
export default class RunCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        builder: (yargs: any) => any;
    };
    /**
     * Simple method for executing child processes.
     */
    exec(cmd: any): Promise<void>;
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath: string, options?: ServerOptions): Promise<Server>;
    prepareDevelopment({ entrypoint }: {
        entrypoint: any;
    }): Promise<string>;
    prepare({ entrypoint, env }: {
        entrypoint: any;
        env: any;
    }): Promise<string>;
    run({ entrypoint, ...options }: {
        [x: string]: any;
        entrypoint?: string;
    }): Promise<void>;
}
