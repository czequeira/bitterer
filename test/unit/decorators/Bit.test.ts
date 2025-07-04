import { Bit } from "../../../src";

describe('@Bit Decorator', () => {
  it('should register metadata', () => {
    @Bit('testService')
    class TestService {}

    const metadata = Reflect.getMetadata('bit:config', TestService);
    expect(metadata).toStrictEqual({name: 'testService'});
  });
});
