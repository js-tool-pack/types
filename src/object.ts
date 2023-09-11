// https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir#

/**
 * 判断两种类型是否相等，如果X===Y返回A，否则返回B
 *
 * @example
 * type T = IfEquals<{}, {}, true, false>; // true
 * type T2 = IfEquals<{ a: string }, {}, true, false>; // false
 * type T3 = IfEquals<true, false, 'a', 'b'>; // 'b'
 * type T4 = IfEquals<1, 2, 1, 2>; // 2
 * type T5 = IfEquals<1, 1, 'a', 'b'>; // 'a'
 *
 */
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? A
  : B;

/**
 * 与IfEquals返回相反的答案，如果X===Y返回B，否则返回A
 *
 * @example
 * type T = IfEqualsReverse<{}, {}, true, false>; // false
 * type T2 = IfEqualsReverse<{ a: string }, {}, true, false>; // true
 * type T3 = IfEqualsReverse<true, false, 'a', 'b'>; // 'a'
 * type T4 = IfEqualsReverse<1, 2, 1, 2>; // 1
 * type T5 = IfEqualsReverse<1, 1, 'a', 'b'>; // 'b'
 */
export type IfEqualsReverse<X, Y, A = X, B = never> = IfEquals<X, Y, B, A>;

/**
 * 找出readonly属性
 *
 * 跟WritableKeys相反
 *
 * @example
 * type T = ReadonlyKeys<{ readonly a: number; b: string; readonly c: boolean }>; // 'a'|'c'
 */
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

/**
 * 找出非readonly属性
 *
 * 跟ReadonlyKeys相反
 *
 * @example
 * type T = WritableKeys<{ readonly a: number; b: string; readonly c: boolean; d: string }>; // 'b'|'d'
 */
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

/**
 * 找出required属性
 *
 * 跟OptionalKeys相反
 *
 * @example
 * type T = RequiredKeys<{ a: string; b?: number; c: boolean }>; // 'a'|'c'
 *
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

/**
 * 找出optional属性
 *
 * @example
 * type T = OptionalKeys<{ a: string; b?: number; c: boolean }>; // 'b'
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

/**
 * pick所有Required属性组成新type
 *
 * @example
 * interface I {
 *   a: string;
 *   b?: number;
 *   c: boolean | undefined;
 * }
 *
 * type T = RequiredOnly<I>; // {a: string; c: boolean | undefined}
 * type T2 = OptionalKeys<I>; // "b"
 */
export type RequiredOnly<T> = Pick<T, RequiredKeys<T>>;

/**
 * pick所有public属性组成新的type
 *
 * @example
 * class Foo {
 *   public a = '';
 *   protected b = 2;
 *   private c = false;
 *
 *   constructor() {
 *     console.log(this.c);
 *   }
 * }
 * type T = PublicOnly<Foo>; // {a: string}
 */
export type PublicOnly<T> = Pick<T, keyof T>; // seems like a no-op but it works

/**
 * 获取两个Object中重复的key name
 * @example
 *  type T = DuplicateKeys<{ a: string }, { b: string }>; // never
 *  type T1 = DuplicateKeys<{ a: string }, { a: string }>; // "a"
 *  type T2 = DuplicateKeys<{ a: string; b: string }, { a: string }>; // "a"
 *  type T3 = DuplicateKeys<{ a: string; b: string }, { a: string; b: string }>; // "a"|"b"
 */
export type DuplicateKeys<A, B> = { [P in keyof A]-?: P extends keyof B ? P : never }[keyof A];

/**
 * 排查两个Object中是否有重复的key name，有就返回重复的key name集合，否则返回合并之后的Object
 * @example
 * type T = CheckDuplicateKey2<{ a: string }, { b: string }>; // { a: string } & { b: string }
 * type T2 = CheckDuplicateKey2<{ a: string }, { a: string }>; // 'a'
 */
type CheckDuplicateKey2<A, B> = DuplicateKeys<A, B> extends never ? A & B : DuplicateKeys<A, B>;

/**
 * @see CheckDuplicateKey2
 */
type CheckDuplicateKey3<A, B, C> = CheckDuplicateKey2<A, B> extends A & B
  ? CheckDuplicateKey2<C, CheckDuplicateKey2<A, B>>
  : CheckDuplicateKey2<A, B>;
/**
 * @see CheckDuplicateKey2
 */
type CheckDuplicateKey4<A, B, C, D> = CheckDuplicateKey3<A, B, C> extends A & B & C
  ? CheckDuplicateKey2<D, CheckDuplicateKey3<A, B, C>>
  : CheckDuplicateKey3<A, B, C>;
/**
 * @see CheckDuplicateKey2
 */
type CheckDuplicateKey5<A, B, C, D, E> = CheckDuplicateKey4<A, B, C, D> extends A & B & C & D
  ? CheckDuplicateKey2<E, CheckDuplicateKey4<A, B, C, D>>
  : CheckDuplicateKey4<A, B, C, D>;

