/**
 * 在同一层次，定时器按 优先级顺序执行 （同优先级，按代码顺序 ） ，回调每深一层，执行顺序就排在上一层的后面
 */
process.nextTick(function(){
  console.log('1');
});

process.nextTick(function(){
  console.log('2');
});

setImmediate(function(){
  console.log('3');
  setImmediate(function() {
    console.log('4');
    process.nextTick(function(){
      console.log('5');
      process.nextTick(function(){
        console.log('6');
      });
    });
  });
  process.nextTick(function(){
    console.log('7');
  });
});

process.nextTick(function(){
  console.log('8');
});

setImmediate(function(){
  console.log('9');
  process.nextTick(function(){
    console.log('10');
  });
});
console.log('0');