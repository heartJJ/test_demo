let cluster = require('cluster'),
  cp = require('child_process'),
  numCPUs = require('os').cpus().length,
  _ = require('lodash'),
  arr = [],
  start_time = Date.now(),
  index = -1;

for (let i = 35; i < 45; i ++) {
  arr.push(i);
}

// function factorial (num) { 
//   if (num < 0) { 
//     return -1; 
//   } else if (num === 0 || num === 1) { 
//     return 1; 
//   } else { 
//     return (num * factorial(num - 1)); 
//   } 
// };

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

if (cluster.isMaster) {
   // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('message', (worker, msg)=> {
    console.log(`子进程${worker.process.pid}: ${msg}`);
    index++;
  
    index < arr.length ?
      worker.send(arr[index]) :
      worker.send('执行完毕');
  });
  
  cluster.on('exit', function(worker, code, signal) {
    if ( _.isEmpty(cluster.workers)) {
      console.log(Date.now() - start_time);
      process.exit(0);
    }
  });


} else {
  // console.log(cluster.worker.id);
  process.send('启动');

  process.on('message', v => {
    if (v > 0) {
      let sum = fibo(v);
      // console.log(`${v} finish cal ,result is ${sum}`);
      process.send(`${v} finish cal ,result is ${sum}`);
    } else {
      process.exit(0);
    }
  });
}


