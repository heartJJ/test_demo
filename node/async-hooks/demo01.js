/**
 * 每一个函数都会提供一个上下文，我们称之为 async scope；
 * 每一个 async scope 中都有一个 asyncId, 是当前 async scope 的标志，同一个的 async scope 中 asyncId 必然相同，最外层的 asyncId 是 1，每个异步资源在创建时 asyncId 全量递增的；
 * 每一个 async scope 中都有一个 triggerAsyncId 表示当前函数是由那个 async scope 触发生成的；
 * 通过 asyncId 和 triggerAsyncId 我们可以很方便的追踪整个异步的调用关系及链路；
 */

const async_hooks = require('async_hooks');

console.log('global asyncId', async_hooks.executionAsyncId());  // 1
console.log('global triggerAsyncId', async_hooks.triggerAsyncId()); // 0

setTimeout(() => {
  console.log('first setTimeout asyncId', async_hooks.executionAsyncId()); // 递增
  console.log('first setTimeout triggerAsyncId', async_hooks.triggerAsyncId()); // 1
});

setTimeout(() => {
  console.log('second setTimeout asyncId', async_hooks.executionAsyncId()); // 递增
  console.log('second setTimeout triggerAsyncId', async_hooks.triggerAsyncId()); // 1
});