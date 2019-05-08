/**
 * 使用 MessageChannel 让两个子线程直接通信
 */


const {
  isMainThread, parentPort, workerData, threadId,
  MessageChannel, MessagePort, Worker
} = require('worker_threads');

if (isMainThread) {
  const worker1 = new Worker(__filename);
  const worker2 = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker1.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  worker2.postMessage({ hereIsYourPort: subChannel.port2 }, [subChannel.port2]);
} else {
  parentPort.once('message', (value) => {
    value.hereIsYourPort.postMessage('hello');
    value.hereIsYourPort.on('message', msg => {
      console.log(`thread ${threadId}: receive ${msg}`);
    });
  });
}
