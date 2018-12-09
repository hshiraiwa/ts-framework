#!/usr/bin/env node --harmony
import * as Commander from "commander";
import { LoggerInstance } from "ts-framework-common";
export default class CommandLine {
    logger: LoggerInstance;
    protected program: Commander.Command;
    constructor();
    static initialize(): void;
    onError(error: any): void;
    onMount(): Promise<void>;
    parse(): void;
}
