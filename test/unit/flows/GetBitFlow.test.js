"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
describe('GetBitFlow Circular Dependencies', () => {
    let flow;
    let context;
    beforeEach(() => {
        flow = new src_1.GetBitFlow(new src_1.CreateBitStep(), new src_1.SearchBitInCacheStep(), new src_1.StoreBitInCacheStep(), new src_1.GetBitFactoryStep());
        context = {
            bitCache: {},
            factoryStore: {},
        };
    });
    it('should throw circular dependency error', () => {
        const context = { factoryStore: {
                'serviceA': { class: class {
                    }, scope: 'singleton', args: [{ ref: 'serviceB', name: 'serviceA' }] },
                'serviceB': { class: class {
                    }, scope: 'singleton', args: [{ ref: 'serviceA', name: 'serviceB' }] }
            }, bitCache: {} };
        expect(() => flow.execute(context, 'serviceA', ['serviceA']))
            .toThrow('Circular dependency detected');
    });
});
