// 关于 promise

const co = require('co');

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

const read = require('read_all_file');

const arr = read('./node');

arr.forEach(v => console.log(v));