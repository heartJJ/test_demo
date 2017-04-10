const co = require('co');


const print = co.wrap(function*(ms, val) {
  yield new Promise( (resolve, reject) => {
    setTimeout(resolve, ms);
  });
  console.log(`执行完毕，输出${val}`);
  console.log(Date.now());
});

/**
 * 循环并发执行异步，方式一
 * 原理是将 循环中的异步执行变为一个数组， yield [] 的方式一起执行
 */
// const test = co.wrap(function*() {
//   const arr = [4, 5, 6],
//     temp = [];
//   arr.forEach(val => {
//     return temp.push(print(1000, val));
//   });
//   yield temp;
//   console.log(124);
// });


// test();

/**
 * 方式二，原理相同
 */
// const test1 = co.wrap(function*() {
//   const arr = [1, 2, 3];
//   const temp = arr.map(val => {
//     print(1000, val);
//   });
//   yield temp;
//   console.log(125);
// });

// test1();

/**
 *  ...运算符
 */
// const arr = [ [1, 2], [3, 4] ];
// const res = [];
// arr.forEach(val =>  res.push(...val));

// console.log(res);

/**
 * promise 对象获取值
 */
// const a = new Promise( (resolve) => resolve(1));
// a.then(val => console.log(val));

// const test = co.wrap(function* () {
//   console.log(yield a);
// });

// test();



/**
 * 对co 包装方法的一些测试
 */
const test_co1 = () => {
  return co(function*() {
    yield print(1000, '在 co 内 return');
    return [ [1,2], [5,6]];
  });
};

/**
 * test_co2(), , 获取到一个 pending状态的promsie
 * yield test_co2() 执行时报错
 */
const test_co2 = () => {
  co(function*() {
    yield print(2000, '在 co 外return');
  });
  return '执行成功';
};

const test_co3 = co.wrap(function*() {
  yield print(3000, '尝试co.wrap()包装方法，看与co包装有何区别');
  return [ [1,2], [5,6]];
});

const test_co = co.wrap(function*() {
  // console.log('方法1', yield test_co1());
  // console.log('方法2', yield test_co2());
  // console.log('方法3', yield test_co3());
  const res1 = [];
  const arr1 = yield test_co1();
  console.log(arr1);
  arr1.forEach(val =>  res1.push(...val));
  console.log(res1);

  const res3 = [];
  const arr3 = yield test_co3();
  console.log(arr3);
  arr3.forEach(val => res3.push(...val));
  console.log(res3);
});

test_co();
