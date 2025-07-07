import 'reflect-metadata';
import {
  CreateBitStep,
  GetBitFactoryStep,
  GetBitFlow,
  IBitterContext,
  PostConstruct,
  SearchBitInCacheStep,
  StoreBitInCacheStep,
} from '../../../src';

describe('@PostConstruct', () => {
  let flow: GetBitFlow;
  let context: IBitterContext;

  beforeAll(() => {
    // Configurar metadata keys
    Reflect.defineMetadata('bit:postConstruct', Symbol('postConstruct'), Reflect);
    Reflect.defineMetadata('bit:preDestroy', Symbol('preDestroy'), Reflect);
  });

  beforeEach(() => {
    flow = new GetBitFlow(
      new CreateBitStep(),
      new SearchBitInCacheStep(),
      new StoreBitInCacheStep(),
      new GetBitFactoryStep(),
    );
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
      @PostConstruct()
      init() {
        postConstructMock();
      }
    }

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
    const executionOrder: string[] = [];

    class Dependency {
      @PostConstruct()
      init() {
        executionOrder.push('dependency');
      }
    }

    class MainService {
      constructor(public dep: Dependency) {}

      @PostConstruct()
      init() {
        executionOrder.push('main');
      }
    }

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
