/**
 * 若将 第7行 var 改为 let ，则最后输出结果为 0-9，
 * 因var定义时，i为全局，arr 所有成员使用的i 均为同一个，因i被 Inc 引用（闭包），顾f1 执行时， i = 10, 未被gc 
 * let定义时，i只在块级作用域有效，每一次循环的i 相当于重新定义
 */

function f1 () {
  let arr = new Array();
  for (var i = 0; i < 10; i ++) { 
    arr[i] = function Inc () { return i; }; //
  }
  return arr;
};

let f2 = f1();
// console.log(f2);
for (let j =0; j < f2.length; j++) {
  console.log(f2[j]()); // 输出均是10
}


