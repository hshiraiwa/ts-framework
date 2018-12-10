#!/usr/bin/env node

import * as Commander from "commander";
import * as Package from "pjson";
import { LoggerInstance } from "ts-framework-common";
import { ConsoleCommand, GenerateCommand, ListenCommand, WatchCommand, RunCommand } from "./commands";

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
      .command("listen [entrypoint]")
      .description("Runs the server in a single process")
      .option("-d, --development", "Starts server without production flags")
      .action((entrypoint = "./api/server.ts", options = {}) =>
        new ListenCommand().run({
          entrypoint,
          env: options.development ? "development" : "production"
        })
      );

    this.program
      .command("console [entrypoint]")
      .description("Run interactive console")
      .action((entrypoint = "./api/server.ts") => new ConsoleCommand().run({ entrypoint }));

    this.program
      .command("run [entrypoint]")
      .option("-d, --development", "Starts server without production flags")
      .description("Runs the server components without lifting express")
      .action((entrypoint = "./api/server.ts", options = {}) =>
        new RunCommand().run({
          entrypoint,
          env: options.development ? "development" : "production"
        })
      );

    this.program
      .command("watch [entrypoint]")
      .description("Run the development server with live reload")
      .action((entrypoint = "./api/server.ts") => new WatchCommand().run({ entrypoint }));

    this.program
      .command("new <component> [name]")
      .option("-s, --skip-install", "Skips yarn installation and post generation routines")
      .description("Generates a new TS Framework project")
      .action((component, name, options = {}) =>
        new GenerateCommand().run({
          name,
          component,
          skipInstall: options.skipInstall
        })
      );
  }

  parse() {
    this.program.parse(process.argv);
  }
}

CommandLine.initialize();
