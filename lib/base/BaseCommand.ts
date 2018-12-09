import { Logger, LoggerInstance } from "ts-framework-common";

export interface BaseCommandOptions {
  logger?: LoggerInstance;
}

export default abstract class BaseCommand<Options> {
  public logger: LoggerInstance;

  constructor(public options: BaseCommandOptions = {}) {
    this.run = this.run.bind(this);
    this.logger = options.logger || Logger.getInstance();
  }

  public abstract async run(options: Options): Promise<void>;
}
