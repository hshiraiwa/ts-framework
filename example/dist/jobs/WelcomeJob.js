"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_framework_common_1 = require("ts-framework-common");
class WelcomeJob extends ts_framework_common_1.Job {
    run(server) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('Welcome, my friend!');
            // Do something async so process won't be killed
            setInterval(() => void (0), 10000);
        });
    }
}
exports.default = WelcomeJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VsY29tZUpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9qb2JzL1dlbGNvbWVKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZEQUFpRTtBQUdqRSxNQUFxQixVQUFXLFNBQVEseUJBQUc7SUFDNUIsR0FBRyxDQUFDLE1BQWtCOztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXhDLGdEQUFnRDtZQUNoRCxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtDQUNGO0FBUEQsNkJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRXJyb3IsIEpvYiwgSm9iT3B0aW9ucyB9IGZyb20gXCJ0cy1mcmFtZXdvcmstY29tbW9uXCI7XG5pbXBvcnQgTWFpblNlcnZlciBmcm9tICcuLi9zZXJ2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWxjb21lSm9iIGV4dGVuZHMgSm9iIHtcbiAgcHVibGljIGFzeW5jIHJ1bihzZXJ2ZXI6IE1haW5TZXJ2ZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdXZWxjb21lLCBteSBmcmllbmQhJyk7XG5cbiAgICAvLyBEbyBzb21ldGhpbmcgYXN5bmMgc28gcHJvY2VzcyB3b24ndCBiZSBraWxsZWRcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB2b2lkKDApLCAxMDAwMCk7XG4gIH1cbn0iXX0=