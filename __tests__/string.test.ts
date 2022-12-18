import { expectError, expectType } from './utils';
import {
  BracketsToEmpty,
  DotTrim,
  EmptyNotDef,
  RemoveStrStart,
  StrRepeat,
  StrSplit,
  StrSplitWithNumber,
  StrTemplate,
  ToCamelCase,
} from '../src';

describe('string', () => {
  test('DotTrim', () => {
    expectType<DotTrim<'.....1'>>('1');
    // @ts-expect-error
    expectError<DotTrim<'.....1'>>('.....1');

    expectType<DotTrim<'.d.e.f'>>('d.e.f');
    // @ts-expect-error
    expectError<DotTrim<'.d.e.f'>>('.d.e.f');

    expectType<DotTrim<'a...'>>('a');
    // @ts-expect-error
    expectError<DotTrim<'a...'>>('a..');

    expectType<DotTrim<'a'>>('a');
    // @ts-expect-error
    expectError<DotTrim<'a'>>('b');
  });
  test('EmptyNotDef', () => {
    expectType<EmptyNotDef<'', true>>('');
    // @ts-expect-error
    expectError<EmptyNotDef<'', true>>(true);

    expectType<EmptyNotDef<'1', true>>(true);
    // @ts-expect-error
    expectError<EmptyNotDef<'1', true>>('');
  });
  test('BracketsToEmpty', () => {
    expectType<BracketsToEmpty<'[][][]'>>('');
    // @ts-expect-error
    expectType<BracketsToEmpty<'[][][]'>>('[][][]');

    expectType<BracketsToEmpty<'[][][]abc'>>('abc');
    // @ts-expect-error
    expectError<BracketsToEmpty<'[][][]abc'>>('[][][]abc');
  });
  test('RemoveStrStart', () => {
    expectType<RemoveStrStart<'[][][]', '[]'>>('[][]');
    // @ts-expect-error
    expectError<RemoveStrStart<'[][][]'>>('');

    expectType<RemoveStrStart<'[][][]abc', '[][][]'>>('abc');
    expectType<RemoveStrStart<'', '[][][]'>>('');
  });
  test('StrTemplate', () => {
    expectType<StrTemplate<'', []>>('');

    type S1 = StrTemplate<'1%s3', ['2']>; // 123
    type S2 = StrTemplate<'%s23', ['1']>; // 123
    type S3 = StrTemplate<'123', ['1']>; // 123
    type S4 = StrTemplate<'a%sc%se', ['b', 'd']>; // abcde
    type S5 = StrTemplate<'a%sc%se', ['b', 'd', 'f']>; // abcde
    type S6 = StrTemplate<'hell%s worl%s'>; // hell worl
    expectType<S1>('123');
    expectType<S2>('123');
    expectType<S3>('123');
    expectType<S4>('abcde');
    expectType<S5>('abcde');
    expectType<S6>('hell worl');
  });
  test('ToCamelCase', () => {
    type t = ToCamelCase<'string-string-string', '-'>; // stringStringString
    type t2 = ToCamelCase<'string_string-String', '_'>; // stringString-string
    type t3 = ToCamelCase<'string_string-String'>; // stringString-string
    expectType<t>('stringStringString');
    expectType<t2>('stringString-string');
    expectType<t3>('stringString-string');
    // @ts-expect-error
    expectError<t3>('');
  });
  test('StrSplitWithNumber', () => {
    type T = StrSplitWithNumber<`${number}.${number}`>; // [number,number]
    type T2 = StrSplitWithNumber<`names.${number}.firstName.lastName.${number}`>; // ['names',number,'firstName','lastName',number]
    type T3 = StrSplitWithNumber<`${number}-${number}`>; // [`${number}-${number}`]
    type T4 = StrSplitWithNumber<`${number}-${number}`, ''>; // [number,`-${number}`]
    type T5 = StrSplitWithNumber<`${number}-${number}`, '-'>; // [number,number]

    expectType<T>([1, 1] as [number, number]);
    expectType<T2>(['names', 1, 'firstName', 'lastName', 2] as [
      'names',
      number,
      'firstName',
      'lastName',
      number,
    ]);

    expectType<T3>(['1-1'] as [`${number}-${number}`]);
    expectType<T4>([1, `-1`] as [number, `-${number}`]);
    expectType<T5>([1, 1] as [number, number]);
    // @ts-expect-error
    expectError<t5>('');
  });
  test('StrSplit', () => {
    type T = StrSplit<`${number}.${number}`>; // [`${number}`, `${number}`]
    type T2 = StrSplit<`names.${number}.firstName.lastName.${number}`>; // ['names', `${number}`, 'firstName', 'lastName', `${number}`];
    type T3 = StrSplit<`${number}-${number}`>; // [`${number}-${number}`]
    type T4 = StrSplit<`${number}-${number}`, ''>; // [`${number}`, `-${number}`]
    type T5 = StrSplit<`${number}-${number}`, '-'>; // [`${number}`, `${number}`]

    expectType<T>(['1', '1'] as [`${number}`, `${number}`]);
    expectType<T2>(['names', '1', 'firstName', 'lastName', '2'] as [
      'names',
      `${number}`,
      'firstName',
      'lastName',
      `${number}`,
    ]);

    expectType<T3>(['1-1'] as [`${number}-${number}`]);
    expectType<T4>(['1', `-1`] as [`${number}`, `-${number}`]);
    expectType<T5>(['1', '1'] as [`${number}`, `${number}`]);
    // @ts-expect-error
    expectError<t5>('');
  });
  test('StrRepeat', () => {
    expectType<StrRepeat<'123', 2>>('123123');

    const v = '123123' as string;
    // @ts-expect-error
    expectError<StrRepeat<'123', 2>>(v);

    // @ts-expect-error
    expectError<StrRepeat<'123', 2>>('12312');

    // @ts-expect-error
    type T = StrRepeat<9, 2>; // 第一个参数限定了string，否则会报错
    expectType<T>('99');
  });
});
