"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
describe('CheckWhenConfigStep', () => {
    let step;
    beforeAll(() => {
        step = new src_1.CheckWhenConfigStep();
    });
    it('should return true for empty conditions', () => {
        expect(step.execute()).toBe(true);
    });
    it('should validate allOf conditions', () => {
        const context = { env: 'prod', region: 'us' };
        const config = { allOf: { env: 'prod', region: 'us' } };
        expect(step.execute(config, context)).toBe(true);
    });
    it('should handle undefined config', () => {
        expect(step.execute(undefined, { env: 'prod' })).toBe(true);
    });
    it('should reject invalid conditions', () => {
        const context = { env: 'prod' };
        const config = { allOf: { env: 'dev' } };
        expect(step.execute(config, context)).toBe(false);
    });
});
