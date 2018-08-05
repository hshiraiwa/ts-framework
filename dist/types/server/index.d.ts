import * as Raven from 'raven';
import * as express from 'express';
import { BaseServer, Logger } from 'ts-framework-common';
import { BaseRequest } from '../base/BaseRequest';
import { BaseResponse } from '../base/BaseResponse';
import { Controller, Get, Post, Put, Delete } from '../components/router';
import HttpCode from '../error/http/HttpCode';
import HttpError from '../error/http/HttpError';
import { ServerOptions } from './config';
export { BaseRequest, BaseResponse, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions, };
export default class Server extends BaseServer {
    options: ServerOptions;
    app: express.Application;
    raven?: Raven.Client;
    logger: Logger;
    protected server: any;
    constructor(options: ServerOptions, app?: express.Application);
    onMount(): void;
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
    close(): Promise<void>;
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     *
     * @returns {Promise<void>}
     */
    onReady(server: any): Promise<void>;
    /**
     * Runs the server statup jobs, wil crash if any fails.
     */
    protected runStartupJobs(): Promise<void>;
    /**
     * Startup the server components in series
     */
    protected runComponentsInitialization(): Promise<void>;
}
