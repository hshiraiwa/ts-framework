import BaseCommand from '../base/BaseCommand';
import Server, { ServerOptions } from '../server';
export default class ConsoleCommand extends BaseCommand {
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath: string, options?: ServerOptions): Promise<Server>;
    /**
     * Runs the REPL console in the supplied Server instance.
     */
    run(): Promise<void>;
}
