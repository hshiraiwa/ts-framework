#!/usr/bin/env node --harmony
import * as Commander from 'commander';
export default class CommandLine {
    protected program: Commander.Command;
    constructor();
    static initialize(): void;
    onError(error: any): void;
    onMount(): Promise<void>;
    parse(): void;
}
