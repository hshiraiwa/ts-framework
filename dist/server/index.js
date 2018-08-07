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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQW9FO0FBR3BFLGlEQUEwRTtBQU10QyxxQkFOM0IsbUJBQVUsQ0FNMkI7QUFBRSxjQU4zQixZQUFHLENBTTJCO0FBQUUsZUFOM0IsYUFBSSxDQU0yQjtBQUFFLGNBTjNCLFlBQUcsQ0FNMkI7QUFBRSxpQkFOM0IsZUFBTSxDQU0yQjtBQUx0RSxxREFBOEM7QUFLMEIsbUJBTGpFLGtCQUFRLENBS2lFO0FBSmhGLHVEQUFnRDtBQUlrQyxvQkFKM0UsbUJBQVMsQ0FJMkU7QUFGM0YsOENBQXNHO0FBSXRHLE1BQXFCLE1BQU8sU0FBUSxnQ0FBVTtJQU01QyxZQUFtQixPQUFzQixFQUFFLEdBQXlCO1FBQ2xFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFFdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLDRCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FDWixJQUFJLDRCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQzVCLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFFRCxnREFBZ0Q7UUFDaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksOEJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSw2QkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDRCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXpELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLE9BQU87UUFDWiw2QkFBNkI7UUFDN0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQWtCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLE1BQU07O1lBQ2pCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixPQUFPLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDcEQsMkJBQTJCO2dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHO3FCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO29CQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFO3lCQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNqQyxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUM7cUJBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsS0FBSzs7WUFDaEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUI7UUFDSCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTzs7O1lBQ2xCLE1BQU0saUJBQWEsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQUE7Q0FDRjtBQS9FRCx5QkErRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSYXZlbiBmcm9tIFwicmF2ZW5cIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIENvbXBvbmVudCwgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlcXVlc3RcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXNwb25zZVwiO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdXRlclwiO1xuaW1wb3J0IEh0dHBDb2RlIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgTG9nZ2VyQ29tcG9uZW50LCBTZWN1cml0eUNvbXBvbmVudCwgUmVxdWVzdENvbXBvbmVudCwgUm91dGVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSwgSHR0cENvZGUsIEh0dHBFcnJvciwgU2VydmVyT3B0aW9ucyB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIgZXh0ZW5kcyBCYXNlU2VydmVyIHtcbiAgcHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcHVibGljIHJhdmVuPzogUmF2ZW4uQ2xpZW50O1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCBzZXJ2ZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogU2VydmVyT3B0aW9ucywgYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyIHx8IExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIHRoaXMuY29tcG9uZW50KFxuICAgICAgbmV3IExvZ2dlckNvbXBvbmVudCh7XG4gICAgICAgIGxvZ2dlcjogdGhpcy5vcHRpb25zLmxvZ2dlcixcbiAgICAgICAgc2VudHJ5OiB0aGlzLm9wdGlvbnMuc2VudHJ5XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcGwpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXBsKTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIHNlY3VyaXR5IHNlcnZlciBjb21wb25lbnRzIGNvbmRpdGlvbmFsbHlcbiAgICBpZiAodGhpcy5vcHRpb25zLnNlY3VyaXR5KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudChuZXcgU2VjdXJpdHlDb21wb25lbnQodGhpcy5vcHRpb25zLnNlY3VyaXR5KSk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBiYXNlIHNlcnZlciBjb21wb25lbnRzXG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJlcXVlc3RDb21wb25lbnQodGhpcy5vcHRpb25zLnJlcXVlc3QpKTtcbiAgICB0aGlzLmNvbXBvbmVudChuZXcgUm91dGVyQ29tcG9uZW50KHRoaXMub3B0aW9ucy5yb3V0ZXIpKTtcblxuICAgIC8vIENvbnRpbnVlIHdpdGggc2VydmVyIGluaXRpYWxpemF0aW9uXG4gICAgdGhpcy5vbk1vdW50KCk7XG4gIH1cblxuICBwdWJsaWMgb25Nb3VudCgpOiB2b2lkIHtcbiAgICAvLyBNb3VudCBhbGwgY2hpbGQgY29tcG9uZW50c1xuICAgIHJldHVybiBzdXBlci5vbk1vdW50KHRoaXMgYXMgQmFzZVNlcnZlcik7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGxpc3RlbmluZyBvbiB0aGUgY29uZmlndXJlZCBwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZXJ2ZXJPcHRpb25zPn1cbiAgICovXG4gIHB1YmxpYyBhc3luYyBsaXN0ZW4oKTogUHJvbWlzZTxTZXJ2ZXJPcHRpb25zPiB7XG4gICAgYXdhaXQgdGhpcy5vbkluaXQodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcnZlck9wdGlvbnM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcFxuICAgICAgICAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMub3B0aW9ucy5wb3J0fWApO1xuICAgICAgICAgIHRoaXMub25SZWFkeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vblVubW91bnQodGhpcyk7XG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uUmVhZHkoKSB7XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeSh0aGlzKTtcbiAgfVxufVxuIl19