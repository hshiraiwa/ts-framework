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
const components_1 = require("../components");
const router_1 = require("../components/router");
exports.Controller = router_1.Controller;
exports.Delete = router_1.Delete;
exports.Get = router_1.Get;
exports.Post = router_1.Post;
exports.Put = router_1.Put;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFFbkMsNkRBQXlFO0FBR3pFLDhDQUFzRztBQUN0RyxpREFBMEU7QUFLdEMscUJBTDNCLG1CQUFVLENBSzJCO0FBQWtCLGlCQUwzQyxlQUFNLENBSzJDO0FBQXRCLGNBTG5CLFlBQUcsQ0FLbUI7QUFBRSxlQUxuQixhQUFJLENBS21CO0FBQUUsY0FMbkIsWUFBRyxDQUttQjtBQUo5RCxxREFBOEM7QUFJMEIsbUJBSmpFLGtCQUFRLENBSWlFO0FBSGhGLHVEQUFnRDtBQUdrQyxvQkFIM0UsbUJBQVMsQ0FHMkU7QUFFM0YsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTzVDLFlBQVksT0FBc0IsRUFBRSxHQUF5QjtRQUMzRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckQsS0FBSyxpQkFBRyxNQUFNLElBQUssT0FBTyxFQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFNBQVM7UUFDWixnREFBZ0Q7UUFDaEQsSUFBSSw0QkFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQzdELENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUVELGdEQUFnRDtRQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSw4QkFB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Q2YsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU87Ozs7O1lBQ2xCLE1BQU0sT0FBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxTQUFTOzs7OztZQUNwQixNQUFNLE9BQU0sU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxDQUFDLENBQUM7UUFDaEYsQ0FBQztLQUFBO0NBQ0Y7QUEvR0QseUJBK0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tIFwiLi4vYmFzZS9CYXNlUmVxdWVzdFwiO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlc3BvbnNlXCI7XG5pbXBvcnQgeyBMb2dnZXJDb21wb25lbnQsIFJlcXVlc3RDb21wb25lbnQsIFJvdXRlckNvbXBvbmVudCwgU2VjdXJpdHlDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgRGVsZXRlLCBHZXQsIFBvc3QsIFB1dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdXRlclwiO1xuaW1wb3J0IEh0dHBDb2RlIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5leHBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLCBIdHRwQ29kZSwgSHR0cEVycm9yLCBTZXJ2ZXJPcHRpb25zIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciBleHRlbmRzIEJhc2VTZXJ2ZXIge1xuICBwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHJvdGVjdGVkIHNlcnZlcj86IGh0dHAuU2VydmVyO1xuICBwdWJsaWMgc2VudHJ5PzogU2VudHJ5Lk5vZGVDbGllbnQ7XG4gIHB1YmxpYyBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlcnZlck9wdGlvbnMsIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICBjb25zdCBsb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuaW5pdGlhbGl6ZSgpO1xuICAgIHN1cGVyKHsgbG9nZ2VyLCAuLi5vcHRpb25zIH0pO1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcblxuICAgIHRoaXMuY29tcG9uZW50KFxuICAgICAgLy8gU2VudHJ5IHdpbGwgYmUgaW5pdGFsaXplZCBpbiBsb2dnZXIgY29tcG9uZW50XG4gICAgICBuZXcgTG9nZ2VyQ29tcG9uZW50KHsgbG9nZ2VyLCBzZW50cnk6IHRoaXMub3B0aW9ucy5zZW50cnkgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVwbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBzZWN1cml0eSBzZXJ2ZXIgY29tcG9uZW50cyBjb25kaXRpb25hbGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWN1cml0eSkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNlY3VyaXR5Q29tcG9uZW50KHsgbG9nZ2VyLCAuLi50aGlzLm9wdGlvbnMuc2VjdXJpdHkgfSkpO1xuICAgIH1cblxuICAgIC8vIEFkZHMgYmFzZSBzZXJ2ZXIgY29tcG9uZW50c1xuICAgIHRoaXMuY29tcG9uZW50KG5ldyBSZXF1ZXN0Q29tcG9uZW50KHsgbG9nZ2VyLCAuLi50aGlzLm9wdGlvbnMucmVxdWVzdCB9KSk7XG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJvdXRlckNvbXBvbmVudCh7IGxvZ2dlciwgLi4udGhpcy5vcHRpb25zLnJvdXRlciB9KSk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQmluZCB0byBwcm9jZXNzIGV4aXQgZXZlbnRzIGZvciBncmFjZWZ1bCBzaHV0ZG93biBieSBkZWZhdWx0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iaW5kVG9Qcm9jZXNzICE9PSBmYWxzZSkge1xuICAgICAgcHJvY2Vzcy5vbihcIlNJR1RFUk1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIFNJR1RFUk0gaW50ZXJydXB0aW9uIGZyb20gcHJvY2Vzc1wiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9jZXNzLm9uKFwiU0lHSU5UXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJcIik7IC8vIFRoaXMganVtcHMgYSBsaW5lIGFuZCBpbXByb3ZlcyBjb25zb2xlIHJlYWRhYmlsaXR5XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiUmVjZWl2ZWQgU0lHSU5UIGludGVycnVwdGlvbiBmcm9tIHByb2Nlc3NcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uSW5pdCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICBhd2FpdCB0aGlzLm9uSW5pdCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBHZXQgaHR0cCBzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMuc2VydmVyID0gdGhpcy5hcHBcbiAgICAgICAgLmxpc3Rlbih0aGlzLm9wdGlvbnMucG9ydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFNlcnZlciBsaXN0ZW5pbmcgaW4gcG9ydDogJHt0aGlzLm9wdGlvbnMucG9ydH1gKTtcbiAgICAgICAgICB0aGlzLm9uUmVhZHkoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLm9wdGlvbnMpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJlcnJvclwiLCAoZXJyb3I6IEVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc2VydmVyIGFuZCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsb3NlKGV4aXRPbkNsb3NlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgQ2xvc2luZyBzZXJ2ZXIgaW5zdGFuY2UgYW5kIHVubW91bnRpbmcgY2hpbGQgY29tcG9uZW50c2ApO1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlcnZlci5jbG9zZSgpO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMub25Vbm1vdW50KCk7XG5cbiAgICBpZiAoZXhpdE9uQ2xvc2UpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDApLCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3Qtc3RhcnR1cCByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBpbml0aWFsaXppbmcgZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblJlYWR5KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uUmVhZHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwcmUtc2h1dGRvd24gcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgZGlzY29ubmVjdGluZyBmcm9tIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uVW5tb3VudCh0aGlzKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVW5tb3VudGVkIHNlcnZlciBpbnN0YW5jZSBhbmQgaXRzIGNvbXBvbmVudHMgc3VjY2Vzc2Z1bGx5XCIpO1xuICB9XG59XG4iXX0=