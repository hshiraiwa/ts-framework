"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const asyncMiddleware = (functions) => {
    let fns = functions;
    // Ensure input as an array
    if (!util.isArray(fns)) {
        fns = [fns];
    }
    // Map the array of filters and controllers with a Promise wrapper for express error handling
    return fns.map(fn => (req, res, next) => {
        if (!util.isFunction(fn)) {
            let msg = 'Async middleware cannot wrap something that is not a function, got ' + typeof fn + '';
            if (util.isString(fn)) {
                msg = `${msg}: "${fn}"`;
            }
            throw new Error(msg);
        }
        try {
            return Promise.resolve(fn(req, res, next)).catch(next);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = asyncMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tcG9uZW50cy9taWRkbGV3YXJlcy9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUc3QixNQUFNLGVBQWUsR0FBRyxDQUFDLFNBQWdDLEVBQUUsRUFBRTtJQUMzRCxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7SUFFcEIsMkJBQTJCO0lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFDRCw2RkFBNkY7SUFDN0YsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQVMsRUFBRSxFQUFFO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLElBQUksR0FBRyxHQUFHLHFFQUFxRSxHQUFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNqRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JCLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxFQUFFLEdBQUcsQ0FBQzthQUN6QjtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJO1lBQ0YsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDYjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IGFzeW5jTWlkZGxld2FyZSA9IChmdW5jdGlvbnM6IEZ1bmN0aW9uIHwgRnVuY3Rpb25bXSkgPT4ge1xuICBsZXQgZm5zID0gZnVuY3Rpb25zO1xuICBcbiAgLy8gRW5zdXJlIGlucHV0IGFzIGFuIGFycmF5XG4gIGlmICghdXRpbC5pc0FycmF5KGZucykpIHtcbiAgICBmbnMgPSBbZm5zXTtcbiAgfVxuICAvLyBNYXAgdGhlIGFycmF5IG9mIGZpbHRlcnMgYW5kIGNvbnRyb2xsZXJzIHdpdGggYSBQcm9taXNlIHdyYXBwZXIgZm9yIGV4cHJlc3MgZXJyb3IgaGFuZGxpbmdcbiAgcmV0dXJuIGZucy5tYXAoZm4gPT4gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogYW55KSA9PiB7XG4gICAgaWYgKCF1dGlsLmlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICBsZXQgbXNnID0gJ0FzeW5jIG1pZGRsZXdhcmUgY2Fubm90IHdyYXAgc29tZXRoaW5nIHRoYXQgaXMgbm90IGEgZnVuY3Rpb24sIGdvdCAnICsgdHlwZW9mIGZuICsgJyc7XG4gICAgICBpZiAodXRpbC5pc1N0cmluZyhmbikpIHtcbiAgICAgICAgbXNnID0gYCR7bXNnfTogXCIke2ZufVwiYDtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmbihyZXEsIHJlcywgbmV4dCkpLmNhdGNoKG5leHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBuZXh0KGVycm9yKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmNNaWRkbGV3YXJlO1xuIl19