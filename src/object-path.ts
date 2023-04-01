// reference https://mp.weixin.qq.com/s/KJdUdwbLN4g4M7xy34m-fA
import type { BracketsToEmpty, DotTrim, EmptyNotDef, RemoveStrStart } from './string';
import type { IsAny } from './verify';

type OneLevelPathOf<T> = keyof T & (string | number);
type PathForHint<T> = OneLevelPathOf<T>;

// P 参数是一个状态容器，用于承载每一步的递归结果，并最终帮我们实现尾递归
/**
 * 纠正对象对应的path
 *
 * @example
 *  type T1 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a'>; // 'a.b'
 *  type T2 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'b'>; // 'b'
 *  type T3 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'c'>; // 'a'|'b'
 *  type T4 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a.b.c'>; // 'a.b.c'
 *  type T5 = PathOf<{ a: { b: { c: { d: number } } }; b: string }, 'a.b.c.d'>; // 'a.b.c.d'
 */
export type PathOf<T, K extends string, P extends string = ''> = K extends `${infer U}.${infer V}`
  ? U extends keyof T // Record
    ? PathOf<T[U], V, `${P}${U}.`>
    : T extends unknown[] // Array
    ? PathOf<T[number], V, `${P}${number}.`>
    : `${P}${PathForHint<T>}` // 走到此分支，表示参数有误，提示用户正确的参数
  : K extends keyof T
  ? `${P}${K}`
  : T extends unknown[]
  ? `${P}${number}`
  : `${P}${PathForHint<T>}`; // 走到此分支，表示参数有误，提示用户正确的参数

// type DotPath<P extends string = ''> = P extends `${infer V}.${infer O}` ? `${V}.${DotPath<O>}` : P;
// type BracketsPath<P extends string = ""> = P extends `${infer V}[${infer O}]` ? `${V}.${BracketsPath<O>}` : P

/**
 * 路径类型转换
 *
 * @example
 *
 * type T1 = TransferPath<'[a]'>;         // a
 * type T2 = TransferPath<'[a][b][c]'>;   // a.b.c
 * type T3 = TransferPath<'a.b.c'>;       // a.b.c
 * type T4 = TransferPath<'a[b]'>;        // a.b
 * type T5 = TransferPath<'a.[b]'>;       // a.b
 * type T6 = TransferPath<'[a][b][c'>;    // error a.b.[c
 * type T7 = TransferPath<'a[b][c]'>;     // a.b.c
 * type T8 = TransferPath<'a[b]c'>;       // a.b.c
 * type T9 = TransferPath<'a[b].c'>;      // a.b.c
 * type T10 = TransferPath<'[a][b]c'>;    // a.b.c
 *
 */
export type TransferPath<P extends string, Path = DotTrim<P>> = P extends ''
  ? P
  : Path extends `[${infer K}]${infer NextK}`
  ? `${K}${EmptyNotDef<NextK, `.${TransferPath<NextK>}`>}` // [a][b] => a.b
  : Path extends `${infer K}[${infer NextK}]${infer Other}`
  ? `${DotTrim<K>}${EmptyNotDef<NextK, `.${NextK}`>}${EmptyNotDef<
      BracketsToEmpty<Other>,
      `.${TransferPath<Other>}`
    >}` // a[b] => a.b | a.[b] => a.b | a[b].c => a.b.c
  : Path extends `${infer K}.${infer NextK}`
  ? `${K}.${TransferPath<NextK>}`
  : Path; // a.b => a.b

// export type FormatPath<P extends string, R extends string = ''> = P extends | `[${infer K}].${infer NextK}`
//   | `[${infer K}]${infer NextK}`
//   | `${infer K}.[${infer NextK}]`
//   ? FormatPath<NextK, `${R}${K}${NextK extends '' ? '' : '.'}`>
//   : P extends `${infer K}[${infer NextK}].${infer Other}`
//     ? FormatPath<Other, `${R}${K}.${NextK}${Other extends `` ? `` : `.`}`>
//     : P extends `${infer K}[${infer NextK}]${infer Other}`
//       ? FormatPath<Other, `${R}${K}.${NextK}${Other extends `` ? `` : `.`}`>
//       : P extends `${infer K}.${infer NextK}`
//         ? FormatPath<NextK, `${R}${K}${NextK extends '' ? '' : '.'}`>
//         : `${R}${P}`;

