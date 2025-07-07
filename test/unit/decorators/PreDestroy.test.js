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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../../src");
describe('@PreDestroy', () => {
    it('should register cleanup method', () => {
        const preDestroyMock = jest.fn();
        const ioc = new src_1.Bitter();
        class ResourceService {
            cleanup() {
                preDestroyMock();
            }
        }
        __decorate([
            (0, src_1.PreDestroy)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ResourceService.prototype, "cleanup", null);
        ioc.register({
            resource: {
                scope: 'singleton',
                class: ResourceService,
                args: []
            }
        });
        ioc.getBit('resource');
        ioc.shutdown();
        expect(preDestroyMock).toHaveBeenCalledTimes(1);
    });
});
