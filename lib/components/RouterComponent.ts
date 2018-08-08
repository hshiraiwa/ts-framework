import * as OAuthServer from "express-oauth-server";
import { Logger, ComponentType, Component, ComponentOptions } from "ts-framework-common";
import { default as errorMiddleware, ErrorDefinitions } from "../error/ErrorReporter";
import { Router, RouteMap } from "./router";
import { BaseController } from "./router/controller";
import Server from "../server";

export interface RouterComponentOptions extends ComponentOptions {
  logger?: Logger;
  routes?: RouteMap;
  sentry?: {
    dsn: string;
  };
  controllers?: {
    [controllerName: string]: BaseController;
  };
  path?: {
    filters?: string;
    controllers?: string;
  };
  errors?: ErrorDefinitions;
  oauth?: {
    model: any; // TODO: Specify the signature
    authorize?: any; // TODO: Specify the signature
    useErrorHandler?: boolean;
    continueMiddleware?: boolean;
    allowExtendedTokenAttributes?: boolean;
    token?: {
      extendedGrantTypes?: { [name: string]: any };
      accessTokenLifetime?: number;
      refreshTokenLifetime?: number;
      requireClientAuthentication?: boolean;
      allowExtendedTokenAttributes?: boolean;
    };
  };
}

export default class RouterComponent implements Component {
  public type: ComponentType.MIDDLEWARE;
  protected logger: Logger;

  constructor(public options: RouterComponentOptions = {}) {
    this.logger = options.logger || Logger.getInstance();
  }

  public describe() {
    return { name: "RouterComponent" };
  }

  public onMount(server: Server) {
    // Use base router for mapping the routes to the Express server
    if (this.logger) {
      this.logger.silly("Initializing server middleware: Router");
    }

    // Builds the route map and binds to current express application
    Router.build(this.options.controllers, this.options.routes, {
      app: server.app,
      path: this.options.path,
      logger: this.options.logger
    });

    // Handles oauth server
    if (this.options.oauth) {
      const { token, authorize, ...oauth } = this.options.oauth;
      if (this.logger) {
        this.logger.silly("Initializing server middleware: OAuth2");
      }

      // Prepare OAuth 2.0 server instance and token endpoint
      (server.app as any).oauth = new OAuthServer(oauth);

      if (authorize) {
        server.app.use((server.app as any).oauth.authorize(authorize));
      }

      if (token) {
        server.app.post("/oauth/token", (server.app as any).oauth.token(token));
      }
    }

    // Bind the error handlers
    if (this.logger) {
      this.logger.silly("Initializing server middleware: ErrorReporter");
    }

    errorMiddleware(this.options.errors, {
      logger: this.logger,
      raven: this.options.sentry ? server.raven : undefined
    })(server.app);
  }

  public async onInit() {}

  public onUnmount() {}
}
