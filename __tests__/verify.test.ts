import { expectError, expectType } from './utils';
import type { IsUnknown, IsAny } from '../src/';

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
  test('IsAny', () => {
    expectType<IsAny<any>>(true);
    expectType<IsAny<unknown>>(false);
    expectType<IsAny<never>>(false);
    expectType<IsAny<boolean>>(false);
    expectType<IsAny<string>>(false);
    expectType<IsAny<''>>(false);
    expectType<IsAny<false>>(false);
    expectType<IsAny<true>>(false);
    expectType<IsAny<undefined>>(false);
    expectType<IsAny<null>>(false);
    expectType<IsAny<Symbol>>(false);
    expectType<IsAny<0>>(false);
    expectType<IsAny<{}>>(false);
    expectType<IsAny<{ a: string }>>(false);
    expectType<IsAny<object>>(false);
    expectType<IsAny<void>>(false);
    // @ts-expect-error
    expectError<IsAny<unknown>>(true);
  });
});
