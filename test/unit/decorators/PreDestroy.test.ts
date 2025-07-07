import 'reflect-metadata';
import {
  Bitter,
  PreDestroy,
} from '../../../src';

describe('@PreDestroy', () => {
  it('should register cleanup method', () => {
    const preDestroyMock = jest.fn();
    const ioc = new Bitter()

    class ResourceService {
      @PreDestroy()
      cleanup() {
        preDestroyMock();
      }
    }

    ioc.register({
      resource: {
        scope: 'singleton',
        class: ResourceService,
        args: []
      }
    })

    ioc.getBit<ResourceService>('resource');

    ioc.shutdown()

    expect(preDestroyMock).toHaveBeenCalledTimes(1);
  });
});
