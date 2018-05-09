const fs = require('fs')
const async_hooks = require('async_hooks')
const id_map = new Map();

async_hooks.createHook({
  init (asyncId, type, triggerAsyncId, resource) {
    id_map.set(asyncId, triggerAsyncId);
    fs.writeSync(1, `${type}(${asyncId}): trigger: ${triggerAsyncId}\n`)
  },
  destroy (asyncId) {
    fs.writeSync(1, `destroy: ${asyncId}\n`);
  }
}).enable()

async function A () {
  fs.writeSync(1, `A -> ${async_hooks.executionAsyncId()}\n`)
  setTimeout(() => {
    fs.writeSync(1, `A in setTimeout -> ${async_hooks.executionAsyncId()}\n`)
    B()
  })
}

async function B () {
  fs.writeSync(1, `B -> ${async_hooks.executionAsyncId()}\n`)
  process.nextTick(() => {
    fs.writeSync(1, `B in process.nextTick -> ${async_hooks.executionAsyncId()}\n`)
    C()
    // C()
  })
}

function C () {
  fs.writeSync(1, `C -> ${async_hooks.executionAsyncId()}\n`)
  Promise.resolve().then(() => {
    fs.writeSync(1, `C in promise.then -> ${async_hooks.executionAsyncId()}\n`);
    console.log(id_map);
  })
}

fs.writeSync(1, `top level -> ${async_hooks.executionAsyncId()}\n`)
A()

