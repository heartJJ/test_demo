/**
 * 简单使用 cluster模块
 * 轮询机制，4个子进程循环调用，达到一定程度上的负载均衡
 */

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

let sum = 0;

if (cluster.isMaster) {
  console.log('master start...');

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('listening',function(worker,address){
    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+':'+address.port);
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    // cluster.fork(); // 主进程不断重启子进程
  });
} else {
  sum ++;
  console.log(sum);

  http.createServer(function(req, res) {
    console.log('现在是'+ process.pid + '正在工作');
    res.writeHead(200); 
    res.end('hello world\n');
  }).listen(3000);
}