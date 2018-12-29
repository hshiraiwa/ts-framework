#!/usr/bin/env node --experimental-repl-await

require("source-map-support").install();

import { Logger, LoggerInstance } from "ts-framework-common";
import * as fs from "fs";
import * as yargs from "yargs";
import BaseCommand from "./base/BaseCommand";
import { ConsoleCommand, GenerateCommand, ListenCommand, RunCommand, WatchCommand } from "./commands";

export interface CommandLineOptions {
  logger?: LoggerInstance;
  commands?: (typeof BaseCommand)[];
}

export const DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
export const DEFAULT_ENV = process.env.NODE_ENV || "development";
export const DEFAULT_PORT = process.env.PORT || 3000;

export default class CommandLine {
  public logger: LoggerInstance;
  public commands: BaseCommand[];
  public yargs: yargs.Argv;

  public static readonly DEFAULT_OPTS = {
    entrypoint: DEFAULT_ENTRYPOINT,
    port: DEFAULT_PORT,
    env: DEFAULT_ENV
  };

  public static readonly DEFAULT_COMMANDS = [ListenCommand, GenerateCommand, ConsoleCommand, RunCommand, WatchCommand];

  constructor(public options: CommandLineOptions = {}) {
    const Package = require("../package.json");

    // Prepare logger and initial yargs instance
    this.yargs = yargs.usage("Usage: $0 <command> [...args]").wrap(Math.min(120, yargs.terminalWidth()));

    // Prepare verbose option
    this.yargs
      .scriptName(Package.name)
      .boolean("verbose")
      .alias("V", "verbose")
      .describe("verbose", "Runs command in verbose mode");

    // Prepare help guide
    this.yargs
      .help("h")
      .alias("h", "help")
      .alias("v", "version");

    // Prepare logger instance
    this.logger = options.logger || Logger.getInstance();

    // Initialize commands using current options
    this.commands = (options.commands || CommandLine.DEFAULT_COMMANDS).map((Command: any) => {
      return new Command({ logger: this.logger, ...CommandLine.DEFAULT_OPTS });
    });

    // Starts command mounting
    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize(options: CommandLineOptions = {}) {
    return new CommandLine(options).yargs.argv;
  }

  public onError(error) {
    this.logger.error(error);

    // Async exit for log processing to occur before crashing
    setTimeout(() => process.exit(1), 500);
  }

  public async onMount() {
    // Check TS Node is available
    try {
      require("ts-node/register/transpile-only");
    } catch (exception) {
      this.logger.warn(exception);
      this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
    }

    // Bind all commands to current program
    this.commands.map(cmd => cmd.onProgram(this.yargs));

    // Prepare additional info in help
    this.yargs.epilog(fs.readFileSync("../raw/help").toString("utf-8"));
  }
}

CommandLine.initialize();
