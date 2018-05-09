// 关于异步的一个小测试, fn 与 fn2 的写法执行顺序不太。koa 的中间件（每一步可能均为异步），即fn 的思路

const fn = (a = 0) => {
  a++;

  if (a >= 3) {
    return;
  }

  fn(a);

  console.log(a);

};


const fn2 = (a = 0) => {
  a++;
  
  if (a >= 3) {
    return a;
  } else {
    console.log(a);
    return fn2(a);
  }

  
};


fn2();