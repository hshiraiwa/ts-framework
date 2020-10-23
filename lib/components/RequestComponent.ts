import * as Multer from "multer";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import { legacyParams, responseBinder } from "./middlewares";
import { Logger, Component, ComponentType, ComponentOptions, LoggerInstance } from "ts-framework-common";
import Server from "../server";

export interface RequestComponentOptions extends ComponentOptions {
  logger?: LoggerInstance;
  bodyLimit?: string;
  inflate?: boolean;
  secret?: string;
  multer?: {
    single?: string;
    array?: { name: string; maxCount: number };
    fields?: { name: string; maxCount: number }[];
    options?: Multer.Options;
  };
}

export default class RequestComponent implements Component {
  public type: ComponentType.MIDDLEWARE;
  public logger: LoggerInstance;

  constructor(public options: RequestComponentOptions = {}) {
    this.logger = options.logger || Logger.getInstance();
  }

  public describe() {
    return { name: "RequestComponent" };
  }

  public onMount(server: Server) {
    // Prepare body size limit
    if (this.options.bodyLimit) {
      // Text body
      server.app.use(
        bodyParser.text({
          limit: this.options.bodyLimit,
          inflate: this.options.inflate
        })
      );

      // JSON body
      server.app.use(
        bodyParser.json({
          limit: this.options.bodyLimit,
          inflate: this.options.inflate
        })
      );

      // Urlencoded body
      server.app.use(
        bodyParser.urlencoded({
          limit: this.options.bodyLimit,
          inflate: this.options.inflate,
          extended: true
        })
      );
    }

    // Handle multer middleware
    if (this.options.multer) {
      this.logger.silly("Initializing server middleware: Multer");
      const opts = this.options.multer as any;
      const multer = Multer(opts);

      if (opts.single) {
        // Single file field
        server.app.use(multer.single(opts.single));
      } else if (opts.array) {
        // Array field
        server.app.use(multer.array(opts.array.name, opts.array.maxCount));
      } else if (opts.fields) {
        // Multiple fields
        server.app.use(multer.fields(opts.fields));
      } else {
        // Defaults to single "file" field
        server.app.use(multer.single("file"));
      }
    }

    // Prepare body parser
    server.app.use(bodyParser.text());
    server.app.use(bodyParser.json());
    server.app.use(bodyParser.urlencoded({ extended: false }));
    server.app.use(methodOverride());

    // Only enable cookie parser if a secret was set
    if (this.options.secret) {
      if (this.logger) {
        this.logger.silly("Initializing server middleware: CookieParser");
      }
      server.app.use(cookieParser(this.options.secret));
    }

    // Utilitary middlewares for requests and responses
    server.app.use(legacyParams);
    server.app.use(responseBinder);
  }

  public async onInit() {}

  public onUnmount() {}
}
