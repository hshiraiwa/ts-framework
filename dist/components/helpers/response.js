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
            else if (typeof error === 'string') {
                res.status(HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR).json({
                    message: error,
                    stack: (new Error()).stack,
                    details: {},
                });
            }
            else {
                res.status(error.status || HttpCode_1.HttpServerErrors.INTERNAL_SERVER_ERROR).json({
                    message: error.message,
                    stack: error.stack,
                    details: error,
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
                d = data.map(d => (d && util.isFunction(d.toJSON)) ? d.toJSON() : d);
            }
            else if (data && util.isFunction(data.toJSON)) {
                // Try to call toJSON of the response, if available
                // This will ease the work with Mongoose models as responses
                d = data.toJSON();
            }
            // Drop circular references
            const safeData = fclone_1.default(d);
            res.status(HttpCode_1.HttpSuccess.OK).set('Content-Type', "application/json").send(safeData);
        };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tcG9uZW50cy9oZWxwZXJzL3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBSTdCLDBEQUFrRTtBQUNsRSx3REFBMEU7QUFDMUUsbUNBQTRCO0FBb0I1QixrQkFBZTtJQUViLEtBQUssQ0FBQyxHQUFhO1FBQ2pCLE9BQU8sQ0FBQyxLQUFpQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxLQUFLLFlBQVksbUJBQVMsRUFBRTtnQkFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN6RDtpQkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQywyQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEQsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsS0FBSyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7b0JBQzFCLE9BQU8sRUFBRSxFQUFFO2lCQUNaLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUUsS0FBYSxDQUFDLE1BQU0sSUFBSSwyQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDL0UsT0FBTyxFQUFHLEtBQWEsQ0FBQyxPQUFPO29CQUMvQixLQUFLLEVBQUcsS0FBYSxDQUFDLEtBQUs7b0JBQzNCLE9BQU8sRUFBRSxLQUFLO2lCQUNmLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFhO1FBQ25CLE9BQU8sQ0FBQyxPQUFZLEVBQUUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUViLHlDQUF5QztZQUN6QyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixtREFBbUQ7Z0JBQ25ELDREQUE0RDtnQkFDNUQsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQyxtREFBbUQ7Z0JBQ25ELDREQUE0RDtnQkFDNUQsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNuQjtZQUVELDJCQUEyQjtZQUMzQixNQUFNLFFBQVEsR0FBRyxnQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCB7IExvZ2dlckluc3RhbmNlIH0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIEh0dHBFcnJvciB9IGZyb20gJy4uLy4uL2Vycm9yL2h0dHAvSHR0cEVycm9yJztcbmltcG9ydCB7IEh0dHBTZXJ2ZXJFcnJvcnMsIEh0dHBTdWNjZXNzIH0gZnJvbSAnLi4vLi4vZXJyb3IvaHR0cC9IdHRwQ29kZSc7XG5pbXBvcnQgZmNsb25lIGZyb20gJ2ZjbG9uZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVJlcXVlc3QgZXh0ZW5kcyBSZXF1ZXN0IHtcbiAgdXNlcj86IGFueTtcbiAgbG9nZ2VyOiBMb2dnZXJJbnN0YW5jZTtcbiAgcGFyYW0obmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VSZXNwb25zZSBleHRlbmRzIFJlc3BvbnNlIHtcbiAgZXJyb3Ioc3RhdHVzOiBudW1iZXIsIGVycm9yOiBFcnJvcik6IHZvaWQ7XG5cbiAgZXJyb3Ioc3RhdHVzOiBudW1iZXIsIGVycm9yOiBCYXNlRXJyb3IpOiB2b2lkO1xuXG4gIGVycm9yKHN0YXR1czogbnVtYmVyLCBlcnJvck1lc3NhZ2U6IHN0cmluZyk6IHZvaWQ7XG5cbiAgZXJyb3IoZXJyb3I6IEh0dHBFcnJvcik6IHZvaWQ7XG5cbiAgc3VjY2VzcyhkYXRhPzogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gIGVycm9yKHJlczogUmVzcG9uc2UpIHtcbiAgICByZXR1cm4gKGVycm9yOiBTdHJpbmcgfCBFcnJvciB8IEh0dHBFcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSHR0cEVycm9yKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzIGFzIG51bWJlcikuanNvbihlcnJvci50b0pTT04oKSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzLnN0YXR1cyhIdHRwU2VydmVyRXJyb3JzLklOVEVSTkFMX1NFUlZFUl9FUlJPUikuanNvbih7XG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IsXG4gICAgICAgICAgc3RhY2s6IChuZXcgRXJyb3IoKSkuc3RhY2ssXG4gICAgICAgICAgZGV0YWlsczoge30sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnN0YXR1cygoZXJyb3IgYXMgYW55KS5zdGF0dXMgfHwgSHR0cFNlcnZlckVycm9ycy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpLmpzb24oe1xuICAgICAgICAgIG1lc3NhZ2U6IChlcnJvciBhcyBhbnkpLm1lc3NhZ2UsXG4gICAgICAgICAgc3RhY2s6IChlcnJvciBhcyBhbnkpLnN0YWNrLFxuICAgICAgICAgIGRldGFpbHM6IGVycm9yLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHN1Y2Nlc3MocmVzOiBSZXNwb25zZSkge1xuICAgIHJldHVybiAoZGF0YTogYW55ID0ge30pID0+IHtcbiAgICAgIGxldCBkID0gZGF0YTtcblxuICAgICAgLy8gSWYgaXMgYXJyYXksIGl0ZXJhdGUgb3ZlciB0aGUgZWxlbWVudHNcbiAgICAgIGlmIChkYXRhICYmIHV0aWwuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAvLyBUcnkgdG8gY2FsbCB0b0pTT04gb2YgZWFjaCBlbGVtZW50LCBpZiBhdmFpbGFibGVcbiAgICAgICAgLy8gVGhpcyB3aWxsIGVhc2UgdGhlIHdvcmsgd2l0aCBNb25nb29zZSBtb2RlbHMgYXMgcmVzcG9uc2VzXG4gICAgICAgIGQgPSBkYXRhLm1hcChkID0+IChkICYmIHV0aWwuaXNGdW5jdGlvbihkLnRvSlNPTikpID8gZC50b0pTT04oKSA6IGQpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhICYmIHV0aWwuaXNGdW5jdGlvbihkYXRhLnRvSlNPTikpIHtcbiAgICAgICAgLy8gVHJ5IHRvIGNhbGwgdG9KU09OIG9mIHRoZSByZXNwb25zZSwgaWYgYXZhaWxhYmxlXG4gICAgICAgIC8vIFRoaXMgd2lsbCBlYXNlIHRoZSB3b3JrIHdpdGggTW9uZ29vc2UgbW9kZWxzIGFzIHJlc3BvbnNlc1xuICAgICAgICBkID0gZGF0YS50b0pTT04oKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gRHJvcCBjaXJjdWxhciByZWZlcmVuY2VzXG4gICAgICBjb25zdCBzYWZlRGF0YSA9IGZjbG9uZShkKTtcbiAgICAgIFxuICAgICAgcmVzLnN0YXR1cyhIdHRwU3VjY2Vzcy5PSykuc2V0KCdDb250ZW50LVR5cGUnLCBcImFwcGxpY2F0aW9uL2pzb25cIikuc2VuZChzYWZlRGF0YSk7XG4gICAgfTtcbiAgfSxcbn07XG4iXX0=