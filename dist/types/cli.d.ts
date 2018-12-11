#!/usr/bin/env node
import * as Commander from "commander";
import { LoggerInstance } from "ts-framework-common";
import BaseCommand from "./base/BaseCommand";
export interface CommandLineOptions {
    logger?: LoggerInstance;
}
export declare const DEFAULT_ENTRYPOINT: string;
export declare const DEFAULT_ENV: string;
export declare const DEFAULT_PORT: string | number;
export default class CommandLine {
    logger: LoggerInstance;
    commands: BaseCommand[];
    protected program: Commander.Command;
    constructor(commands?: BaseCommand[], options?: CommandLineOptions);
    static initialize(commands?: BaseCommand[]): CommandLine;
    onError(error: any): void;
    onMount(): Promise<void>;
    parse(): this;
}
