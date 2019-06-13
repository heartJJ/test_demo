let cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
  _ = require('lodash'),
  v = 40,
  start_time = Date.now();

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}
// console.time('8 cluster');
if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
  cluster.on('exit', function(worker, code, signal) {
    if ( _.isEmpty(cluster.workers)) {
      console.log(Date.now() - start_time);
      process.exit(0);
    }
  });
} else {
  console.log(fibo(v));
  process.exit(0);           
}