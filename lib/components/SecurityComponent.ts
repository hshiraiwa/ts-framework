import * as cors from "cors";
import * as Helmet from "helmet";
import * as requestIp from "request-ip";
import * as userAgent from "express-useragent";
import { Logger, ComponentType, Component } from "ts-framework-common";
import Server from "../index";

export interface SecurityComponentOptions {
  logger?: Logger;
  helmet?: Helmet.IHelmetConfiguration | false;
  userAgent?: boolean;
  cors?: boolean | cors.CorsOptions;
  trustProxy?: boolean;
}

export default class SecurityComponent implements Component {
  public type: ComponentType.MIDDLEWARE;
  protected logger: Logger;

  constructor(public options: SecurityComponentOptions = {}) {
    this.logger = options.logger || Logger.getInstance();
  }

  public describe() {
    return { name: "SecurityComponent" };
  }

  public onMount(server: Server) {
    // Enable security protections
    if (this.options.helmet !== false) {
      server.app.use(Helmet(this.options.helmet));
    }

    // Enable the CORS middleware
    if (this.options.cors) {
      if (this.logger) {
        this.logger.info("Initializing server middleware: CORS");
      }
      server.app.use(cors(this.options.cors !== true ? this.options.cors : {}));
    }

    // Handle user agent middleware
    if (this.options.userAgent) {
      if (this.logger) {
        this.logger.info("Initializing server middleware: User Agent");
      }

      // Parses request for the real IP
      server.app.use(requestIp.mw());

      // Parses request user agent information
      server.app.use(userAgent.express());
    }

    // Ensures the server trust proxy
    if (this.options.trustProxy === undefined || this.options.trustProxy) {
      server.app.set("trust_proxy", 1);
    }
  }

  public async onInit() {}

  public onUnmount() {}
}
