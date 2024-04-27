import {
  $,
  Call,
  Else,
  Export,
  Func,
  If,
  Module,
  Return,
  Then,
  i32,
  local,
  param,
  render,
  result,
} from '@xwat/xwat';

function Fib() {
  const $n = <param.i32 />;
  const $ret = <result.i32 />;
  return (
    <Func params={[$n]} ret={$ret}>
      <local.get var={$n} />
      <i32.const value={2} />
      <i32.lt_u />
      <If ret={$ret}>
        <Then>
          <local.get var={$n} />
        </Then>
        <Else>
          <local.get var={$n} />
          <i32.const value={1} />
          <i32.sub />
          <Call fn={Fib} />
          <local.get var={$n} />
          <i32.const value={2} />
          <i32.sub />
          <Call fn={Fib} />
          <i32.add />
        </Else>
      </If>
    </Func>
  );
}
export default (
  <Module>
    <Export value={Fib} />
  </Module>
);
