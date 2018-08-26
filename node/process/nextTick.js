/**
 * 每次 调用 nextTick() 时，回调函数都是 隔离 创建的。报错不影响
 */
process.on('uncaughtException', function(e) {
  console.log(e);
});

process.nextTick(function() {
  console.log('tick');
});

process.nextTick(function() {
  iAmAMistake();  // 抛错
  console.log('tock');
});

process.nextTick(function() {
  console.log('tick tock'); // 不影响 输出
});

console.log('End of 1st loop');