"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Raven = require("raven");
const multer = require("multer");
const express = require("express");
const requestIp = require("request-ip");
const userAgent = require("express-useragent");
const Git = require("git-rev-sync");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const OAuthServer = require("express-oauth-server");
const router_1 = require("./router");
const index_1 = require("./middlewares/index");
const ErrorReporter_1 = require("./error/ErrorReporter");
const index_2 = require("../logger/index");
const decorators_1 = require("./router/decorators");
exports.Controller = decorators_1.Controller;
exports.Get = decorators_1.Get;
exports.Post = decorators_1.Post;
exports.Put = decorators_1.Put;
exports.Delete = decorators_1.Delete;
const HttpCode_1 = require("./error/http/HttpCode");
exports.HttpCode = HttpCode_1.default;
const HttpError_1 = require("./error/http/HttpError");
exports.HttpError = HttpError_1.default;
const Logger = index_2.default.getInstance();
exports.Logger = Logger;
const SENTRY_RELEASE = process.env.SENTRY_RELEASE ? process.env.SENTRY_RELEASE : (() => {
    try {
        return Git.long();
    }
    catch (error) {
    }
})();
var response_1 = require("./helpers/response");
exports.response = response_1.default;
class Server {
    constructor(config, app) {
        this.config = config;
        this.app = app;
        this.app = app || express();
        this.logger = config.logger;
        // Prepare server configuration
        this.config = Object.assign({}, config, { port: config.port || 3000 });
        // Start by registering Sentry if available
        if (this.logger && this.config.sentry) {
            this.logger.info('Initializing server middleware: Sentry');
            this.raven = Raven.config(this.config.sentry.dsn, {
                autoBreadcrumbs: true,
                logger: 'ts-framework-server',
                release: SENTRY_RELEASE,
            }).install();
            this.app.use(Raven.requestHandler());
        }
        // Enable the logger middleware
        if (this.logger) {
            this.app.use((req, res, next) => {
                req.logger = this.logger;
                next();
            });
        }
        // Handle post initialization routines
        this.onAppReady();
    }
    /**
     * Starts listening on the configured port.
     *
     * @returns {Promise<ServerOptions>}
     */
    listen() {
        return new Promise((resolve, reject) => {
            // Get http server instance
            this._server = this.app.listen(this.config.port, () => {
                this.onStartup().then(() => resolve(this.config)).catch((error) => reject(error));
            }).on('error', (error) => reject(error));
        });
    }
    /**
     * Stops the server and closes the connection to the port.
     *
     * @returns {Promise<void>}
     */
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onShutdown();
            if (this._server) {
                return this._server.close();
            }
        });
    }
    /**
     * Handles middleware initialization stuff.
     */
    onAppReady() {
        // Enable the CORS middleware
        if (this.config.cors) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: CORS');
            }
            this.app.use(index_1.cors(this.config.cors !== true ? this.config.cors : {}));
        }
        // Handle multer middleware
        if (this.config.multer) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: Multer');
            }
            this.app.use(multer(this.config.multer).single('picture'));
        }
        // Handle user agent middleware
        if (this.config.userAgent) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: User Agent');
            }
            // Parses request for the real IP
            this.app.use(requestIp.mw());
            // Parses request user agent information
            this.app.use(userAgent.express());
        }
        // Enable basic express middlewares
        // TODO: Pass all of this to config
        this.app.set('trust_proxy', 1);
        if (this.config.bodyLimit) {
            this.app.use(bodyParser({ limit: this.config.bodyLimit }));
        }
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride());
        // Only enable cookie parser if a secret was set
        if (this.config.secret) {
            if (this.logger) {
                this.logger.info('Initializing server middleware: CookieParser');
            }
            this.app.use(cookieParser(this.config.secret));
        }
        // Utilitary middlewares for requests and responses
        this.app.use(index_1.legacyParams);
        this.app.use(index_1.responseBinder);
        // Server is ready, handle post application routines
        this.register();
    }
    /**
     * Registers the server routes and error handlers.
     */
    register() {
        // Use base router for mapping the routes to the Express server
        if (this.logger) {
            this.logger.info('Initializing server middleware: Router');
        }
        // Builds the route map and binds to current express application
        router_1.Router.build(this.config.controllers, this.config.routes, {
            app: this.app,
            path: this.config.path,
            logger: this.config.logger,
        });
        // Handles oauth server
        if (this.config.oauth) {
            const _a = this.config.oauth, { token } = _a, oauth = __rest(_a, ["token"]);
            if (this.logger) {
                this.logger.info('Initializing server middleware: OAuth2');
            }
            // Prepare OAuth 2.0 server instance and token endpoint
            this.app.oauth = new OAuthServer(oauth);
            this.app.post('/oauth/token', this.app.oauth.token(token));
        }
        // Bind the error handlers
        if (this.logger) {
            this.logger.info('Initializing server middleware: ErrorReporter');
        }
        ErrorReporter_1.default(this.config.errors, {
            logger: this.logger,
            raven: this.config.sentry ? Raven : undefined,
        })(this.app);
    }
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     *
     * @returns {Promise<void>}
     */
    onStartup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.runStartupJobs();
            }
            catch (error) {
                if (this.logger) {
                    this.logger.error('Unknown startup error: ' + error.message, error);
                }
                process.exit(-1);
                return;
            }
        });
    }
    /**
     * Runs the server statup jobs, wil crash if any fails.
     */
    runStartupJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = this.config.startup || {};
            const pipeline = jobs.pipeline || [];
            if (pipeline.length) {
                if (this.logger) {
                    this.logger.debug('Running startup pipeline', { jobs: pipeline.map(p => p.name || 'unknown') });
                }
                // TODO: Run all startup jobs in series
                yield Promise.all(jobs.pipeline.map((job) => __awaiter(this, void 0, void 0, function* () { return job.run(this); })));
                if (this.logger) {
                    this.logger.debug('Successfully ran all startup jobs');
                }
            }
        });
    }
    /**
     * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
     *
     * @returns {Promise<void>}
     */
    onShutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQscUNBQWtDO0FBQ2xDLCtDQUF5RTtBQUN6RSx5REFBcUY7QUFDckYsMkNBQTJDO0FBRzNDLG9EQUF5RTtBQW1CdkUscUJBbkJPLHVCQUFVLENBbUJQO0FBQUUsY0FuQk8sZ0JBQUcsQ0FtQlA7QUFBRSxlQW5CTyxpQkFBSSxDQW1CUDtBQUFFLGNBbkJPLGdCQUFHLENBbUJQO0FBQUUsaUJBbkJPLG1CQUFNLENBbUJQO0FBbEJwQyxvREFBNkM7QUFtQjNDLG1CQW5CSyxrQkFBUSxDQW1CTDtBQWxCVixzREFBK0M7QUFrQm5DLG9CQWxCTCxtQkFBUyxDQWtCSztBQWRyQixNQUFNLE1BQU0sR0FBRyxlQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7QUFZYix3QkFBTTtBQVZuQyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3JGLElBQUksQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCwrQ0FBeUQ7QUFBaEQsOEJBQUEsT0FBTyxDQUFZO0FBNkM1QjtJQUtFLFlBQW1CLE1BQXFCLEVBQVMs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RUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRyxDQUFDO2dCQUVELHVDQUF1QztnQkFDdkMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQU0sR0FBRyxFQUFDLEVBQUUsZ0RBQUMsTUFBTSxDQUFOLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUEsR0FBQSxDQUFDLENBQUMsQ0FBQztnQkFFakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLFVBQVU7O1lBQ3JCLE1BQU0sQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBck5ELHlCQXFOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJhdmVuIGZyb20gJ3JhdmVuJztcbmltcG9ydCAqIGFzIG11bHRlciBmcm9tICdtdWx0ZXInO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIHJlcXVlc3RJcCBmcm9tICdyZXF1ZXN0LWlwJztcbmltcG9ydCAqIGFzIHVzZXJBZ2VudCBmcm9tICdleHByZXNzLXVzZXJhZ2VudCc7XG5pbXBvcnQgKiBhcyBHaXQgZnJvbSAnZ2l0LXJldi1zeW5jJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gJ2Nvb2tpZS1wYXJzZXInO1xuaW1wb3J0ICogYXMgbWV0aG9kT3ZlcnJpZGUgZnJvbSAnbWV0aG9kLW92ZXJyaWRlJztcbmltcG9ydCAqIGFzIE9BdXRoU2VydmVyIGZyb20gJ2V4cHJlc3Mtb2F1dGgtc2VydmVyJztcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgeyBjb3JzLCBsZWdhY3lQYXJhbXMsIHJlc3BvbnNlQmluZGVyIH0gZnJvbSAnLi9taWRkbGV3YXJlcy9pbmRleCc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGVycm9yTWlkZGxld2FyZSwgRXJyb3JEZWZpbml0aW9ucyB9IGZyb20gJy4vZXJyb3IvRXJyb3JSZXBvcnRlcic7XG5pbXBvcnQgU2ltcGxlTG9nZ2VyIGZyb20gJy4uL2xvZ2dlci9pbmRleCc7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gJy4uL2Jhc2UvQmFzZVJlcXVlc3QnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vYmFzZS9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSB9IGZyb20gJy4vcm91dGVyL2RlY29yYXRvcnMnO1xuaW1wb3J0IEh0dHBDb2RlIGZyb20gJy4vZXJyb3IvaHR0cC9IdHRwQ29kZSc7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gJy4vZXJyb3IvaHR0cC9IdHRwRXJyb3InO1xuaW1wb3J0IEJhc2VKb2IgZnJvbSAnLi4vam9icy9CYXNlSm9iJztcbmltcG9ydCB7IENvcnNPcHRpb25zIH0gZnJvbSAnY29ycyc7XG5cbmNvbnN0IExvZ2dlciA9IFNpbXBsZUxvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG5jb25zdCBTRU5UUllfUkVMRUFTRSA9IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFID8gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0UgOiAoKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBHaXQubG9uZygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICB9XG59KSgpO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3BvbnNlIH0gZnJvbSAnLi9oZWxwZXJzL3Jlc3BvbnNlJztcblxuZXhwb3J0IHtcbiAgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgTG9nZ2VyLFxuICBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFxuICBIdHRwQ29kZSwgSHR0cEVycm9yLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2ZXJPcHRpb25zIHtcbiAgcG9ydDogbnVtYmVyO1xuICBzZWNyZXQ/OiBzdHJpbmc7XG4gIHJvdXRlcz86IGFueTtcbiAgY29ycz86IGJvb2xlYW4gfCBDb3JzT3B0aW9ucztcbiAgdXNlckFnZW50PzogYm9vbGVhbjtcbiAgY29udHJvbGxlcnM/OiBvYmplY3Q7XG4gIGJvZHlMaW1pdD86IHN0cmluZztcbiAgcGF0aD86IHtcbiAgICBmaWx0ZXJzPzogc3RyaW5nO1xuICAgIGNvbnRyb2xsZXJzPzogc3RyaW5nO1xuICB9O1xuICBzZW50cnk/OiB7XG4gICAgZHNuOiBzdHJpbmc7XG4gIH07XG4gIHN0YXJ0dXA/OiB7XG4gICAgcGlwZWxpbmU6IEJhc2VKb2JbXTtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG4gIH07XG4gIG11bHRlcj86IGFueTtcbiAgb2F1dGg/OiB7XG4gICAgbW9kZWw6IGFueTsgLy8gVE9ETzogU3BlY2lmeSB0aGUgc2lnbmF0dXJlXG4gICAgdXNlRXJyb3JIYW5kbGVyPzogYm9vbGVhbjtcbiAgICBjb250aW51ZU1pZGRsZXdhcmU/OiBib29sZWFuO1xuICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIHRva2VuPzoge1xuICAgICAgZXh0ZW5kZWRHcmFudFR5cGVzPzogYW55O1xuICAgICAgYWNjZXNzVG9rZW5MaWZldGltZT86IG51bWJlcjtcbiAgICAgIHJlZnJlc2hUb2tlbkxpZmV0aW1lPzogbnVtYmVyO1xuICAgICAgcmVxdWlyZUNsaWVudEF1dGhlbnRpY2F0aW9uPzogYm9vbGVhbjtcbiAgICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIH1cbiAgfTtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVycm9ycz86IEVycm9yRGVmaW5pdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XG4gIF9zZXJ2ZXI6IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcmF2ZW46IFJhdmVuLkNsaWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBTZXJ2ZXJPcHRpb25zLCBwdWJsaWMgYXBwPzogYW55KSB7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIHRoaXMubG9nZ2VyID0gY29uZmlnLmxvZ2dlcjtcblxuICAgIC8vIFByZXBhcmUgc2VydmVyIGNvbmZpZ3VyYXRpb25cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIHBvcnQ6IGNvbmZpZy5wb3J0IHx8IDMwMDAsXG4gICAgfTtcblxuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5jb25maWcuc2VudHJ5KSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeScpO1xuXG4gICAgICB0aGlzLnJhdmVuID0gUmF2ZW4uY29uZmlnKHRoaXMuY29uZmlnLnNlbnRyeS5kc24sIHtcbiAgICAgICAgYXV0b0JyZWFkY3J1bWJzOiB0cnVlLFxuICAgICAgICBsb2dnZXI6ICd0cy1mcmFtZXdvcmstc2VydmVyJyxcbiAgICAgICAgcmVsZWFzZTogU0VOVFJZX1JFTEVBU0UsXG4gICAgICB9KS5pbnN0YWxsKCk7XG5cbiAgICAgIHRoaXMuYXBwLnVzZShSYXZlbi5yZXF1ZXN0SGFuZGxlcigpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgdGhlIGxvZ2dlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmFwcC51c2UoKHJlcTogQmFzZVJlcXVlc3QsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICByZXEubG9nZ2VyID0gdGhpcy5sb2dnZXI7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwb3N0IGluaXRpYWxpemF0aW9uIHJvdXRpbmVzXG4gICAgdGhpcy5vbkFwcFJlYWR5KCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGxpc3RlbmluZyBvbiB0aGUgY29uZmlndXJlZCBwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZXJ2ZXJPcHRpb25zPn1cbiAgICovXG4gIHB1YmxpYyBsaXN0ZW4oKTogUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5fc2VydmVyID0gdGhpcy5hcHAubGlzdGVuKHRoaXMuY29uZmlnLnBvcnQsICgpID0+IHtcbiAgICAgICAgdGhpcy5vblN0YXJ0dXAoKS50aGVuKCgpID0+IHJlc29sdmUodGhpcy5jb25maWcpKS5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgIH0pLm9uKCdlcnJvcicsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc3RvcCgpIHtcbiAgICBhd2FpdCB0aGlzLm9uU2h1dGRvd24oKTtcbiAgICBpZiAodGhpcy5fc2VydmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VydmVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgbWlkZGxld2FyZSBpbml0aWFsaXphdGlvbiBzdHVmZi5cbiAgICovXG4gIHB1YmxpYyBvbkFwcFJlYWR5KCkge1xuXG4gICAgLy8gRW5hYmxlIHRoZSBDT1JTIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5jb25maWcuY29ycykge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogQ09SUycpO1xuICAgICAgfVxuICAgICAgdGhpcy5hcHAudXNlKGNvcnModGhpcy5jb25maWcuY29ycyAhPT0gdHJ1ZSA/IHRoaXMuY29uZmlnLmNvcnMgOiB7fSkpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBtdWx0ZXIgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmNvbmZpZy5tdWx0ZXIpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE11bHRlcicpO1xuICAgICAgfVxuICAgICAgdGhpcy5hcHAudXNlKG11bHRlcih0aGlzLmNvbmZpZy5tdWx0ZXIpLnNpbmdsZSgncGljdHVyZScpKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdXNlciBhZ2VudCBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMuY29uZmlnLnVzZXJBZ2VudCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogVXNlciBBZ2VudCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCBmb3IgdGhlIHJlYWwgSVBcbiAgICAgIHRoaXMuYXBwLnVzZShyZXF1ZXN0SXAubXcoKSk7XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IHVzZXIgYWdlbnQgaW5mb3JtYXRpb25cbiAgICAgIHRoaXMuYXBwLnVzZSh1c2VyQWdlbnQuZXhwcmVzcygpKTtcbiAgICB9XG5cbiAgICAvLyBFbmFibGUgYmFzaWMgZXhwcmVzcyBtaWRkbGV3YXJlc1xuICAgIC8vIFRPRE86IFBhc3MgYWxsIG9mIHRoaXMgdG8gY29uZmlnXG4gICAgdGhpcy5hcHAuc2V0KCd0cnVzdF9wcm94eScsIDEpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5ib2R5TGltaXQpIHtcbiAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyKHsgbGltaXQ6IHRoaXMuY29uZmlnLmJvZHlMaW1pdCB9KSk7XG4gICAgfVxuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gICAgdGhpcy5hcHAudXNlKG1ldGhvZE92ZXJyaWRlKCkpO1xuXG4gICAgLy8gT25seSBlbmFibGUgY29va2llIHBhcnNlciBpZiBhIHNlY3JldCB3YXMgc2V0XG4gICAgaWYgKHRoaXMuY29uZmlnLnNlY3JldCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogQ29va2llUGFyc2VyJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC51c2UoY29va2llUGFyc2VyKHRoaXMuY29uZmlnLnNlY3JldCkpO1xuICAgIH1cblxuICAgIC8vIFV0aWxpdGFyeSBtaWRkbGV3YXJlcyBmb3IgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgIHRoaXMuYXBwLnVzZShsZWdhY3lQYXJhbXMpO1xuICAgIHRoaXMuYXBwLnVzZShyZXNwb25zZUJpbmRlcik7XG5cbiAgICAvLyBTZXJ2ZXIgaXMgcmVhZHksIGhhbmRsZSBwb3N0IGFwcGxpY2F0aW9uIHJvdXRpbmVzXG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgc2VydmVyIHJvdXRlcyBhbmQgZXJyb3IgaGFuZGxlcnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKSB7XG5cbiAgICAvLyBVc2UgYmFzZSByb3V0ZXIgZm9yIG1hcHBpbmcgdGhlIHJvdXRlcyB0byB0aGUgRXhwcmVzcyBzZXJ2ZXJcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogUm91dGVyJyk7XG4gICAgfVxuXG4gICAgLy8gQnVpbGRzIHRoZSByb3V0ZSBtYXAgYW5kIGJpbmRzIHRvIGN1cnJlbnQgZXhwcmVzcyBhcHBsaWNhdGlvblxuICAgIFJvdXRlci5idWlsZCh0aGlzLmNvbmZpZy5jb250cm9sbGVycywgdGhpcy5jb25maWcucm91dGVzLCB7XG4gICAgICBhcHA6IHRoaXMuYXBwLFxuICAgICAgcGF0aDogdGhpcy5jb25maWcucGF0aCxcbiAgICAgIGxvZ2dlcjogdGhpcy5jb25maWcubG9nZ2VyLFxuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlcyBvYXV0aCBzZXJ2ZXJcbiAgICBpZiAodGhpcy5jb25maWcub2F1dGgpIHtcbiAgICAgIGNvbnN0IHsgdG9rZW4sIC4uLm9hdXRoIH0gPSB0aGlzLmNvbmZpZy5vYXV0aDtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE9BdXRoMicpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIE9BdXRoIDIuMCBzZXJ2ZXIgaW5zdGFuY2UgYW5kIHRva2VuIGVuZHBvaW50XG4gICAgICB0aGlzLmFwcC5vYXV0aCA9IG5ldyBPQXV0aFNlcnZlcihvYXV0aCk7XG4gICAgICB0aGlzLmFwcC5wb3N0KCcvb2F1dGgvdG9rZW4nLCB0aGlzLmFwcC5vYXV0aC50b2tlbih0b2tlbikpO1xuICAgIH1cblxuICAgIC8vIEJpbmQgdGhlIGVycm9yIGhhbmRsZXJzXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IEVycm9yUmVwb3J0ZXInKTtcbiAgICB9XG5cbiAgICBlcnJvck1pZGRsZXdhcmUodGhpcy5jb25maWcuZXJyb3JzLCB7XG4gICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgcmF2ZW46IHRoaXMuY29uZmlnLnNlbnRyeSA/IFJhdmVuIDogdW5kZWZpbmVkLFxuICAgIH0pKHRoaXMuYXBwKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcG9zdC1zdGFydHVwIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGluaXRpYWxpemluZyBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblN0YXJ0dXAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucnVuU3RhcnR1cEpvYnMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdVbmtub3duIHN0YXJ0dXAgZXJyb3I6ICcgKyBlcnJvci5tZXNzYWdlLCBlcnJvcik7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmV4aXQoLTEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBzZXJ2ZXIgc3RhdHVwIGpvYnMsIHdpbCBjcmFzaCBpZiBhbnkgZmFpbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgcnVuU3RhcnR1cEpvYnMoKSB7XG4gICAgY29uc3Qgam9icyA9IHRoaXMuY29uZmlnLnN0YXJ0dXAgfHwge30gYXMgYW55O1xuICAgIGNvbnN0IHBpcGVsaW5lID0gam9icy5waXBlbGluZSB8fCBbXTtcblxuICAgIGlmIChwaXBlbGluZS5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnUnVubmluZyBzdGFydHVwIHBpcGVsaW5lJywgeyBqb2JzOiBwaXBlbGluZS5tYXAocCA9PiBwLm5hbWUgfHwgJ3Vua25vd24nKSB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogUnVuIGFsbCBzdGFydHVwIGpvYnMgaW4gc2VyaWVzXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChqb2JzLnBpcGVsaW5lLm1hcChhc3luYyBqb2IgPT4gam9iLnJ1bih0aGlzKSkpO1xuXG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1N1Y2Nlc3NmdWxseSByYW4gYWxsIHN0YXJ0dXAgam9icycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHByZS1zaHV0ZG93biByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBkaXNjb25uZWN0aW5nIGZyb20gZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25TaHV0ZG93bigpIHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==