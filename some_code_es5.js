'use strict';

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

// 关于 promise

var co = require('co');
var moment = require('moment');

var test_promise = function test_promise() {
  return new Promise(function (resolve, reject) {
    reject(123);
  }).catch(function (err) {
    console.log('出错了');
    throw new Error(345);
  });
};

var a = co.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var res;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return test_promise();

        case 2:
          res = _context.sent;

          console.log(Object.prototype.toString.call(res));

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

a();

// Date 相关

var today = new Date();
var utcNowDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() - new Date(1900, 0, -1).getTime();
console.log(today.getTime());
console.log(utcNowDate);
console.log(new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime());
console.log(new Date(1900, 0, -1).getTime());

// read all file

// const read = require('read_all_file');

// const arr = read('./node');

// arr.forEach(v => console.log(v));


// 一个闭包的例子
function f1() {
  var arr = new Array();
  for (var i = 0; i < 10; i++) {
    arr[i] = function Inc() {
      return i;
    }; //
  }
  return arr;
};

var f2 = f1();

// console.log(f2);
for (var j = 0; j < f2.length; j++) {
  console.log(f2[j]()); // 输出均是10
}

// 可直接抛一个字符串
try {
  throw 'abc';
} catch (error) {
  console.log(typeof error === 'undefined' ? 'undefined' : _typeof(error));
  console.log(error);
}

console.log(moment().format('YYYYMMDDHHmmss'));
