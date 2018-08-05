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
    return {
      name: "ReplServer",
      context: this.getContext()
    };
  }

  onMount(server: Server): void {}

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
        resolve();
        server.close();
      });
    });
  }

  onUnmount() {
    if (this.repl) {
      this.repl.close();
    }
  }

  /**
   * Gets the REPL context from framework.
   */
  public getContext() {
    return {
      /* Main Server */
      server: this.server
    };
  }
}
