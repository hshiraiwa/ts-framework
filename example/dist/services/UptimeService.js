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
class UptimeService extends ts_framework_common_1.Service {
    constructor(options) {
        super(options);
        this.history = {
            constructed: 0,
            mounted: 0,
            initialized: 0,
            ready: 0,
            unmounted: 0,
        };
        this.history.constructed = Date.now();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UptimeService({});
        }
        return this.instance;
    }
    onMount() {
        this.history.mounted = Date.now();
    }
    onUnmount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.history.unmounted = Date.now();
        });
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.history.initialized = Date.now();
        });
    }
    onReady() {
        return __awaiter(this, void 0, void 0, function* () {
            this.history.ready = Date.now();
        });
    }
    uptime() {
        if (this.history.ready) {
            // Ensure uptime is never zero after isReady
            return Math.max(1, Date.now() - this.history.ready);
        }
        return 0;
    }
}
exports.default = UptimeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXB0aW1lU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9zZXJ2aWNlcy9VcHRpbWVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2REFBOEM7QUFHOUMsTUFBcUIsYUFBYyxTQUFRLDZCQUFPO0lBV2hELFlBQVksT0FBTztRQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFUakIsWUFBTyxHQUFHO1lBQ1IsV0FBVyxFQUFFLENBQUM7WUFDZCxPQUFPLEVBQUUsQ0FBQztZQUNWLFdBQVcsRUFBRSxDQUFDO1lBQ2QsS0FBSyxFQUFFLENBQUM7WUFDUixTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUM7UUFJQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELE9BQU87UUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUNLLFNBQVM7O1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUNLLE1BQU07O1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUNLLE9BQU87O1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUNELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RCLDRDQUE0QztZQUM1QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0NBQ0Y7QUF4Q0QsZ0NBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VydmljZSB9IGZyb20gJ3RzLWZyYW1ld29yay1jb21tb24nO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwdGltZVNlcnZpY2UgZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFVwdGltZVNlcnZpY2U7XG5cbiAgaGlzdG9yeSA9IHtcbiAgICBjb25zdHJ1Y3RlZDogMCxcbiAgICBtb3VudGVkOiAwLFxuICAgIGluaXRpYWxpemVkOiAwLFxuICAgIHJlYWR5OiAwLFxuICAgIHVubW91bnRlZDogMCxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5oaXN0b3J5LmNvbnN0cnVjdGVkID0gRGF0ZS5ub3coKTtcbiAgfVxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBVcHRpbWVTZXJ2aWNlKHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cbiAgb25Nb3VudCgpIHtcbiAgICB0aGlzLmhpc3RvcnkubW91bnRlZCA9IERhdGUubm93KCk7XG4gIH1cbiAgYXN5bmMgb25Vbm1vdW50KCkge1xuICAgIHRoaXMuaGlzdG9yeS51bm1vdW50ZWQgPSBEYXRlLm5vdygpO1xuICB9XG4gIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmhpc3RvcnkuaW5pdGlhbGl6ZWQgPSBEYXRlLm5vdygpO1xuICB9XG4gIGFzeW5jIG9uUmVhZHkoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5oaXN0b3J5LnJlYWR5ID0gRGF0ZS5ub3coKTtcbiAgfVxuICB1cHRpbWUoKSB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeS5yZWFkeSkge1xuICAgICAgLy8gRW5zdXJlIHVwdGltZSBpcyBuZXZlciB6ZXJvIGFmdGVyIGlzUmVhZHlcbiAgICAgIHJldHVybiBNYXRoLm1heCgxLCBEYXRlLm5vdygpIC0gdGhpcy5oaXN0b3J5LnJlYWR5KTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cbn0iXX0=