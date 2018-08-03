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
const ts_framework_common_1 = require("ts-framework-common");
const index_1 = require("./middlewares/index");
const ErrorReporter_1 = require("./error/ErrorReporter");
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
        this.logger = config.logger || ts_framework_common_1.Logger.getInstance();
        // Prepare server configuration
        this.config = Object.assign({}, config, { port: config.port || 3000 });
        // Start by registering Sentry if available
        if (this.logger && this.config.sentry) {
            this.logger.info('Initializing server middleware: Sentry');
            this.raven = Raven.config(this.config.sentry.dsn, {
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
            raven: this.config.sentry ? this.raven : undefined,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxpQ0FBaUM7QUFDakMsb0RBQW9EO0FBQ3BELHFDQUFrQztBQUNsQyw2REFBNkM7QUFDN0MsK0NBQXlFO0FBQ3pFLHlEQUFxRjtBQUdyRixvREFBeUU7QUFnQnZFLHFCQWhCTyx1QkFBVSxDQWdCUDtBQUFFLGNBaEJPLGdCQUFHLENBZ0JQO0FBQUUsZUFoQk8saUJBQUksQ0FnQlA7QUFBRSxjQWhCTyxnQkFBRyxDQWdCUDtBQUFFLGlCQWhCTyxtQkFBTSxDQWdCUDtBQWZwQyxvREFBNkM7QUFnQjNDLG1CQWhCSyxrQkFBUSxDQWdCTDtBQWZWLHNEQUErQztBQWVuQyxvQkFmTCxtQkFBUyxDQWVLO0FBWnJCLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDckYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMLCtDQUF5RDtBQUFoRCw4QkFBQSxPQUFPLENBQVk7QUFRNUI7SUFLRSxZQUFtQixNQUFxQixFQUFTLEdBQVM7UUFBdkMsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFTLFFBQUcsR0FBSCxHQUFH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UmF2ZW4gZnJvbSAncmF2ZW4nO1xuaW1wb3J0ICogYXMgbXVsdGVyIGZyb20gJ211bHRlcic7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgcmVxdWVzdElwIGZyb20gJ3JlcXVlc3QtaXAnO1xuaW1wb3J0ICogYXMgdXNlckFnZW50IGZyb20gJ2V4cHJlc3MtdXNlcmFnZW50JztcbmltcG9ydCAqIGFzIEdpdCBmcm9tICdnaXQtcmV2LXN5bmMnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgKiBhcyBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgKiBhcyBtZXRob2RPdmVycmlkZSBmcm9tICdtZXRob2Qtb3ZlcnJpZGUnO1xuaW1wb3J0ICogYXMgSGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5pbXBvcnQgKiBhcyBPQXV0aFNlcnZlciBmcm9tICdleHByZXNzLW9hdXRoLXNlcnZlcic7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICd0cy1mcmFtZXdvcmstY29tbW9uJztcbmltcG9ydCB7IGNvcnMsIGxlZ2FjeVBhcmFtcywgcmVzcG9uc2VCaW5kZXIgfSBmcm9tICcuL21pZGRsZXdhcmVzL2luZGV4JztcbmltcG9ydCB7IGRlZmF1bHQgYXMgZXJyb3JNaWRkbGV3YXJlLCBFcnJvckRlZmluaXRpb25zIH0gZnJvbSAnLi9lcnJvci9FcnJvclJlcG9ydGVyJztcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSAnLi4vYmFzZS9CYXNlUmVxdWVzdCc7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9iYXNlL0Jhc2VSZXNwb25zZSc7XG5pbXBvcnQgeyBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlIH0gZnJvbSAnLi9yb3V0ZXIvZGVjb3JhdG9ycyc7XG5pbXBvcnQgSHR0cENvZGUgZnJvbSAnLi9lcnJvci9odHRwL0h0dHBDb2RlJztcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSAnLi9lcnJvci9odHRwL0h0dHBFcnJvcic7XG5pbXBvcnQgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBTRU5UUllfUkVMRUFTRSA9IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFID8gcHJvY2Vzcy5lbnYuU0VOVFJZX1JFTEVBU0UgOiAoKCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBHaXQubG9uZygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICB9XG59KSgpO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3BvbnNlIH0gZnJvbSAnLi9oZWxwZXJzL3Jlc3BvbnNlJztcblxuZXhwb3J0IHtcbiAgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSxcbiAgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSxcbiAgSHR0cENvZGUsIEh0dHBFcnJvciwgU2VydmVyT3B0aW9ucyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XG4gIF9zZXJ2ZXI6IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXI7XG4gIHJhdmVuOiBSYXZlbi5DbGllbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbmZpZzogU2VydmVyT3B0aW9ucywgcHVibGljIGFwcD86IGFueSkge1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcbiAgICB0aGlzLmxvZ2dlciA9IGNvbmZpZy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBQcmVwYXJlIHNlcnZlciBjb25maWd1cmF0aW9uXG4gICAgdGhpcy5jb25maWcgPSB7IC4uLmNvbmZpZywgcG9ydDogY29uZmlnLnBvcnQgfHwgMzAwMCB9O1xuXG4gICAgLy8gU3RhcnQgYnkgcmVnaXN0ZXJpbmcgU2VudHJ5IGlmIGF2YWlsYWJsZVxuICAgIGlmICh0aGlzLmxvZ2dlciAmJiB0aGlzLmNvbmZpZy5zZW50cnkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogU2VudHJ5Jyk7XG5cbiAgICAgIHRoaXMucmF2ZW4gPSBSYXZlbi5jb25maWcodGhpcy5jb25maWcuc2VudHJ5LmRzbiwge1xuICAgICAgICBhdXRvQnJlYWRjcnVtYnM6IHRydWUsXG4gICAgICAgIGxvZ2dlcjogJ3RzLWZyYW1ld29yay1sb2dnZXInLFxuICAgICAgICByZWxlYXNlOiBTRU5UUllfUkVMRUFTRSxcbiAgICAgIH0pLmluc3RhbGwoKTtcblxuICAgICAgdGhpcy5hcHAudXNlKFJhdmVuLnJlcXVlc3RIYW5kbGVyKCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgbG9nZ2VyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMuYXBwLnVzZSgocmVxOiBCYXNlUmVxdWVzdCwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcS5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHBvc3QgaW5pdGlhbGl6YXRpb24gcm91dGluZXNcbiAgICB0aGlzLm9uQXBwUmVhZHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gR2V0IGh0dHAgc2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLl9zZXJ2ZXIgPSB0aGlzLmFwcC5saXN0ZW4odGhpcy5jb25maWcucG9ydCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uU3RhcnR1cCgpLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLmNvbmZpZykpLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgfSkub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIHNlcnZlciBhbmQgY2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdG9wKCkge1xuICAgIGF3YWl0IHRoaXMub25TaHV0ZG93bigpO1xuICAgIGlmICh0aGlzLl9zZXJ2ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtaWRkbGV3YXJlIGluaXRpYWxpemF0aW9uIHN0dWZmLCBjYW5ub3QgYmUgYXN5bmMuXG4gICAqL1xuICBwdWJsaWMgb25BcHBSZWFkeSgpOiB2b2lkIHtcblxuICAgIC8vIEVuYWJsZSBzZWN1cml0eSBwcm90ZWN0aW9uc1xuICAgIGlmICh0aGlzLmNvbmZpZy5oZWxtZXQgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmFwcC51c2UoSGVsbWV0KHRoaXMuY29uZmlnLmhlbG1ldCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgQ09SUyBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMuY29uZmlnLmNvcnMpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENPUlMnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnVzZShjb3JzKHRoaXMuY29uZmlnLmNvcnMgIT09IHRydWUgPyB0aGlzLmNvbmZpZy5jb3JzIDoge30pKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgbXVsdGVyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5jb25maWcubXVsdGVyKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBNdWx0ZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnVzZShtdWx0ZXIodGhpcy5jb25maWcubXVsdGVyKS5zaW5nbGUoJ3BpY3R1cmUnKSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHVzZXIgYWdlbnQgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmNvbmZpZy51c2VyQWdlbnQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFVzZXIgQWdlbnQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFyc2VzIHJlcXVlc3QgZm9yIHRoZSByZWFsIElQXG4gICAgICB0aGlzLmFwcC51c2UocmVxdWVzdElwLm13KCkpO1xuXG4gICAgICAvLyBQYXJzZXMgcmVxdWVzdCB1c2VyIGFnZW50IGluZm9ybWF0aW9uXG4gICAgICB0aGlzLmFwcC51c2UodXNlckFnZW50LmV4cHJlc3MoKSk7XG4gICAgfVxuXG4gICAgLy8gRW5hYmxlIGJhc2ljIGV4cHJlc3MgbWlkZGxld2FyZXNcbiAgICAvLyBUT0RPOiBQYXNzIGFsbCBvZiB0aGlzIHRvIGNvbmZpZ1xuICAgIHRoaXMuYXBwLnNldCgndHJ1c3RfcHJveHknLCAxKTtcbiAgICBpZiAodGhpcy5jb25maWcuYm9keUxpbWl0KSB7XG4gICAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlcih7IGxpbWl0OiB0aGlzLmNvbmZpZy5ib2R5TGltaXQgfSkpO1xuICAgIH1cbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuICAgIHRoaXMuYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcblxuICAgIC8vIE9ubHkgZW5hYmxlIGNvb2tpZSBwYXJzZXIgaWYgYSBzZWNyZXQgd2FzIHNldFxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWNyZXQpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IENvb2tpZVBhcnNlcicpO1xuICAgICAgfVxuICAgICAgdGhpcy5hcHAudXNlKGNvb2tpZVBhcnNlcih0aGlzLmNvbmZpZy5zZWNyZXQpKTtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXRhcnkgbWlkZGxld2FyZXMgZm9yIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICB0aGlzLmFwcC51c2UobGVnYWN5UGFyYW1zKTtcbiAgICB0aGlzLmFwcC51c2UocmVzcG9uc2VCaW5kZXIpO1xuXG4gICAgLy8gU2VydmVyIGlzIHJlYWR5LCBoYW5kbGUgcG9zdCBhcHBsaWNhdGlvbiByb3V0aW5lc1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgdGhlIHNlcnZlciByb3V0ZXMgYW5kIGVycm9yIGhhbmRsZXJzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKCkge1xuXG4gICAgLy8gVXNlIGJhc2Ugcm91dGVyIGZvciBtYXBwaW5nIHRoZSByb3V0ZXMgdG8gdGhlIEV4cHJlc3Mgc2VydmVyXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFJvdXRlcicpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkcyB0aGUgcm91dGUgbWFwIGFuZCBiaW5kcyB0byBjdXJyZW50IGV4cHJlc3MgYXBwbGljYXRpb25cbiAgICBSb3V0ZXIuYnVpbGQodGhpcy5jb25maWcuY29udHJvbGxlcnMsIHRoaXMuY29uZmlnLnJvdXRlcywge1xuICAgICAgYXBwOiB0aGlzLmFwcCxcbiAgICAgIHBhdGg6IHRoaXMuY29uZmlnLnBhdGgsXG4gICAgICBsb2dnZXI6IHRoaXMuY29uZmlnLmxvZ2dlcixcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZXMgb2F1dGggc2VydmVyXG4gICAgaWYgKHRoaXMuY29uZmlnLm9hdXRoKSB7XG4gICAgICBjb25zdCB7IHRva2VuLCBhdXRob3JpemUsIC4uLm9hdXRoIH0gPSB0aGlzLmNvbmZpZy5vYXV0aDtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IE9BdXRoMicpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIE9BdXRoIDIuMCBzZXJ2ZXIgaW5zdGFuY2UgYW5kIHRva2VuIGVuZHBvaW50XG4gICAgICB0aGlzLmFwcC5vYXV0aCA9IG5ldyBPQXV0aFNlcnZlcihvYXV0aCk7XG5cbiAgICAgIGlmIChhdXRob3JpemUpIHtcbiAgICAgICAgdGhpcy5hcHAudXNlKHRoaXMuYXBwLm9hdXRoLmF1dGhvcml6ZShhdXRob3JpemUpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHRoaXMuYXBwLnBvc3QoJy9vYXV0aC90b2tlbicsIHRoaXMuYXBwLm9hdXRoLnRva2VuKHRva2VuKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQmluZCB0aGUgZXJyb3IgaGFuZGxlcnNcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogRXJyb3JSZXBvcnRlcicpO1xuICAgIH1cblxuICAgIGVycm9yTWlkZGxld2FyZSh0aGlzLmNvbmZpZy5lcnJvcnMsIHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICByYXZlbjogdGhpcy5jb25maWcuc2VudHJ5ID8gdGhpcy5yYXZlbiA6IHVuZGVmaW5lZCxcbiAgICB9KSh0aGlzLmFwcCk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3Qtc3RhcnR1cCByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBpbml0aWFsaXppbmcgZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25TdGFydHVwKCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnJ1blN0YXJ0dXBKb2JzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignVW5rbm93biBzdGFydHVwIGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVucyB0aGUgc2VydmVyIHN0YXR1cCBqb2JzLCB3aWwgY3Jhc2ggaWYgYW55IGZhaWxzLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFzeW5jIHJ1blN0YXJ0dXBKb2JzKCkge1xuICAgIGNvbnN0IGpvYnMgPSB0aGlzLmNvbmZpZy5zdGFydHVwIHx8IHt9IGFzIGFueTtcbiAgICBjb25zdCBwaXBlbGluZSA9IGpvYnMucGlwZWxpbmUgfHwgW107XG5cbiAgICBpZiAocGlwZWxpbmUubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1J1bm5pbmcgc3RhcnR1cCBwaXBlbGluZScsIHsgam9iczogcGlwZWxpbmUubWFwKHAgPT4gcC5uYW1lIHx8ICd1bmtub3duJykgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IFJ1biBhbGwgc3RhcnR1cCBqb2JzIGluIHNlcmllc1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoam9icy5waXBlbGluZS5tYXAoYXN5bmMgam9iID0+IGpvYi5ydW4odGhpcykpKTtcblxuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTdWNjZXNzZnVsbHkgcmFuIGFsbCBzdGFydHVwIGpvYnMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwcmUtc2h1dGRvd24gcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgZGlzY29ubmVjdGluZyBmcm9tIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uU2h1dGRvd24oKSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=