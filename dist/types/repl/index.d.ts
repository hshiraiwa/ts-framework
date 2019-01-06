/// <reference types="node" />
import repl = require("repl");
import { Service, ServiceOptions, ServiceDescription } from "ts-framework-common";
import Server from "../server";
export interface ReplConsoleOptions extends ServiceOptions {
    repl?: repl.REPLServer;
    name?: string;
    exit?: boolean;
    help?: string;
}
export default class ReplConsole extends Service {
    server?: Server;
    repl?: repl.REPLServer;
    options: ReplConsoleOptions;
    constructor(options: ReplConsoleOptions);
    describe(): ServiceDescription;
    onMount(server: Server): void;
    onInit(): Promise<void>;
    onReady(server: Server): Promise<void>;
    onUnmount(): void;
    /**
     * Clears the REPL console.
     */
    clear(): void;
    /**
     * Shows help.
     */
    help(): void;
    /**
     * Gets the REPL context from framework.
     */
    getContext(): any;
}
