import * as Raven from "raven";
import * as express from "express";
import { BaseServer, Component, Logger } from "ts-framework-common";
import { BaseRequest } from "../base/BaseRequest";
import { BaseResponse } from "../base/BaseResponse";
import { Controller, Get, Post, Put, Delete } from "../components/router";
import HttpCode from "../error/http/HttpCode";
import HttpError from "../error/http/HttpError";
import { ServerOptions } from "./config";
import { LoggerComponent, SecurityComponent, RequestComponent, RouterComponent } from "../components";

export { BaseRequest, BaseResponse, Controller, Get, Post, Put, Delete, HttpCode, HttpError, ServerOptions };

export default class Server extends BaseServer {
  public app: express.Application;
  public raven?: Raven.Client;
  public logger: Logger;
  protected server: any;

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

  /**
   * Starts listening on the configured port.
   *
   * @returns {Promise<ServerOptions>}
   */
  public listen(): Promise<ServerOptions> {
    return new Promise((resolve, reject) => {
      // Get http server instance
      this.server = this.app
        .listen(this.options.port, () => {
          this.onReady(this)
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
  public async onReady(server) {
    try {
      await this.runStartupJobs();
    } catch (error) {
      this.logger.error("Unknown startup error: " + error.message, error);
      process.exit(-1);
      return;
    }
    try {
      await this.runComponentsInitialization();
    } catch (error) {
      this.logger.error("Unknown component error: " + error.message, error);
      process.exit(-1);
      return;
    }
    await super.onReady(server);
    this.logger.info(`Server listening in port: ${this.options.port}`);
  }

  /**
   * Runs the server statup jobs, wil crash if any fails.
   */
  protected async runStartupJobs() {
    const jobs = this.options.startup || ({} as any);
    const pipeline = jobs.pipeline || [];

    if (pipeline.length) {
      this.logger.debug("Running startup pipeline", { jobs: pipeline.map(p => p.name || "unknown") });

      // Run all startup jobs in series
      for (let i = 0; i < jobs.pipeline.length; i += 1) {
        await jobs.pipeline[i].run(this);
      }

      this.logger.debug("Successfully ran all startup jobs");
    }
  }

  /**
   * Startup the server components in series
   */
  protected async runComponentsInitialization() {
    const components = this.components || ({} as any);

    if (components.length) {
      // Run all components in series
      for (let i = 0; i < components.length; i += 1) {
        await components[i].run(this);
      }

      this.logger.debug("Successfully initialized all components");
    }
  }
}
