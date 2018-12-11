import * as yeoman from "yeoman-environment";
import BaseCommand from "../base/BaseCommand";

export interface GenerateCommandOptions {
  name?: string;
  component: string;
  skipInstall?: boolean;
}

export default class GenerateCommand extends BaseCommand {
  env: any;
  command = {
    syntax: "new <component> [name]",
    description: "Generates a new TS Framework application or component",
    options: [["-s, --skip-install", "Skips yarn installation and post generation routines"]]
  };

  public static AVAILABLE_COMPOENENTS = ["app", "controller", "service", "job"];

  constructor(options = {}) {
    super(options);
    this.env = yeoman.createEnv();
  }

  public async run(component, name, { skipInstall }: GenerateCommandOptions) {
    if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
      throw new Error(`Could not generate unknown component: "${component}"`);
    }

    // Prepare generator name resolution
    const generatorName =
      component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";

    // Here we register a generator based on its path. Providing the namespace is optional.
    this.env.register(require.resolve(generatorName), `ts-framework`);

    // Or passing arguments and options
    return new Promise<void>((resolve, reject) =>
      this.env.run(`ts-framework ${name}`, { skipInstall }, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    );
  }
}
