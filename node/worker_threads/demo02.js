/**
 * isMainThread：false 表示当前为 worker 线程，false 表示为主线程
 * parentPort: 在 worker 线程里是表示父进程的 MessagePort 类型的对象，在主线程里为 null
 * workerData: 在 worker 线程里是父进程创建 worker 线程时的初始化数据，在主线程里是 undefined
 * threadId: 在 worker 线程里是线程 ID，在父进程里是 0。
 * MessageChannel: 包含两个已经互相能够夸线程通信的 MessagePort 类型对象，可用于创建自定义的通信频道，可参考样例二的实现。
 * MessagePort: 用于跨线程通信的句柄，继承了 EventEmitter，包括 close message 事件用于接收对象关闭和发送的消息，以及 close postMessage 等操作。
 * Worker: 主线程用于创建 worker 线程的对象类型，包含所有的 MessagePort 操作以及一些特有的子线程 meta data 操作。构造函数的第一个参数是子线程执行的入口脚本程序，第二个参数包含一些配置项，可以指定一些初始参数。
 */

/**
 * 字母进程间互相通信，计算为5时子进程退出
 */
const {
  isMainThread, parentPort, workerData, threadId,
  MessageChannel, MessagePort, Worker
} = require('worker_threads');

function mainThread() {
  const worker = new Worker(__filename, { workerData: 0 });
  worker.on('exit', code => { console.log(`main: worker stopped with exit code ${code}`); });
  worker.on('message', msg => {
    console.log(`main: receive ${msg}`);
    worker.postMessage(msg + 1);
  });
}

function workerThread() {
  console.log(`worker: threadId ${threadId} start with ${__filename}`);
  console.log(`worker: workerDate ${workerData}`);
  parentPort.on('message', msg => {
    console.log(`worker: receive ${msg}`);
    if (msg === 5) { process.exit(); }
    parentPort.postMessage(msg);
  }),
  parentPort.postMessage(workerData);
}

if (isMainThread) {
  mainThread();
} else {
  workerThread();
}
