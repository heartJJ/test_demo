// 注意，在node 11 版本之后，事件循环的执行优先级改变，同游览器相近，故版本前后执行结果不同

console.log('1');

setTimeout(function() {
  console.log('2');
  process.nextTick(function() {
    console.log('3');
  });
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5');
  });
});

process.nextTick(function() {
  console.log('6');
});

new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8');
});

setTimeout(function() {
  console.log('9');
  process.nextTick(function() {
    console.log('10');
  });

  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12');
  });
});
