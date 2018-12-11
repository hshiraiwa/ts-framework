import * as Path from "path";
import { BaseError } from "ts-framework-common";
import BaseCommand from "../base/BaseCommand";
import Server, { ServerOptions } from "../server";
import ReplConsole from "../repl";

export default class ConsoleCommand extends BaseCommand {
  command = {
    syntax: "console [entrypoint]",
    description: "Starts the interactive console"
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
      throw new BaseError("Could not load Server instance: " + exception.message, exception);
    }
  }

  /**
   * Runs the REPL console in the supplied Server instance.
   */
  public async run(entrypoint) {
    const options = { port: process.env.PORT || 3000 };
    const instance = await this.load(entrypoint, { ...options, repl: new ReplConsole({}) });
    await instance.listen();
  }
}
