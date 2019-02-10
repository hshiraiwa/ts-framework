"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Package = require("pjson");
const ts_framework_1 = require("ts-framework");
const UptimeService_1 = require("../services/UptimeService");
let StatusController = class StatusController {
    static getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = UptimeService_1.default.getInstance();
            res.success({
                environment: process.env.NODE_ENV || 'development',
                uptime: service.uptime(),
                version: Package.version,
                name: Package.name,
            });
        });
    }
    static hello(req, res) {
        // Sample of static properties
        res.json({ foo: this.foo });
    }
};
StatusController.foo = 'bar';
__decorate([
    ts_framework_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StatusController, "getStatus", null);
__decorate([
    ts_framework_1.Get('/foo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StatusController, "hello", null);
StatusController = __decorate([
    ts_framework_1.Controller()
], StatusController);
exports.default = StatusController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2FwaS9jb250cm9sbGVycy9TdGF0dXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsK0NBQW9FO0FBQ3BFLDZEQUFzRDtBQUd0RCxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWdCO0lBSW5DLE1BQU0sQ0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUc7O1lBQzdCLE1BQU0sT0FBTyxHQUFHLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDVixXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYTtnQkFDbEQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUdNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUc7UUFDMUIsOEJBQThCO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGLENBQUE7QUFsQlEsb0JBQUcsR0FBRyxLQUFLLENBQUM7QUFHbkI7SUFEQyxrQkFBRyxDQUFDLEdBQUcsQ0FBQzs7Ozt1Q0FTUjtBQUdEO0lBREMsa0JBQUcsQ0FBQyxNQUFNLENBQUM7Ozs7bUNBSVg7QUFsQmtCLGdCQUFnQjtJQURwQyx5QkFBVSxFQUFFO0dBQ1EsZ0JBQWdCLENBbUJwQztrQkFuQm9CLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFBhY2thZ2UgZnJvbSAncGpzb24nO1xuaW1wb3J0IHsgQ29udHJvbGxlciwgR2V0LCBIdHRwRXJyb3IsIEh0dHBDb2RlIH0gZnJvbSAndHMtZnJhbWV3b3JrJztcbmltcG9ydCBVcHRpbWVTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1VwdGltZVNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0dXNDb250cm9sbGVyIHtcbiAgc3RhdGljIGZvbyA9ICdiYXInO1xuXG4gIEBHZXQoJy8nKVxuICBzdGF0aWMgYXN5bmMgZ2V0U3RhdHVzKHJlcSwgcmVzKSB7XG4gICAgY29uc3Qgc2VydmljZSA9IFVwdGltZVNlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXMuc3VjY2Vzcyh7XG4gICAgICBlbnZpcm9ubWVudDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JyxcbiAgICAgIHVwdGltZTogc2VydmljZS51cHRpbWUoKSxcbiAgICAgIHZlcnNpb246IFBhY2thZ2UudmVyc2lvbixcbiAgICAgIG5hbWU6IFBhY2thZ2UubmFtZSxcbiAgICB9KTtcbiAgfVxuXG4gIEBHZXQoJy9mb28nKVxuICBwdWJsaWMgc3RhdGljIGhlbGxvKHJlcSwgcmVzKSB7XG4gICAgLy8gU2FtcGxlIG9mIHN0YXRpYyBwcm9wZXJ0aWVzXG4gICAgcmVzLmpzb24oeyBmb286IHRoaXMuZm9vIH0pO1xuICB9XG59XG4iXX0=