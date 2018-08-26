var cluster = require('cluster');
//var numCPUs = require('os').cpus().length;
var numCPUs = 2;
let co = require('co'),
  debug = require('debug');

exports.pro = (knex) => {
  if (cluster.isMaster) {
    console.log('master start...');

        // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        // console.log('worker ' + worker.process.pid + ' died');
      console.log('worker ' + worker.id + ' died');
    });
  } else {
    co(function*() {
      yield insert(knex, cluster.worker.id);
    }).then( () => {
      debug('插入成功');
    })
    .catch( err => {
      debug(err);
    });

    process.exit();
  }
};


const insert =  function*(knex, id) {
  yield knex('test').insert({name: `a${id}`, age: `${id}`});
};



 