"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
const express = require("express");
const cleanStack = require("clean-stack");
const async_1 = require("../middlewares/async");
const filter_1 = require("../helpers/filter");
const urljoin = require("url-join");
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
                        console.log(routes[r].filters);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQyxnREFBbUQ7QUFDbkQsOENBQStDO0FBSS9DLG9DQUFvQztBQUVwQywyQ0FBMkM7QUFDM0Msc0RBQXNEO0FBQ3RELE1BQU0sU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBRTdDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBMEJ4RCxNQUFxQixZQUFZO0lBTS9CLFlBQVksV0FBZ0IsRUFBRSxNQUFnQixFQUFFLFVBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNuRixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7UUFFakYsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFLLEVBQWUsQ0FBQztRQUNyQyxNQUFNLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFD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QUFDLENBQUMsQ0FBQyxFQUFFO3dCQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzlEO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELDBCQUEwQjtRQUMxQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQTRCLEVBQUUsTUFBeUIsRUFBRSxPQUF1QjtRQUMzRixJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RTtRQUVELE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRjtBQXpORCwrQkF5TkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBjbGVhblN0YWNrIGZyb20gXCJjbGVhbi1zdGFja1wiO1xuaW1wb3J0IGFzeW5jTWlkZGxld2FyZSBmcm9tIFwiLi4vbWlkZGxld2FyZXMvYXN5bmNcIjtcbmltcG9ydCBGaWx0ZXJzV3JhcHBlciBmcm9tIFwiLi4vaGVscGVycy9maWx0ZXJcIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSBcIndpbnN0b25cIjtcbmltcG9ydCB7IEJhc2VSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uXCI7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tIFwiLi4vaGVscGVycy9yZXNwb25zZVwiO1xuaW1wb3J0ICogYXMgdXJsam9pbiBmcm9tIFwidXJsLWpvaW5cIjtcblxuLy8gVE9ETzogSW5qZWN0IHRoaXMgY29uc3RhbnRzIGZyb20gb3V0c2lkZVxuLy8gUHJlcGFyZSBzdGF0aWMgZnVsbCBwYXRocywgcmVsYXRpdmUgdG8gcHJvamVjdCByb290XG5jb25zdCBjdHJsX3BhdGggPSBcIi4uLy4uLy4uL2FwaS9jb250cm9sbGVyc1wiO1xuXG5jb25zdCBCQVNFX0NUUkxTX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBjdHJsX3BhdGgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlck9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcGF0aDoge1xuICAgIGNvbnRyb2xsZXJzPzogc3RyaW5nO1xuICAgIGZpbHRlcnM/OiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlID0gKChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkgPT4gYW55IHwgUHJvbWlzZTxhbnk+KTtcbmV4cG9ydCB0eXBlIEZpbHRlciA9ICgocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiBhbnkgfCBQcm9taXNlPGFueT4pO1xuXG5leHBvcnQgdHlwZSBSb3V0ZURlZnMgPSB7XG4gIGNvbnRyb2xsZXI6IHN0cmluZyB8IFJvdXRlO1xuICBmaWx0ZXJzPzogKHN0cmluZyB8IEZpbHRlcilbXTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVNYXAge1xuICBnZXQ/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBwb3N0PzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbiAgcHV0PzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbiAgZGVsZXRlPzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyUm91dGVyIHtcbiAgYXBwOiBhbnk7XG4gIHJvdXRlczogYW55O1xuICBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBvcHRpb25zOiBSb3V0ZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXJzOiBhbnksIHJvdXRlczogUm91dGVNYXAsIG9wdGlvbnM6IFJvdXRlck9wdGlvbnMgPSB7IHBhdGg6IHt9IH0pIHtcbiAgICBpZiAoIWNvbnRyb2xsZXJzICYmICFyb3V0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBpbml0aWFsaXplIHRoZSByb3V0ZXIgd2l0aG91dCByb3V0ZXMgb3IgY29udHJvbGxlcnNcIik7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuICAgIHRoaXMub3B0aW9ucy5wYXRoID0gdGhpcy5vcHRpb25zLnBhdGggfHwge307XG4gICAgdGhpcy5vcHRpb25zLnBhdGguY29udHJvbGxlcnMgPSB0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycyB8fCBCQVNFX0NUUkxTX1BBVEg7XG5cbiAgICBjb25zdCByID0gcm91dGVzIHx8ICh7fSBhcyBSb3V0ZU1hcCk7XG4gICAgY29uc3QgYyA9IGNvbnRyb2xsZXJzIHx8IHt9O1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHRoaXMuZGVjb3JhdGVkUm91dGVzKGMpO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSB7XG4gICAgICBnZXQ6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmdldCwgLi4uci5nZXQgfSxcbiAgICAgIHBvc3Q6IHsgLi4uZGVjb3JhdGVkUm91dGVzLnBvc3QsIC4uLnIucG9zdCB9LFxuICAgICAgcHV0OiB7IC4uLmRlY29yYXRlZFJvdXRlcy5wdXQsIC4uLnIucHV0IH0sXG4gICAgICBkZWxldGU6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSwgLi4uci5kZWxldGUgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBjb250cm9sbGVyIG1ldGhvZHMgdG8gYmVpbmcgYm91bmQuXG4gICAqIEBwYXJhbSBtZXRob2RcbiAgICogQHBhcmFtIGN0cmxcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgcHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKG1ldGhvZCwgY3RybCkge1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoY3RybC5yb3V0ZXNbbWV0aG9kXSB8fCB7fSkubWFwKChyb3V0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoY3RybC5iYXNlRmlsdGVycykge1xuICAgICAgICBjdHJsLnJvdXRlc1ttZXRob2RdW3JvdXRlXS5maWx0ZXJzID0gY3RybC5iYXNlRmlsdGVycy5jb25jYXQoY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV0uZmlsdGVycyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdHJsLmJhc2VSb3V0ZSkge1xuICAgICAgICBjb25zdCBmdWxsUm91dGUgPSB1cmxqb2luKGN0cmwuYmFzZVJvdXRlLCByb3V0ZSk7XG4gICAgICAgIGRlY29yYXRlZFJvdXRlc1tmdWxsUm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXNbcm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVjb3JhdGVkUm91dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGRlY29yYXRlZCByb3V0ZXMgZm9yIGJlaW5nIG1lcmdlZCBpbnRvIHRoZSByb3V0ZXMgbWFwLlxuICAgKlxuICAgKiBAcGFyYW0gY29udHJvbGxlcnMgVGhlIGNvbnRyb2xsZXJzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVjb3JhdGVkUm91dGVzKGNvbnRyb2xsZXJzKSB7XG4gICAgY29uc3QgZGVjb3JhdGVkUm91dGVzID0geyBnZXQ6IHt9LCBwb3N0OiB7fSwgcHV0OiB7fSwgZGVsZXRlOiB7fSB9O1xuXG4gICAgLy8gUHJlcGFyZSBBUEkgcm91dGVzIGFuZCBpdHMgY29udHJvbGxlcnMgZnJvbSBkZWNvcmF0b3JzXG4gICAgT2JqZWN0LmtleXMoY29udHJvbGxlcnMgfHwge30pXG4gICAgICAubWFwKG5hbWUgPT4gKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYmFzZVJvdXRlOiBjb250cm9sbGVyc1tuYW1lXS5iYXNlUm91dGUsXG4gICAgICAgIGJhc2VGaWx0ZXJzOiBjb250cm9sbGVyc1tuYW1lXS5iYXNlRmlsdGVycyxcbiAgICAgICAgcm91dGVzOiBjb250cm9sbGVyc1tuYW1lXS5yb3V0ZXMoKVxuICAgICAgfSkpXG4gICAgICAubWFwKChjdHJsOiBhbnkpID0+IHtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLmdldCA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMuZ2V0LFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwiZ2V0XCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICAgIGRlY29yYXRlZFJvdXRlcy5wb3N0ID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5wb3N0LFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwicG9zdFwiLCBjdHJsKVxuICAgICAgICB9O1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXMucHV0ID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5wdXQsXG4gICAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoXCJwdXRcIiwgY3RybClcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMuZGVsZXRlLFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwiZGVsZXRlXCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHJldHVybiBkZWNvcmF0ZWRSb3V0ZXM7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMucm91dGVzO1xuICAgIE9iamVjdC5rZXlzKG1hcCkubWFwKG1ldGhvZCA9PiB0aGlzLmJpbmRNZXRob2QobWV0aG9kLCBtYXBbbWV0aG9kXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFsbCByb3V0ZXMgcmVnaXN0ZXJlZCBpbiB0aGUgbWV0aG9kIHN1cHBsaWVkXG4gICAqXG4gICAqIEBwYXJhbSBtZXRob2QgVGhlIGh0dHAgbWV0aG9kIHRvIGJpbmRcbiAgICogQHBhcmFtIHJvdXRlcyBUaGUgcm91dGVzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGJpbmRNZXRob2QobWV0aG9kLCByb3V0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IHIgaW4gcm91dGVzKSB7XG4gICAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHIpICYmIHJvdXRlc1tyXS5jb250cm9sbGVyKSB7XG4gICAgICAgIC8vIEVuc3VyZSBsb2dnZXIgaXMgYXZhaWxhYmxlXG4gICAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBSZWdpc3RlcmluZyBzZXJ2ZXIgcm91dGU6ICR7bWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBjb250cm9sbGVyIGZyb20gbWFwXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuICAgICAgICBjb25zdCBjdHJsID0gdGhpcy5yZWdpc3RlckNvbnRyb2xsZXIocm91dGVzLCByKTtcblxuICAgICAgICAvLyBBZGQgdGhlIGZpbHRlcnMgd3JhcHBlciBpbnN0YW5jZSB0byB0aGUgcm91dGVzIG1hcFxuICAgICAgICBpZiAocm91dGVzW3JdLmZpbHRlcnMgJiYgcm91dGVzW3JdLmZpbHRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gVmFsaWRhdGUgYWxsIGZpbHRlcnNcbiAgICAgICAgICBpZiAocm91dGVzW3JdLmZpbHRlcnMuZmlsdGVyKGYgPT4gIWYpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvdXRlc1tyXS5maWx0ZXJzKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZmlsdGVycyBmb3Igcm91dGU6IFwiICsgbWV0aG9kLnRvVXBwZXJDYXNlKCkgKyBcIiBcIiArIHIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFJlZ2lzdGVyIHJvdXRlIHdpdGggZmlsdGVycyBpbiBjdXJyZW50IG1hcCBmb3IgYmlkaW5nIHRvIGV4cHJlc3NcbiAgICAgICAgICB0aGlzLnJvdXRlc1ttZXRob2RdW3JdID0gRmlsdGVyc1dyYXBwZXIuYXBwbHkocm91dGVzW3JdLmZpbHRlcnMsIHRoaXMub3B0aW9ucy5wYXRoLmZpbHRlcnMpLmNvbmNhdChbY3RybF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlZ2lzdGVyIHJvdXRlIGluIGN1cnJlbnQgbWFwIGZvciBiaWRpbmcgdG8gZXhwcmVzc1xuICAgICAgICAgIHRoaXMucm91dGVzW21ldGhvZF1bcl0gPSBjdHJsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHRoZSBjb250cm9sbGVyIGRlZmluZWQgYnkgdGhlIHJvdXRlIHN1cHBsaWVkLlxuICAgKlxuICAgKiBAcGFyYW0gcm91dGVzIFRoZSByb3V0ZXMgbWFwXG4gICAqIEBwYXJhbSByIFRoZSByb3V0ZSB0byByZWdpc3RlclxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgcmVnaXN0ZXJDb250cm9sbGVyKHJvdXRlcywgcikge1xuICAgIGxldCBjdHJsID0gcm91dGVzW3JdLmNvbnRyb2xsZXI7XG5cbiAgICAvLyBDaGVjayBjb250cm9sbGVyIHR5cGVcbiAgICBpZiAoY3RybCAmJiB1dGlsLmlzU3RyaW5nKGN0cmwpKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBMb2FkIGNvbnRyb2xsZXIgZnJvbSBwYXRoXG4gICAgICAgIGN0cmwgPSByZXF1aXJlKHBhdGguam9pbih0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycywgY3RybCkpO1xuICAgICAgICAvLyBGaXggZm9yIG1vdGggbW9kdWxlcyBzeXN0ZW1zIChpbXBvcnQgLyByZXF1aXJlKVxuICAgICAgICBjdHJsID0gY3RybC5kZWZhdWx0IHx8IGN0cmw7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGUuc3RhY2sgPSBjbGVhblN0YWNrKGUuc3RhY2spO1xuXG4gICAgICAgIGlmIChlLm1lc3NhZ2UubWF0Y2gobmV3IFJlZ0V4cChjdHJsKSkpIHtcbiAgICAgICAgICAvLyBUaHJvdyBhIGRpcmVjdCBtZXNzYWdlIHdoZW4gY29udHJvbGxlciB3YXMgbm90IGZvdW5kXG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYENvbnRyb2xsZXIgbm90IGZvdW5kOiAke3BhdGguam9pbihjdHJsX3BhdGgsIGN0cmwpfWApO1xuICAgICAgICAgIGVycm9yLnN0YWNrID0gZS5zdGFjaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBVbmtub3duIGVycm9yXG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWN0cmwgfHwgIXV0aWwuaXNGdW5jdGlvbihjdHJsKSkge1xuICAgICAgLy8gVGhyb3cgaW52YWxpZCBjb250cm9sbGVyIGVycm9yXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbnRyb2xsZXIgaXMgbm90IHZhbGlkIGZvciByb3V0ZTogJHtyfWApO1xuICAgIH1cbiAgICByZXR1cm4gY3RybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyB0aGUgY29udHJvbGxlciB0byB0aGUgZXhwcmVzcyBhcHBsaWNhdGlvbiBvciBjcmVhdGVzIGEgbmV3IG9uZS5cbiAgICpcbiAgICogQHBhcmFtIHtleHByZXNzLkFwcGxpY2F0aW9ufSBbYXBwXSBUaGUgZXhwcmVzcyBhcHBsaWNhdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7ZXhwcmVzcy5BcHBsaWNhdGlvbn1cbiAgICovXG4gIHJlZ2lzdGVyKGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb24pIHtcbiAgICB0aGlzLmFwcCA9IGFwcCB8fCBleHByZXNzKCk7XG4gICAgZm9yIChjb25zdCBtZXRob2QgaW4gdGhpcy5yb3V0ZXMpIHtcbiAgICAgIGlmICh0aGlzLnJvdXRlcy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgIGZvciAoY29uc3QgciBpbiB0aGlzLnJvdXRlc1ttZXRob2RdKSB7XG4gICAgICAgICAgaWYgKHIgJiYgdGhpcy5yb3V0ZXNbbWV0aG9kXS5oYXNPd25Qcm9wZXJ0eShyKSkge1xuICAgICAgICAgICAgdGhpcy5hcHBbbWV0aG9kXShyLCBhc3luY01pZGRsZXdhcmUodGhpcy5yb3V0ZXNbbWV0aG9kXVtyXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gdGhlIGFwcCBpbnN0YW5jZVxuICAgIHJldHVybiB0aGlzLmFwcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIHJvdXRlciB1c2luZyB0aGUgc3VwcGxpZWQgcm91dGVzIG1hcCBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IGNvbnRyb2xsZXJzIFRoZSBtYXAgb2YgY29udHJvbGxlciBjbGFzc2VzIHRvIGJpbmQgdG9cbiAgICogQHBhcmFtIHtPYmplY3QgfCBzdHJpbmd9IHJvdXRlcyBUaGUgbWFwIG9mIHJvdXRlIGZpbGVzIG90IGJpbmQgdG9cbiAgICpcbiAgICogQHBhcmFtIHtSb3V0ZXJPcHRpb25zfSBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgYnVpbGQoY29udHJvbGxlcnM6IG9iamVjdCB8IHN0cmluZywgcm91dGVzOiBSb3V0ZU1hcCB8IHN0cmluZywgb3B0aW9ucz86IFJvdXRlck9wdGlvbnMpIHtcbiAgICBsZXQgd3JhcHBlcjtcblxuICAgIGlmIChyb3V0ZXMgJiYgdXRpbC5pc1N0cmluZyhyb3V0ZXMpKSB7XG4gICAgICB3cmFwcGVyID0gbmV3IFNlcnZlclJvdXRlcihjb250cm9sbGVycywgcmVxdWlyZShyb3V0ZXMpLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlciA9IG5ldyBTZXJ2ZXJSb3V0ZXIoY29udHJvbGxlcnMsIHJvdXRlcyBhcyBSb3V0ZU1hcCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBwZXIucmVnaXN0ZXIob3B0aW9ucyA/IG9wdGlvbnMuYXBwIDogdW5kZWZpbmVkKTtcbiAgfVxufVxuIl19