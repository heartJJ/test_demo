const print = async (ms, val) => {
  await new Promise( (resolve, reject) => {
    setTimeout(resolve, ms);
  });
  console.log(`执行完毕，输出${val}`);
  console.log(Date.now());
};  

const print_promise = (ms, val) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log(`执行完毕，输出${val}`);
      console.log(Date.now());
      resolve();
    }, ms);
  });
  // console.log(`执行完毕，输出${val}`);
  // console.log(Date.now());
};  

const test = async () => {

  /**
   * await 数组不可行
   */
  // await [
  //   print(1000, '1毫秒'),
  //   print(2000, '2毫秒'),
  //   print(3000, '3毫秒')
  // ];
  // console.log('await数组成功执行');
  

  // Promise.all([
  //   await print(1000, '1毫秒'),
  //   await print(2000, '2毫秒'),
  //   await print(3000, '3毫秒')
  // ]);

  // console.log('配合promise.all使用');


  const a = [1000, 2000, 3000];
  const arr = a.map(val => {
    return print(val, '啦啦啦');
  });
  await Promise.all(arr);
  console.log('结合数组使用');

};

test();