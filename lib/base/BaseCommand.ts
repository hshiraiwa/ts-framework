import { Command } from "commander";
import { Logger, LoggerInstance } from "ts-framework-common";

export interface BaseCommandOptions {
  logger?: LoggerInstance;
  entrypoint?: string;
  port?: string | number;
  env?: string;
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

  public async onProgram(program: Command): Promise<Command> {
    // Prepare command syntax
    const p = program.command(this.command.syntax).description(this.command.description);

    // Bind command arguments
    if (this.command.options) {
      this.command.options.map(options => {
        p.option.apply(p, options);
      });
    }

    // Bind command action
    p.action(async (...args) => {
      try {
        return await this.run.apply(this, args);
      } catch (exception) {
        this.logger.error(exception);
        setTimeout(() => process.exit(1), 1000);
      }
    });
    return p;
  }

  public abstract async run(...args: any[]): Promise<void>;
}
