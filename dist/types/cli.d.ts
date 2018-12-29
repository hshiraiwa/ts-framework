#!/usr/bin/env node --experimental-repl-await
import { LoggerInstance } from "ts-framework-common";
import * as yargs from "yargs";
import BaseCommand from "./base/BaseCommand";
export interface CommandLineOptions {
    logger?: LoggerInstance;
}
export declare const DEFAULT_ENTRYPOINT: string;
export declare const DEFAULT_ENV: string;
export declare const DEFAULT_PORT: string | number;
export default class CommandLine {
    options: CommandLineOptions;
    logger: LoggerInstance;
    commands: BaseCommand[];
    yargs: yargs.Argv;
    constructor(commands?: BaseCommand[], options?: CommandLineOptions);
    static initialize(commands?: BaseCommand[]): {
        [x: string]: unknown;
        _: string[];
        $0: string;
    };
    onError(error: any): void;
    onMount(): Promise<void>;
}
