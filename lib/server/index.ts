import * as Sentry from "@sentry/node";
import * as express from "express";
import * as http from "http";
import { BaseServer, Logger, LoggerInstance } from "ts-framework-common";
import { BaseRequest } from "../base/BaseRequest";
import { BaseResponse } from "../base/BaseResponse";
import { LoggerComponent, RequestComponent, RouterComponent, SecurityComponent } from "../components";
import { Controller, Delete, Get, Post, Put } from "../components/router";
import HttpCode from "../error/http/HttpCode";
import HttpError from "../error/http/HttpError";
import { ServerOptions } from "./config";

export { BaseRequest, BaseResponse, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions };

export default class Server extends BaseServer {
  public app: express.Application;
  public logger: LoggerInstance;
  protected server?: http.Server;
  public sentry?: Sentry.NodeClient;
  public options: ServerOptions;

  constructor(options: ServerOptions, app?: express.Application) {
    const logger = options.logger || Logger.initialize();
    super({ logger, ...options });
    this.app = app || express();

    this.component(
      // Sentry will be initalized in logger component
      new LoggerComponent({ logger, sentry: this.options.sentry })
    );

    if (this.options.repl) {
      this.component(this.options.repl);
    }

    // Adds security server components conditionally
    if (this.options.security) {
      this.component(new SecurityComponent({ logger, ...this.options.security }));
    }

    // Adds base server components
    this.component(new RequestComponent({ logger, ...this.options.request }));
    this.component(new RouterComponent({ logger, ...this.options.router }));

    // Continue with server initialization
    this.onMount();
  }

  public onMount(): void {
    // Mount all child components
    return super.onMount(this);
  }

  public async onInit(): Promise<void> {
    // Bind to process exit events for graceful shutdown by default
    if (this.options.bindToProcess !== false) {
      process.on("SIGTERM", async () => {
        this.logger.debug("Received SIGTERM interruption from process");
        await this.close(true);
      });

      process.on("SIGINT", async () => {
        console.log(""); // This jumps a line and improves console readability
        this.logger.debug("Received SIGINT interruption from process");
        await this.close(true);
      });
    }

    // Initialize all child components
    return super.onInit(this);
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
  public async close(exitOnClose = false): Promise<void> {
    this.logger.debug(`Closing server instance and unmounting child components`);

    if (this.server) {
      await this.server.close();
    }

    await this.onUnmount();

    if (exitOnClose) {
      setTimeout(() => process.exit(0), 100);
    }
  }

  /**
   * Handles post-startup routines, may be extended for initializing databases and services.
   */
  public async onReady() {
    await super.onReady(this);
  }

  /**
   * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
   */
  public async onUnmount() {
    await super.onUnmount(this);
    this.logger.info("Unmounted server instance and its components successfully");
  }
}
