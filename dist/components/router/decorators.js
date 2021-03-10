"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
/* Simple factory for generating the routes decorators */
const routeDecoratorFactory = (method) => {
    return (route, filters = []) => {
        return function getRouteDecorator(target, key, descriptor) {
            target.routes = target.routes || {};
            target.routes[method] = target.routes[method] || {};
            target.routes[method][route] = {
                filters,
                controller: { target, key }
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
const Controller = (route, filters = []) => {
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
exports.Controller = Controller;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL3JvdXRlci9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlEQUF5RDtBQUN6RCxNQUFNLHFCQUFxQixHQUFHLENBQUMsTUFBYyxFQUFZLEVBQUU7SUFDekQsT0FBTyxDQUFDLEtBQWEsRUFBRSxVQUFzQixFQUFFLEVBQUUsRUFBRTtRQUNqRCxPQUFPLFNBQVMsaUJBQWlCLENBQUMsTUFBc0IsRUFBRSxHQUFXLEVBQUUsVUFBOEI7WUFDbkcsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQzdCLE9BQU87Z0JBQ1AsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTthQUM1QixDQUFDO1lBQ0YsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSSxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWMsRUFBRSxVQUFzQixFQUFFLEVBQUUsRUFBRTtJQUNyRSxPQUFPLFNBQVMsbUJBQW1CLENBQTJCLFdBQWM7O1FBQzFFLFlBQU8sS0FBTSxTQUFRLFdBQVc7Z0JBSTlCLE1BQU0sQ0FBQyxNQUFNO29CQUNYLE9BQU8sV0FBVyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLENBQUM7YUFDRjtZQU5RLFlBQVMsR0FBRyxLQUFNO1lBQ2xCLGNBQVcsR0FBRyxPQUFRO2VBSzdCO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWFcsUUFBQSxVQUFVLGNBV3JCO0FBRUY7Ozs7Ozs7R0FPRztBQUNVLFFBQUEsR0FBRyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRWhEOzs7Ozs7O0dBT0c7QUFDVSxRQUFBLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsRDs7Ozs7OztHQU9HO0FBQ1UsUUFBQSxHQUFHLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEQ7Ozs7Ozs7R0FPRztBQUNVLFFBQUEsTUFBTSxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbi8qIFNpbXBsZSBmYWN0b3J5IGZvciBnZW5lcmF0aW5nIHRoZSByb3V0ZXMgZGVjb3JhdG9ycyAqL1xuY29uc3Qgcm91dGVEZWNvcmF0b3JGYWN0b3J5ID0gKG1ldGhvZDogc3RyaW5nKTogRnVuY3Rpb24gPT4ge1xuICByZXR1cm4gKHJvdXRlOiBzdHJpbmcsIGZpbHRlcnM6IEZ1bmN0aW9uW10gPSBbXSkgPT4ge1xuICAgIHJldHVybiBmdW5jdGlvbiBnZXRSb3V0ZURlY29yYXRvcih0YXJnZXQ6IEJhc2VDb250cm9sbGVyLCBrZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgICB0YXJnZXQucm91dGVzID0gdGFyZ2V0LnJvdXRlcyB8fCB7fTtcbiAgICAgIHRhcmdldC5yb3V0ZXNbbWV0aG9kXSA9IHRhcmdldC5yb3V0ZXNbbWV0aG9kXSB8fCB7fTtcbiAgICAgIHRhcmdldC5yb3V0ZXNbbWV0aG9kXVtyb3V0ZV0gPSB7XG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGNvbnRyb2xsZXI6IHsgdGFyZ2V0LCBrZXkgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgIH07XG4gIH07XG59O1xuXG4vKipcbiAqIFRoZSBAQ29udHJvbGxlciBkZWNvcmF0b3IuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byBhbGwgbWV0aG9kcyBvZiBkZWNvcmF0ZWQgY2xhc3MuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW119IGZpbHRlcnMgVGhlIGZpbHRlcnMgdG8gYmUgY2FsbGVkIGJlZm9yZSBhbGwgbWV0aG9kcyBvZiBkZWNvcmF0ZWQgY2xhc3MuXG4gKi9cbmV4cG9ydCBjb25zdCBDb250cm9sbGVyID0gKHJvdXRlPzogc3RyaW5nLCBmaWx0ZXJzOiBGdW5jdGlvbltdID0gW10pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbnRyb2xsZXJEZWNvcmF0b3I8VCBleHRlbmRzIEJhc2VDb250cm9sbGVyPihjb25zdHJ1Y3RvcjogVCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgIHN0YXRpYyBiYXNlUm91dGUgPSByb3V0ZTtcbiAgICAgIHN0YXRpYyBiYXNlRmlsdGVycyA9IGZpbHRlcnM7XG5cbiAgICAgIHN0YXRpYyByb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yb3V0ZXMgfHwge307XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbi8qKlxuICogVGhlIEBHZXQgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBHZXQgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJnZXRcIik7XG5cbi8qKlxuICogVGhlIEBQb3N0IHJvdXRlIGRlY29yYXRvci5cbiAqXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvdXRlIFRoZSByb3V0ZSB0byBiZSBhc3NpZ25lZCB0byB0aGUgZGVjb3JhdGVkIG1ldGhvZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gZmlsdGVycyBUaGUgZmlsdGVycyB0byBiZSBjYWxsZWQgYmVmb3JlIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICovXG5leHBvcnQgY29uc3QgUG9zdCA9IHJvdXRlRGVjb3JhdG9yRmFjdG9yeShcInBvc3RcIik7XG5cbi8qKlxuICogVGhlIEBQdXQgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBQdXQgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJwdXRcIik7XG5cbi8qKlxuICogVGhlIEBEZWxldGUgcm91dGUgZGVjb3JhdG9yLlxuICpcbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcm91dGUgVGhlIHJvdXRlIHRvIGJlIGFzc2lnbmVkIHRvIHRoZSBkZWNvcmF0ZWQgbWV0aG9kLlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmaWx0ZXJzIFRoZSBmaWx0ZXJzIHRvIGJlIGNhbGxlZCBiZWZvcmUgdGhlIGRlY29yYXRlZCBtZXRob2QuXG4gKi9cbmV4cG9ydCBjb25zdCBEZWxldGUgPSByb3V0ZURlY29yYXRvckZhY3RvcnkoXCJkZWxldGVcIik7XG4iXX0=