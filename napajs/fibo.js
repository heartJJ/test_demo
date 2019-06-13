const napa = require('napajs'),
  numCPUs = require('os').cpus().length;

const zone = napa.zone.create('zone', { workers: numCPUs });

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}


const run = async () => {
  for (let i = 35; i < 45; i ++) {
    arr.push(i);
  }
};