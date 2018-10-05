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
                controller: target[key].bind(target)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL3JvdXRlci9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseURBQXlEO0FBQ3pELE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxNQUFNLEVBQVksRUFBRTtJQUNqRCxPQUFPLENBQUMsS0FBYSxFQUFFLFVBQXNCLEVBQUUsRUFBRSxFQUFFO1FBQ2pELE9BQU8sU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVU7WUFDdkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQzdCLE9BQU87Z0JBQ1AsVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JDLENBQUM7WUFDRixPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNVLFFBQUEsVUFBVSxHQUFHLENBQUMsS0FBYyxFQUFFLFVBQXNCLEVBQUUsRUFBRSxFQUFFO0lBQ3JFLE9BQU8sU0FBUyxtQkFBbUIsQ0FBMkIsV0FBYzs7UUFDMUUsWUFBTyxLQUFNLFNBQVEsV0FBVztnQkFJOUIsTUFBTSxDQUFDLE1BQU07b0JBQ1gsT0FBTyxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDbEMsQ0FBQzthQUNGO1lBTlEsWUFBUyxHQUFHLEtBQU07WUFDbEIsY0FBVyxHQUFHLE9BQVE7ZUFLN0I7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxHQUFHLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEQ7Ozs7Ozs7R0FPRztBQUNVLFFBQUEsSUFBSSxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxEOzs7Ozs7O0dBT0c7QUFDVSxRQUFBLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVoRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxNQUFNLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlQ29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuLyogU2ltcGxlIGZhY3RvcnkgZm9yIGdlbmVyYXRpbmcgdGhlIHJvdXRlcyBkZWNvcmF0b3JzICovXG5jb25zdCByb3V0ZURlY29yYXRvckZhY3RvcnkgPSAobWV0aG9kKTogRnVuY3Rpb24gPT4ge1xuICByZXR1cm4gKHJvdXRlOiBzdHJpbmcsIGZpbHRlcnM6IEZ1bmN0aW9uW10gPSBbXSkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiBnZXRSb3V0ZURlY29yYXRvcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgdGFyZ2V0LnJvdXRlcyA9IHRhcmdldC5yb3V0ZXMgfHwge307XG4gICAgICB0YXJnZXQucm91dGVzW21ldGhvZF0gPSB0YXJnZXQucm91dGVzW21ldGhvZF0gfHwge307XG4gICAgICB0YXJnZXQucm91dGVzW21ldGhvZF1bcm91dGVdID0ge1xuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBjb250cm9sbGVyOiB0YXJnZXRba2V5XS5iaW5kKHRhcmdldClcbiAgICAgIH07XG4gICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICB9O1xuICB9O1xufTtcblxuLyoqXG4gKiBUaGUgQENvbnRyb2xsZXIgZGVjb3JhdG9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByb3V0ZSBUaGUgcm91dGUgdG8gYmUgYXNzaWduZWQgdG8gYWxsIG1ldGhvZHMgb2YgZGVjb3JhdGVkIGNsYXNzLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgYWxsIG1ldGhvZHMgb2YgZGVjb3JhdGVkIGNsYXNzLlxuICovXG5leHBvcnQgY29uc3QgQ29udHJvbGxlciA9IChyb3V0ZT86IHN0cmluZywgZmlsdGVyczogRnVuY3Rpb25bXSA9IFtdKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiBjb250cm9sbGVyRGVjb3JhdG9yPFQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlcj4oY29uc3RydWN0b3I6IFQpIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBjb25zdHJ1Y3RvciB7XG4gICAgICBzdGF0aWMgYmFzZVJvdXRlID0gcm91dGU7XG4gICAgICBzdGF0aWMgYmFzZUZpbHRlcnMgPSBmaWx0ZXJzO1xuXG4gICAgICBzdGF0aWMgcm91dGVzKCkge1xuICAgICAgICByZXR1cm4gY29uc3RydWN0b3Iucm91dGVzIHx8IHt9O1xuICAgICAgfVxuICAgIH07XG4gIH07XG59O1xuXG4vKipcbiAqIFRoZSBAR2V0IHJvdXRlIGRlY29yYXRvci5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBiZSBjYWxsZWQgYmVmb3JlIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICovXG5leHBvcnQgY29uc3QgR2V0ID0gcm91dGVEZWNvcmF0b3JGYWN0b3J5KFwiZ2V0XCIpO1xuXG4vKipcbiAqIFRoZSBAUG9zdCByb3V0ZSBkZWNvcmF0b3IuXG4gKlxuICogQHR5cGUge0Z1bmN0aW9ufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByb3V0ZSBUaGUgcm91dGUgdG8gYmUgYXNzaWduZWQgdG8gdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW119IGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYmUgY2FsbGVkIGJlZm9yZSB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqL1xuZXhwb3J0IGNvbnN0IFBvc3QgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJwb3N0XCIpO1xuXG4vKipcbiAqIFRoZSBAUHV0IHJvdXRlIGRlY29yYXRvci5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBiZSBjYWxsZWQgYmVmb3JlIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICovXG5leHBvcnQgY29uc3QgUHV0ID0gcm91dGVEZWNvcmF0b3JGYWN0b3J5KFwicHV0XCIpO1xuXG4vKipcbiAqIFRoZSBARGVsZXRlIHJvdXRlIGRlY29yYXRvci5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBiZSBjYWxsZWQgYmVmb3JlIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICovXG5leHBvcnQgY29uc3QgRGVsZXRlID0gcm91dGVEZWNvcmF0b3JGYWN0b3J5KFwiZGVsZXRlXCIpO1xuIl19