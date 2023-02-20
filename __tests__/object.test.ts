import { expectError, expectType } from './utils';
import {
  CheckDuplicateKey,
  DuplicateKeys,
  IfEquals,
  IfEqualsReverse,
  OmitFirstParameters,
  OptionalKeys,
  PublicOnly,
  ReadonlyKeys,
  RequiredKeys,
  RequiredOnly,
  UrlParams,
  WritableKeys,
  DeepReadonly,
} from '../src';
import * as console from 'console';

const ab: 'a' | 'b' = Math.random() > 0.5 ? 'a' : 'b';
const abc: 'a' | 'b' | 'c' = Math.random() > 0.5 ? 'a' : Math.random() > 0.5 ? 'b' : 'c';

describe('object', () => {
  test('IfEquals', () => {
    type T = IfEquals<{}, {}, true, false>; // true
    type T2 = IfEquals<{ a: string }, {}, true, false>; // false
    type T3 = IfEquals<true, false, 'a', 'b'>; // 'b'
    type T4 = IfEquals<1, 2, 1, 2>; // 2
    type T5 = IfEquals<1, 1, 'a', 'b'>; // 'a'

    expectType<T>(true);
    expectType<T2>(false);
    expectType<T3>('b');
    expectType<T4>(2);
    expectType<T5>('a');
    // @ts-expect-error
    expectError<T>('1');
    // @ts-expect-error
    expectError<T>(9);
  });
  test('IfEqualsReverse', () => {
    type T = IfEqualsReverse<{}, {}, true, false>; // false
    type T2 = IfEqualsReverse<{ a: string }, {}, true, false>; // true
    type T3 = IfEqualsReverse<true, false, 'a', 'b'>; // 'a'
    type T4 = IfEqualsReverse<1, 2, 1, 2>; // 1
    type T5 = IfEqualsReverse<1, 1, 'a', 'b'>; // 'b'

    expectType<T>(false);
    expectType<T2>(true);
    expectType<T3>('a');
    expectType<T4>(1);
    expectType<T5>('b');
    // @ts-expect-error
    expectError<T>('1');
    // @ts-expect-error
    expectError<T>(9);
  });
  test('ReadonlyKeys', () => {
    type T = ReadonlyKeys<{ readonly a: number; b: string; readonly c: boolean }>; // 'a'|'c'

    expectType<T>('a');
    expectType<T>('c');
    // @ts-expect-error
    expectError<T>('b');
    // @ts-expect-error
    expectError<T>('d');
  });
  test('WritableKeys', () => {
    type T = WritableKeys<{ readonly a: number; b: string; readonly c: boolean; d: string }>; // 'b'|'d'
    expectType<T>('b');
    expectType<T>('d');
    // @ts-expect-error
    expectError<T>('a');
    // @ts-expect-error
    expectError<T>('c');
  });
  test('RequiredKeys', () => {
    type T = RequiredKeys<{ a: string; b?: number; c: boolean }>; // 'a'|'c'
    expectType<T>('a');
    expectType<T>('c');
    // @ts-expect-error
    expectError<T>('b');
    // @ts-expect-error
    expectError<T>('d');
  });
  test('RequiredKeys', () => {
    type T = OptionalKeys<{ a: string; b?: number; c: boolean }>; // 'b'
    expectType<T>('b');
    // @ts-expect-error
    expectError<T>('a');
    // @ts-expect-error
    expectError<T>('c');
  });
  test('RequiredOnly', () => {
    interface I {
      a: string;
      b?: number;
      c: boolean | undefined;
    }
    type T = RequiredOnly<I>; // {a: string; c: boolean | undefined}
    type T2 = OptionalKeys<I>; // "b"
    expectType<T>({ a: '', c: undefined });
    expectType<T>({ a: '', c: true });
    expectType<T2>('b');
    // @ts-expect-error
    expectError<T>({ a: '', c: 1 });
    // @ts-expect-error
    expectError<T>({ a: 1, c: false });
  });
  test('PublicOnly', () => {
    class Foo {
      public a = '';
      protected b = 2;
      private c = false;

      constructor() {
        console.log(this.c);
      }
    }
    type T = PublicOnly<Foo>; // {a: string}
    expectType<T>({ a: '' });
    // @ts-expect-error
    expectError<T>('a');
    // @ts-expect-error
    expectError<T>({ b: '' });
    // @ts-expect-error
    expectError<T>({ a: '', b: '' });
  });
  test('DuplicateKeys', () => {
    type T1 = DuplicateKeys<{ a: string }, {}>; // never
    type T2 = DuplicateKeys<{ a: string }, { b: string }>; // never
    type T3 = DuplicateKeys<{ a: string }, { a: string }>; // "a"
    type T4 = DuplicateKeys<{ a: string; b: string }, { a: string }>; // "a"
    type T5 = DuplicateKeys<{ a: string; b: string }, { a: string; b: string }>; // "a"|"b"

    // @ts-expect-error
    expectError<T1>();

    // @ts-expect-error
    expectError<T2>();
    // @ts-expect-error
    expectError<T2>('');

    expectType<T3>('a');

    expectType<T4>('a');

    expectType<T5>(ab);
  });
  test('CheckDuplicateKey', () => {
    interface ABC {
      a: string;
      b: string;
      c: string;
    }
    type T = CheckDuplicateKey<{ a: string }, ABC, ABC, ABC, ABC>; // 'a'实际是'a'|'b'|'c'，但是需要把前面的修复才会显示后面的
    type T1 = CheckDuplicateKey<{ a: string; b: string }, ABC, ABC, ABC, ABC>; // 'a'|'b' 实际是'a'|'b'|'c'
    type T2 = CheckDuplicateKey<ABC, ABC, ABC, ABC, ABC>; // 'a'|'b'|'c'
    type T3 = CheckDuplicateKey<ABC, ABC, ABC, ABC>; // 'a'|'b'|'c'
    type T4 = CheckDuplicateKey<ABC, ABC, ABC>; // 'a'|'b'|'c'
    type T5 = CheckDuplicateKey<ABC, ABC>; // 'a'|'b'|'c'
    type T6 = CheckDuplicateKey<ABC>; // never

    // @ts-expect-error
    expectError<T>();
    expectType<T>('a');
    // @ts-expect-error
    expectError<T>(abc);
    // @ts-expect-error
    expectError<T>(ab);

    expectType<T1>(ab);
    // @ts-expect-error
    expectError<T1>(abc);

    expectType<T2>('a');
    expectType<T2>('b');
    expectType<T2>('c');
    expectType<T2>(abc);

    expectType<T3>(abc);
    expectType<T4>(abc);
    expectType<T5>(abc);

    // @ts-expect-error
    expectError<T6>(abc);
    // @ts-expect-error
    expectError<T6>(ab);
    // @ts-expect-error
    expectError<T6>('a');
    // @ts-expect-error
    expectError<T6>('b');
    // @ts-expect-error
    expectError<T6>('c');
  });
  test('OmitFirstParameters', () => {
    type T = OmitFirstParameters<(a: number, b: string) => any>; // [b:string]
    expectType<T>(['']);

    function fn1(a: string, b: boolean, c: number) {
      return a + b + c;
    }
    const fn = (...args: OmitFirstParameters<typeof fn1>) => args;

    fn(true, 1);

    // @ts-expect-error
    expectError<OmitFirstParameters<1>>(1);
  });
  test('UrlParams', () => {
    type T = UrlParams<'a=1&b=2'>; // {a:'1';b:'2'}
    expectType<T>({ a: '1', b: '2' });
    // @ts-expect-error
    expectError<T>({ a: '1', b: '2', c: 123 });
  });
  test('DeepReadonly', () => {
    interface A {
      a: number;
      b: string;
      c: {
        d: boolean;
        f: string;
      };
    }

    type B = DeepReadonly<A>;

    interface C {
      readonly a: number;
      readonly b: string;
      readonly c: DeepReadonly<{
        d: boolean;
        f: string;
      }>;
    }

    const b: B = { a: 1, b: '', c: { d: true, f: '' } };

    // @ts-expect-error
    b.c.d = false; // error 不能修改.c.d，ts检查会报错

    // @ts-expect-error
    b.a = 2; // error 不能修改.a，ts检查会报错

    // type B 和interface C类型相等
    expectType<B>({} as C);
  });
});
