import * as yeoman from "yeoman-environment";
import BaseCommand from "../base/BaseCommand";

export interface GenerateCommandOptions {
  name?: string;
  component: string;
  skipInstall?: boolean;
}

export default class GenerateCommand extends BaseCommand<GenerateCommandOptions> {
  env: any;

  public static AVAILABLE_COMPOENENTS = ["app", "controller"];

  constructor() {
    super();
    this.env = yeoman.createEnv();
  }

  public async run({ name, component, skipInstall }: GenerateCommandOptions) {
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
