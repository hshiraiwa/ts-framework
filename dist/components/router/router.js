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
            get: Object.assign(Object.assign({}, decoratedRoutes.get), r.get),
            post: Object.assign(Object.assign({}, decoratedRoutes.post), r.post),
            put: Object.assign(Object.assign({}, decoratedRoutes.put), r.put),
            delete: Object.assign(Object.assign({}, decoratedRoutes.delete), r.delete)
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
            decoratedRoutes.get = Object.assign(Object.assign({}, decoratedRoutes.get), this.prepareControllerMethods("get", ctrl));
            decoratedRoutes.post = Object.assign(Object.assign({}, decoratedRoutes.post), this.prepareControllerMethods("post", ctrl));
            decoratedRoutes.put = Object.assign(Object.assign({}, decoratedRoutes.put), this.prepareControllerMethods("put", ctrl));
            decoratedRoutes.delete = Object.assign(Object.assign({}, decoratedRoutes.delete), this.prepareControllerMethods("delete", ctrl));
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
        else if (ctrl.target && ctrl.key) {
            // Bind to a specfic key in the target
            return ctrl.target[ctrl.key].bind(ctrl.target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBRTdCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFFN0IsOENBQStDO0FBRS9DLGdEQUFtRDtBQUduRCwyQ0FBMkM7QUFDM0Msc0RBQXNEO0FBQ3RELE1BQU0sU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBRTdDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBMEJ4RCxNQUFxQixZQUFZO0lBTS9CLFlBQVksV0FBZ0IsRUFBRSxNQUFnQixFQUFFLFVBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNuRixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7UUFFakYsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFLLEVBQWUsQ0FBQztRQUNyQyxNQUFNLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFD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QyxNQUFNLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0QsMEJBQTBCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBNEIsRUFBRSxNQUF5QixFQUFFLE9BQXVCO1FBQzNGLElBQUksT0FBTyxDQUFDO1FBRVosSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuRTthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBMU5ELCtCQTBOQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsZWFuU3RhY2sgZnJvbSBcImNsZWFuLXN0YWNrXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgKiBhcyB1cmxqb2luIGZyb20gXCJ1cmwtam9pblwiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi5cIjtcbmltcG9ydCBGaWx0ZXJzV3JhcHBlciBmcm9tIFwiLi4vaGVscGVycy9maWx0ZXJcIjtcbmltcG9ydCB7IEJhc2VSZXNwb25zZSB9IGZyb20gXCIuLi9oZWxwZXJzL3Jlc3BvbnNlXCI7XG5pbXBvcnQgYXN5bmNNaWRkbGV3YXJlIGZyb20gXCIuLi9taWRkbGV3YXJlcy9hc3luY1wiO1xuaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbi8vIFRPRE86IEluamVjdCB0aGlzIGNvbnN0YW50cyBmcm9tIG91dHNpZGVcbi8vIFByZXBhcmUgc3RhdGljIGZ1bGwgcGF0aHMsIHJlbGF0aXZlIHRvIHByb2plY3Qgcm9vdFxuY29uc3QgY3RybF9wYXRoID0gXCIuLi8uLi8uLi9hcGkvY29udHJvbGxlcnNcIjtcblxuY29uc3QgQkFTRV9DVFJMU19QQVRIID0gcGF0aC5qb2luKF9fZGlybmFtZSwgY3RybF9wYXRoKTtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHBhdGg6IHtcbiAgICBjb250cm9sbGVycz86IHN0cmluZztcbiAgICBmaWx0ZXJzPzogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZSA9ICgocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpID0+IGFueSB8IFByb21pc2U8YW55Pik7XG5leHBvcnQgdHlwZSBGaWx0ZXIgPSAoKHJlcTogQmFzZVJlcXVlc3QsIHJlczogQmFzZVJlc3BvbnNlLCBuZXh0OiBGdW5jdGlvbikgPT4gYW55IHwgUHJvbWlzZTxhbnk+KTtcblxuZXhwb3J0IHR5cGUgUm91dGVEZWZzID0ge1xuICBjb250cm9sbGVyOiBzdHJpbmcgfCBSb3V0ZTtcbiAgZmlsdGVycz86IChzdHJpbmcgfCBGaWx0ZXIpW107XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlTWFwIHtcbiAgZ2V0PzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbiAgcG9zdD86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB8IFJvdXRlIHwgUm91dGVEZWZzIH07XG4gIHB1dD86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB8IFJvdXRlIHwgUm91dGVEZWZzIH07XG4gIGRlbGV0ZT86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB8IFJvdXRlIHwgUm91dGVEZWZzIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlclJvdXRlciB7XG4gIGFwcDogYW55O1xuICByb3V0ZXM6IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgb3B0aW9uczogUm91dGVyT3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyczogYW55LCByb3V0ZXM6IFJvdXRlTWFwLCBvcHRpb25zOiBSb3V0ZXJPcHRpb25zID0geyBwYXRoOiB7fSB9KSB7XG4gICAgaWYgKCFjb250cm9sbGVycyAmJiAhcm91dGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgaW5pdGlhbGl6ZSB0aGUgcm91dGVyIHdpdGhvdXQgcm91dGVzIG9yIGNvbnRyb2xsZXJzXCIpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlcjtcbiAgICB0aGlzLm9wdGlvbnMucGF0aCA9IHRoaXMub3B0aW9ucy5wYXRoIHx8IHt9O1xuICAgIHRoaXMub3B0aW9ucy5wYXRoLmNvbnRyb2xsZXJzID0gdGhpcy5vcHRpb25zLnBhdGguY29udHJvbGxlcnMgfHwgQkFTRV9DVFJMU19QQVRIO1xuXG4gICAgY29uc3QgciA9IHJvdXRlcyB8fCAoe30gYXMgUm91dGVNYXApO1xuICAgIGNvbnN0IGMgPSBjb250cm9sbGVycyB8fCB7fTtcbiAgICBjb25zdCBkZWNvcmF0ZWRSb3V0ZXMgPSB0aGlzLmRlY29yYXRlZFJvdXRlcyhjKTtcblxuICAgIHRoaXMucm91dGVzID0ge1xuICAgICAgZ2V0OiB7IC4uLmRlY29yYXRlZFJvdXRlcy5nZXQsIC4uLnIuZ2V0IH0sXG4gICAgICBwb3N0OiB7IC4uLmRlY29yYXRlZFJvdXRlcy5wb3N0LCAuLi5yLnBvc3QgfSxcbiAgICAgIHB1dDogeyAuLi5kZWNvcmF0ZWRSb3V0ZXMucHV0LCAuLi5yLnB1dCB9LFxuICAgICAgZGVsZXRlOiB7IC4uLmRlY29yYXRlZFJvdXRlcy5kZWxldGUsIC4uLnIuZGVsZXRlIH1cbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGUgY29udHJvbGxlciBtZXRob2RzIHRvIGJlaW5nIGJvdW5kLlxuICAgKiBAcGFyYW0gbWV0aG9kXG4gICAqIEBwYXJhbSBjdHJsXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIHByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhtZXRob2Q6IHN0cmluZywgY3RybDogQmFzZUNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBkZWNvcmF0ZWRSb3V0ZXMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKGN0cmwucm91dGVzW21ldGhvZF0gfHwge30pLm1hcCgocm91dGU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGN0cmwuYmFzZUZpbHRlcnMpIHtcbiAgICAgICAgY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV0uZmlsdGVycyA9IGN0cmwuYmFzZUZpbHRlcnMuY29uY2F0KGN0cmwucm91dGVzW21ldGhvZF1bcm91dGVdLmZpbHRlcnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3RybC5iYXNlUm91dGUpIHtcbiAgICAgICAgY29uc3QgZnVsbFJvdXRlID0gdXJsam9pbihjdHJsLmJhc2VSb3V0ZSwgcm91dGUpO1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXNbZnVsbFJvdXRlXSA9IGN0cmwucm91dGVzW21ldGhvZF1bcm91dGVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzW3JvdXRlXSA9IGN0cmwucm91dGVzW21ldGhvZF1bcm91dGVdO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlY29yYXRlZFJvdXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBkZWNvcmF0ZWQgcm91dGVzIGZvciBiZWluZyBtZXJnZWQgaW50byB0aGUgcm91dGVzIG1hcC5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRyb2xsZXJzIFRoZSBjb250cm9sbGVycyBtYXBcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGRlY29yYXRlZFJvdXRlcyhjb250cm9sbGVycykge1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHsgZ2V0OiB7fSwgcG9zdDoge30sIHB1dDoge30sIGRlbGV0ZToge30gfTtcblxuICAgIC8vIFByZXBhcmUgQVBJIHJvdXRlcyBhbmQgaXRzIGNvbnRyb2xsZXJzIGZyb20gZGVjb3JhdG9yc1xuICAgIE9iamVjdC5rZXlzKGNvbnRyb2xsZXJzIHx8IHt9KVxuICAgICAgLm1hcChuYW1lID0+ICh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGJhc2VSb3V0ZTogY29udHJvbGxlcnNbbmFtZV0uYmFzZVJvdXRlLFxuICAgICAgICBiYXNlRmlsdGVyczogY29udHJvbGxlcnNbbmFtZV0uYmFzZUZpbHRlcnMsXG4gICAgICAgIHJvdXRlczogY29udHJvbGxlcnNbbmFtZV0ucm91dGVzKClcbiAgICAgIH0pKVxuICAgICAgLm1hcCgoY3RybDogYW55KSA9PiB7XG4gICAgICAgIGRlY29yYXRlZFJvdXRlcy5nZXQgPSB7XG4gICAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLmdldCxcbiAgICAgICAgICAuLi50aGlzLnByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhcImdldFwiLCBjdHJsKVxuICAgICAgICB9O1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXMucG9zdCA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMucG9zdCxcbiAgICAgICAgICAuLi50aGlzLnByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhcInBvc3RcIiwgY3RybClcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLnB1dCA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMucHV0LFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwicHV0XCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICAgIGRlY29yYXRlZFJvdXRlcy5kZWxldGUgPSB7XG4gICAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSxcbiAgICAgICAgICAuLi50aGlzLnByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhcImRlbGV0ZVwiLCBjdHJsKVxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gZGVjb3JhdGVkUm91dGVzO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLnJvdXRlcztcbiAgICBPYmplY3Qua2V5cyhtYXApLm1hcChtZXRob2QgPT4gdGhpcy5iaW5kTWV0aG9kKG1ldGhvZCwgbWFwW21ldGhvZF0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBhbGwgcm91dGVzIHJlZ2lzdGVyZWQgaW4gdGhlIG1ldGhvZCBzdXBwbGllZFxuICAgKlxuICAgKiBAcGFyYW0gbWV0aG9kIFRoZSBodHRwIG1ldGhvZCB0byBiaW5kXG4gICAqIEBwYXJhbSByb3V0ZXMgVGhlIHJvdXRlcyBtYXBcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBiaW5kTWV0aG9kKG1ldGhvZCwgcm91dGVzKSB7XG4gICAgZm9yIChjb25zdCByIGluIHJvdXRlcykge1xuICAgICAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShyKSAmJiByb3V0ZXNbcl0uY29udHJvbGxlcikge1xuICAgICAgICAvLyBFbnN1cmUgbG9nZ2VyIGlzIGF2YWlsYWJsZVxuICAgICAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5zaWxseShgUmVnaXN0ZXJpbmcgc2VydmVyIHJvdXRlOiAke21ldGhvZC50b1VwcGVyQ2FzZSgpfSAke3J9YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgY29udHJvbGxlciBmcm9tIG1hcFxuICAgICAgICBjb25zdCBjdHJsID0gdGhpcy5yZWdpc3RlckNvbnRyb2xsZXIocm91dGVzLCByKTtcblxuICAgICAgICAvLyBBZGQgdGhlIGZpbHRlcnMgd3JhcHBlciBpbnN0YW5jZSB0byB0aGUgcm91dGVzIG1hcFxuICAgICAgICBpZiAocm91dGVzW3JdLmZpbHRlcnMgJiYgcm91dGVzW3JdLmZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gVmFsaWRhdGUgYWxsIGZpbHRlcnNcbiAgICAgICAgICBpZiAocm91dGVzW3JdLmZpbHRlcnMuZmlsdGVyKGYgPT4gIWYpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZmlsdGVycyBmb3Igcm91dGU6IFwiICsgbWV0aG9kLnRvVXBwZXJDYXNlKCkgKyBcIiBcIiArIHIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlZ2lzdGVyIHJvdXRlIHdpdGggZmlsdGVycyBpbiBjdXJyZW50IG1hcCBmb3IgYmlkaW5nIHRvIGV4cHJlc3NcbiAgICAgICAgICB0aGlzLnJvdXRlc1ttZXRob2RdW3JdID0gRmlsdGVyc1dyYXBwZXIuYXBwbHkocm91dGVzW3JdLmZpbHRlcnMsIHRoaXMub3B0aW9ucy5wYXRoLmZpbHRlcnMpLmNvbmNhdChbY3RybF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlZ2lzdGVyIHJvdXRlIGluIGN1cnJlbnQgbWFwIGZvciBiaWRpbmcgdG8gZXhwcmVzc1xuICAgICAgICAgIHRoaXMucm91dGVzW21ldGhvZF1bcl0gPSBjdHJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHRoZSBjb250cm9sbGVyIGRlZmluZWQgYnkgdGhlIHJvdXRlIHN1cHBsaWVkLlxuICAgKlxuICAgKiBAcGFyYW0gcm91dGVzIFRoZSByb3V0ZXMgbWFwXG4gICAqIEBwYXJhbSByIFRoZSByb3V0ZSB0byByZWdpc3RlclxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgcmVnaXN0ZXJDb250cm9sbGVyKHJvdXRlcywgcikge1xuICAgIGxldCBjdHJsID0gcm91dGVzW3JdLmNvbnRyb2xsZXI7XG5cbiAgICAvLyBDaGVjayBjb250cm9sbGVyIHR5cGVcbiAgICBpZiAoY3RybCAmJiB1dGlsLmlzU3RyaW5nKGN0cmwpKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBMb2FkIGNvbnRyb2xsZXIgZnJvbSBwYXRoXG4gICAgICAgIGN0cmwgPSByZXF1aXJlKHBhdGguam9pbih0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycywgY3RybCkpO1xuICAgICAgICAvLyBGaXggZm9yIG1vdGggbW9kdWxlcyBzeXN0ZW1zIChpbXBvcnQgLyByZXF1aXJlKVxuICAgICAgICBjdHJsID0gY3RybC5kZWZhdWx0IHx8IGN0cmw7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGUuc3RhY2sgPSBjbGVhblN0YWNrKGUuc3RhY2spO1xuXG4gICAgICAgIGlmIChlLm1lc3NhZ2UubWF0Y2gobmV3IFJlZ0V4cChjdHJsKSkpIHtcbiAgICAgICAgICAvLyBUaHJvdyBhIGRpcmVjdCBtZXNzYWdlIHdoZW4gY29udHJvbGxlciB3YXMgbm90IGZvdW5kXG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYENvbnRyb2xsZXIgbm90IGZvdW5kOiAke3BhdGguam9pbihjdHJsX3BhdGgsIGN0cmwpfWApO1xuICAgICAgICAgIGVycm9yLnN0YWNrID0gZS5zdGFjaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBVbmtub3duIGVycm9yXG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3RybC50YXJnZXQgJiYgY3RybC5rZXkpIHtcbiAgICAgIC8vIEJpbmQgdG8gYSBzcGVjZmljIGtleSBpbiB0aGUgdGFyZ2V0XG4gICAgICByZXR1cm4gY3RybC50YXJnZXRbY3RybC5rZXldLmJpbmQoY3RybC50YXJnZXQpO1xuICAgIH0gZWxzZSBpZiAoIWN0cmwgfHwgIXV0aWwuaXNGdW5jdGlvbihjdHJsKSkge1xuICAgICAgLy8gVGhyb3cgaW52YWxpZCBjb250cm9sbGVyIGVycm9yXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbnRyb2xsZXIgaXMgbm90IHZhbGlkIGZvciByb3V0ZTogJHtyfWApO1xuICAgIH1cbiAgICByZXR1cm4gY3RybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyB0aGUgY29udHJvbGxlciB0byB0aGUgZXhwcmVzcyBhcHBsaWNhdGlvbiBvciBjcmVhdGVzIGEgbmV3IG9uZS5cbiAgICpcbiAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9ufSBbYXBwXSBUaGUgZXhwcmVzcyBhcHBsaWNhdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7ZXhwcmVzcy5BcHBsaWNhdGlvbn1cbiAgICovXG4gIHJlZ2lzdGVyKGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgZm9yIChjb25zdCBtZXRob2QgaW4gdGhpcy5yb3V0ZXMpIHtcbiAgICAgIGlmICh0aGlzLnJvdXRlcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgIGZvciAoY29uc3QgciBpbiB0aGlzLnJvdXRlc1ttZXRob2RdKSB7XG4gICAgICAgICAgaWYgKHIgJiYgdGhpcy5yb3V0ZXNbbWV0aG9kXS5oYXNPd25Qcm9wZXJ0eShyKSkge1xuICAgICAgICAgICAgdGhpcy5hcHBbbWV0aG9kXShyLCBhc3luY01pZGRsZXdhcmUodGhpcy5yb3V0ZXNbbWV0aG9kXVtyXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gdGhlIGFwcCBpbnN0YW5jZVxuICAgIHJldHVybiB0aGlzLmFwcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIHJvdXRlciB1c2luZyB0aGUgc3VwcGxpZWQgcm91dGVzIG1hcCBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IGNvbnRyb2xsZXJzIFRoZSBtYXAgb2YgY29udHJvbGxlciBjbGFzc2VzIHRvIGJpbmQgdG9cbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IHJvdXRlcyBUaGUgbWFwIG9mIHJvdXRlIGZpbGVzIG90IGJpbmQgdG9cbiAgICpcbiAgICogQHBhcmFtIHtSb3V0ZXJPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgYnVpbGQoY29udHJvbGxlcnM6IG9iamVjdCB8IHN0cmluZywgcm91dGVzOiBSb3V0ZU1hcCB8IHN0cmluZywgb3B0aW9ucz86IFJvdXRlck9wdGlvbnMpIHtcbiAgICBsZXQgd3JhcHBlcjtcblxuICAgIGlmIChyb3V0ZXMgJiYgdXRpbC5pc1N0cmluZyhyb3V0ZXMpKSB7XG4gICAgICB3cmFwcGVyID0gbmV3IFNlcnZlclJvdXRlcihjb250cm9sbGVycywgcmVxdWlyZShyb3V0ZXMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlciA9IG5ldyBTZXJ2ZXJSb3V0ZXIoY29udHJvbGxlcnMsIHJvdXRlcyBhcyBSb3V0ZU1hcCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBwZXIucmVnaXN0ZXIob3B0aW9ucyA/IG9wdGlvbnMuYXBwIDogdW5kZWZpbmVkKTtcbiAgfVxufVxuIl19