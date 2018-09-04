let arr = [],
  start_time = Date.now();

for (let i = 35; i < 45; i ++) {
  arr.push(i);
}

function fibo (n) {
  return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

for (let v of arr) {
  let sum = fibo(v);
  console.log(`${v} finish cal ,result is ${sum}`);
}

console.log( `${Date.now() - start_time}`);