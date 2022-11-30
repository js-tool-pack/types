import * as testTarget from '../src';

describe('@tool-pack/types', function () {
  test('base', () => {
    expect(testTarget.test()).toBe('test');
  });
});
