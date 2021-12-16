// 关于 promise

const co = require('co');
const moment = require('moment');

console.log(moment('2021-03-03 00:00:00.0').valueOf());


const test_promise = () => {
  return new Promise( (resolve, reject) => {
    reject(123);
  }).catch(err => {
    console.log('出错了');
    throw new Error(345);
  }); 
};

const a = co.wrap(function*() {
  const res = yield test_promise();
  console.log(Object.prototype.toString.call(res));
});

a();


// Date 相关

let today = new Date();
let utcNowDate =(new Date(today.getFullYear(),today.getMonth(),today.getDate()).getTime() - new Date(1900,0,-1).getTime());
console.log(today.getTime());
console.log(utcNowDate);
console.log( new Date(today.getFullYear(),today.getMonth(),today.getDate()).getTime() );
console.log(new Date(1900,0,-1).getTime());


// read all file

// const read = require('read_all_file');

// const arr = read('./node');

// arr.forEach(v => console.log(v));



// 一个闭包的例子
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

// 可直接抛一个字符串
try {
  throw 'abc';
} catch (error) {
  console.log( typeof error );
  console.log(error);
}


