/// <reference types="node" />
import * as Sentry from "@sentry/node";
import * as express from "express";
import * as http from "http";
import { BaseServer, LoggerInstance } from "ts-framework-common";
import { BaseRequest } from "../base/BaseRequest";
import { BaseResponse } from "../base/BaseResponse";
import { Controller, Delete, Get, Post, Put } from "../components/router";
import HttpCode from "../error/http/HttpCode";
import HttpError from "../error/http/HttpError";
import { ServerOptions } from "./config";
export { BaseRequest, BaseResponse, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions };
export default class Server extends BaseServer {
    options: ServerOptions;
    app: express.Application;
    logger: LoggerInstance;
    protected server?: http.Server;
    sentry?: Sentry.NodeClient;
    constructor(options: ServerOptions, app?: express.Application);
    onMount(): void;
    onInit(): Promise<void>;
    /**
     * Starts listening on the configured port.
     *
     * @returns {Promise<ServerOptions>}
     */
    listen(): Promise<ServerOptions>;
    /**
     * Stops the server and closes the connection to the port.
     *
     * @returns {Promise<void>}
     */
    close(exitOnClose?: boolean): Promise<void>;
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     */
    onReady(): Promise<void>;
    /**
     * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
     */
    onUnmount(): Promise<void>;
}
