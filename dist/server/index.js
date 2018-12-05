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
            sentry: this.options.sentry,
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
    onReady() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("onReady").call(this, this);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQXlEO0FBR3pELDhDQUFzRztBQUN0RyxpREFBMEU7QUFLdEMscUJBTDNCLG1CQUFVLENBSzJCO0FBQWtCLGlCQUwzQyxlQUFNLENBSzJDO0FBQXRCLGNBTG5CLFlBQUcsQ0FLbUI7QUFBRSxlQUxuQixhQUFJLENBS21CO0FBQUUsY0FMbkIsWUFBRyxDQUttQjtBQUo5RCxxREFBOEM7QUFJMEIsbUJBSmpFLGtCQUFRLENBSWlFO0FBSGhGLHVEQUFnRDtBQUdrQyxvQkFIM0UsbUJBQVMsQ0FHMkU7QUFFM0YsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTTVDLFlBQW1CLE9BQXNCLEVBQUUsR0FBeUI7UUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVyRCxJQUFJLENBQUMsU0FBUztRQUNaLGdEQUFnRDtRQUNoRCxJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksOEJBQWlCLGlCQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQ3hCLENBQUMsQ0FBQztTQUNMO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSw2QkFBZ0IsaUJBQ2pDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDdkIsQ0FBQyxDQUFDO1FBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDRCQUFlLGlCQUNoQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ3RCLENBQUMsQ0FBQztRQUVKLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLE9BQU87UUFDWiw2QkFBNkI7UUFDN0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQWtCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRVksTUFBTTs7O1lBQ2pCLGtDQUFrQztZQUNsQyxPQUFPLGdCQUFZLFlBQUMsSUFBa0IsRUFBRTtRQUMxQyxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsTUFBTTs7WUFDakIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3BELDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRztxQkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDbkUsSUFBSSxDQUFDLE9BQU8sRUFBRTt5QkFDWCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDakMsS0FBSyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDO3FCQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLEtBQUs7O1lBQ2hCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNVLE9BQU87OztZQUNsQixNQUFNLGlCQUFhLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0NBQ0Y7QUEvRkQseUJBK0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gXCJAc2VudHJ5L25vZGVcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIExvZ2dlciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXF1ZXN0XCI7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vYmFzZS9CYXNlUmVzcG9uc2VcIjtcbmltcG9ydCB7IExvZ2dlckNvbXBvbmVudCwgUmVxdWVzdENvbXBvbmVudCwgUm91dGVyQ29tcG9uZW50LCBTZWN1cml0eUNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyLCBEZWxldGUsIEdldCwgUG9zdCwgUHV0IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcm91dGVyXCI7XG5pbXBvcnQgSHR0cENvZGUgZnJvbSBcIi4uL2Vycm9yL2h0dHAvSHR0cENvZGVcIjtcbmltcG9ydCBIdHRwRXJyb3IgZnJvbSBcIi4uL2Vycm9yL2h0dHAvSHR0cEVycm9yXCI7XG5pbXBvcnQgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmV4cG9ydCB7IEJhc2VSZXF1ZXN0LCBCYXNlUmVzcG9uc2UsIENvbnRyb2xsZXIsIEdldCwgUG9zdCwgUHV0LCBEZWxldGUsIEh0dHBDb2RlLCBIdHRwRXJyb3IsIFNlcnZlck9wdGlvbnMgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIGV4dGVuZHMgQmFzZVNlcnZlciB7XG4gIHB1YmxpYyBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHB1YmxpYyBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIHNlcnZlcj86IGFueTtcbiAgcHVibGljIHNlbnRyeT86IFNlbnRyeS5Ob2RlQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zLCBhcHA/OiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIgfHwgTG9nZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIC8vIFNlbnRyeSB3aWxsIGJlIGluaXRhbGl6ZWQgaW4gbG9nZ2VyIGNvbXBvbmVudFxuICAgICAgbmV3IExvZ2dlckNvbXBvbmVudCh7XG4gICAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlcixcbiAgICAgICAgc2VudHJ5OiB0aGlzLm9wdGlvbnMuc2VudHJ5LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVwbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBzZWN1cml0eSBzZXJ2ZXIgY29tcG9uZW50cyBjb25kaXRpb25hbGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWN1cml0eSkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNlY3VyaXR5Q29tcG9uZW50KHtcbiAgICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgLi4udGhpcy5vcHRpb25zLnNlY3VyaXR5LFxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIEFkZHMgYmFzZSBzZXJ2ZXIgY29tcG9uZW50c1xuICAgIHRoaXMuY29tcG9uZW50KG5ldyBSZXF1ZXN0Q29tcG9uZW50KHtcbiAgICAgIGxvZ2dlcjogdGhpcy5sb2dnZXIsXG4gICAgICAuLi50aGlzLm9wdGlvbnMucmVxdWVzdCxcbiAgICB9KSk7XG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJvdXRlckNvbXBvbmVudCh7XG4gICAgICBsb2dnZXI6IHRoaXMubG9nZ2VyLFxuICAgICAgLi4udGhpcy5vcHRpb25zLnJvdXRlcixcbiAgICB9KSk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBJbml0aWFsaXplIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uSW5pdCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIGF3YWl0IHRoaXMub25Jbml0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcnZlck9wdGlvbnM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcFxuICAgICAgICAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMub3B0aW9ucy5wb3J0fWApO1xuICAgICAgICAgIHRoaXMub25SZWFkeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vblVubW91bnQodGhpcyk7XG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uUmVhZHkoKSB7XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeSh0aGlzKTtcbiAgfVxufVxuIl19