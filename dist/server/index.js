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
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            // Bind to process exit events for graceful shutdown by default
            if (this.options.bindToProcess !== false) {
                process.on("SIGTERM", () => __awaiter(this, void 0, void 0, function* () {
                    this.logger.debug("Received SIGTERM interruption from process");
                    yield this.close();
                }));
                process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
                    console.log(""); // This jumps a line and improves console readability
                    this.logger.debug("Received SIGINT interruption from process");
                    yield this.close();
                }));
            }
            // Initialize all child components
            return _super("onInit").call(this, this);
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
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Closing server instance and unmounting child components`);
            if (this.server) {
                yield this.server.close();
            }
            return this.onUnmount();
        });
    }
    /**
     * Handles post-startup routines, may be extended for initializing databases and services.
     */
    onReady() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("onReady").call(this, this);
        });
    }
    /**
     * Handles pre-shutdown routines, may be extended for disconnecting from databases and services.
     */
    onUnmount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Unmounted server instance and its components successfully");
            setTimeout(() => process.exit(1), 1000);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQXlFO0FBR3pFLDhDQUFzRztBQUN0RyxpREFBMEU7QUFLdEMscUJBTDNCLG1CQUFVLENBSzJCO0FBQWtCLGlCQUwzQyxlQUFNLENBSzJDO0FBQXRCLGNBTG5CLFlBQUcsQ0FLbUI7QUFBRSxlQUxuQixhQUFJLENBS21CO0FBQUUsY0FMbkIsWUFBRyxDQUttQjtBQUo5RCxxREFBOEM7QUFJMEIsbUJBSmpFLGtCQUFRLENBSWlFO0FBSGhGLHVEQUFnRDtBQUdrQyxvQkFIM0UsbUJBQVMsQ0FHMkU7QUFFM0YsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTTVDLFlBQW1CLE9BQXNCLEVBQUUsR0FBeUI7UUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCxJQUFJLENBQUMsU0FBUztRQUNaLGdEQUFnRDtRQUNoRCxJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FB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QUFFLENBQUM7YUFDM0I7WUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU87OztZQUNsQixNQUFNLGlCQUFhLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxTQUFTOztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQzlFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtDQUNGO0FBNUhELHlCQTRIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBCYXNlU2VydmVyLCBMb2dnZXIsIExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlcXVlc3RcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXNwb25zZVwiO1xuaW1wb3J0IHsgTG9nZ2VyQ29tcG9uZW50LCBSZXF1ZXN0Q29tcG9uZW50LCBSb3V0ZXJDb21wb25lbnQsIFNlY3VyaXR5Q29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHNcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIsIERlbGV0ZSwgR2V0LCBQb3N0LCBQdXQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yb3V0ZXJcIjtcbmltcG9ydCBIdHRwQ29kZSBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IEh0dHBFcnJvciBmcm9tIFwiLi4vZXJyb3IvaHR0cC9IdHRwRXJyb3JcIjtcbmltcG9ydCB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuZXhwb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSwgSHR0cENvZGUsIEh0dHBFcnJvciwgU2VydmVyT3B0aW9ucyB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIgZXh0ZW5kcyBCYXNlU2VydmVyIHtcbiAgcHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcHVibGljIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHByb3RlY3RlZCBzZXJ2ZXI/OiBhbnk7XG4gIHB1YmxpYyBzZW50cnk/OiBTZW50cnkuTm9kZUNsaWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogU2VydmVyT3B0aW9ucywgYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgdGhpcy5jb21wb25lbnQoXG4gICAgICAvLyBTZW50cnkgd2lsbCBiZSBpbml0YWxpemVkIGluIGxvZ2dlciBjb21wb25lbnRcbiAgICAgIG5ldyBMb2dnZXJDb21wb25lbnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXIsXG4gICAgICAgIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVwbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBzZWN1cml0eSBzZXJ2ZXIgY29tcG9uZW50cyBjb25kaXRpb25hbGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWN1cml0eSkge1xuICAgICAgdGhpcy5jb21wb25lbnQoXG4gICAgICAgIG5ldyBTZWN1cml0eUNvbXBvbmVudCh7XG4gICAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMuc2VjdXJpdHlcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBiYXNlIHNlcnZlciBjb21wb25lbnRzXG4gICAgdGhpcy5jb21wb25lbnQoXG4gICAgICBuZXcgUmVxdWVzdENvbXBvbmVudCh7XG4gICAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucy5yZXF1ZXN0XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5jb21wb25lbnQoXG4gICAgICBuZXcgUm91dGVyQ29tcG9uZW50KHtcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnJvdXRlclxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gQ29udGludWUgd2l0aCBzZXJ2ZXIgaW5pdGlhbGl6YXRpb25cbiAgICB0aGlzLm9uTW91bnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1vdW50KCk6IHZvaWQge1xuICAgIC8vIE1vdW50IGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uTW91bnQodGhpcyBhcyBCYXNlU2VydmVyKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBvbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQmluZCB0byBwcm9jZXNzIGV4aXQgZXZlbnRzIGZvciBncmFjZWZ1bCBzaHV0ZG93biBieSBkZWZhdWx0XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iaW5kVG9Qcm9jZXNzICE9PSBmYWxzZSkge1xuICAgICAgcHJvY2Vzcy5vbihcIlNJR1RFUk1cIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIFNJR1RFUk0gaW50ZXJydXB0aW9uIGZyb20gcHJvY2Vzc1wiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHByb2Nlc3Mub24oXCJTSUdJTlRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlwiKTsgLy8gVGhpcyBqdW1wcyBhIGxpbmUgYW5kIGltcHJvdmVzIGNvbnNvbGUgcmVhZGFiaWxpdHlcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXCJSZWNlaXZlZCBTSUdJTlQgaW50ZXJydXB0aW9uIGZyb20gcHJvY2Vzc1wiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBhbGwgY2hpbGQgY29tcG9uZW50c1xuICAgIHJldHVybiBzdXBlci5vbkluaXQodGhpcyBhcyBCYXNlU2VydmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbGlzdGVuaW5nIG9uIHRoZSBjb25maWd1cmVkIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlck9wdGlvbnM+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGxpc3RlbigpOiBQcm9taXNlPFNlcnZlck9wdGlvbnM+IHtcbiAgICBhd2FpdCB0aGlzLm9uSW5pdCgpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBHZXQgaHR0cCBzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgIHRoaXMuc2VydmVyID0gdGhpcy5hcHBcbiAgICAgICAgLmxpc3Rlbih0aGlzLm9wdGlvbnMucG9ydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYFNlcnZlciBsaXN0ZW5pbmcgaW4gcG9ydDogJHt0aGlzLm9wdGlvbnMucG9ydH1gKTtcbiAgICAgICAgICB0aGlzLm9uUmVhZHkoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gcmVzb2x2ZSh0aGlzLm9wdGlvbnMpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgICAgICB9KVxuICAgICAgICAub24oXCJlcnJvclwiLCAoZXJyb3I6IEVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyB0aGUgc2VydmVyIGFuZCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gdG8gdGhlIHBvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBDbG9zaW5nIHNlcnZlciBpbnN0YW5jZSBhbmQgdW5tb3VudGluZyBjaGlsZCBjb21wb25lbnRzYCk7XG5cbiAgICBpZiAodGhpcy5zZXJ2ZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VydmVyLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub25Vbm1vdW50KCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25SZWFkeSgpIHtcbiAgICBhd2FpdCBzdXBlci5vblJlYWR5KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcHJlLXNodXRkb3duIHJvdXRpbmVzLCBtYXkgYmUgZXh0ZW5kZWQgZm9yIGRpc2Nvbm5lY3RpbmcgZnJvbSBkYXRhYmFzZXMgYW5kIHNlcnZpY2VzLlxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uVW5tb3VudCgpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVW5tb3VudGVkIHNlcnZlciBpbnN0YW5jZSBhbmQgaXRzIGNvbXBvbmVudHMgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCAxMDAwKTtcbiAgfVxufVxuIl19