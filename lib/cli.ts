#!/usr/bin/env node

import * as Commander from "commander";
import * as Package from "pjson";
import { LoggerInstance, Logger } from "ts-framework-common";
import BaseCommand from "./base/BaseCommand";
import { ConsoleCommand, GenerateCommand, ListenCommand, RunCommand } from "./commands";

export interface CommandLineOptions {
  logger?: LoggerInstance;
}

export default class CommandLine {
  public logger: LoggerInstance;
  public commands: BaseCommand[];
  protected program: Commander.Command;

  constructor(commands?: BaseCommand[], options?: CommandLineOptions) {
    // Initialize Commander instance
    this.program = Commander.name(Package.name)
      .version(Package.version)
      .description(Package.description)
      .option("-v, --verbose", "enables verbose mode");

    // Prepare logger
    this.logger = Logger.getInstance();

    // Initialize default commands
    this.commands = commands || [new ListenCommand(), new GenerateCommand(), new ConsoleCommand(), new RunCommand()];

    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize(commands?: BaseCommand[]) {
    return new CommandLine(commands).parse();
  }

  public onError(error) {
    this.logger.error(error);

    // Async exit for log processing to occur before crashing
    setTimeout(() => process.exit(1), 500);
  }

  public async onMount() {
    // Handle verbnose mode
    this.program.on("option:verbose", function() {
      process.env.VERBOSE = this.verbose;
    });

    // Check TS Node is available
    try {
      require("ts-node/register/transpile-only");
    } catch (exception) {
      this.logger.warn(exception);
      this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
    }

    // Handle unknown commands
    this.program.on("command:*", args => {
      if (args && args.length && args[0] === "help") {
        this.program.outputHelp();
      } else {
        this.logger.error("Unknown syntax for command line" + "\n\nSee --help for a list of available commands.");
      }
      process.exit(1);
    });

    this.commands.map(cmd => {
      // Prepare command syntax
      const p = this.program.command(cmd.command.syntax).description(cmd.command.description);

      // Bind command arguments
      if (cmd.command.options) {
        cmd.command.options.map(options => {
          p.option.apply(p, options);
        });
      }

      // Bind command action
      p.action((...args) => cmd.run.apply(cmd, args));
    });
  }

  parse() {
    this.program.parse(process.argv);
    return this;
  }
}

CommandLine.initialize();
