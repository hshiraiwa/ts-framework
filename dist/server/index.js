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
            sentry: this.options.sentry,
        }));
        if (this.options.repl) {
            this.component(this.options.repl);
        }
        // Continue with server initialization
        this.onMount();
    }
    onMount() {
        // Adds security server components conditionally
        if (this.options.security) {
            this.component(new components_1.SecurityComponent(this.options.security));
        }
        // Adds base server components
        this.component(new components_1.RequestComponent(this.options.request));
        this.component(new components_1.RouterComponent(this.options.router));
        // Mount all child components
        return super.onMount(this);
    }
    /**
     * Starts listening on the configured port.
     *
     * @returns {Promise<ServerOptions>}
     */
    listen() {
        return new Promise((resolve, reject) => {
            // Get http server instance
            this.server = this.app.listen(this.options.port, () => {
                this.onReady(this).then(() => resolve(this.options)).catch((error) => reject(error));
            }).on('error', (error) => reject(error));
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
                this.logger.error('Unknown startup error: ' + error.message, error);
                process.exit(-1);
                return;
            }
            try {
                yield this.runComponentsInitialization();
            }
            catch (error) {
                this.logger.error('Unknown component error: ' + error.message, error);
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
                this.logger.debug('Running startup pipeline', { jobs: pipeline.map(p => p.name || 'unknown') });
                // Run all startup jobs in series
                for (let i = 0; i < jobs.pipeline.length; i += 1) {
                    yield jobs.pipeline[i].run(this);
                }
                this.logger.debug('Successfully ran all startup jobs');
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
                this.logger.debug('Successfully initialized all components');
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQW9FO0FBR3BFLGlEQUEwRTtBQVF4RSxxQkFSTyxtQkFBVSxDQVFQO0FBQUUsY0FSTyxZQUFHLENBUVA7QUFBRSxlQVJPLGFBQUksQ0FRUDtBQUFFLGNBUk8sWUFBRyxDQVFQO0FBQUUsaUJBUk8sZUFBTSxDQVFQO0FBUHBDLHFEQUE4QztBQVE1QyxtQkFSSyxrQkFBUSxDQVFMO0FBUFYsdURBQWdEO0FBT3BDLG9CQVBMLG1CQUFTLENBT0s7QUFMckIsOENBQXNHO0FBUXRHLE1BQXFCLE1BQU8sU0FBUSxnQ0FBVTtJQU01QyxZQUFtQixPQUFzQixFQUFFLEdBQXlCO1FBQ2xFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFFdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDRCQUFlLENBQUM7WUFDakMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSxPQUFPO1FB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QVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFaEcsaUNBQWlDO2dCQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDaEQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEM7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUN4RDtRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ2EsMkJBQTJCOztZQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQVMsQ0FBQztZQUVoRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBRXJCLCtCQUErQjtnQkFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0MsTUFBTSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvQjtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUEzSEQseUJBMkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmF2ZW4gZnJvbSAncmF2ZW4nO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIENvbXBvbmVudCwgTG9nZ2VyIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gJy4uL2Jhc2UvQmFzZVJlcXVlc3QnO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSAnLi4vYmFzZS9CYXNlUmVzcG9uc2UnO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvcm91dGVyJztcbmltcG9ydCBIdHRwQ29kZSBmcm9tICcuLi9lcnJvci9odHRwL0h0dHBDb2RlJztcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSAnLi4vZXJyb3IvaHR0cC9IdHRwRXJyb3InO1xuaW1wb3J0IHsgU2VydmVyT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IExvZ2dlckNvbXBvbmVudCwgU2VjdXJpdHlDb21wb25lbnQsIFJlcXVlc3RDb21wb25lbnQsIFJvdXRlckNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMnO1xuXG5leHBvcnQge1xuICBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLFxuICBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLFxuICBIdHRwQ29kZSwgSHR0cEVycm9yLCBTZXJ2ZXJPcHRpb25zLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIGV4dGVuZHMgQmFzZVNlcnZlciB7XG4gIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHB1YmxpYyByYXZlbj86IFJhdmVuLkNsaWVudDtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VyO1xuICBwcm90ZWN0ZWQgc2VydmVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlcnZlck9wdGlvbnMsIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLmNvbXBvbmVudChuZXcgTG9nZ2VyQ29tcG9uZW50KHtcbiAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlcixcbiAgICAgIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeSxcbiAgICB9KSk7XG5cbiAgICBpZih0aGlzLm9wdGlvbnMucmVwbCkge1xuICAgICAgdGhpcy5jb21wb25lbnQodGhpcy5vcHRpb25zLnJlcGwpO1xuICAgIH1cblxuICAgIC8vIENvbnRpbnVlIHdpdGggc2VydmVyIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5vbk1vdW50KCk7XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudCgpOiB2b2lkIHtcblxuICAgIC8vIEFkZHMgc2VjdXJpdHkgc2VydmVyIGNvbXBvbmVudHMgY29uZGl0aW9uYWxseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2VjdXJpdHkpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KG5ldyBTZWN1cml0eUNvbXBvbmVudCh0aGlzLm9wdGlvbnMuc2VjdXJpdHkpKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGJhc2Ugc2VydmVyIGNvbXBvbmVudHNcbiAgICB0aGlzLmNvbXBvbmVudChuZXcgUmVxdWVzdENvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVxdWVzdCkpO1xuICAgIHRoaXMuY29tcG9uZW50KG5ldyBSb3V0ZXJDb21wb25lbnQodGhpcy5vcHRpb25zLnJvdXRlcikpO1xuXG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBHZXQgaHR0cCBzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMuc2VydmVyID0gdGhpcy5hcHAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25SZWFkeSh0aGlzKS50aGVuKCgpID0+IHJlc29sdmUodGhpcy5vcHRpb25zKSkuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICB9KS5vbignZXJyb3InLCAoZXJyb3I6IEVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc2VydmVyIGFuZCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMub25Vbm1vdW50KHRoaXMpO1xuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgcmV0dXJuIHRoaXMuc2VydmVyLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcG9zdC1zdGFydHVwIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGluaXRpYWxpemluZyBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblJlYWR5KHNlcnZlcikge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLnJ1blN0YXJ0dXBKb2JzKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdVbmtub3duIHN0YXJ0dXAgZXJyb3I6ICcgKyBlcnJvci5tZXNzYWdlLCBlcnJvcik7XG4gICAgICBwcm9jZXNzLmV4aXQoLTEpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5ydW5Db21wb25lbnRzSW5pdGlhbGl6YXRpb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1Vua25vd24gY29tcG9uZW50IGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xuICAgICAgcHJvY2Vzcy5leGl0KC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeShzZXJ2ZXIpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYFNlcnZlciBsaXN0ZW5pbmcgaW4gcG9ydDogJHt0aGlzLm9wdGlvbnMucG9ydH1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHRoZSBzZXJ2ZXIgc3RhdHVwIGpvYnMsIHdpbCBjcmFzaCBpZiBhbnkgZmFpbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgcnVuU3RhcnR1cEpvYnMoKSB7XG4gICAgY29uc3Qgam9icyA9IHRoaXMub3B0aW9ucy5zdGFydHVwIHx8IHt9IGFzIGFueTtcbiAgICBjb25zdCBwaXBlbGluZSA9IGpvYnMucGlwZWxpbmUgfHwgW107XG5cbiAgICBpZiAocGlwZWxpbmUubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnUnVubmluZyBzdGFydHVwIHBpcGVsaW5lJywgeyBqb2JzOiBwaXBlbGluZS5tYXAocCA9PiBwLm5hbWUgfHwgJ3Vua25vd24nKSB9KTtcblxuICAgICAgLy8gUnVuIGFsbCBzdGFydHVwIGpvYnMgaW4gc2VyaWVzXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGpvYnMucGlwZWxpbmUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXdhaXQgam9icy5waXBlbGluZVtpXS5ydW4odGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTdWNjZXNzZnVsbHkgcmFuIGFsbCBzdGFydHVwIGpvYnMnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnR1cCB0aGUgc2VydmVyIGNvbXBvbmVudHMgaW4gc2VyaWVzXG4gICAqL1xuICBwcm90ZWN0ZWQgYXN5bmMgcnVuQ29tcG9uZW50c0luaXRpYWxpemF0aW9uKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSB0aGlzLmNvbXBvbmVudHMgfHwge30gYXMgYW55O1xuXG4gICAgaWYgKGNvbXBvbmVudHMubGVuZ3RoKSB7XG5cbiAgICAgIC8vIFJ1biBhbGwgY29tcG9uZW50cyBpbiBzZXJpZXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhd2FpdCBjb21wb25lbnRzW2ldLnJ1bih0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ1N1Y2Nlc3NmdWxseSBpbml0aWFsaXplZCBhbGwgY29tcG9uZW50cycpO1xuICAgIH1cbiAgfVxufVxuIl19