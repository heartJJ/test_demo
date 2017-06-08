/**
 * 杀掉 僵尸进程
 * 模拟杀掉 worker.id为 单数的子进程 
 */
const cluster = require('cluster'),
  http = require('http'),
  numCPUs = require('os').cpus().length;

const rssWarn = 50*1024*1024,
  heapWarn = 50*1024*1024;

const workers = [];

const createWorker = () => {
  const worker = cluster.fork();
  console.log(`Create worker: ${worker.id}`);

  // 允许开机时间
  workers.push(Object.assign({}, {
    worker: worker,
    lastCb: Date.now() - 1000
  }));


  worker.on('message', m => {
    if (m.cmd === 'reportMem') {
      const worker = workers.find(val => val.worker.process.pid === m.process);

      if (worker.worker.id % 2 === 0) {
        worker.lastCb = Date.now();
        console.log(`${worker.worker.process.pid} 进程可继续运行`);
      } else {
        console.log(`${worker.worker.process.pid} 进程将被杀掉`);
      }

      if (m.memory.rss > rssWarn) {
        console.log(`worker ${m.process} using too much memory`);
      }
    }
  });
};



if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    createWorker();
  }

  setInterval( () => {
    workers.forEach( (val, index) => {
      if (val.lastCb + 5000 < Date.now()) {
        console.log(`Long running worker ${val.worker.process.pid} killed`);
        val.worker.kill();
        workers.splice(index, 1);
        createWorker();
      }
    });
  }, 1000);

} else {

  http.createServer( (req, res) => {
    res.writeHead(200);
    res.end(`hello world from ${process.pid}\n`);

  }).listen(3000);

   // 每2秒报告一次状态
  setInterval( () => {
    // console.log(process.memoryUsage());
    process.send({
      cmd: 'reportMem',
      memory: process.memoryUsage(),
      process: process.pid
    });
  }, 2000);
}

