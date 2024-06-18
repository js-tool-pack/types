/**
 * 返回一个由单一类型组成的元组
 *
 * 注意：N最多为999，多了会报错
 * @example
 * type T = Tuple<number, 3> // => [number, number, number]
 * type T2 = Tuple<string, 2> // => [string, string]
 */
export type Tuple<T, N extends number, R extends unknown[] = []> = R['length'] extends N
  ? R
  : Tuple<T, N, [T, ...R]>;

// export type Tuple<T, N extends number, R extends unknown[] = []> =
//     N extends N  // 第一个是分发, N可能是个union
//         ? number extends N // 第二个是N为any时降级
//             ? T[]
//             : R['length'] extends N ? R : Tuple<T, N, [T, ...R]>
//         : never;

// type T = Tuple<number, 1> // => [number, number, number]

/**
 * 把元组转成联合类型
 * @example
 * type ttu = TupleToUnion<[number, string]>; // string | number
 */
export type TupleToUnion<T extends unknown[]> = T extends [infer F, ...infer REST]
  ? TupleToUnion<REST> | F
  : never;

/**
 * 返回length为M到N的联合数组类型
 * @example
 * type a = TupleM2N<number, 0, 2>;// [] | [number] | [number, number]
 */
export type TupleM2N<
  T,
  M extends number,
  N extends number,
  I extends T[] = Tuple<T, M>,
  R extends unknown[] = [],
> = I['length'] extends N ? TupleToUnion<[...R, I]> : TupleM2N<T, M, N, [...I, T], [...R, I]>;

/**
 * 类似Array.prototype.shift
 * @example
 * type T = TupleShift<[1, 2, 3]>; // [2, 3]
 * type T2 = TupleShift<[2, 3]>;   // [3]
 * type T3 = TupleShift<[3]>;      // []
 * type T4 = TupleShift<[]>;       // unknown[]
 */
export type TupleShift<T extends any[] = any[]> = T extends [any?, ...infer U] ? U : never;

/**
 * 类似Array.prototype.join
 * @example
 * type Res1 = TupleJoin<['a', 'p', 'p', 'l', 'e'], '-'>; // 'a-p-p-l-e'
 * type Res2 = TupleJoin<['Hello', 'World'], ' '>;        //  'Hello World'
 * type Res3 = TupleJoin<['2', '2', '2'], 1>;             //  '21212'
 * type Res4 = TupleJoin<['o'], 'u'>;                     //  'o'
 * type Res5 = TupleJoin<[], ''>;                         //  ''
 */
export type TupleJoin<T extends any[], U extends string | number> = T[0] extends void
  ? ''
  : T['length'] extends 1
    ? T[0]
    : `${T[0]}${U}${TupleJoin<TupleShift<T>, U>}`;

/**
 * 坐标点
 */
export type Point = [x: number, y: number];
