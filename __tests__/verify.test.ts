import { expectError, expectType } from './utils';
import type { IsUnknown, IsAny, IsUnion } from '../src/';

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
    expectType<IsUnknown<number>>(false);
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
    expectType<IsAny<number>>(false);
    expectType<IsAny<{}>>(false);
    expectType<IsAny<{ a: string }>>(false);
    expectType<IsAny<object>>(false);
    expectType<IsAny<void>>(false);
    // @ts-expect-error
    expectError<IsAny<unknown>>(true);
  });
  test('IsUnion', () => {
    expectType<IsUnion<{ a: number } | { b: string }>>(true);
    expectType<IsUnion<boolean>>(true);
    expectType<IsUnion<true | false>>(true);
    expectType<IsUnion<false>>(false);
    expectType<IsUnion<true>>(false);
    expectType<IsUnion<{ a: number } & { b: string }>>(false);
    expectType<IsUnion<any>>(false);
    expectType<IsUnion<unknown>>(false);
    expectType<IsUnion<never>>(false);
    expectType<IsUnion<string>>(false);
    expectType<IsUnion<''>>(false);
    expectType<IsUnion<undefined>>(false);
    expectType<IsUnion<null>>(false);
    expectType<IsUnion<Symbol>>(false);
    expectType<IsUnion<number>>(false);
    expectType<IsUnion<0>>(false);
    expectType<IsUnion<{}>>(false);
    expectType<IsUnion<{ a: string }>>(false);
    expectType<IsUnion<object>>(false);
    expectType<IsUnion<void>>(false);
    // @ts-expect-error
    expectError<IsUnion<unknown>>(true);
  });
});
