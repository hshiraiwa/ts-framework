"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ts_framework_common_1 = require("ts-framework-common");
const router_1 = require("../components/router");
exports.Controller = router_1.Controller;
exports.Get = router_1.Get;
exports.Post = router_1.Post;
exports.Put = router_1.Put;
exports.Delete = router_1.Delete;
const HttpCode_1 = require("../error/http/HttpCode");
exports.HttpCode = HttpCode_1.default;
const HttpError_1 = require("../error/http/HttpError");
exports.HttpError = HttpError_1.default;
const components_1 = require("../components");
class Server extends ts_framework_common_1.BaseServer {
    constructor(options, app) {
        super(options);
        this.options = options;
        this.app = app || express();
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        this.component(new components_1.LoggerComponent({
            logger: this.options.logger,
            sentry: this.options.sentry
        }));
        if (this.options.repl) {
            this.component(this.options.repl);
        }
        // Adds security server components conditionally
        if (this.options.security) {
            this.component(new components_1.SecurityComponent(this.options.security));
        }
        // Adds base server components
        this.component(new components_1.RequestComponent(this.options.request));
        this.component(new components_1.RouterComponent(this.options.router));
        // Continue with server initialization
        this.onMount();
    }
    onMount() {
        // Mount all child components
        return super.onMount(this);
    }
    /**
     * Starts listening on the configured port.
     *
     * @returns {Promise<ServerOptions>}
     */
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onInit(this);
            return new Promise((resolve, reject) => {
                // Get http server instance
                this.server = this.app.listen(this.options.port, () => {
                    this.onReady(this)
                        .then(() => resolve(this.options))
                        .catch((error) => reject(error));
                }).on("error", (error) => reject(error));
            });
        });
    }
    /**
     * Stops the server and closes the connection to the port.
     *
     * @returns {Promise<void>}
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onUnmount(this);
            if (this.server) {
                return this.server.close();
            }
        });
    }
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     *
     * @returns {Promise<void>}
     */
    onReady(server) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.runStartupJobs();
            }
            catch (error) {
                this.logger.error("Unknown startup error: " + error.message, error);
                process.exit(-1);
                return;
            }
            try {
                yield this.runComponentsInitialization();
            }
            catch (error) {
                this.logger.error("Unknown component error: " + error.message, error);
                process.exit(-1);
                return;
            }
            yield _super("onReady").call(this, server);
            this.logger.info(`Server listening in port: ${this.options.port}`);
        });
    }
    /**
     * Runs the server statup jobs, wil crash if any fails.
     */
    runStartupJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = this.options.startup || {};
            const pipeline = jobs.pipeline || [];
            if (pipeline.length) {
                this.logger.debug("Running startup pipeline", { jobs: pipeline.map(p => p.name || "unknown") });
                // Run all startup jobs in series
                for (let i = 0; i < jobs.pipeline.length; i += 1) {
                    yield jobs.pipeline[i].run(this);
                }
                this.logger.debug("Successfully ran all startup jobs");
            }
        });
    }
    /**
     * Startup the server components in series
     */
    runComponentsInitialization() {
        return __awaiter(this, void 0, void 0, function* () {
            const components = this.components || {};
            if (components.length) {
                // Run all components in series
                for (let i = 0; i < components.length; i += 1) {
                    yield components[i].run(this);
                }
                this.logger.debug("Successfully initialized all components");
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQW9FO0FBR3BFLGlEQUEwRTtBQU10QyxxQkFOM0IsbUJBQVUsQ0FNMkI7QUFBRSxjQU4zQixZQUFHLENBTTJCO0FBQUUsZUFOM0IsYUFBSSxDQU0yQjtBQUFFLGNBTjNCLFlBQUcsQ0FNMkI7QUFBRSxpQkFOM0IsZUFBTSxDQU0yQjtBQUx0RSxxREFBOEM7QUFLMEIsbUJBTGpFLGtCQUFRLENBS2lFO0FBSmhGLHVEQUFnRDtBQUlrQyxvQkFKM0UsbUJBQVMsQ0FJMkU7QUFGM0YsOENBQXNHO0FBSXRHLE1BQXFCLE1BQU8sU0FBUSxnQ0FBVTtJQU01QyxZQUFtQixPQUFzQixFQUFFLEdBQXlCO1FBQ2xFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFFdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FDWixJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFB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ICogYXMgUmF2ZW4gZnJvbSBcInJhdmVuXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyLCBDb21wb25lbnQsIExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vYmFzZS9CYXNlUmVzcG9uc2VcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3V0ZXJcIjtcbmltcG9ydCBIdHRwQ29kZSBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwRXJyb3JcIjtcbmltcG9ydCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IExvZ2dlckNvbXBvbmVudCwgU2VjdXJpdHlDb21wb25lbnQsIFJlcXVlc3RDb21wb25lbnQsIFJvdXRlckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzXCI7XG5cbmV4cG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsIEh0dHBDb2RlLCBIdHRwRXJyb3IsIFNlcnZlck9wdGlvbnMgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIGV4dGVuZHMgQmFzZVNlcnZlciB7XG4gIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHB1YmxpYyByYXZlbj86IFJhdmVuLkNsaWVudDtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VyO1xuICBwcm90ZWN0ZWQgc2VydmVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlcnZlck9wdGlvbnMsIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBMb2dnZXJDb21wb25lbnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXIsXG4gICAgICAgIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVwbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBzZWN1cml0eSBzZXJ2ZXIgY29tcG9uZW50cyBjb25kaXRpb25hbGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWN1cml0eSkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNlY3VyaXR5Q29tcG9uZW50KHRoaXMub3B0aW9ucy5zZWN1cml0eSkpO1xuICAgIH1cblxuICAgIC8vIEFkZHMgYmFzZSBzZXJ2ZXIgY29tcG9uZW50c1xuICAgIHRoaXMuY29tcG9uZW50KG5ldyBSZXF1ZXN0Q29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXF1ZXN0KSk7XG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJvdXRlckNvbXBvbmVudCh0aGlzLm9wdGlvbnMucm91dGVyKSk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIGF3YWl0IHRoaXMub25Jbml0KHRoaXMpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBHZXQgaHR0cCBzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMuc2VydmVyID0gdGhpcy5hcHAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25SZWFkeSh0aGlzKVxuICAgICAgICAgIC50aGVuKCgpID0+IHJlc29sdmUodGhpcy5vcHRpb25zKSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICB9KS5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vblVubW91bnQodGhpcyk7XG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uUmVhZHkoc2VydmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucnVuU3RhcnR1cEpvYnMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJVbmtub3duIHN0YXJ0dXAgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMucnVuQ29tcG9uZW50c0luaXRpYWxpemF0aW9uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFwiVW5rbm93biBjb21wb25lbnQgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeShzZXJ2ZXIpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYFNlcnZlciBsaXN0ZW5pbmcgaW4gcG9ydDogJHt0aGlzLm9wdGlvbnMucG9ydH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBzZXJ2ZXIgc3RhdHVwIGpvYnMsIHdpbCBjcmFzaCBpZiBhbnkgZmFpbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgcnVuU3RhcnR1cEpvYnMoKSB7XG4gICAgY29uc3Qgam9icyA9IHRoaXMub3B0aW9ucy5zdGFydHVwIHx8ICh7fSBhcyBhbnkpO1xuICAgIGNvbnN0IHBpcGVsaW5lID0gam9icy5waXBlbGluZSB8fCBbXTtcblxuICAgIGlmIChwaXBlbGluZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiUnVubmluZyBzdGFydHVwIHBpcGVsaW5lXCIsIHsgam9iczogcGlwZWxpbmUubWFwKHAgPT4gcC5uYW1lIHx8IFwidW5rbm93blwiKSB9KTtcblxuICAgICAgLy8gUnVuIGFsbCBzdGFydHVwIGpvYnMgaW4gc2VyaWVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYnMucGlwZWxpbmUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXdhaXQgam9icy5waXBlbGluZVtpXS5ydW4odGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiU3VjY2Vzc2Z1bGx5IHJhbiBhbGwgc3RhcnR1cCBqb2JzXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHVwIHRoZSBzZXJ2ZXIgY29tcG9uZW50cyBpbiBzZXJpZXNcbiAgICovXG4gIHByb3RlY3RlZCBhc3luYyBydW5Db21wb25lbnRzSW5pdGlhbGl6YXRpb24oKSB7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHRoaXMuY29tcG9uZW50cyB8fCAoe30gYXMgYW55KTtcblxuICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gUnVuIGFsbCBjb21wb25lbnRzIGluIHNlcmllc1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGF3YWl0IGNvbXBvbmVudHNbaV0ucnVuKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlN1Y2Nlc3NmdWxseSBpbml0aWFsaXplZCBhbGwgY29tcG9uZW50c1wiKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==