/// <reference types="winston" />
import { LoggerInstance } from 'winston';
import { BaseRequest } from '../base/BaseRequest';
import { BaseResponse } from '../base/BaseResponse';
import { Controller, Get, Post, Put, Delete } from './router/decorators';
import HttpCode from './error/http/HttpCode';
import HttpError from './error/http/HttpError';
import { ServerOptions } from './config';
declare const Logger: LoggerInstance;
export { default as response } from './helpers/response';
export { BaseRequest, BaseResponse, Logger, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions };
export default class Server {
    config: ServerOptions;
    app: any;
    _server: any;
    logger: LoggerInstance;
    constructor(config: ServerOptions, app?: any);
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
    stop(): Promise<any>;
    /**
     * Handles middleware initialization stuff, cannot be async.
     */
    onAppReady(): void;
    /**
     * Registers the server routes and error handlers.
     */
    protected register(): void;
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     *
     * @returns {Promise<void>}
     */
    onStartup(): Promise<void>;
    /**
     * Runs the server statup jobs, wil crash if any fails.
     */
    protected runStartupJobs(): Promise<void>;
    /**
     * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
     *
     * @returns {Promise<void>}
     */
    onShutdown(): Promise<void>;
}
