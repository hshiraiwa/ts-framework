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
                    yield this.close();
                }));
                process.on("SIGINT", () => __awaiter(this, void 0, void 0, function* () {
                    console.log(""); // This jumps a line and improves console readability
                    this.logger.debug("Received SIGINT interruption from process");
                    yield this.close();
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
            setTimeout(() => process.exit(1), 1000);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQXlFO0FBR3pFLDhDQUFzRztBQUN0RyxpREFBMEU7QUFLdEMscUJBTDNCLG1CQUFVLENBSzJCO0FBQWtCLGlCQUwzQyxlQUFNLENBSzJDO0FBQXRCLGNBTG5CLFlBQUcsQ0FLbUI7QUFBRSxlQUxuQixhQUFJLENBS21CO0FBQUUsY0FMbkIsWUFBRyxDQUttQjtBQUo5RCxxREFBOEM7QUFJMEIsbUJBSmpFLGtCQUFRLENBSWlFO0FBSGhGLHVEQUFnRDtBQUdrQyxvQkFIM0UsbUJBQVMsQ0FHMkU7QUFFM0YsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTTVDLFlBQW1CLE9BQXNCLEVBQUUsR0FBeUI7UUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCxJQUFJLENBQUMsU0FBUztRQUNaLGdEQUFnRDtRQUNoRCxJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FB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S0FBSyxFQUFFLENBQUM7YUFDM0I7WUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLE9BQU87Ozs7O1lBQ2xCLE1BQU0sT0FBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxTQUFTOzs7OztZQUNwQixNQUFNLE9BQU0sU0FBUyxZQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxDQUFDLENBQUM7WUFDOUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0NBQ0Y7QUE3SEQseUJBNkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIExvZ2dlciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tIFwiLi4vYmFzZS9CYXNlUmVxdWVzdFwiO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlc3BvbnNlXCI7XG5pbXBvcnQgeyBMb2dnZXJDb21wb25lbnQsIFJlcXVlc3RDb21wb25lbnQsIFJvdXRlckNvbXBvbmVudCwgU2VjdXJpdHlDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgRGVsZXRlLCBHZXQsIFBvc3QsIFB1dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdXRlclwiO1xuaW1wb3J0IEh0dHBDb2RlIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5leHBvcnQgeyBCYXNlUmVxdWVzdCwgQmFzZVJlc3BvbnNlLCBDb250cm9sbGVyLCBHZXQsIFBvc3QsIFB1dCwgRGVsZXRlLCBIdHRwQ29kZSwgSHR0cEVycm9yLCBTZXJ2ZXJPcHRpb25zIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciBleHRlbmRzIEJhc2VTZXJ2ZXIge1xuICBwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcHJvdGVjdGVkIHNlcnZlcj86IGFueTtcbiAgcHVibGljIHNlbnRyeT86IFNlbnRyeS5Ob2RlQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zLCBhcHA/OiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIC8vIFNlbnRyeSB3aWxsIGJlIGluaXRhbGl6ZWQgaW4gbG9nZ2VyIGNvbXBvbmVudFxuICAgICAgbmV3IExvZ2dlckNvbXBvbmVudCh7XG4gICAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlcixcbiAgICAgICAgc2VudHJ5OiB0aGlzLm9wdGlvbnMuc2VudHJ5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXBsKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIHNlY3VyaXR5IHNlcnZlciBjb21wb25lbnRzIGNvbmRpdGlvbmFsbHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3VyaXR5KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgICAgbmV3IFNlY3VyaXR5Q29tcG9uZW50KHtcbiAgICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5zZWN1cml0eVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIGJhc2Ugc2VydmVyIGNvbXBvbmVudHNcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBSZXF1ZXN0Q29tcG9uZW50KHtcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnJlcXVlc3RcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBSb3V0ZXJDb21wb25lbnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgICAuLi50aGlzLm9wdGlvbnMucm91dGVyXG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBCaW5kIHRvIHByb2Nlc3MgZXhpdCBldmVudHMgZm9yIGdyYWNlZnVsIHNodXRkb3duIGJ5IGRlZmF1bHRcbiAgICBpZiAodGhpcy5vcHRpb25zLmJpbmRUb1Byb2Nlc3MgIT09IGZhbHNlKSB7XG4gICAgICBwcm9jZXNzLm9uKFwiU0lHVEVSTVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFwiUmVjZWl2ZWQgU0lHVEVSTSBpbnRlcnJ1cHRpb24gZnJvbSBwcm9jZXNzXCIpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcblxuICAgICAgcHJvY2Vzcy5vbihcIlNJR0lOVFwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiXCIpOyAvLyBUaGlzIGp1bXBzIGEgbGluZSBhbmQgaW1wcm92ZXMgY29uc29sZSByZWFkYWJpbGl0eVxuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIlJlY2VpdmVkIFNJR0lOVCBpbnRlcnJ1cHRpb24gZnJvbSBwcm9jZXNzXCIpO1xuICAgICAgICBhd2FpdCB0aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uSW5pdCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIGF3YWl0IHRoaXMub25Jbml0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcnZlck9wdGlvbnM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcFxuICAgICAgICAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMub3B0aW9ucy5wb3J0fWApO1xuICAgICAgICAgIHRoaXMub25SZWFkeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYENsb3Npbmcgc2VydmVyIGluc3RhbmNlIGFuZCB1bm1vdW50aW5nIGNoaWxkIGNvbXBvbmVudHNgKTtcblxuICAgIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgYXdhaXQgdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vblVubW91bnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBvc3Qtc3RhcnR1cCByb3V0aW5lcywgbWF5IGJlIGV4dGVuZGVkIGZvciBpbml0aWFsaXppbmcgZGF0YWJhc2VzIGFuZCBzZXJ2aWNlcy5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBvblJlYWR5KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uUmVhZHkodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwcmUtc2h1dGRvd24gcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgZGlzY29ubmVjdGluZyBmcm9tIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIGF3YWl0IHN1cGVyLm9uVW5tb3VudCh0aGlzKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwiVW5tb3VudGVkIHNlcnZlciBpbnN0YW5jZSBhbmQgaXRzIGNvbXBvbmVudHMgc3VjY2Vzc2Z1bGx5XCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcHJvY2Vzcy5leGl0KDEpLCAxMDAwKTtcbiAgfVxufVxuIl19