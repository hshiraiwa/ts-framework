import { BaseError } from "ts-framework-common";
import * as yeoman from "yeoman-environment";
import BaseCommand from "../base/BaseCommand";

export interface GenerateCommandOptions {
  name?: string;
  path?: string;
  component: string;
  skipInstall?: boolean;
}

export default class GenerateCommand extends BaseCommand {
  env: any;
  command = {
    syntax: "new <component> [name]",
    description: "Generates a new TS Framework application or component.",
    options: [
      ["-s, --skip-install", "skips yarn installation and post generation routines"],
      ["-p, --path <path>", "the base path to create the file, relative to current working dir"],
      ["-b, --base-url <url>", "the base URL for the Controller generation, not applied to other components"],
      ["-t, --table-name <tableName>", "the table name for the Model generation, not applied to other components"]
    ]
  };

  public static APP_COMPONENT = "app";
  public static AVAILABLE_COMPOENENTS = [GenerateCommand.APP_COMPONENT, "controller", "service", "job", "model"];

  constructor(options = {}) {
    super(options);
    this.env = yeoman.createEnv();
  }

  public async run({ component, name, path = "", skipInstall }: any) {
    if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
      throw new BaseError(`Could not generate unknown component: "${component}"`);
    }

    // Ensure entity name was provided for components
    if (!name && component !== "app") {
      throw new BaseError(`Could not generate ${component} without a name`);
    }

    const generatorName =
      component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";

    this.env.register(require.resolve(generatorName), `ts-framework`);

    const opts: any = { skipInstall };

    if (path) {
      opts.path = path;
    }

    return new Promise<void>((resolve, reject) =>
      this.env.run(`ts-framework ${name ? name : ""}`, opts, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    );
  }
}
