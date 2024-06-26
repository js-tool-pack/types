import type {
  OmitFirstParameters,
  ConvertOptionalPart,
  FlattenIntersection,
  CheckDuplicateKey,
  IfEqualsReverse,
  ConvertOptional,
  DuplicateKeys,
  ReverseObject,
  OptionalKeys,
  ReadonlyKeys,
  RequiredKeys,
  RequiredOnly,
  WritableKeys,
  DeepReadonly,
  RequiredPart,
  PartialPart,
  PublicOnly,
  TupleToObj,
  UrlParams,
  IfEquals,
  Mix,
} from '../src';
import { expectError, expectType } from './utils';
import type { Writeable } from '../src';
import * as console from 'console';

const ab: 'a' | 'b' = Math.random() > 0.5 ? 'a' : 'b';
const abc: 'a' | 'b' | 'c' = Math.random() > 0.5 ? 'a' : Math.random() > 0.5 ? 'b' : 'c';
const Never = null as never;

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
    type T = ReadonlyKeys<{ readonly c: boolean; readonly a: number; b: string }>; // 'a'|'c'

    expectType<T>('a');
    expectType<T>('c');
    // @ts-expect-error
    expectError<T>('b');
    // @ts-expect-error
    expectError<T>('d');
  });
  test('WritableKeys', () => {
    type T = WritableKeys<{ readonly c: boolean; readonly a: number; b: string; d: string }>; // 'b'|'d'
    expectType<T>('b');
    expectType<T>('d');
    // @ts-expect-error
    expectError<T>('a');
    // @ts-expect-error
    expectError<T>('c');
  });
  test('RequiredKeys', () => {
    type T = RequiredKeys<{ b?: number; c: boolean; a: string }>; // 'a'|'c'
    expectType<T>('a');
    expectType<T>('c');
    // @ts-expect-error
    expectError<T>('b');
    // @ts-expect-error
    expectError<T>('d');
  });
  test('RequiredKeys', () => {
    type T = OptionalKeys<{ b?: number; c: boolean; a: string }>; // 'b'
    expectType<T>('b');
    // @ts-expect-error
    expectError<T>('a');
    // @ts-expect-error
    expectError<T>('c');
  });
  test('RequiredOnly', () => {
    interface I {
      c: undefined | boolean;
      b?: number;
      a: string;
    }
    type T = RequiredOnly<I>; // {a: string; c: boolean | undefined}
    type T2 = OptionalKeys<I>; // "b"
    expectType<T>({ c: undefined, a: '' });
    expectType<T>({ c: true, a: '' });
    expectType<T2>('b');
    // @ts-expect-error
    expectError<T>({ a: '', c: 1 });
    // @ts-expect-error
    expectError<T>({ c: false, a: 1 });
  });
  test('PublicOnly', () => {
    class Foo {
      private c = false;
      protected b = 2;
      public a = '';

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
      c: {
        d: boolean;
        f: string;
      };
      a: number;
      b: string;
    }

    type B = DeepReadonly<A>;

    interface C {
      readonly c: DeepReadonly<{
        d: boolean;
        f: string;
      }>;
      readonly a: number;
      readonly b: string;
    }

    const b: B = { c: { d: true, f: '' }, b: '', a: 1 };

    // @ts-expect-error
    b.c.d = false; // error 不能修改.c.d，ts检查会报错

    // @ts-expect-error
    b.a = 2; // error 不能修改.a，ts检查会报错

    // type B 和interface C类型相等
    expectType<B>({} as C);
  });

  test('RequiredPart', () => {
    interface O {
      a?: number;
      b?: number;
      c: number;
    }

    const obj: O = { c: 1 };

    const obj2: RequiredPart<O, 'a'> = { a: 1, c: 2 };

    expectType<undefined | number>(obj.a);
    // @ts-expect-error
    expectError<number>(obj.a);
    expectType<undefined | number>(obj.b);
    // @ts-expect-error
    expectError<number>(obj.b);
    expectType<number>(obj.c);

    expectType<number>(obj2.a);
    // @ts-expect-error
    expectError<number>(obj2.b);
    expectType<number>(obj2.c);

    expectError<{
      b?: number;
      a: number;
      c: number;
      // @ts-expect-error
    }>(obj);

    expectType<{
      b?: number;
      a: number;
      c: number;
    }>(obj2);
  });
  test('PartialPart', () => {
    interface O {
      a: number;
      b: number;
      c: number;
    }

    const obj: PartialPart<O, 'a' | 'c'> = { b: 2 };

    // @ts-expect-error
    expectError<O>(obj);

    expectType<{
      a?: number;
      c?: number;
      b: number;
    }>(obj);
  });
  test('TupleToObj', () => {
    const a = ['a', 'b', 'c', 1, 2, 3] as const;

    type T = TupleToObj<typeof a, string>;

    expectType<T>({});
    expectType<Required<T>>({ '1': '', '2': '', '3': '', a: '', b: '', c: '' });
    expectType<T>({ '1': '', '2': '', '3': '', a: '', b: '', c: '' });
    // @ts-expect-error
    expectError<Required<T>>({ '1': '', '2': '', '3': '', a: '', b: '', c: '', d: '' });

    type T2 = TupleToObj<typeof a, string, 'a' | 'c', 'dd'>;

    expectType<T2>({});
    expectType<Required<T2>>({ '1': '', '2': '', '3': '', a: 'dd', c: 'dd', b: '' });
    expectType<T2>({ '1': '', '2': '', '3': '', a: 'dd', c: 'dd', b: '' });
    // @ts-expect-error
    expectError<Required<T2>>({ '1': '', '2': '', '3': '', a: 'd', c: 'd', b: '' });
  });

  test('ConvertOptionalPart', () => {
    interface T {
      a?: 1;
      b: 2;
      c: 3;
      d: 4;
      e: 5;
    }

    expectType<ConvertOptionalPart<T, 'a'>>({} as { a: 1; b: 2; c: 3; d: 4; e: 5 });
    expectType<ConvertOptionalPart<T, 'a'>>({} as { a: undefined; b: 2; c: 3; d: 4; e: 5 });
    expectType<ConvertOptionalPart<T, 'a'>>({} as { a: undefined | 1; b: 2; c: 3; d: 4; e: 5 });

    expectType<ConvertOptionalPart<T, 'a'>>({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    expectType<ConvertOptionalPart<T, 'a'>>({ a: undefined, b: 2, c: 3, d: 4, e: 5 });

    // @ts-expect-error
    expectError<ConvertOptionalPart<T, 'a'>>({ b: 2, c: 3, d: 4, e: 5 });
    // @ts-expect-error
    expectError<ConvertOptionalPart<T, 'a'>>({ a: 2, b: 2, c: 3, d: 4, e: 5 });
    // @ts-expect-error
    expectError<ConvertOptionalPart<T, 'a'>>({} as { a?: 1; b: 2; c: 3; d: 4; e: 5 });

    // @ts-expect-error
    expectError<ConvertOptionalPart<Partial<T>, 'a'>>({});

    expectType<ConvertOptionalPart<T, 'a' | 'b' | 'c'>>({ a: 1, b: 2, c: 3, d: 4, e: 5 });

    // @ts-expect-error
    expectError<ConvertOptionalPart<T, 'a' | 'b' | 'c'>>({ d: 4, e: 5 });

    const v = {
      a: undefined,
      b: undefined,
      c: undefined,
      d: 4,
      e: 5,
    };
    // @ts-expect-error 因为 T 只有 a 是可选属性，b 和 c 不是可选属性而被忽略
    expectError<ConvertOptionalPart<T, 'a' | 'b' | 'c'>>(v);

    expectType<ConvertOptionalPart<T, 'a' | 'b' | 'c'>>({
      a: undefined,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
    });

    interface T2 {
      a?: 1;
      b?: 2;
      c?: 3;
      d?: 4;
      e?: 5;
    }

    expectType<ConvertOptionalPart<T2, 'a' | 'b' | 'c'>>({ a: undefined, b: 2, c: 3 });
    expectType<ConvertOptionalPart<T2, 'a' | 'b' | 'c'>>({
      a: undefined,
      b: undefined,
      c: undefined,
    });
    expectType<ConvertOptionalPart<T2, 'a' | 'b' | 'c'>>({ a: undefined, b: 2, c: 3, d: 4, e: 5 });
    expectType<ConvertOptionalPart<T2, 'a' | 'b' | 'c'>>({
      a: undefined,
      b: undefined,
      c: undefined,
      d: 4,
      e: 5,
    });

    const v2 = { a: undefined, d: undefined, e: undefined, b: 2, c: 3 };
    // @ts-expect-error d 和 e 不可设置为 undefined
    expectError<ConvertOptionalPart<T2, 'a' | 'b' | 'c'>>(v2);
  });
  test('ConvertOptional', () => {
    interface T {
      a?: 1;
      b: 2;
      c: 3;
      d: 4;
      e: 5;
    }

    expectType<ConvertOptional<T>>({} as { a: 1; b: 2; c: 3; d: 4; e: 5 });
    expectType<ConvertOptional<T>>({} as { a: undefined; b: 2; c: 3; d: 4; e: 5 });
    expectType<ConvertOptional<T>>({} as { a: undefined | 1; b: 2; c: 3; d: 4; e: 5 });

    expectType<ConvertOptional<T>>({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    expectType<ConvertOptional<T>>({ a: undefined, b: 2, c: 3, d: 4, e: 5 });

    // @ts-expect-error
    expectError<ConvertOptional<T>>({ b: 2, c: 3, d: 4, e: 5 });
    // @ts-expect-error
    expectError<ConvertOptional<T>>({ a: 2, b: 2, c: 3, d: 4, e: 5 });
    // @ts-expect-error
    expectError<ConvertOptional<T>>({} as { a?: 1; b: 2; c: 3; d: 4; e: 5 });

    // @ts-expect-error
    expectError<ConvertOptional<Partial<T>>>({});

    expectType<ConvertOptional<T>>({ a: 1, b: 2, c: 3, d: 4, e: 5 });

    // @ts-expect-error
    expectError<ConvertOptional<T>>({ d: 4, e: 5 });

    const v = {
      a: undefined,
      b: undefined,
      c: undefined,
      d: 4,
      e: 5,
    };
    // @ts-expect-error 因为 T 只有 a 是可选属性，b 和 c 不是可选属性而被忽略
    expectError<ConvertOptional<T>>(v);

    expectType<ConvertOptional<T>>({
      a: undefined,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
    });

    interface T2 {
      a?: 1;
      b?: 2;
      c?: 3;
      d?: 4;
      e?: 5;
    }
    expectType<ConvertOptional<T2>>({
      a: undefined,
      b: undefined,
      c: undefined,
      d: undefined,
      e: undefined,
    });
    expectType<ConvertOptional<T2>>({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    expectType<ConvertOptional<T2>>({ a: undefined, b: 2, c: 3, d: 4, e: 5 });

    expectType<T2>({});
    // @ts-expect-error
    expectError<ConvertOptional<T2>>({});

    interface T3 {
      a: 1;
      b: 2;
      c: 3;
      d: 4;
      e: 5;
    }
    expectType<ConvertOptional<T3, keyof T3>>({
      a: undefined,
      b: undefined,
      c: undefined,
      d: undefined,
      e: undefined,
    });
  });

  test('FlattenIntersection', () => {
    expectType<FlattenIntersection<{ a: 1 } & { b: 2 }>>({ a: 1, b: 2 });
    expectType<FlattenIntersection<{ a: 1 } & { a: 2 }>>(Never);
  });

  test('Mix', () => {
    interface A {
      a: 1;
      b: 2;
    }
    interface B {
      b: 3;
    }
    expectType<Mix<A, B>>({ a: 1, b: 3 });
    // @ts-expect-error
    expectError<Mix<A, B>>({ a: 1, b: 2 });

    // @ts-expect-error
    expectError<A & B>({ a: 1, b: 3 });
    // @ts-expect-error
    expectError<A & B>({ a: 1, b: 2 });

    expectType<A & B>(Never);

    expectType<Mix<A, { c: 3 }>>({ a: 1, b: 2, c: 3 });
  });

  test('Writeable', () => {
    interface A {
      readonly a: number;
      b: string;
    }

    const objR: A = { b: 'b', a: 1 };
    // @ts-expect-error
    objR.a = 2;

    const objW: Writeable<A> = { b: 'b', a: 1 };
    objW.a = 2;

    type B = Readonly<A>;
    const objR2: B = { b: 'b', a: 1 };
    // @ts-expect-error
    objR2.b = 'c';

    const objW2: Writeable<B> = { b: 'b', a: 1 };
    objW2.b = 'c';
  });

  test('ReverseObject', () => {
    expectType<ReverseObject<{ a: 1; b: 2; c: 3 }>>({ 1: 'a', 2: 'b', 3: 'c' });
    // @ts-expect-error
    expectError<ReverseObject<{ a: 1; b: 2; c: 3 }>>({ a: 1, b: 2, c: 3 });
    // @ts-expect-error
    expectError<ReverseObject<{ a: 1; b: 2; c: 3 }>>({ 1: 'a', 2: 'b' });
    // @ts-expect-error
    expectError<ReverseObject<{ a: 1; b: 2; c: 3 }>>({ 1: 'a', 2: 'b', 0: 1 });
  });
});
