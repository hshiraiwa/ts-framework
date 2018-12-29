#!/usr/bin/env node --experimental-repl-await

require("source-map-support").install();

import { Logger, LoggerInstance } from "ts-framework-common";
import * as yargs from "yargs";
import BaseCommand from "./base/BaseCommand";
import { ConsoleCommand, GenerateCommand, ListenCommand, RunCommand, WatchCommand } from "./commands";

export interface CommandLineOptions {
  logger?: LoggerInstance;
}

export const DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
export const DEFAULT_ENV = process.env.NODE_ENV || "development";
export const DEFAULT_PORT = process.env.PORT || 3000;

export default class CommandLine {
  public logger: LoggerInstance;
  public commands: BaseCommand[];
  public yargs: yargs.Argv;

  constructor(commands?: BaseCommand[], public options: CommandLineOptions = {}) {
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

    // Prepare command options
    const commandOpts = {
      logger: this.logger,
      entrypoint: DEFAULT_ENTRYPOINT,
      port: DEFAULT_PORT,
      env: DEFAULT_ENV
    };

    // Initialize default commands
    this.commands = commands || [
      new ListenCommand(commandOpts),
      new GenerateCommand(commandOpts),
      new ConsoleCommand(commandOpts),
      new RunCommand(commandOpts),
      new WatchCommand(commandOpts)
    ];

    // Starts command mounting
    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize(commands?: BaseCommand[]) {
    return new CommandLine(commands).yargs.argv;
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

    // this.yargs.command('new app [name]', 'Creates a new application', yargs => {
    //   yargs.positional('name', {
    //     type: 'string',
    //     describe: 'The name of the project to be generated',
    //   });
    // });

    // this.yargs.command('new <component> <name>', 'Creates a new component in current project', yargs => {
    //   yargs.positional('component', {
    //     type: 'string',
    //     describe: 'The kind of component to be generated',
    //     choices: ['controller', 'service', 'job', 'model']
    //   });

    //   yargs.positional('name', {
    //     type: 'string',
    //     describe: 'The name of the component to be generated',
    //   });
    // })

    // Prepare additional info in help
    this.yargs.epilog(
      "\n" +
        "Environment variables:\n" +
        "\n" +
        '  - ENTRYPOINT: \t Sets server entrypoint for execution. Defaults to: "./api/server.ts"\n' +
        '  - NODE_ENV: \t Sets the environment to run the server. Defaults to: "development"\n' +
        '  - PORT: \t Sets the port to listen to. Defaults to: "3000"\n' +
        "\n" +
        "Getting started:\n" +
        "\n" +
        "  $ ts-framework new app\n" +
        "  $ cd app/\n" +
        "  $ yarn start\n"
    );
  }
}

CommandLine.initialize();
