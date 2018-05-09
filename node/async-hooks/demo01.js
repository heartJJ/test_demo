const async_hooks = require('async_hooks');

setTimeout(() => {
  console.log('first setTimeout id', async_hooks.executionAsyncId()); // 2
});

setTimeout(() => {
  console.log('second setTimeout id', async_hooks.executionAsyncId()); // 4
});