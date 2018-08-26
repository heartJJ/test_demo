function f1 () {
  let a = 1;
  a++;
  return a;
}

console.log(f1() ); // 2
console.log(f1() ); // 2

/* 闭包的写法，b未被gc */

function f2 () {
  let b = 1;
  return function () { // 该函数即为闭包：有权访问另一个函数(f2)作用域内的变量(b)
    b++;
    return b;
  };
}
let ff = f2();
console.log(ff()); // 2
console.log(ff()); // 3


// function f1() {
//   var n=999;
// 　
//   function f2() {
// 　  console.log(n); 
// 　}

//   return f2;
// }
// 　　
// var result= f1();
// result(); // 999