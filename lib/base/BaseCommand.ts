import { Argv } from "yargs";
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
  builder?:
    | ((yargs: Argv) => Argv)
    | {
        [label: string]: any;
      };
}

export default abstract class BaseCommand {
  public logger: LoggerInstance;
  public abstract command: CommanderDefs;

  constructor(public options: BaseCommandOptions = {}) {
    this.run = this.run.bind(this);
    this.logger = options.logger || Logger.getInstance();
  }

  public async onProgram(yargs: Argv): Promise<any> {
    // Bind command action
    const handler = async argv => {
      try {
        return await this.run.apply(this, [argv]);
      } catch (exception) {
        this.logger.error(exception);
        setTimeout(() => process.exit(1), 1000);
      }
    };

    return yargs.command({
      handler,
      command: this.command.syntax,
      describe: this.command.description,
      builder: this.command.builder
    });
  }

  public abstract async run(argv: any): Promise<void>;
}
