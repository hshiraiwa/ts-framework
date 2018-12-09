import { LoggerInstance } from 'ts-framework-common';
export interface BaseCommandOptions {
    logger?: LoggerInstance;
}
export default abstract class BaseCommand<Options> {
    options: BaseCommandOptions;
    logger: LoggerInstance;
    constructor(options?: BaseCommandOptions);
    abstract run(options: Options): Promise<void>;
}
