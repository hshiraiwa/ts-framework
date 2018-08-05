"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
const express = require("express");
const cleanStack = require("clean-stack");
const async_1 = require("../middlewares/async");
const filter_1 = require("../helpers/filter");
// TODO: Inject this constants from outside
// Prepare static full paths, relative to project root
const ctrl_path = '../../../api/controllers';
const BASE_CTRLS_PATH = path.join(__dirname, ctrl_path);
class ServerRouter {
    constructor(controllers, routes, options = { path: {} }) {
        if (!controllers && !routes) {
            throw new Error('Could not initialize the router without routes or controllers');
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
            delete: Object.assign({}, decoratedRoutes.delete, r.delete),
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
                const fullRoute = path.join(ctrl.baseRoute, route);
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
        Object.keys(controllers || {}).map(name => ({
            name,
            baseRoute: controllers[name].baseRoute,
            baseFilters: controllers[name].baseFilters,
            routes: controllers[name].routes(),
        })).map((ctrl) => {
            decoratedRoutes.get = Object.assign({}, decoratedRoutes.get, this.prepareControllerMethods('get', ctrl));
            decoratedRoutes.post = Object.assign({}, decoratedRoutes.post, this.prepareControllerMethods('post', ctrl));
            decoratedRoutes.put = Object.assign({}, decoratedRoutes.put, this.prepareControllerMethods('put', ctrl));
            decoratedRoutes.delete = Object.assign({}, decoratedRoutes.delete, this.prepareControllerMethods('delete', ctrl));
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
                        throw new Error('Invalid filters for route: ' + method.toUpperCase() + ' ' + r);
                    }
                    // Register route with filters in current map for biding to express
                    this.routes[method][r] = filter_1.default
                        .apply(routes[r].filters, this.options.path.filters)
                        .concat([ctrl]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvcm91dGVyL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQyxnREFBbUQ7QUFDbkQsOENBQStDO0FBSy9DLDJDQUEyQztBQUMzQyxzREFBc0Q7QUFDdEQsTUFBTSxTQUFTLEdBQUcsMEJBQTBCLENBQUM7QUFFN0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUEwQnhELE1BQXFCLFlBQVk7SUFNL0IsWUFBWSxXQUFnQixFQUFFLE1BQWdCLEVBQUUsVUFBeUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBRW5GLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLGVBQWUsQ0FBQztRQUVqRixNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksRUFBYyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFDNUIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1osR0FBRyxvQkFBTyxlQUFlLENBQUMsR0FBRyxFQUFLLENBQUMsQ0FBQyxHQUFHLENBQUU7WUFDekMsSUFBSSxvQkFBTyxlQUFlLENBQUMsSUFBSSxFQUFLLENBQUMsQ0FBQyxJQUFJLENBQUU7WUFDNUMsR0FBRyxvQkFBTyxlQUFlLENBQUMsR0FBRyxFQUFLLENBQUMsQ0FBQyxHQUFHLENBQUU7WUFDekMsTUFBTSxvQkFBTyxlQUFlLENBQUMsTUFBTSxFQUFLLENBQUMsQ0FBQyxNQUFNLENBQUU7U0FDbkQsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ25DLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDM0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xHO1lBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsZUFBZSxDQUFDLFdBQVc7UUFDekIsTUFBTSxlQUFlLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFFbkUseURBQXlEO1FBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSTtZQUNKLFNBQVMsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUztZQUN0QyxXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVc7WUFDMUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7U0FDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7WUFDcEIsZUFBZSxDQUFDLEdBQUcscUJBQ2QsZUFBZSxDQUFDLEdBQUcsRUFDbkIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FDOUMsQ0FBQztZQUNGLGVBQWUsQ0FBQyxJQUFJLHFCQUNmLGVBQWUsQ0FBQyxJQUFJLEVBQ3BCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQy9DLENBQUM7WUFDRixlQUFlLENBQUMsR0FBRyxxQkFDZCxlQUFlLENBQUMsR0FBRyxFQUNuQixJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUM5QyxDQUFDO1lBQ0YsZUFBZSxDQUFDLE1BQU0scUJBQ2pCLGVBQWUsQ0FBQyxNQUFNLEVBQ3RCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQ2pELENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU07UUFDdkIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDdEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BELDZCQUE2QjtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDN0U7Z0JBRUQsMEJBQTBCO2dCQUMxQixvQ0FBb0M7Z0JBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELHFEQUFxRDtnQkFDckQsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUVqRCx1QkFBdUI7b0JBQ3ZCLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ2pGO29CQUVELG1FQUFtRTtvQkFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBYzt5QkFDcEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUNuRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUVuQjtxQkFBTTtvQkFDTCxzREFBc0Q7b0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUMvQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUVoQyx3QkFBd0I7UUFDeEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFJO2dCQUNGLDRCQUE0QjtnQkFDNUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxrREFBa0Q7Z0JBQ2xELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQzthQUM3QjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLENBQUMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNyQyx1REFBdUQ7b0JBQ3ZELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHlCQUF5QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQy9FLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0wsZ0JBQWdCO29CQUNoQixNQUFNLENBQUMsQ0FBQztpQkFDVDthQUNGO1NBQ0Y7YUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQyxpQ0FBaUM7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FBQyxHQUF5QjtRQUNoQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM1QixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEMsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5RDtpQkFDRjthQUNGO1NBQ0Y7UUFDRCwwQkFBMEI7UUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUE0QixFQUFFLE1BQXlCLEVBQUUsT0FBdUI7UUFDM0YsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDdEU7UUFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUE1TkQsK0JBNE5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0ICogYXMgY2xlYW5TdGFjayBmcm9tICdjbGVhbi1zdGFjayc7XG5pbXBvcnQgYXN5bmNNaWRkbGV3YXJlIGZyb20gJy4uL21pZGRsZXdhcmVzL2FzeW5jJztcbmltcG9ydCBGaWx0ZXJzV3JhcHBlciBmcm9tICcuLi9oZWxwZXJzL2ZpbHRlcic7XG5pbXBvcnQgeyBMb2dnZXJJbnN0YW5jZSB9IGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0IHsgQmFzZVJlcXVlc3QgfSBmcm9tICcuLi8uLic7XG5pbXBvcnQgeyBCYXNlUmVzcG9uc2UgfSBmcm9tICcuLi9oZWxwZXJzL3Jlc3BvbnNlJztcblxuLy8gVE9ETzogSW5qZWN0IHRoaXMgY29uc3RhbnRzIGZyb20gb3V0c2lkZVxuLy8gUHJlcGFyZSBzdGF0aWMgZnVsbCBwYXRocywgcmVsYXRpdmUgdG8gcHJvamVjdCByb290XG5jb25zdCBjdHJsX3BhdGggPSAnLi4vLi4vLi4vYXBpL2NvbnRyb2xsZXJzJztcblxuY29uc3QgQkFTRV9DVFJMU19QQVRIID0gcGF0aC5qb2luKF9fZGlybmFtZSwgY3RybF9wYXRoKTtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZXJPcHRpb25zIHtcbiAgbG9nZ2VyPzogTG9nZ2VySW5zdGFuY2U7XG4gIGFwcD86IGV4cHJlc3MuQXBwbGljYXRpb247XG4gIHBhdGg6IHtcbiAgICBjb250cm9sbGVycz86IHN0cmluZztcbiAgICBmaWx0ZXJzPzogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZSA9ICgocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UpID0+IChhbnkgfCBQcm9taXNlPGFueT4pKTtcbmV4cG9ydCB0eXBlIEZpbHRlciA9ICgocmVxOiBCYXNlUmVxdWVzdCwgcmVzOiBCYXNlUmVzcG9uc2UsIG5leHQ6IEZ1bmN0aW9uKSA9PiAoYW55IHwgUHJvbWlzZTxhbnk+KSk7XG5cbmV4cG9ydCB0eXBlIFJvdXRlRGVmcyA9IHtcbiAgY29udHJvbGxlcjogc3RyaW5nIHwgUm91dGU7XG4gIGZpbHRlcnM/OiAoc3RyaW5nIHwgRmlsdGVyKVtdO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZU1hcCB7XG4gIGdldD86IHsgW3BhdGg6IHN0cmluZ106IHN0cmluZyB8IFJvdXRlIHwgUm91dGVEZWZzIH07XG4gIHBvc3Q/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBwdXQ/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xuICBkZWxldGU/OiB7IFtwYXRoOiBzdHJpbmddOiBzdHJpbmcgfCBSb3V0ZSB8IFJvdXRlRGVmcyB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJSb3V0ZXIge1xuICBhcHA6IGFueTtcbiAgcm91dGVzOiBhbnk7XG4gIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIG9wdGlvbnM6IFJvdXRlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IoY29udHJvbGxlcnM6IGFueSwgcm91dGVzOiBSb3V0ZU1hcCwgb3B0aW9uczogUm91dGVyT3B0aW9ucyA9IHsgcGF0aDoge30gfSkge1xuXG4gICAgaWYgKCFjb250cm9sbGVycyAmJiAhcm91dGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBpbml0aWFsaXplIHRoZSByb3V0ZXIgd2l0aG91dCByb3V0ZXMgb3IgY29udHJvbGxlcnMnKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgdGhpcy5vcHRpb25zLnBhdGggPSB0aGlzLm9wdGlvbnMucGF0aCB8fCB7fTtcbiAgICB0aGlzLm9wdGlvbnMucGF0aC5jb250cm9sbGVycyA9IHRoaXMub3B0aW9ucy5wYXRoLmNvbnRyb2xsZXJzIHx8IEJBU0VfQ1RSTFNfUEFUSDtcblxuICAgIGNvbnN0IHIgPSByb3V0ZXMgfHwge30gYXMgUm91dGVNYXA7XG4gICAgY29uc3QgYyA9IGNvbnRyb2xsZXJzIHx8IHt9O1xuICAgIGNvbnN0IGRlY29yYXRlZFJvdXRlcyA9IHRoaXMuZGVjb3JhdGVkUm91dGVzKGMpO1xuXG4gICAgdGhpcy5yb3V0ZXMgPSB7XG4gICAgICBnZXQ6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmdldCwgLi4uci5nZXQgfSxcbiAgICAgIHBvc3Q6IHsgLi4uZGVjb3JhdGVkUm91dGVzLnBvc3QsIC4uLnIucG9zdCB9LFxuICAgICAgcHV0OiB7IC4uLmRlY29yYXRlZFJvdXRlcy5wdXQsIC4uLnIucHV0IH0sXG4gICAgICBkZWxldGU6IHsgLi4uZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSwgLi4uci5kZWxldGUgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGUgY29udHJvbGxlciBtZXRob2RzIHRvIGJlaW5nIGJvdW5kLlxuICAgKiBAcGFyYW0gbWV0aG9kXG4gICAqIEBwYXJhbSBjdHJsXG4gICAqIEByZXR1cm5zIHt7fX1cbiAgICovXG4gIHByZXBhcmVDb250cm9sbGVyTWV0aG9kcyhtZXRob2QsIGN0cmwpIHtcbiAgICBjb25zdCBkZWNvcmF0ZWRSb3V0ZXMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKGN0cmwucm91dGVzW21ldGhvZF0gfHwge30pLm1hcCgocm91dGU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGN0cmwuYmFzZUZpbHRlcnMpIHtcbiAgICAgICAgY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV0uZmlsdGVycyA9IGN0cmwuYmFzZUZpbHRlcnMuY29uY2F0KGN0cmwucm91dGVzW21ldGhvZF1bcm91dGVdLmZpbHRlcnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3RybC5iYXNlUm91dGUpIHtcbiAgICAgICAgY29uc3QgZnVsbFJvdXRlID0gcGF0aC5qb2luKGN0cmwuYmFzZVJvdXRlLCByb3V0ZSk7XG4gICAgICAgIGRlY29yYXRlZFJvdXRlc1tmdWxsUm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWNvcmF0ZWRSb3V0ZXNbcm91dGVdID0gY3RybC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVjb3JhdGVkUm91dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIGRlY29yYXRlZCByb3V0ZXMgZm9yIGJlaW5nIG1lcmdlZCBpbnRvIHRoZSByb3V0ZXMgbWFwLlxuICAgKlxuICAgKiBAcGFyYW0gY29udHJvbGxlcnMgVGhlIGNvbnRyb2xsZXJzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVjb3JhdGVkUm91dGVzKGNvbnRyb2xsZXJzKSB7XG4gICAgY29uc3QgZGVjb3JhdGVkUm91dGVzID0geyBnZXQ6IHt9LCBwb3N0OiB7fSwgcHV0OiB7fSwgZGVsZXRlOiB7fSB9O1xuXG4gICAgLy8gUHJlcGFyZSBBUEkgcm91dGVzIGFuZCBpdHMgY29udHJvbGxlcnMgZnJvbSBkZWNvcmF0b3JzXG4gICAgT2JqZWN0LmtleXMoY29udHJvbGxlcnMgfHwge30pLm1hcChuYW1lID0+ICh7XG4gICAgICBuYW1lLFxuICAgICAgYmFzZVJvdXRlOiBjb250cm9sbGVyc1tuYW1lXS5iYXNlUm91dGUsXG4gICAgICBiYXNlRmlsdGVyczogY29udHJvbGxlcnNbbmFtZV0uYmFzZUZpbHRlcnMsXG4gICAgICByb3V0ZXM6IGNvbnRyb2xsZXJzW25hbWVdLnJvdXRlcygpLFxuICAgIH0pKS5tYXAoKGN0cmw6IGFueSkgPT4ge1xuICAgICAgZGVjb3JhdGVkUm91dGVzLmdldCA9IHtcbiAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLmdldCxcbiAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoJ2dldCcsIGN0cmwpLFxuICAgICAgfTtcbiAgICAgIGRlY29yYXRlZFJvdXRlcy5wb3N0ID0ge1xuICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMucG9zdCxcbiAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoJ3Bvc3QnLCBjdHJsKSxcbiAgICAgIH07XG4gICAgICBkZWNvcmF0ZWRSb3V0ZXMucHV0ID0ge1xuICAgICAgICAuLi5kZWNvcmF0ZWRSb3V0ZXMucHV0LFxuICAgICAgICAuLi50aGlzLnByZXBhcmVDb250cm9sbGVyTWV0aG9kcygncHV0JywgY3RybCksXG4gICAgICB9O1xuICAgICAgZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSA9IHtcbiAgICAgICAgLi4uZGVjb3JhdGVkUm91dGVzLmRlbGV0ZSxcbiAgICAgICAgLi4udGhpcy5wcmVwYXJlQ29udHJvbGxlck1ldGhvZHMoJ2RlbGV0ZScsIGN0cmwpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWNvcmF0ZWRSb3V0ZXM7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMucm91dGVzO1xuICAgIE9iamVjdC5rZXlzKG1hcCkubWFwKG1ldGhvZCA9PiB0aGlzLmJpbmRNZXRob2QobWV0aG9kLCBtYXBbbWV0aG9kXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIGFsbCByb3V0ZXMgcmVnaXN0ZXJlZCBpbiB0aGUgbWV0aG9kIHN1cHBsaWVkXG4gICAqXG4gICAqIEBwYXJhbSBtZXRob2QgVGhlIGh0dHAgbWV0aG9kIHRvIGJpbmRcbiAgICogQHBhcmFtIHJvdXRlcyBUaGUgcm91dGVzIG1hcFxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGJpbmRNZXRob2QobWV0aG9kLCByb3V0ZXMpIHtcbiAgICBmb3IgKGNvbnN0IHIgaW4gcm91dGVzKSB7XG4gICAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHIpICYmIHJvdXRlc1tyXS5jb250cm9sbGVyKSB7XG4gICAgICAgIC8vIEVuc3VyZSBsb2dnZXIgaXMgYXZhaWxhYmxlXG4gICAgICAgIGlmICh0aGlzLmxvZ2dlcikge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLnNpbGx5KGBSZWdpc3RlcmluZyBzZXJ2ZXIgcm91dGU6ICR7bWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7cn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBjb250cm9sbGVyIGZyb20gbWFwXG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBKU1VucmVzb2x2ZWRWYXJpYWJsZVxuICAgICAgICBjb25zdCBjdHJsID0gdGhpcy5yZWdpc3RlckNvbnRyb2xsZXIocm91dGVzLCByKTtcblxuICAgICAgICAvLyBBZGQgdGhlIGZpbHRlcnMgd3JhcHBlciBpbnN0YW5jZSB0byB0aGUgcm91dGVzIG1hcFxuICAgICAgICBpZiAocm91dGVzW3JdLmZpbHRlcnMgJiYgcm91dGVzW3JdLmZpbHRlcnMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSBhbGwgZmlsdGVyc1xuICAgICAgICAgIGlmIChyb3V0ZXNbcl0uZmlsdGVycy5maWx0ZXIoZiA9PiAhZikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocm91dGVzW3JdLmZpbHRlcnMpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZpbHRlcnMgZm9yIHJvdXRlOiAnICsgbWV0aG9kLnRvVXBwZXJDYXNlKCkgKyAnICcgKyByKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZWdpc3RlciByb3V0ZSB3aXRoIGZpbHRlcnMgaW4gY3VycmVudCBtYXAgZm9yIGJpZGluZyB0byBleHByZXNzXG4gICAgICAgICAgdGhpcy5yb3V0ZXNbbWV0aG9kXVtyXSA9IEZpbHRlcnNXcmFwcGVyXG4gICAgICAgICAgICAuYXBwbHkocm91dGVzW3JdLmZpbHRlcnMsIHRoaXMub3B0aW9ucy5wYXRoLmZpbHRlcnMpXG4gICAgICAgICAgICAuY29uY2F0KFtjdHJsXSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZWdpc3RlciByb3V0ZSBpbiBjdXJyZW50IG1hcCBmb3IgYmlkaW5nIHRvIGV4cHJlc3NcbiAgICAgICAgICB0aGlzLnJvdXRlc1ttZXRob2RdW3JdID0gY3RybDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciB0aGUgY29udHJvbGxlciBkZWZpbmVkIGJ5IHRoZSByb3V0ZSBzdXBwbGllZC5cbiAgICpcbiAgICogQHBhcmFtIHJvdXRlcyBUaGUgcm91dGVzIG1hcFxuICAgKiBAcGFyYW0gciBUaGUgcm91dGUgdG8gcmVnaXN0ZXJcbiAgICpcbiAgICogQHJldHVybnMge2FueX1cbiAgICovXG4gIHJlZ2lzdGVyQ29udHJvbGxlcihyb3V0ZXMsIHIpIHtcbiAgICBsZXQgY3RybCA9IHJvdXRlc1tyXS5jb250cm9sbGVyO1xuXG4gICAgLy8gQ2hlY2sgY29udHJvbGxlciB0eXBlXG4gICAgaWYgKGN0cmwgJiYgdXRpbC5pc1N0cmluZyhjdHJsKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gTG9hZCBjb250cm9sbGVyIGZyb20gcGF0aFxuICAgICAgICBjdHJsID0gcmVxdWlyZShwYXRoLmpvaW4odGhpcy5vcHRpb25zLnBhdGguY29udHJvbGxlcnMsIGN0cmwpKTtcbiAgICAgICAgLy8gRml4IGZvciBtb3RoIG1vZHVsZXMgc3lzdGVtcyAoaW1wb3J0IC8gcmVxdWlyZSlcbiAgICAgICAgY3RybCA9IGN0cmwuZGVmYXVsdCB8fCBjdHJsO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlLnN0YWNrID0gY2xlYW5TdGFjayhlLnN0YWNrKTtcblxuICAgICAgICBpZiAoZS5tZXNzYWdlLm1hdGNoKG5ldyBSZWdFeHAoY3RybCkpKSB7XG4gICAgICAgICAgLy8gVGhyb3cgYSBkaXJlY3QgbWVzc2FnZSB3aGVuIGNvbnRyb2xsZXIgd2FzIG5vdCBmb3VuZFxuICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBDb250cm9sbGVyIG5vdCBmb3VuZDogJHtwYXRoLmpvaW4oY3RybF9wYXRoLCBjdHJsKX1gKTtcbiAgICAgICAgICBlcnJvci5zdGFjayA9IGUuc3RhY2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVW5rbm93biBlcnJvclxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFjdHJsIHx8ICF1dGlsLmlzRnVuY3Rpb24oY3RybCkpIHtcbiAgICAgIC8vIFRocm93IGludmFsaWQgY29udHJvbGxlciBlcnJvclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb250cm9sbGVyIGlzIG5vdCB2YWxpZCBmb3Igcm91dGU6ICR7cn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGN0cmw7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgdGhlIGNvbnRyb2xsZXIgdG8gdGhlIGV4cHJlc3MgYXBwbGljYXRpb24gb3IgY3JlYXRlcyBhIG5ldyBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7ZXhwcmVzcy5BcHBsaWNhdGlvbn0gW2FwcF0gVGhlIGV4cHJlc3MgYXBwbGljYXRpb25cbiAgICpcbiAgICogQHJldHVybnMge2V4cHJlc3MuQXBwbGljYXRpb259XG4gICAqL1xuICByZWdpc3RlcihhcHA/OiBleHByZXNzLkFwcGxpY2F0aW9uKSB7XG4gICAgdGhpcy5hcHAgPSBhcHAgfHwgZXhwcmVzcygpO1xuICAgIGZvciAoY29uc3QgbWV0aG9kIGluIHRoaXMucm91dGVzKSB7XG4gICAgICBpZiAodGhpcy5yb3V0ZXMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHIgaW4gdGhpcy5yb3V0ZXNbbWV0aG9kXSkge1xuICAgICAgICAgIGlmIChyICYmIHRoaXMucm91dGVzW21ldGhvZF0uaGFzT3duUHJvcGVydHkocikpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwW21ldGhvZF0ociwgYXN5bmNNaWRkbGV3YXJlKHRoaXMucm91dGVzW21ldGhvZF1bcl0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHRoZSBhcHAgaW5zdGFuY2VcbiAgICByZXR1cm4gdGhpcy5hcHA7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYSByb3V0ZXIgdXNpbmcgdGhlIHN1cHBsaWVkIHJvdXRlcyBtYXAgYW5kIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSBjb250cm9sbGVycyBUaGUgbWFwIG9mIGNvbnRyb2xsZXIgY2xhc3NlcyB0byBiaW5kIHRvXG4gICAqIEBwYXJhbSB7T2JqZWN0IHwgc3RyaW5nfSByb3V0ZXMgVGhlIG1hcCBvZiByb3V0ZSBmaWxlcyBvdCBiaW5kIHRvXG4gICAqXG4gICAqIEBwYXJhbSB7Um91dGVyT3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGJ1aWxkKGNvbnRyb2xsZXJzOiBvYmplY3QgfCBzdHJpbmcsIHJvdXRlczogUm91dGVNYXAgfCBzdHJpbmcsIG9wdGlvbnM/OiBSb3V0ZXJPcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXI7XG5cbiAgICBpZiAocm91dGVzICYmIHV0aWwuaXNTdHJpbmcocm91dGVzKSkge1xuICAgICAgd3JhcHBlciA9IG5ldyBTZXJ2ZXJSb3V0ZXIoY29udHJvbGxlcnMsIHJlcXVpcmUocm91dGVzKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBuZXcgU2VydmVyUm91dGVyKGNvbnRyb2xsZXJzLCByb3V0ZXMgYXMgUm91dGVNYXAsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwcGVyLnJlZ2lzdGVyKG9wdGlvbnMgPyBvcHRpb25zLmFwcCA6IHVuZGVmaW5lZCk7XG4gIH1cbn1cbiJdfQ==