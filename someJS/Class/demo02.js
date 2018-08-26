/**
 * 实例的属性除非显示定义在其本身（即定义在this对象上），
 * 否则均定义在原型上（即定义在class上）
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

var point = new Point(2, 3);

point.toString(); // (2, 3)

point.hasOwnProperty('x'); // true
point.hasOwnProperty('y'); // true
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString'); // true

console.log(Object.getOwnPropertyNames(Point)); // [ 'length', 'name', 'prototype' ]
console.log(Point.prototype); // Point {} 类 内部定义的方法不可枚举

/**
 * Object.getOwnPropertyNames() 返回对象内部 可枚举和 不可枚举的 属性和方法 的数组
 */
console.log(Object.getOwnPropertyNames(Point.prototype)); // [ 'constructor', 'toString' ]
console.log(Object.getOwnPropertyNames(point.__proto__)); // [ 'constructor', 'toString' ]

console.log( Point.prototype === point.__proto__); // true