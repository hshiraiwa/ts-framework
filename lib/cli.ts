#!/usr/bin/env node --harmony

import * as Package from "pjson";
import * as Commander from "commander";
import { Logger, LoggerInstance } from "ts-framework-common";
import { ConsoleCommand } from "./commands";

export default class CommandLine {
  public logger: LoggerInstance;
  protected program: Commander.Command;

  constructor() {
    this.program = Commander.name(Package.name)
      .version(Package.version)
      .description(Package.description);

    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize() {
    new CommandLine().parse();
  }

  public onError(error) {
    console.error(error);
    process.exit(1);
  }

  public async onMount() {
    // Handle verbnose mode
    this.program.on("option:verbose", function() {
      process.env.VERBOSE = this.verbose;
    });

    // Check TS Node is available
    try {
      const tsNode = require("ts-node/register/transpile-only");
    } catch (exception) {
      console.warn(exception);
      console.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
    }

    // Handle unknown commands
    this.program.on("command:*", () => {
      console.error("Invalid syntax for command line" + "\nSee --help for a list of available commands.");
      process.exit(1);
    });

    this.program
      .command("console")
      .description("Run interactive console")
      .action(new ConsoleCommand().run);
  }

  parse() {
    this.program.parse(process.argv);
  }
}

CommandLine.initialize();
