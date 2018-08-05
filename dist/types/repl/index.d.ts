#!/usr/bin/env node
/// <reference types="node" />
import repl = require("repl");
import { Service, ServiceOptions, ServiceDescription } from "ts-framework-common";
import Server from "../server";
export interface ReplServerOptions extends ServiceOptions {
}
export default class ReplConsole extends Service {
    options: ReplServerOptions;
    protected server?: Server;
    protected repl: repl.REPLServer;
    constructor(options: ReplServerOptions);
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
     * Gets the REPL context from framework.
     */
    getContext(): any;
}
