import { expectError, expectType } from './utils';
import type { Tuple, TupleJoin, TupleM2N, TupleShift, TupleToUnion } from '../src';

describe('tuple', () => {
  test('tuple', () => {
    expectType<Tuple<number, 2>>([2, 2]);
    // @ts-expect-error
    expectError<Tuple<number, 2>>([2, '']);
    // @ts-expect-error
    expectError<Tuple<number, 99999>>([] as any);
  });
  test('TupleToUnion', () => {
    expectType<TupleToUnion<[number, string, boolean]>>(1);
    expectType<TupleToUnion<[number, string, boolean]>>(1000);
    expectType<TupleToUnion<[number, string, boolean]>>('');
    expectType<TupleToUnion<[number, string, boolean]>>(true);

    // @ts-expect-error
    expectError<TupleToUnion<[number, string, boolean]>>({});

    expectType<TupleToUnion<[1, 2, 3]>>(1);
    expectType<TupleToUnion<[1, 2, 3]>>(2);
    expectType<TupleToUnion<[1, 2, 3]>>(3);

    // @ts-expect-error
    expectError<TupleToUnion<[1, 2, 3]>>(0);
  });
  test('TupleM2N', () => {
    expectType<TupleM2N<number, 2, 5>>([1, 2]);
    expectType<TupleM2N<number, 2, 5>>([1, 2, 3, 4, 5]);

    // @ts-expect-error
    expectError<TupleM2N<number, 2, 5>>([1]);
    // @ts-expect-error
    expectType<TupleM2N<number, 2, 5>>([1, 2, 3, 4, 5, 6]);
  });
  test('TupleShift', () => {
    expectType<TupleShift<[number, string, boolean]>>(['', true]);
    expectType<TupleShift<[number, 2, 5]>>([2, 5]);

    // @ts-expect-error
    expectError<TupleM2N<number, 2, 5>>([1]);
    // @ts-expect-error
    expectError<TupleM2N<number, 2, 5>>([1, 2, 3, 4, 5, 6]);
    // @ts-expect-error
    expectError<TupleM2N<number, 2, 10000>>([] as any);
  });
  test('TupleJoin', () => {
    expectType<TupleJoin<['1', '2', '3'], ''>>('123');
    expectType<TupleJoin<['1', '2', '3'], '-'>>('1-2-3');
    expectType<TupleJoin<['a', 'p', 'p', 'l', 'e'], '-'>>('a-p-p-l-e');
    // @ts-expect-error
    expectError<TupleJoin<['1', '2', '3'], ' '>>('1-2-3');
  });
});
