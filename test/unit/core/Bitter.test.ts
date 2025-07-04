import { Bitter, IBitFactoryStore } from '../../../src';

describe('Bitter', () => {
  let bitter: Bitter;
  const mockFactoryStore: IBitFactoryStore = {
    'testBit': {
      scope: 'singleton',
      class: class {},
      args: []
    }
  };

  beforeEach(() => {
    bitter = new Bitter();
  });

  it('should register bits', () => {
    bitter.register(mockFactoryStore);
    expect(bitter.getBit('testBit')).toBeInstanceOf(mockFactoryStore['testBit'].class);
  });
});
