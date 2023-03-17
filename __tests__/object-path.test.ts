import { expectError, expectType } from './utils';
import type { PathOf, TransferPath, TransferPathOf, TypeOfPath, ValueMatchingPath } from '../src';
const ab: 'a' | 'b' = Math.random() > 0.5 ? 'a' : 'b';
describe('object-path', function () {
  test('TypeOfPath', () => {
    type T = TypeOfPath<{ a: number }, 'a'>; // number
    type T2 = TypeOfPath<{ a: { b: { c: string } } }, TransferPath<'[a][b][c]'>>; // number

    expectType<T>(1);
    expectType<T2>('');

    // @ts-expect-error
    expectError<T>();
    // @ts-expect-error
    expectError<T>('');
    // @ts-expect-error
    expectError<T2>(1);
  });
  test('PathOf', () => {
    type T1 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a'>; // 'a.b'
    type T2 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'b'>; // 'b'
    type T3 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'c'>; // 'a'|'b'
    type T4 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a.b.c'>; // 'a.b.c'
    type T5 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a.b.c.d'>; // 'a.b.c.d'
    type T6 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a[b][c]'>; // 'a'|'b'

    expectType<T1>('a');
    expectType<T2>('b');
    // @ts-expect-error
    expectError<T3>('c');
    expectType<T3>(ab);
    expectType<T4>('a.b.c');
    // @ts-expect-error
    expectError<T4>('a.b.b');
    expectType<T5>('a.b.c.d');
    // @ts-expect-error
    expectError<T5>('a.b.c..d');
    // @ts-expect-error
    expectError<T5>('a.b..c.d');
    expectType<T6>(ab);

    // @ts-expect-error
    expectError<T>();
    // @ts-expect-error
    expectError<T>('');
    // @ts-expect-error
    expectError<T>(1);
    // @ts-expect-error
    expectError<T>('aaa');
  });
  test('TransferPath', () => {
    type T1 = TransferPath<'[a]'>; // a
    type T2 = TransferPath<'[a][b][c]'>; // a.b.c
    type T3 = TransferPath<'a.b.c'>; // a.b.c
    type T4 = TransferPath<'a[b]'>; // a.b
    type T5 = TransferPath<'a.[b]'>; // a.b
    type T6 = TransferPath<'[a][b][c'>; // error a.b.[c
    type T7 = TransferPath<'a[b][c]'>; // a.b.c
    type T8 = TransferPath<'a[b]c'>; // a.b.c
    type T9 = TransferPath<'a[b].c'>; // a.b.c
    type T10 = TransferPath<'[a][b]c'>; // a.b.c
    type T11 = TransferPath<'[][b]c'>; // error .b.c
    type T12 = TransferPath<'.[b]c'>; // error .b.c

    expectType<T1>('a');
    expectType<T2>('a.b.c');
    expectType<T3>('a.b.c');
    expectType<T4>('a.b');
    expectError<T5>('a.b');
    // @ts-expect-error
    expectError<T6>('a.b.c');
    expectType<T6>('a.b.[c');
    expectType<T7>('a.b.c');
    expectType<T8>('a.b.c');
    expectType<T9>('a.b.c');
    expectType<T10>('a.b.c');
    // @ts-expect-error
    expectError<T11>('a.b.c');
    expectType<T11>('.b.c');
    expectType<T12>('b.c');

    // @ts-expect-error
    expectError<T1>('');
  });
  test('TransferPathOf', () => {
    type T = TransferPathOf<{ a: string }, 'a', ''>; // 'a'
    type T1 = TransferPathOf<{ a: string }, 'obj.a', 'obj'>; // 'obj.a'
    type T2 = TransferPathOf<{ a: { b: { c: number } } }, 'obj.b', 'obj'>; // 'a'

    expectType<T>('a');
    expectType<T1>('obj.a');
    // @ts-expect-error
    expectError<T2>('obj.a');
    expectType<T2>('a');
  });
  test('ValueMatchingPath', () => {
    type T = ValueMatchingPath<{ a: { b: string } }, 'a.b'>; // string

    expectType<T>('a');
    // @ts-expect-error
    expectError<ValueMatchingPath<{ a: { b: string } }, 'a.c'>>('');
  });
});
