"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../helpers/response");
exports.default = (req, res, next) => {
    res.error = response_1.default.error(res);
    res.success = response_1.default.success(res);
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2VCaW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc2VydmVyL21pZGRsZXdhcmVzL3Jlc3BvbnNlQmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQTJDO0FBRTNDLGtCQUFlLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFjLEVBQUUsRUFBRTtJQUNwRCxHQUFHLENBQUMsS0FBSyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsa0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzcG9uc2UgZnJvbSAnLi4vaGVscGVycy9yZXNwb25zZSc7XG5cbmV4cG9ydCBkZWZhdWx0IChyZXE6IGFueSwgcmVzOiBhbnksIG5leHQ6IEZ1bmN0aW9uKSA9PiB7XG4gIHJlcy5lcnJvciA9IHJlc3BvbnNlLmVycm9yKHJlcyk7XG4gIHJlcy5zdWNjZXNzID0gcmVzcG9uc2Uuc3VjY2VzcyhyZXMpO1xuICBuZXh0KCk7XG59O1xuIl19