"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
describe('Bitter', () => {
    let bitter;
    const mockFactoryStore = {
        'testBit': {
            scope: 'singleton',
            class: class {
            },
            args: []
        }
    };
    beforeEach(() => {
        bitter = new src_1.Bitter();
    });
    it('should register bits', () => {
        bitter.register(mockFactoryStore);
        expect(bitter.getBit('testBit')).toBeInstanceOf(mockFactoryStore['testBit'].class);
    });
});
