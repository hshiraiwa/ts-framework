import repl = require("repl");
import * as util from "util";
import * as path from "path";
import * as Package from "pjson";
import { Service, ServiceOptions, ServiceDescription } from "ts-framework-common";
import Server from "../server";
import { readFileSync } from "fs-extra";

export interface ReplConsoleOptions extends ServiceOptions {
  repl?: repl.REPLServer;
  name?: string;
  exit?: boolean;
  help?: string;
}

export default class ReplConsole extends Service {
  public server?: Server;
  public repl?: repl.REPLServer;
  public options: ReplConsoleOptions;

  constructor(options: ReplConsoleOptions) {
    super({
      ...options,
      name: options.name || Package.name,
      help: options.help || readFileSync(path.join(__dirname, "../../raw/help.txt"), "utf-8")
    } as ServiceOptions);
  }

  describe(): ServiceDescription {
    return { name: this.options.name };
  }

  onMount(server: Server): void {
    this.server = server;
  }

  public async onInit() {}

  async onReady(server: Server): Promise<void> {
    this.server = server;

    // Start the repl server
    this.repl =
      this.options.repl ||
      repl.start({
        prompt: `${this.options.name} > `,
        useColors: true,
        useGlobal: true,
        ignoreUndefined: true
      });

    // Bind server context
    const ctx = this.getContext();
    Object.keys(ctx).map(key => {
      if (ctx.hasOwnProperty(key)) {
        this.repl.context[key] = ctx[key];
      }
    });

    // Block server initialization then close on exit
    return new Promise<void>(resolve => {
      this.repl.on("exit", async () => {
        await server.close();
        if (this.options.exit !== false) {
          process.exit(0);
        } else {
          resolve();
        }
      });
    });
  }

  onUnmount() {
    if (this.repl) {
      this.repl.close();
      this.repl = undefined;
    }
  }

  /**
   * Clears the REPL console.
   */
  public clear() {
    process.stdout.write("\u001B[2J\u001B[0;0f");
  }

  /**
   * Shows help.
   */
  public help() {
    if (this.options.help) {
      this.logger.info(this.options.help);
    }
  }

  /**
   * Gets the REPL context from framework.
   */
  public getContext(): any {
    let ctx = {};

    if (this.server) {
      const serverDescription = this.server.describe();

      ctx = {
        /* Main Server */
        server: this.server,
        ...serverDescription.context
      };
    }

    // Return the repl context
    return {
      ...ctx,
      clear: this.clear.bind(this),
      help: this.help.bind(this)
    };
  }
}
