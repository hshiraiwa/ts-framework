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
        super(options);
        this.options = options;
        this.app = app || express();
        this.logger = options.logger || ts_framework_common_1.Logger.getInstance();
        this.component(
        // Sentry will be initalized in logger component
        new components_1.LoggerComponent({
            logger: this.options.logger,
            sentry: this.options.sentry
        }));
        if (this.options.repl) {
            this.component(this.options.repl);
        }
        // Adds security server components conditionally
        if (this.options.security) {
            this.component(new components_1.SecurityComponent(Object.assign({ logger: this.logger }, this.options.security)));
        }
        // Adds base server components
        this.component(new components_1.RequestComponent(Object.assign({ logger: this.logger }, this.options.request)));
        this.component(new components_1.RouterComponent(Object.assign({ logger: this.logger }, this.options.router)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFFbkMsNkRBQXlFO0FBR3pFLDhDQUFzRztBQUN0RyxpREFBMEU7QUFLdEMscUJBTDNCLG1CQUFVLENBSzJCO0FBQWtCLGlCQUwzQyxlQUFNLENBSzJDO0FBQXRCLGNBTG5CLFlBQUcsQ0FLbUI7QUFBRSxlQUxuQixhQUFJLENBS21CO0FBQUUsY0FMbkIsWUFBRyxDQUttQjtBQUo5RCxxREFBOEM7QUFJMEIsbUJBSmpFLGtCQUFRLENBSWlFO0FBSGhGLHVEQUFnRDtBQUdrQyxvQkFIM0UsbUJBQVMsQ0FHMkU7QUFFM0YsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTTVDLFlBQW1CLE9BQXNCLEVBQUUsR0FBeUI7UUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCxJQUFJLENBQUMsU0FBUztRQUNaLGdEQUFnRDtRQUNoRCxJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FB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TSxFQUFFO2dCQUNmLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUMzQjtZQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRXZCLElBQUksV0FBVyxFQUFFO2dCQUNmLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxPQUFPOzs7OztZQUNsQixNQUFNLE9BQU0sT0FBTyxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsU0FBUzs7Ozs7WUFDcEIsTUFBTSxPQUFNLFNBQVMsWUFBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7S0FBQTtDQUNGO0FBaElELHlCQWdJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyLCBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlcXVlc3RcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXNwb25zZVwiO1xuaW1wb3J0IHsgTG9nZ2VyQ29tcG9uZW50LCBSZXF1ZXN0Q29tcG9uZW50LCBSb3V0ZXJDb21wb25lbnQsIFNlY3VyaXR5Q29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIsIERlbGV0ZSwgR2V0LCBQb3N0LCBQdXQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3V0ZXJcIjtcbmltcG9ydCBIdHRwQ29kZSBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwRXJyb3JcIjtcbmltcG9ydCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuZXhwb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSwgSHR0cENvZGUsIEh0dHBFcnJvciwgU2VydmVyT3B0aW9ucyB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIgZXh0ZW5kcyBCYXNlU2VydmVyIHtcbiAgcHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHByb3RlY3RlZCBzZXJ2ZXI/OiBodHRwLlNlcnZlcjtcbiAgcHVibGljIHNlbnRyeT86IFNlbnRyeS5Ob2RlQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zLCBhcHA/OiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIC8vIFNlbnRyeSB3aWxsIGJlIGluaXRhbGl6ZWQgaW4gbG9nZ2VyIGNvbXBvbmVudFxuICAgICAgbmV3IExvZ2dlckNvbXBvbmVudCh7XG4gICAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlcixcbiAgICAgICAgc2VudHJ5OiB0aGlzLm9wdGlvbnMuc2VudHJ5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXBsKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIHNlY3VyaXR5IHNlcnZlciBjb21wb25lbnRzIGNvbmRpdGlvbmFsbHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3VyaXR5KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgICAgbmV3IFNlY3VyaXR5Q29tcG9uZW50KHtcbiAgICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5zZWN1cml0eVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGJhc2Ugc2VydmVyIGNvbXBvbmVudHNcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBSZXF1ZXN0Q29tcG9uZW50KHtcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnJlcXVlc3RcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBSb3V0ZXJDb21wb25lbnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICAuLi50aGlzLm9wdGlvbnMucm91dGVyXG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQmluZCB0byBwcm9jZXNzIGV4aXQgZXZlbnRzIGZvciBncmFjZWZ1bCBzaHV0ZG93biBieSBkZWZhdWx0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iaW5kVG9Qcm9jZXNzICE9PSBmYWxzZSkge1xuICAgICAgcHJvY2Vzcy5vbihcIlNJR1RFUk1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIFNJR1RFUk0gaW50ZXJydXB0aW9uIGZyb20gcHJvY2Vzc1wiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9jZXNzLm9uKFwiU0lHSU5UXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJcIik7IC8vIFRoaXMganVtcHMgYSBsaW5lIGFuZCBpbXByb3ZlcyBjb25zb2xlIHJlYWRhYmlsaXR5XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiUmVjZWl2ZWQgU0lHSU5UIGludGVycnVwdGlvbiBmcm9tIHByb2Nlc3NcIik7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uSW5pdCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICBhd2FpdCB0aGlzLm9uSW5pdCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBHZXQgaHR0cCBzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMuc2VydmVyID0gdGhpcy5hcHBcbiAgICAgICAgLmxpc3Rlbih0aGlzLm9wdGlvbnMucG9ydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFNlcnZlciBsaXN0ZW5pbmcgaW4gcG9ydDogJHt0aGlzLm9wdGlvbnMucG9ydH1gKTtcbiAgICAgICAgICB0aGlzLm9uUmVhZHkoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLm9wdGlvbnMpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJlcnJvclwiLCAoZXJyb3I6IEVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc2VydmVyIGFuZCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsb3NlKGV4aXRPbkNsb3NlID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgQ2xvc2luZyBzZXJ2ZXIgaW5zdGFuY2UgYW5kIHVubW91bnRpbmcgY2hpbGQgY29tcG9uZW50c2ApO1xuXG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICBhd2FpdCB0aGlzLnNlcnZlci5jbG9zZSgpO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMub25Vbm1vdW50KCk7XG5cbiAgICBpZiAoZXhpdE9uQ2xvc2UpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDApLCAxMDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3Qtc3RhcnR1cCByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBpbml0aWFsaXppbmcgZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblJlYWR5KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uUmVhZHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwcmUtc2h1dGRvd24gcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgZGlzY29ubmVjdGluZyBmcm9tIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uVW5tb3VudCh0aGlzKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVW5tb3VudGVkIHNlcnZlciBpbnN0YW5jZSBhbmQgaXRzIGNvbXBvbmVudHMgc3VjY2Vzc2Z1bGx5XCIpO1xuICB9XG59XG4iXX0=