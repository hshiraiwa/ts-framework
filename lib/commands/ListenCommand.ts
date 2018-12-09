import * as fs from "fs";
import * as Path from "path";
import { exec } from "child_process";
import { BaseError } from "ts-framework-common";
import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";

export default class WatchCommandCommand extends BaseCommand<{ entrypoint: string }> {
  /**
   * Loads a new Server module and initialize its instance from relative path.
   */
  public async load(relativePath: string, options?: ServerOptions): Promise<Server> {
    const pathToServer = Path.resolve(process.cwd(), relativePath);
    try {
      const Module = await import(pathToServer);

      if (!Module || !Module.default) {
        throw new Error("Module has no default export");
      }

      return new Module.default(options);
    } catch (exception) {
      throw new BaseError("Could not load Server instance: " + exception.message, exception);
    }
  }

  public async run({ entrypoint }) {
    let distributionFile;
    const sourceFile = Path.resolve(process.cwd(), entrypoint);

    if (Path.extname(sourceFile) === ".ts") {
      // Try to find transpiled in ./dist folder
      const relativePath = Path.relative(process.cwd(), sourceFile);
      distributionFile = Path.resolve(process.cwd(), "./dist", relativePath.replace(new RegExp(".ts"), ".js"));

      if (!fs.existsSync(distributionFile)) {
        this.logger.debug("Building typescript source into plain javascript files...", { distributionFile });
        const compiler = () =>
          new Promise<void>((resolve, reject) => {
            exec("yarn tsc", (error, stdout, stderr) => {
              if (error || stderr) {
                this.logger.error(stderr);
                reject(error);
              } else {
                resolve();
              }
            });
          });

        await compiler();
      }
    } else {
      distributionFile = sourceFile;
    }

    this.logger.debug('Starting server in "production" environment...');

    // Force production environment
    process.env.NODE_ENV = "production";

    const options = { port: process.env.PORT || 3000 };
    const instance = await this.load(distributionFile, {
      ...options
    });

    await instance.listen();
  }
}
