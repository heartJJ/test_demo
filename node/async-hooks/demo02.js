/**
 * 我们可以通过 async_hooks.createHook 函数来注册关于每个异步资源在生命周期中发生的 init/before/after/destory/promiseResolve 等相关事件的监听函数；
 * 同一个 async scope 可能会被调用及执行多次，不管执行多少次，其 asyncId 必然相同，通过监听函数，我们很方便追踪其执行的次数及时间及上线文关系；
 * 
 * 需在 node 8.x 版本运行
 * 
 * 由于 console.log 函数也是一个异步调用，如果我们在 asyncHook 函数中再调用 console.log 那么将再次触发相应的 hook 事件，造成死循环调用，所以我们在 asyncHook 函数中必须使用同步打印日志方式来跟踪，可以使用 fs.writeSync 函数：
 */

const fs = require('fs');
const async_hooks = require('async_hooks');

let indent = 0;

async_hooks.createHook({
  init(asyncId, type, triggerId) {
    const cId = async_hooks.currentId(); // async_hooks.currentId is deprecated. Use async_hooks.executionAsyncId instead.
    print(`${getIndent(indent)}${type}(${asyncId}): trigger: ${triggerId} scope: ${cId}`);
  },
  before(asyncId) {
    print(`${getIndent(indent)}before:  ${asyncId}`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    print(`${getIndent(indent)}after:   ${asyncId}`);
  },
  destroy(asyncId) {
    print(`${getIndent(indent)}destroy: ${asyncId}`);
  },
}).enable();

let server = require('net').createServer((sock) => {
  sock.end('hello world\n');
  server.close();
});

server.listen(8080, () => print('server started'));

function print(str) {
  fs.writeSync(1, str + '\n');
}

function getIndent(n) {
  return ' '.repeat(n);
}

// 执行结果如下

// TickObject(6): trigger: 1 scope: 1
// TCPWRAP(5): trigger: 1 scope: 1
// TickObject(7): trigger: 5 scope: 1
// before:  6
//   TickObject(8): trigger: 6 scope: 6
// after:   6
// before:  7
// server started
// after:   7
// before:  8
// after:   8
// destroy: 6
// destroy: 7
// destroy: 8
