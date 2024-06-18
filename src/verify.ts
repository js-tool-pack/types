// import type { AntiBool } from './utils';

type IsUnknownExtend<T, B extends boolean> = unknown extends T ? B : false;
type IsUnknownLike<T> = [keyof T] extends [never] ? (never extends T ? true : false) : false;

/**
 * 判断类型是否是unknown
 * @example
 * type T = IsUnknown<unknown>; // true
 * type T2 = IsUnknown<any>; // false
 * type T3 = IsUnknown<never>; // false
 * type t4 = IsUnknown<boolean>; // false
 * type t5 = IsUnknown<''>; // false
 */
export type IsUnknown<T> = IsUnknownExtend<T, IsUnknownLike<T>>;

/**
 * 判断类型是否是any
 * @example
 * type T = IsAny<any>; // true
 * type T2 = IsAny<number>; // false
 * type t3 = IsAny<{}>; // false
 * type t4 = IsAny<never>; // false
 * type t5 = IsAny<undefined>; // false
 * type t6 = IsAny<null>; // false
 * type t7 = IsAny<unknown>; // false
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
// export type IsAny<T> = IsUnknownExtend<T, AntiBool<IsUnknownLike<T>>>;

/**
 * 判断类型是否是union
 *
 * 注意: boolean也是union // 参考文章：https://zhuanlan.zhihu.com/p/469912347
 * @example
 * type T = IsUnion<{ a: number } | { b: string }>; // true
 * type T1 = IsUnion<boolean>; // true
 * type T2 = IsUnion<{ a: number } & { b: string }>; // false
 * type T3 = IsUnion<any>; // false
 * type T4 = IsUnion<unknown>; // false
 * type T5 = IsUnion<void>; // false
 */
export type IsUnion<T, U extends T = T> =
  /*
    `T extends any`对联合类型分发，`(U extends T ? false : true)`内的T实际是分发后的类型
    具体可套用例子 https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
   */
  (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;

// playground https://www.typescriptlang.org/play?#code/C4TwDgpgBAKhDOwA8MA0UCqUIA9gQDsATeWKAXlgD4KoAoKKAegCoHGoADGbPQkqAEMCIToE-tQCoBgCBVA3j6Bo9UBgSoEXlQDD-nABRZc+YqR4B+KADNBAG3jQAXFGAAnAK4QAlJ0ChioBC3GIDztQKJpgejNlQDgVd3l2RkB3RUBleUB75UB1TUAKVygAC2BgMHhLJiYAd1yAOlBIeABjWwBLMGBTYQBzPIB7WxqmInri+CYk4SIAI3r6gGsmACYmYvriMuAyibMAWkKEPJSAW1MAYiIyxHKe+2mANwg58cnp2dMF8AQwliYwqHUybX5SYRAoQ01eHQEDYzMFig1jsjicwKgBAgR1s4JeugB5mghhMSIhoIgAG46HRFrAEMAAIwodBaPgIniUGA0Shk356T6IoEghxYnF4yn4xBIQlQAA+UGGVGxWQ4AD19LjrrBeVSCcTCXyhVARUxxZK6KK4NzFcqgtEFIBjyMAXHJSyBQADK+DAsqgvIFwx+rztjNRzJsrNV6rN0CtEDAjso9sFToRjpRgKsHscXsYEp9lutAGZaH6bfzE-7hrGoPGcaLAAMWgFPzZSAUYNAK2KCYAIttkGhMKG-rRqc2ANoAXWxeJriGGJIb8KbVJpmA7XelPeASf7dOdnJbVMbbxEjJgHYhUJh4-Nk4ALDOl1B7AQBgR6tkCM2RzxB8uPoYMOvrJuILZsdXaJOeUrhZq1XHJW7QMoEnPtdV-UUAOrFNKEnadwL-b1u13T9a33BDINzfQgA
// IsUnion<1 | 2> 分发后可分解为
// type Step1 = 1 | 2 extends 1 ? false : true; // true
// type Step2 = 1 | 2 extends 2 ? false : true; // true
// type Step3 = Step1 | Step2; // true
