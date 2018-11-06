"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const HttpError_1 = require("../../error/http/HttpError");
const HttpCode_1 = require("../../error/http/HttpCode");
const fclone_1 = require("fclone");
exports.default = {
    error(res) {
        return (error) => {
            if (error instanceof HttpError_1.default) {
                res.status(error.status).json(error.toJSON());
            }
            else if (typeof error === "string") {
                res.status(HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR).json({
                    message: error,
                    stack: new Error().stack,
                    details: {}
                });
            }
            else {
                res.status(error.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR).json({
                    message: error.message,
                    stack: error.stack,
                    details: error
                });
            }
        };
    },
    success(res) {
        return (data = {}) => {
            let d = data;
            // If is array, iterate over the elements
            if (data && util.isArray(data)) {
                // Try to call toJSON of each element, if available
                // This will ease the work with Mongoose models as responses
                d = data.map(d => (d && util.isFunction(d.toJSON) ? d.toJSON() : d));
            }
            else if (data && util.isFunction(data.toJSON)) {
                // Try to call toJSON of the response, if available
                // This will ease the work with Mongoose models as responses
                d = data.toJSON();
            }
            // Drop circular references
            const safeData = fclone_1.default(d);
            res
                .status(HttpCode_1.HttpSuccess.OK)
                .set("Content-Type", "application/json")
                .send(safeData);
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBSTdCLDBEQUFrRTtBQUNsRSx3REFBMEU7QUFDMUUsbUNBQTRCO0FBb0I1QixrQkFBZTtJQUNiLEtBQUssQ0FBQyxHQUFhO1FBQ2pCLE9BQU8sQ0FBQyxLQUFpQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxLQUFLLFlBQVksbUJBQVMsRUFBRTtnQkFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN6RDtpQkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEQsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSztvQkFDeEIsT0FBTyxFQUFFLEVBQUU7aUJBQ1osQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBRSxLQUFhLENBQUMsTUFBTSxJQUFJLDJCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMvRSxPQUFPLEVBQUcsS0FBYSxDQUFDLE9BQU87b0JBQy9CLEtBQUssRUFBRyxLQUFhLENBQUMsS0FBSztvQkFDM0IsT0FBTyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQWE7UUFDbkIsT0FBTyxDQUFDLE9BQVksRUFBRSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRWIseUNBQXlDO1lBQ3pDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLG1EQUFtRDtnQkFDbkQsNERBQTREO2dCQUM1RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEU7aUJBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9DLG1EQUFtRDtnQkFDbkQsNERBQTREO2dCQUM1RCxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBRUQsMkJBQTJCO1lBQzNCLE1BQU0sUUFBUSxHQUFHLGdCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0IsR0FBRztpQkFDQSxNQUFNLENBQUMsc0JBQVcsQ0FBQyxFQUFFLENBQUM7aUJBQ3RCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSBcIndpbnN0b25cIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIEh0dHBFcnJvciB9IGZyb20gXCIuLi8uLi9lcnJvci9odHRwL0h0dHBFcnJvclwiO1xuaW1wb3J0IHsgSHR0cFNlcnZlckVycm9ycywgSHR0cFN1Y2Nlc3MgfSBmcm9tIFwiLi4vLi4vZXJyb3IvaHR0cC9IdHRwQ29kZVwiO1xuaW1wb3J0IGZjbG9uZSBmcm9tIFwiZmNsb25lXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVJlcXVlc3QgZXh0ZW5kcyBSZXF1ZXN0IHtcbiAgdXNlcj86IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcGFyYW0obmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VSZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcbiAgZXJyb3Ioc3RhdHVzOiBudW1iZXIsIGVycm9yOiBFcnJvcik6IHZvaWQ7XG5cbiAgZXJyb3Ioc3RhdHVzOiBudW1iZXIsIGVycm9yOiBCYXNlRXJyb3IpOiB2b2lkO1xuXG4gIGVycm9yKHN0YXR1czogbnVtYmVyLCBlcnJvck1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XG5cbiAgZXJyb3IoZXJyb3I6IEh0dHBFcnJvcik6IHZvaWQ7XG5cbiAgc3VjY2VzcyhkYXRhPzogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBlcnJvcihyZXM6IFJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIChlcnJvcjogU3RyaW5nIHwgRXJyb3IgfCBIdHRwRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBFcnJvcikge1xuICAgICAgICByZXMuc3RhdHVzKGVycm9yLnN0YXR1cyBhcyBudW1iZXIpLmpzb24oZXJyb3IudG9KU09OKCkpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmVzLnN0YXR1cyhIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUikuanNvbih7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IsXG4gICAgICAgICAgc3RhY2s6IG5ldyBFcnJvcigpLnN0YWNrLFxuICAgICAgICAgIGRldGFpbHM6IHt9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnN0YXR1cygoZXJyb3IgYXMgYW55KS5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpLmpzb24oe1xuICAgICAgICAgIG1lc3NhZ2U6IChlcnJvciBhcyBhbnkpLm1lc3NhZ2UsXG4gICAgICAgICAgc3RhY2s6IChlcnJvciBhcyBhbnkpLnN0YWNrLFxuICAgICAgICAgIGRldGFpbHM6IGVycm9yXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgc3VjY2VzcyhyZXM6IFJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIChkYXRhOiBhbnkgPSB7fSkgPT4ge1xuICAgICAgbGV0IGQgPSBkYXRhO1xuXG4gICAgICAvLyBJZiBpcyBhcnJheSwgaXRlcmF0ZSBvdmVyIHRoZSBlbGVtZW50c1xuICAgICAgaWYgKGRhdGEgJiYgdXRpbC5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIC8vIFRyeSB0byBjYWxsIHRvSlNPTiBvZiBlYWNoIGVsZW1lbnQsIGlmIGF2YWlsYWJsZVxuICAgICAgICAvLyBUaGlzIHdpbGwgZWFzZSB0aGUgd29yayB3aXRoIE1vbmdvb3NlIG1vZGVscyBhcyByZXNwb25zZXNcbiAgICAgICAgZCA9IGRhdGEubWFwKGQgPT4gKGQgJiYgdXRpbC5pc0Z1bmN0aW9uKGQudG9KU09OKSA/IGQudG9KU09OKCkgOiBkKSk7XG4gICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgdXRpbC5pc0Z1bmN0aW9uKGRhdGEudG9KU09OKSkge1xuICAgICAgICAvLyBUcnkgdG8gY2FsbCB0b0pTT04gb2YgdGhlIHJlc3BvbnNlLCBpZiBhdmFpbGFibGVcbiAgICAgICAgLy8gVGhpcyB3aWxsIGVhc2UgdGhlIHdvcmsgd2l0aCBNb25nb29zZSBtb2RlbHMgYXMgcmVzcG9uc2VzXG4gICAgICAgIGQgPSBkYXRhLnRvSlNPTigpO1xuICAgICAgfVxuXG4gICAgICAvLyBEcm9wIGNpcmN1bGFyIHJlZmVyZW5jZXNcbiAgICAgIGNvbnN0IHNhZmVEYXRhID0gZmNsb25lKGQpO1xuXG4gICAgICByZXNcbiAgICAgICAgLnN0YXR1cyhIdHRwU3VjY2Vzcy5PSylcbiAgICAgICAgLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIilcbiAgICAgICAgLnNlbmQoc2FmZURhdGEpO1xuICAgIH07XG4gIH1cbn07XG4iXX0=