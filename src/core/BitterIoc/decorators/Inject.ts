import 'reflect-metadata'

export function Inject(name?: string) {
  return function (target: Object, _: string | undefined, parameterIndex: number) {
    const existingMetadata: any[] = Reflect.getOwnMetadata('bit:inject', target) || [];

    existingMetadata.push({
      parameterIndex,
      name,
    });

    Reflect.defineMetadata('bit:inject', existingMetadata, target);
  };
}