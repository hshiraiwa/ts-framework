#!/usr/bin/env node

require("source-map-support").install();
require("reflect-metadata");

import repl = require("repl");
import * as util from "util";
import * as Package from "pjson";
import { Service, ServiceOptions, ServiceDescription } from "ts-framework-common";
import Server from "../server";

export interface ReplServerOptions extends ServiceOptions {}

export default class ReplConsole extends Service {
  protected server?: Server;
  protected repl: repl.REPLServer;

  constructor(public options: ReplServerOptions) {
    super(options);
  }

  describe(): ServiceDescription {
    return { name: "ReplServer" };
  }

  onMount(server: Server): void {
    this.server = server;
  }

  public async onInit() {}

  async onReady(server: Server): Promise<void> {
    this.server = server;

    // Start the repl server
    this.repl = repl.start({
      prompt: `${Package.name} > `,
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
    await new Promise(resolve => {
      this.repl.on("exit", () => {
        server.close();
        process.exit(0);
      });
    });
  }

  onUnmount() {
    if (this.repl) {
      this.repl.close();
    }
  }

  /**
   * Clears the REPL console.
   */
  public clear() {
    process.stdout.write("\u001B[2J\u001B[0;0f");
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
    return { ...ctx, clear: this.clear.bind(this) };
  }
}
