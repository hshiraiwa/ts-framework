import * as fs from "fs";
import * as Path from "path";
import { exec } from "child_process";
import { BaseError } from "ts-framework-common";
import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";

export default class RunCommand extends BaseCommand {
  command = {
    syntax: "run [entrypoint]",
    description: "Runs the server components without lifting express",
    options: [["-d, --development", "starts server without production flags"]]
  };

  /**
   * Simple method for executing child processes.
   */
  public async exec(cmd) {
    return new Promise<void>((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error || stderr) {
          this.logger.error(stdout);
          this.logger.error(stderr);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

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

  public async prepare({ entrypoint, env }): Promise<string> {
    let distributionFile;
    const sourceFile = Path.resolve(process.cwd(), entrypoint);

    if (Path.extname(sourceFile) === ".ts") {
      // Try to find transpiled directory using tsconfig
      const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
      const relativePath = Path.relative(process.cwd(), sourceFile);
      const tsConfig = require(tsConfigPath);
      const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);

      if (env !== "development" && !fs.existsSync(distributionPath)) {
        this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
        await this.exec("yarn tsc");
      }

      if (env === "development") {
        distributionFile = sourceFile;
      } else {
        distributionFile = Path.resolve(distributionPath, relativePath);
      }

      if (!fs.existsSync(distributionFile)) {
        // Try to find in root, as a last attempt to make it work
        const fileName = Path.basename(sourceFile, ".ts");
        distributionFile = Path.join(distributionPath, fileName + ".js");

        if (fs.existsSync(distributionFile)) {
          // Runs from transpiled file
          this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
        }
      } else if (Path.extname(distributionFile) === ".ts") {
        // Runs directly from typescript file
        this.logger.verbose(`Found typescript source file in "${distributionFile}"`);
      } else {
        // Runs from transpiled file
        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
      }
    } else {
      distributionFile = sourceFile;
      this.logger.verbose(`Found transpiled server in "${distributionFile}", skipping compilation`);
    }

    return distributionFile;
  }

  public async run(entrypoint = this.options.entrypoint, { env }) {
    const distributionFile = await this.prepare({ entrypoint, env });
    this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    const options = { port: process.env.PORT || 3000 };
    const instance = await this.load(distributionFile, {
      ...options
    });

    await instance.onInit();
    await instance.onReady();
  }
}
