import 'reflect-metadata'

export function PostConstruct() {
  return (target: any, _: string, descriptor: PropertyDescriptor) => {
    const existingMetadata: any[] = Reflect.getOwnMetadata('bit:postConstruct', target) || [];

    existingMetadata.push(descriptor);

    Reflect.defineMetadata('bit:postConstruct', existingMetadata, target);
  };
}
