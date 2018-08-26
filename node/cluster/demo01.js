
/**
 * 通过消息传递来监控工作进程状态
 */
const cluster = require('cluster'),
  http = require('http'),
  numCPUs = require('os').cpus().length;

const rssWarn = 12*1024*1024,
  heapWarn = 10*1024*1024;

if (cluster.isMaster) {
  for(let i=0; i < numCPUs; i++) {
    let worker = cluster.fork();

    worker.on('message', m => {
      if (m.memory) {
        if (m.memory.rss > rssWarn) {
          console.log('Worker ' + m.process + ' using too much memory.');
        }
      }
    });

  }
} else {
  // 服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world');
  }).listen(3000);

  // 每秒报告一次状态
  setInterval( () => {
    // console.log(process.memoryUsage());
    process.send({
      memory: process.memoryUsage(),
      process: process.pid
    });
  }, 3000);

