/**
 * 简单使用 cluster模块
 * 轮询机制，4个子进程循环调用，达到一定程度上的负载均衡
 * 
 * 每3秒钟回包一次状态
 */

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

const rssWarn = 12*1024*1024,
  heapWarn = 10*1024*1024;

if (cluster.isMaster) {
  console.log('master start...');

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    let worker = cluster.fork();

    worker.on('message', m => {
      if (m.memory) {
        if (m.memory.rss > rssWarn) {
          console.log('Worker ' + m.process + ' using too much memory.');
        }
      }
    });
  }

  cluster.on('listening',function(worker,address){
    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+':'+address.port);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    // cluster.fork(); // 主进程不断重启子进程
  });
} else {
  http.createServer(function(req, res) {
    console.log('现在是'+ process.pid + '正在工作');
    res.writeHead(200); 
    res.end('hello world\n');
  }).listen(3000);

  // 每秒报告一次状态
  setInterval( () => {
    // console.log(process.memoryUsage());
    process.send({
      memory: process.memoryUsage(),
      process: process.pid
    });
  }, 3000);
}