import {
  CreateBitStep,
  GetBitFactoryStep,
  SearchBitInCacheStep,
  StoreBitInCacheStep,
  GetBitFlow,
} from '../../../src';
import { IBitterContext } from '../../../src/types';

describe('GetBitFlow Circular Dependencies', () => {
  let flow: GetBitFlow;
  let context: IBitterContext;

  beforeEach(() => {
    flow = new GetBitFlow(
      new CreateBitStep(),
      new SearchBitInCacheStep(),
      new StoreBitInCacheStep(),
      new GetBitFactoryStep(),
    );
    context = {
      bitCache: {},
      factoryStore: {},
    };
  });

  it('should throw circular dependency error', () => {
    const context: IBitterContext = { factoryStore: {
      'serviceA': { class: class {}, scope: 'singleton', args: [{ ref: 'serviceB', name: 'serviceA' }] },
      'serviceB': { class: class {}, scope: 'singleton', args: [{ ref: 'serviceA', name:  'serviceB' }] }
    }, bitCache: {} };
    
    expect(() => flow.execute(context, 'serviceA', ['serviceA']))
      .toThrow('Circular dependency detected');
  });
});
