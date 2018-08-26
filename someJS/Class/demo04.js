/**
 * 类的继承: 
 * 子类无 this， 需通过 调用 super() 获取父类的this ，否则将报错
 * 
 * ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
 * ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
 * 
 * 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错
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

class childPoint_1 extends Point {
  constructor(z) {
    super(); // 调用父类的构造器
    this.z = z;
  }

  toString() {
    return this.z + ' ' + super.toString(); // 调用父类的toString()
  }
}

class childPoint_2 extends Point {
  constructor(x, y, z) {
    super(); // 调用父类的构造器
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return this.z + ' ' + super.toString(); // 调用父类的toString()
  }
}

const child1 = new childPoint_1('子类1');
console.log( child1.toString() );

const child2 = new childPoint_2('1', '2', '子类2');
console.log( child2.toString() );

/**
 * 子类的实例对象也是 父类的实例
 */
console.log( child2 instanceof  Point); // true

/**
 * （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
 * （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
 */
console.log( childPoint_2.__proto__ === Point ); // true
console.log( childPoint_2.prototype.__proto__ === Point.prototype); // true
 
 /**
  * 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为
  * 相当于 为 父类新增了 一个方法 
  * 
  * child2.__proto__.__proto__ = childPoint_2.prototype.__proto__ = Point.prototype
  */

child2.__proto__.__proto__.print = function() {
  console.log('父类实例应该也拥有此方法');
};

const p = new Point();

p.print(); // '父类实例应该也拥有此方法'

console.log(Object.getOwnPropertyNames(Point.prototype)); // [ 'constructor', 'toString', 'print' ]

/**
 * Object.getPrototypeOf() 方法获取 父类
 */
console.log( Object.getPrototypeOf(childPoint_2) === Point ); // true