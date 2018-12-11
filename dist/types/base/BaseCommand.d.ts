import { Command } from "commander";
import { LoggerInstance } from "ts-framework-common";
export interface BaseCommandOptions {
    logger?: LoggerInstance;
}
export interface CommanderDefs {
    syntax: string;
    description: string;
    options?: string[][];
}
export default abstract class BaseCommand {
    options: BaseCommandOptions;
    logger: LoggerInstance;
    abstract command: CommanderDefs;
    constructor(options?: BaseCommandOptions);
    onProgram(program: Command): Promise<Command>;
    abstract run(...args: any[]): Promise<void>;
}
