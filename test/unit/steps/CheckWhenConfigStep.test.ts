import { CheckWhenConfigStep } from "../../../src";

describe('CheckWhenConfigStep', () => {
  let step: CheckWhenConfigStep;

  beforeAll(() => {
    step = new CheckWhenConfigStep();
  });

  it('should return true for empty conditions', () => {
    expect(step.execute()).toBe(true);
  });

  it('should validate allOf conditions', () => {
    const context = { env: 'prod', region: 'us' };
    const config = { allOf: { env: 'prod', region: 'us' } };
    expect(step.execute(config, context)).toBe(true);
  });
});
