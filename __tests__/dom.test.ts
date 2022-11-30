import { expectError, expectType } from './utils';
import { SettableDOMProps, SettableDOMStyle } from '../src';

describe('dom', () => {
  test('SettableProps', () => {
    type T = SettableDOMStyle;
    expectType<T>({ background: '', color: 'red' });
    // @ts-expect-error
    expectError<T>({ id: '' });

    expectType<SettableDOMProps<HTMLAnchorElement>>({ id: '', className: '', href: '' });
  });
  test('SettableProps', () => {
    type T = SettableDOMProps<HTMLDivElement>;
    expectType<T>({ id: '', className: '' });
    // @ts-expect-error
    expectError<T>({ id: '', className: '', href: '' });

    expectType<SettableDOMProps<HTMLAnchorElement>>({ id: '', className: '', href: '' });
  });
});
