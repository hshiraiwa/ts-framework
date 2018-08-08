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
exports.Delete = router_1.Delete;
exports.Get = router_1.Get;
exports.Post = router_1.Post;
exports.Put = router_1.Put;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc2VydmVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBbUM7QUFDbkMsNkRBQW9FO0FBR3BFLGlEQUEwRTtBQU10QyxxQkFOM0IsbUJBQVUsQ0FNMkI7QUFBa0IsaUJBTjNDLGVBQU0sQ0FNMkM7QUFBdEIsY0FObkIsWUFBRyxDQU1tQjtBQUFFLGVBTm5CLGFBQUksQ0FNbUI7QUFBRSxjQU5uQixZQUFHLENBTW1CO0FBTDlELHFEQUE4QztBQUswQixtQkFMakUsa0JBQVEsQ0FLaUU7QUFKaEYsdURBQWdEO0FBSWtDLG9CQUozRSxtQkFBUyxDQUkyRTtBQUYzRiw4Q0FBc0c7QUFJdEcsTUFBcUIsTUFBTyxTQUFRLGdDQUFVO0lBTTVDLFlBQW1CLE9BQXNCLEVBQUUsR0FBeUI7UUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksNEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUNaLElBQUksNEJBQWUsQ0FBQztZQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUVELGdEQUFnRDtRQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSw4QkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDZCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksNEJBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFekQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sT0FBTztRQUNaLDZCQUE2QjtRQUM3QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBa0IsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFWSxNQUFNOzs7WUFDakIsa0NBQWtDO1lBQ2xDLE9BQU8sZ0JBQVksWUFBQyxJQUFrQixFQUFFO1FBQzFDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDVSxNQUFNOztZQUNqQixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixPQUFPLElBQUksT0FBTyxDQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDcEQsMkJBQTJCO2dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHO3FCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO29CQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFO3lCQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNqQyxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUM7cUJBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsS0FBSzs7WUFDaEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUI7UUFDSCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1UsT0FBTzs7O1lBQ2xCLE1BQU0saUJBQWEsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQUE7Q0FDRjtBQXBGRCx5QkFvRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSYXZlbiBmcm9tIFwicmF2ZW5cIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VTZXJ2ZXIsIENvbXBvbmVudCwgTG9nZ2VyIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcIi4uL2Jhc2UvQmFzZVJlcXVlc3RcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9iYXNlL0Jhc2VSZXNwb25zZVwiO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgRGVsZXRlLCBHZXQsIFBvc3QsIFB1dCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3JvdXRlclwiO1xuaW1wb3J0IEh0dHBDb2RlIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBDb2RlXCI7XG5pbXBvcnQgSHR0cEVycm9yIGZyb20gXCIuLi9lcnJvci9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgTG9nZ2VyQ29tcG9uZW50LCBSZXF1ZXN0Q29tcG9uZW50LCBSb3V0ZXJDb21wb25lbnQsIFNlY3VyaXR5Q29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHNcIjtcblxuZXhwb3J0IHsgQmFzZVJlcXVlc3QsIEJhc2VSZXNwb25zZSwgQ29udHJvbGxlciwgR2V0LCBQb3N0LCBQdXQsIERlbGV0ZSwgSHR0cENvZGUsIEh0dHBFcnJvciwgU2VydmVyT3B0aW9ucyB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIgZXh0ZW5kcyBCYXNlU2VydmVyIHtcbiAgcHVibGljIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcHVibGljIHJhdmVuPzogUmF2ZW4uQ2xpZW50O1xuICBwdWJsaWMgbG9nZ2VyOiBMb2dnZXI7XG4gIHByb3RlY3RlZCBzZXJ2ZXI/OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9wdGlvbnM6IFNlcnZlck9wdGlvbnMsIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlciB8fCBMb2dnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICB0aGlzLmNvbXBvbmVudChcbiAgICAgIG5ldyBMb2dnZXJDb21wb25lbnQoe1xuICAgICAgICBsb2dnZXI6IHRoaXMub3B0aW9ucy5sb2dnZXIsXG4gICAgICAgIHNlbnRyeTogdGhpcy5vcHRpb25zLnNlbnRyeVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXBsKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudCh0aGlzLm9wdGlvbnMucmVwbCk7XG4gICAgfVxuXG4gICAgLy8gQWRkcyBzZWN1cml0eSBzZXJ2ZXIgY29tcG9uZW50cyBjb25kaXRpb25hbGx5XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zZWN1cml0eSkge1xuICAgICAgdGhpcy5jb21wb25lbnQobmV3IFNlY3VyaXR5Q29tcG9uZW50KHRoaXMub3B0aW9ucy5zZWN1cml0eSkpO1xuICAgIH1cblxuICAgIC8vIEFkZHMgYmFzZSBzZXJ2ZXIgY29tcG9uZW50c1xuICAgIHRoaXMuY29tcG9uZW50KG5ldyBSZXF1ZXN0Q29tcG9uZW50KHRoaXMub3B0aW9ucy5yZXF1ZXN0KSk7XG4gICAgdGhpcy5jb21wb25lbnQobmV3IFJvdXRlckNvbXBvbmVudCh0aGlzLm9wdGlvbnMucm91dGVyKSk7XG5cbiAgICAvLyBDb250aW51ZSB3aXRoIHNlcnZlciBpbml0aWFsaXphdGlvblxuICAgIHRoaXMub25Nb3VudCgpO1xuICB9XG5cbiAgcHVibGljIG9uTW91bnQoKTogdm9pZCB7XG4gICAgLy8gTW91bnQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAgICByZXR1cm4gc3VwZXIub25Nb3VudCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBJbml0aWFsaXplIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gICAgcmV0dXJuIHN1cGVyLm9uSW5pdCh0aGlzIGFzIEJhc2VTZXJ2ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsaXN0ZW5pbmcgb24gdGhlIGNvbmZpZ3VyZWQgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVyT3B0aW9ucz59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgbGlzdGVuKCk6IFByb21pc2U8U2VydmVyT3B0aW9ucz4ge1xuICAgIGF3YWl0IHRoaXMub25Jbml0KCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcnZlck9wdGlvbnM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIEdldCBodHRwIHNlcnZlciBpbnN0YW5jZVxuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcFxuICAgICAgICAubGlzdGVuKHRoaXMub3B0aW9ucy5wb3J0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgU2VydmVyIGxpc3RlbmluZyBpbiBwb3J0OiAke3RoaXMub3B0aW9ucy5wb3J0fWApO1xuICAgICAgICAgIHRoaXMub25SZWFkeSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiByZXNvbHZlKHRoaXMub3B0aW9ucykpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIHRoZSBzZXJ2ZXIgYW5kIGNsb3NlcyB0aGUgY29ubmVjdGlvbiB0byB0aGUgcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5vblVubW91bnQodGhpcyk7XG4gICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBwb3N0LXN0YXJ0dXAgcm91dGluZXMsIG1heSBiZSBleHRlbmRlZCBmb3IgaW5pdGlhbGl6aW5nIGRhdGFiYXNlcyBhbmQgc2VydmljZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHVibGljIGFzeW5jIG9uUmVhZHkoKSB7XG4gICAgYXdhaXQgc3VwZXIub25SZWFkeSh0aGlzKTtcbiAgfVxufVxuIl19