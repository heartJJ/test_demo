/**
 * node --experimental-worker demo01.js  需加上该参数
 */

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

let currentVal = 0;
let intervals = [100,1000, 500];

function counter(id, i){
  console.log('[', id, ']', i);
  return i;
}

if(isMainThread) {
  console.log('this is the main thread');
  for(let i = 0; i < 2; i++) {
    new Worker(__filename, {workerData: i}); // workerData 为 子进程初始化时获取的数据
  }

  setInterval((a) => currentVal = counter(a,currentVal + 1), intervals[2], 'MainThread', currentVal); // 每隔 0.5 秒打印
} else {

  console.log('this isn "t" ' );

  setInterval((a) => currentVal = counter(a,currentVal + 1), intervals[workerData], workerData, currentVal); // 第一个子进程 0.1 秒打印一次  ， 第二个子进程 1秒打印一次

}