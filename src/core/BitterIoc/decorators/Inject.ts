import 'reflect-metadata'

export function Inject(name: string): ParameterDecorator {
  return function (target, _, parameterIndex: number) {
    const existingMetadata: any[] = Reflect.getOwnMetadata('bit:inject', target) || [];

    existingMetadata.push({
      parameterIndex,
      name,
    });

    Reflect.defineMetadata('bit:inject', existingMetadata, target);
  };
}
