/**
 *  错误处理
 *   then 方法可接受两个参数，第一个为 resolve值， 第二个为 reject值
 *   若在 then 方法中 ，处理了err ， 则 catch 中不会再接受到 err
 */

async function f() {
  throw new Error('出错了');
}

f()
  .then( (res, err) => {
    return err;
  })
  .catch(err => console.log('catch err'));

  f()
  .then( 
    res => console.log(res),
    err => console.log(err)
  )
  .catch(err => console.log('catch err'));


  const fun = async () => {
    return await 123; // 123 会被转为 promise 对象
  };

  console.log(Object.prototype.toString.call(fun()));