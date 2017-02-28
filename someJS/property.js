/**
 * 注：箭头函数没有prototype属性
 * const a = () => {},  new a () => Error
 */

function a() {
  this.A = () => {
    console.log('这是A方法');
  };
};

a.prototype.anotherA = () => {
  console.log('这是A另一个方法');
};

function b() {
  this.B = () => {
    console.log('这是B方法');
  };
};

function c() {
  this.C = () => {
    console.log('这是C方法');
  };
};

b.prototype = a.prototype;
c.prototype = new a();

const objB = new b();
objB.anotherA();
const objC = new c();
objC.A();
objC.anotherA();

// const d = function () {
//   this.D = () => {
//     console.log('测试复制的写法');
//   };
// };

// d.prototype.anotherD = () => {
//   console.log('这是D的另一个方法');
// };

// console.log(d);
