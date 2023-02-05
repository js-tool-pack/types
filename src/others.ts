type UnionToIntersection<T> = (T extends any ? (x: T) => 1 : never) extends (x: infer U) => infer R
  ? R extends any
    ? U // 该表达式直接返回 U 即可，加上表达式是为了避免 R 未使用导致 tsc 报错
    : never
  : never;

/**
 * 从union类型中获取最后一个参数
 *
 * @example
 *
 * type Str = PopUnion<string>; // string
 * type Num = PopUnion<string | number>; // number
 * type Obj = PopUnion<string | number | object>; // object
 *
 */
export type PopUnion<T> = UnionToIntersection<T extends any ? (x: T) => 1 : never> extends (
  x: infer U,
) => 1
  ? U
  : never;
