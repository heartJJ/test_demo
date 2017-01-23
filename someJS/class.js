class A {
  constructor() {
    this.p = 2;
    this.x = 100;
  }

  print() {
    console.log(this.x);
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

}

let b = new B();
console.log(b.valueOfP) // undefined
console.log(b.valueOfQ) // 3
b.valueOfX // 20
b.value // err: log is not a function