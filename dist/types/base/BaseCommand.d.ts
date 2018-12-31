import { Argv } from "yargs";
import { LoggerInstance } from "ts-framework-common";
export interface BaseCommandOptions {
    logger?: LoggerInstance;
    entrypoint?: string;
    port?: string | number;
    env?: string;
}
export interface CommanderDefs {
    syntax: string;
    description: string;
    handler?: ((yargs: Argv) => Argv) | {
        [label: string]: any;
    };
    builder?: ((yargs: Argv) => Argv) | {
        [label: string]: any;
    };
}
export default abstract class BaseCommand {
    options: BaseCommandOptions;
    logger: LoggerInstance;
    abstract command: CommanderDefs;
    constructor(options?: BaseCommandOptions);
    onProgram(yargs: Argv): Promise<any>;
    abstract run(argv: any): Promise<void>;
}
