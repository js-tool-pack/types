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
export type IsUnknown<T> = unknown extends T
  ? [keyof T] extends [never]
    ? never extends T
      ? true
      : false
    : false
  : false;
