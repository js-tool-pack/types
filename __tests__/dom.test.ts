import type { SettableDOMProps, SettableDOMStyle } from '../src';
import { expectError, expectType } from './utils';

describe('dom', () => {
  test('SettableProps', () => {
    type T = SettableDOMStyle;
    expectType<T>({ background: '', color: 'red' });
    // @ts-expect-error
    expectError<T>({ id: '' });

    expectType<SettableDOMProps<HTMLAnchorElement>>({ className: '', href: '', id: '' });
  });
  test('SettableProps', () => {
    type T = SettableDOMProps<HTMLDivElement>;
    expectType<T>({ className: '', id: '' });
    // @ts-expect-error
    expectError<T>({ className: '', href: '', id: '' });

    expectType<SettableDOMProps<HTMLAnchorElement>>({ className: '', href: '', id: '' });
  });
});
