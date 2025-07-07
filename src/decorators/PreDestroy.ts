import 'reflect-metadata'

export function PreDestroy() {
  return (target: any, _: string, descriptor: PropertyDescriptor) => {
    const existingMetadata: any[] = Reflect.getOwnMetadata('bit:preDestroy', target) || [];

    existingMetadata.push(descriptor);

    Reflect.defineMetadata('bit:preDestroy', existingMetadata, target);
  };
}
