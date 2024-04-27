import { bench, describe, expect } from 'vitest';
import { createWasm } from '@xwat/wabt';
import {
  $,
  Export,
  Fragment,
  Func,
  Import,
  Memory,
  Module,
  Offset,
  f32,
  i32,
  local,
  param,
  result,
} from '@xwat/xwat';
import Mod from '../src/fib';

function jsFib(n: number): number {
  return n < 2 ? n : jsFib(n - 1) + jsFib(n - 2);
}

describe('fib', async () => {
  const {
    exports: { Fib },
  } = await createWasm<{ Fib: (a: number) => number }>(Mod);

  for (let i = 1; i <= 16; i++) {
    // console.log(i, jsFib(i), Fib(i));
    expect(jsFib(i)=== Fib(i)).toEqual(true)
  }
  bench('js', () => {
    for (let i = 1; i <= 16; i++) {
      jsFib(i);
    }
  });

  bench('wasm', () => {
    for (let i = 1; i <= 16; i++) {
      Fib(i);
    }
  });
});
