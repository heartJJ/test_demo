/**
 * super作为 方法，只能用在 子类的 构造器中
 * super 作为对象使用:
 *  普通方法中， super 指向 A的原型对象 (即 A.prototype)，因此无法访问到 A 实例上的属性 和方法，
 *  通过super调用 父类方法时， this绑定子类  
 *  在静态方法中，super 指向 父类本身
 * 
 * 
 * super 需显示指定是作为对象还是作为方法使用, 否则报错
 */
class A {
  constructor() {
    this.p = 2;
    this.x = 100;
  }

  print() {
    console.log(this.x);
  }

  static method (msg) {
    console.log('static : ' + msg);
  }

  method (msg) {
    console.log('common ：' + msg);
  }
}

A.prototype.q = 3;

class B extends A {
  constructor() {
    super();
    this.x = 200;
  }

  log() {
    console.log(123);
  }

  get valueOfP() {
    return super.p; // 无法获取到父类实例的属性
  }

  get valueOfQ() {
    return super.q; // 获取父类原型的属性
  }

  get valueOfX() {
    super.print(); // 调用父类的print，但绑定的this指向子类
  }

  // get value() {
  //   super.log(); // 报错，因父类没有log方法
  // }

  static method (msg) {
    super.method(msg); // 调用父类 静态方法, 此时 super 指向 A
  }

  method (msg) {
    super.method(msg); // 调用父类 普通方法， 此时 super 指向 A.prototype
  }

}

let b = new B();
console.log(b.valueOfP); // undefined
console.log(b.valueOfQ); // 3
b.valueOfX; // 200
// b.value; // err: log is not a function

B.method('test'); // static : test
b.method('test'); // common ：test

console.log(Object.getOwnPropertyNames(A.prototype)); // [ 'constructor', 'print', 'method', 'q' ]