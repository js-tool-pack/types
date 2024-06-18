/**
 * 反转boolean
 * @example
 * type T = AntiBool<true>; // false
 * type T2 = AntiBool<false>; // true
 */
export type AntiBool<T extends boolean> = T extends true ? false : true;

/**
 * 能省几个字母
 */
export type FN = () => void;
