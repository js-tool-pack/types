import { expectError, expectType } from './utils';
import type { IsUnknown } from '../src/';

describe('verify', function () {
  test('IsUnknown', () => {
    expectType<IsUnknown<unknown>>(true);
    expectType<IsUnknown<any>>(false);
    expectType<IsUnknown<never>>(false);
    expectType<IsUnknown<boolean>>(false);
    expectType<IsUnknown<string>>(false);
    expectType<IsUnknown<''>>(false);
    expectType<IsUnknown<false>>(false);
    expectType<IsUnknown<true>>(false);
    expectType<IsUnknown<undefined>>(false);
    expectType<IsUnknown<null>>(false);
    expectType<IsUnknown<Symbol>>(false);
    expectType<IsUnknown<0>>(false);
    expectType<IsUnknown<{}>>(false);
    expectType<IsUnknown<{ a: string }>>(false);
    expectType<IsUnknown<object>>(false);
    expectType<IsUnknown<void>>(false);
    // @ts-expect-error
    expectError<IsUnknown<unknown>>(false);
  });
});
