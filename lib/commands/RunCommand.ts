import * as fs from "fs";
import * as Path from "path";
import { BaseError } from "ts-framework-common";
import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";
import { exec } from "../utils";

export default class RunCommand extends BaseCommand {
  command = {
    syntax: "run [entrypoint]",
    description: "Runs the server components without lifting express",
    builder: yargs => {
      yargs
        .boolean("d")
        .alias("d", "development")
        .describe("d", "Starts server without production flags");

      yargs
        .string("p")
        .alias("p", "port")
        .describe("p", "The PORT to listen to, can be overriden with PORT env variable");

      return yargs;
    }
  };

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
      console.error(exception);
      throw new BaseError("Could not load Server instance: " + exception.message);
    }
  }

  public async prepareDevelopment({ entrypoint }): Promise<string> {
    return Path.resolve(process.cwd(), entrypoint);
  }

  public async prepare({ entrypoint, env }): Promise<string> {
    const sourceFile = Path.resolve(process.cwd(), entrypoint);

    // Load directly from file in development mode
    if (env === "development") {
      return this.prepareDevelopment({ entrypoint });
    }

    // In production, we need to handle TS files
    if (Path.extname(sourceFile) === ".ts") {
      // Try to find transpiled directory using tsconfig
      const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
      const tsConfig = require(tsConfigPath); // TODO: Handle exceptions here
      const distributionPath = Path.resolve(process.cwd(), tsConfig.compilerOptions.outDir);

      // Check if the transpiled sources directory already exists
      if (!fs.existsSync(distributionPath)) {
        this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
        await exec("yarn tsc");
      }

      // Try to find transpiled file from specified source
      const fileName = Path.basename(sourceFile, ".ts");
      const relativePath = Path.relative(process.cwd(), Path.dirname(sourceFile));
      let distributionFile = Path.join(distributionPath, relativePath, fileName + ".js");

      if (!fs.existsSync(distributionFile)) {
        // Try to find in distribution root, as a last attempt to make it work
        const fileName = Path.basename(sourceFile, ".ts");
        distributionFile = Path.join(distributionPath, fileName + ".js");

        if (fs.existsSync(distributionFile)) {
          // Runs from transpiled file
          this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
        } else {
          this.logger.verbose(`Could not find transpiled file"`);
        }
      } else {
        // Runs from transpiled file
        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
      }

      return distributionFile;
    }

    return sourceFile;
  }

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    // Force production unless flag was supplied
    const port = options.port || this.options.port;
    const env = options.development ? "development" : options.env || "production";

    // Prepare distribution file
    const distributionFile = await this.prepare({ entrypoint, env });
    this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    // Load server constructor from distribution file path
    const instance = await this.load(distributionFile, { ...options, port });

    // Manually start the server lifecycle without listening to express port
    await instance.onInit();
    await instance.onReady();
  }
}