/**
 * 排查最多5个最少2个Object中是否有重复的key name，有就返回重复的key name集合，否则返回合并之后的Object
 * @tips 多个object key重复时不一定会全部显示重复的key name出来，可能会去掉一个重复的key才会出现下一个重复的
 * @example
 * interface ABC {
 *   a: string;
 *   b: string;
 *   c: string;
 * }
 * type T = CheckDuplicateKey<{ a: string }, ABC, ABC, ABC, ABC>; // 'a'实际是'a'|'b'|'c'，但是需要把前面的修复才会显示后面的
 * type T1 = CheckDuplicateKey<{ a: string; b: string }, ABC, ABC, ABC, ABC>; // 'a'|'b' 实际是'a'|'b'|'c'
 * type T2 = CheckDuplicateKey<ABC, ABC, ABC, ABC, ABC>; // 'a'|'b'|'c'
 * type T3 = CheckDuplicateKey<ABC, ABC, ABC, ABC>; // 'a'|'b'|'c'
 * type T4 = CheckDuplicateKey<ABC, ABC, ABC>; // 'a'|'b'|'c'
 * type T5 = CheckDuplicateKey<ABC, ABC>; // 'a'|'b'|'c'
 * type T6 = CheckDuplicateKey<ABC>; // never
 */
export type CheckDuplicateKey<A, B = {}, C = {}, D = {}, E = {}> = CheckDuplicateKey5<
  A,
  B,
  C,
  D,
  E
>;

/**
 * 从函数参数中移除第一个参数类型
 * @example
 * type T = OmitFirstParameters<(a:number, b:string)=>any>; // [b:string]
 */
export type OmitFirstParameters<T extends Function> = T extends (_: any, ...args: infer I) => any
  ? I
  : never;

/**
 * @example
 *
 * type T = UrlParams<'a=1&b=2'>; // {a:'1';b:'2'}
 *
 * // 联想到rust的
 * // let c:i32 = test(); // c:i32
 * // let c:u8 = test(); // u8
 */
export type UrlParams<T, R = {}> = T extends `${infer K}=${infer V}${infer Other}`
  ? UrlParams<Other extends `&${infer O}` ? O : Other, { [k in K]: V }> & R
  : R;

/**
 * Readonly深度递归版
 * ---
 * 官方提供的Readonly只有一层，类似Object.assign
 *
 * @example
 *
 * interface A {
 *   a: number;
 *   b: string;
 *   c: {
 *     d: boolean;
 *     f: string;
 *   };
 * }
 *
 * type B = DeepReadonly<A>;
 * // type B 和下面注释的类型相等
 * // type B = {
 * //   readonly a: number;
 * //   readonly b: string;
 * //   readonly c: DeepReadonly<{
 * //     d: boolean;
 * //     f: string;
 * //   }>;
 * // }
 *
 * const b: B = { a: 1, b: '', c: { d: true, f: '' } };
 *
 * b.c.d = false; // error 不能修改.c.d，ts检查会报错
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/**
 * 把一个对象选中的key从Partial改为Required
 *
 * @example
 *
 * interface O {
 *   a?: number;
 *   b?: number;
 *   c: number;
 * }
 *
 * RequiredPart<O, 'a'>; // { a: number; b?: number; c: number; }
 *
 */
export type RequiredPart<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * 把一个对象选中的key从Required改为Partial
 *
 * 功能与RequiredPart相反
 *
 * @example
 *
 * interface O {
 *   a: number;
 *   b: number;
 *   c: number;
 * }
 *
 * RequiredPart<O, 'a' | 'c'>; // { a?: number; b: number; c?: number; }
 *
 */
export type PartialPart<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 把元组转为对象，并用元组的元素作为对象的key
 *
 * @example
 *
 * const a = ['a', 'b', 'c', 1, 2, 3] as const;
 * type T = TupleToObj<typeof a, string>; // { '1'?: string; '2'?: string; '3'?: string; a?: string; b?: string; c?: string }
 * type T2 = TupleToObj<typeof a, string, 'a' | 'c', 'dd'>; // { '1'?: string; '2'?: string; '3'?: string; a?: 'dd'; b?: string; c?: 'dd' }
 */
export type TupleToObj<T extends ReadonlyArray<string | number>, V, E = null, V2 = null> = {
  [K in T[number]]?: K extends E ? V2 : V;
};

type RequiredOptional<T> = { [K in keyof T]-?: T[K] | undefined };
/**
 * 转换对象中部分可选属性为必选，并且原值类型加上`| undefined`
 *
 * @example
 *
 * interface T {
 *   a?: 1;
 *   b?: 2;
 *   c: 3;
 * }
 *
 * ConvertOptionalPart<T, 'a'> // { a: 1 | undefined; b?: 2; c: 3}
 * // c 不是可选属性而被忽略
 * ConvertOptionalPart<T, 'a' | 'b' | 'c'> // { a: 1 | undefined; b: 2 | undefined; c: 3}
 *
 *
 */
export type ConvertOptionalPart<T, K extends keyof T, OK = OptionalKeys<Pick<T, K>>> =
  // 挑选可选属性并转为对应类型加 | undefined
  RequiredOptional<Pick<T, Extract<keyof T, OK>>> &
    // 排除可选属性
    Omit<T, Extract<keyof T, OK>>;
