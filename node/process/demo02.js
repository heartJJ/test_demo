/**
 * nextTick 执行优先级最高，将事件压入队列的顶部
 * setTimeout 与 setInterval 看代码编写顺序
 * setImmedate 将事件压入队列的尾部，概率是来讲，执行顺序最靠后
 */
setTimeout(function(){
  console.log('setTimeout    1');
});

process.nextTick(function(){
  console.log('nextTick延迟执行2');
});

process.nextTick(function(){
  console.log('nextTick延迟执行1');
});

setImmediate(function(){
  console.log('setImmediate延迟执行2');
});


//加入两个setImmediate()回调函数
setImmediate(function(){
  console.log('setImmediate延迟执行1');
  process.nextTick(function(){
    console.log('强势插入');
  });
});

process.nextTick(function(){
  console.log('nextTick延迟执行3');
});

process.nextTick(function(){
  console.log('nextTick延迟执行4');
});

setTimeout(function(){
  console.log('setTimeout    2');
});

var count=1,
  interval= setInterval(function(){
    if(count<5) {
      count++;
      console.log('setInterval ');
    }else {
      clearInterval(interval);
    }
  });
console.log('正常执行');