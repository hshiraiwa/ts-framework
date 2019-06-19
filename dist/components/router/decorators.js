"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Simple factory for generating the routes decorators */
const routeDecoratorFactory = (method) => {
    return (route, filters = []) => {
        return function getRouteDecorator(target, key, descriptor) {
            target.routes = target.routes || {};
            target.routes[method] = target.routes[method] || {};
            target.routes[method][route] = {
                filters,
                controller: { target, key },
            };
            return descriptor;
        };
    };
};
/**
 * The @Controller decorator.
 *
 * @param {string} route The route to be assigned to all methods of decorated class.
 * @param {Function[]} filters The filters to be called before all methods of decorated class.
 */
exports.Controller = (route, filters = []) => {
    return function controllerDecorator(constructor) {
        var _a;
        return _a = class extends constructor {
                static routes() {
                    return constructor.routes || {};
                }
            },
            _a.baseRoute = route,
            _a.baseFilters = filters,
            _a;
    };
};
/**
 * The @Get route decorator.
 *
 * @type {Function}
 *
 * @param {string} route The route to be assigned to the decorated method.
 * @param {Function[]} filters The filters to be called before the decorated method.
 */
exports.Get = routeDecoratorFactory("get");
/**
 * The @Post route decorator.
 *
 * @type {Function}
 *
 * @param {string} route The route to be assigned to the decorated method.
 * @param {Function[]} filters The filters to be called before the decorated method.
 */
exports.Post = routeDecoratorFactory("post");
/**
 * The @Put route decorator.
 *
 * @type {Function}
 *
 * @param {string} route The route to be assigned to the decorated method.
 * @param {Function[]} filters The filters to be called before the decorated method.
 */
exports.Put = routeDecoratorFactory("put");
/**
 * The @Delete route decorator.
 *
 * @type {Function}
 *
 * @param {string} route The route to be assigned to the decorated method.
 * @param {Function[]} filters The filters to be called before the decorated method.
 */
exports.Delete = routeDecoratorFactory("delete");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL3JvdXRlci9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseURBQXlEO0FBQ3pELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFjLEVBQVksRUFBRTtJQUN6RCxPQUFPLENBQUMsS0FBYSxFQUFFLFVBQXNCLEVBQUUsRUFBRSxFQUFFO1FBQ2pELE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxNQUFzQixFQUFFLEdBQVcsRUFBRSxVQUE4QjtZQUNuRyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDN0IsT0FBTztnQkFDUCxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO2FBQzVCLENBQUM7WUFDRixPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNVLFFBQUEsVUFBVSxHQUFHLENBQUMsS0FBYyxFQUFFLFVBQXNCLEVBQUUsRUFBRSxFQUFFO0lBQ3JFLE9BQU8sU0FBUyxtQkFBbUIsQ0FBMkIsV0FBYzs7UUFDMUUsWUFBTyxLQUFNLFNBQVEsV0FBVztnQkFJOUIsTUFBTSxDQUFDLE1BQU07b0JBQ1gsT0FBTyxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDbEMsQ0FBQzthQUNGO1lBTlEsWUFBUyxHQUFHLEtBQU07WUFDbEIsY0FBVyxHQUFHLE9BQVE7ZUFLN0I7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxHQUFHLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEQ7Ozs7Ozs7R0FPRztBQUNVLFFBQUEsSUFBSSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxEOzs7Ozs7O0dBT0c7QUFDVSxRQUFBLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVoRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxNQUFNLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuLyogU2ltcGxlIGZhY3RvcnkgZm9yIGdlbmVyYXRpbmcgdGhlIHJvdXRlcyBkZWNvcmF0b3JzICovXG5jb25zdCByb3V0ZURlY29yYXRvckZhY3RvcnkgPSAobWV0aG9kOiBzdHJpbmcpOiBGdW5jdGlvbiA9PiB7XG4gIHJldHVybiAocm91dGU6IHN0cmluZywgZmlsdGVyczogRnVuY3Rpb25bXSA9IFtdKSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGdldFJvdXRlRGVjb3JhdG9yKHRhcmdldDogQmFzZUNvbnRyb2xsZXIsIGtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgICAgIHRhcmdldC5yb3V0ZXMgPSB0YXJnZXQucm91dGVzIHx8IHt9O1xuICAgICAgdGFyZ2V0LnJvdXRlc1ttZXRob2RdID0gdGFyZ2V0LnJvdXRlc1ttZXRob2RdIHx8IHt9O1xuICAgICAgdGFyZ2V0LnJvdXRlc1ttZXRob2RdW3JvdXRlXSA9IHtcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgY29udHJvbGxlcjogeyB0YXJnZXQsIGtleSB9LFxuICAgICAgfTtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH07XG4gIH07XG59O1xuXG4vKipcbiAqIFRoZSBAQ29udHJvbGxlciBkZWNvcmF0b3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byBhbGwgbWV0aG9kcyBvZiBkZWNvcmF0ZWQgY2xhc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW119IGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYmUgY2FsbGVkIGJlZm9yZSBhbGwgbWV0aG9kcyBvZiBkZWNvcmF0ZWQgY2xhc3MuXG4gKi9cbmV4cG9ydCBjb25zdCBDb250cm9sbGVyID0gKHJvdXRlPzogc3RyaW5nLCBmaWx0ZXJzOiBGdW5jdGlvbltdID0gW10pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbnRyb2xsZXJEZWNvcmF0b3I8VCBleHRlbmRzIEJhc2VDb250cm9sbGVyPihjb25zdHJ1Y3RvcjogVCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgIHN0YXRpYyBiYXNlUm91dGUgPSByb3V0ZTtcbiAgICAgIHN0YXRpYyBiYXNlRmlsdGVycyA9IGZpbHRlcnM7XG5cbiAgICAgIHN0YXRpYyByb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yb3V0ZXMgfHwge307XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbi8qKlxuICogVGhlIEBHZXQgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBHZXQgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJnZXRcIik7XG5cbi8qKlxuICogVGhlIEBQb3N0IHJvdXRlIGRlY29yYXRvci5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBiZSBjYWxsZWQgYmVmb3JlIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICovXG5leHBvcnQgY29uc3QgUG9zdCA9IHJvdXRlRGVjb3JhdG9yRmFjdG9yeShcInBvc3RcIik7XG5cbi8qKlxuICogVGhlIEBQdXQgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBQdXQgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJwdXRcIik7XG5cbi8qKlxuICogVGhlIEBEZWxldGUgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBEZWxldGUgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJkZWxldGVcIik7XG4iXX0=