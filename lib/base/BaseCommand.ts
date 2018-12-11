import { Logger, LoggerInstance } from "ts-framework-common";

export interface BaseCommandOptions {
  logger?: LoggerInstance;
}

export interface CommanderDefs {
  syntax: string;
  description: string;
  options?: string[][];
}

export default abstract class BaseCommand {
  public logger: LoggerInstance;
  public abstract command: CommanderDefs;

  constructor(public options: BaseCommandOptions = {}) {
    this.run = this.run.bind(this);
    this.logger = options.logger || Logger.getInstance();
  }

  public abstract async run(...args: any[]): Promise<void>;
}
