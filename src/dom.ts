import type { ReadonlyKeys } from './object';

/**
 * 获取所有可更改的css属性所组成的新type
 */
export type SettableDOMStyle = Partial<
  Omit<CSSStyleDeclaration, ReadonlyKeys<CSSStyleDeclaration>>
>;

/**
 * 获取所有可更改的HTMLElement属性组成的新type
 */
export type SettableDOMProps<R extends HTMLElement> = Partial<
  Omit<R, ReadonlyKeys<R> | 'style'>
> & { style?: SettableDOMStyle };
