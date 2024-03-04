import type { Tuple, TupleJoin, TupleShift } from './tuple';

/**
 * 类似字符串trim方法，只是不是trim空格，而是trim点号
 *
 * 类似trim ".123" => "123" | "123." => 123
 * @example
 * type dt = DotTrim<".d.e.f"> // d.e.f
 * type dt2 = DotTrim<"a..."> // a
 */
export type DotTrim<T> = T extends `${infer U}.` | `.${infer U}` ? DotTrim<U> : T;

/**
 * 如果T为空则返回空，不为空返回默认
 *
 * @example
 * type ed = EmptyNotDef<'', '123'>; // ""
 * type ed2 = EmptyNotDef<'123', '333'>; // 333
 */
export type EmptyNotDef<T, D> = T extends '' ? T : D;

/**
 * []转为''
 *
 * @example
 * type bte = BracketsToEmpty<'[][][]'>; // ""
 */
export type BracketsToEmpty<T> = T extends `[]${infer U}` ? BracketsToEmpty<U> : T;

/**
 * 移除S中开头的START 相当于S.replace(new RegExp(`^${Start}`), "");
 *
 * @example
 * type rss1 = RemoveStrStart<'anyScript', 'any'>; // Script
 * type rss2 = RemoveStrStart<'anyScript', 'Any'>; // anyScript
 */
export type RemoveStrStart<S extends string, START extends string> = S extends `${START}${infer U}`
  ? U
  : S;

/**
 * 字符串模板
 * @example
 * type S1 = StrTemplate<'1%s3', ['2']>; // 123
 * type S2 = StrTemplate<'%s23', ['1']>; // 123
 * type S3 = StrTemplate<'123', ['1']>; // 123
 * type SW = StrTemplate<'a%sc%se', ['b', 'd']>; // abcde
 * type SW2 = StrTemplate<'a%sc%se', ['b', 'd', 'f']>; // abcde
 * type S5 = StrTemplate<'hell%s worl%s'> // hell worl
 */
export type StrTemplate<T extends string, S extends any[] = []> = T extends `${infer L}%s${infer R}`
  ? S['length'] extends 0
    ? StrTemplate<`${L}${R}`>
    : StrTemplate<`${L}${S[0]}${R}`, TupleShift<S>>
  : T;

// 区别
// 上面的 StrTemplate<"hell%s worl%s"> => 'hell worl'
// 下面的 StrTemplate<"hell%s worl%s"> => 'hell%s worl%s'

// export type StrTemplate<T extends string, S extends any[] = []> = T extends `${infer L}%s${infer R}`
//     ? S['length'] extends 0
//         ? T
//         : StrTemplate<`${L}${S[0]}${R}`, ShiftTuple<S>>
//     : T;

/**
 * 字符串转换为小驼峰
 * @example
 *
 * type t = ToCamelCase<'string-string-string', '-'>; // stringStringString
 * type t2 = ToCamelCase<'string_string-String', '_'>; // stringString-string
 * type t3 = ToCamelCase<'string_string-String'>; // stringString-string
 */
export type ToCamelCase<
  S extends string,
  D extends string = '_',
> = S extends `${infer F}${D}${infer Rest}`
  ? `${Lowercase<F>}${Capitalize<ToCamelCase<Rest, D>>}`
  : Lowercase<S>;

/**
 * 把模板字符串类型分割为元组
 *
 * @example
 *
 * ```ts
 * type T = StrSplitWithNumber<`${number}.${number}`>; // [number,number]
 * type T2 = StrSplitWithNumber<`names.${number}.firstName.lastName.${number}`>; // ['names',number,'firstName','lastName',number]
 * type T3 = StrSplitWithNumber<`${number}-${number}`>; // [`${number}-${number}`]
 * type T4 = StrSplitWithNumber<`${number}-${number}`, ''>; // [number,`-${number}`]
 * type T5 = StrSplitWithNumber<`${number}-${number}`, '-'>; // [number,number]
 * ```
 */
export type StrSplitWithNumber<
  T,
  D extends string = '.',
> = T extends `${infer First}${D}${infer Rest}`
  ? First extends `${number}`
    ? [number, ...StrSplitWithNumber<Rest>]
    : [First, ...StrSplitWithNumber<Rest>]
  : T extends `${number}`
  ? [number]
  : [T];

/**
 * 字符串分割
 *
 * @example
 *
 * ```ts
 * type T = StrSplit<`${number}.${number}`>; // [`${number}`, `${number}`]
 * type T2 = StrSplit<`names.${number}.firstName.lastName.${number}`>; // ['names', `${number}`, 'firstName', 'lastName', `${number}`];
 * type T3 = StrSplit<`${number}-${number}`>; // [`${number}-${number}`]
 * type T4 = StrSplit<`${number}-${number}`, ''>; // [`${number}`, `-${number}`]
 * type T5 = StrSplit<`${number}-${number}`, '-'>; // [`${number}`, `${number}`]
 * ```
 */
export type StrSplit<T, D extends string = '.'> = T extends `${infer First}${D}${infer Rest}`
  ? [First, ...StrSplit<Rest>]
  : [T];

/**
 * 类似 String.prototype.repeat
 *
 * @example
 *
 * StrRepeat<'123', 2>; // '123123'
 *
 */
export type StrRepeat<T extends string, R extends number> = TupleJoin<Tuple<T, R>, ''>;

type P = `${number}%`;
/**
 * 百分比格式
 */
export type PercentFormat = P | `-${P}` | `${number}.${P}` | `-${number}.${P}`;
