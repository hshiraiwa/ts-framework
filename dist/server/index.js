"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = exports.HttpCode = exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
const express = require("express");
const ts_framework_common_1 = require("ts-framework-common");
const components_1 = require("../components");
const router_1 = require("../components/router");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return router_1.Controller; } });
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return router_1.Delete; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return router_1.Get; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return router_1.Post; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return router_1.Put; } });
const HttpCode_1 = require("../error/http/HttpCode");
exports.HttpCode = HttpCode_1.default;
const HttpError_1 = require("../error/http/HttpError");
exports.HttpError = HttpError_1.default;
class Server extends ts_framework_common_1.BaseServer {
    constructor(options, app) {
        const logger = options.logger || ts_framework_common_1.Logger.initialize();
        super(Object.assign({ logger }, options));
        this.app = app || express();
        this.component(
        // Sentry will be initalized in logger component
        new components_1.LoggerComponent({ logger, sentry: this.options.sentry }));
        if (this.options.repl) {
            this.component(this.options.repl);
        }
        // Adds security server components conditionally
        if (this.options.security) {
            this.component(new components_1.SecurityComponent(Object.assign({ logger }, this.options.security)));
        }
        // Adds base server components
        this.component(new components_1.RequestComponent(Object.assign({ logger }, this.options.request)));
        this.component(new components_1.RouterComponent(Object.assign({ logger }, this.options.router)));
        // Continue with server initialization
        this.onMount();
    }
    onMount() {
        // Mount all child components
        return super.onMount(this);
    }
    onInit() {
        const _super = Object.create(null, {
            onInit: { get: () => super.onInit }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // Bind to process exit events for graceful shutdown by default
            if (this.options.bindToProcess !== false) {
                process.on("SIGTERM", () => __awaiter(this, void 0, void 0, function* () {
                    this.logger.debug("Received SIGTERM interruption from process");
                    yield this.close(true);
                }));
                process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
                    console.log(""); // This jumps a line and improves console readability
                    this.logger.debug("Received SIGINT interruption from process");
                    yield this.close(true);
                }));
            }
            // Initialize all child components
            return _super.onInit.call(this, this);
        });
    }
    /**
     * Starts listening on the configured port.
     *
     * @returns {Promise<ServerOptions>}
     */
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onInit();
            return new Promise((resolve, reject) => {
                // Get http server instance
                this.server = this.app
                    .listen(this.options.port, () => {
                    this.logger.info(`Server listening in port: ${this.options.port}`);
                    this.onReady()
                        .then(() => resolve(this.options))
                        .catch((error) => reject(error));
                })
                    .on("error", (error) => reject(error));
            });
        });
    }
    /**
     * Stops the server and closes the connection to the port.
     *
     * @returns {Promise<void>}
     */
    close(exitOnClose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Closing server instance and unmounting child components`);
            if (this.server) {
                yield this.server.close();
            }
            yield this.onUnmount();
            if (exitOnClose) {
                setTimeout(() => process.exit(0), 100);
            }
        });
    }
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     */
    onReady() {
        const _super = Object.create(null, {
            onReady: { get: () => super.onReady }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onReady.call(this, this);
        });
    }
    /**
     * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
     */
    onUnmount() {
        const _super = Object.create(null, {
            onUnmount: { get: () => super.onUnmount }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.onUnmount.call(this, this);
            this.logger.info("Unmounted server instance and its components successfully");
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLG1DQUFtQztBQUVuQyw2REFBeUU7QUFHekUsOENBQXNHO0FBQ3RHLGlEQUEwRTtBQUt0QywyRkFMM0IsbUJBQVUsT0FLMkI7QUFBa0IsdUZBTDNDLGVBQU0sT0FLMkM7QUFBdEIsb0ZBTG5CLFlBQUcsT0FLbUI7QUFBRSxxRkFMbkIsYUFBSSxPQUttQjtBQUFFLG9GQUxuQixZQUFHLE9BS21CO0FBSjlELHFEQUE4QztBQUkwQixtQkFKakUsa0JBQVEsQ0FJaUU7QUFIaEYsdURBQWdEO0FBR2tDLG9CQUgzRSxtQkFBUyxDQUcyRTtBQUUzRixNQUFxQixNQUFPLFNBQVEsZ0NBQVU7SUFPNUMsWUFBWSxPQUFzQixFQUFFLEdBQXlCO1FBQzNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyRCxLQUFLLGlCQUFHLE1BQU0sSUFBSyxPQUFPLEVBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsU0FBUztRQUNaLGdEQUFnRDtRQUNoRCxJQUFJLDRCQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FDN0QsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBRUQsZ0RBQWdEO1FBQ2hELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJ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RTtnQkFDZixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsT0FBTzs7Ozs7WUFDbEIsTUFBTSxPQUFNLE9BQU8sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLFNBQVM7Ozs7O1lBQ3BCLE1BQU0sT0FBTSxTQUFTLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkRBQTJELENBQUMsQ0FBQztRQUNoRixDQUFDO0tBQUE7Q0FDRjtBQS9HRCx5QkErR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZW50cnkgZnJvbSBcIkBzZW50cnkvbm9kZVwiO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHsgQmFzZVNlcnZlciwgTG9nZ2VyLCBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vYmFzZS9CYXNlUmVzcG9uc2VcIjtcbmltcG9ydCB7IExvZ2dlckNvbXBvbmVudCwgUmVxdWVzdENvbXBvbmVudCwgUm91dGVyQ29tcG9uZW50LCBTZWN1cml0eUNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyLCBEZWxldGUsIEdldCwgUG9zdCwgUHV0IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm91dGVyXCI7XG5pbXBvcnQgSHR0cENvZGUgZnJvbSBcIi4uL2Vycm9yL2h0dHAvSHR0cENvZGVcIjtcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSBcIi4uL2Vycm9yL2h0dHAvSHR0cEVycm9yXCI7XG5pbXBvcnQgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmV4cG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsIEh0dHBDb2RlLCBIdHRwRXJyb3IsIFNlcnZlck9wdGlvbnMgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIGV4dGVuZHMgQmFzZVNlcnZlciB7XG4gIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBwcm90ZWN0ZWQgc2VydmVyPzogaHR0cC5TZXJ2ZXI7XG4gIHB1YmxpYyBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcbiAgcHVibGljIG9wdGlvbnM6IFNlcnZlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VydmVyT3B0aW9ucywgYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xuICAgIGNvbnN0IGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5pbml0aWFsaXplKCk7XG4gICAgc3VwZXIoeyBsb2dnZXIsIC4uLm9wdGlvbnMgfSk7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuXG4gICAgdGhpcy5jb21wb25lbnQoXG4gICAgICAvLyBTZW50cnkgd2lsbCBiZSBpbml0YWxpemVkIGluIGxvZ2dlciBjb21wb25lbnRcbiAgICAgIG5ldyBMb2dnZXJDb21wb25lbnQoeyBsb2dnZXIsIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeSB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXBsKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIHNlY3VyaXR5IHNlcnZlciBjb21wb25lbnRzIGNvbmRpdGlvbmFsbHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3VyaXR5KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChuZXcgU2VjdXJpdHlDb21wb25lbnQoeyBsb2dnZXIsIC4uLnRoaXMub3B0aW9ucy5zZWN1cml0eSB9KSk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBiYXNlIHNlcnZlciBjb21wb25lbnRzXG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJlcXVlc3RDb21wb25lbnQoeyBsb2dnZXIsIC4uLnRoaXMub3B0aW9ucy5yZXF1ZXN0IH0pKTtcbiAgICB0aGlzLmNvbXBvbmVudChuZXcgUm91dGVyQ29tcG9uZW50KHsgbG9nZ2VyLCAuLi50aGlzLm9wdGlvbnMucm91dGVyIH0pKTtcblxuICAgIC8vIENvbnRpbnVlIHdpdGggc2VydmVyIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5vbk1vdW50KCk7XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudCgpOiB2b2lkIHtcbiAgICAvLyBNb3VudCBhbGwgY2hpbGQgY29tcG9uZW50c1xuICAgIHJldHVybiBzdXBlci5vbk1vdW50KHRoaXMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBCaW5kIHRvIHByb2Nlc3MgZXhpdCBldmVudHMgZm9yIGdyYWNlZnVsIHNodXRkb3duIGJ5IGRlZmF1bHRcbiAgICBpZiAodGhpcy5vcHRpb25zLmJpbmRUb1Byb2Nlc3MgIT09IGZhbHNlKSB7XG4gICAgICBwcm9jZXNzLm9uKFwiU0lHVEVSTVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiUmVjZWl2ZWQgU0lHVEVSTSBpbnRlcnJ1cHRpb24gZnJvbSBwcm9jZXNzXCIpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2Nlc3Mub24oXCJTSUdJTlRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlwiKTsgLy8gVGhpcyBqdW1wcyBhIGxpbmUgYW5kIGltcHJvdmVzIGNvbnNvbGUgcmVhZGFiaWxpdHlcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJSZWNlaXZlZCBTSUdJTlQgaW50ZXJydXB0aW9uIGZyb20gcHJvY2Vzc1wiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Jbml0KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIGF3YWl0IHRoaXMub25Jbml0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcnZlck9wdGlvbnM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcFxuICAgICAgICAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMub3B0aW9ucy5wb3J0fWApO1xuICAgICAgICAgIHRoaXMub25SZWFkeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoZXhpdE9uQ2xvc2UgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBDbG9zaW5nIHNlcnZlciBpbnN0YW5jZSBhbmQgdW5tb3VudGluZyBjaGlsZCBjb21wb25lbnRzYCk7XG5cbiAgICBpZiAodGhpcy5zZXJ2ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VydmVyLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5vblVubW91bnQoKTtcblxuICAgIGlmIChleGl0T25DbG9zZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBwcm9jZXNzLmV4aXQoMCksIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcG9zdC1zdGFydHVwIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGluaXRpYWxpemluZyBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uUmVhZHkoKSB7XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHByZS1zaHV0ZG93biByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBkaXNjb25uZWN0aW5nIGZyb20gZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblVubW91bnQoKSB7XG4gICAgYXdhaXQgc3VwZXIub25Vbm1vdW50KHRoaXMpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oXCJVbm1vdW50ZWQgc2VydmVyIGluc3RhbmNlIGFuZCBpdHMgY29tcG9uZW50cyBzdWNjZXNzZnVsbHlcIik7XG4gIH1cbn1cbiJdfQ==