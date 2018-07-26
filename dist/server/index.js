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
const Helmet = require("helmet");
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
            Raven.config(this.config.sentry.dsn, {
                autoBreadcrumbs: true,
                logger: 'ts-framework-logger',
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
     * Handles middleware initialization stuff, cannot be async.
     */
    onAppReady() {
        // Enable security protections
        if (this.config.helmet !== false) {
            this.app.use(Helmet(this.config.helmet));
        }
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
            const _a = this.config.oauth, { token, authorize } = _a, oauth = __rest(_a, ["token", "authorize"]);
            if (this.logger) {
                this.logger.info('Initializing server middleware: OAuth2');
            }
            // Prepare OAuth 2.0 server instance and token endpoint
            this.app.oauth = new OAuthServer(oauth);
            if (authorize) {
                this.app.use(this.app.oauth.authorize(authorize));
            }
            if (token) {
                this.app.post('/oauth/token', this.app.oauth.token(token));
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxpQ0FBaUM7QUFDakMsb0RBQW9EO0FBRXBELHFDQUFrQztBQUNsQywrQ0FBeUU7QUFDekUseURBQXFGO0FBQ3JGLDJDQUEyQztBQUczQyxvREFBeUU7QUFrQnZFLHFCQWxCTyx1QkFBVSxDQWtCUDtBQUFFLGNBbEJPLGdCQUFHLENBa0JQO0FBQUUsZUFsQk8saUJBQUksQ0FrQlA7QUFBRSxjQWxCTyxnQkFBRyxDQWtCUDtBQUFFLGlCQWxCTyxtQkFBTSxDQWtCUDtBQWpCcEMsb0RBQTZDO0FBa0IzQyxtQkFsQkssa0JBQVEsQ0FrQkw7QUFqQlYsc0RBQStDO0FBaUJuQyxvQkFqQkwsbUJBQVMsQ0FpQks7QUFkckIsTUFBTSxNQUFNLEdBQUcsZUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBWWIsd0JBQU07QUFWbkMsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUNyRixJQUFJLENBQUM7UUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsK0NBQXlEO0FBQWhELDhCQUFBLE9BQU8sQ0FBWTtBQVE1QjtJQUlFLFlBQW1C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ICogYXMgUmF2ZW4gZnJvbSAncmF2ZW4nO1xuaW1wb3J0ICogYXMgbXVsdGVyIGZyb20gJ211bHRlcic7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcmVxdWVzdElwIGZyb20gJ3JlcXVlc3QtaXAnO1xuaW1wb3J0ICogYXMgdXNlckFnZW50IGZyb20gJ2V4cHJlc3MtdXNlcmFnZW50JztcbmltcG9ydCAqIGFzIEdpdCBmcm9tICdnaXQtcmV2LXN5bmMnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgSGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgKiBhcyBPQXV0aFNlcnZlciBmcm9tICdleHByZXNzLW9hdXRoLXNlcnZlcic7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHsgY29ycywgbGVnYWN5UGFyYW1zLCByZXNwb25zZUJpbmRlciB9IGZyb20gJy4vbWlkZGxld2FyZXMvaW5kZXgnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBlcnJvck1pZGRsZXdhcmUsIEVycm9yRGVmaW5pdGlvbnMgfSBmcm9tICcuL2Vycm9yL0Vycm9yUmVwb3J0ZXInO1xuaW1wb3J0IFNpbXBsZUxvZ2dlciBmcm9tICcuLi9sb2dnZXIvaW5kZXgnO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tICcuLi9iYXNlL0Jhc2VSZXF1ZXN0JztcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gJy4uL2Jhc2UvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUgfSBmcm9tICcuL3JvdXRlci9kZWNvcmF0b3JzJztcbmltcG9ydCBIdHRwQ29kZSBmcm9tICcuL2Vycm9yL2h0dHAvSHR0cENvZGUnO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tICcuL2Vycm9yL2h0dHAvSHR0cEVycm9yJztcbmltcG9ydCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IExvZ2dlciA9IFNpbXBsZUxvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG5jb25zdCBTRU5UUllfUkVMRUFTRSA9IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFID8gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0UgOiAoKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBHaXQubG9uZygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICB9XG59KSgpO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3BvbnNlIH0gZnJvbSAnLi9oZWxwZXJzL3Jlc3BvbnNlJztcblxuZXhwb3J0IHtcbiAgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgTG9nZ2VyLFxuICBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFxuICBIdHRwQ29kZSwgSHR0cEVycm9yLCBTZXJ2ZXJPcHRpb25zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIHtcbiAgX3NlcnZlcjogYW55O1xuICBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25maWc6IFNlcnZlck9wdGlvbnMsIHB1YmxpYyBhcHA/OiBhbnkpIHtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBjb25maWcubG9nZ2VyO1xuXG4gICAgLy8gUHJlcGFyZSBzZXJ2ZXIgY29uZmlndXJhdGlvblxuICAgIHRoaXMuY29uZmlnID0geyAuLi5jb25maWcsIHBvcnQ6IGNvbmZpZy5wb3J0IHx8IDMwMDAgfTtcblxuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5jb25maWcuc2VudHJ5KSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeScpO1xuXG4gICAgICBSYXZlbi5jb25maWcodGhpcy5jb25maWcuc2VudHJ5LmRzbiwge1xuICAgICAgICBhdXRvQnJlYWRjcnVtYnM6IHRydWUsXG4gICAgICAgIGxvZ2dlcjogJ3RzLWZyYW1ld29yay1sb2dnZXInLFxuICAgICAgICByZWxlYXNlOiBTRU5UUllfUkVMRUFTRSxcbiAgICAgIH0pLmluc3RhbGwoKTtcblxuICAgICAgdGhpcy5hcHAudXNlKFJhdmVuLnJlcXVlc3RIYW5kbGVyKCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgbG9nZ2VyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMuYXBwLnVzZSgocmVxOiBCYXNlUmVxdWVzdCwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcS5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHBvc3QgaW5pdGlhbGl6YXRpb24gcm91dGluZXNcbiAgICB0aGlzLm9uQXBwUmVhZHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gR2V0IGh0dHAgc2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLl9zZXJ2ZXIgPSB0aGlzLmFwcC5saXN0ZW4odGhpcy5jb25maWcucG9ydCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uU3RhcnR1cCgpLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLmNvbmZpZykpLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgfSkub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIHNlcnZlciBhbmQgY2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdG9wKCkge1xuICAgIGF3YWl0IHRoaXMub25TaHV0ZG93bigpO1xuICAgIGlmICh0aGlzLl9zZXJ2ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtaWRkbGV3YXJlIGluaXRpYWxpemF0aW9uIHN0dWZmLCBjYW5ub3QgYmUgYXN5bmMuXG4gICAqL1xuICBwdWJsaWMgb25BcHBSZWFkeSgpOiB2b2lkIHtcblxuICAgIC8vIEVuYWJsZSBzZWN1cml0eSBwcm90ZWN0aW9uc1xuICAgIGlmICh0aGlzLmNvbmZpZy5oZWxtZXQgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmFwcC51c2UoSGVsbWV0KHRoaXMuY29uZmlnLmhlbG1ldCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgQ09SUyBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMuY29uZmlnLmNvcnMpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENPUlMnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnVzZShjb3JzKHRoaXMuY29uZmlnLmNvcnMgIT09IHRydWUgPyB0aGlzLmNvbmZpZy5jb3JzIDoge30pKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbXVsdGVyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5jb25maWcubXVsdGVyKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBNdWx0ZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnVzZShtdWx0ZXIodGhpcy5jb25maWcubXVsdGVyKS5zaW5nbGUoJ3BpY3R1cmUnKSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVzZXIgYWdlbnQgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmNvbmZpZy51c2VyQWdlbnQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFVzZXIgQWdlbnQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2VzIHJlcXVlc3QgZm9yIHRoZSByZWFsIElQXG4gICAgICB0aGlzLmFwcC51c2UocmVxdWVzdElwLm13KCkpO1xuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCB1c2VyIGFnZW50IGluZm9ybWF0aW9uXG4gICAgICB0aGlzLmFwcC51c2UodXNlckFnZW50LmV4cHJlc3MoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIGJhc2ljIGV4cHJlc3MgbWlkZGxld2FyZXNcbiAgICAvLyBUT0RPOiBQYXNzIGFsbCBvZiB0aGlzIHRvIGNvbmZpZ1xuICAgIHRoaXMuYXBwLnNldCgndHJ1c3RfcHJveHknLCAxKTtcbiAgICBpZiAodGhpcy5jb25maWcuYm9keUxpbWl0KSB7XG4gICAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlcih7IGxpbWl0OiB0aGlzLmNvbmZpZy5ib2R5TGltaXQgfSkpO1xuICAgIH1cbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuICAgIHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuICAgIC8vIE9ubHkgZW5hYmxlIGNvb2tpZSBwYXJzZXIgaWYgYSBzZWNyZXQgd2FzIHNldFxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWNyZXQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENvb2tpZVBhcnNlcicpO1xuICAgICAgfVxuICAgICAgdGhpcy5hcHAudXNlKGNvb2tpZVBhcnNlcih0aGlzLmNvbmZpZy5zZWNyZXQpKTtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXRhcnkgbWlkZGxld2FyZXMgZm9yIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICB0aGlzLmFwcC51c2UobGVnYWN5UGFyYW1zKTtcbiAgICB0aGlzLmFwcC51c2UocmVzcG9uc2VCaW5kZXIpO1xuXG4gICAgLy8gU2VydmVyIGlzIHJlYWR5LCBoYW5kbGUgcG9zdCBhcHBsaWNhdGlvbiByb3V0aW5lc1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIHNlcnZlciByb3V0ZXMgYW5kIGVycm9yIGhhbmRsZXJzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKCkge1xuXG4gICAgLy8gVXNlIGJhc2Ugcm91dGVyIGZvciBtYXBwaW5nIHRoZSByb3V0ZXMgdG8gdGhlIEV4cHJlc3Mgc2VydmVyXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFJvdXRlcicpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkcyB0aGUgcm91dGUgbWFwIGFuZCBiaW5kcyB0byBjdXJyZW50IGV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBSb3V0ZXIuYnVpbGQodGhpcy5jb25maWcuY29udHJvbGxlcnMsIHRoaXMuY29uZmlnLnJvdXRlcywge1xuICAgICAgYXBwOiB0aGlzLmFwcCxcbiAgICAgIHBhdGg6IHRoaXMuY29uZmlnLnBhdGgsXG4gICAgICBsb2dnZXI6IHRoaXMuY29uZmlnLmxvZ2dlcixcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZXMgb2F1dGggc2VydmVyXG4gICAgaWYgKHRoaXMuY29uZmlnLm9hdXRoKSB7XG4gICAgICBjb25zdCB7IHRva2VuLCBhdXRob3JpemUsIC4uLm9hdXRoIH0gPSB0aGlzLmNvbmZpZy5vYXV0aDtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE9BdXRoMicpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIE9BdXRoIDIuMCBzZXJ2ZXIgaW5zdGFuY2UgYW5kIHRva2VuIGVuZHBvaW50XG4gICAgICB0aGlzLmFwcC5vYXV0aCA9IG5ldyBPQXV0aFNlcnZlcihvYXV0aCk7XG5cbiAgICAgIGlmIChhdXRob3JpemUpIHtcbiAgICAgICAgdGhpcy5hcHAudXNlKHRoaXMuYXBwLm9hdXRoLmF1dGhvcml6ZShhdXRob3JpemUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHRoaXMuYXBwLnBvc3QoJy9vYXV0aC90b2tlbicsIHRoaXMuYXBwLm9hdXRoLnRva2VuKHRva2VuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQmluZCB0aGUgZXJyb3IgaGFuZGxlcnNcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogRXJyb3JSZXBvcnRlcicpO1xuICAgIH1cblxuICAgIGVycm9yTWlkZGxld2FyZSh0aGlzLmNvbmZpZy5lcnJvcnMsIHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICByYXZlbjogdGhpcy5jb25maWcuc2VudHJ5ID8gUmF2ZW4gOiB1bmRlZmluZWQsXG4gICAgfSkodGhpcy5hcHApO1xuXG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uU3RhcnR1cCgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5ydW5TdGFydHVwSm9icygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1Vua25vd24gc3RhcnR1cCBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgtMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIHNlcnZlciBzdGF0dXAgam9icywgd2lsIGNyYXNoIGlmIGFueSBmYWlscy5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBydW5TdGFydHVwSm9icygpIHtcbiAgICBjb25zdCBqb2JzID0gdGhpcy5jb25maWcuc3RhcnR1cCB8fCB7fSBhcyBhbnk7XG4gICAgY29uc3QgcGlwZWxpbmUgPSBqb2JzLnBpcGVsaW5lIHx8IFtdO1xuXG4gICAgaWYgKHBpcGVsaW5lLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdSdW5uaW5nIHN0YXJ0dXAgcGlwZWxpbmUnLCB7IGpvYnM6IHBpcGVsaW5lLm1hcChwID0+IHAubmFtZSB8fCAndW5rbm93bicpIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBSdW4gYWxsIHN0YXJ0dXAgam9icyBpbiBzZXJpZXNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGpvYnMucGlwZWxpbmUubWFwKGFzeW5jIGpvYiA9PiBqb2IucnVuKHRoaXMpKSk7XG5cbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3VjY2Vzc2Z1bGx5IHJhbiBhbGwgc3RhcnR1cCBqb2JzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcHJlLXNodXRkb3duIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGRpc2Nvbm5lY3RpbmcgZnJvbSBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblNodXRkb3duKCkge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19