import type { AntiBool } from './utils';

type IsUnknownExtend<T, B extends boolean> = unknown extends T ? B : false;
type IsUnknownLike<T> = [keyof T] extends [never] ? (never extends T ? true : false) : false;

/**
 * 判断一个类型是否是unknown
 *
 * @example
 * type T = IsUnknown<unknown>; // true
 * type T2 = IsUnknown<any>; // false
 * type T3 = IsUnknown<never>; // false
 * type t4 = IsUnknown<boolean>; // false
 * type t5 = IsUnknown<''>; // false
 */
export type IsUnknown<T> = IsUnknownExtend<T, IsUnknownLike<T>>;

/**
 * 判断一个类型是否是any
 *
 * @example
 * type T = IsAny<any>; // true
 * type T2 = IsAny<number>; // false
 * type t3 = IsAny<{}>; // false
 * type t4 = IsAny<never>; // false
 * type t5 = IsAny<undefined>; // false
 * type t6 = IsAny<null>; // false
 * type t7 = IsAny<unknown>; // false
 *
 */
export type IsAny<T> = IsUnknownExtend<T, AntiBool<IsUnknownLike<T>>>;
