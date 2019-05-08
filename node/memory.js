let arr = [];
console.log(process.memoryUsage());

for (let i = 0; i< 1000000; i++) {
  arr.push(i);
}

console.log(process.memoryUsage());

global.gc();


console.log(process.memoryUsage());