// type TS<P> = P extends `${infer K}[${infer NextK}].${infer Other}` ? `${K}.${NextK}.${Other}` : "B"
// type T = FormatPath<`[a]`>; // a
// type T1 = FormatPath<`[a][b][c]`>; // a.b.c
// type T2 = FormatPath<`a.b.c`>; // a.b.c
// type T3 = FormatPath<`a[b]`>; // a.b
// type T4 = FormatPath<`a.[b]`>; // a.b
// type T5 = FormatPath<`[a][b][c`>; // error a.b.[c
// type T6 = FormatPath<`a[b][c]`>; // a.b.c
// type T7 = FormatPath<`a[b]c`>; // a.b.c
// type T8 = FormatPath<`a[b].c`>; // a.b.c
// type T9 = FormatPath<`[a][b]c`>; // a.b.c
// type T88 = TS<`a[b].c`>; // a.b.c

/**
 * 如果转换后的路径跟PathOf的路径一样，就说明该路径是对的并返回原path,否则返回PathOf所返回的类型
 *
 * @example
 * type T = TransferPathOf<{ a: string }, 'a', ''>; // 'a'
 * type T1 = TransferPathOf<{ a: string }, 'obj.a', 'obj'>; // 'obj.a'
 * type T2 = TransferPathOf<{ a: { b: { c: number } } }, 'obj.b', 'obj'>; // 'a'
 */
export type TransferPathOf<
  T extends object,
  K extends string,
  S extends string,
  NO_START extends string = DotTrim<RemoveStrStart<K, S>>,
  NO_START_PATH = TransferPath<NO_START>,
  PATH = PathOf<T, TransferPath<NO_START>>,
> = NO_START_PATH extends PATH ? K : PATH;

/**
 * Recursively convert objects to tuples, like
 * `{ name: { first: string } }` -> `['name'] | ['name', 'first']`
 */
type RecursivelyTuplePaths<NestedObj> = NestedObj extends (infer ItemValue)[] // Array 情况
  ? // Array 情况需要返回一个 number，然后继续递归
    [number] | [number, ...RecursivelyTuplePaths<ItemValue>] // 完全类似 JS 数组构造方法
  : NestedObj extends Record<string, any> // Record 情况
  ? // record 情况需要返回 record 最外层的 key，然后继续递归
    | [keyof NestedObj]
      | {
          [Key in keyof NestedObj]: [Key, ...RecursivelyTuplePaths<NestedObj[Key]>];
        }[Extract<keyof NestedObj, string>]
  : // 此处稍微有些复杂，但做的事其实就是构造一个对象，value 是我们想要的 tuple
    // 最后再将 value 提取出来
    // 既不是数组又不是 record 时，表示遇到了基本类型，递归结束，返回空 tuple。
    [];

/**
 * 把元组改为
 * Flatten tuples created by RecursivelyTupleKeys into a union of paths, like:
 * `['name'] | ['name', 'first' ] -> 'name' | 'name.first'`
 *
 * @example
 * type T = FlattenPathTuples<['name']>; // 'name'
 * type T2 = FlattenPathTuples<['name', 'first']>; // 'name.first'
 *
 * @example
 * type Res1 = FlattenPathTuples<['a', 'p', 'p', 'l', 'e']>; // 'a.p.p.l.e'
 * type Res2 = FlattenPathTuples<['Hello', 'World']>; //  'Hello.World'
 * type Res3 = FlattenPathTuples<['2', '2', '2']>; //  '2.2.2'
 * type Res4 = FlattenPathTuples<['o']>; //  'o'
 * type Res5 = FlattenPathTuples<[]>; //  never
 *
 */
