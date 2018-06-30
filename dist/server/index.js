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
            Raven.config(this.config.sentry.dsn, {
                autoBreadcrumbs: true,
                logger: 'devnup-server',
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
            const _a = this.config.oauth, { token, authorize } = _a, oauth = __rest(_a, ["token", "authorize"]);
            if (this.logger) {
                this.logger.info('Initializing server middleware: OAuth2');
            }
            // Prepare OAuth 2.0 server instance and token endpoint
            this.app.oauth = new OAuthServer(oauth);
            if (token) {
                this.app.post('/oauth/token', this.app.oauth.token(token));
            }
            if (authorize) {
                this.app.get('/authorize', this.app.oauth.authorize(authorize));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUNuQyx3Q0FBd0M7QUFDeEMsK0NBQStDO0FBQy9DLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxvREFBb0Q7QUFFcEQscUNBQWtDO0FBQ2xDLCtDQUF5RTtBQUN6RSx5REFBcUY7QUFDckYsMkNBQTJDO0FBRzNDLG9EQUF5RTtBQW1CdkUscUJBbkJPLHVCQUFVLENBbUJQO0FBQUUsY0FuQk8sZ0JBQUcsQ0FtQlA7QUFBRSxlQW5CTyxpQkFBSSxDQW1CUDtBQUFFLGNBbkJPLGdCQUFHLENBbUJQO0FBQUUsaUJBbkJPLG1CQUFNLENBbUJQO0FBbEJwQyxvREFBNkM7QUFtQjNDLG1CQW5CSyxrQkFBUSxDQW1CTDtBQWxCVixzREFBK0M7QUFrQm5DLG9CQWxCTCxtQkFBUyxDQWtCSztBQWRyQixNQUFNLE1BQU0sR0FBRyxlQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7QUFZYix3QkFBTTtBQVZuQyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3JGLElBQUksQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCwrQ0FBeUQ7QUFBaEQsOEJBQUEsT0FBTyxDQUFZO0FBZ0Q1QjtJQUlFLFlBQW1CLE1BQXFCLEVBQVMs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QUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUVyQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEcsQ0FBQztnQkFFRCx1Q0FBdUM7Z0JBQ3ZDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFNLEdBQUcsRUFBQyxFQUFFLGdEQUFDLE1BQU0sQ0FBTixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLEdBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBRWpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxVQUFVOztZQUNyQixNQUFNLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQTNORCx5QkEyTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSYXZlbiBmcm9tICdyYXZlbic7XG5pbXBvcnQgKiBhcyBtdWx0ZXIgZnJvbSAnbXVsdGVyJztcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyByZXF1ZXN0SXAgZnJvbSAncmVxdWVzdC1pcCc7XG5pbXBvcnQgKiBhcyB1c2VyQWdlbnQgZnJvbSAnZXhwcmVzcy11c2VyYWdlbnQnO1xuaW1wb3J0ICogYXMgR2l0IGZyb20gJ2dpdC1yZXYtc3luYyc7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcbmltcG9ydCAqIGFzIGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCAqIGFzIG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgKiBhcyBPQXV0aFNlcnZlciBmcm9tICdleHByZXNzLW9hdXRoLXNlcnZlcic7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHsgY29ycywgbGVnYWN5UGFyYW1zLCByZXNwb25zZUJpbmRlciB9IGZyb20gJy4vbWlkZGxld2FyZXMvaW5kZXgnO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBlcnJvck1pZGRsZXdhcmUsIEVycm9yRGVmaW5pdGlvbnMgfSBmcm9tICcuL2Vycm9yL0Vycm9yUmVwb3J0ZXInO1xuaW1wb3J0IFNpbXBsZUxvZ2dlciBmcm9tICcuLi9sb2dnZXIvaW5kZXgnO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tICcuLi9iYXNlL0Jhc2VSZXF1ZXN0JztcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gJy4uL2Jhc2UvQmFzZVJlc3BvbnNlJztcbmltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUgfSBmcm9tICcuL3JvdXRlci9kZWNvcmF0b3JzJztcbmltcG9ydCBIdHRwQ29kZSBmcm9tICcuL2Vycm9yL2h0dHAvSHR0cENvZGUnO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tICcuL2Vycm9yL2h0dHAvSHR0cEVycm9yJztcbmltcG9ydCBCYXNlSm9iIGZyb20gJy4uL2pvYnMvQmFzZUpvYic7XG5pbXBvcnQgeyBDb3JzT3B0aW9ucyB9IGZyb20gJ2NvcnMnO1xuXG5jb25zdCBMb2dnZXIgPSBTaW1wbGVMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcblxuY29uc3QgU0VOVFJZX1JFTEVBU0UgPSBwcm9jZXNzLmVudi5TRU5UUllfUkVMRUFTRSA/IHByb2Nlc3MuZW52LlNFTlRSWV9SRUxFQVNFIDogKCgpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gR2l0LmxvbmcoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgfVxufSkoKTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyByZXNwb25zZSB9IGZyb20gJy4vaGVscGVycy9yZXNwb25zZSc7XG5cbmV4cG9ydCB7XG4gIEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIExvZ2dlcixcbiAgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSxcbiAgSHR0cENvZGUsIEh0dHBFcnJvcixcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VydmVyT3B0aW9ucyB7XG4gIHBvcnQ6IG51bWJlcjtcbiAgc2VjcmV0Pzogc3RyaW5nO1xuICByb3V0ZXM/OiBhbnk7XG4gIGNvcnM/OiBib29sZWFuIHwgQ29yc09wdGlvbnM7XG4gIHVzZXJBZ2VudD86IGJvb2xlYW47XG4gIGNvbnRyb2xsZXJzPzogb2JqZWN0O1xuICBib2R5TGltaXQ/OiBzdHJpbmc7XG4gIHBhdGg/OiB7XG4gICAgZmlsdGVycz86IHN0cmluZztcbiAgICBjb250cm9sbGVycz86IHN0cmluZztcbiAgfTtcbiAgc2VudHJ5Pzoge1xuICAgIGRzbjogc3RyaW5nO1xuICB9O1xuICBzdGFydHVwPzoge1xuICAgIHBpcGVsaW5lOiBCYXNlSm9iW107XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICB9O1xuICBtdWx0ZXI/OiBhbnk7XG4gIG9hdXRoPzoge1xuICAgIG1vZGVsOiBhbnk7IC8vIFRPRE86IFNwZWNpZnkgdGhlIHNpZ25hdHVyZVxuICAgIHVzZUVycm9ySGFuZGxlcj86IGJvb2xlYW47XG4gICAgY29udGludWVNaWRkbGV3YXJlPzogYm9vbGVhbjtcbiAgICBhbGxvd0V4dGVuZGVkVG9rZW5BdHRyaWJ1dGVzPzogYm9vbGVhbjtcbiAgICBhdXRob3JpemU/OiB7XG5cbiAgICB9LFxuICAgIHRva2VuPzoge1xuICAgICAgZXh0ZW5kZWRHcmFudFR5cGVzPzogYW55O1xuICAgICAgYWNjZXNzVG9rZW5MaWZldGltZT86IG51bWJlcjtcbiAgICAgIHJlZnJlc2hUb2tlbkxpZmV0aW1lPzogbnVtYmVyO1xuICAgICAgcmVxdWlyZUNsaWVudEF1dGhlbnRpY2F0aW9uPzogYm9vbGVhbjtcbiAgICAgIGFsbG93RXh0ZW5kZWRUb2tlbkF0dHJpYnV0ZXM/OiBib29sZWFuO1xuICAgIH1cbiAgfTtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGVycm9ycz86IEVycm9yRGVmaW5pdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XG4gIF9zZXJ2ZXI6IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBTZXJ2ZXJPcHRpb25zLCBwdWJsaWMgYXBwPzogYW55KSB7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIHRoaXMubG9nZ2VyID0gY29uZmlnLmxvZ2dlcjtcblxuICAgIC8vIFByZXBhcmUgc2VydmVyIGNvbmZpZ3VyYXRpb25cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIC4uLmNvbmZpZyxcbiAgICAgIHBvcnQ6IGNvbmZpZy5wb3J0IHx8IDMwMDAsXG4gICAgfTtcblxuICAgIC8vIFN0YXJ0IGJ5IHJlZ2lzdGVyaW5nIFNlbnRyeSBpZiBhdmFpbGFibGVcbiAgICBpZiAodGhpcy5sb2dnZXIgJiYgdGhpcy5jb25maWcuc2VudHJ5KSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXppbmcgc2VydmVyIG1pZGRsZXdhcmU6IFNlbnRyeScpO1xuXG4gICAgICBSYXZlbi5jb25maWcodGhpcy5jb25maWcuc2VudHJ5LmRzbiwge1xuICAgICAgICBhdXRvQnJlYWRjcnVtYnM6IHRydWUsXG4gICAgICAgIGxvZ2dlcjogJ2Rldm51cC1zZXJ2ZXInLFxuICAgICAgICByZWxlYXNlOiBTRU5UUllfUkVMRUFTRSxcbiAgICAgIH0pLmluc3RhbGwoKTtcblxuICAgICAgdGhpcy5hcHAudXNlKFJhdmVuLnJlcXVlc3RIYW5kbGVyKCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSB0aGUgbG9nZ2VyIG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMuYXBwLnVzZSgocmVxOiBCYXNlUmVxdWVzdCwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIHJlcS5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcbiAgICAgICAgbmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHBvc3QgaW5pdGlhbGl6YXRpb24gcm91dGluZXNcbiAgICB0aGlzLm9uQXBwUmVhZHkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gR2V0IGh0dHAgc2VydmVyIGluc3RhbmNlXG4gICAgICB0aGlzLl9zZXJ2ZXIgPSB0aGlzLmFwcC5saXN0ZW4odGhpcy5jb25maWcucG9ydCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm9uU3RhcnR1cCgpLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLmNvbmZpZykpLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgfSkub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIHNlcnZlciBhbmQgY2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBzdG9wKCkge1xuICAgIGF3YWl0IHRoaXMub25TaHV0ZG93bigpO1xuICAgIGlmICh0aGlzLl9zZXJ2ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBtaWRkbGV3YXJlIGluaXRpYWxpemF0aW9uIHN0dWZmLlxuICAgKi9cbiAgcHVibGljIG9uQXBwUmVhZHkoKSB7XG5cbiAgICAvLyBFbmFibGUgdGhlIENPUlMgbWlkZGxld2FyZVxuICAgIGlmICh0aGlzLmNvbmZpZy5jb3JzKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBDT1JTJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC51c2UoY29ycyh0aGlzLmNvbmZpZy5jb3JzICE9PSB0cnVlID8gdGhpcy5jb25maWcuY29ycyA6IHt9KSk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG11bHRlciBtaWRkbGV3YXJlXG4gICAgaWYgKHRoaXMuY29uZmlnLm11bHRlcikge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogTXVsdGVyJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmFwcC51c2UobXVsdGVyKHRoaXMuY29uZmlnLm11bHRlcikuc2luZ2xlKCdwaWN0dXJlJykpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSB1c2VyIGFnZW50IG1pZGRsZXdhcmVcbiAgICBpZiAodGhpcy5jb25maWcudXNlckFnZW50KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBVc2VyIEFnZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFBhcnNlcyByZXF1ZXN0IGZvciB0aGUgcmVhbCBJUFxuICAgICAgdGhpcy5hcHAudXNlKHJlcXVlc3RJcC5tdygpKTtcblxuICAgICAgLy8gUGFyc2VzIHJlcXVlc3QgdXNlciBhZ2VudCBpbmZvcm1hdGlvblxuICAgICAgdGhpcy5hcHAudXNlKHVzZXJBZ2VudC5leHByZXNzKCkpO1xuICAgIH1cblxuICAgIC8vIEVuYWJsZSBiYXNpYyBleHByZXNzIG1pZGRsZXdhcmVzXG4gICAgLy8gVE9ETzogUGFzcyBhbGwgb2YgdGhpcyB0byBjb25maWdcbiAgICB0aGlzLmFwcC5zZXQoJ3RydXN0X3Byb3h5JywgMSk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmJvZHlMaW1pdCkge1xuICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIoeyBsaW1pdDogdGhpcy5jb25maWcuYm9keUxpbWl0IH0pKTtcbiAgICB9XG4gICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbiAgICB0aGlzLmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKTtcbiAgICB0aGlzLmFwcC51c2UobWV0aG9kT3ZlcnJpZGUoKSk7XG5cbiAgICAvLyBPbmx5IGVuYWJsZSBjb29raWUgcGFyc2VyIGlmIGEgc2VjcmV0IHdhcyBzZXRcbiAgICBpZiAodGhpcy5jb25maWcuc2VjcmV0KSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBDb29raWVQYXJzZXInKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXBwLnVzZShjb29raWVQYXJzZXIodGhpcy5jb25maWcuc2VjcmV0KSk7XG4gICAgfVxuXG4gICAgLy8gVXRpbGl0YXJ5IG1pZGRsZXdhcmVzIGZvciByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzXG4gICAgdGhpcy5hcHAudXNlKGxlZ2FjeVBhcmFtcyk7XG4gICAgdGhpcy5hcHAudXNlKHJlc3BvbnNlQmluZGVyKTtcblxuICAgIC8vIFNlcnZlciBpcyByZWFkeSwgaGFuZGxlIHBvc3QgYXBwbGljYXRpb24gcm91dGluZXNcbiAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIHRoZSBzZXJ2ZXIgcm91dGVzIGFuZCBlcnJvciBoYW5kbGVycy5cbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlcigpIHtcblxuICAgIC8vIFVzZSBiYXNlIHJvdXRlciBmb3IgbWFwcGluZyB0aGUgcm91dGVzIHRvIHRoZSBFeHByZXNzIHNlcnZlclxuICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBSb3V0ZXInKTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZHMgdGhlIHJvdXRlIG1hcCBhbmQgYmluZHMgdG8gY3VycmVudCBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAgUm91dGVyLmJ1aWxkKHRoaXMuY29uZmlnLmNvbnRyb2xsZXJzLCB0aGlzLmNvbmZpZy5yb3V0ZXMsIHtcbiAgICAgIGFwcDogdGhpcy5hcHAsXG4gICAgICBwYXRoOiB0aGlzLmNvbmZpZy5wYXRoLFxuICAgICAgbG9nZ2VyOiB0aGlzLmNvbmZpZy5sb2dnZXIsXG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGVzIG9hdXRoIHNlcnZlclxuICAgIGlmICh0aGlzLmNvbmZpZy5vYXV0aCkge1xuICAgICAgY29uc3QgeyB0b2tlbiwgYXV0aG9yaXplLCAuLi5vYXV0aCB9ID0gdGhpcy5jb25maWcub2F1dGg7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6aW5nIHNlcnZlciBtaWRkbGV3YXJlOiBPQXV0aDInKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSBPQXV0aCAyLjAgc2VydmVyIGluc3RhbmNlIGFuZCB0b2tlbiBlbmRwb2ludFxuICAgICAgdGhpcy5hcHAub2F1dGggPSBuZXcgT0F1dGhTZXJ2ZXIob2F1dGgpO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgdGhpcy5hcHAucG9zdCgnL29hdXRoL3Rva2VuJywgdGhpcy5hcHAub2F1dGgudG9rZW4odG9rZW4pKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF1dGhvcml6ZSkge1xuICAgICAgICB0aGlzLmFwcC5nZXQoJy9hdXRob3JpemUnLCB0aGlzLmFwcC5vYXV0aC5hdXRob3JpemUoYXV0aG9yaXplKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQmluZCB0aGUgZXJyb3IgaGFuZGxlcnNcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ0luaXRpYWxpemluZyBzZXJ2ZXIgbWlkZGxld2FyZTogRXJyb3JSZXBvcnRlcicpO1xuICAgIH1cblxuICAgIGVycm9yTWlkZGxld2FyZSh0aGlzLmNvbmZpZy5lcnJvcnMsIHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICByYXZlbjogdGhpcy5jb25maWcuc2VudHJ5ID8gUmF2ZW4gOiB1bmRlZmluZWQsXG4gICAgfSkodGhpcy5hcHApO1xuXG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uU3RhcnR1cCgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5ydW5TdGFydHVwSm9icygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1Vua25vd24gc3RhcnR1cCBlcnJvcjogJyArIGVycm9yLm1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHByb2Nlc3MuZXhpdCgtMSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgdGhlIHNlcnZlciBzdGF0dXAgam9icywgd2lsIGNyYXNoIGlmIGFueSBmYWlscy5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBydW5TdGFydHVwSm9icygpIHtcbiAgICBjb25zdCBqb2JzID0gdGhpcy5jb25maWcuc3RhcnR1cCB8fCB7fSBhcyBhbnk7XG4gICAgY29uc3QgcGlwZWxpbmUgPSBqb2JzLnBpcGVsaW5lIHx8IFtdO1xuXG4gICAgaWYgKHBpcGVsaW5lLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdSdW5uaW5nIHN0YXJ0dXAgcGlwZWxpbmUnLCB7IGpvYnM6IHBpcGVsaW5lLm1hcChwID0+IHAubmFtZSB8fCAndW5rbm93bicpIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiBSdW4gYWxsIHN0YXJ0dXAgam9icyBpbiBzZXJpZXNcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGpvYnMucGlwZWxpbmUubWFwKGFzeW5jIGpvYiA9PiBqb2IucnVuKHRoaXMpKSk7XG5cbiAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3VjY2Vzc2Z1bGx5IHJhbiBhbGwgc3RhcnR1cCBqb2JzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcHJlLXNodXRkb3duIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGRpc2Nvbm5lY3RpbmcgZnJvbSBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblNodXRkb3duKCkge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19