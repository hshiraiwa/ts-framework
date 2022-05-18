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
                        this.app[method](r, async_1.default(method, r, this.routes[method][r]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBRTdCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFFN0IsOENBQStDO0FBRS9DLGdEQUFtRDtBQUduRCwyQ0FBMkM7QUFDM0Msc0RBQXNEO0FBQ3RELE1BQU0sU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBRTdDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBMEJ4RCxNQUFxQixZQUFZO0lBTS9CLFlBQVksV0FBZ0IsRUFBRSxNQUFnQixFQUFFLFVBQXlCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNuRixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNsRjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxlQUFlLENBQUM7UUFFakYsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFLLEVBQWUsQ0FBQztRQUNyQyxNQUFNLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQzVCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFD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QyxNQUFNLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN6RTtpQkFDRjthQUNGO1NBQ0Y7UUFDRCwwQkFBMEI7UUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUE0QixFQUFFLE1BQXlCLEVBQUUsT0FBdUI7UUFDM0YsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUExTkQsK0JBME5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2xlYW5TdGFjayBmcm9tIFwiY2xlYW4tc3RhY2tcIjtcbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSBcInRzLWZyYW1ld29yay1jb21tb25cIjtcbmltcG9ydCAqIGFzIHVybGpvaW4gZnJvbSBcInVybC1qb2luXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQgeyBCYXNlUmVxdWVzdCB9IGZyb20gXCIuLi8uLlwiO1xuaW1wb3J0IEZpbHRlcnNXcmFwcGVyIGZyb20gXCIuLi9oZWxwZXJzL2ZpbHRlclwiO1xuaW1wb3J0IHsgQmFzZVJlc3BvbnNlIH0gZnJvbSBcIi4uL2hlbHBlcnMvcmVzcG9uc2VcIjtcbmltcG9ydCBhc3luY01pZGRsZXdhcmUgZnJvbSBcIi4uL21pZGRsZXdhcmVzL2FzeW5jXCI7XG5pbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuLy8gVE9ETzogSW5qZWN0IHRoaXMgY29uc3RhbnRzIGZyb20gb3V0c2lkZVxuLy8gUHJlcGFyZSBzdGF0aWMgZnVsbCBwYXRocywgcmVsYXRpdmUgdG8gcHJvamVjdCByb290XG5jb25zdCBjdHJsX3BhdGggPSBcIi4uLy4uLy4uL2FwaS9jb250cm9sbGVyc1wiO1xuXG5jb25zdCBCQVNFX0NUUkxTX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBjdHJsX3BhdGgpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlck9wdGlvbnMge1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcbiAgYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcGF0aDoge1xuICAgIGNvbnRyb2xsZXJzPzogc3RyaW5nO1xuICAgIGZpbHRlcnM/OiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlID0gKChyZXE6IEJhc2VSZXF1ZXN0LCByZXM6IEJhc2VSZXNwb25zZSkgPT4gYW55IHwgUHJvbWlzZTxhbnk+KTtcbmV4cG9ydCB0eXBlIEZpbHRlciA9ICgocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiBhbnkgfCBQcm9taXNlPGFueT4pO1xuXG5leHBvcnQgdHlwZSBSb3V0ZURlZnMgPSB7XG4gIGNvbnRyb2xsZXI6IHN0cmluZyB8IFJvdXRlO1xuICBmaWx0ZXJzPzogKHN0cmluZyB8IEZpbHRlcilbXTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVNYXAge1xuICBnZXQ/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBwb3N0PzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbiAgcHV0PzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbiAgZGVsZXRlPzogeyBbcGF0aDogc3RyaW5nXTogc3RyaW5nIHwgUm91dGUgfCBSb3V0ZURlZnMgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyUm91dGVyIHtcbiAgYXBwOiBhbnk7XG4gIHJvdXRlczogYW55O1xuICBsb2dnZXI6IExvZ2dlckluc3RhbmNlO1xuICBvcHRpb25zOiBSb3V0ZXJPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXJzOiBhbnksIHJvdXRlczogUm91dGVNYXAsIG9wdGlvbnM6IFJvdXRlck9wdGlvbnMgPSB7IHBhdGg6IHt9IH0pIHtcbiAgICBpZiAoIWNvbnRyb2xsZXJzICYmICFyb3V0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBpbml0aWFsaXplIHRoZSByb3V0ZXIgd2l0aG91dCByb3V0ZXMgb3IgY29udHJvbGxlcnNcIik7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuICAgIHRoaXMub3B0aW9ucy5wYXRoID0gdGhpcy5vcHRpb25zLnBhdGggfHwge307XG4gICAgdGhpcy5vcHRpb25zLnBhdGguY29udHJvbGxlcnMgPSB0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycyB8fCBCQVNFX0NUUkxTX1BBVEg7XG5cbiAgICBjb25zdCByID0gcm91dGVzIHx8ICh7fSBhcyBSb3V0ZU1hcCk7XG4gICAgY29uc3QgYyA9IGNvbnRyb2xsZXJzIHx8IHt9O1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHRoaXMuZGVjb3JhdGVkUm91dGVzKGMpO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSB7XG4gICAgICBnZXQ6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmdldCwgLi4uci5nZXQgfSxcbiAgICAgIHBvc3Q6IHsgLi4uZGVjb3JhdGVkUm91dGVzLnBvc3QsIC4uLnIucG9zdCB9LFxuICAgICAgcHV0OiB7IC4uLmRlY29yYXRlZFJvdXRlcy5wdXQsIC4uLnIucHV0IH0sXG4gICAgICBkZWxldGU6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSwgLi4uci5kZWxldGUgfVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBjb250cm9sbGVyIG1ldGhvZHMgdG8gYmVpbmcgYm91bmQuXG4gICAqIEBwYXJhbSBtZXRob2RcbiAgICogQHBhcmFtIGN0cmxcbiAgICogQHJldHVybnMge3t9fVxuICAgKi9cbiAgcHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKG1ldGhvZDogc3RyaW5nLCBjdHJsOiBCYXNlQ29udHJvbGxlcikge1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoY3RybC5yb3V0ZXNbbWV0aG9kXSB8fCB7fSkubWFwKChyb3V0ZTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoY3RybC5iYXNlRmlsdGVycykge1xuICAgICAgICBjdHJsLnJvdXRlc1ttZXRob2RdW3JvdXRlXS5maWx0ZXJzID0gY3RybC5iYXNlRmlsdGVycy5jb25jYXQoY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV0uZmlsdGVycyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdHJsLmJhc2VSb3V0ZSkge1xuICAgICAgICBjb25zdCBmdWxsUm91dGUgPSB1cmxqb2luKGN0cmwuYmFzZVJvdXRlLCByb3V0ZSk7XG4gICAgICAgIGRlY29yYXRlZFJvdXRlc1tmdWxsUm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXNbcm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVjb3JhdGVkUm91dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGRlY29yYXRlZCByb3V0ZXMgZm9yIGJlaW5nIG1lcmdlZCBpbnRvIHRoZSByb3V0ZXMgbWFwLlxuICAgKlxuICAgKiBAcGFyYW0gY29udHJvbGxlcnMgVGhlIGNvbnRyb2xsZXJzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVjb3JhdGVkUm91dGVzKGNvbnRyb2xsZXJzKSB7XG4gICAgY29uc3QgZGVjb3JhdGVkUm91dGVzID0geyBnZXQ6IHt9LCBwb3N0OiB7fSwgcHV0OiB7fSwgZGVsZXRlOiB7fSB9O1xuXG4gICAgLy8gUHJlcGFyZSBBUEkgcm91dGVzIGFuZCBpdHMgY29udHJvbGxlcnMgZnJvbSBkZWNvcmF0b3JzXG4gICAgT2JqZWN0LmtleXMoY29udHJvbGxlcnMgfHwge30pXG4gICAgICAubWFwKG5hbWUgPT4gKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgYmFzZVJvdXRlOiBjb250cm9sbGVyc1tuYW1lXS5iYXNlUm91dGUsXG4gICAgICAgIGJhc2VGaWx0ZXJzOiBjb250cm9sbGVyc1tuYW1lXS5iYXNlRmlsdGVycyxcbiAgICAgICAgcm91dGVzOiBjb250cm9sbGVyc1tuYW1lXS5yb3V0ZXMoKVxuICAgICAgfSkpXG4gICAgICAubWFwKChjdHJsOiBhbnkpID0+IHtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLmdldCA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMuZ2V0LFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwiZ2V0XCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICAgIGRlY29yYXRlZFJvdXRlcy5wb3N0ID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5wb3N0LFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwicG9zdFwiLCBjdHJsKVxuICAgICAgICB9O1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXMucHV0ID0ge1xuICAgICAgICAgIC4uLmRlY29yYXRlZFJvdXRlcy5wdXQsXG4gICAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoXCJwdXRcIiwgY3RybClcbiAgICAgICAgfTtcbiAgICAgICAgZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSA9IHtcbiAgICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMuZGVsZXRlLFxuICAgICAgICAgIC4uLnRoaXMucHJlcGFyZUNvbnRyb2xsZXJNZXRob2RzKFwiZGVsZXRlXCIsIGN0cmwpXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHJldHVybiBkZWNvcmF0ZWRSb3V0ZXM7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMucm91dGVzO1xuICAgIE9iamVjdC5rZXlzKG1hcCkubWFwKG1ldGhvZCA9PiB0aGlzLmJpbmRNZXRob2QobWV0aG9kLCBtYXBbbWV0aG9kXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFsbCByb3V0ZXMgcmVnaXN0ZXJlZCBpbiB0aGUgbWV0aG9kIHN1cHBsaWVkXG4gICAqXG4gICAqIEBwYXJhbSBtZXRob2QgVGhlIGh0dHAgbWV0aG9kIHRvIGJpbmRcbiAgICogQHBhcmFtIHJvdXRlcyBUaGUgcm91dGVzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGJpbmRNZXRob2QobWV0aG9kLCByb3V0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IHIgaW4gcm91dGVzKSB7XG4gICAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHIpICYmIHJvdXRlc1tyXS5jb250cm9sbGVyKSB7XG4gICAgICAgIC8vIEVuc3VyZSBsb2dnZXIgaXMgYXZhaWxhYmxlXG4gICAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBSZWdpc3RlcmluZyBzZXJ2ZXIgcm91dGU6ICR7bWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBjb250cm9sbGVyIGZyb20gbWFwXG4gICAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbGxlcihyb3V0ZXMsIHIpO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgZmlsdGVycyB3cmFwcGVyIGluc3RhbmNlIHRvIHRoZSByb3V0ZXMgbWFwXG4gICAgICAgIGlmIChyb3V0ZXNbcl0uZmlsdGVycyAmJiByb3V0ZXNbcl0uZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBWYWxpZGF0ZSBhbGwgZmlsdGVyc1xuICAgICAgICAgIGlmIChyb3V0ZXNbcl0uZmlsdGVycy5maWx0ZXIoZiA9PiAhZikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmaWx0ZXJzIGZvciByb3V0ZTogXCIgKyBtZXRob2QudG9VcHBlckNhc2UoKSArIFwiIFwiICsgcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVnaXN0ZXIgcm91dGUgd2l0aCBmaWx0ZXJzIGluIGN1cnJlbnQgbWFwIGZvciBiaWRpbmcgdG8gZXhwcmVzc1xuICAgICAgICAgIHRoaXMucm91dGVzW21ldGhvZF1bcl0gPSBGaWx0ZXJzV3JhcHBlci5hcHBseShyb3V0ZXNbcl0uZmlsdGVycywgdGhpcy5vcHRpb25zLnBhdGguZmlsdGVycykuY29uY2F0KFtjdHJsXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVnaXN0ZXIgcm91dGUgaW4gY3VycmVudCBtYXAgZm9yIGJpZGluZyB0byBleHByZXNzXG4gICAgICAgICAgdGhpcy5yb3V0ZXNbbWV0aG9kXVtyXSA9IGN0cmw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIGNvbnRyb2xsZXIgZGVmaW5lZCBieSB0aGUgcm91dGUgc3VwcGxpZWQuXG4gICAqXG4gICAqIEBwYXJhbSByb3V0ZXMgVGhlIHJvdXRlcyBtYXBcbiAgICogQHBhcmFtIHIgVGhlIHJvdXRlIHRvIHJlZ2lzdGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9XG4gICAqL1xuICByZWdpc3RlckNvbnRyb2xsZXIocm91dGVzLCByKSB7XG4gICAgbGV0IGN0cmwgPSByb3V0ZXNbcl0uY29udHJvbGxlcjtcblxuICAgIC8vIENoZWNrIGNvbnRyb2xsZXIgdHlwZVxuICAgIGlmIChjdHJsICYmIHV0aWwuaXNTdHJpbmcoY3RybCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIExvYWQgY29udHJvbGxlciBmcm9tIHBhdGhcbiAgICAgICAgY3RybCA9IHJlcXVpcmUocGF0aC5qb2luKHRoaXMub3B0aW9ucy5wYXRoLmNvbnRyb2xsZXJzLCBjdHJsKSk7XG4gICAgICAgIC8vIEZpeCBmb3IgbW90aCBtb2R1bGVzIHN5c3RlbXMgKGltcG9ydCAvIHJlcXVpcmUpXG4gICAgICAgIGN0cmwgPSBjdHJsLmRlZmF1bHQgfHwgY3RybDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZS5zdGFjayA9IGNsZWFuU3RhY2soZS5zdGFjayk7XG5cbiAgICAgICAgaWYgKGUubWVzc2FnZS5tYXRjaChuZXcgUmVnRXhwKGN0cmwpKSkge1xuICAgICAgICAgIC8vIFRocm93IGEgZGlyZWN0IG1lc3NhZ2Ugd2hlbiBjb250cm9sbGVyIHdhcyBub3QgZm91bmRcbiAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihgQ29udHJvbGxlciBub3QgZm91bmQ6ICR7cGF0aC5qb2luKGN0cmxfcGF0aCwgY3RybCl9YCk7XG4gICAgICAgICAgZXJyb3Iuc3RhY2sgPSBlLnN0YWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFVua25vd24gZXJyb3JcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdHJsLnRhcmdldCAmJiBjdHJsLmtleSkge1xuICAgICAgLy8gQmluZCB0byBhIHNwZWNmaWMga2V5IGluIHRoZSB0YXJnZXRcbiAgICAgIHJldHVybiBjdHJsLnRhcmdldFtjdHJsLmtleV0uYmluZChjdHJsLnRhcmdldCk7XG4gICAgfSBlbHNlIGlmICghY3RybCB8fCAhdXRpbC5pc0Z1bmN0aW9uKGN0cmwpKSB7XG4gICAgICAvLyBUaHJvdyBpbnZhbGlkIGNvbnRyb2xsZXIgZXJyb3JcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29udHJvbGxlciBpcyBub3QgdmFsaWQgZm9yIHJvdXRlOiAke3J9YCk7XG4gICAgfVxuICAgIHJldHVybiBjdHJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIHRoZSBjb250cm9sbGVyIHRvIHRoZSBleHByZXNzIGFwcGxpY2F0aW9uIG9yIGNyZWF0ZXMgYSBuZXcgb25lLlxuICAgKlxuICAgKiBAcGFyYW0ge2V4cHJlc3MuQXBwbGljYXRpb259IFthcHBdIFRoZSBleHByZXNzIGFwcGxpY2F0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtleHByZXNzLkFwcGxpY2F0aW9ufVxuICAgKi9cbiAgcmVnaXN0ZXIoYXBwPzogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xuICAgIHRoaXMuYXBwID0gYXBwIHx8IGV4cHJlc3MoKTtcbiAgICBmb3IgKGNvbnN0IG1ldGhvZCBpbiB0aGlzLnJvdXRlcykge1xuICAgICAgaWYgKHRoaXMucm91dGVzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcbiAgICAgICAgZm9yIChjb25zdCByIGluIHRoaXMucm91dGVzW21ldGhvZF0pIHtcbiAgICAgICAgICBpZiAociAmJiB0aGlzLnJvdXRlc1ttZXRob2RdLmhhc093blByb3BlcnR5KHIpKSB7XG4gICAgICAgICAgICB0aGlzLmFwcFttZXRob2RdKHIsIGFzeW5jTWlkZGxld2FyZShtZXRob2QsIHIsIHRoaXMucm91dGVzW21ldGhvZF1bcl0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHRoZSBhcHAgaW5zdGFuY2VcbiAgICByZXR1cm4gdGhpcy5hcHA7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSByb3V0ZXIgdXNpbmcgdGhlIHN1cHBsaWVkIHJvdXRlcyBtYXAgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSBjb250cm9sbGVycyBUaGUgbWFwIG9mIGNvbnRyb2xsZXIgY2xhc3NlcyB0byBiaW5kIHRvXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSByb3V0ZXMgVGhlIG1hcCBvZiByb3V0ZSBmaWxlcyBvdCBiaW5kIHRvXG4gICAqXG4gICAqIEBwYXJhbSB7Um91dGVyT3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGJ1aWxkKGNvbnRyb2xsZXJzOiBvYmplY3QgfCBzdHJpbmcsIHJvdXRlczogUm91dGVNYXAgfCBzdHJpbmcsIG9wdGlvbnM/OiBSb3V0ZXJPcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXI7XG5cbiAgICBpZiAocm91dGVzICYmIHV0aWwuaXNTdHJpbmcocm91dGVzKSkge1xuICAgICAgd3JhcHBlciA9IG5ldyBTZXJ2ZXJSb3V0ZXIoY29udHJvbGxlcnMsIHJlcXVpcmUocm91dGVzKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBuZXcgU2VydmVyUm91dGVyKGNvbnRyb2xsZXJzLCByb3V0ZXMgYXMgUm91dGVNYXAsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVyLnJlZ2lzdGVyKG9wdGlvbnMgPyBvcHRpb25zLmFwcCA6IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiJdfQ==