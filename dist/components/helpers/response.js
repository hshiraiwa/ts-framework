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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBRzdCLDBEQUFrRTtBQUNsRSx3REFBMEU7QUFDMUUsbUNBQTRCO0FBb0I1QixrQkFBZTtJQUNiLEtBQUssQ0FBQyxHQUFhO1FBQ2pCLE9BQU8sQ0FBQyxLQUFpQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxLQUFLLFlBQVksbUJBQVMsRUFBRTtnQkFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN6RDtpQkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEQsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSztvQkFDeEIsT0FBTyxFQUFFLEVBQUU7aUJBQ1osQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBRSxLQUFhLENBQUMsTUFBTSxJQUFJLDJCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMvRSxPQUFPLEVBQUcsS0FBYSxDQUFDLE9BQU87b0JBQy9CLEtBQUssRUFBRyxLQUFhLENBQUMsS0FBSztvQkFDM0IsT0FBTyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQWE7UUFDbkIsT0FBTyxDQUFDLE9BQVksRUFBRSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBRWIseUNBQXlDO1lBQ3pDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlCLG1EQUFtRDtnQkFDbkQsNERBQTREO2dCQUM1RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEU7aUJBQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9DLG1EQUFtRDtnQkFDbkQsNERBQTREO2dCQUM1RCxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ25CO1lBRUQsMkJBQTJCO1lBQzNCLE1BQU0sUUFBUSxHQUFHLGdCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0IsR0FBRztpQkFDQSxNQUFNLENBQUMsc0JBQVcsQ0FBQyxFQUFFLENBQUM7aUJBQ3RCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IEJhc2VFcnJvciwgTG9nZ2VySW5zdGFuY2UgfSBmcm9tIFwidHMtZnJhbWV3b3JrLWNvbW1vblwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBIdHRwRXJyb3IgfSBmcm9tIFwiLi4vLi4vZXJyb3IvaHR0cC9IdHRwRXJyb3JcIjtcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMsIEh0dHBTdWNjZXNzIH0gZnJvbSBcIi4uLy4uL2Vycm9yL2h0dHAvSHR0cENvZGVcIjtcbmltcG9ydCBmY2xvbmUgZnJvbSBcImZjbG9uZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VSZXF1ZXN0IGV4dGVuZHMgUmVxdWVzdCB7XG4gIHVzZXI/OiBhbnk7XG4gIGxvZ2dlcjogTG9nZ2VySW5zdGFuY2U7XG4gIHBhcmFtKG5hbWU6IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55KTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlUmVzcG9uc2UgZXh0ZW5kcyBSZXNwb25zZSB7XG4gIGVycm9yKHN0YXR1czogbnVtYmVyLCBlcnJvcjogRXJyb3IpOiB2b2lkO1xuXG4gIGVycm9yKHN0YXR1czogbnVtYmVyLCBlcnJvcjogQmFzZUVycm9yKTogdm9pZDtcblxuICBlcnJvcihzdGF0dXM6IG51bWJlciwgZXJyb3JNZXNzYWdlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIGVycm9yKGVycm9yOiBIdHRwRXJyb3IpOiB2b2lkO1xuXG4gIHN1Y2Nlc3MoZGF0YT86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZXJyb3IocmVzOiBSZXNwb25zZSkge1xuICAgIHJldHVybiAoZXJyb3I6IFN0cmluZyB8IEVycm9yIHwgSHR0cEVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIdHRwRXJyb3IpIHtcbiAgICAgICAgcmVzLnN0YXR1cyhlcnJvci5zdGF0dXMgYXMgbnVtYmVyKS5qc29uKGVycm9yLnRvSlNPTigpKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpLmpzb24oe1xuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLFxuICAgICAgICAgIHN0YWNrOiBuZXcgRXJyb3IoKS5zdGFjayxcbiAgICAgICAgICBkZXRhaWxzOiB7fVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zdGF0dXMoKGVycm9yIGFzIGFueSkuc3RhdHVzIHx8IEh0dHBTZXJ2ZXJFcnJvcnMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKS5qc29uKHtcbiAgICAgICAgICBtZXNzYWdlOiAoZXJyb3IgYXMgYW55KS5tZXNzYWdlLFxuICAgICAgICAgIHN0YWNrOiAoZXJyb3IgYXMgYW55KS5zdGFjayxcbiAgICAgICAgICBkZXRhaWxzOiBlcnJvclxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHN1Y2Nlc3MocmVzOiBSZXNwb25zZSkge1xuICAgIHJldHVybiAoZGF0YTogYW55ID0ge30pID0+IHtcbiAgICAgIGxldCBkID0gZGF0YTtcblxuICAgICAgLy8gSWYgaXMgYXJyYXksIGl0ZXJhdGUgb3ZlciB0aGUgZWxlbWVudHNcbiAgICAgIGlmIChkYXRhICYmIHV0aWwuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAvLyBUcnkgdG8gY2FsbCB0b0pTT04gb2YgZWFjaCBlbGVtZW50LCBpZiBhdmFpbGFibGVcbiAgICAgICAgLy8gVGhpcyB3aWxsIGVhc2UgdGhlIHdvcmsgd2l0aCBNb25nb29zZSBtb2RlbHMgYXMgcmVzcG9uc2VzXG4gICAgICAgIGQgPSBkYXRhLm1hcChkID0+IChkICYmIHV0aWwuaXNGdW5jdGlvbihkLnRvSlNPTikgPyBkLnRvSlNPTigpIDogZCkpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhICYmIHV0aWwuaXNGdW5jdGlvbihkYXRhLnRvSlNPTikpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGNhbGwgdG9KU09OIG9mIHRoZSByZXNwb25zZSwgaWYgYXZhaWxhYmxlXG4gICAgICAgIC8vIFRoaXMgd2lsbCBlYXNlIHRoZSB3b3JrIHdpdGggTW9uZ29vc2UgbW9kZWxzIGFzIHJlc3BvbnNlc1xuICAgICAgICBkID0gZGF0YS50b0pTT04oKTtcbiAgICAgIH1cblxuICAgICAgLy8gRHJvcCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICBjb25zdCBzYWZlRGF0YSA9IGZjbG9uZShkKTtcblxuICAgICAgcmVzXG4gICAgICAgIC5zdGF0dXMoSHR0cFN1Y2Nlc3MuT0spXG4gICAgICAgIC5zZXQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpXG4gICAgICAgIC5zZW5kKHNhZmVEYXRhKTtcbiAgICB9O1xuICB9XG59O1xuIl19