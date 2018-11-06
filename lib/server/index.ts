import * as Raven from "raven";
import * as express from "express";
import { BaseServer, Component, Logger } from "ts-framework-common";
import { BaseRequest } from "../base/BaseRequest";
import { BaseResponse } from "../base/BaseResponse";
import { Controller, Delete, Get, Post, Put } from "../components/router";
import HttpCode from "../error/http/HttpCode";
import HttpError from "../error/http/HttpError";
import { ServerOptions } from "./config";
import { LoggerComponent, RequestComponent, RouterComponent, SecurityComponent } from "../components";

export { BaseRequest, BaseResponse, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions };

export default class Server extends BaseServer {
  public app: express.Application;
  public raven?: Raven.Client;
  public logger: Logger;
  protected server?: any;

  constructor(public options: ServerOptions, app?: express.Application) {
    super(options);
    this.app = app || express();
    this.logger = options.logger || Logger.getInstance();
    this.component(
      new LoggerComponent({
        logger: this.options.logger,
        sentry: this.options.sentry
      })
    );

    if (this.options.repl) {
      this.component(this.options.repl);
    }

    // Adds security server components conditionally
    if (this.options.security) {
      this.component(new SecurityComponent(this.options.security));
    }

    // Adds base server components
    this.component(new RequestComponent(this.options.request));
    this.component(new RouterComponent(this.options.router));

    // Continue with server initialization
    this.onMount();
  }

  public onMount(): void {
    // Mount all child components
    return super.onMount(this as BaseServer);
  }

  public async onInit(): Promise<void> {
    // Initialize all child components
    return super.onInit(this as BaseServer);
  }

  /**
   * Starts listening on the configured port.
   *
   * @returns {Promise<ServerOptions>}
   */
  public async listen(): Promise<ServerOptions> {
    await this.onInit();
    return new Promise<ServerOptions>((resolve, reject) => {
      // Get http server instance
      this.server = this.app
        .listen(this.options.port, () => {
          this.logger.info(`Server listening in port: ${this.options.port}`);
          this.onReady()
            .then(() => resolve(this.options))
            .catch((error: Error) => reject(error));
        })
        .on("error", (error: Error) => reject(error));
    });
  }

  /**
   * Stops the server and closes the connection to the port.
   *
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    await this.onUnmount(this);
    if (this.server) {
      return this.server.close();
    }
  }

  /**
   * Handles post-startup routines, may be extended for initializing databases and services.
   *
   * @returns {Promise<void>}
   */
  public async onReady() {
    await super.onReady(this);
  }
}