type FlattenPathTuples<PathTuple extends unknown[]> = PathTuple extends []
  ? never
  : PathTuple extends [infer SinglePath] // 注意，[string] 是 Tuple
  ? SinglePath extends string | number // 通过条件判断提取 Path 类型
    ? `${SinglePath}`
    : never
  : PathTuple extends [infer PrefixPath, ...infer RestTuple] // 是不是和数组解构的语法很像？
  ? PrefixPath extends string | number // 通过条件判断继续递归
    ? `${PrefixPath}.${FlattenPathTuples<Extract<RestTuple, (string | number)[]>>}`
    : never
  : string;

/** 获取嵌套对象的全部子路径 */
type AllPathsOf<NestedObj> = object extends NestedObj
  ? never
  : // 先把全部子路径组织成 tuple union，再把每一个 tuple 展平为 Template Literal Type
    FlattenPathTuples<RecursivelyTuplePaths<NestedObj>>;

/**
 * 给定子路径和嵌套对象，获取子路径对应的 value 类型
 *
 * 路径不正确会error
 *
 * @example
 * type T = ValueMatchingPath<{ a: { b: string } }, 'a.b'>; // string
 * type T2 = ValueMatchingPath<{ a: { b: string } }, 'a.c'>; // error
 */
export type ValueMatchingPath<NestedObj, Path extends AllPathsOf<NestedObj>> = string extends Path
  ? any
  : object extends NestedObj
  ? any
  : NestedObj extends readonly (infer SingleValue)[] // Array 情况
  ? Path extends `${string}.${infer NextPath}`
    ? NextPath extends AllPathsOf<NestedObj[number]> // Path 有嵌套情况，继续递归
      ? ValueMatchingPath<NestedObj[number], NextPath>
      : never
    : SingleValue // Path 无嵌套情况，数组的 item 类型就是目标结果
  : Path extends keyof NestedObj // Record 情况
  ? NestedObj[Path] // Path 是 Record 的 key 之一，则可直接返回目标结果
  : Path extends `${infer Key}.${infer NextPath}` // 否则继续递归
  ? Key extends keyof NestedObj
    ? NextPath extends AllPathsOf<NestedObj[Key]> // 通过两层判断进入递归
      ? ValueMatchingPath<NestedObj[Key], NextPath>
      : never
    : never
  : never;

/**
 * 获取路径对应对象的类型
 *
 * @example
 * type T = TypeOfPath<{ a: number }, 'a'>; // number
 * type T2 = TypeOfPath<{ a: { b: { c: number } } }, TransferPath<'[a][b][c]'>>; // number
 */
export type TypeOfPath<T, K extends string> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? TypeOfPath<T[A], B>
    : T extends Array<infer I>
    ? TypeOfPath<I, B>
    : never
  : K extends keyof T
  ? T[K]
  : T extends Array<infer I>
  ? I
  : never;

/**
 * 由对象路径组成的union
 *
 * from: @nestjs/config
 *
 * @example
 * // 'a'
 * PathUnion<{ a: number }>;
 *
 * // 'a' | 'b'
 * PathUnion<{ a: number; b: string }>;
 *
 * // 'a' | 'b' | 'bb' | 'bb.c' | 'bb.cc' | 'bb.cc.d'
 * PathUnion<{ a: number; b: string; bb: { c: string; cc: { d: string } }}>;
 *
 * // 'a' | 'b' | 'b.c' | 'b.cc' | 'b.cc.dd' | 'bb' | 'bb.c' | 'bb.cc' | 'bb.cc.d'
 * PathUnion<{a: number; b: { c: boolean; cc: { dd: string }}; bb: { c: string; cc: { d: string }}}>;
 */
export type PathUnion<T> = keyof T extends string
  ? PathImpl2<T> extends infer P
    ? P extends string | keyof T
      ? P
      : keyof T
    : keyof T
  : never;
type PathImpl<T, Key extends keyof T> = Key extends string
  ? IsAny<T[Key]> extends true
    ? never
    : T[Key] extends Record<string, any>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;
type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;
