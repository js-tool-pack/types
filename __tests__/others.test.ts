import { expectError, expectType } from './utils';
import { PopUnion } from '../src';

describe('others', () => {
  test('SettableProps', () => {
    type Str = PopUnion<string>; // string
    type Num = PopUnion<string | number>; // number
    type Bool = PopUnion<string | number | object | boolean>; // true
    type Obj = PopUnion<string | number | object>; // object

    expectType<Str>('');
    expectType<Num>(1);
    expectType<Bool>(true);
    expectType<Obj>({});

    // @ts-expect-error
    expectError<Str>(1);
  });
});
