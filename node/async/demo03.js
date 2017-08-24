/**
 * 并发执行
 * for循环  顺序触发，即每一次循环异步操作，等待完成时，再继续下一次
 * forEach  同时触发
 */

const print = async (ms, val) => {
  await new Promise( (resolve, reject) => {
    setTimeout(resolve, ms);
  });
  console.log(`执行完毕，输出${val}`);
  console.log(Date.now());
};  

const test = async () => {
  console.log('for of 执行开始', Date.now());

  const arr = [4, 5, 6];
  for(let val of arr) {
    await print(1000, val);
  }

  console.log('forEach执行开始', Date.now());

  [1, 2, 3].forEach( async val => {
    await print(1000, val);
  });

  //console.log('本行代码将会率先执行');
};

 test();

