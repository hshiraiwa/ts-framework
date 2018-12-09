import * as yeoman from "yeoman-environment";
import BaseCommand from "../base/BaseCommand";

export default class GenerateCommand extends BaseCommand {
  env: any;

  constructor() {
    super();
    this.env = yeoman.createEnv();
  }

  public async run() {
    // Here we register a generator based on its path. Providing the namespace is optional.
    this.env.register(require.resolve("generator-ts-framework"), "ts-framework:app");

    // Or passing arguments and options
    return new Promise<void>((resolve, reject) =>
      this.env.run("ts-framework:app", {}, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    );
  }
}
