import {
  CreateBitStep,
  GetBitFactoryStep,
  GetBitFlow,
  IBitterContext,
  SearchBitInCacheStep,
  StoreBitInCacheStep,
} from "../../../src";

describe('GetBitFlow', () => {
  let flow: GetBitFlow;
  let mockContext: IBitterContext;

  beforeEach(() => {
    flow = new GetBitFlow(
    new CreateBitStep(),
    new SearchBitInCacheStep(),
    new StoreBitInCacheStep(),
    new GetBitFactoryStep(),
    );
    mockContext = {
      bitCache: {},
      factoryStore: {}
    };
  });

  it('should throw error for unregistered bit', () => {
    expect(() => flow.execute(mockContext, 'unregistered'))
      .toThrow('Bit not registered');
  });
});
