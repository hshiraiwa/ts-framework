"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanStack = require("clean-stack");
const express = require("express");
const path = require("path");
const urljoin = require("url-join");
const util = require("util");
const filter_1 = require("../helpers/filter");
const async_1 = require("../middlewares/async");
// TODO: Inject this constants from outside
// Prepare static full paths, relative to project root
const ctrl_path = "../../../api/controllers";
const BASE_CTRLS_PATH = path.join(__dirname, ctrl_path);
class ServerRouter {
    constructor(controllers, routes, options = { path: {} }) {
        if (!controllers && !routes) {
            throw new Error("Could not initialize the router without routes or controllers");
        }
        this.options = options;
        this.logger = options.logger;
        this.options.path = this.options.path || {};
        this.options.path.controllers = this.options.path.controllers || BASE_CTRLS_PATH;
        const r = routes || {};
        const c = controllers || {};
        const decoratedRoutes = this.decoratedRoutes(c);
        this.routes = {
            get: Object.assign({}, decoratedRoutes.get, r.get),
            post: Object.assign({}, decoratedRoutes.post, r.post),
            put: Object.assign({}, decoratedRoutes.put, r.put),
            delete: Object.assign({}, decoratedRoutes.delete, r.delete)
        };
        this.init();
    }
    /**
     * Prepare the controller methods to being bound.
     * @param method
     * @param ctrl
     * @returns {{}}
     */
    prepareControllerMethods(method, ctrl) {
        const decoratedRoutes = {};
        Object.keys(ctrl.routes[method] || {}).map((route) => {
            if (ctrl.baseFilters) {
                ctrl.routes[method][route].filters = ctrl.baseFilters.concat(ctrl.routes[method][route].filters);
            }
            if (ctrl.baseRoute) {
                const fullRoute = urljoin(ctrl.baseRoute, route);
                decoratedRoutes[fullRoute] = ctrl.routes[method][route];
            }
            else {
                decoratedRoutes[route] = ctrl.routes[method][route];
            }
        });
        return decoratedRoutes;
    }
    /**
     * Prepare the decorated routes for being merged into the routes map.
     *
     * @param controllers The controllers map
     *
     * @returns {Object}
     */
    decoratedRoutes(controllers) {
        const decoratedRoutes = { get: {}, post: {}, put: {}, delete: {} };
        // Prepare API routes and its controllers from decorators
        Object.keys(controllers || {})
            .map(name => ({
            name,
            baseRoute: controllers[name].baseRoute,
            baseFilters: controllers[name].baseFilters,
            routes: controllers[name].routes()
        }))
            .map((ctrl) => {
            decoratedRoutes.get = Object.assign({}, decoratedRoutes.get, this.prepareControllerMethods("get", ctrl));
            decoratedRoutes.post = Object.assign({}, decoratedRoutes.post, this.prepareControllerMethods("post", ctrl));
            decoratedRoutes.put = Object.assign({}, decoratedRoutes.put, this.prepareControllerMethods("put", ctrl));
            decoratedRoutes.delete = Object.assign({}, decoratedRoutes.delete, this.prepareControllerMethods("delete", ctrl));
        });
        return decoratedRoutes;
    }
    init() {
        const map = this.routes;
        Object.keys(map).map(method => this.bindMethod(method, map[method]));
    }
    /**
     * Binds all routes registered in the method supplied
     *
     * @param method The http method to bind
     * @param routes The routes map
     *
     * @returns {boolean}
     */
    bindMethod(method, routes) {
        for (const r in routes) {
            if (routes.hasOwnProperty(r) && routes[r].controller) {
                // Ensure logger is available
                if (this.logger) {
                    this.logger.silly(`Registering server route: ${method.toUpperCase()} ${r}`);
                }
                // Get controller from map
                // noinspection JSUnresolvedVariable
                const ctrl = this.registerController(routes, r);
                // Add the filters wrapper instance to the routes map
                if (routes[r].filters && routes[r].filters.length) {
                    // Validate all filters
                    if (routes[r].filters.filter(f => !f).length > 0) {
                        throw new Error("Invalid filters for route: " + method.toUpperCase() + " " + r);
                    }
                    // Register route with filters in current map for biding to express
                    this.routes[method][r] = filter_1.default.apply(routes[r].filters, this.options.path.filters).concat([ctrl]);
                }
                else {
                    // Register route in current map for biding to express
                    this.routes[method][r] = ctrl;
                }
            }
        }
        return true;
    }
    /**
     * Register the controller defined by the route supplied.
     *
     * @param routes The routes map
     * @param r The route to register
     *
     * @returns {any}
     */
    registerController(routes, r) {
        let ctrl = routes[r].controller;
        // Check controller type
        if (ctrl && util.isString(ctrl)) {
            try {
                // Load controller from path
                ctrl = require(path.join(this.options.path.controllers, ctrl));
                // Fix for moth modules systems (import / require)
                ctrl = ctrl.default || ctrl;
            }
            catch (e) {
                e.stack = cleanStack(e.stack);
                if (e.message.match(new RegExp(ctrl))) {
                    // Throw a direct message when controller was not found
                    const error = new Error(`Controller not found: ${path.join(ctrl_path, ctrl)}`);
                    error.stack = e.stack;
                }
                else {
                    // Unknown error
                    throw e;
                }
            }
        }
        else if (!ctrl || !util.isFunction(ctrl)) {
            // Throw invalid controller error
            throw new Error(`Controller is not valid for route: ${r}`);
        }
        return ctrl;
    }
    /**
     * Binds the controller to the express application or creates a new one.
     *
     * @param {express.Application} [app] The express application
     *
     * @returns {express.Application}
     */
    register(app) {
        this.app = app || express();
        for (const method in this.routes) {
            if (this.routes.hasOwnProperty(method)) {
                for (const r in this.routes[method]) {
                    if (r && this.routes[method].hasOwnProperty(r)) {
                        this.app[method](r, async_1.default(this.routes[method][r]));
                    }
                }
            }
        }
        // Return the app instance
        return this.app;
    }
    /**
     * Build a router using the supplied routes map and options.
     *
     * @param {Object | string} controllers The map of controller classes to bind to
     * @param {Object | string} routes The map of route files ot bind to
     *
     * @param {RouterOptions} options
     */
    static build(controllers, routes, options) {
        let wrapper;
        if (routes && util.isString(routes)) {
            wrapper = new ServerRouter(controllers, require(routes), options);
        }
        else {
            wrapper = new ServerRouter(controllers, routes, options);
        }
        return wrapper.register(options ? options.app : undefined);
    }
}
exports.default = ServerRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBRTdCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFFN0IsOENBQStDO0FBRS9DLGdEQUFtRDtBQUVuRCwyQ0FBMkM7QUFDM0Msc0RBQXNEO0FBQ3RELE1BQU0sU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBRTdDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBMEJ4RCxNQUFxQixZQUFZO0lBTS9CLFlBQVksV0FBZ0IsRUFBRSxNQUFnQixFQUFFLFVBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNuRixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7UUFFakYsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFLLEVBQWUsQ0FBQztRQUNyQyxNQUFNLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFD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QUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsMEJBQTBCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBNEIsRUFBRSxNQUF5QixFQUFFLE9BQXVCO1FBQzNGLElBQUksT0FBTyxDQUFDO1FBRVosSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRTthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBeE5ELCtCQXdOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsZWFuU3RhY2sgZnJvbSBcImNsZWFuLXN0YWNrXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgKiBhcyB1cmxqb2luIGZyb20gXCJ1cmwtam9pblwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi5cIjtcbmltcG9ydCBGaWx0ZXJzV3JhcHBlciBmcm9tIFwiLi4vaGVscGVycy9maWx0ZXJcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgYXN5bmNNaWRkbGV3YXJlIGZyb20gXCIuLi9taWRkbGV3YXJlcy9hc3luY1wiO1xuXG4vLyBUT0RPOiBJbmplY3QgdGhpcyBjb25zdGFudHMgZnJvbSBvdXRzaWRlXG4vLyBQcmVwYXJlIHN0YXRpYyBmdWxsIHBhdGhzLCByZWxhdGl2ZSB0byBwcm9qZWN0IHJvb3RcbmNvbnN0IGN0cmxfcGF0aCA9IFwiLi4vLi4vLi4vYXBpL2NvbnRyb2xsZXJzXCI7XG5cbmNvbnN0IEJBU0VfQ1RSTFNfUEFUSCA9IHBhdGguam9pbihfX2Rpcm5hbWUsIGN0cmxfcGF0aCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVyT3B0aW9ucyB7XG4gIGxvZ2dlcj86IExvZ2dlckluc3RhbmNlO1xuICBhcHA/OiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICBwYXRoOiB7XG4gICAgY29udHJvbGxlcnM/OiBzdHJpbmc7XG4gICAgZmlsdGVycz86IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgUm91dGUgPSAoKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlKSA9PiBhbnkgfCBQcm9taXNlPGFueT4pO1xuZXhwb3J0IHR5cGUgRmlsdGVyID0gKChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pID0+IGFueSB8IFByb21pc2U8YW55Pik7XG5cbmV4cG9ydCB0eXBlIFJvdXRlRGVmcyA9IHtcbiAgY29udHJvbGxlcjogc3RyaW5nIHwgUm91dGU7XG4gIGZpbHRlcnM/OiAoc3RyaW5nIHwgRmlsdGVyKVtdO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZU1hcCB7XG4gIGdldD86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB8IFJvdXRlIHwgUm91dGVEZWZzIH07XG4gIHBvc3Q/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBwdXQ/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBkZWxldGU/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJSb3V0ZXIge1xuICBhcHA6IGFueTtcbiAgcm91dGVzOiBhbnk7XG4gIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIG9wdGlvbnM6IFJvdXRlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoY29udHJvbGxlcnM6IGFueSwgcm91dGVzOiBSb3V0ZU1hcCwgb3B0aW9uczogUm91dGVyT3B0aW9ucyA9IHsgcGF0aDoge30gfSkge1xuICAgIGlmICghY29udHJvbGxlcnMgJiYgIXJvdXRlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGluaXRpYWxpemUgdGhlIHJvdXRlciB3aXRob3V0IHJvdXRlcyBvciBjb250cm9sbGVyc1wiKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgdGhpcy5vcHRpb25zLnBhdGggPSB0aGlzLm9wdGlvbnMucGF0aCB8fCB7fTtcbiAgICB0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycyA9IHRoaXMub3B0aW9ucy5wYXRoLmNvbnRyb2xsZXJzIHx8IEJBU0VfQ1RSTFNfUEFUSDtcblxuICAgIGNvbnN0IHIgPSByb3V0ZXMgfHwgKHt9IGFzIFJvdXRlTWFwKTtcbiAgICBjb25zdCBjID0gY29udHJvbGxlcnMgfHwge307XG4gICAgY29uc3QgZGVjb3JhdGVkUm91dGVzID0gdGhpcy5kZWNvcmF0ZWRSb3V0ZXMoYyk7XG5cbiAgICB0aGlzLnJvdXRlcyA9IHtcbiAgICAgIGdldDogeyAuLi5kZWNvcmF0ZWRSb3V0ZXMuZ2V0LCAuLi5yLmdldCB9LFxuICAgICAgcG9zdDogeyAuLi5kZWNvcmF0ZWRSb3V0ZXMucG9zdCwgLi4uci5wb3N0IH0sXG4gICAgICBwdXQ6IHsgLi4uZGVjb3JhdGVkUm91dGVzLnB1dCwgLi4uci5wdXQgfSxcbiAgICAgIGRlbGV0ZTogeyAuLi5kZWNvcmF0ZWRSb3V0ZXMuZGVsZXRlLCAuLi5yLmRlbGV0ZSB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGNvbnRyb2xsZXIgbWV0aG9kcyB0byBiZWluZyBib3VuZC5cbiAgICogQHBhcmFtIG1ldGhvZFxuICAgKiBAcGFyYW0gY3RybFxuICAgKiBAcmV0dXJucyB7e319XG4gICAqL1xuICBwcmVwYXJlQ29udHJvbGxlck1ldGhvZHMobWV0aG9kLCBjdHJsKSB7XG4gICAgY29uc3QgZGVjb3JhdGVkUm91dGVzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhjdHJsLnJvdXRlc1ttZXRob2RdIHx8IHt9KS5tYXAoKHJvdXRlOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChjdHJsLmJhc2VGaWx0ZXJzKSB7XG4gICAgICAgIGN0cmwucm91dGVzW21ldGhvZF1bcm91dGVdLmZpbHRlcnMgPSBjdHJsLmJhc2VGaWx0ZXJzLmNvbmNhdChjdHJsLnJvdXRlc1ttZXRob2RdW3JvdXRlXS5maWx0ZXJzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN0cmwuYmFzZVJvdXRlKSB7XG4gICAgICAgIGNvbnN0IGZ1bGxSb3V0ZSA9IHVybGpvaW4oY3RybC5iYXNlUm91dGUsIHJvdXRlKTtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzW2Z1bGxSb3V0ZV0gPSBjdHJsLnJvdXRlc1ttZXRob2RdW3JvdXRlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlY29yYXRlZFJvdXRlc1tyb3V0ZV0gPSBjdHJsLnJvdXRlc1ttZXRob2RdW3JvdXRlXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkZWNvcmF0ZWRSb3V0ZXM7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGUgZGVjb3JhdGVkIHJvdXRlcyBmb3IgYmVpbmcgbWVyZ2VkIGludG8gdGhlIHJvdXRlcyBtYXAuXG4gICAqXG4gICAqIEBwYXJhbSBjb250cm9sbGVycyBUaGUgY29udHJvbGxlcnMgbWFwXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBkZWNvcmF0ZWRSb3V0ZXMoY29udHJvbGxlcnMpIHtcbiAgICBjb25zdCBkZWNvcmF0ZWRSb3V0ZXMgPSB7IGdldDoge30sIHBvc3Q6IHt9LCBwdXQ6IHt9LCBkZWxldGU6IHt9IH07XG5cbiAgICAvLyBQcmVwYXJlIEFQSSByb3V0ZXMgYW5kIGl0cyBjb250cm9sbGVycyBmcm9tIGRlY29yYXRvcnNcbiAgICBPYmplY3Qua2V5cyhjb250cm9sbGVycyB8fCB7fSlcbiAgICAgIC5tYXAobmFtZSA9PiAoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBiYXNlUm91dGU6IGNvbnRyb2xsZXJzW25hbWVdLmJhc2VSb3V0ZSxcbiAgICAgICAgYmFzZUZpbHRlcnM6IGNvbnRyb2xsZXJzW25hbWVdLmJhc2VGaWx0ZXJzLFxuICAgICAgICByb3V0ZXM6IGNvbnRyb2xsZXJzW25hbWVdLnJvdXRlcygpXG4gICAgICB9KSlcbiAgICAgIC5tYXAoKGN0cmw6IGFueSkgPT4ge1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXMuZ2V0ID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5nZXQsXG4gICAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoXCJnZXRcIiwgY3RybClcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLnBvc3QgPSB7XG4gICAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLnBvc3QsXG4gICAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoXCJwb3N0XCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICAgIGRlY29yYXRlZFJvdXRlcy5wdXQgPSB7XG4gICAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLnB1dCxcbiAgICAgICAgICAuLi50aGlzLnByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhcInB1dFwiLCBjdHJsKVxuICAgICAgICB9O1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXMuZGVsZXRlID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5kZWxldGUsXG4gICAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoXCJkZWxldGVcIiwgY3RybClcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlY29yYXRlZFJvdXRlcztcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5yb3V0ZXM7XG4gICAgT2JqZWN0LmtleXMobWFwKS5tYXAobWV0aG9kID0+IHRoaXMuYmluZE1ldGhvZChtZXRob2QsIG1hcFttZXRob2RdKSk7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYWxsIHJvdXRlcyByZWdpc3RlcmVkIGluIHRoZSBtZXRob2Qgc3VwcGxpZWRcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZCBUaGUgaHR0cCBtZXRob2QgdG8gYmluZFxuICAgKiBAcGFyYW0gcm91dGVzIFRoZSByb3V0ZXMgbWFwXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgYmluZE1ldGhvZChtZXRob2QsIHJvdXRlcykge1xuICAgIGZvciAoY29uc3QgciBpbiByb3V0ZXMpIHtcbiAgICAgIGlmIChyb3V0ZXMuaGFzT3duUHJvcGVydHkocikgJiYgcm91dGVzW3JdLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgLy8gRW5zdXJlIGxvZ2dlciBpcyBhdmFpbGFibGVcbiAgICAgICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuc2lsbHkoYFJlZ2lzdGVyaW5nIHNlcnZlciByb3V0ZTogJHttZXRob2QudG9VcHBlckNhc2UoKX0gJHtyfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGNvbnRyb2xsZXIgZnJvbSBtYXBcbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIEpTVW5yZXNvbHZlZFZhcmlhYmxlXG4gICAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbGxlcihyb3V0ZXMsIHIpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgZmlsdGVycyB3cmFwcGVyIGluc3RhbmNlIHRvIHRoZSByb3V0ZXMgbWFwXG4gICAgICAgIGlmIChyb3V0ZXNbcl0uZmlsdGVycyAmJiByb3V0ZXNbcl0uZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBWYWxpZGF0ZSBhbGwgZmlsdGVyc1xuICAgICAgICAgIGlmIChyb3V0ZXNbcl0uZmlsdGVycy5maWx0ZXIoZiA9PiAhZikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmaWx0ZXJzIGZvciByb3V0ZTogXCIgKyBtZXRob2QudG9VcHBlckNhc2UoKSArIFwiIFwiICsgcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVnaXN0ZXIgcm91dGUgd2l0aCBmaWx0ZXJzIGluIGN1cnJlbnQgbWFwIGZvciBiaWRpbmcgdG8gZXhwcmVzc1xuICAgICAgICAgIHRoaXMucm91dGVzW21ldGhvZF1bcl0gPSBGaWx0ZXJzV3JhcHBlci5hcHBseShyb3V0ZXNbcl0uZmlsdGVycywgdGhpcy5vcHRpb25zLnBhdGguZmlsdGVycykuY29uY2F0KFtjdHJsXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVnaXN0ZXIgcm91dGUgaW4gY3VycmVudCBtYXAgZm9yIGJpZGluZyB0byBleHByZXNzXG4gICAgICAgICAgdGhpcy5yb3V0ZXNbbWV0aG9kXVtyXSA9IGN0cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIGNvbnRyb2xsZXIgZGVmaW5lZCBieSB0aGUgcm91dGUgc3VwcGxpZWQuXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZXMgVGhlIHJvdXRlcyBtYXBcbiAgICogQHBhcmFtIHIgVGhlIHJvdXRlIHRvIHJlZ2lzdGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9XG4gICAqL1xuICByZWdpc3RlckNvbnRyb2xsZXIocm91dGVzLCByKSB7XG4gICAgbGV0IGN0cmwgPSByb3V0ZXNbcl0uY29udHJvbGxlcjtcblxuICAgIC8vIENoZWNrIGNvbnRyb2xsZXIgdHlwZVxuICAgIGlmIChjdHJsICYmIHV0aWwuaXNTdHJpbmcoY3RybCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIExvYWQgY29udHJvbGxlciBmcm9tIHBhdGhcbiAgICAgICAgY3RybCA9IHJlcXVpcmUocGF0aC5qb2luKHRoaXMub3B0aW9ucy5wYXRoLmNvbnRyb2xsZXJzLCBjdHJsKSk7XG4gICAgICAgIC8vIEZpeCBmb3IgbW90aCBtb2R1bGVzIHN5c3RlbXMgKGltcG9ydCAvIHJlcXVpcmUpXG4gICAgICAgIGN0cmwgPSBjdHJsLmRlZmF1bHQgfHwgY3RybDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZS5zdGFjayA9IGNsZWFuU3RhY2soZS5zdGFjayk7XG5cbiAgICAgICAgaWYgKGUubWVzc2FnZS5tYXRjaChuZXcgUmVnRXhwKGN0cmwpKSkge1xuICAgICAgICAgIC8vIFRocm93IGEgZGlyZWN0IG1lc3NhZ2Ugd2hlbiBjb250cm9sbGVyIHdhcyBub3QgZm91bmRcbiAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgQ29udHJvbGxlciBub3QgZm91bmQ6ICR7cGF0aC5qb2luKGN0cmxfcGF0aCwgY3RybCl9YCk7XG4gICAgICAgICAgZXJyb3Iuc3RhY2sgPSBlLnN0YWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFVua25vd24gZXJyb3JcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghY3RybCB8fCAhdXRpbC5pc0Z1bmN0aW9uKGN0cmwpKSB7XG4gICAgICAvLyBUaHJvdyBpbnZhbGlkIGNvbnRyb2xsZXIgZXJyb3JcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29udHJvbGxlciBpcyBub3QgdmFsaWQgZm9yIHJvdXRlOiAke3J9YCk7XG4gICAgfVxuICAgIHJldHVybiBjdHJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoZSBjb250cm9sbGVyIHRvIHRoZSBleHByZXNzIGFwcGxpY2F0aW9uIG9yIGNyZWF0ZXMgYSBuZXcgb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb259IFthcHBdIFRoZSBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtleHByZXNzLkFwcGxpY2F0aW9ufVxuICAgKi9cbiAgcmVnaXN0ZXIoYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcbiAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiB0aGlzLnJvdXRlcykge1xuICAgICAgaWYgKHRoaXMucm91dGVzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgZm9yIChjb25zdCByIGluIHRoaXMucm91dGVzW21ldGhvZF0pIHtcbiAgICAgICAgICBpZiAociAmJiB0aGlzLnJvdXRlc1ttZXRob2RdLmhhc093blByb3BlcnR5KHIpKSB7XG4gICAgICAgICAgICB0aGlzLmFwcFttZXRob2RdKHIsIGFzeW5jTWlkZGxld2FyZSh0aGlzLnJvdXRlc1ttZXRob2RdW3JdKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJldHVybiB0aGUgYXBwIGluc3RhbmNlXG4gICAgcmV0dXJuIHRoaXMuYXBwO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgcm91dGVyIHVzaW5nIHRoZSBzdXBwbGllZCByb3V0ZXMgbWFwIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gY29udHJvbGxlcnMgVGhlIG1hcCBvZiBjb250cm9sbGVyIGNsYXNzZXMgdG8gYmluZCB0b1xuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZ30gcm91dGVzIFRoZSBtYXAgb2Ygcm91dGUgZmlsZXMgb3QgYmluZCB0b1xuICAgKlxuICAgKiBAcGFyYW0ge1JvdXRlck9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBidWlsZChjb250cm9sbGVyczogb2JqZWN0IHwgc3RyaW5nLCByb3V0ZXM6IFJvdXRlTWFwIHwgc3RyaW5nLCBvcHRpb25zPzogUm91dGVyT3B0aW9ucykge1xuICAgIGxldCB3cmFwcGVyO1xuXG4gICAgaWYgKHJvdXRlcyAmJiB1dGlsLmlzU3RyaW5nKHJvdXRlcykpIHtcbiAgICAgIHdyYXBwZXIgPSBuZXcgU2VydmVyUm91dGVyKGNvbnRyb2xsZXJzLCByZXF1aXJlKHJvdXRlcyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyID0gbmV3IFNlcnZlclJvdXRlcihjb250cm9sbGVycywgcm91dGVzIGFzIFJvdXRlTWFwLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcHBlci5yZWdpc3RlcihvcHRpb25zID8gb3B0aW9ucy5hcHAgOiB1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=