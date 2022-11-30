export function expectType<T>(_value: T) {}
export function expectError<T>(_value: T) {}
export function expectAssignable<T, T2 extends T = T>(_value: T2) {}

export type IsUnion<T, U extends T = T> = (
  T extends any ? (U extends T ? false : true) : never
) extends false
  ? false
  : true;

export type IsAny<T> = 0 extends 1 & T ? true : false;
