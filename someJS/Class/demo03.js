/**
 * 所有的实例共享一个原型
 */

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

const p1 = new Point(1, 2),
  p2 = new Point(3, 4);

console.log(p1.__proto__ === p2.__proto__); // true  都是 Point.prototype;

/**
 * 通过 实例的 _proto_ 属性可为 class 添加方法
 * 需要谨慎，将会改变 Class 原始的定义，影响所有实例
 */

p1.__proto__.printName = function () { return 'Oops'; };

console.log(p2.printName());

const p3 = new Point();

console.log(p3.__proto__);