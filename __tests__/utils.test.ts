import { expectError, expectType } from './utils';
import type { AntiBool } from '../src';

describe('utils', function () {
  test('AntiBool', () => {
    expectType<AntiBool<true>>(false);
    expectType<AntiBool<false>>(true);
    // @ts-expect-error
    expectError<AntiBool<true>>(true);
    // @ts-expect-error
    expectError<AntiBool<false>>(false);
    // @ts-expect-error
    expectError<AntiBool<''>>(false);
    // @ts-expect-error
    expectError<AntiBool<false>>('');
  });
});
