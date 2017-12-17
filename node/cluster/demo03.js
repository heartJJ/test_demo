var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

var i = 0;

const pro = () => {
    if (cluster.isMaster) {
        console.log("master start...");
    
        // Fork workers.
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', function(worker, code, signal) {
            // console.log('worker ' + worker.process.pid + ' died');
            console.log('worker ' + worker.id + ' died');
        });
    } else {
        switch(cluster.worker.id) {
            case 1:   console.log('------, now i is ', i); break;
            case 2:  console.log('------, now i is ', i); break;
            case 3:   console.log('------, now i is ', i); break;
            case 4:    console.log('------, now i is ', i);break;
            default: console.log('-------------'); break;
    
        }
       process.exit();
    }
}

const print = () => {
    console.log('------, now i is ', i)
};
 
pro();

print();

// let i = 0;
// const main = () => {
    
//     i = i +1;
//     console.log('------, now i is ', i);
//     pro();
//     // process.exit();
// }

// main();

