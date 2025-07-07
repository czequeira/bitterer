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
describe('@PostConstruct', () => {
    let flow;
    let context;
    beforeAll(() => {
        // Configurar metadata keys
        Reflect.defineMetadata('bit:postConstruct', Symbol('postConstruct'), Reflect);
        Reflect.defineMetadata('bit:preDestroy', Symbol('preDestroy'), Reflect);
    });
    beforeEach(() => {
        flow = new src_1.GetBitFlow(new src_1.CreateBitStep(), new src_1.SearchBitInCacheStep(), new src_1.StoreBitInCacheStep(), new src_1.GetBitFactoryStep());
        context = {
            bitCache: {},
            factoryStore: {}
        };
        jest.clearAllMocks();
    });
    it('should call the decorated method after instance creation', () => {
        // 1. Preparación
        const postConstructMock = jest.fn();
        class TestService {
            init() {
                postConstructMock();
            }
        }
        __decorate([
            (0, src_1.PostConstruct)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], TestService.prototype, "init", null);
        context.factoryStore = {
            test: {
                scope: 'singleton',
                class: TestService,
                args: []
            }
        };
        // 2. Ejecución
        const instance = flow.execute(context, 'test');
        // 3. Verificación
        expect(postConstructMock).toHaveBeenCalledTimes(1);
        expect(instance).toBeInstanceOf(TestService);
    });
    it('should maintain execution order with dependencies', () => {
        const executionOrder = [];
        class Dependency {
            init() {
                executionOrder.push('dependency');
            }
        }
        __decorate([
            (0, src_1.PostConstruct)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Dependency.prototype, "init", null);
        class MainService {
            constructor(dep) {
                this.dep = dep;
            }
            init() {
                executionOrder.push('main');
            }
        }
        __decorate([
            (0, src_1.PostConstruct)(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], MainService.prototype, "init", null);
        context.factoryStore = {
            main: {
                scope: 'singleton',
                class: MainService,
                args: [{ ref: 'dep', name: 'dep' }]
            },
            dep: {
                scope: 'singleton',
                class: Dependency,
                args: []
            }
        };
        flow.execute(context, 'main');
        expect(executionOrder).toEqual(['dependency', 'main']);
    });
});
